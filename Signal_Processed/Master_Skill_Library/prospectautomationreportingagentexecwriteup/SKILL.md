---
name: prospectautomationreportingagentexecwriteup
description: Process/Note derived from prospect_automation_reporting_agent_exec_writeup.pdf
source_path: prospect_automation_reporting_agent_exec_writeup.pdf
---

# prospect_automation_reporting_agent_exec_writeup.pdf

## Context
This skill provides knowledge, processes, and instructions derived from the document: `prospect_automation_reporting_agent_exec_writeup.pdf`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

Prospect Automation Reporting Agent

EXECUTIVE BRIEF

Prospect Automation Reporting Agent
ELT review writeup for a daily cross-platform reporting system covering Atlas HXM's full prospecting
pipeline.
Owner
Patrick Diamitani, GTM AI & Automation
Manager

Status
Ready to begin Phase 1 build

Report skill status
Built and tested (`atlas-gtm-insider` skill)

Next review
TBD with ELT

Purpose
Provide GTM leadership with a single daily view of prospecting activity, funnel health, and output quality across
Factors.ai, HubSpot, n8n, Clay, Amplemarket, and Orum — without manual reporting.

Overview
The Prospect Automation Reporting Agent is an orchestrated AI system that monitors and reports on Atlas
HXM's full daily prospecting pipeline — from intent signal capture through email and call outreach. Each
morning it delivers one polished executive summary to leadership through Microsoft Teams and BCC email.

Current-state problem
•
•
•
•

GTM activity data is fragmented across Factors.ai, HubSpot, n8n, Clay, Amplemarket, and Orum.
There is no centralized daily view of how many companies entered the pipeline, how many were qualified, how
many became contacts, and how many are in active outreach.
Workflow failures such as API rate limits, enrichment errors, and filter issues are often discovered only after a rep
notices a problem.
Leadership lacks a daily pulse on pipeline generation velocity, rep assignment load, and sequence coverage.

Business impact
•
•
•

Delayed response to broken automations or underperforming segments.
Limited visibility into rep workload balance and funnel leakage by stage.
Manual reporting requires cross-referencing multiple tools, tabs, and APIs.

End-to-end automation pipeline
The reporting agent monitors the complete workflow below, with stage-level volume, quality, and error tracking
at each handoff.

Executive Writeup · ELT Review

Atlas HXM – Confidential

Prospect Automation Reporting Agent

Stage

What happens

Tracked outputs

Factors.ai + ZoomInfo

Intent-signal companies are pushed into HubSpot.

Intent companies identified,
signal types, page-visit data

HubSpot

Companies land with firmographic and routing fields
populated.

Companies received via Factors
/ ZoomInfo workflows

n8n daily workflow

Prior-day companies are pulled, filtered, round-robin
assigned, and forwarded to Clay.

Execution status, filter counts
by reason, rep assignment
distribution

Clay companies +
contacts

Searches for HR Director+ contacts, enriches contact
data, generates AI pain point and Email 1 / 2 / 3, then
syncs to HubSpot.

Search yield, enrichment rate,
email generation success,
HubSpot sync status

Amplemarket

Eligible contacts are enrolled in the outbound sequence.

New enrollments vs. skipped,
open rate, reply rate, positive
replies, meetings booked

Orum

Call tasks are queued for the assigned reps.

Call tasks queued, tasks
completed, contact rate

Solution: daily reporting system
Executive Writeup · ELT Review

Atlas HXM – Confidential

Prospect Automation Reporting Agent

The agent runs on a daily schedule aligned with the n8n trigger window and coordinates three subagents.
Subagent

Primary job

Key inputs

Output

Data Collection Agent

Connects to each platform API
and pulls prior-day activity.

Factors.ai, HubSpot, n8n,
Clay, Amplemarket, Orum

Structured daily data
object

Analysis & Breakdown
Agent

Calculates funnel conversion,
compares to rolling averages, and
flags anomalies.

Raw daily activity data

Scored metrics
dashboard and
anomaly list

Report & Dashboard
Agent

Builds the GTM Insider report,
refreshes dashboard, posts to
Teams, and sends BCC email.

Analyzed metrics and alerts

HTML report,
dashboard refresh,
Teams notification

Analysis logic monitored daily
•
•
•
•

Conversion rates at each stage: companies enrolled → qualified → contacts found → contacts enriched →
sequence enrolled → replies.
Anomalies such as high filter rates, low enrichment percentages, sequence stalls, workflow errors, and dataquality failures.
Performance segmented by rep assignment, intent source (Factors vs. ZoomInfo), and company segment.
Comparisons to 7-day and 30-day rolling averages to separate clean runs from issue days.

Daily deliverables
1. GTM Insider report (email + Teams)
A polished newsletter-style executive summary distributed each morning with narrative context, by-the-numbers
metrics, funnel breakdown, highlights, workflow health, and next-step experiments.
Sample report structure
• Intro narrative summarizing yesterday's run
• By the Numbers: companies enrolled, contacts found, contacts enriched, open rate
• Funnel Breakdown: source intake → filters → Clay companies → Clay contacts → Amplemarket → Orum
• Performance Highlights: enrichment quality, prior-cohort response metrics, rep balance, workflow runtime
• Workflow Status: clean run or flagged errors
• What's Next: prompt tests, sequence changes, and cohort review actions

2. Live dashboard
A continuously updated view of cumulative funnel metrics, 7-day / 30-day trends, sequence performance by cohort,
filter-rate breakdown, and rep assignment history.

Executive Writeup · ELT Review

Atlas HXM – Confidential

Prospect Automation Reporting Agent

Platform integrations required
Platform

Integration type

Status

Factors.ai

REST API

To build

HubSpot

REST API (MCP available)

Available

n8n

REST API (execution logs)

To build

Clay

REST API

To build

Amplemarket

REST API

To build

Orum

REST API

To build

Technical architecture
The reporting agent uses one orchestrator, three subagents, and multiple source connectors to create an automated
executive reporting loop.

Executive Writeup · ELT Review

Atlas HXM – Confidential

Prospect Automation Reporting Agent

Rollout plan
Phase

Timing

Objective

Deliverable

Phase 1 · Foundation

Week 1

Build and connect APIs for Factors.ai, n8n,
Clay, Amplemarket, and HubSpot extensions
as MCP servers.

All five platform APIs
queryable by Claude

Phase 2 · Agent Build

Week 2

Build the three subagents and orchestrator;
use the already-built `atlas-gtm-insider` skill
for report generation.

Functional agent running on
test data

Phase 3 · Dashboard

Week 2–3

Build the live prospect automation dashboard
with metric cards, trend charts, funnel view,
and rep/filter breakdowns.

Live dashboard accessible to
ELT and RevOps

Phase 4 · ELT Rollout

Week 3

Connect Teams distribution, BCC list,
schedule the daily 8:00am run, and train ELT on
interpretation.

Production agent live with
daily auto-distributed reports

Success metrics
KPI

Current

Target

Time to daily insight

Manual, ~1 hour

Automated, 0 min

Platform visibility

0 (no unified view)

All 6 platforms

Workflow failure detection

Same day (if noticed)

Real-time alert

Report adoption

N/A

ELT opens report daily

Resource requirements
Build
Patrick (GTM AI) + 1 engineer for API integrations

Timeline
3 weeks to production

Infrastructure
Serverless APIs, lightweight database for metric storage,
daily scheduler

Cost
Minimal — all data sourced from existing platform
licenses

ELT decisions needed
1. Timing — current plan is 8:00am daily report delivery.
2. BCC list — confirm who should receive the GTM Insider email.
3. Teams channel — decide whether daily posts should go to #gtm-leadership, #sales-ops, or a dedicated
channel.
4. Dashboard access — define who beyond ELT should have live-dashboard access.
5. Alert threshold — define what failure level should trigger an immediate notification versus the next morning's
report (for example: complete n8n failure or enrichment rate below 70%).
Prepared for ELT review · owner: Patrick Diamitani

Executive Writeup · ELT Review

Atlas HXM – Confidential
