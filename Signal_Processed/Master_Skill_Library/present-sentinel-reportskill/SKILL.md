---
name: present-sentinel-reportskill
description: Process/Note derived from present-sentinel-report.SKILL.md
source_path: present-sentinel-report.SKILL.md
---

# present-sentinel-report.SKILL.md

## Context
This skill provides knowledge, processes, and instructions derived from the document: `present-sentinel-report.SKILL.md`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

---
name: present-sentinel-report
description: Transform Figma Sentinel raw analysis into a beautiful, plain-English leadership report. Use after quality-gate and before delivery. This is the presentation skill: it makes the report readable, scannable, visual, and decision-oriented without changing the underlying evidence.
icon: presentation
color: Purple
---

# Present Sentinel report

## Purpose
Turn technical harvest output into a polished product-intelligence report that a PMM, product leader, design leader, or executive can read in under five minutes.

This skill **does not re-harvest, reclassify, or invent claims**. It packages approved source-grounded findings into a human-readable report.

## Inputs
- Quality-gated report data
- Master spreadsheet aggregates
- Top themes, sentiments, wants, needs, roadmap mappings, examples, and source health
- Report mode: `BOOTSTRAP` or `NEW TODAY`

## Audience modes
Default: `executive`.

- `executive`: decision, risk, opportunity, recommended action; limited methods language.
- `product`: issue clusters, owner, product surface, evidence, recommendation.
- `pmm`: language, objections, education gaps, competitor framing, message tests.
- `design`: workflow friction, systems, craft, agent behavior, usability.

Ask only if the requested audience materially changes the report. Otherwise generate executive first and append a compact appendix.

## Report design rules
- Lead with **what changed and what leadership should do**. Never lead with endpoint errors.
- Use one short headline, one “bottom line” paragraph, and no more than five key findings.
- Use plain English: “People are struggling to…” not “the cluster indicates a negative polarity.”
- Every finding gets: `what we heard`, `why it matters`, `what to do`.
- Use short evidence snippets only, maximum 180 characters each. No usernames.
- Use a concise table where it increases scanability.
- Keep methodology, source coverage, classifier limitations, and low-n caveats in a final “Confidence and coverage” section.
- Do not use fake precision. Round counts when quality is weak. Example: “about 300 threads,” not “300.0.”
- Call sentiment “directional community signal,” never NPS, satisfaction, market share, or a census.

## Required executive report structure
