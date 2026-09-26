# PAE Workflow Steps

**Product:** Prospect Automation Engineer — individual compiler
**Status:** Source-of-truth for v1 compile
**Rule:** The Amplemarket + CRM template is a guide. Customize it. Add nodes when a binding needs them. Do not invent a different product.

V1 ships a JSON compiler, the reference template, and a build package. That is the trust path. No hosted send. No black-box runtime.

---

## 0. Prerequisite and deliverable

**User must already have**

- An n8n instance
- An LLM provider
- A data tool

Email / outreach is optional. If they have no sequencer, compile mailbox send (Resend, Gmail, custom API) or drop the enroll node and stop at drafted copy.

**Each paid run returns**

1. Customized n8n `workflow.json` (upload to their instance)
2. n8n Engineer skill that can edit that workflow (instance or template in the backend)
3. Build package: system prompts, tool configs, credential instructions, test checklist

**Each run costs.** Outputs are generated, not stored as a free playground.

---

## 1. Compile order

The compiler builds the graph in this order. Do not skip ahead.

| Step | Compiler action | Runtime nodes produced |
|---|---|---|
| 1 | Gather user input | Instruction pack (not a node) |
| 2 | Create trigger | Schedule search **or** CSV webhook + CRM stage filter + company table |
| 3 | Configure data | HTTP / connector: company enrich + people search → contact table |
| 4 | Configure CRM | HTTP / connector batch create-or-update contacts |
| 5 | Configure research | AI + web search → pain-point hypothesis |
| 6 | Configure messaging | AI → emails 1–7 + LinkedIn DM / InMail / connect notes |
| 7 | Configure sequence | Enroll / add-to-list / mailbox send, mapped to a specific inbox |

After tools are known, the compiler **downloads or searches vendor docs**, then builds each node so it actually runs. Template first. Extra nodes only to make a binding work (auth, pagination, batch, IF, merge).

Then run a **quick test** on the compiled automation before calling the run done.

---

## 2. Step 1 — Gather user input

Collect once. This pack feeds every later step.

| Field | Used by |
|---|---|
| Company background | Research + email system prompts |
| Product / offer / proof / banned claims | Research hypothesis + email claims |
| ICP (firmographics, signals, disqualifiers) | Trigger search + data filters |
| Persona (titles, departments, language) | Data people search + email voice |
| Tools (CRM, data, LLM, outreach, n8n URL) | Node types, HTTP URLs, credential plan |
| Volume (companies / day, contacts / company) | Trigger + data limits |
| Approval / send policy | IF gate before enroll or send |

Never ask for API key values here. Record provider + access level only.

---

## 3. Step 2 — Create trigger node

Two trigger families. Compile one primary path per run. Both write a **company table**.

### A. Data Search Trigger

1. Daily schedule.
2. HTTP / connector search on the data tool using the ICP + signals (tech, hiring, keywords).
3. Cap the company count.
4. CRM check: drop companies already in **deal, opportunity, or prospect** stages.
5. Write survivors to the company table (`name`, `domain`, `url`, `linkedin_url` if present).

### B. Webhook / CSV Trigger

1. Webhook fires when the user uploads a CSV of companies.
2. Normalize schema to the same company table.
3. Optional same CRM stage filter.
4. Write to the company table.

---

## 4. Step 3 — Configure data node

Input: company table. Output: **contact table**.

1. Map `company_name`, `url`, `linkedin_url` into an HTTP Request (or native n8n connector).
2. Company enrich GET/POST if the vendor supports it.
3. People search: company name + URL as the account key.
4. JSON filters from intake: departments, titles, signals (technology, job posts, LinkedIn keywords).
5. Hard limit: N contacts per company.
6. Write contacts: name, title, email, phone, linkedin, company keys.

Vendor docs decide the exact path and filter JSON. Apollo ≠ Clay ≠ Amplemarket ≠ ZoomInfo. Same capability, different payload.

---

## 5. Step 4 — Configure CRM node

Input: contact table. Output: CRM ids written back onto the row.

- Batch create or update via HTTP API or native n8n integration.
- Match on email or domain + name.
- Attach source, persona, and later research notes when present.
- Do not enroll from this node.

CRM is also used earlier in the **trigger filter**. That is a read. This step is the write.

---

## 6. Step 5 — Configure research nodes

Input: company + contact. Output: research object + **pain-point hypothesis**.

- AI node + web search tool.
- System prompt compiled from company, product, ICP, persona.
- Pull extra datapoints: company, products, team, news, stack.
- Draft how the user’s product can help this prospect (value proposition).
- Structured output, not prose-only.

This is a separate node from email. Do not collapse research and copy.

---

## 7. Step 6 — Configure messaging nodes

Input: contact + research/hypothesis. Output: campaign copy.

Compile system instructions for this AI node from the same intake.

Produce:

- Emails **1–7**: subject + body
- LinkedIn: connection note, DM, InMail

Implementation: **one node per email** or **one node that returns JSON** for the full set. Prefer JSON for v1 (cheaper, easier to test). Split nodes only if the sequencer cannot take a JSON map.

No send in this step. Copy only.

---

## 8. Step 7 — Configure sequence enrollment

Input: contact + **email body** (and LinkedIn copy if the tool accepts it). Output: enrolled or sent.

Bind one of:

- Enroll in sequence
- Add to list that enrolls a workflow
- Enroll in workflow / sequence automatically
- Mailbox send: Resend, Gmail, custom MCP/API

Map: contact identity + email body + **specific user inbox**.
Do not invent a second CRM write here.

If no outreach tool: keep copy, attach mailbox send, or stop after step 6.

---

## 9. What the compiler must know

| Need | Why |
|---|---|
| System instructions for every AI node | Research and email are different jobs |
| Tool configurations | HTTP method, path, filter JSON, pagination |
| LLM provider connection | All AI nodes |
| Vendor documentation | Build nodes that run, not guessed URLs |
| Final output structure | JSON contracts for tables and copy |
| Send **or** enroll + mailbox | Step 7 |
| Credential instructions | User attaches keys in n8n |
| Quick test | Prove the graph before handoff |

Optional later: Composio CLI so the compiled graph can land directly on their canvas. Not required for v1 trust.

---

## 10. Supported adapters (v1 registry)

Use HTTP Request unless a native n8n node is complete for the operation.

**CRM:** HubSpot, Salesforce, Zoho, Pipedrive, Attio

**LLM:** Anthropic, OpenAI, Azure, AWS Bedrock, OpenRouter, Gemini

**Outreach:** HubSpot Sales, Salesforce, Amplemarket, Clay, Instantly, Zoho, Attio, Resend / Gmail / custom API

**Data:** Clay, Amplemarket, ZoomInfo, Apollo, Reply.io

Unknown tool: fetch docs, then bind. If docs are missing, status = `needs-clarification`. Do not fake the node.

---

## 11. Final output structure

```text
company_table:     { name, domain, url, linkedin_url, crm_stage, source }
contact_table:     { name, title, email, phone, linkedin, company_domain, crm_id }
research_object:   { datapoints[], pain_hypothesis, value_prop }
campaign_copy:     { emails[1-7]{subject, body}, linkedin{connect, dm, inmail} }
enroll_receipt:    { tool, sequence_or_list, inbox, status }   // if step 7 on
```

Build package per run:

```text
workflow.json
n8n-engineer.SKILL.md
ai/research.system_prompt.md
ai/email.system_prompt.md
CREDENTIALS.md
TEST.md
ack.json
```

---

## 12. Quick test (required before done)

1. Dry-run trigger with `limit=1` company.
2. Assert company table row + CRM filter did not drop a clean account incorrectly.
3. Assert ≥1 contact with email or a typed skip reason.
4. Assert CRM upsert returned an id or a typed skip.
5. Assert research JSON has `pain_hypothesis`.
6. Assert email 1 has subject + body.
7. Sequence / send is **off** in test unless the user explicitly arms it.

Fail any of these → do not ship the JSON as successful. Return the node error + a patch plan.

---

## 13. v1 trust cut

Ship only:

1. JSON compiler that customizes the template
2. Reference template
3. Build package (prompts, configs, credential instructions, engineer skill)

Do not host outbound. Do not require Composio canvas push in v1.

---

## 14. GTM search target (separate from the product)

When using this engine on our own behalf: Clay search for companies using n8n, small sales team, hiring GTM engineers.
