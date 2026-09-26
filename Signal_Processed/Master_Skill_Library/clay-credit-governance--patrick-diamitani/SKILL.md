---
name: clay-credit-governance--patrick-diamitani
description: Process/Note derived from Clay Credit Governance — Patrick Diamitani.pdf
source_path: Atlas Portfolio/Clay Credit Governance — Patrick Diamitani.pdf
---

# Clay Credit Governance — Patrick Diamitani.pdf

## Context
This skill provides knowledge, processes, and instructions derived from the document: `Clay Credit Governance — Patrick Diamitani.pdf`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

7/17/26, 3:10 PM

Clay Credit Governance — Patrick Diamitani

Patrick Diamitani / ENTERPRISE AI PRODUCTION

LinkedIn ↗

Skill & Product Library / RevOps
Platform

Shipped

Clay Credit Governance
Cutting enrichment cost ~70% by making overspend structurally impossible.
~70% cost reduction by design — Lean 15 / Balanced 21 / Full 50 credits per row
Clay

FinOps

cost control

enrichment

HubSpot

Overview
A credit-governance framework for Clay — the GTM enrichment platform where every lookup costs
credits. After a runaway spend incident at a global HR-tech (EOR) platform (background workflows
burned a large credit purchase in roughly a month, at ~50 credits/row), the enrichment layer was
audited end to end and rebuilt around one standard, cloneable table: a free ICP gate before any paid
column, tiered build profiles (Lean ~15 / Balanced ~21 / Full ~50 credits/row), one capped phone
column, skip-logic everywhere, and a per-row cost estimate. Paired with recurring spend reports to the
budget-owning leader and an hourly AI-credit watcher, no AI spend runs unmonitored again.

The Problem
In a recent quarter, Clay workflows running in the background at a global HR-tech (EOR) platform
consumed a large credit purchase in about a month — with no monitoring, no pre-run cost visibility,
and builds averaging ~50 credits/row (stacked phone providers re-buying the same number, multiple
contacts per company, AI columns firing on every row). The overspend was owned directly, then turned
into the system that makes it structurally impossible.

How It Works
https://diamitani.github.io/patrick-diamitani-portfolio/products/clay-credit-governance.html

1/4

7/17/26, 3:10 PM

Clay Credit Governance — Patrick Diamitani

1. Clone the standard table (a reusable Clay workspace template — Clay is a spreadsheet-style
enrichment tool where each column calls a data provider). Inputs: company name, domain,
LinkedIn URL, account tier.
2. Free columns run first. Columns execute left-to-right, cheap-to-expensive. Firmographics (0.5
credits) skip rows where employee count is already known.
3. A free ICP-gate formula scores every row (employee band, target geographies). Rows scoring
below threshold never trigger a paid column — the org never pays to enrich a non-ICP row.
4. One decision-maker per company via people-search (1 credit), replacing the old multiplecontacts-per-company pattern.
5. One mobile-phone column, capped at 3 provider attempts, with runConditions (Clay's skip-logic)
so a populated phone is never re-bought; company phone and additional phone are separate,
deduped columns.
6. Expensive AI columns (Claygent hooks, international-hiring research, HTTP intent news) are
gated to top-tier accounts only — Claygent is Clay's built-in AI research agent.
7. A free est_credit_cost column sums what actually ran, and the governance loop closes with
recurring spend reports to leadership plus an hourly AI-credit watcher with 4-tier alert thresholds
and month-end forecasting.

Stack & Integrations
Tool

Role

Access needed

Clay

Enrichment tables, formulas, waterfalls,
runConditions, Claygent

Workspace admin

Clay credit/usage export

Spend audit + recurring reporting dataset

Workspace usage
visibility

CRM (HubSpot)

AI-credit watcher (hourly, 4-tier alerts, monthend forecast)

Usage/reporting read
access

Spreadsheet / Markdown
reports

Leadership-facing spend packages

Local files only

Setup Process
1. Clone the standard enrichment table (schema JSON + design doc provided) into your Clay
workspace.
2. Edit the ICP-gate formula to your ICP: employee band + target-country list.
https://diamitani.github.io/patrick-diamitani-portfolio/products/clay-credit-governance.html

2/4

7/17/26, 3:10 PM

Clay Credit Governance — Patrick Diamitani

3. Set each list's tier column and pick a build profile (Lean / Balanced / Full) against the remaining
credit balance — the design doc includes an allocation rule of thumb.
4. Verify runConditions reference your actual CRM field names (existing phone, email).
5. Dry-run 25–50 rows and sanity-check est_credit_cost before a full run.
6. Stand up the recurring spend report and credit-watcher thresholds; ban live work from "Copy of"
tables (use campaign-named canonical tables).

What You Need
[ ] Clay workspace with admin access and credit-usage export
[ ] A written ICP definition (employee band, geographies) and account-tier assignments
[ ] Optional: CRM access for the AI-credit watcher
[ ] Roughly half a day to clone, adapt, and dry-run

Results
Predictable spend profiles: Lean ~15 · Balanced ~21 · Full ~50 credits/row vs. an audited average
of ~50 across all builds — up to ~70% cost reduction by design.
Free ICP gate: zero paid enrichment on non-ICP rows.
Post-review audit: over 90% of a full-month credit spend traced to deliberate, requested project
runs — runaway spend eliminated; the remaining governance gap ("Copy of" tables, roughly a fifth
of spend) converted into an enforced rule.
Recurring leadership-level spend reporting + hourly AI-credit watcher: no company AI spend runs
unmonitored.

Challenges & Fixes

Same phone number bought 2–3 times → stacked phone waterfalls re-purchasing what peoplesearch already returned → three distinct phone columns with dedupe runConditions; mobile
capped at 3 provider attempts.

AI columns firing on every row → no gating → Claygent/HTTP columns restricted to top-tier
accounts by runCondition.

Nobody saw spend until credits were gone → no pre-run visibility → free est_credit_cost
column, recurring leadership report, hourly credit watcher with forecasting.

"Copy of" tables kept burning credits → cloned tables left live → canonical campaign-named
tables + row cap on unapproved manual runs.

Demonstrates
https://diamitani.github.io/patrick-diamitani-portfolio/products/clay-credit-governance.html

3/4

7/17/26, 3:10 PM

Clay Credit Governance — Patrick Diamitani

FinOps thinking applied to AI/data tooling · turning an owned failure into an enforced standard · cost
control by architecture, not vigilance · leadership-facing reporting.

STACK & INTEGRATIONS
Clay

HubSpot

WHAT IT NEEDS

✓ Clay workspace with admin access and credit-usage export
✓ A written ICP definition (employee band, geographies) and account tiers
✓ Optional: CRM access for the AI-credit watcher
DISCUSS THIS BUILD
Happy to walk through the architecture, the failures along the way, or how this could translate to your team.

Email Patrick

© 2026 Patrick Diamitani. Case studies anonymized for public portfolio use — no employer-identifying or client-identifying detail
included.
pdiamitani@atlashxm.com · linkedin.com/in/diamitani

https://diamitani.github.io/patrick-diamitani-portfolio/products/clay-credit-governance.html

4/4
