---
name: n8nfactorstoclaywebhook
description: Process/Note derived from n8n_Factors_to_Clay_Webhook.json
source_path: n8n_Factors_to_Clay_Webhook.json
---

# n8n_Factors_to_Clay_Webhook.json

## Context
This skill provides knowledge, processes, and instructions derived from the document: `n8n_Factors_to_Clay_Webhook.json`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

{
  "name": "Factors.ai → Clay Enrichment Webhook",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "factors-to-clay",
        "responseMode": "responseNode",
        "options": {
          "rawBody": false
        }
      },
      "id": "a1b2c3d4-0001-0001-0001-000000000001",
      "name": "📡 Factors Webhook Trigger",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2,
      "position": [240, 300],
      "webhookId": "factors-clay-atlas-hxm"
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "f1",
              "name": "company_name",
              "value": "={{ $json.account?.name || $json.company?.name || $json.properties?.company_name || '' }}",
              "type": "string"
            },
            {
              "id": "f2",
              "name": "company_domain",
              "value": "={{ $json.account?.domain || $json.company?.domain || $json.properties?.domain || '' }}",
              "type": "string"
            },
            {
              "id": "f3",
              "name": "first_name",
              "value": "={{ $json.contact?.first_name || $json.person?.firstName || '' }}",
              "type": "string"
            },
            {
              "id": "f4",
              "name": "last_name",
              "value": "={{ $json.contact?.last_name || $json.person?.lastName || '' }}",
              "type": "string"
            },
            {
              "id": "f5",
              "name": "linkedin_url",
              "value": "={{ $json.contact?.linkedin_url || $json.person?.linkedinUrl || '' }}",
              "type": "string"
            },
            {
              "id": "f6",
              "name": "email",
              "value": "={{ $json.contact?.email || $json.person?.email || '' }}",
              "type": "string"
            },
            {
              "id": "f7",
              "name": "phone",
              "value": "={{ $json.contact?.phone || $json.person?.phone || '' }}",
              "type": "string"
            },
            {
              "id": "f8",
              "name": "signal_type",
              "value": "={{ $json.signal?.type || $json.event?.name || $json.trigger || 'factors_signal' }}",
              "type": "string"
            },
            {
              "id": "f9",
              "name": "signal_date",
              "value": "={{ $json.signal?.timestamp || $json.event?.timestamp || $json.created_at || new Date().toISOString() }}",
              "type": "string"
            },
            {
              "id": "f10",
              "name": "hs_company_id",
              "value": "={{ $json.account?.hubspot_company_id || $json.crm?.hubspot_company_id || '' }}",
              "type": "string"
            },
            {
              "id": "f11",
              "name": "hs_contact_id",
              "value": "={{ $json.contact?.hubspot_contact_id || $json.crm?.hubspot_contact_id || '' }}",
              "type": "string"
            },
            {
              "id": "f12",
              "name": "source",
              "value": "factors_ai",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "a1b2c3d4-0001-0001-0001-000000000002",
      "name": "🗺️ Map Factors Fields → Clay Format",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [460, 300]
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict"
          },
          "conditions": [
            {
              "id": "gate1",
              "leftValue": "={{ $json.company_domain }}",
              "rightValue": "",
              "operator": {
                "type": "string",
                "operation": "notEmpty"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "id": "a1b2c3d4-0001-0001-0001-000000000003",
      "name": "🔍 Has Domain? (Required for Clay)",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2,
      "position": [680, 300]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "=https://api.clay.com/v1/webhooks/YOUR_CLAY_WEBHOOK_ID",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Content-Type",
              "value": "application/json"
            },
            {
              "name": "Authorization",
              "value": "Bearer d2f7d5ee6818f9454583"
            }
          ]
        },
        "sendBody": true,
        "contentType": "json",
        "body": {
          "company_name": "={{ $json.company_name }}",
          "company_domain": "={{ $json.company_domain }}",
          "first_name": "={{ $json.first_name }}",
          "last_name": "={{ $json.last_name }}",
          "linkedin_url": "={{ $json.linkedin_url }}",
          "email": "={{ $json.email }}",
          "phone": "={{ $json.phone }}",
          "signal_type": "={{ $json.signal_type }}",
          "signal_date": "={{ $json.signal_date }}",
          "hs_company_id": "={{ $json.hs_company_id }}",
          "hs_contact_id": "={{ $json.hs_contact_id }}",
          "source": "={{ $json.source }}"
        },
        "options": {
          "timeout": 10000
        }
      },
      "id": "a1b2c3d4-0001-0001-0001-000000000004",
      "name": "🏺 POST to Clay Webhook",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [900, 220]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://slack.com/api/chat.postMessage",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Authorization",
              "value": "Bearer YOUR_SLACK_BOT_TOKEN"
            },
            {
              "name": "Content-Type",
              "value": "application/json"
            }
          ]
        },
        "sendBody": true,
        "contentType": "json",
        "body": {
          "channel": "#gtm-ai",
          "text": "=⚠️ Factors signal dropped — missing domain.\n*Company:* {{ $json.company_name }}\n*Signal:* {{ $json.signal_type }}\nRecord not sent to Clay."
        },
        "options": {}
      },
      "id": "a1b2c3d4-0001-0001-0001-000000000005",
      "name": "⚠️ Alert: Missing Domain (Slack)",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [900, 420]
    },
    {
      "parameters": {
        "respondWith": "json",
        "responseBody": "={{ JSON.stringify({ status: 'ok', message: 'Signal received and queued in Clay', company: $('🗺️ Map Factors Fields → Clay Format').item.json.company_name, signal: $('🗺️ Map Factors Fields → Clay Format').item.json.signal_type, timestamp: new Date().toISOString() }) }}",
        "options": {
          "responseCode": 200,
          "responseHeaders": {
            "entries": [
              {
                "name": "Content-Type",
                "value": "application/json"
              }
            ]
          }
        }
      },
      "id": "a1b2c3d4-0001-0001-0001-000000000006",
      "name": "✅ Respond 200 to Factors",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1.1,
      "position": [1120, 220]
    }
  ],
  "connections": {
    "📡 Factors Webhook Trigger": {
      "main": [
        [
          {
            "node": "🗺️ Map Factors Fields → Clay Format",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "🗺️ Map Factors Fields → Clay Format": {
      "main": [
        [
          {
            "node": "🔍 Has Domain? (Required for Clay)",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "🔍 Has Domain? (Required for Clay)": {
      "main": [
        [
          {
            "node": "🏺 POST to Clay Webhook",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "⚠️ Alert: Missing Domain (Slack)",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "🏺 POST to Clay Webhook": {
      "main": [
        [
          {
            "node": "✅ Respond 200 to Factors",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "settings": {
    "executionOrder": "v1",
    "saveManualExecutions": true,
    "callerPolicy": "workflowsFromSameOwner",
    "errorWorkflow": ""
  },
  "staticData": null,
  "tags": ["clay", "factors", "atlas-hxm", "gtm"],
  "meta": {
    "templateCreatedBy": "Patrick Diamitani — Atlas HXM GTM AI & Automation",
    "templateDescription": "Receives Factors.ai account signals via webhook, maps fields to Clay format, posts to Clay Webhook Enrichment table. Drops missing-domain records to Slack with an alert.",
    "version": "1.0.0",
    "createdAt": "2026-06-22",
    "_SETUP_INSTRUCTIONS": {
      "step1": "Import this JSON into n8n: Workflows → Import from file",
      "step2": "Activate the webhook: open '📡 Factors Webhook Trigger' node → copy the Production Webhook URL",
      "step3": "Replace YOUR_CLAY_WEBHOOK_ID in '🏺 POST to Clay Webhook' with your Clay table's webhook ID (Clay table → Settings → Webhook URL → copy the ID from the URL)",
      "step4": "Paste the n8n webhook URL into Factors.ai: Settings → Destinations → New Webhook",
      "step5": "(Optional) Replace YOUR_SLACK_BOT_TOKEN with your Slack bot token for missing-domain alerts",
      "step6": "Activate the workflow in n8n"
    }
  }
}
