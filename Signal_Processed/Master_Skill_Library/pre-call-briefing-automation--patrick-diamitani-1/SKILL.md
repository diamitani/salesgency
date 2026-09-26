---
name: pre-call-briefing-automation--patrick-diamitani-1
description: Process/Note derived from Pre-Call Briefing Automation — Patrick Diamitani (1).pdf
source_path: Atlas Portfolio/Pre-Call Briefing Automation — Patrick Diamitani (1).pdf
---

# Pre-Call Briefing Automation — Patrick Diamitani (1).pdf

## Context
This skill provides knowledge, processes, and instructions derived from the document: `Pre-Call Briefing Automation — Patrick Diamitani (1).pdf`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

7/17/26, 3:16 PM

Pre-Call Briefing Automation — Patrick Diamitani

Patrick Diamitani / ENTERPRISE AI PRODUCTION

LinkedIn ↗

Skill & Product Library / Sales Automation
Automation Workflow

Shipped

Pre-Call Briefing Automation
An AI briefing in the rep's inbox before every sales meeting — so no one walks in cold.
Context-rich AI brief in the rep's inbox before every scheduled meeting, with built-in dedupe
n8n

HubSpot

Azure OpenAI

Factors.ai

Outlook

sales enablement

Overview
The companion to Post-Sales Call Automation — together they bracket every sales call with AI. This n8n
workflow watches for upcoming sales meetings, assembles everything the rep should know — contact,
company, deal, and buyer-intent signals from the CRM — and has an enterprise LLM draft a structured
pre-call brief. The brief lands in the rep's inbox before the meeting and is logged to the CRM as a note
and a contact property, with dedupe logic so no meeting is briefed twice. Ships with an exec-readable
one-pager, a slide deck brief, and an architecture diagram — every stakeholder sees the same picture.

The Problem
Reps at a global HR-tech (EOR) platform walked into discovery calls cold. Context existed — deal
records, contact history, intent data — but it was scattered across CRM objects and third-party tools,
and nobody had time to assemble it before every meeting.

How It Works
1. Webhook trigger + payload normalization — a webhook fires into n8n (a workflow-automation
platform) with a contact or meeting event; a Code node normalizes the payload so downstream
steps see one consistent shape.
https://diamitani.github.io/patrick-diamitani-portfolio/products/pre-call-briefing-automation.html

1/4

7/17/26, 3:16 PM

Pre-Call Briefing Automation — Patrick Diamitani

2. Contact and meeting resolution (CRM API) — the workflow resolves the contact (adopting the
meeting's contact if no ID arrived), extracts associations, and batch-reads associated meetings to
pick the next upcoming one. The CRM is the system of record for contacts, companies, and deals.
3. Dedupe guard — an "existing brief" check verifies the meeting hasn't already been processed, so
reps never get duplicate briefings.
4. Context gathering — parallel CRM lookups pull the company, the deal, and the rep (owner), plus a
buyer-intent platform — showing which accounts are actively researching — all merged into one
context object.
5. AI brief drafting — an LLM agent with a structured output parser (enterprise-hosted model, forced
into a predictable JSON shape) drafts the pre-call brief from the assembled context.
6. Delivery + CRM logging — the brief is formatted into an email and sent to the rep; a CRM note is
created and a pre-call-notes contact property is updated so the brief lives on the record too.

Stack & Integrations
Tool

Role

Access needed

n8n

Workflow engine (26-node pipeline)

n8n workspace, webhook enabled

CRM API (HubSpot)

Contacts, meetings, companies, deals,
owners, notes, properties

Private app / OAuth with CRM read +
notes/properties write

Buyer-intent platform
(Factors.ai)

Intent signals for the account

API access (read intent data)

Enterprise LLM (Azure
OpenAI)

Brief-drafting agent + structured
output parser

Deployment + API credential

Email (Outlook)

Briefing email to the rep

Microsoft 365 OAuth connection in
n8n

Setup Process
1. Import the pre-call workflow JSON into n8n (imports inactive).
2. Re-link credentials: CRM, LLM, email, and the buyer-intent HTTP request.
3. Create/confirm the CRM pre-call-notes contact property the workflow writes to.
4. Register the webhook URL against the meeting/contact trigger source.
5. Dry-run with a test contact that has an upcoming meeting; confirm the dedupe guard passes then
blocks a second run.
https://diamitani.github.io/patrick-diamitani-portfolio/products/pre-call-briefing-automation.html

2/4

7/17/26, 3:16 PM

Pre-Call Briefing Automation — Patrick Diamitani

6. Review a sample brief for accuracy, then activate for the team.

What You Need
[ ] n8n workspace · CRM private-app scopes (contacts, meetings, companies, deals, owners read;
notes/properties write)
[ ] Enterprise LLM deployment · buyer-intent platform account with API access · email OAuth
[ ] ~2–3 hours to deploy and dry-run

Results
Shipped as a complete package: production workflow JSON, slide-deck brief, stakeholder onepager, and architecture diagram.
Designed to put a context-rich briefing in front of the rep before every scheduled sales meeting —
automatically, with built-in dedupe.
Together with Post-Sales Call Automation, brackets the entire sales-call lifecycle with AI (brief
before, follow-up after).

Challenges & Fixes

Inconsistent trigger payloads → a normalization Code node up front, plus an adopt-the-meetingcontact fallback when no contact ID arrives.

Risk of duplicate briefings → explicit "existing brief" gate before any AI spend.
Free-form LLM output → structured output parser forces a stable JSON schema before the email
formatter runs.

Demonstrates
End-to-end ownership of the sales-call lifecycle · intent-data enrichment in a CRM path · stakeholder
communication — every build ships with an exec-readable brief.

STACK & INTEGRATIONS
n8n

HubSpot

Azure OpenAI

Factors.ai

Outlook

WHAT IT NEEDS

✓ n8n workspace
✓ CRM private-app scopes (contacts, meetings, companies, deals, owners read; notes/properties write)
https://diamitani.github.io/patrick-diamitani-portfolio/products/pre-call-briefing-automation.html

3/4

7/17/26, 3:16 PM

Pre-Call Briefing Automation — Patrick Diamitani

✓ Enterprise LLM deployment
✓ Buyer-intent platform account with API access
✓ Email OAuth connection
DISCUSS THIS BUILD

Happy to walk through the architecture, the failures along the way, or how this could translate to your team.

Email Patrick

© 2026 Patrick Diamitani. Case studies anonymized for public portfolio use — no employer-identifying or client-identifying detail
included.
pdiamitani@atlashxm.com · linkedin.com/in/diamitani

https://diamitani.github.io/patrick-diamitani-portfolio/products/pre-call-briefing-automation.html

4/4
