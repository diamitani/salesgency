---
name: techstack
description: Process/Note derived from TECH_STACK.md
source_path: n8n execution analyst/TECH_STACK.md
---

# TECH_STACK.md

## Context
This skill provides knowledge, processes, and instructions derived from the document: `TECH_STACK.md`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

# TECH_STACK — n8n Execution Analyst

## Tools & APIs

| Tool | Purpose | API Status | Auth | Key Endpoints |
|---|---|---|---|---|
| **n8n Public API** | Source of workflow + execution data | ✓ Confirmed (tested live) | `X-N8N-API-KEY` header | see below |
| **Python (openpyxl / pandas)** | Spreadsheet + table generation | ✓ Available in skill runtime | — | — |
| **Slack / Teams** (stretch) | Health-scan alerting | ⚠ Unconfirmed | Webhook URL | incoming webhook |
| **Persistence store** (optional) | Trend analysis beyond 25-exec limit | ⚠ TBD | depends on choice | local file / Azure blob / table |

## n8n Public API — Verified Endpoints

Base: `https://atlas-hxm.app.n8n.cloud/api/v1`
Auth header: `X-N8N-API-KEY: <key>`

| Endpoint | Use | Notes |
|---|---|---|
| `GET /workflows?limit=100&cursor=<cursor>` | List/search workflows | **Cursor-based** pagination (not offset). `nextCursor` in response. ~100/page. |
| `GET /workflows/{id}` | Full workflow definition | Nodes, parameters, connections, active flag, timestamps |
| `GET /executions?workflowId={id}&status={error\|success\|waiting}&limit={n}` | List executions | Filter by workflow + status + limit; `nextCursor` for more |
| `GET /executions/{id}?includeData=true` | Full execution detail | Per-node data + errors at `data.resultData.runData.[nodeName][0].error` |

## 🔑 API READINESS — n8n Public API
