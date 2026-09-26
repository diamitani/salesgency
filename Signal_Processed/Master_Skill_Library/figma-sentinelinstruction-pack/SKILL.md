---
name: figma-sentinelinstruction-pack
description: Process/Note derived from figma-sentinel.instruction-pack.md
source_path: figmasentinel/figma-sentinel.instruction-pack.md
---

# figma-sentinel.instruction-pack.md

## Context
This skill provides knowledge, processes, and instructions derived from the document: `figma-sentinel.instruction-pack.md`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

---
artifact_type: instruction-pack
parent_agent: figma-sentinel
version: v1
status: ready
---

# Figma Sentinel — Instruction Pack

## Outcome
A Sentinel-style radar: Reddit harvest → parse Figma / principle / software mentions → classify love/hate/intent → locate issues → persist → daily PMM brief with hypotheses.

## Stack decisions
- Ingest: official Reddit Data API only (OAuth, unique User-Agent, 100 QPM). [Reddit Data API Wiki]
- Classify: heuristic fallback now; Anthropic batch in production.
- Store: SQLite locally; Postgres schema for Supabase.
- Schedule: Vercel cron or n8n at 06:00 America/Chicago.
- Dashboard (next): Next.js + Supabase, same as PAL Website Agent defaults.

## First milestone (runnable today)
1. Keep `figma-sentinel.taxonomy.json` next to `figma_sentinel.py`.
2. `python3 figma_sentinel.py` — demo corpus, local SQLite, markdown report.
3. For live harvest, register a Reddit script app and set:
   - `ENV:REDDIT_CLIENT_ID`
   - `ENV:REDDIT_CLIENT_SECRET`
   - `ENV:REDDIT_USER_AGENT` = `script:figma-sentinel:v1.0.0 (by /u/YOURNAME)`
4. Apply `figma-sentinel.schema.sql` in Supabase when promoting off SQLite.

## Agent / skill map
- Orchestrator: figma-sentinel master soul
- Children: ingest, parser, classifier, issue-locator, competitor-mapper, db-curator, hypothesis-engine, report-composer, compliance-guard
- PAL: ambiguous operator questions
- RAG-DAL: Figma product facts and competitor capabilities (not Reddit rants)
- NPAO: now = pipeline; next = Claude + dashboard; later = multi-source + alerts

## Tool mapping
| Job | Tool | Permission |
| --- | --- | --- |
| Harvest | Reddit OAuth GET | read |
| Classify | Anthropic or heuristic | model call |
| Persist | SQLite / Supabase | write sentinel schema |
| Report | local markdown + daily_reports row | write |
| Slack/email | n8n / API | require-approval |
| Scrape HTML | none | denied |

## Test plan
- Demo run produces ≥1 love, ≥1 hate/dislike, ≥1 how_to, ≥1 analog tool.
- Headline view drops `unclear` and confidence < 0.55.
- Duplicate fullname upserts, does not duplicate.
- No usernames in the markdown brief.
- Live mode backs off when `X-Ratelimit-Remaining` < 10.
- Deletion purge (next) removes body/title/author_hash when Reddit deletes.

## Approvals required
- Production cron
- Any outbound Slack/email
- Switching unofficial Reddit aggregators in (enhancement; default deny)
- Multi-source (X, HN, LinkedIn)

## Enhancement proposals (not in v1)
- Claude classification with 50-comment gold eval
- Next.js dashboard of mix / issues / competitors
- 48-hour deletion crawler per Reddit API terms
- Fine-grained Figma Make / MCP / Sites slices for the AI deployment GTM narrative
