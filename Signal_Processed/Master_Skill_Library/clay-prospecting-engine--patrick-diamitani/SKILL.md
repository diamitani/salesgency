---
name: clay-prospecting-engine--patrick-diamitani
description: Process/Note derived from Clay Prospecting Engine — Patrick Diamitani.pdf
source_path: Atlas Portfolio/Clay Prospecting Engine — Patrick Diamitani.pdf
---

# Clay Prospecting Engine — Patrick Diamitani.pdf

## Context
This skill provides knowledge, processes, and instructions derived from the document: `Clay Prospecting Engine — Patrick Diamitani.pdf`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

7/17/26, 3:14 PM

Clay Prospecting Engine — Patrick Diamitani

Patrick Diamitani / ENTERPRISE AI PRODUCTION

LinkedIn ↗

Skill & Product Library / Sales Automation
Claude Skill

Shipped

Clay Prospecting Engine
Zero-UI prospecting for non-technical reps — upload a CSV, get an enriched list back.
Two-mode prospecting, zero Clay UI interaction required from reps
Claude Skill

Clay

HubSpot

enrichment

prospecting

Overview
Clay is a powerful GTM enrichment platform, but reps at a global HR-tech (EOR) platform couldn't (and
shouldn't have to) drive its UI — every list request bottlenecked on one person. This production Claude
skill lets a rep upload any CSV; it auto-detects whether it's a company list or a contact list, routes to the
right Clay pipeline via the Clay REST API, and returns enriched results — synced to a CRM table,
dropped as a CSV in chat, or emailed. Two-mode prospecting (Company → find & enrich contacts;
Contacts → fill missing emails/phones/LinkedIn/firmographics) with zero Clay UI interaction required.
Backed by a full AI Revenue Operations agent charter governing source-of-truth boundaries, an 18-code
suppression taxonomy, and a safe CRM-update policy.

The Problem
Clay is genuinely powerful for enrichment, but its table-building UI isn't something 50+ non-technical
reps can (or should) drive themselves. Every list request — "enrich this list of companies," "fill in
missing emails for these contacts" — routed through one person, creating a queue and a single point of
failure.

How It Works
https://diamitani.github.io/patrick-diamitani-portfolio/products/clay-prospecting-engine.html

1/4

7/17/26, 3:14 PM

Clay Prospecting Engine — Patrick Diamitani

1. Upload any CSV — a rep drops a spreadsheet into the Claude skill; no Clay account or login needed
on the rep's side.
2. Header-signature mode detection — the skill inspects the column headers to auto-detect whether
the upload is company-level or contact-level data, and picks the matching Clay pipeline without the
rep specifying anything.
3. Company mode — for a company list, the skill routes to a Clay table via the Clay REST API (Clay's
programmatic interface, letting other tools trigger its enrichment without opening Clay itself) that
finds and enriches decision-maker contacts at each company.
4. Contact mode — for a contact list, a different Clay pipeline fills missing emails, phones, LinkedIn
URLs, and firmographic data on existing records.

5. Staged execution protocol — the skill runs in defined stages (validate → submit to Clay → poll for
completion → format results) rather than a single black-box call, so failures are catchable and
reportable mid-run.
6. Delivery choice — results return as a CRM table sync (writes directly into HubSpot), a CSV attached
in the chat, or an emailed file — whichever fits the rep's workflow.
7. Governance underneath — every run operates inside an AI Revenue Operations charter: the CRM is
the source of truth, Clay is enrichment-only, a workflow-automation layer handles orchestration,
and a backfill data vendor covers gaps; an 18-code suppression taxonomy (customers, open deals,
active sequences, bounces, DNC, etc.) prevents prospecting into people who shouldn't be
prospected; CRM writes fill blanks but never blind-overwrite existing data, flagging conflicts instead.

Stack & Integrations
Tool

Role

Access needed

Claude skill

CSV ingestion, mode detection, staged
execution, delivery

Claude Code / Claude with skill
installed

Clay REST API

Programmatic trigger of
company/contact enrichment pipelines

Clay API key + pre-built table IDs

CRM (HubSpot)

System of truth; optional direct table sync
destination

Private-app token
(contacts/companies read-write)

CSV
parsing/validation

Header-signature detection, input
validation

Ships with the skill

Setup Process
https://diamitani.github.io/patrick-diamitani-portfolio/products/clay-prospecting-engine.html

2/4

7/17/26, 3:14 PM

Clay Prospecting Engine — Patrick Diamitani

1. Build (or reuse) the two Clay pipelines the skill routes to: one for company→contact enrichment,
one for contact backfill.
2. Install the Claude skill; configure the Clay API key and the two table IDs it targets.
3. Configure the CRM private-app token if direct table sync is wanted; otherwise chat/email delivery
works standalone.
4. Test with a small sample company list and a small sample contact list to confirm mode autodetection picks correctly.
5. Set suppression rules (18-code taxonomy) matching your CRM's own do-not-contact / customer /
active-sequence fields.
6. Roll out to the rep team with a short usage guide; monitor the first week's runs against the
governance charter.

What You Need
[ ] Clay workspace with the two target pipelines built and an API key
[ ] Claude Code or Claude access for the team
[ ] Optional: CRM private-app token for direct table sync
[ ] A defined suppression policy (customers, open deals, DNC, bounces, active sequences, etc.)
[ ] ~1 day to configure pipelines + test both modes

Results
Shipped with a rep-facing guide.
Two-mode prospecting (Company and Contacts) with zero Clay UI interaction required from reps.
Backed by a full agent charter: source-of-truth boundaries per system, safe CRM-update policy (fill
blanks, never blind-overwrite, flag conflicts), audit trail per run, and a secrets policy that forbids
pasted credentials.

Challenges & Fixes

Every enrichment request bottlenecked on one person → self-serve skill with auto-detected
mode, removing the manual triage step entirely.

Risk of reps overwriting good CRM data with enrichment results → safe-update policy: fill blanks
only, never blind-overwrite, flag conflicts for review instead of silently resolving them.

Risk of re-prospecting suppressed contacts (customers, DNC, active sequences) → an 18-code
suppression taxonomy enforced before any list goes out.

Credential handling by non-technical users → a secrets policy that forbids pasting credentials
into chat; the skill holds the Clay API key, not the rep.
https://diamitani.github.io/patrick-diamitani-portfolio/products/clay-prospecting-engine.html

3/4

7/17/26, 3:14 PM

Clay Prospecting Engine — Patrick Diamitani

Demonstrates

Productizing internal tooling for non-technical users · compliance-first outbound design · agent
governance documents that read like platform policy, not a README.

STACK & INTEGRATIONS
Claude Skill

Clay

HubSpot

WHAT IT NEEDS

✓ Clay workspace with target pipelines built and an API key
✓ Claude Code or Claude access for the team
✓ Optional: CRM private-app token for direct table sync
✓ A defined suppression policy (DNC, customers, active sequences, etc.)
DISCUSS THIS BUILD
Happy to walk through the architecture, the failures along the way, or how this could translate to your team.

Email Patrick

© 2026 Patrick Diamitani. Case studies anonymized for public portfolio use — no employer-identifying or client-identifying detail
included.
pdiamitani@atlashxm.com · linkedin.com/in/diamitani

https://diamitani.github.io/patrick-diamitani-portfolio/products/clay-prospecting-engine.html

4/4
