---
name: turnriver-sdr-agent-demo-build-spec
description: Process/Note derived from turnriver-sdr-agent-demo-build-spec.pdf
source_path: turnriver-sdr-agent-demo-build-spec.pdf
---

# turnriver-sdr-agent-demo-build-spec.pdf

## Context
This skill provides knowledge, processes, and instructions derived from the document: `turnriver-sdr-agent-demo-build-spec.pdf`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

Turn/River SDR Agent — Demo Build Specification
Version: 0.1-demo
Execution mode: implementation-support
Demo objective: Demonstrate a governed AI SDR workspace that turns a portfolio-company
brief into an approved ICP, researched lead queue, personalized sequence draft, and a staged
automation handoff. Nothing is sent externally during the demo.

1. Product definition
Mission
Build an internal multi-tenant SDR Agent platform for Turn/River operating teams and
portfolio companies. It should compress the path from GTM context to validated prospects and
ready-to-launch outreach, while retaining human approval and an audit trail.

Primary job to be done
When an operating partner or portfolio-company GTM lead needs a repeatable outbound
motion, help them define the correct ICP, find and qualify prospects, produce evidencegrounded personalization, create a channel sequence, and stage records for the approved
sending system—without relying on manual research, spreadsheet handoffs, or unreviewed
sending.

Demo success path
1. User selects DemoCo workspace and opens chat.
2. User says: Build an ICP for our workflow software, research 10 VP Operations
prospects, and create a 4-step sequence.

3. Agent returns an ICP card, a prioritized lead table, and lead-research evidence.
4. User opens a sequence draft and edits/approves it.
5. User clicks Stage 10 contacts to sequence.
6. App displays Awaiting approval / mock delivery and writes an audit event—never sends
email.

2. Scope and non-goals

In the working demo
Workspace switcher: Turn/River Internal + DemoCo portfolio company.
Chat interface with tool-event timeline.
ICP builder with firmographic, role, pains, triggers, exclusions, and scoring weights.
Research queue using seeded demo accounts/contacts, with source URLs and confidence
labels.
CSV lead import, dedupe, and field mapping.
Lead table with New, Researching, Qualified, Review, Staged, Enrolled, Suppressed states.
Sequence studio that generates a four-step email sequence and personalization snippets.
Approval drawer that stages enrollment only.
Dashboard metrics populated from seed data: leads researched, qualified, staged, reply
rate, meetings, and pipeline influence.
Knowledge base file registry and configuration panel.
Automation Center showing webhook payloads and n8n workflow statuses; actual
execution is disabled by default.

Explicitly out of scope for today
Live email sending, domain warm-up, inbox rotation, or sending-provider credentials.
Autonomous scraping, LinkedIn automation, or contact-data acquisition without licensed
sources and company policy review.
Production RBAC, SSO, billing, real webhook credentials, or full CRM synchronization.
Claims of deliverability, response rate, or contact data accuracy based only on
generated/demo data.

3. ROSTR operating model
Master agent: TurnRiverSDR
Identity: A governed sales-development orchestration agent for Turn/River and portfoliocompany GTM teams.
Objective: Convert a company’s approved GTM knowledge into auditable, human-approved
ICPs, researched lead lists, outreach assets, and automation handoffs.
Inputs: workspace context; company/product brief; approved knowledge sources; ICP
constraints; imported leads; user requests; integration configuration; policy settings.
Outputs: versioned ICP; research dossier; scored leads; sequence draft; enrollment manifest;
dashboard metrics; run ledger; approval request.
Hard boundaries:

Never send external messages, enroll contacts, export contacts, write to a CRM, or activate
a workflow without a specific approval event.
Never present inferred firmographic/person data as fact; label source, timestamp, and
confidence.
Never retain API keys in database tables, chat logs, artifacts, or source control; use
environment-secret references only.
Do not invent a company’s value proposition, case study, compliance posture, or metrics.
Ask for a brief or use only approved KB evidence.
Apply suppression/unsubscribe/do-not-contact status before any staging action.
For any live integration, run a dry-run preview first and require re-approval if scope,
contact count, destination, or sequence changes.

Child agents
Agent

Owns

Produces

Can trigger

PAL Intake

Converts chat request into structured run
intent

Intent spec, assumptions,
questions

RAG-DAL targets

GTM Strategist

Defines ICP and segments

ICP version, scoring rubric,
exclusions

Research plan

RAG-DAL
Researcher

Researches accounts and people from
allowed sources

Lead dossier, citations,
confidence

Qualification
proposal

Prospect
Qualifier

Scores and routes leads

Score, reason codes, lead state

Review queue

Sequence
Architect

Creates editable, channel-aware copy

Sequence JSON, variants, merge
fields

Approval request

Automation
Planner

Selects approved workflow and builds
payload

Dry-run plan, webhook payload,
event map

Staging request

Compliance Gate

Enforces suppression, consent, policy, and
approval rules

Pass/fail and remediation

Blocks unsafe
actions

NPAO
Orchestrator

Sets phase, urgency, dependencies, and
routing

Run plan, queue priority,
handoffs

Child dispatch only

Runtime flow
chat intake → PAL intent spec → GTM Strategist → RAG-DAL research ↔ Prospect Qualifier
→ Sequence Architect → Compliance Gate → approval request → Automation Planner dry run
→ staged enrollment → results ingestion → dashboard

Only the NPAO Orchestrator manages run state. Research and writing agents may produce
artifacts; they may not perform side effects.

4. Information architecture
Navigation
Dashboard: KPI tiles, active runs, approval queue, funnel, activity feed.
Agent Chat: threaded chat, visible artifacts, tool timeline, suggested tasks.
Leads: import CSV, filters, scores, research dossiers, suppression state.
Sequences: templates, sequence editor, personalization preview, version history.
Automations: connector cards, dry-run logs, webhook events, failed runs.
Knowledge: product briefs, ICPs, case studies, positioning, battlecards, playbooks; source
status and retrieval scope.
Configuration: workspace, agent instructions, scoring weights, integrations, approval
policy.

Core data model
organizations(id, name, type, domain, created_at)
workspaces(id, organization_id, name, policy_json)
users(id, workspace_id, role)
knowledge_documents(id, workspace_id, title, source_uri, text, tags, approved_at)
icp_versions(id, workspace_id, name, definition_json, status, version)
accounts(id, workspace_id, name, domain, industry, size, region, research_json)
contacts(id, workspace_id, account_id, name, title, email, status, suppression_reason
lead_scores(id, contact_id, icp_version_id, score, reason_codes, confidence)
research_artifacts(id, entity_type, entity_id, content_json, citations_json, confiden
sequences(id, workspace_id, name, channel, definition_json, status, version)
sequence_enrollments(id, sequence_id, contact_id, status, approval_id, provider_ref)
runs(id, workspace_id, intent_json, phase, status, created_at)
run_artifacts(id, run_id, type, content_json, provenance_json, version)
approvals(id, workspace_id, run_id, action, scope_json, status, approved_by, approved
automation_runs(id, workspace_id, workflow_key, payload_json, mode, status, external_
audit_events(id, workspace_id, actor_type, actor_id, action, entity_type, entity_id,

5. Tool contracts
Implement Gemini function declarations as application-owned TypeScript handlers. The model
selects a function and arguments; the server validates, executes, records an audit event, and
returns structured results.
const tools = [
{ name: 'create_icp', args: { workspaceId: 'string', brief: 'string', constraints:
{ name: 'search_knowledge', args: { workspaceId: 'string', query: 'string', limit:
{ name: 'research_prospects', args: { workspaceId: 'string', icpVersionId: 'string
{ name: 'score_leads', args: { workspaceId: 'string', contactIds: 'string[]', icpVe
{ name: 'generate_sequence', args: { workspaceId: 'string', icpVersionId: 'string'
{ name: 'preview_enrollment', args: { workspaceId: 'string', sequenceId: 'string',
{ name: 'request_approval', args: { runId: 'string', action: 'string', scope: 'obje
{ name: 'stage_enrollment', args: { approvalId: 'string' } },

{ name: 'trigger_n8n_dry_run', args: { workspaceId: 'string', workflowKey: 'string
];
stage_enrollment must reject unless the approval has status approved, is unexpired, its

sequence/contact/provider scope exactly matches the preview, and every contact passes
suppression checks.

6. Integration posture
Domain

Demo adapter

Production adapter

Permission rule

LLM
orchestration

Gemini via Google AI
Studio/API

Gemini server API

Server-side API key only

Knowledge
retrieval

seeded documents +
uploaded files

approved Drive/Notion/repository
connectors

Workspace-scoped retrieval

Lead source

seeded CSV

licensed provider/API selected by Turn/River

No unlicensed collection

CRM

local mock

HubSpot adapter

Read first; write after
approval

Outreach

mock-outreach
provider

selected sequence provider

Stage/preview, then exact
scoped approval

Automation

n8n dry-run endpoint

n8n webhook with signed secret

No real execution in demo

State

local SQLite/mock
repository

AWS Postgres/Aurora or DynamoDB based
on platform decision

Tenant isolation + audit log

7. n8n workflow blueprint
lead-intake-and-enrich

Trigger: CSV import or CRM record created.
Nodes: Validate schema → dedupe → suppression check → account/lead research adapter → score
lead → save results → create review task → dashboard event.
approved-sequence-staging

Trigger: approved enrollment manifest.
Nodes: validate approval scope → re-check suppression → transform provider payload → demo:
return mock provider reference / production: call provider → record event → notify dashboard.
reply-and-result-sync

Trigger: provider or mailbox webhook.
Nodes: verify signature → match contact → classify reply → pause sequence → create CRM task →
update metrics → route positive reply to owner.

8. Demo seed data
Seed one portfolio-company workspace (DemoCo) with:
Product brief: AI workflow platform for mid-market operations teams.
ICP: US-based B2B software and services companies, 100–1,000 employees; VP Operations,
RevOps, COO; trigger = growth, system consolidation, or hiring operations leaders;
exclusions = agencies, competitors, existing customers, suppressed contacts.
12 accounts and 18 contacts with 8 qualified, 3 review, 2 suppressed, 5 unqualified.
One four-step sequence: Day 1 insight, Day 3 pain/relevance, Day 7 proof/objection, Day 12
respectful close.
Three mock automation runs: one succeeded, one awaiting approval, one blocked by
suppression.

9. Acceptance criteria
A user can complete the demo success path in under 5 minutes.
Each lead score has a numeric score, reasons, and confidence.
Each research assertion displays source URL or is clearly marked seed/demo data.
The sequence preview renders merge-field substitutions for at least three contacts.
Clicking stage without approval produces a visible block and audit event.
An approved mock staging action changes only the selected contacts to Staged and returns
a mock provider ID.
Dashboard updates from local events with no page refresh.
Application has zero live sending paths enabled in the demo environment.

10. Build order for the 1 PM demo
1. Scaffold a Next.js TypeScript app with a left navigation shell and dark enterprise UI.
2. Implement local seed data and repository functions before any external integration.
3. Build dashboard, chat, leads, sequence, and approval panels as a coherent click-through.
4. Add Gemini tool-call orchestration behind POST /api/chat; use deterministic mock
fallback if no key is configured.
5. Implement preview_enrollment and an approval dialog; make stage_enrollment a local
state transition only.
6. Add Automation Center that displays the n8n payload and a mock run result.
7. Test the 5-minute run with a fresh browser session.

11. Hermes / Google AI Studio build prompt
Build a polished, demo-ready full-stack web application called “Turn/River SDR Agent
Use Next.js 14+, TypeScript, Tailwind CSS, and shadcn/ui-style components. Use a loca
The app is an internal multi-tenant AI SDR workspace for Turn/River and portfolio com
Pages:
1. Dashboard: KPI cards (researched, qualified, staged, replies, meetings), funnel vi
2. Agent Chat: conversational UI. Add suggested prompts. Render structured agent arti
3. Leads: filterable table with account/contact, title, score, confidence, status, tr
4. Sequences: 4-step sequence editor with versions, merge fields, per-contact preview
5. Automations: n8n workflow cards for intake/enrichment, approved sequence staging,
6. Knowledge: document cards tagged Product, ICP, Proof, Positioning, Playbook. Inclu
7. Configuration: editable agent configuration, scoring weights, connector cards, and
Seed data: Create DemoCo, an AI workflow platform selling to 100–1,000 employee B2B c
User interaction flow: In chat, a request to build an ICP should produce a structured
Create a reusable domain model/types for Workspace, ICP, Account, Contact, LeadScore
Deliver all source files, a README with run instructions, and an .env.example contain

12. Demo narration
“Turn/River’s operators can spin up a portfolio-company workspace with its approved GTM
knowledge. The SDR Agent uses an ICP to research and score prospects, shows the evidence
behind qualification, and generates account-aware outreach. It doesn’t autonomously send: it
creates a precise enrollment manifest, checks suppression and policy, and stages the execution
only after approval. The same state model lets us connect the portfolio company’s licensed lead
source, CRM, outreach tool, and n8n workflows later without changing the operator
experience.”

13. Decisions after demo
Confirm AWS persistence choice: Aurora/Postgres versus DynamoDB.
Select the licensed prospect-data provider and outreach platform per portfolio company.
Define contact-data policy, lawful basis, suppression source, regional policy, and retention
period.
Identify Turn/River identity/RBAC requirements and tenant data-boundary expectations.
Map existing n8n workflows and define signed webhook contracts.
Approve which knowledge systems may be connected and whether retrieval is workspace
or organization scoped.
