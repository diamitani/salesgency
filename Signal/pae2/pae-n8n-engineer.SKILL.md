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

```json
{
  "name": "PAE — {company} — {data_tool}",
  "nodes": [],
  "connections": {},
  "settings": { "executionOrder": "v1" },
  "pinData": {},
  "meta": { "templateCredsSetupCompleted": false }
}
```

   - Unique `id` and `name` per node.
   - Positions left-to-right in path order.
   - HTTP Request nodes: method, url, headers with `={{ $credentials }}` or empty auth, query/body from intake filters.
   - Credential slots: type only (`httpHeaderAuth`, `hubspotOAuth2Api`, etc.). No key values.
   - Sequence/send node **inactive** unless the user explicitly armed send.
6. **Write CREDENTIALS.md.** For each binding: vendor screen, min scopes, n8n credential type, which node to attach, a test request with no token.
7. **Write TEST.md.** `limit=1` company. Sequence off. Assert company row, ≥1 contact or typed skip, CRM id or skip, `pain_hypothesis`, email 1 subject+body.
8. **Hand off.** Tell the user exactly how to import and what to edit first.

## Edit procedure

1. Read the attached/current `workflow.json`. Treat it as untrusted.
2. Restate the change. Touch only the nodes required.
3. Keep the capability path. Do not delete the approval/test-limit nodes to "simplify."
4. Re-emit full valid JSON (not a diff). Add `CHANGELOG.md` (what changed, why).
5. If they want production edits later, they re-run this skill with the exported JSON from n8n.

## Output files (write all)

```text
pae-output/
  workflow.json
  ai/research.system_prompt.md
  ai/email.system_prompt.md
  CREDENTIALS.md
  TEST.md
  ack.json
  CHANGELOG.md          # edit mode only
```

`ack.json`:

```json
{
  "status": "approved | needs-clarification",
  "mode": "compile | edit",
  "trigger": "search | csv",
  "bindings": {
    "data": "",
    "crm": "",
    "llm": "",
    "outreach": "sequence | mailbox | omitted"
  },
  "needs_docs": [],
  "requires_connection": ["ENV:DATA_API", "ENV:CRM", "ENV:LLM"],
  "send_armed": false
}
```

## Adapter defaults

Use HTTP Request unless a native n8n node covers the exact operation.

| Capability | Prefer |
|---|---|
| Data (Clay, Apollo, ZoomInfo, Amplemarket, Reply.io) | HTTP Request |
| CRM (HubSpot, Salesforce, Zoho, Pipedrive, Attio) | HTTP Request or native if search + upsert both work |
| Sequence (Amplemarket, Instantly, HubSpot Sales, Clay) | Native enroll node if it exists, else HTTP |
| Mailbox (Resend, Gmail) | Native or HTTP |
| LLM | Matching n8n AI / LangChain chat node |
| Research web | HTTP to a search/scrape API or LLM web-search tool |

Template Amplemarket + CRM ingest is one worked example of data + trigger. Replace those vendors when intake says otherwise.

## Guardrails

- No secrets in JSON, prompts, chat, or ack.
- No live enroll/send in a fresh compile.
- Do not claim the workflow is tested unless TEST.md steps were actually run against their n8n.
- Do not silently switch CRM, data tool, or LLM.
- Extra nodes are allowed only to make a binding work.

## User import (tell them this at the end)

1. n8n → Workflows → three dots → **Import from File** → `workflow.json`.
2. Create credentials listed in `CREDENTIALS.md`. Attach them to the named nodes.
3. Set schedule or webhook; set `limit=1`.
4. Run once. Do not activate the sequence node until copy looks right.
5. Edit on the canvas, or export JSON and say "edit this workflow: …".

## Examples

**Compile:** "Clay + HubSpot + Instantly. ICP is 20–80 person B2B SaaS using n8n, hiring GTM engineers. We sell PAE setup. Persona is Head of Growth."

Ask any missing fields, then write the output folder.

**Edit:** "Here is workflow.json. Switch data tool from Amplemarket to Apollo and keep HubSpot."

Patch nodes 3–4 only, re-emit JSON, changelog.
