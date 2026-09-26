---
name: entity-readiness-change-report--weekly
description: Process/Note derived from Entity Readiness Change Report — Weekly.json
source_path: Atlas Portfolio/Entity Readiness Change Report — Weekly.json
---

# Entity Readiness Change Report — Weekly.json

## Context
This skill provides knowledge, processes, and instructions derived from the document: `Entity Readiness Change Report — Weekly.json`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

{
  "name": "Entity Readiness Change Report — Weekly",
  "nodes": [
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "weeks",
              "triggerAtDay": [
                1
              ],
              "triggerAtHour": 7
            }
          ]
        }
      },
      "id": "e6dd8a90-c5fd-4147-9378-3b88e9c502ec",
      "name": "Weekly Trigger (Mon 07:00)",
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1.2,
      "position": [
        1072,
        -416
      ]
    },
    {
      "parameters": {
        "jsCode": "// PLACEHOLDER — replace this node with your existing \"Onspring - Get Country Entity Readiness\" node\n// (or an Execute Workflow node that calls the existing Onspring pull). It must output one item\n// per country with at least: { country, status }. Sample data below lets you test the flow now.\nreturn [\n  { json: { country: \"France\",  status: \"Ready to hire all\" } },\n  { json: { country: \"Kenya\",   status: \"Ready to hire all\" } },\n  { json: { country: \"Brazil\",  status: \"Ready to hire locals\" } },\n  { json: { country: \"Germany\", status: \"Closed\" } },\n  { json: { country: \"Japan\",   status: \"Ready to hire all\" } }\n];"
      },
      "id": "1ab95c8e-5ea2-4769-9ea8-e46881d5268d",
      "name": "Onspring - Get Country Entity Readiness",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        1296,
        -416
      ],
      "notes": "Swap for the real Onspring pull node. Must emit {country,status} per country. On the REAL pull node set alwaysOutputData=true so an empty pull reaches Normalize and fails loudly (baseline stays safe either way)."
    },
    {
      "parameters": {
        "jsCode": "// Normalize each Onspring row to a ready boolean.\n// ready = true ONLY for the two exact statuses below. Everything else = false.\n// Aborts the run on an empty/unusable pull so last week's baseline is NEVER overwritten.\nconst READY = [\"Ready to hire locals\", \"Ready to hire all\"];\nconst rows = $input.all();\nif (!rows.length) {\n  throw new Error(\"Onspring pull returned 0 rows — aborting so last week's baseline is preserved.\");\n}\nconst out = [];\nfor (const item of rows) {\n  const j = item.json || {};\n  const country = (j.country ?? j.Country ?? j.Entity ?? \"\").toString().trim();\n  if (!country) continue;\n  const status = (j.status ?? j.Status ?? j.readiness ?? j.Readiness ?? \"\").toString().trim();\n  out.push({ json: { country, status, ready: READY.includes(status) } });\n}\nif (!out.length) {\n  throw new Error(\"Pull had rows but no usable 'country' field — aborting to preserve baseline.\");\n}\nreturn out;"
      },
      "id": "2141b05f-359d-4a00-b892-ed4fee187e09",
      "name": "Normalize Readiness",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        1520,
        -416
      ]
    },
    {
      "parameters": {
        "operation": "get",
        "dataTableId": {
          "__rl": true,
          "value": "DWg0YxdKbQcNcwtv",
          "mode": "list",
          "cachedResultName": "entity_readiness_baseline"
        },
        "filters": {
          "conditions": []
        },
        "returnAll": true
      },
      "id": "0bb23533-40e9-4983-bea0-14939c15d539",
      "name": "Read Baseline (Data Table)",
      "type": "n8n-nodes-base.dataTable",
      "typeVersion": 1,
      "position": [
        1744,
        -416
      ],
      "alwaysOutputData": true,
      "executeOnce": true,
      "notes": "Data Table = source of truth. Table: entity_readiness_baseline (country, ready, status, updated_at). alwaysOutputData=true so first run (empty table) still fires Diff and seeds."
    },
    {
      "parameters": {
        "jsCode": "// Compare this week's ready boolean to last week's saved baseline.\n// false -> true = \"Now able to hire\"; true -> false = \"No longer able to hire\".\n// No change = dropped. Countries with no prior row (new/untracked) = seeded, not reported.\nfunction coerceBool(v){\n  if (typeof v === \"boolean\") return v;\n  if (typeof v === \"number\") return v === 1;\n  return String(v).trim().toLowerCase() === \"true\";\n}\nconst current = $('Normalize Readiness').all().map(i => i.json);\nconst prior   = $('Read Baseline (Data Table)').all().map(i => i.json);\n\nconst priorMap = new Map();\nprior.forEach(p => {\n  const c = (p.country ?? p.Country ?? \"\").toString().trim();\n  if (c) priorMap.set(c, coerceBool(p.ready ?? p.Ready));\n});\nconst hadBaseline = priorMap.size > 0;\n\nconst changes = [];\nfor (const c of current) {\n  if (!priorMap.has(c.country)) continue;      // new country -> seed only\n  const was = priorMap.get(c.country);\n  if (was === c.ready) continue;               // no change -> drop\n  changes.push({\n    Country: c.country,\n    Change: (!was && c.ready) ? \"Now able to hire\" : \"No longer able to hire\"\n  });\n}\nchanges.sort((a, b) => a.Country.localeCompare(b.Country));\nreturn [{ json: { hadBaseline, seeded: !hadBaseline, changeCount: changes.length, changes } }];"
      },
      "id": "a581f51c-45eb-43c9-8eeb-973e68a9aa95",
      "name": "Diff Readiness",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        1952,
        -416
      ]
    },
    {
      "parameters": {
        "jsCode": "// Build the locked 2-column (Country | Change) report as a simple email note.\nconst j = $input.first().json;\nconst changes = j.changes || [];\nconst seeded = j.seeded;\nconst today = new Date().toISOString().slice(0, 10);\nlet hasChanges = changes.length > 0;\n\nlet bodyHtml, bodyText;\n\nif (seeded) {\n  hasChanges = false;\n  bodyText = \"Baseline established this week. No prior week to compare against — changes will be reported starting next week.\";\n  bodyHtml = \"<p>\" + bodyText + \"</p>\";\n} else if (!hasChanges) {\n  bodyText = \"No changes this week.\";\n  bodyHtml = \"<p><strong>No changes this week.</strong> All country hire-readiness statuses match last week's baseline.</p>\";\n} else {\n  bodyText = changes.map(c => c.Country + \": \" + c.Change).join(\"\\n\");\n  const cell = \"padding:6px 12px;border:1px solid #cccccc;font-family:Arial,Helvetica,sans-serif;font-size:14px;\";\n  const rows = changes.map(c =>\n    \"<tr><td style=\\\"\" + cell + \"\\\">\" + c.Country + \"</td><td style=\\\"\" + cell +\n    (c.Change === \"Now able to hire\" ? \"color:#0E7C3F;\" : \"color:#C0392B;\") + \"\\\">\" + c.Change + \"</td></tr>\"\n  ).join(\"\");\n  bodyHtml =\n    \"<p>\" + changes.length + \" change\" + (changes.length > 1 ? \"s\" : \"\") + \" vs. last week's baseline:</p>\" +\n    \"<table cellpadding=\\\"0\\\" cellspacing=\\\"0\\\" style=\\\"border-collapse:collapse;\\\">\" +\n    \"<tr><th align=\\\"left\\\" style=\\\"\" + cell + \"background:#f0f0f0;\\\">Country</th>\" +\n    \"<th align=\\\"left\\\" style=\\\"\" + cell + \"background:#f0f0f0;\\\">Change</th></tr>\" +\n    rows + \"</table>\";\n}\n\nconst subject = \"Entity Readiness Change Report — \" + today +\n  (hasChanges ? \" (\" + changes.length + \" change\" + (changes.length > 1 ? \"s\" : \"\") + \")\" : \" (No changes)\");\n\nconst html =\n  \"<div style=\\\"font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#222222;line-height:1.5;\\\">\" +\n  \"<p>Hi team,</p>\" +\n  \"<p>Weekly entity readiness check for the week of \" + today + \":</p>\" +\n  bodyHtml +\n  \"<p style=\\\"font-size:12px;color:#777777;\\\">Automated weekly report. \\\"Ready\\\" = status is \\\"Ready to hire locals\\\" or \\\"Ready to hire all\\\". Only week-over-week changes are shown.</p>\" +\n  \"</div>\";\n\nreturn [{ json: { subject, html, bodyText, hasChanges, changeCount: changes.length, seeded: !!seeded } }];\n"
      },
      "id": "b3a75c65-48aa-4d6f-85ae-5046ff0063f5",
      "name": "Build Report (Country | Change)",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        2176,
        -416
      ]
    },
    {
      "parameters": {
        "toRecipients": "growth-team@atlashxm.com",
        "subject": "={{ $json.subject }}",
        "bodyContent": "={{ $json.html }}",
        "additionalFields": {
          "bodyContentType": "html"
        }
      },
      "id": "d8481c6d-ee5e-480b-8aa8-1b7b9de24ae4",
      "name": "Send Growth Report",
      "type": "n8n-nodes-base.microsoftOutlook",
      "typeVersion": 2,
      "position": [
        2400,
        -416
      ],
      "webhookId": "d2e73730-3ce9-4e60-8d4f-5114684149c4",
      "credentials": {
        "microsoftOutlookOAuth2Api": {
          "id": "ctizexFzQop7Y1XP",
          "name": "pdiamitani@atlashxm.com"
        }
      },
      "notes": "Growth delivery. Swap to Microsoft Teams node if Nick prefers Teams. Always sends (incl. 'No changes')."
    },
    {
      "parameters": {
        "jsCode": "// Emit the FULL current country set (not just changes) to overwrite the baseline.\n// Runs only after a successful pull + delivery, so baseline is never lost on failure.\nconst now = new Date().toISOString();\nreturn $('Normalize Readiness').all().map(i => ({\n  json: {\n    country: i.json.country,\n    ready: i.json.ready,\n    status: i.json.status,\n    updated_at: now\n  }\n}));"
      },
      "id": "c89ff4d9-b091-4e8a-b2df-b00e2beac2b7",
      "name": "Prep Baseline Rows",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        2624,
        -416
      ]
    },
    {
      "parameters": {
        "operation": "upsert",
        "dataTableId": {
          "__rl": true,
          "value": "DWg0YxdKbQcNcwtv",
          "mode": "list",
          "cachedResultName": "entity_readiness_baseline"
        },
        "filters": {
          "conditions": [
            {
              "keyName": "country",
              "keyValue": "={{ $json.country }}"
            }
          ]
        },
        "columns": {
          "mappingMode": "autoMapInputData",
          "value": {}
        },
        "options": {}
      },
      "id": "5a046542-b2b9-4f5b-8c23-88fc084ddebf",
      "name": "Upsert Baseline (Data Table)",
      "type": "n8n-nodes-base.dataTable",
      "typeVersion": 1,
      "position": [
        2832,
        -416
      ],
      "notes": "Upsert one row per country on 'country'. Runs only after successful pull + send."
    },
    {
      "parameters": {
        "resource": "worksheet",
        "operation": "append",
        "workbook": {
          "__rl": true,
          "mode": "list",
          "value": ""
        },
        "worksheet": {
          "__rl": true,
          "mode": "list",
          "value": ""
        },
        "dataMode": "autoMap",
        "options": {}
      },
      "id": "059ed6df-2db0-421f-9e7d-aeca6c32db0e",
      "name": "Mirror to Excel (OneDrive)",
      "type": "n8n-nodes-base.microsoftExcel",
      "typeVersion": 2,
      "position": [
        3280,
        -416
      ],
      "credentials": {
        "microsoftExcelOAuth2Api": {
          "id": "KKdC7gswyNhP7uX2",
          "name": "Patrick Excel oAuth"
        }
      },
      "disabled": true,
      "notes": "Human-readable mirror on OneDrive/SharePoint. Point at Entity_Readiness_Baseline.xlsx > 'baseline' sheet. No Azure."
    },
    {
      "parameters": {
        "resource": "worksheet",
        "operation": "clear",
        "workbook": {
          "__rl": true,
          "mode": "list",
          "value": ""
        },
        "worksheet": {
          "__rl": true,
          "mode": "list",
          "value": ""
        },
        "applyTo": "all"
      },
      "id": "138e5dbe-3248-4b37-8937-487a888e7c26",
      "name": "Clear Excel Mirror",
      "type": "n8n-nodes-base.microsoftExcel",
      "typeVersion": 2,
      "position": [
        3056,
        -416
      ],
      "credentials": {
        "microsoftExcelOAuth2Api": {
          "id": "KKdC7gswyNhP7uX2",
          "name": "Patrick Excel oAuth"
        }
      },
      "disabled": true,
      "notes": "Clear the mirror sheet before writing so it reflects CURRENT state (one row per country), not a growing weekly log."
    },
    {
      "parameters": {
        "toRecipients": "pdiamitani@atlashxm.com, shony@tripledart.com, nickm@atlashxm.com, btagliari@atlashxm.com, jyotindras@atlashxm.com",
        "subject": "={{ $json.subject }}",
        "bodyContent": "={{ $json.html }}",
        "additionalFields": {
          "bodyContentType": "html"
        }
      },
      "id": "51a7e7a6-1677-4773-9d7c-4d4a79ba7d1e",
      "name": "Send TripleDart Report (Agency)",
      "type": "n8n-nodes-base.microsoftOutlook",
      "typeVersion": 2,
      "position": [
        2400,
        -224
      ],
      "webhookId": "c0d166e7-bcb5-41ba-89fc-0aae672f545c",
      "credentials": {
        "microsoftOutlookOAuth2Api": {
          "id": "ctizexFzQop7Y1XP",
          "name": "pdiamitani@atlashxm.com"
        }
      },
      "notes": "Phase 2 — Marketing/agency feed. Format confirmed by Jyotindra: email, weekly Monday post-execution, same report. Recipient: shony@tripledart.com (TripleDart). Parallel leaf — does not gate the baseline write."
    }
  ],
  "pinData": {},
  "connections": {
    "Weekly Trigger (Mon 07:00)": {
      "main": [
        [
          {
            "node": "Onspring - Get Country Entity Readiness",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Onspring - Get Country Entity Readiness": {
      "main": [
        [
          {
            "node": "Normalize Readiness",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Normalize Readiness": {
      "main": [
        [
          {
            "node": "Read Baseline (Data Table)",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Read Baseline (Data Table)": {
      "main": [
        [
          {
            "node": "Diff Readiness",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Diff Readiness": {
      "main": [
        [
          {
            "node": "Build Report (Country | Change)",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Build Report (Country | Change)": {
      "main": [
        [
          {
            "node": "Send Growth Report",
            "type": "main",
            "index": 0
          },
          {
            "node": "Send TripleDart Report (Agency)",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Send Growth Report": {
      "main": [
        [
          {
            "node": "Prep Baseline Rows",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Prep Baseline Rows": {
      "main": [
        [
          {
            "node": "Upsert Baseline (Data Table)",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Upsert Baseline (Data Table)": {
      "main": [
        [
          {
            "node": "Clear Excel Mirror",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Clear Excel Mirror": {
      "main": [
        [
          {
            "node": "Mirror to Excel (OneDrive)",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": false,
  "settings": {
    "executionOrder": "v1",
    "callerPolicy": "workflowsFromSameOwner",
    "availableInMCP": false
  },
  "versionId": "90cb5734-9ac7-4a8e-b0b4-5ddd3a36ed68",
  "meta": {
    "templateCredsSetupCompleted": true,
    "instanceId": "da98df5c5d7ca09b34ad4f795244e87a7663d8722c18682c2021c70624938526"
  },
  "id": "EirKWJBySSXugv3a",
  "tags": [
    {
      "updatedAt": "2026-07-09T20:53:43.143Z",
      "createdAt": "2026-07-09T20:53:43.143Z",
      "id": "XofZwXjAzX4rpjSD",
      "name": "GTM"
    },
    {
      "updatedAt": "2026-07-09T20:53:43.112Z",
      "createdAt": "2026-07-09T20:53:43.112Z",
      "id": "lylQkBCfg28Ii7FR",
      "name": "Growth"
    }
  ]
}
