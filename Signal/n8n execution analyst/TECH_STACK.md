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
```
Status: ✓ CONFIRMED — key tested live against /workflows, /executions, /executions/{id}

Auth: X-N8N-API-KEY header
Storage requirement (N-class): store the key as an environment variable or
  skill credential. NEVER hardcode it in SKILL.md, scripts committed to a repo,
  or any output the skill prints. Scrub it from logs and exports.

Where to manage keys: n8n → Settings → API → Personal API Key
```

## 🔑 API READINESS — Slack/Teams Alerting (stretch, for health scan)
```
Status: ⚠ NOT CONFIRMED
Used for: proactive failure alerts from the scheduled health scan

Option A — Slack incoming webhook:
  1. api.slack.com/apps → your app → Incoming Webhooks
  2. Create webhook for the target channel
  3. Store URL as env var / credential
Option B — Teams incoming webhook (Atlas uses Microsoft 365):
  1. Teams channel → Connectors → Incoming Webhook → create → copy URL
Option C — Skip: health scan still logs to file/table; just no push alert.
```

## Security Rules
- API key in env/credential only; never in output, never in committed files.
- Read-only API usage in v1 — no `POST`/`PUT`/`PATCH`/`DELETE` to workflows.
- If persisting execution data, store it where access is controlled (not a public location).
