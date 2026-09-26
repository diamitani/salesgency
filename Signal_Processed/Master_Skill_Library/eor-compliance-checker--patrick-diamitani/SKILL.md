---
name: eor-compliance-checker--patrick-diamitani
description: Process/Note derived from EOR Compliance Checker — Patrick Diamitani.pdf
source_path: Atlas Portfolio/EOR Compliance Checker — Patrick Diamitani.pdf
---

# EOR Compliance Checker — Patrick Diamitani.pdf

## Context
This skill provides knowledge, processes, and instructions derived from the document: `EOR Compliance Checker — Patrick Diamitani.pdf`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

7/17/26, 3:08 PM

EOR Compliance Checker — Patrick Diamitani

Patrick Diamitani / ENTERPRISE AI PRODUCTION

LinkedIn ↗

Skill & Product Library / Compliance
Automation Workflow

Live in production

EOR Compliance Checker
AI deal screening on the live sales pipeline: every deal gets an auditable compliance verdict the
moment it enters.
100+ deals wrongly stuck in review correctly cleared; zero production write errors
n8n

Azure OpenAI

HubSpot

Avoma

compliance

rules engine

Overview
An automated compliance-screening system that evaluates every deal entering a global HR-tech (EOR)
platform's sales pipeline against the company's official 30-sector compliance worksheet, and writes an
auditable verdict back to the CRM. An LLM handles only the fuzzy work (mapping messy CRM data to
canonical sectors); a unit-tested JavaScript rules engine makes every tier decision deterministically.
Result: all open deals in the pipeline screened, over a hundred deals wrongly stuck in "review required"
correctly cleared while ineligible-deal detection more than doubled — every verdict traceable to a
named rule, with a perfect production write record.

The Problem
Deals reached contracting and KYC before anyone checked whether the role or industry was even
eligible for Employer-of-Record services — compliance found blockers at signature time, killing deals
late, wasting effort, and eroding trust. Screening was ad-hoc and reactive.

How It Works
1. A CRM deal workflow fires on pipeline entry and posts the deal ID to an n8n webhook — n8n is a
workflow-automation platform running the screening pipeline (46 nodes).
https://diamitani.github.io/patrick-diamitani-portfolio/products/eor-compliance-checker.html

1/4

7/17/26, 3:08 PM

EOR Compliance Checker — Patrick Diamitani

2. n8n re-fetches everything authoritative by ID via the CRM API: deal, contacts (job titles), notes,
company — plus call transcripts from a conversation-intelligence tool that records sales calls.
3. An enterprise-hosted LLM does semantic mapping only: reading messy CRM values ("Computer
Software" ≈ "Software Development") and pass-through detection (a staffing firm placing oil & gas
workers is screened as oil & gas).
4. A deterministic JavaScript matrix engine — the 30-sector worksheet transcribed into unit-tested
code — applies three independent judgments: viability tier (1/2/3), preliminary flags (executive role
/ legal-entity conflict), and hard screens (licenses, union-CBA, security clearance) that force Tier 3.
Confidence is a report field; it never changes the tier.
5. The verdict is written to five CRM deal properties (tier, eligibility flag, preliminary flag, screenrequired flag, notes with cited evidence), and the deal owner gets an email notification if Tier 2/3.
6. An hourly n8n safety-net sweep screens any open deal still missing a tier — a zero-blank guarantee
even if a real-time event is missed.

Stack & Integrations
Tool

Role

Access needed

n8n cloud

Orchestration — webhook, batch, dry-run, and
hourly-sweep workflows

Workspace + workflow import

Enterprise LLM
(GPT-4 class)

Semantic sector mapping + note prose only

Deployment + API credential

Custom JS rules
engine

Deterministic tiers, gates, alias resolution

Ships inside the workflow

CRM API (HubSpot)

Deal/contact/note/company reads; property
writes

Private-app token: deals +
contacts read-write

Call-intelligence
API

Call transcripts & summaries

API key, read-only

Email (Outlook)

Owner notifications on Tier 2/3

OAuth (mail send)

Setup Process
1. Create the five compliance deal properties in your CRM.
2. Import the three workflow JSONs (webhook, batch updater, report-only tester) into n8n; bind CRM,
LLM, call-intelligence, and email credentials.
https://diamitani.github.io/patrick-diamitani-portfolio/products/eor-compliance-checker.html

2/4

7/17/26, 3:08 PM

EOR Compliance Checker — Patrick Diamitani

3. Build the CRM deal workflow: enroll on target stages, "Send a webhook" action posting the deal ID
to the n8n URL.
4. Run the report-only dry-run harness against all open deals — zero CRM writes — and validate the
tier distribution.
5. Run the batch updater to screen the full pipeline; verify sample writes per tier.
6. Enable the production webhook + hourly sweep; park the previous version off (not deleted) as
instant rollback.

What You Need
CRM private-app token (deals/contacts/notes read-write); n8n cloud workspace
Enterprise LLM deployment; call-intelligence API key; email/mail credential
The official sector-by-sector compliance worksheet (source of the rules) · Time-to-deploy: ~1 week
including dry-run validation

Results
Live in production; hundreds of open deals screened across the full pipeline
Over 100 deals wrongly stuck in "review required" correctly cleared; ineligible-deal detection
more than doubled, all traceable to a named worksheet trigger

Perfect production write record (zero errors); full unit-test coverage; well over 100 correct tier-

downgrade regression moves; final portfolio reached zero "Insufficient Data" verdicts after an aliasresolution upgrade
Live end-to-end validation on a real deal: dozens of nodes, zero errors

Challenges & Fixes

Most "Insufficient Data" verdicts → root cause: contacts were never fetched in earlier versions →
contact-fetch chain added

Over-conservative tiers — thin data demoted clean sectors → re-architecture: confidence reports
but never changes the tier

A variable-reassignment bug surfaced on the first live production test → caught by the verification
step, fixed same day, re-test passed

Several analytics properties didn't exist in the CRM and silently failed writes → folded into the notes
field

Demonstrates

https://diamitani.github.io/patrick-diamitani-portfolio/products/eor-compliance-checker.html

3/4

7/17/26, 3:08 PM

EOR Compliance Checker — Patrick Diamitani

LLM + deterministic hybrid design · regulated-domain AI with full audit trails · zero-risk deployment
methodology (dry-run harness, rollback parking) · multi-API orchestration.

STACK & INTEGRATIONS
n8n

Azure OpenAI

HubSpot

Avoma

Outlook

WHAT IT NEEDS

✓ CRM private-app token (deals/contacts/notes read-write)
✓ n8n cloud workspace
✓ Enterprise LLM deployment (e.g. Azure OpenAI GPT-4)
✓ Call-intelligence API key (e.g. Avoma)
✓ Email/mail OAuth credential
✓ A written sector-by-sector compliance worksheet
DISCUSS THIS BUILD
Happy to walk through the architecture, the failures along the way, or how this could translate to your team.

Email Patrick

© 2026 Patrick Diamitani. Case studies anonymized for public portfolio use — no employer-identifying or client-identifying detail
included.
pdiamitani@atlashxm.com · linkedin.com/in/diamitani

https://diamitani.github.io/patrick-diamitani-portfolio/products/eor-compliance-checker.html

4/4
