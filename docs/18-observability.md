---
artifact_type: observability
project_id: salesgency
version: v5.0.0
status: approved
owner: eng
reviewers: [devops, eng]
well_architected_review: pass
upstream: [architecture@v2.0.0, specifications@v5.0.0]
confidence: 1.0
---

# 18. SalesGency Observability & Telemetry Standard

## 1. Structured JSON Logging Architecture
All serverless API handlers in `api/` output structured JSON logs to standard output, captured automatically by Vercel Logs:

```json
{
  "timestamp": "2026-09-22T19:30:00.000Z",
  "level": "info",
  "service": "salesgency-api",
  "route": "/api/stripe/create-checkout-session",
  "product": "build-session",
  "price_id": "price_1UHh89KuSRnusODlG46j3rJz",
  "session_id": "cs_live_...",
  "latency_ms": 185,
  "status": 200
}
```

---

## 2. Synthetic Health Checks & Probing
- **Health Check Endpoint:** `GET /api/catalog`
- **Probe Frequency:** Every 60 seconds via external monitoring (e.g. BetterStack / Vercel Monitoring).
- **Alert Thresholds:**
  - P1: Edge 5xx error rate > 1.0% over 5 minutes.
  - P2: Session creation latency p95 > 1,500ms.
  - P3: Webhook delivery failure or signature error.

---

## 3. Client Telemetry & Non-Invasive Diagnostics
- The client script `assets/stripe-client.js` captures user-facing checkout initiation and console diagnostic events without sending PII.
- If checkout fails, error messages are rendered gracefully in the DOM with self-healing recovery actions.
