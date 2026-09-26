---
name: salesgencypop-project-master-doc
description: Process/Note derived from salesgencyPOP-Project-Master-Doc.md
source_path: salesgencyPOP-Project-Master-Doc.md
---

# salesgencyPOP-Project-Master-Doc.md

## Context
This skill provides knowledge, processes, and instructions derived from the document: `salesgencyPOP-Project-Master-Doc.md`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

# POP Project Master Doc: SalesGency Brand System

Project slug: `salesgency-brand-system` · Owner: Patrick Diamitani · Date: 2026-09-21 · Status: v1.0 built, pending your review

## Intent Brief

Create one clean, clear brand system for SalesGency (salesgency.com) from the uploaded wordmarks, the PAE proposal, the pitch deck, the website copy PDF, the offer diagram and the live site. Output: brand guidelines, logo kit, services website, price sheet, brand deck, and a pack that drops into an LLM harness.

## JTBD

| Job | Steps (NPAO) | Deliverable |
|---|---|---|
| Make every SalesGency asset look and sound the same | N: reconcile 3 conflicting logo variants and 4 pricing sources. A: lock tokens (color, type). P: build guidelines page. O: publish. | Brand guidelines page, `tokens.css` |
| Close prospects with a clear offer | N: choose the source-of-truth price ladder. A: write services copy from the reframed website copy. P: build site and price sheet. O: publish, add form/CRM hookup. | Services website, price sheet (web + PDF) |
| Let any agent produce on-brand work | N: write a one-page brief. A: package tokens + logos. P: draft the `salesgency-brand` skill. O: install in harness. | `BRAND.md`, `tokens.css`, logo SVGs, skill |
| Pitch the brand | A: design a 12-slide deck in the new system. | Brand deck |

## 1. Overview

A single source of truth for the SalesGency brand so the site, proposals, decks and every AI-generated asset match. Business use case: SalesGency sells a $299 teardown and a $2,500 sprint; consistency and clarity raise trust and conversion.

## 2. Project Goals (KPIs and reporting)

North star: a prospect can understand what SalesGency does and book a GTM teardown within one minute of landing on the site.

| KPI | Baseline | Target | Source | Cadence |
|---|---|---|---|---|
| Teardown requests per week | not yet tracked | set after 4 weeks of data | Site form / hello@salesgency.com | Weekly |
| Site visitors to teardown request rate | not yet tracked | set after baseline | Analytics | Weekly |
| Off-brand assets caught pre-send | not tracked | 0 shipped | Pre-flight checklist in BRAND.md | Per asset |
| Time to produce a new on-brand asset | not tracked | under 1 hour with harness | Manual log | Monthly |

Execution metrics: assets generated with the skill, revisions per asset, teardown-to-sprint conversion.

## 3. KPI Reporting Framework

- Platforms: site analytics, HubSpot (or the CRM you choose) for form leads, a simple sheet for asset counts.
- KPI type: revenue generated (teardown and sprint sales), time saved (asset production).
- Cadence: daily lead check, weekly funnel review, monthly brand audit.
- Dashboard: one HTML artifact or sheet with requests, conversion, and revenue by offer.
- **Profit and loss ownership:** Patrick Diamitani, as founder of SalesGency (d/b/a Diamitani Industries), is accountable for revenue and cost of this system and takes credit or responsibility for its results.

## 4. Features

| Feature | NPAO | 4Ds |
|---|---|---|
| Token file and brand brief | A | D1 |
| Logo kit (outlined SVGs) | A | D1 |
| Guidelines page | P | D2 |
| Services website | P | D2 |
| Price sheet (web + PDF) | P | D2 |
| Brand deck | P | D2 |
| Harness skill | O | D3 |

## 5. End users

Patrick (owner, primary), freelancers and contractors who produce assets, LLM agents in the harness, prospects viewing the site and price sheet.

## 6. Tech stack

- Production: Claude-hosted artifact pages (site, guidelines, price sheet, deck), Google Fonts (Outfit, Inter).
- Recommended for the real domain: static host (Vercel is connected to your account) pointing salesgency.com, plus a form endpoint (the current form opens an email).
- Key sheet: keep credentials in your vault, never in these files. Rotate any API credentials found in old skill files (flagged in the Cold MQL README).
- Data resources: the uploaded PAE proposal, pitch deck, Website Copy PDF, offer diagram, README, live salesgency.com.

## 7. Build plan (summary)

PreD: reconcile sources and decide pricing. D1: tokens, logos, brief. D2: guidelines, site, price sheet, deck. D3: publish, install skill, connect domain and form. D4: watch requests, fix, iterate.

## 8. Deployment plan

Method: artifacts are private links now. To go live: deploy `site.html` as a static page to salesgency.com, replace the mailto form with a real form endpoint, add analytics. Rollback: keep the current site live until the new one is approved. Access: share links only from the artifact Share menu.

## 9. Testing plan

Contrast checked against WCAG AA (table in guidelines). Check at phone width (390px), print the price sheet, submit the form to hello@salesgency.com, verify every price against the source of truth. Done when the pre-flight checklist passes on every asset.

## 10. Tools and scripts

Outfit Bold outlined into SVG paths with fontTools (so no logo depends on a webfont). Playwright for screenshots and the price sheet PDF. Artifact tool for hosted pages and the Slides type for the deck.

## 11. Documentation needed

BRAND.md (agents), tokens.css (developers), guidelines page (humans), price sheet (prospects). Owner: Patrick.

## 12. Next steps

**First Necessity (N):** confirm the price ladder and scope ($299 teardown, $2,500 sprint, add-ons) before the site goes public, because the live site, deck and proposal currently disagree.

1. Approve or edit prices. 2. Review site copy against the Website Copy PDF. 3. Install the `salesgency-brand` skill. 4. Point salesgency.com at the new site and wire the form. 5. Replace the pitch deck's emoji and off-palette blues with the new tokens. 6. Retire the two legacy wordmarks.

## 13. Collaborators

Owner and P&L: Patrick Diamitani. Builders: Claude. Team/ELT: none yet.

## 14. PRD

- Problem: SalesGency has three wordmark variants, four pricing sources and inconsistent color and type across site, deck and proposal.
- Solution: one brand system with tokens, a logo kit, rules, and ready assets.
- In scope: guidelines, logos, site, price sheet, deck, harness pack.
- Out of scope: domain DNS, analytics setup, CRM hookup, case studies and testimonials (none exist yet, so none are shown).
- Success: every new asset passes the pre-flight checklist; a prospect can request a teardown in under a minute.
- Non-functional: AA contrast, phone-width layout, no dependence on font loading for the logo.
- Risks: pricing inconsistency reaches prospects; unverified proof creeps back in; legacy logo files stay in circulation.

---

# Build Guide (tasks, in order)

**PreD**
- [ ] N: Decide price source of truth. Done when the price table in `BRAND.md` is approved.
- [ ] N: Confirm publishing rights for any metrics before showing them. Done when proof rules are agreed (current site shows none).

**D1 Design**
- [ ] A: Lock tokens in `tokens.css`. Done when colors pass AA.
- [ ] A: Outline the wordmark to SVG. Done when all variants render without a webfont.

**D2 Develop**
- [ ] P: Guidelines page, services site, price sheet, deck. Done when each passes the checklist.

**D3 Deploy**
- [ ] O: Install the `salesgency-brand` skill in your harness. Done when a test prompt yields an on-brand one-pager.
- [ ] O: Deploy the site to salesgency.com with a real form. Done when a test request reaches the CRM.

**D4 Debug**
- [ ] O: Review first two weeks of teardown requests and fix friction.

---

# Execution Handoff (for the next agent)

**Context:** Brand system v1.0 exists. Handoff scope is the first N and A tasks: confirm pricing and install the skill.

**Prompt to paste:** "Load `BRAND.md` and `tokens.css` from the salesgency-brand-kit. Do not change prices, claims or colors without asking. Task 1: list every place in the site, deck, price sheet and proposals where prices appear and check each against the price table. Task 2: run a test prompt for a one-page prospect email and check it against the pre-flight checklist. Report differences only."

**Guardrails.** Hard stops: delete files, expose secrets, push to production without instruction, send external messages, destructive database commands, write to Asana. Confirm first: batch operations over 10 records, writes to production systems, anything outside this task list. Autonomous: read files, write new files to the project folder, run tests, fill templates.

**Abort and escalate when:** prices conflict with the approved table, a claim has no verified source, or a credential appears in a file.

**Handoff chain:** Claude built v1.0, Patrick reviews, the harness agent executes.
