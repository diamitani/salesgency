---
name: compose-daily-briefskill-2
description: Process/Note derived from compose-daily-brief.SKILL (2).md
source_path: figmasentinel/compose-daily-brief.SKILL (2).md
---

# compose-daily-brief.SKILL (2).md

## Context
This skill provides knowledge, processes, and instructions derived from the document: `compose-daily-brief.SKILL (2).md`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

---
name: compose-daily-brief
description: Write the daily Figma Sentinel operator brief from the master Sheet. Must answer what people want, what they say, what they need, and how that maps to Figma public roadmap. Use after persist-master-db and quality-gate. Ask before Slack or email. Do not harvest or reclassify here.
icon: file-text
color: Blue
related_server_ids: [gsheets, slack]
---

# Compose daily brief

## Headline rules
- URL counts come from url_registry. Full-run goal is 100 unique threads.
- Sentiment mix uses confidence at least 0.55 and sentiment_label not unclear.
- Quotes only from evidence_span. No usernames.
- Roadmap language is public pillars only.

## Structure
1. Harvest health: searched, unique threads, JSON ok vs blocked, dumps written
2. Registry size over time (total tracked vs new today)
3. What people say
4. What people want
5. What they need from us
6. Public roadmap fit: aligned, gap, contradiction, not_public
7. Sentiment mix on OP topics
8. Similar tools competing for the same job
9. Up to 5 killable hypotheses
10. Bias: Reddit plus DuckDuckGo ranking is not all Figma users. Unpublished roadmap is unknown.
11. Now / next / later
12. Slack-ready paragraph. Do not send until `deliver-daily-slack` or user approval.

## Delivery
Write markdown in chat. Upsert the daily_reports tab.

Slack, Gmail, or Notion only after Ask Question.

Never post the brief on Reddit.

## Example Slack paragraph
Figma Sentinel: 104 threads via DuckDuckGo plus JSON (12 new). People want reliable Dev Mode inspect and Make output that survives into code layers. Need is design-code as one canvas job. Maps to code_as_material (gap on quality). Hate-share 28%. Brief in thread.
