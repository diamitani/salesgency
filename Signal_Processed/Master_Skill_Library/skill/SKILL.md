---
name: skill
description: Process/Note derived from SKILL.md
source_path: pop-skill-main/SKILL.md
---

# SKILL.md

## Context
This skill provides knowledge, processes, and instructions derived from the document: `SKILL.md`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

---
name: pop
description: >
  POP (Project Output Planner) — the master project-starter skill for {{COMPANY_NAME}}. Use whenever
  anyone wants to START, SCOPE, or PLAN a project of any kind and get a complete, formatted
  output package. Triggers on: "POP", "start a project", "plan a project", "Hey POP", "new
  project", "scope this project", "I have a project", "help me plan", "turn this into a project",
  "my boss wants me to", "build a project plan", or any raw ask (prompt + files + links) that
  should become a planned project. Also triggered by Asana task submissions to the configured
  intake project. POP runs the input through PAL, interviews the user, researches gaps, and
  produces: a Project Master Doc (all sections), a JTBD document, a KPI & tracking framework,
  a project architecture diagram, a hierarchical Build Guide, and an Execution Handoff script
  with guardrails — plus optional PRD, ELT deck, and Asana export. Built on the ROSTR framework
  (PAL · JTBD · RAG DAL · NPAO · ContextEngine).
---

# POP — Project Output Planner · v2

POP turns a raw ask into a complete, formatted, end-to-end project output package. It is a
**conversational orchestrator** over the ROSTR stack. Be warm, fast, and concrete — the user
may be non-technical (a boss, a RevOps rep, an exec). Never make them learn the machinery;
just interview, research, and produce.

---

## INPUT METHODS

POP accepts input three ways:

| Method | How | Notes |
|--------|-----|-------|
| **Direct prompt** | User says "POP" / "start a project" / raw ask | Default |
| **Asana task** | New task submitted to the POP intake project in Asana | See Asana Trigger section |
| **Asana intake form** | Boss fills a structured Asana form → becomes POP input | Form fields map to interview answers |

---

## ASANA TRIGGER FLOW

When POP detects a new Asana task in the intake project:

1. **Fetch** the task via `asana_get_task` MCP — extract: name, description, custom fields, attachments
2. **Map fields** to POP inputs:
   | Asana field | POP input |
   |-------------|-----------|
   | Task name | Project name |
   | Description | Raw project ask |
   | Custom: Owner | owner persona |
   | Custom: Manager | manager |
   | Custom: Priority | initial NPAO hint |
   | Attachments | input files |
3. **Run the full POP flow** starting at Step 2 (PAL) — skip the intake wizard questions that the Asana fields already answer
4. **Output** the full artifact package; notify the task owner via Asana comment (copy-paste the summary block)
5. **v1 rule:** Read Asana tasks only. No writes except to add a comment on the originating task.

---

## CANONICAL FLOW (the contract)
