---
name: learning-candidateschema
description: Process/Note derived from learning-candidate.schema.json
source_path: pal-console-multi-screen-build/project/uploads/learning-candidate.schema.json
---

# learning-candidate.schema.json

## Context
This skill provides knowledge, processes, and instructions derived from the document: `learning-candidate.schema.json`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

{
  "type": "object",
  "required": [
    "candidate_id",
    "source_runs",
    "proposed_change",
    "evaluation_plan",
    "status"
  ],
  "properties": {
    "status": {
      "enum": [
        "candidate",
        "evaluating",
        "approved",
        "rejected",
        "canary",
        "promoted",
        "rolled_back"
      ]
    }
  }
}
