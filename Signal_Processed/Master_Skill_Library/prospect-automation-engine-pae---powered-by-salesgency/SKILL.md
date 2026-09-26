---
name: prospect-automation-engine-pae---powered-by-salesgency
description: Process/Note derived from Prospect Automation Engine (PAE) - Powered by SalesGency.pdf
source_path: prospect-pal-landing-page-build/project/uploads/Prospect Automation Engine (PAE) - Powered by SalesGency.pdf
---

# Prospect Automation Engine (PAE) - Powered by SalesGency.pdf

## Context
This skill provides knowledge, processes, and instructions derived from the document: `Prospect Automation Engine (PAE) - Powered by SalesGency.pdf`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

Powered by SalesGency Custom Prospect Automation Engines for High-Growth B2B Companies •
www.salesgency.com

Sales Gency

PAE

How It

ENGINE

Works

Architecture

Workflow

Case

Why

Nodes

Example

SalesGency

Book a Strategy Call

SalesGency Architecture • Turnkey AI Revenue Automation

Custom Prospect
Automation Engine
Scale qualified outbound pipeline with an autonomous sales engine that finds your
ICP accounts, extracts verified decision-makers, conducts deep web research, and
writes hyper-personalized emails sent directly on behalf of your sales reps.

Book Strategy Call & Setup

Explore How It Works ↓

30 Days

3.4×

20+ hrs

100%

DEPLOYMENT TO

HIGHER REPLY RATE LIFT

SAVED PER SALES REP /

NATIVE CRM

WEEK

INTEGRATION

PRODUCTION

CORE CAPABIL IT IE S

The 6-Step Prospect Automation Flow
How SalesGency transforms raw lead data into booked revenue meetings.

STEP 1

STEP 2

STEP 3

Lead Intake & NLP

Get Companies &

Deep Web & Account

Search

Contacts

Research

Trigger the workflow

The company list connects

The engine conducts

automatically in one of two

to your data tool of choice

automated live research on

ways:

(Clay, Apollo, ZoomInfo,

the target company and

Amplemarket, etc.) with

individual prospect:

• Spreadsheet Upload: Drop
in target company lists,
conference registries, or
CRM exports.
• NLP ICP Search: Connect
to data tools using natural
language prompts to
automatically filter by
headcount, funding, hiring,
or industry.

STEP 4

pre-set ICP filters to pull
verified decision-makers:
• C-Suite, VPs, Directors &
Department Heads

• Current tech stack & tooling
bottlenecks

• 100% verified work email
addresses (NeverBounce
validation)

• Recent company news,
hiring trends & funding
milestones

• Active LinkedIn profile
URLs

• Product releases, customer
reviews & executive quotes

STEP 5

STEP 6

Pain Point

Custom AI

CRM Sync &

Hypothesis

Copywriting (For

Sequencer Dispatch

AI synthesizes the research

SDRs)

The verified contact,

into a clear, actionable pain

Claude 3.5 Sonnet drafts a

account intel, and custom

point hypothesis:

personalized, 3-sentence
email using the proven

synced:

Problem-Agitate-Solve

• CRM Deduplication Shield:
Checks
HubSpot/Salesforce so
active clients are never
contacted.

(PAS) framework:

• Example: "Acme Corp just
hired 5 SDRs but is using
manual spreadsheet lists,
causing 15+ lost hours per
rep weekly on research
with less than 1% reply
rates."

messaging are automatically

• Written directly on behalf
of the assigned sales rep
• Zero generic spam •
references their exact
company context
• Generates multi-channel
touches (Email + LinkedIn
DM + Phone Hook)

• Outreach Portal:
Automatically enrolls the
lead into the rep's
outbound cadence
(HubSpot Sales, Outreach,
Smartlead, Amplemarket).

SYST E M ARCHIT E CT URE

SalesGency PAE Architecture
A visual overview of the end-to-end autonomous outbound infrastructure.

1. Ingestion Layer:

2. Data Enrichment:

3. AI Reasoning Core:

CSV batch drops,
web intent signals
(RB2B), and NLP
search prompts.

Plugs into Clay,
ZoomInfo, Apollo, or
Amplemarket for
verified faculty/execs.

Claude 3.5 Sonnet
synthesizes account
pain points and writes
PAS messaging.

WOR K F LOW B L UE PR I NT

4. CRM Shield &
Sequencer:
HubSpot / Salesforce
deduplication +
automated outbound
sequences.

n8n Workflow Nodes Explained
How each node in the engine operates in production under the hood.

PRODUCTION ENGINE

Prospect Automation Engine — 9-Node Pipeline
Deploy for Your Company →

01

Schedule Trigger / Webhook

01 Intake & Cron

The Starter (Intake & Trigger)
How it works: Executes daily batches (e.g. 2:00 AM) or triggers on-demand via
webhook when intent is detected on your website or a new lead spreadsheet is
uploaded.
Daily Schedule

02

Webhook Endpoint

Batch CSV / Intent

Code Transformation

02 Data Normalizer

The Data Normalizer
How it works: Cleans messy lead entries, normalizes company domain names, strips
malformed characters, and standardizes payload schemas for downstream enrichment.
Domain Sanitization

03

ISO Timestamps

Schema Mapping

CRM Query API

03 Deduplication Query

The CRM Deduplication Shield
How it works: Queries HubSpot and Salesforce by domain. If an account is already an
active customer or open deal, it is excluded automatically to protect existing
relationships.
HubSpot / Salesforce

04

Domain Match

Enrichment Adapter

The Contact & Persona Finder

Account Protection

04 Data Tool Adapter

The Contact & Persona Finder
How it works: Connects to your data tool (Clay, ZoomInfo, Apollo, Amplemarket) to
locate target decision-makers based on ICP role filters and verifies work emails with
NeverBounce.
Target Role Filtering

05

Email Deliverability

LinkedIn Profiles

Claude 3.5 Sonnet

05 AI Research & PAS Copy

The AI Researcher & Copywriter
How it works: Scrapes the company website, uncovers specific bottlenecks, forms a
pain point hypothesis, and writes a tailored 3-sentence outreach email on behalf of your
sales rep.
Problem-Agitate-Solve

06

Account Specific Context

Email + LinkedIn + Phone

Conditional Logic

06 Approval Switch

The Human Safety Switch
How it works: Allows choosing between 100% full-automation mode or routing drafted
messages into a private Slack review channel for quick 1-click SDR approval.
Full Auto vs. Review

07

Zero AI Collision Risk

CRM Upsert

07 CRM Contact Creation

The CRM Record Creator
How it works: Creates/updates Contact and Company records in HubSpot/Salesforce,
attaching the AI pain point summary and show intel directly to the CRM record.
Auto-Upsert Record

08

Attaches Research Notes

Sets Lead Status

Sequencer API

08 Sequence Enrollment

The Outreach Dispatcher
How it works: Enrolls the prospect directly into your outbound sequencer (HubSpot
Sales, Outreach, Amplemarket, Smartlead) sent from the assigned SDR's mailbox with
smart follow-ups.
Multi-Day Cadence

09

Slack Webhook

Auto-Stops on Reply

Rep Mailbox Sync

09 Review Alert

The Slack Alert Queue
How it works: Notifies sales reps in real time whenever a lead requires review or when
high-intent prospects reply to book a meeting.
Real-Time Notifications

SDR Channel Visibility

CONCRE T E E X AMP L E

The Lead Journey: Step-by-Step
See what happens when a target account enters the Prospect Automation Engine.

1. INTAKE & CONTACT

2. RESEARCH & PAIN POINT

FOUND

Target Account:
Enterprise Prospect

3. GENERATED MESSAGE
(SENT FOR REP)

Account Bottleneck
Identified

3-Sentence PAS Email

Signal: TechScale just

Trigger: NLP search

Subject: Quick

hired 4 new SDRs but

targeting VP of Sales in

question on SDR

lacks outbound

outbound capacity at

50–200 employee B2B

automation.

TechScale

SaaS.

Pain Point Summary:

Contact Resolved: Jordan

Reps spending 20+ hours

Reed — VP of Sales

weekly manually

Verified Email:

researching accounts on

jordan@techscale.io

LinkedIn, leading to low
pipeline output.

"Hi Jordan,
Saw TechScale is
scaling the sales team
following your recent
hiring announcements.
Most VPs of Sales we
work with find their
new SDRs lose 20+
hours a week on
manual account
research rather than
having qualified
conversations.

SalesGency builds
custom Prospect
Automation Engines
that research accounts
and draft personalized
outreach on autopilot.
Open to a 10-minute
Enriched via Data Tool

Pain Point Hypothesis

Adapter

Formed

peek at the
architecture?"

Outcome: Logged into CRM, email dispatched from SDR's mailbox. Jordan replies in 4 hours to
book a strategy call.

Qualified Meeting Booked

T HE SAL E SG E NCY ADVANTAG E

Why High-Growth Teams Choose
SalesGency
We don't sell bloated software subscriptions. We build and deploy custom revenue
engines for your team.

Live in 30 Days

You Own the

Built for Your

We don't do 6-month

Architecture

Frontline Reps

consulting roadmaps. We

Built directly on top of your

Emails send directly from

CRM (HubSpot/Salesforce)

your reps' inboxes with high

and data tools. No vendor

deliverability. Reps only

lock-in; you own the

step in to handle warm

workflows and data

replies and run demos.

audit your funnel, design
the architecture, and deploy
functioning AI engines in
weeks.

pipelines.

G E T START E D

Ready to Build Your Prospect
Automation Engine?
Schedule a 20-minute architecture discovery call with SalesGency to audit
your outbound motion and scope your custom engine.

Book on Calendly (Instant Scheduling)

© 2026 SalesGency • www.salesgency.com

✉ Contact SalesGency

Autonomous Revenue & Prospect Automation Engines
