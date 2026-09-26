---
name: rfp-response-suite--patrick-diamitani
description: Process/Note derived from RFP Response Suite — Patrick Diamitani.pdf
source_path: Atlas Portfolio/RFP Response Suite — Patrick Diamitani.pdf
---

# RFP Response Suite — Patrick Diamitani.pdf

## Context
This skill provides knowledge, processes, and instructions derived from the document: `RFP Response Suite — Patrick Diamitani.pdf`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

7/17/26, 3:10 PM

RFP Response Suite — Patrick Diamitani

Patrick Diamitani / ENTERPRISE AI PRODUCTION

LinkedIn ↗

Skill & Product Library / RevOps
AI Agent System

Phase 1 live

RFP Response Suite
From days to hours on enterprise questionnaires — a knowledge base that closes its own gaps.
Phase 1 live: atomic KB + auto-created HubSpot tickets for every answer gap
Claude Skill

HubSpot

RFP

knowledge base

semantic search

Overview
Enterprise RFP responses at a global HR-tech (EOR) platform took days of hunting through old
documents, answers were inconsistent between reps, and gaps in the knowledge base were invisible
until a prospect asked a question nobody could answer. This three-part Claude skill suite fixes all three:
an RFP KB Builder parses historical RFP files and support tickets into atomic, owner-routed Q&A facts;
an RFP Answer Retriever semantically matches new RFP questions against that knowledge base with
an honest confidence rating and auto-creates tickets for every gap; and an RFP Responder agent
ingests a full RFP, categorizes every requirement, and drafts compliant responses. Phase 1 (KB + gap
tickets) is live; Phases 2–3 (compliance-platform integration, auto-draft) are specced and ready to build.

The Problem
RFP responses took days of manual document archaeology, answers drifted between reps answering
the same question differently over time, and there was no visibility into which facts the company
simply didn't have a good answer for — gaps surfaced only when a prospect's question stumped
someone.

How It Works
https://diamitani.github.io/patrick-diamitani-portfolio/products/rfp-response-suite.html

1/5

7/17/26, 3:10 PM

RFP Response Suite — Patrick Diamitani

1. RFP KB Builder — turn history into atomic facts. Parses historical RFP files (.pdf/.docx/.xlsx) and
CRM support tickets into individual, atomic Q&A pairs — one fact, one answer, not a wall of text.
2. Classification — each fact is tagged company-wide-general or country/region-specific, the single
biggest source of wrong-answer risk in international-employment RFPs.
3. Ownership routing — every fact is routed to a named owner category (product, HR services,
finance, global mobility, implementation) so a stale or disputed answer has a clear person to check
with.
4. Conflict flagging — where historical answers to the same question disagree, the builder flags the
conflict instead of silently picking one, so a human resolves it once instead of the same conflict reemerging in every future RFP.
5. Export — the resulting knowledge base ships as a compliance-platform-ready two-tab Excel
workbook, matching the format the target GRC/knowledge system expects.
6. RFP Answer Retriever — close the loop on new RFPs. Given a new RFP's questions, it semantically
matches each one against the KB and returns a HIGH / MEDIUM / NO-MATCH confidence rating per
answer — never a false-confident guess.
7. Batch processing + gap tickets — a full RFP runs as a batch with a coverage summary (% HIGH /
MEDIUM / NO-MATCH), and every NO-MATCH question automatically creates a CRM ticket, turning
"we don't know" into an owned, tracked work item instead of a silent gap.
8. RFP Responder agent — for the full end-to-end case, ingests an entire RFP document, extracts and
categorizes every requirement across 8 categories, matches each to the company's actual
capabilities, drafts a compliant response, and explicitly flags what needs human subject-matter
review rather than guessing.

Stack & Integrations
Tool

Role

Access needed

Claude skills + agent

KB building, retrieval, drafting

Claude Code / Claude with skills
installed

Document parsing
(PDF/DOCX/XLSX)

Ingests historical RFPs and source
documents

Local file access

Semantic matching engine

Confidence-tiered retrieval against
the KB

Ships with the Answer Retriever
skill

CRM tickets API (HubSpot)

Auto-creates a ticket for every
knowledge gap

Private-app token (tickets readwrite)

https://diamitani.github.io/patrick-diamitani-portfolio/products/rfp-response-suite.html

2/5

7/17/26, 3:10 PM

RFP Response Suite — Patrick Diamitani

Tool

Role

Access needed

Excel export

Two-tab, compliance-platform-ready
KB workbook

Local file output

GRC platform (Onspring, later
phase)

Target destination for a live-synced
KB

Planned integration

Setup Process
1. Gather historical RFP files and export relevant support tickets as source material.
2. Run the RFP KB Builder skill to generate the atomic Q&A knowledge base; review and resolve any
flagged conflicts.
3. Assign real owners (product/HR services/finance/global mobility/implementation) to the fact
categories in your org.
4. Export the two-tab Excel workbook; this is your live KB for Phase 1.
5. Run the RFP Answer Retriever skill against a new RFP; review the coverage summary and confirm
gap tickets land correctly in the CRM.
6. (Later phases, when ready) Wire the KB to your GRC platform and enable the full RFP Responder
agent for auto-drafted responses.

What You Need
[ ] Historical RFP documents (.pdf/.docx/.xlsx) and relevant CRM ticket history
[ ] Claude Code or Claude access with the RFP skill suite installed
[ ] CRM private-app token (tickets read-write) for auto-gap-ticketing
[ ] Named fact owners across product/HR services/finance/global mobility/implementation
[ ] ~1–2 days for initial KB build; hours per RFP thereafter

Results
Phase 1 live: Excel-as-active-KB plus automatic CRM ticket creation for every answer gap.
Later phases specced: GRC platform integration, confidence-scoring v2, and full auto-draft
generation.

Every gap becomes an owned, tracked ticket instead of disappearing until the next RFP hits the
same wall.

Challenges & Fixes
https://diamitani.github.io/patrick-diamitani-portfolio/products/rfp-response-suite.html

3/5

7/17/26, 3:10 PM

RFP Response Suite — Patrick Diamitani

Answers drifting between reps over time → atomic Q&A facts with named owners instead of freetext institutional memory.

Region-specific facts misapplied company-wide (or vice versa) → explicit general vs. regionspecific classification on every fact.

Historical answers contradicting each other → conflicts flagged for human resolution instead of
silently auto-resolved.

Knowledge gaps invisible until a prospect asked → NO-MATCH questions auto-create a CRM
ticket, closing the loop from "unknown" to "assigned."

Demonstrates
Knowledge-base architecture (atomic facts, ownership routing, conflict detection) · honest-confidence
retrieval design (HIGH/MEDIUM/NO-MATCH, never a bluff) · closing the loop from "unknown" to
"assigned."

STACK & INTEGRATIONS
Claude Skill

HubSpot

Excel

Onspring (planned)

WHAT IT NEEDS

✓ Historical RFP documents (.pdf/.docx/.xlsx) and CRM ticket history
✓ Claude Code or Claude access with the RFP skill suite
✓ CRM private-app token (tickets read-write)
✓ Named fact owners across product/HR/finance/mobility/implementation
DISCUSS THIS BUILD
Happy to walk through the architecture, the failures along the way, or how this could translate to your team.

Email Patrick

https://diamitani.github.io/patrick-diamitani-portfolio/products/rfp-response-suite.html

4/5

7/17/26, 3:10 PM

RFP Response Suite — Patrick Diamitani

© 2026 Patrick Diamitani. Case studies anonymized for public portfolio use — no employer-identifying or client-identifying detail
included.
pdiamitani@atlashxm.com · linkedin.com/in/diamitani

https://diamitani.github.io/patrick-diamitani-portfolio/products/rfp-response-suite.html

5/5
