---
name: hubspot-import-formatter--patrick-diamitani-1
description: Process/Note derived from HubSpot Import Formatter — Patrick Diamitani (1).pdf
source_path: Atlas Portfolio/HubSpot Import Formatter — Patrick Diamitani (1).pdf
---

# HubSpot Import Formatter — Patrick Diamitani (1).pdf

## Context
This skill provides knowledge, processes, and instructions derived from the document: `HubSpot Import Formatter — Patrick Diamitani (1).pdf`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

7/17/26, 3:08 PM

HubSpot Import Formatter — Patrick Diamitani

Patrick Diamitani / ENTERPRISE AI PRODUCTION

LinkedIn ↗

Skill & Product Library / Data Quality
Claude Skill

Live in production

HubSpot Import Formatter
Killing CRM duplicates at the source — any rep spreadsheet becomes a clean HubSpot import in
minutes.
Live for a 50+ rep GTM org — every import Batch-ID tagged and KPI-tracked
Claude Skill

HubSpot

NAICS

dedup

CRM hygiene

Overview
Reps at a global HR-tech (EOR) platform bulk-imported hand-made spreadsheets in inconsistent
formats — data-vendor exports, social-selling lists, partner lists — and the CRM couldn't dedupe
reliably, polluting records with duplicate contacts and companies, inflating forecasts, and splitting
activity history. This Claude skill converts any rep spreadsheet into the company's official import
templates: auto-splitting people from companies, deduping pre-import, semantically mapping messy
industry values to the CRM's taxonomy enriched with NAICS sector + code, normalizing dropdowns and
countries, flagging (never silently dropping) rejected rows, and optionally upserting directly to the CRM
with static/active list creation. Live for a 50+-person GTM org, with every import tagged by a Batch ID so
data-quality discipline is reportable back to deal attribution.

The Problem
Reps at a global HR-tech (EOR) platform bulk-imported hand-made spreadsheets in wildly inconsistent
formats. The CRM's native dedupe couldn't catch near-matches across formats, so it filled with
duplicate contacts and companies — inflating pipeline forecasts and splitting activity/engagement
history across records that should have been one.
https://diamitani.github.io/patrick-diamitani-portfolio/products/hubspot-import-formatter.html

1/4

7/17/26, 3:08 PM

HubSpot Import Formatter — Patrick Diamitani

How It Works

1. Ingest any spreadsheet — a rep uploads a data-vendor, social-selling, or partner-list export in
whatever shape it arrived (Claude skills are reusable, packaged instruction sets that run inside
Claude/Claude Code).
2. Auto-split people from companies — the skill detects whether rows are person-level, companylevel, or mixed, and separates them into the CRM's two-object model.
3. Pre-import dedupe — records are deduped against the upload batch itself and (when upserting
live) against existing CRM records, before anything touches the system of record.
4. Semantic industry mapping — messy free-text industry values are mapped to the CRM's official
industry taxonomy and enriched with the matching NAICS sector + code — the US government's
standard industry classification, which most CRMs don't natively carry.
5. Normalization — country names, state/province codes, and dropdown-field values are
standardized to exactly what the CRM's properties expect, so imports don't silently fail on
mismatched picklist values.
6. Flag, never drop — any row that can't be confidently mapped or deduped is flagged in a rejects tab
with a reason, so nothing disappears without a human seeing why.
7. Deliver two ways — export official import-ready Excel/CSV templates for manual upload, or (if
authorized) upsert directly to the CRM via the import API with automatic static/active list creation,
tagging the import with a Batch ID used as the CRM import name.

Stack & Integrations
Tool

Role

Access needed

Claude skill

Ingest, split, dedupe, map, normalize
logic

Claude Code / Claude with skill installed

Excel/CSV
processing

Reads rep exports, writes official
import templates

Local file access

NAICS mapping
layer

Sector + code enrichment on
industry values

Ships with the skill (static reference table)

CRM import API
(HubSpot)

Optional direct upsert + static/active
list creation

Private-app token scoped to
contacts/companies + imports

Run ledger

Tracks adoption, volume, dataquality KPIs per Batch ID

Local file or CRM custom object

https://diamitani.github.io/patrick-diamitani-portfolio/products/hubspot-import-formatter.html

2/4

7/17/26, 3:08 PM

Setup Process

HubSpot Import Formatter — Patrick Diamitani

1. Install the skill into the team's Claude Code / Claude environment.
2. Load your official import template schema and an industry-to-NAICS mapping table (ships with the
skill; extend as needed).
3. Configure the CRM private-app token if direct upsert is wanted (read/write contacts + companies,
imports API); otherwise the skill exports templates only.
4. Run a test import from a real rep spreadsheet in "export only" mode; review the rejects tab.
5. Enable direct upsert for a pilot team; confirm Batch IDs appear as CRM import names and the run
ledger logs volume/quality.
6. Roll out to the full GTM org with a short rep-facing how-to.

What You Need
[ ] Claude Code or Claude access for the team
[ ] An official import template schema (or your own equivalent)
[ ] Optional: CRM private-app token (contacts/companies read-write, imports API) for direct upsert
[ ] ~2–3 hours to configure and pilot; minutes per import thereafter

Results
Live for a 50+-person GTM org.
Every import carries a Batch ID used as the CRM import name — deal attribution back to clean-data
discipline is reportable.
Built-in run ledger tracks adoption, volume, and data-quality KPIs over time.
Root-cause fix for CRM duplication rather than a downstream cleanup tool.

Challenges & Fixes

Inconsistent source formats across vendors → auto-detection of person vs. company rows
instead of requiring a fixed template from reps.

Free-text industry values that the CRM's picklist can't match → semantic mapping layer
enriched with NAICS sector + code.

Silent import failures on bad dropdown values → explicit normalization pass before
export/upsert.

Risk of quietly dropping unmappable rows → every uncertain row flagged in a rejects tab with a
reason, never silently discarded.

Demonstrates
https://diamitani.github.io/patrick-diamitani-portfolio/products/hubspot-import-formatter.html

3/4

7/17/26, 3:08 PM

HubSpot Import Formatter — Patrick Diamitani

Root-cause data-quality engineering · adoption-aware design (make the standard the easy path) ·
measurable-by-default tooling · semantic-to-deterministic mapping (LLM interprets messy text, static
taxonomy governs the outcome).

STACK & INTEGRATIONS
Claude Skill

HubSpot

Excel/CSV

WHAT IT NEEDS

✓ Claude Code or Claude access for the team
✓ An official import template schema
✓ Optional: CRM private-app token (contacts/companies read-write, imports API)
DISCUSS THIS BUILD
Happy to walk through the architecture, the failures along the way, or how this could translate to your team.

Email Patrick

© 2026 Patrick Diamitani. Case studies anonymized for public portfolio use — no employer-identifying or client-identifying detail
included.
pdiamitani@atlashxm.com · linkedin.com/in/diamitani

https://diamitani.github.io/patrick-diamitani-portfolio/products/hubspot-import-formatter.html

4/4
