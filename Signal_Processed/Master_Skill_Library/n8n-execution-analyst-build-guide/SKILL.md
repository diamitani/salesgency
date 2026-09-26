---
name: n8n-execution-analyst-build-guide
description: Process/Note derived from n8n-execution-analyst-BUILD-GUIDE.docx
source_path: n8n-execution-analyst-BUILD-GUIDE.docx
---

# n8n-execution-analyst-BUILD-GUIDE.docx

## Context
This skill provides knowledge, processes, and instructions derived from the document: `n8n-execution-analyst-BUILD-GUIDE.docx`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

Table of Contents
Build Guide — n8n Execution Analyst
Companion to:
 
n8n-execution-analyst-PRD.md
 
Method:
 
ROSTR 4Ds (Discover → Design → Develop → Deploy), NPAO task classification
 
Principle:
 
modular, idempotent, no destructive API calls, no hallucinated data.
Each phase below gives a
 
high-level overview
, then
 
nested sub-tasks
 
with the tools, APIs/MCP, and tests for each. The final section is the
 
agent handoff script
 
— a guardrailed prompt to hand to a build agent once the API key is live.
Phase 0 — Prerequisites (gate)
Overview:
 
nothing builds until access is real. This is the only blocking gate.
0.1 Obtain valid n8n API key
 
—
 
(N: Navigate)
0.1.1 Patrick: n8n → Settings → n8n API → Create API key (copy full
 
eyJ...
 
JWT).
0.1.2 Set
 
N8N_API_KEY
 
env var in the build environment (never commit).
0.1.3 Rotate the previously-pasted key.
Test:
 
GET /api/v1/workflows?limit=1
 
returns 200, not 401.
0.2 Run
 
rostr-builder
 
skill
 
to formalize the declarative agent spec (NPAO canvas, HUB layers).
Test:
 
spec file generated and reviewed.
Phase 1 — DISCOVER (API recon + real data)
Overview:
 
capture the
 
actual
 
workflow inventory and a few real execution payloads so the schema is grounded in reality, not assumptions.
1.1 Pull full workflow inventory
 
—
 
(N)
1.1.1 Paginate
 
GET /workflows
 
(cursor loop, limit 250) → list of
 
{id, name, active}
.
1.1.2 Save raw JSON to
 
data/fixtures/workflows.json
.
Tool:
 
requests
.
 
Test:
 
count > 0; both active and inactive present.
1.2 Capture sample executions
 
—
 
(N → P)
1.2.1
 
GET /executions?limit=20&includeData=false
 
to list recent runs.
1.2.2 For 3–5 IDs (mix success + error),
 
GET /executions/{id}?includeData=true
 
→ save to
 
data/fixtures/exec_<id>.json
.
Test:
 
at least one error fixture and one success fixture captured.
1.3 Map the JSON shape
 
—
 
(P)
1.3.1 Document where
 
runData
,
 
lastNodeExecuted
, per-node
 
error
,
 
status
,
 
startedAt
/
stoppedAt
 
live (confirm against PRD Appendix).
Test:
 
mapping doc matches real fixtures field-for-field.
Phase 2 — DESIGN (schema + skill arch + dashboard)
Overview:
 
lock the data model and interfaces before writing pipeline code.
2.1 Master store schema (SQLite, Postgres-ready)
 
—
 
(P)
2.1.1
 
workflows
 
table:
 
workflow_id
 
(PK),
 
name
,
 
active
,
 
first_seen
,
 
last_seen
.
2.1.2
 
executions
 
table:
 
execution_id
 
(PK),
 
workflow_id
 
(FK),
 
status
,
 
mode
,
 
started_at
,
 
stopped_at
,
 
finished
,
 
last_node_executed
,
 
error_message
,
 
error_node
,
 
raw_json
 
(full payload),
 
ingested_at
. One workflow → many dated execution rows (Patrick’s
 
“
sub-column per date/time of run
”
).
2.1.3
 
node_runs
 
table (optional, normalized):
 
execution_id
 
(FK),
 
node_name
,
 
start_time
,
 
execution_time_ms
,
 
status
,
 
error_message
,
 
output_json
.
2.1.4 Indexes on
 
workflow_id
,
 
started_at
,
 
status
.
Test:
 
schema migration runs clean on empty SQLite; FK constraints valid.
2.2 Skill architecture
 
—
 
(O)
2.2.1
 
SKILL.md
 
routing: detect intent → ingest / query / report / alert.
2.2.2 Module boundaries: ingest, parse, store, diagnose, query, alert, dashboard (each independently testable).
Test:
 
module interfaces documented; no circular deps.
2.3 Dashboard mockup
 
—
 
(O)
2.3.1 KPI header + runs-over-time + success/fail + failing-workflows table + drill-down.
Test:
 
Patrick approves layout before build.
Phase 3 — DEVELOP (the pipeline)
Overview:
 
build modular scripts, each with unit tests against the Phase 1 fixtures.
3.1
 
store.py
 
— DAL
 
—
 
(A)
3.1.1
 
init_db()
,
 
upsert_workflow()
,
 
upsert_execution()
,
 
query()
 
helpers.
3.1.2 Idempotent upsert keyed on
 
execution_id
.
Test:
 
insert same execution twice → one row.
3.2
 
parse.py
 
— extractor
 
—
 
(P)
3.2.1 From execution JSON, extract status, timestamps,
 
lastNodeExecuted
, top-level error, per-node runData + errors.
3.2.2 Absent field →
 
null
 
(never synthesize).
Test:
 
parses success + error fixtures correctly; matches n8n UI.
3.3
 
ingest.py
 
— pull + store
 
—
 
(A)
3.3.1 Paginate workflows + executions; fetch full data per execution; upsert.
3.3.2 Incremental mode: only pull executions newer than max stored
 
started_at
.
3.3.3 Backoff on 429; cap
 
limit
 
250.
Test:
 
end-to-end pull → row counts match API; re-run adds no dupes.
3.4
 
diagnose.py
 
— flow + failure analysis
 
—
 
(P)
3.4.1 Determine stop node (
lastNodeExecuted
) + reason (node error or top-level error).
3.4.2 Classify error types; flag recurring patterns (same node+error across runs).
Test:
 
known error fixture → correct stop node + reason.
3.5
 
query.py
 
— NLP/semantic query (grounded)
 
—
 
(O)
3.5.1 Parse plain-English question → structured DAL query (by ID, date range, workflow, status).
3.5.2 Return answer citing real execution IDs/dates. No DB hit →
 
“
no data,
”
 
never a guess.
Test:
 
fixed Q-set (
“
failures yesterday for workflow X?
”
) matches ground truth; every answer cites real IDs.
3.6
 
dashboard/build.py
 
— HTML
 
—
 
(O)
3.6.1 Query store → self-contained
 
index.html
 
(Chart.js + Grid.js via CDN, rest inline).
Test:
 
opens offline; numbers match store.
3.7
 
alert.py
 
— proactive ping
 
—
 
(A)
3.7.1 On failure/stall detected during ingestion → post to Slack/Teams webhook + email AI GTM team.
3.7.2 De-dupe: alert once per execution; daily digest of all failures.
Test:
 
synthetic failure → exactly one alert; healthy run → no alert.
Phase 4 — DEPLOY (schedule, package, document)
Overview:
 
make it run itself and hand it off.
4.1 Schedule daily ingestion
 
—
 
(A)
4.1.1 Cowork scheduled task at 06:00 CT → run
 
ingest.py
 
→ run failure check → send digest.
Test:
 
scheduled run completes; digest received.
4.2 Package the skill
 
—
 
(O)
4.2.1 Finalize
 
SKILL.md
 
+
 
/scripts
; usage examples for non-technical users.
Note:
 
skills can’t be created/edited in this session’s cache — final packaging via Settings → Capabilities or
 
skill-creator
.
4.3 Documentation
 
—
 
(O)
README, schema doc, runbook (alert response), API notes.
Test:
 
a teammate can set up + run from docs alone.
4.4 Verification pass
 
—
 
(P)
Independent subagent re-checks diagnosis + NLP grounding before release.
Phase 5 — SCALE (post-v1)
5.1 Migrate store SQLite → Postgres (same DAL interface).
5.2 Increase cadence to hourly if run volume warrants.
5.3 HubSpot sync: flag automation health on related records.
5.4 Optional Azure SWA host for a shareable live dashboard link.
Agent Handoff Script (guardrailed)
Hand this to a build agent
 
only after Phase 0 passes
 
(valid key set as
 
N8N_API_KEY
):
ROLE: Senior automation engineer. Build the n8n Execution Analyst per
n8n-execution-analyst-PRD.md and this Build Guide.
GUARDRAILS (hard limits):
- READ-ONLY n8n API. NEVER call DELETE /executions or any write/activate/deactivate endpoint.
- Read N8N_API_KEY from env only. Never print, log, or commit it.
- Extract only what the API returns. Absent field => null. No invented data.
- Idempotent ingestion: upsert on execution_id, never duplicate.
- Cap limit=250, paginate by cursor, exponential backoff on 429.
- After each module, run its unit test against data/fixtures/ before proceeding.
- Stop and ask before: migrating to Postgres, sending real alerts to live channels,
  or any action with external side effects.
SEQUENCE: Phase 1 (recon+fixtures) -> Phase 2 (schema+arch) -> Phase 3 (scripts,
test each) -> Phase 4 (schedule+docs). Report after each phase with test results.
DEFINITION OF DONE: all 7 milestones (M1-M7) met; verification subagent confirms
NLP answers cite real execution IDs and diagnosis matches the n8n UI on sample runs.
Sub-task summary (for tracking)
Phase
Sub-tasks
Gate/Test
0 Prereq
0.1–0.2
200 on
 
/workflows
1 Discover
1.1–1.3
real fixtures captured
2 Design
2.1–2.3
schema migrates; layout approved
3 Develop
3.1–3.7
each module unit-tested
4 Deploy
4.1–4.4
scheduled run + docs + verification
5 Scale
5.1–5.4
post-v1, optional
