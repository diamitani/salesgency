---
name: entity-readiness-execution-health-skill
description: Process/Note derived from entity-readiness-execution-health-SKILL.md
source_path: Atlas Portfolio/entity-readiness-execution-health-SKILL.md
---

# entity-readiness-execution-health-SKILL.md

## Context
This skill provides knowledge, processes, and instructions derived from the document: `entity-readiness-execution-health-SKILL.md`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

---
name: entity-readiness-execution-health
description: Inspect the Atlas Entity Readiness Change Report n8n workflow for execution success, errors, Onspring pull health, delivery completion, baseline writes, and activation state. Use for read-only post-run validation, error triage, or confirming that this specific weekly entity-readiness report is safe to deploy.
---

# Entity Readiness Execution Health

Use this skill only for the Atlas Entity Readiness Change Report. It is read-only: never retry, stop, activate, deactivate, create, update, or delete anything in n8n.

## Project scope

- n8n workflow: `Entity Readiness Change Report - Weekly` (`EirKWJBySSXugv3a`)
- Source: Onspring Report 954
- Baseline table: `entity_readiness_baseline` (`DWg0YxdKbQcNcwtv`)
- Ready statuses: `Ready to Hire Locals` and `Ready to Hire All`

## Run the inspector

Require an approved `N8N_ENTITY_REPORT_API_KEY` environment variable. The script also accepts `N8N_API_KEY` for backward compatibility. Do not print, save, paste, or hard-code the key in this skill.
