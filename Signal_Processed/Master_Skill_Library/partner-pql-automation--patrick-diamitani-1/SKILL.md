---
name: partner-pql-automation--patrick-diamitani-1
description: Process/Note derived from Partner PQL Automation — Patrick Diamitani (1).pdf
source_path: Atlas Portfolio/Partner PQL Automation — Patrick Diamitani (1).pdf
---

# Partner PQL Automation — Patrick Diamitani (1).pdf

## Context
This skill provides knowledge, processes, and instructions derived from the document: `Partner PQL Automation — Patrick Diamitani (1).pdf`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

7/17/26, 3:08 PM

Partner PQL Automation — Patrick Diamitani

Patrick Diamitani / ENTERPRISE AI PRODUCTION

LinkedIn ↗

Skill & Product Library / RevOps
Automation Workflow

Live in production

Partner PQL Automation
AI lead classification & routing — genuine partnership leads reach a human; vendor spam never
does.
Live — AI-drafted responses reach only genuine leads; vendor spam filtered with zero manual
triage
n8n

Azure OpenAI

HubSpot

lead routing

classification

Overview
A global HR-tech (EOR) platform's partner-inquiry form mixed genuine partnership leads (referral,
alliance, integration) with vendor spam, and everything landed on one person to triage by hand. This
webhook-triggered n8n workflow classifies every submission with an enterprise LLM, stamps CRM
properties and lifecycle stage, creates a high-priority task with an AI-drafted response for the
partnerships owner on real leads — and politely filters vendor pitches with no task and no email, so a
human's attention is spent only where it matters.

The Problem
Partner-form submissions on the company website mixed real partnership opportunities with vendor
pitches (agencies, tool sellers, cold outreach disguised as "partnership inquiries"). Every submission
funneled to one person to manually read, classify, and respond to — a bottleneck that also meant real
leads sometimes waited behind spam.

How It Works
https://diamitani.github.io/patrick-diamitani-portfolio/products/partner-pql-automation.html

1/4

7/17/26, 3:08 PM

Partner PQL Automation — Patrick Diamitani

1. Webhook trigger — the partner-inquiry form POSTs directly into n8n (a workflow-automation
platform) the moment it's submitted, no polling delay.
2. AI classification — an enterprise LLM reads the submission and classifies partner type: referral,
alliance, integration, or vendor pitch — the four buckets that determine what happens next.
3. CRM stamping — properties and lifecycle stage are written to the associated contact/company
record via the CRM API, so the classification lives on the record permanently, not just in an email.
4. Routing on genuine leads — for referral/alliance/integration leads, a high-priority task is created
and assigned to the partnerships owner, paired with an AI-drafted first-response email ready to send
or edit.
5. Silent filtering on vendor spam — pitches classified as vendor spam get no task and no email —
filtered politely with zero human time spent, rather than dumped in someone's queue.
6. Shared error handling — the workflow is wired into the team's standard shared error-handler
workflow, so a failure here surfaces the same way every other automation's failures do (not a silent,
one-off gap).

Stack & Integrations
Tool

Role

Access needed

n8n

Webhook trigger + orchestration

n8n workspace, webhook enabled

Enterprise LLM
(Azure OpenAI)

Partner-type classification + AI-drafted
response generation

Deployment + API credential

CRM API
(HubSpot)

Contact/company properties, lifecycle
stage, task creation, owner routing

Private-app token (contacts/companies
read-write, tasks, owners)

Shared errorhandler workflow

Standardized failure alerting across the
automation stack

Internal n8n workflow reference

Setup Process
1. Import the workflow JSON into n8n; bind LLM and CRM credentials.
2. Point the partner-inquiry form's webhook at the n8n trigger URL.
3. Create/confirm the CRM properties the workflow stamps (partner type, lifecycle stage) and the taskowner assignment rule.
4. Wire the workflow into the shared error-handler pattern used across the automation stack.
5. Run the three included test payloads (valid partner, vendor spam, alliance) to confirm expected
behavior before the form goes live.
https://diamitani.github.io/patrick-diamitani-portfolio/products/partner-pql-automation.html

2/4

7/17/26, 3:08 PM

Partner PQL Automation — Patrick Diamitani

6. Activate; monitor the first week of live submissions against the classification.

What You Need
[ ] n8n workspace with webhooks enabled
[ ] Enterprise LLM deployment + API credential
[ ] CRM private-app token (contacts/companies read-write, tasks, owner routing)
[ ] A defined partnerships owner to route tasks to
[ ] ~2–3 hours to deploy and test against sample payloads

Results
Live in production. High-priority tasks with AI-drafted responses reach the partnerships owner only
for genuine partnership leads; vendor pitches are filtered with zero manual triage.

Shipped with three curl test payloads (valid partner / vendor spam / alliance) that defined expected
behavior before the form went live — test-first deployment.
Fixed a CRM API version-mismatch bug pre-launch that would have silently created tasks with no
contact attached.

Challenges & Fixes

CRM API version change (an internal ID field renamed) → would have silently created orphaned
tasks (no contact attached) → caught and fixed in the deploy guide before go-live.

Node reordering risk breaking references → hardened node references so the workflow survives
being rearranged during future edits.

No test coverage for a form that hadn't launched yet → three curl payloads (valid partner /

vendor spam / alliance) authored to define and verify expected behavior before real traffic arrived.

Failures needing a consistent alerting path → wired into the team's shared error-handler
workflow instead of a one-off try/catch.

Demonstrates
LLM classification in a production CRM path · defensive integration coding (catching an API version
mismatch before it silently corrupted data) · test-first deployment discipline.

STACK & INTEGRATIONS
n8n

Azure OpenAI

HubSpot

https://diamitani.github.io/patrick-diamitani-portfolio/products/partner-pql-automation.html

3/4

7/17/26, 3:08 PM

Partner PQL Automation — Patrick Diamitani

WHAT IT NEEDS

✓ n8n workspace with webhooks enabled
✓ Enterprise LLM deployment + API credential
✓ CRM private-app token (contacts/companies read-write, tasks, owner routing)
✓ A defined partnerships owner to route tasks to
DISCUSS THIS BUILD
Happy to walk through the architecture, the failures along the way, or how this could translate to your team.

Email Patrick

© 2026 Patrick Diamitani. Case studies anonymized for public portfolio use — no employer-identifying or client-identifying detail
included.
pdiamitani@atlashxm.com · linkedin.com/in/diamitani

https://diamitani.github.io/patrick-diamitani-portfolio/products/partner-pql-automation.html

4/4
