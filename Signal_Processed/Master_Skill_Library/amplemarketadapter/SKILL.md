---
name: amplemarketadapter
description: Process/Note derived from amplemarket.adapter.json
source_path: pae2/amplemarket.adapter.json
---

# amplemarket.adapter.json

## Context
This skill provides knowledge, processes, and instructions derived from the document: `amplemarket.adapter.json`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

{
  "adapter_id": "amplemarket",
  "version": "1.0.0",
  "vendor": "Amplemarket",
  "capabilities": [
    "data.find_companies",
    "data.find_contacts",
    "data.get_email",
    "sequence.enroll"
  ],
  "docs": [
    "Use official Amplemarket API docs at compile time. people/search is the reference path from the SalesGency template."
  ],
  "auth": {
    "n8n_credential_type": "httpBearerAuth",
    "authentication": "genericCredentialType",
    "genericAuthType": "httpBearerAuth",
    "scopes": ["people.search", "people.read", "sequences.enroll"],
    "setup": [
      "Amplemarket → Settings → API (or admin) → create a personal API token.",
      "In n8n: Credentials → Header Auth / HTTP Bearer Auth named `Amplemarket API`.",
      "Attach it to Data — Find Companies, Data — Find Contacts, Data — Get Email, Sequence — Enroll.",
      "Never put `Authorization: Bearer …` in the node header. The leaked pattern in the old template is forbidden."
    ]
  },
  "bindings": {
    "data.find_companies": {
      "target_node": "Data — Find Companies",
      "method": "POST",
      "url": "https://api.amplemarket.com/people/search",
      "note": "Company discovery via people search + unique company_names. Compiler may swap to a companies endpoint if docs provide one.",
      "body": {
        "person_departments": "{{compiled.persona.departments}}",
        "person_titles": "{{compiled.persona.titles}}",
        "person_locations": "{{compiled.icp.locations}}",
        "company_keywords": "{{compiled.icp.signals}}",
        "page_size": "={{ $json.company_limit || 1 }}",
        "page": 1
      },
      "pagination": {
        "completeExpression": "={{ ($response.body.results?.length || 0) < $request.body.page_size }}",
        "pageParam": "page"
      }
    },
    "data.find_contacts": {
      "target_node": "Data — Find Contacts",
      "method": "POST",
      "url": "https://api.amplemarket.com/people/search",
      "body": {
        "person_departments": "{{compiled.persona.departments}}",
        "person_titles": "{{compiled.persona.titles}}",
        "person_locations": "{{compiled.icp.locations}}",
        "company_names": ["={{ $json.company_name }}"],
        "page_size": "={{ $json.contacts_per_company || 3 }}",
        "page": 1
      },
      "pagination": {
        "completeExpression": "={{ ($response.body.results?.length || 0) < $request.body.page_size }}",
        "pageParam": "page"
      }
    },
    "data.get_email": {
      "target_node": "Data — Get Email",
      "method": "GET",
      "url": "={{ $json.ample_url }}",
      "skip_if": "={{ !$json.ample_url }}"
    },
    "sequence.enroll": {
      "target_node": "Sequence — Enroll",
      "method": "POST",
      "url": "https://api.amplemarket.com/sequences/{{compiled.sequence_id}}/leads",
      "needs_docs": true,
      "disabled_until_armed": true,
      "body": {
        "email": "={{ $json.work_email }}",
        "first_name": "={{ $json.first_name }}",
        "last_name": "={{ $json.last_name }}",
        "company": "={{ $json.company_name }}",
        "linkedin_url": "={{ $json.linkedin_url }}",
        "mailbox": "{{compiled.inbox}}",
        "custom_email_body": "={{ $json.emails?.[0]?.body }}"
      }
    }
  },
  "compiler": {
    "replace": {
      "https://pae.local/replace/data-find-companies": "https://api.amplemarket.com/people/search",
      "https://pae.local/replace/data-find-contacts": "https://api.amplemarket.com/people/search",
      "https://pae.local/replace/data-get-email": "={{ $json.ample_url }}",
      "https://pae.local/replace/sequence-enroll": "https://api.amplemarket.com/sequences/{{compiled.sequence_id}}/leads"
    },
    "set_node_auth": {
      "Data — Find Companies": {
        "authentication": "genericCredentialType",
        "genericAuthType": "httpBearerAuth"
      },
      "Data — Find Contacts": {
        "authentication": "genericCredentialType",
        "genericAuthType": "httpBearerAuth"
      },
      "Data — Get Email": {
        "authentication": "genericCredentialType",
        "genericAuthType": "httpBearerAuth"
      },
      "Sequence — Enroll": {
        "authentication": "genericCredentialType",
        "genericAuthType": "httpBearerAuth"
      }
    },
    "set_json_body": {
      "Data — Find Companies": "bindings.data.find_companies.body",
      "Data — Find Contacts": "bindings.data.find_contacts.body",
      "Sequence — Enroll": "bindings.sequence.enroll.body"
    },
    "keep_disabled": ["Sequence — Enroll"]
  }
}
