---
name: intakesample
description: Process/Note derived from intake.sample.json
source_path: pae2/intake.sample.json
---

# intake.sample.json

## Context
This skill provides knowledge, processes, and instructions derived from the document: `intake.sample.json`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

{
  "company": {
    "name": "SalesGency",
    "background": "Builds custom prospect automation engines for B2B teams.",
    "website": "https://salesgency.com"
  },
  "product": {
    "offer": "Prospect Automation Engineer: compiled n8n outbound engine plus operator skills",
    "proof": ["Live in weeks", "Client owns the n8n graph"],
    "banned_claims": ["Guaranteed meetings", "We send from our domain"]
  },
  "icp": {
    "industries": ["B2B SaaS"],
    "headcount_min": 15,
    "headcount_max": 80,
    "locations": ["United States"],
    "signals": ["uses n8n", "hiring GTM engineer", "small sales team"],
    "disqualifiers": ["no CRM", "agency resellers"]
  },
  "persona": {
    "titles": ["Head of Growth", "VP Sales", "GTM Engineer"],
    "departments": ["Sales", "Revenue", "Growth"],
    "language": "direct, operator-to-operator"
  },
  "data_tool": "amplemarket",
  "crm": "hubspot",
  "llm": "anthropic",
  "outreach": {
    "mode": "sequence",
    "tool": "amplemarket",
    "sequence_id": "SEQUENCE_ID",
    "inbox": "rep@client.com"
  },
  "trigger": { "type": "search" },
  "volume": { "companies_per_run": 1, "contacts_per_company": 3 },
  "send_policy": "draft"
}
