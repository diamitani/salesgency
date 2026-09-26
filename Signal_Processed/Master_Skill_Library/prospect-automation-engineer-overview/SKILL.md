---
name: prospect-automation-engineer-overview
description: Process/Note derived from Prospect-Automation-Engineer-Overview.pdf
source_path: pae2/Prospect-Automation-Engineer-Overview.pdf
---

# Prospect-Automation-Engineer-Overview.pdf

## Context
This skill provides knowledge, processes, and instructions derived from the document: `Prospect-Automation-Engineer-Overview.pdf`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

PROSPECT PAL

PRODUCT OVERVIEW

Prospect Automation Engineer
A custom engine that finds ICP accounts, researches decision-makers, writes personalized outreach, and enrolls sequences — plus the agent
skills that keep it running in production.

01

02

03

Build with us

Build with agent

Download template

Project + retainer

Self-serve portal

Workflow + skill pack

Confidential · Last Mile Build · August 2026

salesgency.com · prospect-pal

AGENDA

What this deck covers
01

The problem

02

Why outbound engines stall after the first build

03

How we operate

Engine + skills + managed agent, not just a workflow

04

Agency, software, and template — one architecture

05

Packages & process
What each motion delivers, start to finish

Prospect PAL · Prospect Automation Engineer

The product

The production engine
9-node PAE pattern and safety gates

06

How to start
Intake, portal, or download

02 / 18

THE PROBLEM

Outbound still dies in the handoff
Teams can buy a sequencer or a data tool. They cannot buy a production engine that maps their CRM, enrichment stack, and approval rules — then
stays healthy after launch.

Bespoke builds do not scale

Software without an operator

Every client needs the same 9-node pattern remapped to their tools.
Hand-wiring n8n per account is slow and inconsistent.

Workflows fail silently. Nobody owns failed runs, copy drift, or credential
breakage after week one.

Generic sequences, thin research

Credentials and lock-in

Spray-and-pray copy ignores hiring, stack, and funding signals. Reply
rates stay flat.

Keys get pasted into the wrong place. The vendor owns the workflow.
The client cannot take the engine with them.

Prospect PAL · Prospect Automation Engineer

03 / 18

THE PRODUCT

A prospect engine you can run, not just buy
Prospect Automation Engineer is the service and product layer around the Prospect Automation Engine (PAE). We design the workflow, compile the skills, and
optionally run a managed outreach agent on top.

01

02

03

Automation workflow

Skill / project / routine

Managed or custom agent

n8n production graph: generate, enrich,
research, draft, and enroll — specialized to the
client's stack.

Claude or Codex skills that trigger, update,
monitor, and report on the live workflow.

Optional outreach harness that operates the
engine, reviews failures, and ships daily status.

Prospect PAL · Prospect Automation Engineer

04 / 18

HOW WE OPERATE

Three ways in. One architecture.
Agency projects, a self-serve agent portal, and a downloadable template all compile to the same PAE pattern. Choose the motion that matches how much help
the client wants.

01

Build with us

02

Build with agent

SOFTWARE

Use the Prospect PAL portal. Intake form → n8n Engineer skill → export to chat, dashboard, email, or n8n.

03

Download template

TEMPLATE

Take the workflow JSON, build prompt, and n8n Engineer skill and compile locally.

Prospect PAL · Prospect Automation Engineer

AGENCY

Project and retainer packages. We intake, design, build, revise, and optionally maintain.

05 / 18

MOTION 01 · AGENCY

Build with us
Work with us to generate a custom workflow, skill, and/or agent. Project for the first engine. Retainer for production care.

1

Intake call

2

Build package

3

Development

ICP, stack, approval rules, volume

Scope, bindings, instruction pack

n8n graph + skills compiled

4

5

6

Revisions

Copy, filters, gate behavior

Prospect PAL · Prospect Automation Engineer

Deliver

Workflow, skills, report, agent

Maintain

Optional retainer + daily ops

06 / 18

MOTION 02 · SOFTWARE

Build with the agent
Use the Prospect PAL portal to customize the reference workflow. The compiler never invents nodes and never stores secrets.

STEP 01

STEP 02

STEP 03

User intake form

n8n Engineer skill

Export

Conversational gate: trigger, CRM, outreach,
data tool, LLM, harness, approval.

Compiles a client-specific workflow JSON
against the 9-node PAE pattern.

Chat, dashboard, email, or one-click deploy to
the client's own n8n instance.

Prospect PAL · Prospect Automation Engineer

07 / 18

MOTION 03 · TEMPLATE

Download and compile locally
For operators who already have Claude Code, Codex, or an n8n instance and want the reference package without a services engagement.

Workflow JSON
01

Importable Prospect Automation Engine template. 9-node production graph ready to bind credentials.

Build prompt
02

Instruction pack that tells an engineer agent how to specialize nodes to the client's tools.

n8n Engineer skill
03

SKILL.md + rules so the agent updates the live workflow without inventing nodes or embedding secrets.

Prospect PAL · Prospect Automation Engineer

08 / 18

DELIVERABLES

The full package
Every paid package ships a workflow, a skill, a QA tracker, and a daily report. The agent layer is optional — custom or managed.

n8n Prospect Engineer workflow

n8n Prospect Engineer skill

n8n Execution Analyst skill

Generate, enrich, research, draft, enroll.

Trigger and update the production graph.

Monitor runs and address errors.

Daily execution report workflow

Custom outreach agent

Managed outreach agent

Status, failures, and suggested fixes.

Client-owned soul, skills, and harness.

We operate the harness on retainer.

Prospect PAL · Prospect Automation Engineer

09 / 18

OPERATING SYSTEM

The skill stack around the engine

Trigger skill

n8n Engineer

CLAUDE / CODEX

PRODUCTION EDITS

Execution Analyst
RUNTIME QA

Kick the n8n automation from chat with a structured
payload. No ad-hoc webhook guessing.

Update the live workflow from a skill — node-safe,
credential-safe, pattern-locked.

Read failed executions, isolate the node, and
propose a concrete fix.

Daily Report

Asana Fix Tracker

Outreach Agent

OPS CADENCE

Send a daily digest of runs, errors, and applied fixes
to email or Slack.

Prospect PAL · Prospect Automation Engineer

OPTIONAL

Failed runs become Asana tasks with suggested
remediations and an owner.

OPTIONAL HARNESS

Custom or managed agent that operates research,
copy, and enrollment under approval gates.

10 / 18

PRODUCTION ENGINE

The 9-node PAE pipeline
Every compile specializes this graph. Bindings change. The path does not.

01

02

03

04

05

Intake & Cron

Normalizer

CRM Dedupe

Data Adapter

Research + PAS

06

07

08

09

Approval

CRM Upsert

Enroll

Review Alert

Prospect PAL · Prospect Automation Engineer

11 / 18

CUSTOMER JOURNEY

From raw lead to enrolled sequence

01

02

03

Lead intake

Companies & contacts

Deep research

Spreadsheet upload or NLP ICP search by
headcount, funding, hiring, industry.

Clay, Apollo, ZoomInfo, or Amplemarket. Verified
email + LinkedIn.

Stack, news, hiring, funding, reviews, executive
quotes.

04

05

06

Pain hypothesis

PAS copy

CRM + sequencer

One specific bottleneck the account is living with
right now.

3-sentence email + LinkedIn + phone hook, written
as the assigned rep.

Dedupe shield, upsert, enroll. Never touch active
customers.

Prospect PAL · Prospect Automation Engineer

12 / 18

ARCHITECTURE

Four layers. Client-owned runtime.
Ingestion

CSV drops, web intent, NLP search, webhook or daily cron.

Enrichment

Adapter to the client's data tool. Role filters. Email verification.

AI reasoning

Claude (or chosen LLM) synthesizes pain and writes PAS copy.

CRM + sequencer

HubSpot / Salesforce shield. Outreach, Smartlead, Amplemarket, HubSpot Sales.

Prospect PAL · Prospect Automation Engineer

13 / 18

SAFETY & OWNERSHIP

Human gates. You own the graph.

Approval switch

No secrets in the app

Every generated workflow includes node 06. Full-auto or Slack 1-click
review. Never silently send during setup.

The compiler never stores API keys. OAuth and n8n keys stay in the
client's browser session or their instance.

You own the architecture

Pattern lock

Workflows live on the client's n8n. No vendor lock-in. Download JSON
anytime.

The engineer skill cannot invent nodes. Quality evaluator checks approval
gate, ENV-only secrets, and bindings.

Prospect PAL · Prospect Automation Engineer

14 / 18

PACKAGES

What you get in each motion
BUILD WITH US

BUILD WITH AGENT

DOWNLOAD TEMPLATE

Workflow JSON

Custom, deployed

Compiled to your stack

Reference template

Engineer skill

Installed + tuned

Runs in the portal

SKILL.md included

Analyst + daily report

Yes

Available on export

Add-on / DIY

Outreach agent

Custom or managed

Optional harness

Not included

QA / Asana tracker

Yes, on retainer

Optional

Not included

Who operates it

Us, with you

You + the agent

You

Best for

High-stakes GTM

Operators who want speed

Builders who want the pack

Prospect PAL · Prospect Automation Engineer

15 / 18

WHY TEAMS CHOOSE THIS

Production outcomes, not a pilot slide

30 days

3.4×

20+ hrs

100%

Deployment to production

Higher reply-rate lift

Saved per sales rep / week

Native CRM integration

Live in weeks, not a six-month consulting roadmap.
Emails send from the rep's mailbox. Reps take warm replies.
Built on the client's CRM and data tools — they keep the graph.

Prospect PAL · Prospect Automation Engineer

16 / 18

FIT

Who this is for
B2B teams with a real ICP

OUT OF SCOPE

Headcount, industry, and persona filters already exist. The engine needs to run them daily.

When to pass
Not a fit if you want a black-box sequencer with no n8n
ownership.

Revenue orgs tired of tool sprawl
Clay + HubSpot + Smartlead already paid for. Missing piece is the production graph and the operator.

Agencies and operators

Not a fit if there is no CRM and no one will approve copy.

Not a fit if the goal is spray 10k cold emails with no
research.

Need a repeatable compile path instead of rebuilding n8n from scratch for every client.

Prospect PAL · Prospect Automation Engineer

17 / 18

GET STARTED

Pick a motion. Ship an engine.
Book an intake call, open the portal, or take the template. Every path ends in a workflow, a skill, a QA loop, and a daily report — with an agent if you
want one.

Build with us

Build with agent

Download template

Intake call → build package → live engine.

Complete the form. Compile. Deploy to your n8n.

JSON + build prompt + engineer skill.

Prospect PAL · Prospect Automation Engineer · August 2026

Next: intake · portal · template
