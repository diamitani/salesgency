#!/usr/bin/env python3
"""Figma Sentinel v1 — harvest, classify, persist, daily report.

Env (all optional except Reddit keys for live harvest):
  REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, REDDIT_USER_AGENT
  ANTHROPIC_API_KEY
  DATABASE_URL   # postgres; else local sqlite figma_sentinel.db
  SENTINEL_WINDOW_HOURS  # default 24
"""

from __future__ import annotations

import hashlib
import json
import os
import re
import sqlite3
import time
from collections import Counter, defaultdict
from datetime import datetime, timezone, timedelta
from pathlib import Path
from typing import Any
from urllib.parse import urlencode
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parent
TAXONOMY_PATH = ROOT / "figma-sentinel.taxonomy.json"
DB_PATH = ROOT / "figma_sentinel.db"
REPORT_DIR = ROOT / "reports"
REDDIT_UA = os.getenv(
    "REDDIT_USER_AGENT",
    "script:figma-sentinel:v1.0.0 (by /u/set-me)",
)

SENTIMENT_WORDS = {
    "love": 2,
    "obsessed": 2,
    "incredible": 2,
    "game changer": 2,
    "hate": -2,
    "unusable": -2,
    "garbage": -2,
    "worst": -2,
    "broken": -1,
    "slow": -1,
    "expensive": -1,
    "bug": -1,
    "switch": -1,
    "penpot": -1,
    "framer": 0,
    "like": 1,
    "useful": 1,
}


def load_taxonomy() -> dict[str, Any]:
    return json.loads(TAXONOMY_PATH.read_text())


def utcnow() -> datetime:
    return datetime.now(timezone.utc)


def author_hash(name: str | None) -> str | None:
    if not name or name in {"[deleted]", "[removed]"}:
        return None
    return hashlib.sha256(name.encode()).hexdigest()[:16]


def compile_alias_patterns(tax: dict[str, Any]) -> list[tuple[str, str, str]]:
    rows: list[tuple[str, str, str]] = []
    for p in tax["figma_products"]:
        for a in p["aliases"]:
            rows.append(("figma_products", p["id"], a))
    for pr in tax["design_principles"]:
        rows.append(("design_principles", pr, pr.replace("_", " ")))
    for s in tax["software"]:
        rows.append(("software", s["id"], s["id"].replace("_", " ")))
    return rows


def extract_entities(text: str, patterns: list[tuple[str, str, str]]) -> dict[str, list[str]]:
    found: dict[str, set[str]] = defaultdict(set)
    low = text.lower()
    for kind, eid, alias in patterns:
        if re.search(rf"\b{re.escape(alias.lower())}\b", low):
            found[kind].add(eid)
    return {k: sorted(v) for k, v in found.items()}


def is_relevant(text: str, entities: dict[str, list[str]]) -> float:
    if entities.get("figma_products"):
        return 0.95
    if "figma" in text.lower():
        return 0.9
    if entities.get("design_principles") and entities.get("software"):
        return 0.7
    if entities.get("software") or entities.get("design_principles"):
        return 0.55
    return 0.0


def heuristic_classify(text: str, entities: dict[str, list[str]]) -> dict[str, Any]:
    low = text.lower()
    score = 0
    for word, delta in SENTIMENT_WORDS.items():
        if word in low:
            score += delta
    score = max(-2, min(2, score))
    label_map = {-2: "hate", -1: "dislike", 0: "unclear", 1: "like", 2: "love"}
    label = label_map[score]
    if "but" in low and score != 0:
        label = "mixed"
        score = 0
    intent = "other"
    if any(w in low for w in ["how do", "how to", "?"]):
        intent = "how_to"
    if any(w in low for w in ["bug", "broken", "crash"]):
        intent = "bug"
    if any(w in low for w in ["wish", "please add", "feature"]):
        intent = "feature_request"
    if "switch" in low and "figma" in low:
        intent = "switch_from_figma" if score < 0 else "switch_to_figma"
    if entities.get("software") and "figma" in low:
        intent = "compare"
    if any(w in low for w in ["make", "cursor", "v0", "lovable", "bolt", "mcp"]):
        intent = "vibe_code"
    if any(w in low for w in ["auto layout", "token", "hierarchy", "accessibility"]):
        intent = "principle_discussion"
    if any(w in low for w in ["price", "pricing", "seat", "credit"]):
        intent = "pricing"
    if score >= 1 and intent == "other":
        intent = "praise"
    if score <= -1 and intent == "other":
        intent = "complaint"
    span = text.strip().replace("\n", " ")[:280]
    return {
        "sentiment_label": label,
        "sentiment_score": score if label != "mixed" else 0,
        "intent": intent,
        "confidence": 0.62 if label != "unclear" else 0.4,
        "evidence_span": span,
        "model": "heuristic-v1",
    }


def locate_issues(text: str, entities: dict[str, list[str]]) -> list[tuple[str, float]]:
    low = text.lower()
    hits: list[tuple[str, float]] = []
    rules = [
        ("pricing_credits", ["price", "pricing", "seat", "credit", "expensive"]),
        ("performance_stability", ["slow", "lag", "crash", "ram", "memory"]),
        ("collab_permissions", ["permission", "share", "branch", "conflict"]),
        ("auto_layout_constraints", ["auto layout", "constraint", "hug", "fill"]),
        ("variables_tokens", ["variable", "token"]),
        ("components_variants", ["variant", "component", "instance"]),
        ("prototyping", ["prototype", "smart animate"]),
        ("dev_mode_handoff", ["dev mode", "inspect", "handoff"]),
        ("mcp_code_connect", ["mcp", "code connect"]),
        ("figma_make", ["figma make", " make "]),
        ("figma_sites", ["figma sites"]),
        ("ai_features", ["ai", "credit"]),
        ("learning_curve", ["steep", "learn", "beginner"]),
        ("accessibility", ["a11y", "accessibility", "contrast", "wcag"]),
    ]
    for domain, keys in rules:
        if any(k in low for k in keys):
            hits.append((domain, 0.7))
    if entities.get("figma_products"):
        mapping = {
            "figma_make": "figma_make",
            "dev_mode": "dev_mode_handoff",
            "figjam": "figjam",
            "figma_sites": "figma_sites",
            "figma_mcp": "mcp_code_connect",
        }
        for pid in entities["figma_products"]:
            if pid in mapping:
                hits.append((mapping[pid], 0.65))
    if not hits:
        hits.append(("other", 0.4))
    uniq = {}
    for d, c in hits:
        uniq[d] = max(c, uniq.get(d, 0))
    return list(uniq.items())[:3]


def map_competitors(entities: dict[str, list[str]], tax: dict[str, Any], text: str) -> list[dict[str, str]]:
    hints = {s["id"]: s["relation_hint"] for s in tax["software"]}
    low = text.lower()
    out = []
    for sid in entities.get("software", []):
        rel = hints.get(sid, "substitute")
        if "from figma" in low or "leaving figma" in low:
            rel = "migration_target"
        if "to figma" in low or "switched to figma" in low:
            rel = "migration_source"
        if sid in {"cursor", "claude", "v0", "lovable", "bolt"}:
            rel = "analog_workflow"
        out.append({"software_id": sid, "relation": rel, "job": "unspecified"})
    return out


def db_connect():
    url = os.getenv("DATABASE_URL")
    if url and url.startswith("postgres"):
        import psycopg2

        conn = psycopg2.connect(url)
        conn.autocommit = True
        return conn, "pg"
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn, "sqlite"


def init_sqlite(conn: sqlite3.Connection) -> None:
    conn.executescript(
        """
        create table if not exists ingest_runs (
          id text primary key,
          started_at text, finished_at text, window_start text, window_end text,
          status text, events_pulled int, mentions_written int, rate_limit_hits int, error_summary text
        );
        create table if not exists watermarks (key text primary key, last_created_utc int, updated_at text);
        create table if not exists mentions (
          id text primary key, reddit_fullname text unique, thread_id text, parent_id text,
          subreddit text, kind text, created_utc text, score int, permalink text,
          author_hash text, title text, body text, evidence_span text, entities text,
          relevance real, harvested_at text, deleted_from_reddit int default 0
        );
        create table if not exists classifications (
          mention_id text primary key, sentiment_label text, sentiment_score int,
          intent text, confidence real, model text, classified_at text
        );
        create table if not exists issues (
          mention_id text, domain text, confidence real, primary key (mention_id, domain)
        );
        create table if not exists competitor_signals (
          id text primary key, mention_id text, software_id text, relation text, job text, evidence_span text
        );
        create table if not exists hypotheses (
          id text primary key, report_date text, owner_team text, statement text, action text,
          audience text, metric text, evidence_ids text, kill_criteria text, confidence real
        );
        create table if not exists daily_reports (
          report_date text primary key, run_id text, markdown text, json_payload text, quality_score real, created_at text
        );
        """
    )
    conn.commit()


def reddit_token() -> str:
    cid = os.getenv("REDDIT_CLIENT_ID")
    secret = os.getenv("REDDIT_CLIENT_SECRET")
    if not cid or not secret:
        raise RuntimeError("Set REDDIT_CLIENT_ID and REDDIT_CLIENT_SECRET")
    basic = __import__("base64").b64encode(f"{cid}:{secret}".encode()).decode()
    req = Request(
        "https://www.reddit.com/api/v1/access_token",
        data=urlencode({"grant_type": "client_credentials"}).encode(),
        headers={
            "Authorization": f"Basic {basic}",
            "User-Agent": REDDIT_UA,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        method="POST",
    )
    with urlopen(req, timeout=30) as resp:
        payload = json.loads(resp.read().decode())
    return payload["access_token"]


def reddit_get(token: str, path: str, params: dict[str, Any]) -> dict[str, Any]:
    qs = urlencode(params)
    req = Request(
        f"https://oauth.reddit.com{path}?{qs}",
        headers={"Authorization": f"Bearer {token}", "User-Agent": REDDIT_UA},
    )
    with urlopen(req, timeout=30) as resp:
        remaining = resp.headers.get("X-Ratelimit-Remaining")
        if remaining is not None and float(remaining) < 10:
            time.sleep(float(resp.headers.get("X-Ratelimit-Reset", "10")))
        return json.loads(resp.read().decode())


def harvest(tax: dict[str, Any], hours: int) -> list[dict[str, Any]]:
    token = reddit_token()
    cutoff = int((utcnow() - timedelta(hours=hours)).timestamp())
    events: dict[str, dict[str, Any]] = {}

    def add_post(p: dict[str, Any]) -> None:
        d = p.get("data", p)
        if d.get("created_utc", 0) < cutoff:
            return
        fullname = d.get("name") or f"t3_{d.get('id')}"
        events[fullname] = {
            "reddit_fullname": fullname,
            "thread_id": d.get("id"),
            "parent_id": None,
            "subreddit": d.get("subreddit"),
            "kind": "post",
            "created_utc": datetime.fromtimestamp(d["created_utc"], tz=timezone.utc).isoformat(),
            "score": d.get("score"),
            "permalink": f"https://www.reddit.com{d.get('permalink', '')}",
            "author_hash": author_hash(d.get("author")),
            "title": d.get("title") or "",
            "body": d.get("selftext") or "",
        }

    def add_comment(c: dict[str, Any], thread_id: str, subreddit: str) -> None:
        d = c.get("data", {})
        if d.get("kind") == "more" or not d.get("id"):
            return
        if d.get("created_utc", 0) < cutoff:
            return
        fullname = d.get("name") or f"t1_{d.get('id')}"
        events[fullname] = {
            "reddit_fullname": fullname,
            "thread_id": thread_id,
            "parent_id": d.get("parent_id"),
            "subreddit": subreddit,
            "kind": "comment",
            "created_utc": datetime.fromtimestamp(d["created_utc"], tz=timezone.utc).isoformat(),
            "score": d.get("score"),
            "permalink": f"https://www.reddit.com{d.get('permalink', '')}",
            "author_hash": author_hash(d.get("author")),
            "title": "",
            "body": d.get("body") or "",
        }

    for sub in tax["subreddits"]:
        listing = reddit_get(token, f"/r/{sub}/new", {"limit": 50})
        for child in listing.get("data", {}).get("children", []):
            add_post(child)
        time.sleep(0.6)

    for q in tax["query_seeds"]:
        listing = reddit_get(
            token,
            "/search",
            {"q": q, "sort": "new", "t": "day", "limit": 25, "type": "link"},
        )
        for child in listing.get("data", {}).get("children", []):
            add_post(child)
        time.sleep(0.6)

    for ev in list(events.values()):
        if ev["kind"] != "post":
            continue
        if "figma" not in (ev["title"] + ev["body"]).lower() and ev["subreddit"] != "FigmaDesign":
            continue
        tree = reddit_get(
            token,
            f"/r/{ev['subreddit']}/comments/{ev['thread_id']}",
            {"limit": 50, "depth": 3},
        )
        comments = tree[1]["data"]["children"] if isinstance(tree, list) and len(tree) > 1 else []

        def walk(nodes: list[Any]) -> None:
            for n in nodes:
                d = n.get("data", {})
                add_comment(n, ev["thread_id"], ev["subreddit"])
                replies = d.get("replies")
                if isinstance(replies, dict):
                    walk(replies.get("data", {}).get("children", []))

        walk(comments)
        time.sleep(0.6)

    return list(events.values())


def process(events: list[dict[str, Any]], tax: dict[str, Any]) -> list[dict[str, Any]]:
    patterns = compile_alias_patterns(tax)
    rows = []
    for ev in events:
        text = f"{ev.get('title', '')}\n{ev.get('body', '')}"
        entities = extract_entities(text, patterns)
        rel = is_relevant(text, entities)
        if rel < 0.5:
            continue
        clf = heuristic_classify(text, entities)
        issues = locate_issues(text, entities)
        comps = map_competitors(entities, tax, text)
        mid = hashlib.sha256(ev["reddit_fullname"].encode()).hexdigest()[:16]
        rows.append(
            {
                **ev,
                "id": mid,
                "entities": entities,
                "relevance": rel,
                "classification": clf,
                "issues": issues,
                "competitors": comps,
                "evidence_span": clf["evidence_span"],
            }
        )
    return rows


def persist_sqlite(conn: sqlite3.Connection, run_id: str, window: tuple[str, str], rows: list[dict[str, Any]]) -> None:
    now = utcnow().isoformat()
    conn.execute(
        "insert into ingest_runs values (?,?,?,?,?,?,?,?,?,?)",
        (run_id, now, None, window[0], window[1], "running", 0, 0, 0, None),
    )
    for r in rows:
        conn.execute(
            """
            insert into mentions values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,0)
            on conflict(reddit_fullname) do update set
              score=excluded.score, body=excluded.body, entities=excluded.entities
            """,
            (
                r["id"],
                r["reddit_fullname"],
                r["thread_id"],
                r.get("parent_id"),
                r["subreddit"],
                r["kind"],
                r["created_utc"],
                r.get("score"),
                r.get("permalink"),
                r.get("author_hash"),
                r.get("title"),
                r.get("body"),
                r.get("evidence_span"),
                json.dumps(r["entities"]),
                r["relevance"],
                now,
            ),
        )
        c = r["classification"]
        conn.execute(
            "insert or replace into classifications values (?,?,?,?,?,?,?)",
            (r["id"], c["sentiment_label"], c["sentiment_score"], c["intent"], c["confidence"], c["model"], now),
        )
        for domain, conf in r["issues"]:
            conn.execute(
                "insert or replace into issues values (?,?,?)",
                (r["id"], domain, conf),
            )
        for comp in r["competitors"]:
            cid = hashlib.sha256(f"{r['id']}:{comp['software_id']}".encode()).hexdigest()[:16]
            conn.execute(
                "insert or replace into competitor_signals values (?,?,?,?,?,?)",
                (cid, r["id"], comp["software_id"], comp["relation"], comp["job"], r.get("evidence_span")),
            )
    conn.execute(
        "update ingest_runs set finished_at=?, status=?, events_pulled=?, mentions_written=? where id=?",
        (utcnow().isoformat(), "ok", len(rows), len(rows), run_id),
    )
    conn.commit()


def compose_report(rows: list[dict[str, Any]], report_date: str) -> tuple[str, dict[str, Any]]:
    headline = [
        r
        for r in rows
        if r["classification"]["confidence"] >= 0.55
        and r["classification"]["sentiment_label"] != "unclear"
    ]
    mix = Counter(r["classification"]["sentiment_label"] for r in headline)
    intents = Counter(r["classification"]["intent"] for r in headline)
    domains = Counter(d for r in headline for d, _ in r["issues"])
    software = Counter(c["software_id"] for r in headline for c in r["competitors"])
    n = max(len(headline), 1)
    love_share = (mix["love"] + mix["like"]) / n
    hate_share = (mix["hate"] + mix["dislike"]) / n

    hypotheses = []
    if domains:
        top_issue = domains.most_common(1)[0][0]
        evidence = [r["id"] for r in headline if any(d == top_issue for d, _ in r["issues"])][:5]
        hypotheses.append(
            {
                "owner_team": "product",
                "statement": f"Because {top_issue} dominates complaints, a targeted fix or tutorial may lift love-share.",
                "action": f"Ship a public changelog + 90-second demo addressing {top_issue}.",
                "audience": "r/FigmaDesign practitioners hitting this workflow this week",
                "metric": "7-day dislike+hate share for this domain",
                "evidence_ids": evidence,
                "kill_criteria": "No movement after 14 days or n<10",
                "confidence": 0.55,
            }
        )
    if software:
        analog = software.most_common(1)[0][0]
        hypotheses.append(
            {
                "owner_team": "pmm",
                "statement": f"Builders mention {analog} next to Figma; that job is a GTM wedge.",
                "action": f"Publish a comparison/pairing page: Figma + {analog} (handoff, Make, MCP).",
                "audience": "vibe-code and design-to-code readers",
                "metric": "compare-intent mentions and switch_to_figma share",
                "evidence_ids": [r["id"] for r in headline if any(c["software_id"] == analog for c in r["competitors"])][:5],
                "kill_criteria": "Page traffic without any change in compare-intent mix after 30 days",
                "confidence": 0.5,
            }
        )
    hypotheses.append(
        {
            "owner_team": "education",
            "statement": "How-to and principle talk is a teaching opportunity, not a feature gap.",
            "action": "Daily brief → one principle clip (auto layout, tokens, a11y) seeded from real questions.",
            "audience": "design-system learners",
            "metric": "how_to volume vs praise volume",
            "evidence_ids": [r["id"] for r in headline if r["classification"]["intent"] in {"how_to", "principle_discussion"}][:5],
            "kill_criteria": "Clip engagement without subsequent praise mentions",
            "confidence": 0.45,
        }
    )

    payload = {
        "report_date": report_date,
        "volume": len(rows),
        "headline_n": len(headline),
        "sentiment_mix": dict(mix),
        "love_share": round(love_share, 3),
        "hate_share": round(hate_share, 3),
        "intents": dict(intents),
        "issue_domains": dict(domains),
        "software": dict(software),
        "hypotheses": hypotheses,
        "sampling_bias": "Reddit is Tier 3 community evidence, not a census of Figma users.",
    }

    md = [
        f"# Figma Sentinel daily brief — {report_date}",
        "",
        f"Window volume: **{len(rows)}** relevant mentions; headline n={len(headline)} (confidence ≥ 0.55, not unclear).",
        f"Love+like share: **{love_share:.0%}**. Dislike+hate share: **{hate_share:.0%}**.",
        "",
        "## Sentiment mix",
        ", ".join(f"{k}: {v}" for k, v in mix.most_common()) or "none",
        "",
        "## Intents",
        ", ".join(f"{k}: {v}" for k, v in intents.most_common()) or "none",
        "",
        "## Where issues lie",
        ", ".join(f"{k}: {v}" for k, v in domains.most_common()) or "none",
        "",
        "## What is similar",
        ", ".join(f"{k}: {v}" for k, v in software.most_common()) or "no competitor/analog entities in window",
        "",
        "## Hypotheses",
    ]
    for i, h in enumerate(hypotheses, 1):
        md.append(
            f"{i}. ({h['owner_team']}) {h['statement']} Action: {h['action']} Metric: {h['metric']}. Kill if {h['kill_criteria']}."
        )
    md += [
        "",
        "## Bias and quality",
        payload["sampling_bias"],
        "Heuristic classifier is the local fallback; swap in Anthropic for production calibration.",
        "",
        "## Now / next / later",
        "- Now: persist this run, review hate clusters with n≥3.",
        "- Next: replace heuristic with Claude batch classify + gold eval of 50 comments.",
        "- Later: dashboard and Slack delivery (approval-gated).",
    ]
    return "\n".join(md), payload


def demo_events() -> list[dict[str, Any]]:
    samples = [
        ("t3_demo1", "FigmaDesign", "post", "Figma Make is actually usable now", "I love Figma Make for first drafts, then I clean in Design."),
        ("t1_demo2", "FigmaDesign", "comment", "", "Dev Mode is still slow and inspect is unusable on big files. Thinking about Penpot."),
        ("t1_demo3", "UXDesign", "comment", "", "How do you set up auto layout and variables for an 8pt spacing system in Figma?"),
        ("t1_demo4", "cursor", "comment", "", "We pair Figma MCP with Cursor. Handoff is the job, not a new design tool."),
        ("t1_demo5", "Framer", "comment", "", "Left Figma Sites for Framer. Pricing and AI credits pushed us out."),
        ("t1_demo6", "webdev", "comment", "", "v0 and Lovable feel similar to Figma Make — prompt to UI, then a designer fixes tokens."),
    ]
    now = utcnow().isoformat()
    out = []
    for fullname, sub, kind, title, body in samples:
        out.append(
            {
                "reddit_fullname": fullname,
                "thread_id": "demo",
                "parent_id": None,
                "subreddit": sub,
                "kind": kind,
                "created_utc": now,
                "score": 10,
                "permalink": "https://www.reddit.com/r/FigmaDesign/demo",
                "author_hash": author_hash("demo"),
                "title": title,
                "body": body,
            }
        )
    return out


def main() -> None:
    tax = load_taxonomy()
    hours = int(os.getenv("SENTINEL_WINDOW_HOURS", "24"))
    window_end = utcnow()
    window_start = window_end - timedelta(hours=hours)
    run_id = hashlib.sha256(window_end.isoformat().encode()).hexdigest()[:12]
    report_date = window_end.date().isoformat()

    if os.getenv("REDDIT_CLIENT_ID") and os.getenv("REDDIT_CLIENT_SECRET"):
        events = harvest(tax, hours)
    else:
        print("No Reddit credentials; running demo corpus.")
        events = demo_events()

    rows = process(events, tax)
    conn, kind = db_connect()
    if kind == "sqlite":
        init_sqlite(conn)
        persist_sqlite(conn, run_id, (window_start.isoformat(), window_end.isoformat()), rows)

    md, payload = compose_report(rows, report_date)
    REPORT_DIR.mkdir(exist_ok=True)
    (REPORT_DIR / f"{report_date}.md").write_text(md)
    (REPORT_DIR / f"{report_date}.json").write_text(json.dumps(payload, indent=2))
    if kind == "sqlite":
        conn.execute(
            "insert or replace into daily_reports values (?,?,?,?,?,?)",
            (report_date, run_id, md, json.dumps(payload), 0.7, utcnow().isoformat()),
        )
        conn.commit()
    print(md)
    print(f"\nWrote reports/{report_date}.md and {kind} store ({len(rows)} mentions).")


if __name__ == "__main__":
    main()
