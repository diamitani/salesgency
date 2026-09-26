---
name: masterkb
description: Process/Note derived from MASTER_KB.md
source_path: n8n execution analyst/MASTER_KB.md
---

# MASTER_KB.md

## Context
This skill provides knowledge, processes, and instructions derived from the document: `MASTER_KB.md`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

# n8n Execution Analyst — Master Knowledge Base
Generated: 2026-06-21 | Version: 1.0 | Quality: 90%

---

## 1. Project Identity
- **Name:** n8n Execution Analyst
- **Type:** Internal diagnostic/analysis skill (Claude skill + n8n Public API)
- **One-sentence description:** A Claude skill that connects to the Atlas n8n instance, finds any workflow or execution (by pasted ID/URL or by searching for it), pulls full execution data, and turns it into spreadsheets, tables, and plain-English analysis on demand.
- **New vs. enhancement:** New build. [Extracted]

## 2. Problem Statement
- **Problem:** When an n8n workflow fails, there's no fast way to understand *what* failed, *when* it started, or *why* — without manually clicking through the n8n UI execution by execution. The country-data/Onspring incident is the proof case: a workflow failed silently every Monday for 4+ weeks, no one knew, and diagnosis required hand-pulling execution JSON through the API.
- **Who is affected:** Patrick (owns GTM automation), Nick (owns pipelines), and anyone who depends on n8n workflows producing correct data downstream (reps, marketers, end users like Beatrix).
- **Current solution:** Manual API calls + ad-hoc Python parsing, or clicking through the n8n UI. Slow, not repeatable, easy to miss silent failures.
- **Impact of inaction:** Silent failures persist for weeks; stale/incomplete data reaches end users; diagnosis is slow and depends on someone technical being available. [Extracted from this incident]

## 3. Goals and Success Metrics
- **Primary goal:** Make n8n execution diagnosis instant and self-serve — paste a workflow ID/URL (or describe it), get a full health + failure analysis with exportable tables.
- **KPIs:**
  - Time-to-diagnose a failed workflow: from ~30+ min manual → < 2 min
  - % of failures caught proactively (vs. discovered by end users): target high via scheduled health scans
  - Reuse: usable across all ~100+ workflows in the instance, not just one
- **Success criteria:**
  1. Resolve a workflow by ID, full URL, or fuzzy name search
  2. Pull execution history and per-node error detail for any workflow
  3. Output analysis as a spreadsheet (.xlsx), inline table, or written summary
  4. Identify the failing node, the error message, and when failures started
  5. Works for active AND inactive workflows
- **Timeline:** Near-term — this is high-value and the API is already proven. [Inferred]

## 4. Scope and Constraints
- **In scope:**
  - Resolve workflows by ID / URL / name search (cursor-based pagination)
  - Pull executions (filter by status, workflow, time window)
  - Extract per-node run data, timings, and `error` objects from `includeData=true`
  - Generate .xlsx / .csv exports, inline tables, and plain-English analysis
  - Optional: scheduled health scan across all workflows with alerting
- **Out of scope (v1):**
  - Editing or deploying workflows (read/analyze only — keeps it safe)
  - Modifying credentials or permissions
- **Constraints:**
  - n8n Cloud retains only ~25 executions per workflow — historical depth is limited; the skill should note this and optionally persist pulled data for trend analysis
  - API key is sensitive — must be stored as a credential/env var, never hardcoded in outputs
- **Integrations required:** n8n Public API (confirmed working). [Extracted]

## 5. Users and Personas
- **Primary user:** Patrick (technical). Secondary: Nick and other automation owners.
- **Technical level:** Mixed — Patrick technical; outputs (spreadsheets, plain-English summaries) must be readable by non-technical stakeholders too.
- **Scale:** Small operator group now; the *outputs* may be shared widely (e.g., a health dashboard or report to leadership). [Inferred]

## 6. Tech Stack and Data
- **Tools:** Claude skill (bash + Python in skill runtime), n8n Public API, openpyxl/pandas for spreadsheets.
- **Input sources:** n8n Public API at `https://atlas-hxm.app.n8n.cloud/api/v1`
- **Output destinations:** .xlsx / .csv files, inline tables, written analysis; optional Slack/Teams alert for scheduled scans.
- **API access status:** ✓ Confirmed — key tested live against `/workflows`, `/executions`, `/executions/{id}?includeData=true`.

## 7. Reference Materials
- This conversation's diagnosis of `eceGV7Ka0Ut57rBf` (country data / Onspring 1119) is the canonical worked example.
- Existing related skill: `n8n-execution-analyst` already referenced in memory/skills list — this project formalizes and hardens it.

## 8. Output Preferences
- **Format:** Flexible — spreadsheet, table, or prose, chosen by what the user asks for.
- **Detail level:** High for diagnosis; summary-first with drill-down.
- **Distribution:** Inline by default; file export on request; scheduled report optional.

## 9. Stakeholder Context
- **Owner:** Patrick Diamitani
- **Impacted teams:** GTM AI/Automation, anyone owning n8n pipelines.
- **Approvals:** None needed for a read-only internal tool.

## 10. Open Context
- Born directly out of the country-data/Onspring incident — the whole reason this is worth building is that a silent multi-week failure should have been caught in minutes.
- Should explicitly support the "paste a URL or just describe the workflow" UX Patrick asked for.
- Keep it strictly read-only in v1 for safety (no workflow edits).

## 11. RAG Enrichment Layer
- **n8n Public API key facts (verified live):**
  - Auth header: `X-N8N-API-KEY`
  - `GET /workflows?limit=100&cursor=...` — cursor-based pagination (NOT offset); ~100/page
  - `GET /workflows/{id}` — full node + connection definitions
  - `GET /executions?workflowId={id}&status={error|success|waiting}&limit={n}` — filterable list
  - `GET /executions/{id}?includeData=true` — full run data; per-node errors at `data.resultData.runData.[nodeName][0].error`
  - Retention: ~25 executions/workflow on n8n Cloud — pull-and-persist for longer trends
- **Best practice:** separate read-only analysis from any write actions (n8n-engineer skill guidance); store credentials in a secret store, never inline.

## 12. Extracted Signals
- **Assumption:** the same API key used for diagnosis is the one this skill will use (already validated).
- **Constraint flagged (N-class):** API key must live in a credential/env var, not in skill output.
- **Opportunity:** a scheduled "health scan" across all workflows closes the silent-failure gap permanently — directly prevents a repeat of the Onspring incident.
- **Open question:** where should persisted execution history live for trend analysis (local file, Azure blob, a table)? — to confirm with Patrick.
