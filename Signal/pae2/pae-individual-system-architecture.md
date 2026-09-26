# PAE Individual System — Sitemap & Compile Architecture

**Product:** Prospect Automation Engineer — Build with agent (self-serve)
**Status:** Spec for last-mile build
**Date:** 2026-08-26

The Amplemarket + CRM template is a **reference implementation**, not the product. The individual system compiles a client-specific n8n workflow from business context + stack bindings.

---

## 1. Mental model

Two compilers run after intake. They share one instruction pack.

| Compiler | Input | Output |
|---|---|---|
| Prompt compiler | Company, product, ICP, persona, voice, proof | System prompt for the AI node |
| Graph compiler | Trigger, CRM, data API, sequencer, LLM, gates | n8n `workflow.json` + credential setup guide |

The graph is a **capability path**, not a vendor path:

```
ingest → normalize → crm.lookup → data.enrich
      → ai.research_and_copy → approval
      → crm.upsert → sequence.enroll → alert
```

Amplemarket in the template = one `data.enrich` + `sequence.enroll` adapter. HubSpot ingest in the template = one `ingest` + `crm.lookup` adapter. Swap adapters. Keep the path.

---

## 2. What the user actually provides

### A. Business context → writes the AI node

These fields become the system prompt. They never become HTTP URLs.

| Field | Why the AI node needs it |
|---|---|
| Company background | Who is writing, why they exist, category |
| Product / offer | What is sold, motion, proof, differentiator |
| ICP | Firmographics, triggers, disqualifiers |
| Persona | Title, job, pain, language they use |
| Voice + constraints | PAS length, banned claims, CTA, compliance |

### B. Stack bindings → writes HTTP + sequence nodes

These fields become node types, URLs, and credential instructions. They never get pasted as secret values.

| Binding | Default n8n implementation |
|---|---|
| Lead source | Schedule / Webhook / CRM HTTP search |
| CRM | HTTP Request (HubSpot/Salesforce private app or OAuth) |
| Data / enrichment | HTTP Request (Apollo, Clay, ZoomInfo, Amplemarket, …) |
| Sequencer | Native sequence node if one exists, else HTTP enroll |
| LLM | LangChain / OpenAI / Anthropic node |
| Approval | IF/Switch + Slack or email |
| Deploy target | Client's own n8n instance URL |

Hard rule: the form never asks for an API key. Setup instructions tell the user how to create the n8n credential after compile.

---

## 3. How the workflow is actually built

```
1. Intake (context + stack)
2. Gate (schema valid, no secrets, approval choice present)
3. Prompt compile  →  ai-node.system_prompt.md
4. NPAO bind       →  each capability → concrete node
5. Graph compile   →  workflow.json specialized from the 9-node guide
6. Credential plan →  CREDENTIALS.md (ENV names, scopes, where to click)
7. Quality check   →  approval node present, HTTP not hardcoded, no secrets
8. Handoff         →  review prompt, review graph, follow setup, deploy
```

### Node-by-node compile rules

| # | Capability | How it is built | Template guide (Amplemarket + CRM) |
|---|---|---|---|
| 01 | Ingest | Trigger the user chose: cron, webhook, or CRM HTTP search | CRM list / saved-view pull |
| 02 | Normalize | Fixed Code node. Domain, name, title, schema | Same for every client |
| 03 | CRM lookup | **HTTP Request** search by domain/email. Skip if already customer or open deal | HubSpot/Salesforce search |
| 04 | Data enrich | **HTTP Request** to the chosen data API. Find persona + verified email | Amplemarket people/search |
| 05 | AI research + copy | LLM node. **System prompt compiled from intake A** | Generic PAS prompt in template |
| 06 | Approval | IF/Switch. Full-auto vs Slack/email review | Human safety switch |
| 07 | CRM write | **HTTP Request** upsert contact + research notes | CRM create/update |
| 08 | Sequence | Sequence/enroll **node** when the vendor has one; HTTP enroll if not | Amplemarket add-to-sequence |
| 09 | Alert | Slack/email webhook only if approval or failure routing is on | Slack review queue |

### Why HTTP for data and CRM

n8n native CRM nodes do not cover every search/filter the engine needs. HTTP Request with a predefined credential type (HubSpot, Salesforce) or a generic header auth is the reliable pattern: search contacts, filter by domain, write notes, upsert. Same for data tools — one HTTP adapter per vendor, not a new graph.

### Why a node for sequence push

Enrollment is a side-effect with a mailbox identity. Prefer the vendor's sequence action (Amplemarket "Add to Sequence", HubSpot sequence enroll) so ownership and stop-on-reply stay native. Fall back to HTTP only when no sequence node exists.

---

## 4. What compile emits

```
/outputs/<run_id>/
  instruction-pack.json      locked intake
  ai-node.system_prompt.md   compiled for node 05
  workflow.json              n8n import
  CREDENTIALS.md             click-path setup, no secret values
  BUILD_PROMPT.md            remaining wiring in the client's n8n
  ack.json                   status, bindings, requires_connection[]
```

### System prompt shape (node 05)

```
You write outbound for {company} selling {product} to {persona} at {ICP}.
Voice: {voice}. Proof you may use: {proof}. Never claim: {banned}.
For each contact, use research context to form one pain hypothesis.
Write a 3-sentence PAS email + LinkedIn DM + phone hook.
Sign as {rep_name}. CTA: {cta}. Output JSON only.
```

The template's Amplemarket prompt is replaced entirely by this file.

### Credential instruction shape

For each `requires_connection` binding, emit:

1. Where to create the key (vendor settings path)
2. Minimum scopes
3. Which n8n credential type to create
4. Which node(s) to attach it to
5. A test request (HTTP method + path, no token)

Never store the key in Prospect PAL.

---

## 5. Site map — individual system only

This is not the full PAL workspace (chat, canvas, campaigns, engineer). It is a linear compile product.

```
PUBLIC
/                         Landing (this system)
/how-it-works             Process explainer (context → prompt → HTTP graph → setup)
/login                    Auth
/signup

APP — one run at a time
/app                      Home: resume run or start new
/app/start                Create run_id. Explain the two compilers.

/app/intake/company       Company background
/app/intake/product       Product / offer / proof
/app/intake/icp           ICP + disqualifiers
/app/intake/persona       Buyer persona + language
/app/intake/source        How leads enter (CRM / sheet / search)
/app/intake/stack         Data API, CRM, sequencer, LLM, n8n URL
/app/intake/gates         Approval + send policy
/app/intake/review        Recap. Block submit until no-secrets ack

/app/compile              Live status: gate → prompt → NPAO → graph → QA

/app/brief                Generated system prompt. Edit + regenerate
/app/workflow             9-node plan with this client's bindings
/app/setup                Credential instructions per HTTP / sequence node
/app/deploy               Paste n8n URL + one-time instance key. Import workflow
/app/done                 Receipt + open-in-n8n + download JSON

ACCOUNT
/app/runs                 Prior compiles, versions, recompile
/app/settings             n8n instance URL, connected-tool flags (no secrets)
```

### Route → compiler mapping

| Routes | Feeds |
|---|---|
| `/intake/company` → `/persona` | Prompt compiler |
| `/intake/source` → `/stack` | Graph compiler (HTTP + sequence nodes) |
| `/intake/gates` | Node 06 + 09 |
| `/brief` | Prompt artifact |
| `/workflow` + `/setup` + `/deploy` | Graph artifact |

### Hard gates

Do not compile if any of these are empty:

- Company, product, ICP, persona
- CRM, data API, sequencer, LLM, n8n URL
- Approval policy
- `no_secrets_acknowledged: true`

If a later step finds a tool that pulls undeclared PII, re-enter the gate. Do not infer.

---

## 6. Page jobs

| Page | User job | System job |
|---|---|---|
| Landing | Decide this is the self-serve builder | Sell process, not the Amplemarket template |
| Company → Persona | Dump the GTM brain | Store prompt ingredients |
| Source + Stack | Name tools, not keys | Resolve HTTP vs sequence node |
| Review | Confirm truth | Schema + security gate |
| Compile | Wait | Run both compilers |
| Brief | Fix voice / claims | Rewrite only the AI node prompt |
| Workflow | See their graph | Show bindings, not generic Amplemarket labels |
| Setup | Wire credentials in n8n | Step list per node |
| Deploy | Own the runtime | Import JSON to their instance |

---

## 7. Example specialization

Intake says: HubSpot CRM, Apollo for people, Smartlead for sequences, Claude for copy, Slack approval, daily CRM ingest.

Compiler does **not** copy Amplemarket nodes. It emits:

1. Cron + HTTP `POST /crm/v3/objects/contacts/search` (HubSpot)
2. Code normalizer
3. HTTP HubSpot search-by-domain (dedupe)
4. HTTP Apollo people/match
5. Anthropic node + **this client's** system prompt
6. IF → Slack
7. HTTP HubSpot upsert
8. HTTP Smartlead campaign add (no native node)
9. Slack alert

`CREDENTIALS.md` then lists HubSpot private app scopes, Apollo key location, Smartlead key location, Anthropic key, Slack webhook — each attached inside the client's n8n, never in PAL.

If intake had said Amplemarket for data + sequence, nodes 04 and 08 would look like the template. That is the only time the template's vendor nodes appear.
