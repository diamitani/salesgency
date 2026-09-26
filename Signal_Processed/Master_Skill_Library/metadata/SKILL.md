---
name: metadata
description: Process/Note derived from metadata.json
source_path: pop-skill-main/metadata.json
---

# metadata.json

## Context
This skill provides knowledge, processes, and instructions derived from the document: `metadata.json`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

{
  "name": "pop",
  "full_name": "pop-skill",
  "category": "03-gtm-sales",
  "description": "pop",
  "source_file": "pop.md",
  "created": "2026-08-28T17:21:19.845574",
  "author": "diamitani",
  "tags": [
    "03_gtm_sales",
    "ai_skill",
    "agent_framework"
  ],
  "framework": {
    "type": "SKILL.md",
    "compliance": "PAL v2.0",
    "intake_required": true,
    "mcp_ready": false
  },
  "placeholders": {
    "{{COMPANY_NAME}}": "Replace with your company name",
    "{{COMPANY_SLUG}}": "Replace with company URL slug",
    "{{USER_HOME}}": "User home directory path",
    "{{N8N_INSTANCE_URL}}": "Your n8n instance URL",
    "{{HUBSPOT_PORTAL_ID}}": "HubSpot portal ID",
    "{{ADMIN_EMAIL}}": "Admin email address",
    "{{MEETINGS_URL}}": "Calendar meetings URL"
  }
}
