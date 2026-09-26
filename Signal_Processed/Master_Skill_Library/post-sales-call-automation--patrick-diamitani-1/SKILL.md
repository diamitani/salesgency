---
name: post-sales-call-automation--patrick-diamitani-1
description: Process/Note derived from Post-Sales Call Automation — Patrick Diamitani (1).pdf
source_path: Atlas Portfolio/Post-Sales Call Automation — Patrick Diamitani (1).pdf
---

# Post-Sales Call Automation — Patrick Diamitani (1).pdf

## Context
This skill provides knowledge, processes, and instructions derived from the document: `Post-Sales Call Automation — Patrick Diamitani (1).pdf`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

7/17/26, 3:09 PM

Post-Sales Call Automation — Patrick Diamitani

LinkedIn ↗

Patrick Diamitani / ENTERPRISE AI PRODUCTION

Skill & Product Library / Sales Automation
Automation Workflow

Live in production

Post-Sales Call Automation
Four AI agents on every sales call — follow-up email, missed questions, competitor intel, and a
CRM note, with zero rep action.
Every sales call → 5 AI deliverables, zero rep action
n8n

Azure OpenAI

HubSpot

Avoma

Azure Blob Storage

Outlook

multi-agent

sales follow-up

Overview
An always-on, multi-agent pipeline that turns every recorded sales call into a rep-ready follow-up
package. Triggered by a webhook after each call, it pulls the Avoma transcript, detects which countries
the buyer wants to hire in, fetches exact country employment-law files from Azure Blob Storage, and
runs four AI agents: a consultative "If I Were You" follow-up email, a missed-questions analysis,
competitor research, and a LinkedIn draft — then emails the rep via Outlook and logs a note to the
HubSpot deal. Built for a global HR-tech (EOR) platform where country-specific facts win deals. Result:
five deliverables per call, zero rep action.

The Problem
At a global HR-tech (EOR) platform (~500 employees, operating in 160+ countries), reps left sales calls
without consistent follow-ups, missed buyer questions went unnoticed, and country-specific facts —
the heart of Employer-of-Record selling — varied from rep to rep. Follow-up quality depended entirely
on individual discipline.

How It Works
https://diamitani.github.io/patrick-diamitani-portfolio/products/post-sales-call-automation.html

1/4

7/17/26, 3:09 PM

Post-Sales Call Automation — Patrick Diamitani

1. Webhook trigger (Avoma → n8n cloud) — a call-recording webhook fires after every sales call; n8n
is a workflow-automation platform that runs the pipeline always-on, regardless of whose laptop is
off.
2. Meeting guard + transcript polling — a completed-meeting check skips future/scheduled
meetings; a bounded wait loop (20 polls × 2 min, ~40 min budget) retries until the transcript is
ready, then exits gracefully instead of dead-ending.

3. Country extraction → ISO-3 codes — an LLM step reads the transcript and extracts only countries
with real hiring intent (max 8, hard cap 10), mapping each to its ISO-3 code (Germany → DEU).
4. Deterministic country-data fetch — exact files are pulled from Azure Blob Storage ( countrydata/<ISO3>.md , 250+ countries) — cloud file storage, anonymous read, no index, no tokens to
rotate. A context-builder step strips internal noise before injection.
5. Four Azure OpenAI agents — enterprise-hosted GPT models draft the follow-up email, missedquestions analysis, competitor research, and LinkedIn post, each with an explicit "specificity
requirement" (cite concrete facts like "13th-month pay split 50% June / 50% December," never
generic filler).
6. Delivery — Outlook (Microsoft's email service) sends the package to the rep and sales leadership;
the HubSpot API logs a note to the associated deal.

Stack & Integrations
Tool

Role

Access needed

n8n (cloud)

Workflow engine, always-on

n8n cloud workspace, webhook enabled

Avoma

Call recording + transcript API

Avoma API key (read meetings/transcripts)

Azure OpenAI

4 LLM agents + country extraction

Azure OpenAI deployment + API credential

Azure Blob
Storage

250+ country data files
( <ISO3>.md )

Anonymous-read container (or SAS if
private)

HubSpot API

Deal/contact lookup, note creation

Private app / OAuth with CRM read + notes
write

Microsoft
Outlook

Email delivery to reps

Microsoft 365 OAuth connection in n8n

Setup Process
1. Import the workflow JSON into n8n (imports inactive).
https://diamitani.github.io/patrick-diamitani-portfolio/products/post-sales-call-automation.html

2/4

7/17/26, 3:09 PM

Post-Sales Call Automation — Patrick Diamitani

2. Re-link credentials on each node: Azure OpenAI models, HubSpot, Outlook, Avoma HTTP nodes.
3. Stage country data files in a blob container named by ISO-3 code.
4. Register the n8n webhook URL as the post-call trigger.
5. Dry-run with a saved real webhook body, email routed only to yourself.
6. Verify context assembly size and agent output specificity, then activate and widen the recipient list.

What You Need
[ ] n8n cloud workspace · Avoma API access · Azure OpenAI deployment
[ ] Azure Blob container with country markdown files
[ ] HubSpot private-app scopes (deals/contacts read, notes write) · Outlook OAuth
[ ] ~2–4 hours to deploy and dry-run

Results
Live in production — every call auto-produces 5 deliverables (email, missed questions, competitor
intel, LinkedIn draft, HubSpot note) with zero rep action.

Rebuilt from 21/25 executions failing → 2/2 verified end-to-end passes (0/25 previously reached
the email step).
Verified on a real three-country South America call: 116K characters of live country context
assembled.

Extraction tightening: 20 → 6 countries per call, context 882KB → 295KB (~74K tokens) — lower
cost, better signal.

Challenges & Fixes
Azure AI Search vector index died (84% of failures) and couldn't be recreated due to permissions

→ removed the RAG layer entirely; replaced with deterministic blob fetch (country code → exact
file). The failure point was deleted, not patched.

Silent wait-loop dead-ends → future-meeting guard, count-zero retry path, 10 → 20 poll budget,
explicit End nodes.

Paired-item lineage break lost the transcript → context builder carries base fields forward; all 28
fragile per-item references converted to pairing-immune ones.

Generic, templated output → stripped internal noise from country files and enforced a specificity
requirement on all four agents.

Demonstrates

https://diamitani.github.io/patrick-diamitani-portfolio/products/post-sales-call-automation.html

3/4

7/17/26, 3:09 PM

Post-Sales Call Automation — Patrick Diamitani

Event-driven multi-agent pipelines · pragmatic RAG-vs-deterministic judgment · graceful degradation ·
production debugging from execution forensics.

STACK & INTEGRATIONS
n8n

Avoma

Azure OpenAI

Azure Blob Storage

HubSpot

Microsoft Outlook

WHAT IT NEEDS

✓ n8n cloud workspace with webhooks enabled
✓ Avoma API access (read meetings/transcripts)
✓ Azure OpenAI deployment + credential
✓ Azure Blob Storage container with country data files (ISO-3 named)
✓ HubSpot private app (deals/contacts read, notes write)
✓ Microsoft 365 / Outlook OAuth connection
DISCUSS THIS BUILD
Happy to walk through the architecture, the failures along the way, or how this could translate to your team.

Email Patrick

© 2026 Patrick Diamitani. Case studies anonymized for public portfolio use — no employer-identifying or client-identifying detail
included.
pdiamitani@atlashxm.com · linkedin.com/in/diamitani

https://diamitani.github.io/patrick-diamitani-portfolio/products/post-sales-call-automation.html

4/4
