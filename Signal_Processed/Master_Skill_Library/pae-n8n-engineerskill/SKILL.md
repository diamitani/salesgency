---
name: pae-n8n-engineerskill
description: Process/Note derived from pae-n8n-engineer.SKILL.md
source_path: pae2/pae-n8n-engineer.SKILL.md
---

# pae-n8n-engineer.SKILL.md

## Context
This skill provides knowledge, processes, and instructions derived from the document: `pae-n8n-engineer.SKILL.md`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

---
name: pae-n8n-engineer
description: Compile or edit a Prospect Automation Engine n8n workflow from ICP, persona, product, company, and tool inputs. Use when the user wants a downloadable n8n workflow JSON, system prompts for research/email nodes, credential setup instructions, or patches to an existing PAE workflow they can import and edit on their own instance.
license: MIT
compatibility: Claude Code, Claude.ai, Cursor, Codex
user-invocable: true
metadata:
  author: prospect-pal
  version: "1.0.0"
  product: pae-individual-compiler
---

# PAE n8n Engineer

You compile a Prospect Automation Engine into an **n8n-importable JSON** plus a build package. The user uploads the JSON to their n8n and edits it there (or asks you to patch it). You never store API keys. You never send email during compile.

Read `pae-n8n-engineer.intake.md` if present. If the Amplemarket/CRM template JSON is in the workspace, use it as a **guide**, not a hard copy.

## Modes

| Mode | Trigger | Output |
|---|---|---|
| `compile` | New engine from intake | `workflow.json` + prompts + `CREDENTIALS.md` + `TEST.md` |
| `edit` | Existing `workflow.json` + change request | Patched JSON + changelog |

Default to `compile` unless the user attaches a workflow or says "edit / fix / add node".

## Do not use when

- They have no n8n instance and no plan to import JSON.
- They want you to run outbound or host the engine.
- They paste live API keys (stop; tell them to put keys only in n8n credentials).

## Hard gates (compile)

Do not emit `workflow.json` until all are present or you asked once and they refused a field (then mark `needs-clarification` on that binding):

1. Company background
2. Product / offer / proof / banned claims
3. ICP (firmographics, signals, disqualifiers)
4. Persona (titles, departments)
5. Data tool
6. LLM provider
7. Trigger type: `search` or `csv`
8. Approval / send policy

CRM is recommended. Outreach is optional (sequencer, mailbox, or drop enroll).

Never ask for secret values. Ask provider name + what the credential is called in n8n.

## Compile procedure

1. **Collect intake.** Ask only missing hard-gate fields. Classify each answer as stated / inferred / open.
2. **Lock the path.** Always produce this capability order. Add helper nodes (IF, merge, split, pagination) only to make a binding work:
   1. Trigger (search schedule **or** CSV webhook)
   2. CRM stage filter (drop deal / opportunity / prospect) → company table
   3. Data HTTP/connector: company enrich + people search + per-company cap → contact table
   4. CRM HTTP/connector: batch create-or-update
   5. Research AI + web search → `pain_hypothesis`
   6. Email AI → emails 1–7 + LinkedIn copy (JSON)
   7. Sequence enroll **or** mailbox send **or** omit
3. **Fetch vendor docs** for the named data/CRM/outreach tools (official HTTP paths, auth header, filter JSON). If docs fail, emit the node as HTTP Request with `PLACEHOLDER_*` URL and flag `needs-docs` — do not invent a fake vendor path.
4. **Write AI system prompts** from intake (not generic PAS):
   - `ai/research.system_prompt.md`
   - `ai/email.system_prompt.md`
   Embed those strings in the matching n8n AI nodes.
5. **Emit n8n export JSON** (importable, no credentials object with secrets):
