---
name: intent-specschema
description: Process/Note derived from intent-spec.schema.json
source_path: pal-console-multi-screen-build/project/uploads/intent-spec.schema.json
---

# intent-spec.schema.json

## Context
This skill provides knowledge, processes, and instructions derived from the document: `intent-spec.schema.json`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

{
  "type": "object",
  "required": [
    "stated_requirements",
    "inferred_requirements",
    "non_goals",
    "research_targets",
    "assumptions",
    "decision_log",
    "traceability"
  ],
  "properties": {
    "stated_requirements": {
      "type": "array"
    },
    "inferred_requirements": {
      "type": "array"
    },
    "non_goals": {
      "type": "array"
    },
    "research_targets": {
      "type": "array"
    },
    "assumptions": {
      "type": "array"
    },
    "decision_log": {
      "type": "array"
    },
    "approval_requests": {
      "type": "array"
    },
    "traceability": {
      "type": "array"
    }
  }
}
