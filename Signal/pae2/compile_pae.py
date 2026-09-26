#!/usr/bin/env python3
"""Merge PAE core template + adapters + intake into importable n8n JSON."""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any


SECRET_RE = re.compile(
    r"(Authorization\s*:\s*Bearer\s+\S+)|(\"amp_[A-Za-z0-9]{8,}\")|(\"sk-[A-Za-z0-9]{10,}\")",
    re.I,
)
TOKEN_RE = re.compile(r"\{\{([a-zA-Z0-9_.]+)\}\}")


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def flatten(prefix: str, value: Any, out: dict[str, str]) -> None:
    if isinstance(value, dict):
        for key, child in value.items():
            flatten(f"{prefix}.{key}" if prefix else key, child, out)
        return
    if isinstance(value, list):
        out[prefix] = json.dumps(value)
        return
    if value is None:
        return
    out[prefix] = str(value)


def lookup(obj: dict[str, Any], dotted: str) -> Any:
    cur: Any = obj
    for part in dotted.split("."):
        if not isinstance(cur, dict) or part not in cur:
            return None
        cur = cur[part]
    return cur


def replace_tokens(raw: str, tokens: dict[str, str]) -> str:
    def repl(match: re.Match[str]) -> str:
        key = match.group(1)
        return tokens.get(key, match.group(0))

    return TOKEN_RE.sub(repl, raw)


def apply_adapter(workflow: dict[str, Any], adapter: dict[str, Any]) -> None:
    compiler = adapter.get("compiler") or {}
    url_map: dict[str, str] = compiler.get("replace") or {}
    dumped = json.dumps(workflow)
    for src, dest in url_map.items():
        dumped = dumped.replace(src, dest)
    workflow.clear()
    workflow.update(json.loads(dumped))

    nodes = {n["name"]: n for n in workflow.get("nodes", [])}
    for name, auth in (compiler.get("set_node_auth") or {}).items():
        node = nodes.get(name)
        if not node:
            continue
        node.setdefault("parameters", {}).update(auth)

    for name, pointer in (compiler.get("set_json_body") or {}).items():
        node = nodes.get(name)
        if not node:
            continue
        body = lookup(adapter, pointer)
        if body is None:
            continue
        node.setdefault("parameters", {})["jsonBody"] = (
            body if isinstance(body, str) else json.dumps(body)
        )

    for name in compiler.get("keep_disabled") or []:
        if name in nodes:
            nodes[name]["disabled"] = True


def rewire_csv(workflow: dict[str, Any]) -> None:
    connections = workflow.setdefault("connections", {})
    connections["Set — Run Limits"] = {
        "main": [[{"node": "Normalize — Company Input", "type": "main", "index": 0}]]
    }
    nodes = {n["name"]: n for n in workflow.get("nodes", [])}
    if "Data — Find Companies" in nodes:
        nodes["Data — Find Companies"]["disabled"] = True
    if "Trigger — Schedule" in nodes:
        nodes["Trigger — Schedule"]["disabled"] = True


def build_tokens(intake: dict[str, Any]) -> dict[str, str]:
    tokens: dict[str, str] = {}
    flatten("", intake, tokens)
    company = intake.get("company") or {}
    slug = re.sub(r"[^a-z0-9]+", "-", str(company.get("name") or "client").lower()).strip("-")
    tokens["company.slug"] = slug
    return tokens


def write_prompts(out: Path, intake: dict[str, Any]) -> tuple[str, str]:
    company = intake.get("company") or {}
    product = intake.get("product") or {}
    icp = intake.get("icp") or {}
    persona = intake.get("persona") or {}
    research = (
        f"You research accounts for {company.get('name', '')}. "
        f"They sell {product.get('offer', '')}. ICP: {json.dumps(icp)}. "
        "Return JSON: company_summary, evidence[], relevant_signals[], "
        "pain_hypothesis, value_proposition, confidence."
    )
    email = (
        f"You write outbound for {company.get('name', '')} selling {product.get('offer', '')} "
        f"to {persona.get('titles', [])}. Voice: {persona.get('language', 'direct')}. "
        f"Never claim: {product.get('banned_claims', [])}. "
        "Return JSON: emails[1-7]{step,subject,body}, linkedin{connection_note,dm,inmail}."
    )
    ai = out / "ai"
    ai.mkdir(parents=True, exist_ok=True)
    (ai / "research.system_prompt.md").write_text(research + "\n", encoding="utf-8")
    (ai / "email.system_prompt.md").write_text(email + "\n", encoding="utf-8")
    return research, email


def write_credentials(out: Path, adapters: list[dict[str, Any]]) -> None:
    lines = ["# Credential setup", "", "Create these in n8n. Never paste keys into nodes.", ""]
    for adapter in adapters:
        auth = adapter.get("auth") or {}
        lines.append(f"## {adapter.get('vendor', adapter.get('adapter_id'))}")
        lines.append(f"- n8n type: `{auth.get('n8n_credential_type', '')}`")
        for step in auth.get("setup") or []:
            lines.append(f"- {step}")
        lines.append("")
    (out / "CREDENTIALS.md").write_text("\n".join(lines), encoding="utf-8")


def write_test(out: Path) -> None:
    (out / "TEST.md").write_text(
        "\n".join(
            [
                "# PAE quick test",
                "",
                "1. Import workflow.json. Attach credentials.",
                "2. Set company_limit=1. Keep Sequence — Enroll disabled.",
                "3. Run once.",
                "4. Assert company row, contact or typed skip, research.pain_hypothesis, email 1 subject+body.",
                "",
            ]
        ),
        encoding="utf-8",
    )


def compile_workflow(
    intake: dict[str, Any],
    core: dict[str, Any],
    adapters: list[dict[str, Any]],
    out: Path,
) -> dict[str, Any]:
    workflow = json.loads(json.dumps(core))
    tokens = build_tokens(intake)
    research, email = write_prompts(out, intake)
    tokens["compiled.research_system_prompt"] = research
    tokens["compiled.email_system_prompt"] = email
    icp = intake.get("icp") or {}
    persona = intake.get("persona") or {}
    tokens.setdefault("compiled.icp_query", json.dumps(icp))
    tokens.setdefault("compiled.persona.departments", json.dumps(persona.get("departments") or []))
    tokens.setdefault("compiled.persona.titles", json.dumps(persona.get("titles") or []))
    tokens.setdefault("compiled.icp.locations", json.dumps(icp.get("locations") or []))
    tokens.setdefault("compiled.icp.signals", json.dumps(icp.get("signals") or []))
    tokens.setdefault("compiled.sequence_id", str((intake.get("outreach") or {}).get("sequence_id") or "SEQUENCE_ID"))
    tokens.setdefault("compiled.inbox", str((intake.get("outreach") or {}).get("inbox") or ""))
    tokens.setdefault("adapter.sequence.id", tokens["compiled.sequence_id"])
    tokens.setdefault("adapter.sequence.inbox", tokens["compiled.inbox"])

    for adapter in adapters:
        apply_adapter(workflow, adapter)

    if (intake.get("trigger") or {}).get("type") == "csv":
        rewire_csv(workflow)

    raw = replace_tokens(json.dumps(workflow), tokens)
    if SECRET_RE.search(raw):
        raise SystemExit("compile refused: secret-like string in output")
    workflow = json.loads(raw)
    slug = tokens.get("company.slug", "client")
    workflow["name"] = f"PAE — {slug}"
    workflow["active"] = False
    return workflow


def main() -> int:
    parser = argparse.ArgumentParser(description="Compile a PAE n8n workflow")
    parser.add_argument("--intake", required=True, type=Path)
    parser.add_argument("--core", required=True, type=Path)
    parser.add_argument("--adapter", action="append", default=[], type=Path)
    parser.add_argument("--out", required=True, type=Path)
    args = parser.parse_args()

    out: Path = args.out
    out.mkdir(parents=True, exist_ok=True)
    intake = load_json(args.intake)
    core = load_json(args.core)
    adapters = [load_json(path) for path in args.adapter]
    workflow = compile_workflow(intake, core, adapters, out)
    (out / "workflow.json").write_text(json.dumps(workflow, indent=2), encoding="utf-8")
    write_credentials(out, adapters)
    write_test(out)
    ack = {
        "status": "approved",
        "mode": "compile",
        "trigger": (intake.get("trigger") or {}).get("type"),
        "bindings": {
            "data": next((a.get("adapter_id") for a in adapters if "data.find_contacts" in (a.get("capabilities") or [])), None),
            "crm": next((a.get("adapter_id") for a in adapters if "crm.upsert_contact" in (a.get("capabilities") or [])), None),
            "outreach": (intake.get("outreach") or {}).get("mode", "omitted"),
        },
        "send_armed": False,
        "requires_connection": ["n8n-credential:crm", "n8n-credential:data", "n8n-credential:llm"],
    }
    (out / "ack.json").write_text(json.dumps(ack, indent=2), encoding="utf-8")
    print(out / "workflow.json")
    return 0


if __name__ == "__main__":
    sys.exit(main())
