---
name: ai-customer-agent-suite--patrick-diamitani-1
description: Process/Note derived from AI Customer Agent Suite — Patrick Diamitani (1).pdf
source_path: Atlas Portfolio/AI Customer Agent Suite — Patrick Diamitani (1).pdf
---

# AI Customer Agent Suite — Patrick Diamitani (1).pdf

## Context
This skill provides knowledge, processes, and instructions derived from the document: `AI Customer Agent Suite — Patrick Diamitani (1).pdf`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

7/17/26, 3:06 PM

AI Customer Agent Suite — Patrick Diamitani

LinkedIn ↗

Patrick Diamitani / ENTERPRISE AI PRODUCTION

Skill & Product Library / Sales Automation
AI Agent System

Live in production

AI Customer Agent Suite
A production website AI agent, plus the qualification pipeline, reporting warehouse, and
revenue-attribution layer that prove exactly what it's worth.
Quarter-million-dollar deal sourced from a single chat — traced to the exact conversation
HubSpot

Breeze Customer Agent

MQL classification

revenue attribution

n8n

Azure OpenAI

GPT-4o-mini

Microsoft Graph

SharePoint

LangChain

Overview
A production AI customer agent for a global HR-tech (EOR) platform (~500 employees, hiring in 160+
countries) — built end to end by one person: the agent itself (versioned conversation guidelines,
guardrails, knowledge base, routing), a live AI qualification pipeline that classifies every closed chat as
MQL or Not under strict governance rules, a three-workflow reporting warehouse, and a three-tier dealattribution layer. Live on the pricing page since launch. Headline result: a visitor chatted one day, the
pipeline stamped an MQL, and a rep opened a quarter-million-dollar deal the next day — traceable to
the exact conversation. Over $500K in agent-sourced deal value in the first four months.

The Problem
The company needed an AI agent on its website that qualifies visitors, feeds the CRM cleanly, and — the
hard part — can prove its revenue impact. Chatbot leads were unattributed, duplicated, and
contaminated by hundreds of legacy pre-launch contacts, so nobody could answer "what is the chatbot
worth?"

How It Works
https://diamitani.github.io/patrick-diamitani-portfolio/products/ai-customer-agent-suite.html

1/5

7/17/26, 3:06 PM

AI Customer Agent Suite — Patrick Diamitani

1. HubSpot Customer Agent (Breeze) — HubSpot's native AI chat product — runs the agent on the
pricing page under versioned conversation guidelines governing what it says and when it routes to
sales, partners, or support.
2. On every closed conversation, a webhook fires an n8n qualification workflow (4,146 logged
executions) — n8n is a visual workflow-automation platform that orchestrates the whole pipeline.
3. A hand-written JavaScript normalizer strips HTML, orders messages, distinguishes visitor from bot
by actor ID, and extracts email/phone/company from free text with personal-domain filtering —
deterministic cleanup before any AI sees the data.
4. An Azure OpenAI GPT-4o-mini agent (Microsoft-hosted OpenAI model) with a structured-output
parser classifies MQL vs Non-MQL under authored rules: only visitor messages count as intent;
confidence < 0.65 forces Non-MQL; blank values never overwrite existing CRM data. MQLs get
lifecycle + 15 chatbot properties stamped via the HubSpot CRM APIs, plus a drafted follow-up
email.
5. A three-workflow reporting warehouse — webhook event collector, daily reconciliation job, and
hourly AI-credit watcher (4-tier thresholds: 60/75/85/90%) — writes to a five-table SharePoint Excel
workbook via Microsoft Graph, Microsoft's API for Office 365 files and mail.
6. A deal-attribution walk (deal → contact → chatbot properties) assigns three honesty tiers —
sourced, influenced, excluded — operationalized as a weekly n8n stamper writing attribution tier +
originating conversation onto deals, report-only until sign-off.

Stack & Integrations
Tool

Role

Access needed

HubSpot Customer Agent
(Breeze)

The visitor-facing agent

Portal admin (chatflows, knowledge
base)

n8n cloud

Pipeline orchestration
(LangChain agent nodes)

n8n workspace; workflow import rights

Azure OpenAI (GPT-4o-mini)

MQL classification + email
drafting

Azure OpenAI deployment + API
credential

HubSpot Conversations +
CRM v3/v4 APIs

Threads, contacts, deals,
property writes

Private-app token: conversations read,
contacts/deals read-write

Microsoft Graph

SharePoint Excel warehouse +
Outlook alerts

OAuth2: file read-write, mail send

Python dashboard

Local reporting views

Read access to warehouse workbook

https://diamitani.github.io/patrick-diamitani-portfolio/products/ai-customer-agent-suite.html

2/5

7/17/26, 3:06 PM

Setup Process

AI Customer Agent Suite — Patrick Diamitani

1. Configure the Customer Agent chatflow, knowledge base, and conversation guidelines in HubSpot.
2. Run the property-creation script to create the custom chatbot contact properties (idempotent —
skips existing).
3. Build the attribution stamp workflow in HubSpot (engagement flag + source, never overwriting
native source fields).
4. Import the MQL classification workflow JSON into n8n; bind HubSpot private-app and Azure OpenAI
credentials; wire the shared error workflow.
5. Register the conversation-close webhook; deploy the warehouse workflows and SharePoint
workbook.
6. Dry-run on a sample of closed conversations; verify stamps on live contacts before enabling writes.
7. Deploy the attribution stamper in report-only mode; enable deal writes only after sign-off.

What You Need
HubSpot portal with Customer Agent (Breeze) enabled + private-app token
Azure OpenAI deployment (GPT-4o-mini)
n8n cloud workspace; Microsoft 365 (SharePoint + Outlook) OAuth credential
Workflow JSONs + property script · Time-to-deploy: ~2–3 weeks including pilot

Results
A quarter-million-dollar open deal sourced by the agent — visitor chat one day, rep-opened deal
the next, traced to the exact originating conversation

Over $500K in agent-sourced deal value in the first four months; ~$680K year-to-date closed-won
on chatbot-engaged contacts (influence tier)

~$3.6M lifetime deal value across ~390 chatbot-engaged contacts; 4,146 logged pipeline
executions

Challenges & Fixes

Hundreds of legacy pre-launch contacts contaminated metrics → excluded tier + launch-era cutoff;
even a lost first-attributed deal stays counted (influence, not cherry-picking)
Webhook-only reporting missed late closures → hybrid design: webhook collector and daily
reconciliation rebuild

Over-eager AI classification risk → confidence gate (<0.65 = Non-MQL), visitor-messages-only intent,
never-overwrite rule

https://diamitani.github.io/patrick-diamitani-portfolio/products/ai-customer-agent-suite.html

3/5

7/17/26, 3:06 PM

AI Customer Agent Suite — Patrick Diamitani

"Why did this chat not create a contact?" → reconciliation-gap metric answered by transcript email
search

Demonstrates

Full-stack AI product ownership (agent → pipeline → warehouse → attribution) · LLM governance rails
in a production CRM · revenue-attribution design · executive-grade reporting.

STACK & INTEGRATIONS
HubSpot Customer Agent (Breeze)
Azure OpenAI

HubSpot Conversations API

Microsoft Graph (SharePoint Excel + Outlook)

HubSpot CRM v3/v4 APIs

n8n cloud

Python dashboard

WHAT IT NEEDS

✓ HubSpot portal with Customer Agent (Breeze) enabled
✓ HubSpot private-app token (conversations read; contacts/deals read-write)
✓ Azure OpenAI deployment (GPT-4o-mini)
✓ n8n cloud workspace
✓ Microsoft 365 OAuth credential (SharePoint file read-write, mail send)
DISCUSS THIS BUILD
Happy to walk through the architecture, the failures along the way, or how this could translate to your team.

Email Patrick

© 2026 Patrick Diamitani. Case studies anonymized for public portfolio use — no employer-identifying or client-identifying detail
included.

https://diamitani.github.io/patrick-diamitani-portfolio/products/ai-customer-agent-suite.html

4/5

7/17/26, 3:06 PM

AI Customer Agent Suite — Patrick Diamitani

pdiamitani@atlashxm.com · linkedin.com/in/diamitani

https://diamitani.github.io/patrick-diamitani-portfolio/products/ai-customer-agent-suite.html

5/5
