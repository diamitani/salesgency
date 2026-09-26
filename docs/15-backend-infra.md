---
artifact_type: backend-infra
project_id: salesgency
version: v5.0.0
status: approved
owner: eng
reviewers: [devops, infra, security]
well_architected_review: pass
upstream: [architecture@v2.0.0, stack-adr@v5.0.0]
confidence: 1.0
---

# 15. SalesGency Backend & Infrastructure Specification

## 1. Hosting & Compute Topology
- **Platform:** Vercel Edge Network & Serverless Functions.
- **Node Runtime:** Node.js 18.x / 20.x ESM & CJS hybrid runtime.
- **Regions:** Global Edge Anycast routing with primary serverless execution in `iad1` (US East) and `sfo1` (US West).

---

## 2. Configuration & Secrets Matrix

| Variable Name | Environment | Sensitivity | Description |
|---|---|:---:|---|
| `STRIPE_PUBLISHABLE_KEY` | Public / Client | Low | Public Stripe key (`pk_live_...`) |
| `STRIPE_SECRET_KEY` | Serverless Env | High | Live Stripe API secret key (`sk_live_...`) |
| `STRIPE_WEBHOOK_SECRET` | Serverless Env | High | Webhook signing secret (`whsec_...`) |
| `PORT` | Local Dev Server | None | Local development port (default `3000`) |

---

## 3. Serverless Route Consolidation
To maintain zero cold-start latency and avoid Vercel function count limits, all Stripe subroutes are consolidated in `api/stripe.js`:
- Direct invocation routes:
  - `/api/stripe/config`
  - `/api/stripe/create-checkout-session`
  - `/api/stripe/webhook`
  - `/api/stripe/portal`
- Fallback query parameter routing: `/api/stripe?action=create-checkout-session`
