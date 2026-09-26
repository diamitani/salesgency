---
name: n8n-execution-analyst--daily-email-report
description: Process/Note derived from n8n Execution Analyst — Daily Email Report.json
source_path: n8n Execution Analyst — Daily Email Report.json
---

# n8n Execution Analyst — Daily Email Report.json

## Context
This skill provides knowledge, processes, and instructions derived from the document: `n8n Execution Analyst — Daily Email Report.json`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

{
  "name": "n8n Execution Analyst — Daily Email Report",
  "nodes": [
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "cronExpression",
              "expression": "0 0 6 * * *"
            }
          ]
        }
      },
      "id": "schedule_trigger",
      "name": "Schedule Trigger",
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1.2,
      "position": [
        0,
        304
      ]
    },
    {
      "parameters": {
        "url": "https://atlas-hxm.app.n8n.cloud/api/v1/workflows",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "n8nApi",
        "sendQuery": true,
        "queryParameters": {
          "parameters": [
            {
              "name": "limit",
              "value": "250"
            }
          ]
        },
        "options": {}
      },
      "id": "get_workflows",
      "name": "Get Workflows",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        240,
        304
      ],
      "credentials": {
        "httpHeaderAuth": {
          "id": "MlgHvaBSEEdo05bw",
          "name": "Hubspot Header Auther"
        },
        "n8nApi": {
          "id": "ECqrfHoxXszJwcr1",
          "name": "n8n account"
        }
      }
    },
    {
      "parameters": {
        "url": "https://atlas-hxm.app.n8n.cloud/api/v1/executions",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "n8nApi",
        "sendQuery": true,
        "queryParameters": {
          "parameters": [
            {
              "name": "limit",
              "value": "250"
            }
          ]
        },
        "options": {}
      },
      "id": "get_executions",
      "name": "Get Executions",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        480,
        304
      ],
      "credentials": {
        "httpHeaderAuth": {
          "id": "MlgHvaBSEEdo05bw",
          "name": "Hubspot Header Auther"
        },
        "n8nApi": {
          "id": "ECqrfHoxXszJwcr1",
          "name": "n8n account"
        }
      }
    },
    {
      "parameters": {
        "jsCode": "\n// Grounded aggregation over the n8n API responses. No fabricated data.\nconst execResp = $input.first().json;\nconst execs = execResp.data || [];\nconst wfResp = $('Get Workflows').first().json;\nconst wfs = wfResp.data || [];\nconst wfName = {};\nfor (const w of wfs) wfName[w.id] = w.name;\n\nconst total = execs.length;\nconst success = execs.filter(e => e.status === 'success').length;\nconst error = execs.filter(e => e.status === 'error').length;\nconst rate = total ? (success / total * 100).toFixed(1) : '0';\n\n// per-workflow rollup\nconst roll = {};\nfor (const e of execs) {\n  const k = e.workflowId;\n  roll[k] = roll[k] || {name: wfName[k] || k, total: 0, error: 0};\n  roll[k].total++; if (e.status === 'error') roll[k].error++;\n}\nconst failing = Object.values(roll).filter(r => r.error > 0).sort((a,b)=>b.error-a.error);\n\n// recent failures (list-level detail)\nconst recentFails = execs.filter(e => e.status === 'error')\n  .sort((a,b)=> (b.startedAt||'').localeCompare(a.startedAt||''))\n  .slice(0, 25)\n  .map(e => ({id: e.id, wf: wfName[e.workflowId] || e.workflowId, at: (e.startedAt||'').slice(0,19)}));\n\nconst today = new Date().toISOString().slice(0,10);\nconst rowsHtml = failing.map(r =>\n  `<tr><td style=\"padding:6px 10px;border:1px solid #E3E8EF\">${r.name}</td>\n   <td style=\"padding:6px 10px;border:1px solid #E3E8EF;text-align:center\">${r.total}</td>\n   <td style=\"padding:6px 10px;border:1px solid #E3E8EF;text-align:center;color:#E5484D;font-weight:700\">${r.error}</td></tr>`\n).join('');\nconst failsHtml = recentFails.map(f =>\n  `<tr><td style=\"padding:5px 10px;border:1px solid #E3E8EF\">${f.id}</td>\n   <td style=\"padding:5px 10px;border:1px solid #E3E8EF\">${f.wf}</td>\n   <td style=\"padding:5px 10px;border:1px solid #E3E8EF\">${f.at}</td></tr>`\n).join('');\n\nconst bodyHtml = `\n<div style=\"font-family:Arial,Helvetica,sans-serif;color:#0B1F3A;max-width:720px\">\n  <div style=\"background:#0B1F3A;color:#fff;padding:18px 22px;border-radius:10px 10px 0 0\">\n    <h2 style=\"margin:0;font-size:18px\">n8n Execution Analyst — Daily Report</h2>\n    <div style=\"opacity:.8;font-size:12px;margin-top:4px\">Atlas HXM · ${today} · atlas-hxm.app.n8n.cloud</div>\n  </div>\n  <div style=\"border:1px solid #E3E8EF;border-top:none;padding:20px 22px;border-radius:0 0 10px 10px\">\n    <table style=\"width:100%;border-collapse:collapse;margin-bottom:18px\">\n      <tr>\n        <td style=\"text-align:center\"><div style=\"font-size:26px;font-weight:700\">${total}</div><div style=\"font-size:12px;color:#5B6B7F\">Total runs</div></td>\n        <td style=\"text-align:center\"><div style=\"font-size:26px;font-weight:700;color:#1BA672\">${success}</div><div style=\"font-size:12px;color:#5B6B7F\">Success</div></td>\n        <td style=\"text-align:center\"><div style=\"font-size:26px;font-weight:700;color:#E5484D\">${error}</div><div style=\"font-size:12px;color:#5B6B7F\">Errors</div></td>\n        <td style=\"text-align:center\"><div style=\"font-size:26px;font-weight:700\">${rate}%</div><div style=\"font-size:12px;color:#5B6B7F\">Success rate</div></td>\n      </tr>\n    </table>\n    ${failing.length ? `<h3 style=\"font-size:14px;color:#5B6B7F;text-transform:uppercase\">Workflows with failures</h3>\n    <table style=\"width:100%;border-collapse:collapse;font-size:13px;margin-bottom:18px\">\n      <tr style=\"background:#F6F8FB\"><th style=\"padding:6px 10px;border:1px solid #E3E8EF;text-align:left\">Workflow</th><th style=\"padding:6px 10px;border:1px solid #E3E8EF\">Runs</th><th style=\"padding:6px 10px;border:1px solid #E3E8EF\">Errors</th></tr>\n      ${rowsHtml}\n    </table>\n    <h3 style=\"font-size:14px;color:#5B6B7F;text-transform:uppercase\">Recent failed executions</h3>\n    <table style=\"width:100%;border-collapse:collapse;font-size:12px\">\n      <tr style=\"background:#F6F8FB\"><th style=\"padding:5px 10px;border:1px solid #E3E8EF;text-align:left\">Exec ID</th><th style=\"padding:5px 10px;border:1px solid #E3E8EF;text-align:left\">Workflow</th><th style=\"padding:5px 10px;border:1px solid #E3E8EF;text-align:left\">Started (UTC)</th></tr>\n      ${failsHtml}\n    </table>` : '<p style=\"color:#1BA672;font-weight:700\">✅ All workflows healthy — no failures in the latest batch.</p>'}\n    <p style=\"font-size:11px;color:#7C8AA0;margin-top:20px\">Automated by the n8n Execution Analyst. Data pulled live from the n8n Public API — no values are estimated.</p>\n  </div>\n</div>`;\n\nconst subject = `n8n Daily Report — ${success}/${total} success (${rate}%)${error?` · ${error} errors`:''} · ${today}`;\nreturn [{ json: { subject, bodyHtml, total, success, error, rate } }];\n"
      },
      "id": "analyze",
      "name": "Analyze",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        720,
        304
      ]
    },
    {
      "parameters": {
        "toRecipients": "pdiamitani@atlashxm.com, nickm@atlashxm.com, bruno@atlashxm.com",
        "subject": "=TEST - {{ $('Analyze').item.json.subject }}",
        "bodyContent": "={{ $('Analyze').item.json.bodyHtml }}\n\n{{ $json.output }}",
        "additionalFields": {
          "bodyContentType": "html"
        }
      },
      "id": "send_report",
      "name": "Send Report",
      "type": "n8n-nodes-base.microsoftOutlook",
      "typeVersion": 2,
      "position": [
        1264,
        304
      ],
      "webhookId": "373d9059-fb6a-403a-a8e2-86f882a2c409",
      "retryOnFail": true,
      "credentials": {
        "microsoftOutlookOAuth2Api": {
          "id": "ctizexFzQop7Y1XP",
          "name": "pdiamitani@atlashxm.com"
        }
      }
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "={{ $json.subject }} {{ $json.bodyHtml }} {{ $json.total }} {{ $json.success }} {{ $json.error }}{{ $json.rate }}{{ $('Get Executions').item.json.data }}{{ $('Get Workflows').item.json.data }}\n\nanalyze the above executitions. see what happenedand create a markedown break down report of everything that has happened, add it to a word doc and then create a summaryy of the executions for ELT and board to read",
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 3,
      "position": [
        928,
        304
      ],
      "id": "d1a564d4-a946-45e7-b126-04a8d9fc3bf3",
      "name": "AI Agent"
    },
    {
      "parameters": {
        "model": "gpt-4o-mini",
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.lmChatAzureOpenAi",
      "typeVersion": 1,
      "position": [
        800,
        512
      ],
      "id": "3059f2ea-48b1-4d90-8c19-c683693161d7",
      "name": "Azure OpenAI Chat Model",
      "credentials": {
        "azureOpenAiApi": {
          "id": "wPtjoDFwCbv9eRl4",
          "name": "gpt-4o-mini"
        }
      }
    }
  ],
  "pinData": {},
  "connections": {
    "Schedule Trigger": {
      "main": [
        [
          {
            "node": "Get Workflows",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get Workflows": {
      "main": [
        [
          {
            "node": "Get Executions",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get Executions": {
      "main": [
        [
          {
            "node": "Analyze",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Analyze": {
      "main": [
        [
          {
            "node": "AI Agent",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "AI Agent": {
      "main": [
        [
          {
            "node": "Send Report",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Azure OpenAI Chat Model": {
      "ai_languageModel": [
        [
          {
            "node": "AI Agent",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": true,
  "settings": {
    "executionOrder": "v1",
    "callerPolicy": "workflowsFromSameOwner",
    "availableInMCP": false
  },
  "versionId": "88369b37-71dd-4e89-b1c7-d23371805625",
  "meta": {
    "templateCredsSetupCompleted": true,
    "instanceId": "da98df5c5d7ca09b34ad4f795244e87a7663d8722c18682c2021c70624938526"
  },
  "id": "UDjRpdj3u6EDTy8X",
  "tags": []
}
