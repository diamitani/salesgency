---
name: run-contextschema
description: Process/Note derived from run-context.schema.json
source_path: pal-console-multi-screen-build/project/uploads/run-context.schema.json
---

# run-context.schema.json

## Context
This skill provides knowledge, processes, and instructions derived from the document: `run-context.schema.json`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

{
  "type": "object",
  "required": [
    "org_id",
    "project_id",
    "run_id",
    "stage",
    "agent",
    "artifacts",
    "knowledge",
    "tool_grants",
    "constraints"
  ],
  "properties": {
    "org_id": {
      "type": "string"
    },
    "project_id": {
      "type": "string"
    },
    "run_id": {
      "type": "string"
    },
    "stage": {
      "type": "string"
    },
    "agent": {
      "type": "string"
    },
    "artifacts": {
      "type": "array"
    },
    "knowledge": {
      "type": "array"
    },
    "tool_grants": {
      "type": "array"
    },
    "constraints": {
      "type": "object"
    }
  }
}
