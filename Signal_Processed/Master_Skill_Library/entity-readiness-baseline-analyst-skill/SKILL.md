---
name: entity-readiness-baseline-analyst-skill
description: Process/Note derived from entity-readiness-baseline-analyst-SKILL.md
source_path: Atlas Portfolio/entity-readiness-baseline-analyst-SKILL.md
---

# entity-readiness-baseline-analyst-SKILL.md

## Context
This skill provides knowledge, processes, and instructions derived from the document: `entity-readiness-baseline-analyst-SKILL.md`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

---
name: entity-readiness-baseline-analyst
description: Analyze the Atlas Entity Readiness Change Report baseline from an exported CSV or a run of its specific n8n workflow. Use when a user asks about the entity_readiness_baseline table, ready-country totals, status changes, baseline coverage, or Entity Readiness execution results without changing n8n data.
---

# Entity Readiness Baseline Analyst

Use this skill only for the Atlas Entity Readiness Change Report, read-only. It supports two reliable sources:

1. A CSV downloaded from the n8n Data Tables UI.
2. An execution URL or ID containing the workflow's Data Table and normalization outputs.

Project scope: workflow `EirKWJBySSXugv3a`, table `entity_readiness_baseline` (`DWg0YxdKbQcNcwtv`), source Onspring Report 954. Do not edit a Data Table, create a workflow, or use undocumented internal n8n routes. This Cloud instance currently does not expose Data Table rows through its public API.

## Analyze a CSV
