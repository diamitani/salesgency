---
name: propose-pmm-hypothesesskill
description: Process/Note derived from propose-pmm-hypotheses.SKILL.md
source_path: figmasentinel/propose-pmm-hypotheses.SKILL.md
---

# propose-pmm-hypotheses.SKILL.md

## Context
This skill provides knowledge, processes, and instructions derived from the document: `propose-pmm-hypotheses.SKILL.md`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

---
name: propose-pmm-hypotheses
description: Turn persisted Figma Reddit clusters into 3 to 5 falsifiable product and marketing hypotheses (message tests, tutorials, comparison pages, Make/MCP pairing). Use after persist, before or with the daily brief. Never recommend astroturfing Reddit.
icon: lightbulb
color: Yellow
related_server_ids: [gsheets]
---

# Propose PMM hypotheses

## When to use
After rows are persisted for the window, or when the user asks how to increase love-share or steal a job from a similar tool.

## Form (required)
Because [cluster + mention ids], if we [action] for [audience], then [metric] will [direction] within [window]. Kill if [criterion].

Tag owner_team: product | pmm | education | partnership

## Rules
- Prefer actions Figma PMM or marketing engineering can run.
- Include at least one analog-tool hypothesis when software entities exist (example: Cursor handoff vs Dev Mode MCP).
- Evidence ids required. No hypothesis from a single weak-n cluster unless labeled speculative.
- Do not recommend posting in Reddit threads, vote manipulation, or fake community accounts.
- "Increase" means love-share, resolved hate clusters, or GTM message fit — not vanity volume.

## Output
3 to 5 hypotheses with owner_team, statement, action, audience, metric, evidence_ids, kill_criteria, confidence.
Persist them with persist-sentinel-rows on the hypotheses tab.
