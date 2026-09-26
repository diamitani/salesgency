---
name: patrick-diamitani-portfolio-public
description: Process/Note derived from Patrick-Diamitani-Portfolio-PUBLIC.pdf
source_path: Atlas Portfolio/Portfolio/Patrick-Diamitani-Portfolio-PUBLIC.pdf
---

# Patrick-Diamitani-Portfolio-PUBLIC.pdf

## Context
This skill provides knowledge, processes, and instructions derived from the document: `Patrick-Diamitani-Portfolio-PUBLIC.pdf`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

PATRICK DIAMITANI — AI & AUTOMATION PORTFOLIO

PUBLIC / ANONYMIZED EDITION · JULY 2026

A I & A U T O M AT I O N · G T M S Y S T E M S E N G I N E E R I N G

Patrick Diamitani
GTM AI & Automation Manager · AI & Automation lead at a ~500-person global
Employer-of-Record (HR-tech) platform.
I build production AI automations that ship — and the systems that let a 50+ person
GTM org run on them.
Targeting: Director of AI & Automation · Applied-AI / Forward-Deployed Engineering · Founding GTMEngineering roles
linkedin.com/in/diamitani

Chicago, IL

Public edition — the employing company and internal names, IDs, and endpoints are anonymized. All results
and technical detail are real and verifiable under NDA.

I M P A C T AT A G L A N C E

8+

~242

0→stable

production automations live
across the GTM stack

pipeline deals auto-screened
for EOR compliance, every
one auditable

post-sales workflow
recovered from 21/25 failing
to reliable end-to-end

515K

<30 min

30+

credit spend spike traced to
root cause & governed with a
reusable template

idea → fully-scoped project,
down from 4–8 hours

reusable Claude skills &
agents shipped for the whole
GTM team

T E C H N O L O G Y & P L AT F O R M S
ORCHESTRATION

AI / LLM

n8n

Azure OpenAI (GPT-4o / GPT-5-chat)

automation platform that chains apps so steps fire

the reasoning layer that reads messy text and classifies or

automatically — no human clicking buttons

drafts

Webhooks & MCP

Claude + Claude Skills / Agent SDK

event triggers and tool-connectors that let systems call

the platform used to build the reusable skill & agent library

each other in real time

Retrieval & grounding
Custom JavaScript engines
deterministic rules written in code, so decisions are

feeding models real source data so outputs are specific,
not generic

repeatable and auditable

GTM DATA & CRM

INFRA & DELIVERY

HubSpot API

Azure Blob Storage

the CRM system of record — deals, contacts, properties,
workflows

cloud file store used to serve 250+ country data files
deterministically

Clay

Microsoft 365 (Outlook, Teams, Excel, OneDrive)

data-enrichment workspace that builds and enriches
prospect lists

delivery + human-readable mirrors

Onspring
Amplemarket & ZoomInfo

internal governance/compliance data source

contact discovery and firmographic enrichment sources

Avoma
call-recording & transcription intelligence

Factors.ai
first-party website intent & account signals

P O R T F O L I O O F B U I LT W O R K

FLAGSHIP · LIVE IN PRODUCTION

LIVE · MAJOR RELIABILITY TURNAROUND

EOR Compliance Checker (v5)

Post-Sales Call Automation

Auto-screens every sales-pipeline deal against a
30-sector compliance worksheet the moment it
enters — and writes an auditable verdict back to
the CRM.

After every sales call, reads the transcript and
auto-generates a rep-ready follow-up package:
consultative email, missed-questions analysis,
competitor research, LinkedIn draft, and a logged
CRM note.

n8n · Azure OpenAI GPT-4o · HubSpot API · Avoma API

n8n cloud · Avoma webhook · Azure OpenAI · Azure Blob
Storage (250+ country files)

BUILT · REQUESTED BY VP GROWTH

LIVE · RECOVERED A WHOLE CHANNEL

Pre-Sales Call Automation

Chatbot MQL Automation +
Attribution

The moment a meeting is booked, sends the rep a
concise pre-call prep note so they walk in already
knowing where they're most likely to close.
HubSpot workflows · n8n · Factors.ai Journey API · Azure
OpenAI

When a website chat ends without a booking, an
AI classifies MQL vs. non-MQL, drafts the right
follow-up, routes it, and — critically — makes the
chatbot a measurable, attributable GTM channel.
HubSpot chatbot + workflows · n8n · Azure OpenAI ·
HubSpot CRM API

DEPLOY-READY

BUILD-READY · APPROVAL-GATED

Partner PQL Workflow

Entity Readiness Change Report

Classifies inbound partner-form submissions,
drafts a partner-specific email, and routes a task to
the partnerships owner automatically.

Every Monday, diffs the company's country hirereadiness against last week and emails Growth
only the countries that flipped — as a locked twocolumn table.

n8n · Azure OpenAI (gpt-5-chat) · HubSpot API

n8n · Onspring · n8n Data Table · Microsoft Excel /
OneDrive

ONGOING · OWNS THE PIPELINE

STRATEGY + BUILD

SDR-Agency Prospecting
Enablement (AGS)

Outbound Signals & Intent Engine

Runs the full prospecting supply chain for an
outsourced SDR agency — clean, enriched, CRMsafe lists activated on a weekly cadence.
Clay · Amplemarket · ZoomInfo · HubSpot API

A defined library of fit + intent signals, a 0–100
account scoring model, and composite “plays” that
stack signals into prioritized, repeatable outbound
motions.
Clay · Factors.ai · HubSpot · Scoring model (0–100)

SHIPPED · COST + GOVERNANCE WIN

META-SYSTEM · FRAMEWORK

Clay Credit Governance & Cost
Control

New Project Automation System
(Center of Excellence)

Traced a runaway enrichment-credit spike to its
real sources and shipped a reusable template +
guardrails that cut per-row cost and stop the leak
repeating.

Turns any raw input — notes, files, links, a oneline idea — into a complete, leadership-ready
project package: knowledge base, PRD,
architecture diagram, reporting framework, and a
phased build plan.

Clay API · Excel data modeling · PDF one-sheeter for
leadership

PLATFORM · BUILT FOR 50+ REPS

GTM Skill & Agent Library (30+)
A library of reusable AI skills and agents that put
every automation above into the hands of nontechnical reps and marketers through plainEnglish commands.
Claude Skills / Agent SDK · n8n · Clay · HubSpot

Claude / Agent SDK · n8n · Notion · Asana

PROJECT DEEP-DIVES

01

FLAGSHIP · LIVE IN PRODUCTION

EOR Compliance Checker (v5)
Auto-screens every sales-pipeline deal against a 30-sector compliance worksheet the
moment it enters — and writes an auditable verdict back to the CRM.

THE PROBLEM

Reps advanced deals to contracting without knowing if the role
or industry was eligible for the service. Compliance only caught
blockers at contract review — after the buyer was ready to sign.
Lost deals and wasted effort.
WHAT I BUILT

• A 46-node n8n production workflow (real-time webhook +
hourly safety-net sweep + on-demand batch re-screen).
• A hybrid engine: the LLM only maps messy CRM data to one
of 30 canonical sectors; a deterministic JavaScript matrix
makes every tier decision.
• A three-axis compliance framework (viability tier + advisory
flags + hard screen-outs) transcribed faithfully from the
official worksheet.
• A report-only dry-run harness that tests any future rule
change against the entire pipeline with zero writes.

OUTCOME

• Live in production, screening the
full sales pipeline (~242 open
deals).
• Corrected ~103 deals wrongly
stuck in “review required” while
tightening genuine ineligibility
detection — every flag traceable
to a named rule.
• 16 unit tests + full dry-run
validation + clean production
writes across all deals before golive.

STACK
n8n

SYSTEMS THINKING

Azure OpenAI GPT-4o

The core design decision — rules live in code, not in the
model's head — is what makes it durable. The LLM does
only what it's good at (reading unstructured text); every
verdict is deterministic, repeatable, and cites its own
reasoning. Edge cases were reasoned about explicitly: passthrough detection (a staffing firm placing workers into oil &
gas is screened as oil & gas), semantic sector aliasing, and a

HubSpot API

“needs-title” hold instead of guessing on thin data.
WHAT BROKE & HOW IT WAS FIXED
ISSUE / SYMPTOM

ROOT-CAUSE FIX & PREVENTION

A const-reassignment
bug surfaced on the first

Caught immediately by the verification
step; fixed and re-tested green.

live production test

Prevention: the dry-run harness now
gates every change.

Five analytics properties
silently failed to write

Folded that content into the audit-note
field instead. Prevention: validate

(didn't exist in the CRM)

property existence before writing.

Avoma API

Custom JS rules engine
NAICS resolver

Outlook

ISSUE / SYMPTOM

ROOT-CAUSE FIX & PREVENTION

Old prompt let thin data
demote clean sectors

Re-architected so confidence is a
report field that never changes the tier.

02

LIVE · MAJOR RELIABILITY TURNAROUND

Post-Sales Call Automation
After every sales call, reads the transcript and auto-generates a rep-ready follow-up
package: consultative email, missed-questions analysis, competitor research, LinkedIn
draft, and a logged CRM note.

THE PROBLEM

Reps spent time after every call on follow-up research and
writing. The automation meant to do it was failing 21 of 25 runs
— a dead vector-search index left four AI agents with no country
context.
WHAT I BUILT

• An always-on n8n cloud workflow triggered by a call-platform
webhook, so it fires regardless of whose laptop is open.
• Four AI agents (follow-up email, missed questions,
competitor research, LinkedIn post) grounded in real country
data.
• A deterministic replacement for the broken search: extract
countries → ISO-3 codes → fetch each file directly from blob
storage → inject into every agent.

OUTCOME

• Recovered from 0/25 runs
reaching the email step to
reliable end-to-end delivery.
• Cut context bloat ~3x (20→6
relevant countries per call) —
cheaper and higher signal.
• Restored specific, grounded
output over generic filler.

STACK
n8n cloud
Avoma webhook
Azure OpenAI

SYSTEMS THINKING

This is a textbook resilience rebuild. Rather than recreate a
fragile index (which needed permissions Patrick didn't have),
the whole failure point was designed out: country code →
exact file, no fuzzy search, no credentials to rotate, and a
graceful fallback so the email still sends if a file is missing.
Failure modes were mapped end-to-end — future/scheduled
meetings, broken item-lineage, context bloat — and each got
an explicit guard.
WHAT BROKE & HOW IT WAS FIXED
ISSUE / SYMPTOM

ROOT-CAUSE FIX & PREVENTION

84% of failures: dead

Removed the dependency entirely;

Azure AI Search index
(DNS not-found)

replaced with deterministic blob fetch.
Prevention: prefer deterministic
lookups over services that can silently
die.

Silent dead-ends on
scheduled/future

Added a meeting-completion guard +
bounded retry budget (10→20 polls) +

meetings

explicit exit nodes.

Azure Blob Storage (250+ country
files)
HubSpot

Outlook

ISSUE / SYMPTOM

ROOT-CAUSE FIX & PREVENTION

Broken paired-item
lineage dropped the

Carried the base object forward and
converted 28 fragile item-references to

transcript downstream

a stable form.

03

BUILT · REQUESTED BY VP GROW TH

Pre-Sales Call Automation
The moment a meeting is booked, sends the rep a concise pre-call prep note so they
walk in already knowing where they're most likely to close.

THE PROBLEM

Reps burned time on manual pre-call research; time-zonebased daily checks risked missing calls booked across regions.
WHAT I BUILT

• HubSpot meeting-booked webhook → n8n → enrichment →
one-paragraph prep note emailed to the assigned rep.
• Enrichment pulls first-party intent (Factors Journey API),
company data, and the most recent contact message.
• A guardrail against duplicate sends; the summary is pre-built
instantly and timed to arrive a set number of hours before the
call.

OUTCOME

• Scoped, brief-approved, and built
against a clear definition-ofready (clean webhook execution,
no hallucinated facts).

STACK
HubSpot workflows
Factors.ai Journey API
Azure OpenAI

SYSTEMS THINKING

Chose an event trigger (meeting booked) over a scheduled
daily sweep specifically to defeat the time-zone failure mode
— a systems decision made before the first line was built,
and documented with an explicit risk/mitigation in the brief.
WHAT BROKE & HOW IT WAS FIXED
ISSUE / SYMPTOM

ROOT-CAUSE FIX & PREVENTION

Risk: a daily check could
miss calls in other time

Mitigation designed in up front —
trigger on booking, dedupe, and send

zones

relative to call time regardless of zone.

n8n

04

LIVE · RECOVERED A WHOLE CHANNEL

Chatbot MQL Automation + Attribution
When a website chat ends without a booking, an AI classifies MQL vs. non-MQL, drafts
the right follow-up, routes it, and — critically — makes the chatbot a measurable,
attributable GTM channel.

THE PROBLEM

The website chat agent was capturing conversations, but the
attribution flag was never stamped — so 364 contacts going
back years were invisible to every report. The channel looked
dead when it wasn't.
WHAT I BUILT

• An n8n workflow that classifies intent (Azure OpenAI),
generates a tailored follow-up, and routes MQL vs. nurture —
with an idempotency flag so nothing double-processes.
• Three coordinated HubSpot workflows: chat-end trigger, MQL
owner-assignment + internal notification, and non-MQL
system email with resources.
• An attribution-stamp workflow + a 364-contact API backfill
(364/364 updated, 0 errors) and five smart lists to make the
channel reportable.
SYSTEMS THINKING

Diagnosed the root attribution failure before building anything
(a data audit found the capture-vs-stamp gap), then designed
for reliability: UUID session IDs, an idempotency checkpoint,
and system-inbox sending so delivery never depends on a
person.
WHAT BROKE & HOW IT WAS FIXED
ISSUE / SYMPTOM

ROOT-CAUSE FIX & PREVENTION

Attribution flag captured
chat data but never

Built a stamp workflow for go-forward
+ API backfill for history. Prevention:

stamped the source

audit the whole capture→report chain,
not just capture.

OUTCOME

• 364 historical contacts recovered
into attribution and made visible
in reporting.
• Idempotent classification →
routing → notification pipeline
live end-to-end.

STACK
HubSpot chatbot + workflows
n8n

Azure OpenAI

HubSpot CRM API
Slack notifications

05

DEPLOY-READY

Partner PQL Workflow
Classifies inbound partner-form submissions, drafts a partner-specific email, and routes a
task to the partnerships owner automatically.

THE PROBLEM

Partner inquiries needed manual triage, classification, and
routing before anyone could act.
WHAT I BUILT

• An n8n workflow: form webhook → AI classify (partner vs.
not) → AI-drafted partner email → lifecycle set → CRM task
routed to the partnerships owner.
• Hardened for production: fixed a v3-API association bug (id
vs. vid) that would have created tasks with no contact link,
and wired a shared error-handler workflow.

OUTCOME

• Deploy-ready workflow;
association bug fixed and error
handling wired. Gated only on
upstream CRM-property + form
dependencies.

STACK
n8n
Azure OpenAI (gpt-5-chat)

SYSTEMS THINKING

Explicitly matched the error-handling pattern of the existing
inbound workflow so failures surface in one place — thinking
about the operational estate, not just the single workflow.
WHAT BROKE & HOW IT WAS FIXED
ISSUE / SYMPTOM

ROOT-CAUSE FIX & PREVENTION

HubSpot v2.2 nodes use

Read id first with a vid fallback, so

the v3 API, which returns
id not vid

tasks always associate to the contact.
Prevention: verify API-version field
shapes on import.

HubSpot API

06

BUILD -READY · APPROVAL- GATED

Entity Readiness Change Report
Every Monday, diffs the company's country hire-readiness against last week and emails
Growth only the countries that flipped — as a locked two-column table.

THE PROBLEM

Nobody caught weekly changes in which countries the company
could legally operate in. Marketing pays for country-specific
search ads and didn't want to keep bidding on a country it could
no longer serve — or miss one that just opened.
WHAT I BUILT

• An importable n8n workflow: weekly trigger → pull readiness
→ normalize to a boolean → diff vs. saved baseline → report
only the flips → deliver → then write the new baseline.
• A hard no-cloud constraint honored: state lives in an n8n
Data Table (source of truth) mirrored to an Excel file for
humans — no Azure.

OUTCOME

• Build-ready spec + importable
workflow delivered; routed for
leadership sign-off. Phase-2
external feed built but held
pending a format spec.

STACK
n8n

Onspring

n8n Data Table
Microsoft Excel / OneDrive

SYSTEMS THINKING

Outlook / Teams

Two constraints drove the architecture and were respected
exactly: baseline writes happen only after a successful, nonempty pull (a failed run never corrupts last week's state), and
the output stays locked to two columns per the stakeholder's
requirement. First-run seeding, empty-pull, and failed-pull
edge cases are each handled.
WHAT BROKE & HOW IT WAS FIXED
ISSUE / SYMPTOM

ROOT-CAUSE FIX & PREVENTION

Risk: a failed or empty
data pull could overwrite

Baseline writes gated behind a
successful non-empty pull; normalize

good state

step throws on empty. Prevention:
never let a failed run mutate the
source of truth.

07

ONGOING · OWNS THE PIPELINE

SDR-Agency Prospecting Enablement (AGS)
Runs the full prospecting supply chain for an outsourced SDR agency — clean, enriched,
CRM-safe lists activated on a weekly cadence.

THE PROBLEM

A paid sales agency needed a steady stream of clean, targeted,
CRM-safe lists — without contacting existing customers, open
deals, closed-lost, or recently-touched contacts.
WHAT I BUILT

• A repeatable intake → normalize → dedupe → enrich →
suppress → activate pipeline across Clay, Amplemarket,
ZoomInfo and HubSpot.
• Live HubSpot suppression screening for customer status,
open deals, and closed-lost on every company before send.
• A competitive-takeaway play: 188 verified HR contacts at
companies currently on a named competitor EOR, ~100 netnew to CRM.

OUTCOME

• Thousands of contacts activated;
weekly batches tagged by
segment for agency-level
reporting.
• Every list screened live against
the CRM before send (opendeal, closed-lost, activesequence, recent-touch
suppression).

STACK
Clay

SYSTEMS THINKING

ZoomInfo

Treats prospecting as a governed data pipeline with sourceof-truth boundaries (CRM = truth, enrichment = workspace,
orchestration = glue) and a compliance-first suppression
layer — the difference between a list and a liability.
WHAT BROKE & HOW IT WAS FIXED
ISSUE / SYMPTOM

ROOT-CAUSE FIX & PREVENTION

Parallel one-off
workbooks caused drift

Consolidated into one master
workbook + segment tabs as the

and duplicated effort

operating source of truth.

Amplemarket
HubSpot API

08

STRATEGY + BUILD

Outbound Signals & Intent Engine
A defined library of fit + intent signals, a 0–100 account scoring model, and composite
“plays” that stack signals into prioritized, repeatable outbound motions.

THE PROBLEM

Broad, untargeted outbound was expensive and easy to ignore,
with no defensible reason for any given touch.
WHAT I BUILT

• Eight signal categories (expansion, funding, hiring,
leadership, competitor/tech, compliance, first-party
engagement, suppression), each weighted and mapped to a
data source, persona, and query logic.
• A flagship “Displacement” play targeting Director+ People
leaders who hire internationally and already use a competitor
EOR.
• A companion Master Signal & Intent Library workbook
feeding Clay build sessions.
SYSTEMS THINKING

Turns intuition into a system: every touch has a named,
weighted, time-bound reason behind it, which is what lifts
reply rates and keeps enrichment credit and rep time focused
on accounts with a real reason to buy now.

OUTCOME

• Framework + scoring model +
flagship play documented for
GTM leadership and
operationalized in the enrichment
stack.

STACK
Clay

Factors.ai

HubSpot
Scoring model (0–100)

09

SHIPPED · COST + GOVERNANCE WIN

Clay Credit Governance & Cost Control
Traced a runaway enrichment-credit spike to its real sources and shipped a reusable
template + guardrails that cut per-row cost and stop the leak repeating.

THE PROBLEM

Enrichment credit usage spiked from <15K/month to ~515K in a
single month. ~21% of a month's spend ran through unattributed
duplicate tables, phone numbers were bought 2–3x per contact,
and searches ran with no fit gate.
WHAT I BUILT

• A full-year forensic audit (a seven-sheet master dataset) that
re-attributed the unnamed “Copy of” spend back to its real
source tables.
• A Standard Enrichment Table Template: a free ICP-fit gate in
front of every paid column, a 3-column deduped phone
model capped at 3 attempts, and AI/HTTP columns gated to
top-tier accounts.
• Three build profiles (Lean ~15 / Balanced ~21 / Full ~50
credits per row) replacing an undisciplined ~50-credit
average.
SYSTEMS THINKING

A credit-planning architecture, not a one-time cleanup: gate
→ cap → clone-don't-copy → dedupe → consolidate →
review weekly. The weekly review replaces after-the-fact
audits so the next spike is caught in days, not months.
WHAT BROKE & HOW IT WAS FIXED
ISSUE / SYMPTOM

ROOT-CAUSE FIX & PREVENTION

A single day burned
201,924 credits from a

Split phone into three deduped
columns capped at 3 provider

phone-waterfall rebuying the same

attempts. Prevention: dedupe + cap
before any waterfall runs.

numbers

OUTCOME

• Root cause identified and a
leadership one-sheeter + master
dataset delivered, replacing adhoc exports.
• Per-row cost brought under
explicit control; a standing
weekly credit review installed as
the guardrail.

STACK
Clay API
Excel data modeling
PDF one-sheeter for leadership

10

META-SYSTEM · FRAMEWORK

New Project Automation System (Center of
Excellence)
Turns any raw input — notes, files, links, a one-line idea — into a complete, leadershipready project package: knowledge base, PRD, architecture diagram, reporting framework,
and a phased build plan.

THE PROBLEM

Projects were scattered across a task tool (inconsistent), chat
threads (buried), and nowhere (lost). Leadership had no clean
answer to “what are we building, why, and when.” Every project
was an island only one person understood.
WHAT I BUILT

• An intake engine built on a documented framework (PAL for
depth, NPAO for work classification, 4Ds for phasing, RAG/
DAL for provenance) that outputs a standardized package
every time.
• A searchable project index/database so any initiative is one
link away for leadership and onboarding.
• The engine that spawned the reusable skills below —
projects come out clean, complete, and consistent.
SYSTEMS THINKING

This is the systems-thinking artifact of the whole portfolio: a
repeatable operating model that standardizes how an entire
team scopes, documents, and ships work — designed so
quality is structural, not dependent on any one person.

OUTCOME

• Idea → fully-scoped project cut
from 4–8 hours to under 30
minutes.
• A permanent, searchable Center
of Excellence with consistent
docs across every initiative.

STACK
Claude / Agent SDK
Notion

Asana

RAG web search

n8n

11

PLATFORM · BUILT FOR 50+ REPS

GTM Skill & Agent Library (30+)
A library of reusable AI skills and agents that put every automation above into the hands
of non-technical reps and marketers through plain-English commands.

THE PROBLEM

Powerful automations are useless if only the builder can run
them. A 50+ person GTM org needed self-serve, rep-friendly
tools — not one-off scripts.
WHAT I BUILT

• Prospecting & enrichment: Clay prospecting engine, credit
estimator, CSV enrichers, HubSpot import formatter, list
routers.
• Workflow & ops: n8n workflow architect, execution analyst,
GTM architect, project intake & handoff, close-out reporting.

OUTCOME

• 30+ skills/agents shipped and
organized into installable suites
for the GTM team.
• Repeatable, governed selfservice replacing builderdependent one-offs.

STACK

• Revenue & enablement: HubSpot data/revenue analysts,
RFP knowledge-base builder + answer retriever, Factors.ai
signal operator, case-study builder.

Claude Skills / Agent SDK

• Content at scale: a full branded content suite (email, social,
ads, blog, decks, one-pagers) plus an agent-factory that
builds new skills from a description.

HubSpot

n8n

Clay
Factors.ai

Avoma

SYSTEMS THINKING

A platform play: reusable skills with clear triggers,
composability (skills call specialist skills), and guardrails
baked in (secret-handling, CRM-safety, approval gates) — so
scaling to 50+ users doesn't scale the risk.

Patrick Diamitani
GTM AI & Automation Manager · Chicago, IL
Contact via LinkedIn: linkedin.com/in/diamitani
Every metric and technical detail on this page is drawn from real, shipped project records. Employer and internal identifiers
anonymized for public sharing. No secrets, keys, tokens, or endpoints are reproduced anywhere in this document.
