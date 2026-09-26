---
artifact_type: runbook
project_id: salesgency
version: v5.0.0
status: approved
owner: ops
reviewers: [ops, eng]
well_architected_review: pass
upstream: [architecture@v2.0.0, backend-infra@v5.0.0]
confidence: 1.0
---

# 22. SalesGency Operations & Incident Runbook

## 1. Standard Deployment Procedures
1. **Local Pre-Flight Validation:**
   ```bash
   node scripts/audit-sweep.js
   node scripts/simulate-midmarket-buyer.js
   ```
2. **Git Commit & Push:**
   ```bash
   git add .
   git commit -m "feat: [release description]"
   git push origin main
   ```
3. **Vercel Automatic Build & Deploy:**
   - Vercel automatically deploys `main` branch to production edge.
   - Verify `https://salesgency.com/api/catalog` returns HTTP 200 with 15 products.

---

## 2. Incident Response Playbooks

### 2.1 Webhook Signature Failure / Missed Fulfillment
- **Symptom:** Customers report successful payment on Stripe but no access on `/checkout-success.html`.
- **Diagnosis:**
  1. Check Vercel logs for `[Stripe Webhook Error] Signature verification failed`.
  2. Verify `STRIPE_WEBHOOK_SECRET` matches the active webhook endpoint in Stripe Dashboard.
- **Remediation:**
  1. Rotate `STRIPE_WEBHOOK_SECRET` in Vercel Environment Variables.
  2. Resend failed events from Stripe Dashboard → Developers → Webhooks → Failed Events.

### 2.2 Stripe API Rate Limiting or Outage
- **Symptom:** `POST /api/stripe/create-checkout-session` returns HTTP 500 or 429.
- **Diagnosis:** Check Stripe Status Page (`https://status.stripe.com`).
- **Remediation:** `assets/stripe-client.js` displays non-blocking retry banner. Advise users to retry in 60 seconds or contact emergency support.
