#!/usr/bin/env python3
"""Fail a compiled PAE workflow that is not safe to import."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path


REQUIRED_NODES = [
    "Normalize — Company Input",
    "CRM — Exclude Existing",
    "Data — Find Contacts",
    "Normalize — Contact Output",
    "CRM — Upsert Contact",
    "AI — Pain Hypothesis",
    "AI — Campaign Copy",
    "Approval — Send Policy",
    "Sequence — Enroll",
    "Alert — Review or Failure",
]
PLACEHOLDER_RE = re.compile(r"https://pae\.local/replace/")
SECRET_RE = re.compile(
    r"(Authorization\s*:\s*Bearer\s+\S+)|(amp_[A-Za-z0-9]{8,})|(sk-[A-Za-z0-9]{10,})",
    re.I,
)


def main() -> int:
    if len(sys.argv) != 2:
        print("usage: validate_workflow.py <workflow.json>", file=sys.stderr)
        return 2
    path = Path(sys.argv[1])
    raw = path.read_text(encoding="utf-8")
    errors: list[str] = []
    try:
        workflow = json.loads(raw)
    except json.JSONDecodeError as exc:
        print(f"invalid json: {exc}")
        return 1

    names = {node.get("name") for node in workflow.get("nodes", [])}
    for required in REQUIRED_NODES:
        if required not in names:
            errors.append(f"missing node: {required}")

    connections = workflow.get("connections") or {}
    for source, ports in connections.items():
        if source not in names:
            errors.append(f"connection source missing: {source}")
        for lane in (ports.get("main") or []):
            for edge in lane:
                target = edge.get("node")
                if target and target not in names:
                    errors.append(f"connection target missing: {target}")

    if PLACEHOLDER_RE.search(raw):
        errors.append("unresolved https://pae.local/replace/ URL")
    if SECRET_RE.search(raw):
        errors.append("secret-like string present")
    if workflow.get("active") is True:
        errors.append("workflow must import inactive")

    enroll = next((n for n in workflow.get("nodes", []) if n.get("name") == "Sequence — Enroll"), None)
    if enroll and not enroll.get("disabled", False):
        errors.append("Sequence — Enroll must stay disabled until send is armed")

    if errors:
        print("FAIL")
        for err in errors:
            print(f"- {err}")
        return 1
    print("PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
