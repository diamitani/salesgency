---
name: map-chatter-to-roadmapskill
description: Process/Note derived from map-chatter-to-roadmap.SKILL.md
source_path: figmasentinel/map-chatter-to-roadmap.SKILL.md
---

# map-chatter-to-roadmap.SKILL.md

## Context
This skill provides knowledge, processes, and instructions derived from the document: `map-chatter-to-roadmap.SKILL.md`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

---
name: map-chatter-to-roadmap
description: Connect classified Reddit chatter to Figma public goals and roadmap pillars. Answer what people want, what they say, what they need from us, and whether that sits on the public roadmap. Use after analyze-thread-dump and figma-public-context.
icon: git-compare
color: Teal
---

# Map chatter to Figma goals

## Required answers every run
1. What do people want? Ranked asks by thread count.
2. What do they say? Evidence spans, not slogans.
3. What are they needing from us? Jobs under the asks.
4. What is the public roadmap fit? Pillar id plus aligned, gap, contradiction, or not_public.

## Steps
1. Load pillar ids from `figma-public-context`.
2. Assign each analyzed thread 1 or 2 pillars and one alignment label.
3. Roll up the window. Full run should use 100 plus URLs when available.
4. Flag vibe-code analogs (Cursor, v0, Lovable, Bolt, Penpot, Framer) as competition for the same job, especially code_as_material and dev_handoff_mcp.
5. Write up to 5 killable hypotheses.

## Output row for roadmap_map
thread_id, figma_pillar, public_product, alignment, people_want, people_say, people_need, roadmap_note, evidence_ids

## Hypothesis form
Because [want or need plus ids], if we [PMM or product action tied to a public pillar], then [metric] moves within [window]. Kill if [criterion].

Tag owner_team: product, pmm, education, or partnership.

## Never
- Invent unpublished roadmap items
- Claim feature parity from one rant
- Recommend astroturfing, voting, or posting in Reddit threads
