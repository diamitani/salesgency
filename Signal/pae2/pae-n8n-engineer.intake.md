# PAE n8n Engineer — Intake

Ask only what is missing. Do not ask for API keys.

## Required

| ID | Question | Maps to |
|---|---|---|
| company | What does the company do, and in one line why does it exist? | Research + email prompts |
| product | What is sold? Motion, proof, claims you will not make? | Hypothesis + email |
| icp | Ideal company: size, industry, geo, tech, hiring/funding signals, disqualifiers? | Trigger search + data filters |
| persona | Titles and departments? What language do they use? | People search + email |
| data_tool | Clay, Apollo, ZoomInfo, Amplemarket, Reply.io, other? | Data HTTP nodes |
| llm | Anthropic, OpenAI, Azure, Bedrock, OpenRouter, Gemini? | AI nodes |
| trigger | Daily ICP search, or CSV/webhook upload? | Trigger family |
| volume | Companies per run? Max contacts per company? | Limits |
| send_policy | Draft only, Slack/email approve, or arm enroll? Default draft. | Sequence node inactive unless armed |

## Optional

| ID | Question | Default |
|---|---|---|
| crm | HubSpot, Salesforce, Zoho, Pipedrive, Attio, none? | none (skip upsert + skip stage filter) |
| outreach | Instantly, Amplemarket, HubSpot Sales, Clay, Zoho, Attio, Resend, Gmail, none? | omit enroll |
| inbox | Which mailbox / user should send? | first connected inbox, flagged |
| n8n | Cloud or self-host? (for CREDENTIALS.md wording only) | either |

## Refusal rule

If they will not name a data tool or LLM, stop. Those are prerequisites.

If they name an unknown tool, fetch official docs. If none, bind HTTP Request with `PLACEHOLDER_URL` and set `needs-docs`.
