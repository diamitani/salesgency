# JTBD_BUILD_PLAN — n8n Execution Analyst
Framework: NPAO + 4Ds | Owner: Patrick Diamitani | 2026-06-21

## NPAO Summary
| Class | Count | Meaning |
|---|---|---|
| N — Non-negotiable | 2 | Blockers — do first |
| A — Anxiety | 2 | Unknowns that could invalidate build choices |
| P — Priority | 5 | Core build |
| O — Optimization | 3 | Hardening + prevention layer |

**Execution order: N → A → P → O.**

---

## [N] Non-Negotiable

### N1 — Secure the API key (storage decision)
**4Ds:** D1 | **Done when:** key is in an env var / skill credential and a rule exists that it's never printed in output.
**Build prompt:** Decide where the n8n API key lives for this skill (env var or skill credential store). Document it in TECH_STACK. Add an output-scrub rule so the key can never appear in a printed table, export, or log.

### N2 — Confirm read-only scope
**4Ds:** D1 | **Done when:** the skill spec explicitly forbids write calls in v1.
**Build prompt:** Lock v1 to read-only n8n API usage. No POST/PUT/PATCH/DELETE. State this in the SKILL.md guardrails so the skill never edits a production workflow by accident.

---

## [A] Anxiety

### A1 — Confirm execution retention behavior
**4Ds:** D1 | **Done when:** you know exactly how many executions are retained and have a plan for older data.
**Build prompt:** Verify n8n Cloud's execution retention (~25/workflow observed). Decide whether v1 just notes the limit or persists pulled executions for trend analysis. If persisting, pick the store (local file / Azure blob / table) — flag to Patrick.

### A2 — Name-search disambiguation strategy
**4Ds:** D1 | **Done when:** there's a defined behavior when a name matches multiple workflows.
**Build prompt:** Define how the resolver handles multiple fuzzy matches (e.g., return top N ranked by name similarity + active status, ask user to pick). Test against real duplicate-named workflows (there are at least two "Country Data - Weekly Transformation and Storage").

---

## [P] Priority

### P1 — Workflow resolver (ID / URL / name)
**4Ds:** D2 | **Depends on:** N1
**Done when:** all three inputs resolve to the correct workflow; URL parsing + cursor pagination + fuzzy match all work.
**Build prompt:** Build the resolver. ID → direct GET. URL → parse ID after `/workflow/`. Name/description → paginate `/workflows?limit=100` via `nextCursor`, fuzzy-match on name, return best match or ranked list.

### P2 — Execution puller
**4Ds:** D2 | **Done when:** can list executions for a workflow filtered by status/limit and fetch full data for any execution.
**Build prompt:** Implement listing (`/executions?workflowId=&status=&limit=`) and detail (`/executions/{id}?includeData=true`). Handle pagination and empty-history gracefully.

### P3 — Analyzer (the core value)
**4Ds:** D2 | **Depends on:** P2
**Done when:** for any workflow it returns failing node, exact error, first-failure timestamp, success/error counts, slow nodes.
**Build prompt:** Parse `data.resultData.runData.[node][0].error` for errors and timings. Walk executions oldest→newest to find when failures began. Produce a plain-English root cause + suggested next step.

### P4 — Output layer (spreadsheet / table / prose)
**4Ds:** D2 | **Depends on:** P3
**Done when:** same analysis renders as .xlsx, .csv, inline table, or written summary per user request.
**Build prompt:** Build exporters with openpyxl/pandas (one row per execution and/or per node) plus inline markdown table and prose summary modes. Let the user pick the format in their request.

### P5 — SKILL.md + usage doc
**4Ds:** D3 | **Depends on:** P1–P4
**Done when:** skill triggers correctly and a teammate can use it without asking Patrick.
**Build prompt:** Write SKILL.md (triggers: "check n8n executions", "why did my workflow fail", "pull execution data for…", pasted workflow URL/ID). Include guardrails (read-only, key handling) and a short usage doc with examples.

---

## [O] Optimization

### O1 — Scheduled health scan across all workflows
**4Ds:** D4 | **Done when:** a scan can list all workflows and flag any with recent failures/stalls.
**Build prompt:** Build an all-workflows scan (paginate every workflow, check latest execution status). Output a health table. This is the prevention layer for silent failures.

### O2 — Failure alerting (Slack/Teams)
**4Ds:** D4 | **Depends on:** O1
**Done when:** the health scan pushes an alert on new failures.
**Build prompt:** Wire the scan to a Slack or Teams webhook. Alert format: workflow name, failing node, error, first-failure date, link. (Needs webhook URL — see TECH_STACK readiness block.)

### O3 — Trend persistence
**4Ds:** D4 | **Depends on:** A1
**Done when:** pulled executions persist beyond the 25-exec limit for trend reporting.
**Build prompt:** If Patrick wants trends, persist pulled execution summaries to the chosen store and add a "show me this workflow's failure history over time" mode.

---

## Execution Order
```
N1 + N2  →  A1 + A2  →  P1 → P2 → P3 → P4 → P5  →  O1 → O2 + O3
```

## Estimated Effort
| Phase | Tasks | Rough time |
|---|---|---|
| N + A | N1,N2,A1,A2 | 30–45 min (decisions) |
| P (core) | P1–P5 | bulk of the build |
| O (prevention) | O1–O3 | follow-on once core is solid |
