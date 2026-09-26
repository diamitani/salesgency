---
name: prospect-automation-case-study
description: Process/Note derived from Prospect Automation Case Study.pdf
source_path: Prospect Automation Case Study.pdf
---

# Prospect Automation Case Study.pdf

## Context
This skill provides knowledge, processes, and instructions derived from the document: `Prospect Automation Case Study.pdf`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

$9M in Attributed Pipeline Since Inception —
An AI Inbound Lead Automation, Built and
Proven End-to-End

Case Study / Project Overview — FULL VERSION (internal) · Patrick Diamitani, GTM AI & Automation
Manager, Atlas HXM · July 2026

1. At a glance

The challenge: Atlas HXM's inbound "Contact Us" leads sat untriaged — no instant
qualification, no routing, and no way to prove what marketing automation was worth in
dollars.
What I built: An AI-powered n8n workflow that reads every inbound form submission,
classifies intent with Azure OpenAI, sets MQL lifecycle stages in HubSpot, routes
partnerships, and replies to sales-ready leads automatically — plus a measurement pipeline
that ties every run to CRM revenue.
The result: Across its complete production history since inception: 101 MQLs auto-created
(72% of runs), 29 sales deals, $6.38M in attributed pipeline, $130K closed-won, and
$9.06M total estimated impact — every dollar traceable to a specific workflow execution
ID.
Stack at a glance: n8n · Azure OpenAI (GPT agents) · Azure AI Search (vector store) ·
HubSpot CRM + API · Microsoft Outlook · Claude (agentic analysis) · HubSpot MCP · Python ·
Excel

2. The challenge

Atlas HXM is a global Employer of Record (EOR) platform — it legally employs workers in 160+
countries on behalf of client companies. Its "Contact Us" form is a front door for everything:
real buyers asking to speak with sales, job seekers, employment-verification requests, press,
and partnership pitches, all landing in the same queue.
That mix created two expensive problems. First, sales-ready leads waited in line behind noise —
a buyer asking for "EOR services in South Africa" got the same treatment as a résumé drop.
Second, and more damaging for the automation program: nobody could answer the question
"what has this actually made us?" Marketing automation without revenue attribution is a cost
center in every budget conversation.
The project had two halves: build the automation, then prove its economic value with numbers a
CFO would accept.

3. The approach

The design principle was classify once, act everywhere. Instead of routing raw form text to
humans, an AI agent reads each submission and makes one decision — what is this person
actually asking for? — and every downstream action (CRM update, lifecycle stage, partner
routing, auto-reply) flows from that single classification.
For measurement, the standard shortcut would be a HubSpot attribution report. I rejected that
in favor of execution-level attribution: pull every individual run of the workflow from the n8n
API, extract the exact contact that came through and what the workflow did to them, then
match those contacts against CRM deals with a strict rule — a deal counts only if it was created
on or after the day that contact came through the workflow. This deliberately excludes preexisting deals on returning contacts (including a $337K closed-won deal that predated the
workflow by one day), making the final number conservative and defensible.

4. What I built (how it worked)

Navigate. Mapped the inbound funnel end to end: HubSpot form submission webhooks → what
categories of inquiry actually arrive (seven, it turned out) → which HubSpot lifecycle mechanics
mark a contact as an MQL → where partnership inquiries need to land.
Prioritize. The "Speak with Sales" path first — it's where revenue lives. Career inquiries,
verification requests, and press get classified and tagged but consume no sales time.

Allocate. The 18-node n8n workflow divides the work:
A webhook node receives every HubSpot form submission in real time.
An Azure OpenAI "Analyze Category" agent classifies the message into one of seven
intents (Speak with Sales, Career Enquiry, Employment Verification, Partnership Enquiry,
General Enquiry, Press Enquiry, Customer Support).
A code node applies business logic: should this contact's lifecycle stage move to Marketing
Qualified Lead? Is this a partnership that routes elsewhere?
HubSpot nodes write the classification, update the lifecycle stage, and log notes — the CRM
is always the source of truth.
A second AI agent, grounded by an Azure AI Search vector store (retrieval-augmented
generation over Atlas knowledge), drafts a contextual reply to sales-ready leads —
referencing the country and service the prospect asked about.
A partner path creates a HubSpot note and sends a routed email via Microsoft Outlook
when the AI detects a partnership inquiry.
Orchestrate — the measurement pipeline. Once the workflow was in production, I built the
proof layer using Claude as an agentic analyst:
1. A resumable Python client pulled the workflow's complete execution history (166 runs)
from the n8n API (read-only, cursor-paginated, time-boxed batches to survive sandbox limits).
2. A parser walked each execution's node-level output data and extracted the contact (name,
email, company, message), the AI's classification, whether the MQL node fired, and any errors.
3. The HubSpot MCP (an AI-to-CRM connector) matched all 121 unique emails against live
CRM records — 116 found — then pulled every deal on those contacts with amounts, stages,
close dates, and WSE counts (workers to be employed through Atlas). 4. Attribution logic
separated the 29 workflow-attributed deals from 5 pre-existing ones, and a formula-driven
Excel workbook made every number auditable down to the execution ID.

Measurement
n8n API: 166 executions

Parse contacts + MQL flags

HubSpot MCP: match deals

Speak with Sales

Set MQL in HubSpot

Partnership

Partner note + Outlook email

Career / Press / Other

Tag in HubSpot

Attribution rule + Excel model

HubSpot form submission

n8n webhook

Azure OpenAI:
classify intent

RAG agent drafts reply
Azure AI Search

Intent?

5. Tools & integrations
Tool / Tech

What it is (plain English)

How it was used here

Connection / auth

n8n

Automation platform that
chains apps so steps fire
without humans

Runs the 18-node inbound
workflow; its API supplied the
execution history

n8n API key (kept in
environment variables,
never in code)

Azure
OpenAI

Microsoft-hosted GPT
models

Two AI agents: intent
classification + drafting
grounded sales replies

Azure credentials
managed in n8n

Azure AI
Search

A vector database — lets AI Grounds the reply agent in real
search company knowledge Atlas content (RAG)
by meaning

Azure credentials
managed in n8n

HubSpot
CRM + API

The CRM and system of
record

Scoped app token via
MCP (value never
exposed)

HubSpot
MCP

Model Context Protocol — a Let Claude query contacts,
secure connector that lets deals, and properties directly
an AI operate inside live
tools

Scoped OAuth
connection

Microsoft
Outlook

Email

OAuth via n8n

Lifecycle updates, notes, and
the deal/revenue data for
attribution

Sends routed partnership
emails

Tool / Tech

What it is (plain English)

How it was used here

Connection / auth

Claude
(Anthropic)

Agentic AI model

Ran the entire measurement
—
pipeline: API ingestion, parsing,
CRM matching, workbook build

Python +
openpyxl

Scripting + Excel
generation

Resumable API client,
execution parser, formuladriven workbook

—

6. Systems thinking

Attribution integrity over headline size. The rule "deal created on/after submission" cost
the headline number over $1.1M in pre-existing deals — including a $337K win that closed
one day before the workflow's first run. The smaller number survives due diligence; an
inflated one doesn't.
Failure-aware ingestion. The n8n pull was built as a resumable, cursor-checkpointed client
because the analysis sandbox kills long-running processes. Every batch persisted state; any
interruption resumed cleanly instead of restarting.
Test-data hygiene. 22 of 166 runs were internal test submissions (flagged by pattern).
They're visible and labeled in the model rather than silently deleted — transparency beats
tidy data.
Honest gaps, priced anyway. 9 attributed deals had no amount in HubSpot yet. Rather
than ignore them (understates) or guess (fabricates), the model derives a median valueper-WSE ($62,453) from the 18 attributed deals that do have amounts, applies it to the
43 estimated WSEs on the no-amount deals, and exposes the rate as a single editable
assumption cell.
Everything cites a source. Every contact row carries its n8n execution ID; every deal its
HubSpot record ID. Any number in the summary can be traced to a raw API record.

7. Results & impact

Complete production history since inception (first live run Jun 18, 2026 → Jul 18, 2026):

Metric

Value

Form submissions processed

166 (140 successful runs)

MQLs created automatically

101 — 72% of successful runs

Sales-ready leads answered by AI in real time

112

Partnership inquiries auto-routed

12

Deals attributed to the workflow

29

Attributed pipeline (deals with amounts)

$6,377,441

Closed-won revenue already banked

$130,324 (Hill Brothers – Mexico; Great Plains –
France)

Open attributed pipeline

$5,815,117

Estimated value of 9 no-amount deals (43 WSEs ×
$62,453)

$2,685,479

Total estimated attributed impact

$9,062,920

Workers (WSEs) on attributed deals

122+

Largest attributed deals: Carhartt ($2.0M, 47 WSEs), Latitude AI ($1.7M), Arjun Infrastructure
($664K), Primero AI ($432K).

8. What this demonstrates

Full-lifecycle automation ownership — designed, shipped, and then financially proved an
AI system, closing the loop most automation projects leave open.
Multi-system integration — n8n, two Azure AI services, HubSpot API/MCP, and Outlook
orchestrated into one flow; then an agentic AI pipeline layered on top for measurement.
Revenue-grade data rigor — conservative attribution rules, test-data flagging, provenance
to source-record IDs, and transparent assumptions a finance team can audit and adjust.
AI applied where it pays — LLM classification and RAG-grounded replies aimed at the
highest-value moment in the funnel: the minutes after a buyer raises their hand.

Sources: n8n API (workflow 7Exlq2OSVUSh0Tni — all 166 executions since the workflow's first
production run on 2026-06-18), HubSpot CRM portal 20072142, pulled 2026-07-18. Full data
model: MQL_Inbound_Automation_Economic_Impact.xlsx.
Generated 2026-07-18 · Data: n8n execution history + CRM records · All figures verified against source records.
