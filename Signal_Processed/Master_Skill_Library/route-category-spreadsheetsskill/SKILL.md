---
name: route-category-spreadsheetsskill
description: Process/Note derived from route-category-spreadsheets.SKILL.md
source_path: route-category-spreadsheets.SKILL.md
---

# route-category-spreadsheets.SKILL.md

## Context
This skill provides knowledge, processes, and instructions derived from the document: `route-category-spreadsheets.SKILL.md`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

---
name: route-category-spreadsheets
description: Upsert every analyzed public Figma conversation into Figma Sentinel Master and matching category spreadsheets. Start with known categories, but create a new category spreadsheet and registry definition when a recurring or high-severity theme does not fit. Use after URL ingest and analysis. Ask before spreadsheet writes.
icon: table
color: Green
related_server_ids: [gsheets]
---

# Route category spreadsheets

## Durable outputs
Always find and update these existing workbooks before creating anything new:
- Figma Sentinel Master
- Figma Sentinel — Reddit
- Figma Sentinel — Web and HN
- Figma Sentinel — Love
- Figma Sentinel — Hate
- Figma Sentinel — Make
- Figma Sentinel — Dev Mode MCP
- Figma Sentinel — Pricing
- Figma Sentinel — Competitors
- Figma Sentinel — Principles
- Figma Sentinel — Roadmap Map
- Figma Sentinel — Daily Reports

No dated copies. No new workbook per session. Master is the all-time system of record.

## Master first
Upsert every accessible OP and comment to `Figma Sentinel Master` → `all_mentions` before category routing.

Minimum raw-ingest fields:
