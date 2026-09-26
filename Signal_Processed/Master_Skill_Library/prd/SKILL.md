---
name: prd
description: Process/Note derived from PRD.md
source_path: n8n execution analyst/PRD.md
---

# PRD.md

## Context
This skill provides knowledge, processes, and instructions derived from the document: `PRD.md`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

# PRD — n8n Execution Analyst
Owner: Patrick Diamitani | Phase: D1 — Design | Last Updated: 2026-06-21 | Quality: 90%

---

## 1. Leadership Summary
══════════════════════════════════════
**LEADERSHIP SUMMARY — n8n Execution Analyst**
Owner: Patrick Diamitani | Phase: D1 — Design

**WHAT IS THIS?**
A tool that lets anyone instantly check the health of our automation workflows. You paste a workflow link (or just describe it), and it tells you whether it's running, what broke, when it broke, and turns the results into a spreadsheet or plain-English summary.

**WHY NOW?**
We just had an automation fail silently every week for over a month — no one knew until an end user noticed missing data. This tool would have caught it in minutes instead of weeks.

**SUCCESS LOOKS LIKE:**
- Diagnosing a broken workflow drops from ~30+ minutes of manual digging to under 2 minutes
- Failures get caught proactively by a scheduled scan, not by end users
- Works across all ~100+ of our workflows, by anyone — not just whoever can read API JSON

**WHERE WE ARE:**
D1 — Design. API access already proven. Ready to build.

**RISKS / BLOCKERS:**
None blocking. One must-do: store the n8n API key securely (not in plain output).
══════════════════════════════════════

## 2. Project Summary
A Claude skill that connects to the Atlas n8n instance via the Public API, resolves any workflow (by ID, URL, or fuzzy name search), pulls its execution history and per-node detail, and produces analysis in whatever shape the user wants — spreadsheet, inline table, or written summary. Read-only in v1.

## 3. Goals and Outcomes
- Instant, self-serve diagnosis of any workflow's health and failures
- Exportable, shareable outputs (spreadsheets/tables) for non-technical stakeholders
- A proactive health scan that eliminates silent multi-week failures

## 4. Business Use Case
Atlas runs its GTM data pipelines on n8n. When one breaks, downstream data (country data, enrichment, CRM syncs) silently degrades. The cost is delayed detection and manual diagnosis. This skill turns n8n's execution data into immediate answers and prevents repeat silent-failure incidents like the country-data/Onspring break.

## 5. Objectives and Milestones
1. **Resolver** — given ID / URL / name, return the right workflow(s)
2. **Execution puller** — list + filter executions, fetch full per-node data
3. **Analyzer** — find failing node, error message, failure-start date, success rate
4. **Output layer** — .xlsx / .csv / inline table / written summary
5. **(Stretch) Health scan** — scan all workflows, flag failures/stalls, alert

## 6. Project Deliverables
- `n8n-execution-analyst` skill (SKILL.md + helper scripts)
- Spreadsheet/table export templates
- Optional scheduled health-scan workflow + alert
- Usage doc for the team

## 7. Dates and Timelines
Near-term. API is proven; core resolver + analyzer is the bulk of the work. [Inferred]

## 8. KPIs and Metrics
| KPI | Source | Target |
|---|---|---|
| Time-to-diagnose | manual timing | < 2 min |
| Failures caught proactively | health scan log | majority before end users |
| Workflow coverage | API | all workflows in instance |

## 9. Data Sourcing, Storage, and Display
- **Source:** n8n Public API (`/workflows`, `/executions`, `/executions/{id}?includeData=true`)
- **Storage:** transient by default; optional persistence of pulled executions for trend analysis (location TBD — local/Azure/table)
- **Display:** inline tables, downloadable .xlsx/.csv, written summaries; optional HTML/Slack health report

## 10. Intended Project Impact
Detection of automation failures shifts from reactive (end user complains) to proactive (scan + alert), and diagnosis from specialist-only to anyone-with-the-skill.

## 11. Desired End Product State
Paste a workflow URL or say "check the country data workflow" → get a clean health readout, the failing node + error + first-failure date, and a one-click spreadsheet export — without touching the n8n UI.

## 12. Tech Stack and Key Sheet
See `TECH_STACK.md`. Core: n8n Public API (✓ confirmed), Python (openpyxl/pandas) in skill runtime.

## 13. Budget and ROI
Effectively zero marginal cost (uses existing n8n API + skill runtime). ROI is high: prevents repeat silent-failure incidents that degrade GTM data and consume hours of manual diagnosis.

## 14. Architecture Diagram
See `ARCHITECTURE.md`.

---

## Requirements

### Functional
- [ ] Resolve workflow by exact ID
- [ ] Resolve workflow by full n8n URL (parse the ID out)
- [ ] Resolve workflow by fuzzy name search across all pages (cursor pagination)
- [ ] List executions for a workflow, filterable by status and limit
- [ ] Fetch full execution data and extract per-node errors + timings
- [ ] Detect: failing node, error message, first-failure timestamp, success/error counts
- [ ] Output as .xlsx, .csv, inline table, or prose — user's choice
- [ ] Handle active and inactive workflows

### Non-Functional
- [ ] API key stored as credential/env var, never printed in output
- [ ] Read-only — no write/edit/deploy calls in v1
- [ ] Graceful handling of the ~25-execution retention limit (note it; persist if trend needed)
- [ ] Clear messaging when a workflow/execution isn't found

## Risks
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| API key leaks via output | Med | High | Store as env/credential; scrub from any printed result |
| Retention limit hides older failures | High | Med | Note limit; offer persist-to-storage for trend analysis |
| Name search ambiguity (multiple matches) | Med | Low | Return ranked matches, ask user to pick |
| Scope creep into write actions | Med | Med | Hard rule: v1 is read-only |

## Success Criteria (Done = all true)
- Any workflow resolvable by ID/URL/name
- Failing node + error + first-failure date returned in under 2 min
- Spreadsheet export works
- Read-only confirmed; key never exposed
