# SalesGency v5.0 Next Version Launch & Audit Plan

**Document ID:** `docs/launch-audit-plan.md`  
**Version:** 5.0.0-GA  
**Target Release Date:** Production Release  
**Platform Owner:** Diamitani Industries / SalesGency  

---

## 1. Executive Summary & Release Readiness

SalesGency v5.0 is the definitive, commercial-grade release of the sovereign GTM revenue engineering platform. It replaces generic prompt wrappers and AI-slop with production-tested, client-owned revenue engines built into modern B2B tech stacks (HubSpot, Salesforce, Clay, n8n, Smartlead).

This release introduces:
1. **Live Stripe Integration & Unified Catalog:** Complete synchronization of all 15 active Stripe products from Account `acct_1UDfsZKuSRnusODl`.
2. **Managed Payments & Tax Automation:** Automated product tax classification (`txcd_10000000`) enabling frictionless Stripe Checkout across domestic and international jurisdictions.
3. **Midmarket Buyer Alignment ($20,000/month envelope):** Explicit packaging of the **Fractional GTM Engineer tier ($19,999/mo)** matching midmarket budgets, anchored by the **$999 1-Hour Build Session** pilot on-ramp.
4. **WCAG 2.2 AA Contrast Compliance:** Clean visual audit across all 64 HTML documents, eliminating washed-out gray text, correcting dark-mode logo visibility, and standardizing typography.
5. **Zero-Friction Free Asset Delivery:** Direct client-side and server-side bypass for $0 lead magnet assets (no credit card required).

---

## 2. Pre-Launch Verification Checklist

| Pillar / Check | Requirement | Status | Verification Evidence |
|---|---|---|---|
| **Secret Management** | `STRIPE_SECRET_KEY` never committed to Git or exposed in client bundles | **PASS** | Checked `.gitignore` (`.env*` excluded). Verified `/api/stripe/config` exposes only `pk_live_...`. |
| **Catalog Accuracy** | All 15 Stripe products match live amounts and live Price IDs | **PASS** | Validated via `data/products.json` and live session generation. |
| **Tax Compliance** | Stripe Managed Payments `tax_code` configured | **PASS** | `txcd_10000000` applied to all 15 products via Stripe API. |
| **Accessibility (WCAG 2.2 AA)** | Contrast ratio ≥ 4.5:1 on light text; ≥ 7:1 on dark headers | **PASS** | Automated audit sweep `scripts/audit-sweep.js` returned 0 issues across 64 HTML pages. |
| **Navigation Uniformity** | Universal obsidian navbar (`sgu-nav`) with stark white wordmark | **PASS** | Standardized via `assets/unified-nav.js` with automated legacy nav remover. |
| **Buyer Simulation** | Autonomous buyer journey test for $20k/mo budget | **PASS** | `scripts/simulate-midmarket-buyer.js` executed 6/6 tests with 100% pass rate. |
| **Server Routing** | Serverless function consolidation (Hobby limit safe) | **PASS** | `api/stripe.js` handles all Stripe subroutes in a single function file. |

---

## 3. Commercial Ladder & Pricing Architecture

| Offering | Price | Target Persona | Buyer Job-To-Be-Done (JTBD) | Purchase Flow |
|---|---|---|---|---|
| **Free Guides (Cold Email & Prompts)** | $0.00 | Curious Visitor / Growth Marketer | Evaluate technical depth and frameworks with zero friction | Instant download bypass to `/checkout-success.html?status=free` |
| **Agent Build Package** | $19.99 flat | Junior RevOps / Solo Builder | Get starter JSON schemas and prompts to test locally | Live Stripe Checkout (`prod_VIYcBZ7oNQbemd`) |
| **6 Skill Plugins** | $199.00 each | SDR Manager / RevOps Specialist | Drop-in modular prompt skill into Cursor/Claude/n8n | Live Stripe Checkout (6 individual price IDs) |
| **1-Hour Build Session** | $999.00 flat | VP RevOps / CRO | Test paired engineering capability with zero risk (100% credited to sprint) | Live Stripe Checkout (`prod_VIXXS7cTrlS1o5`) |
| **14-Day Build Sprint** | $2,999.00 flat | Growth Stage Startup / Series A | Rapid turnkey deployment of 1-2 core revenue engines | Live Stripe Checkout (`prod_VIY3P83n0cJDKt`) |
| **30-Day Turnkey Sprint** | $4,999.00 flat | Midmarket VP Sales / CRO | Complete turnkey deployment of 3 revenue engines + CRM dedupe shield | Live Stripe Checkout (`prod_VIY28I5G6tmvkU`) |
| **Full Build - Prospect Automation** | $4,999.00 flat | Enterprise Outbound Team | Sovereign, autonomous outbound pipeline engine (PAE) | Live Stripe Checkout (`prod_VIY19dahamcObA`) |
| **Fractional GTM Engineer** | $19,999.00/mo | Midmarket CRO / VP RevOps ($20k/mo budget) | Dedicated engineering pod and GTM CoE without $360k+ in salaries | Live Stripe Subscription (`prod_VIY05YRJfZzHkW`) |

---

## 4. Launch Steps for Production Deployment

### Step 1: Environment Variables on Hosting Platform (Vercel)
Ensure the following environment variables are set in the Vercel Project Dashboard:
- `STRIPE_PUBLISHABLE_KEY`: `pk_live_51UDfsZKuSRnusODlxFPAoZApYKnEUT7VAf2WbklbCMMCm9uNNvaEHsLSQeTp0N6rSboaTa3UT9EZ54xivWFa9W1b00zE7gB2YT`
- `STRIPE_SECRET_KEY`: `[CONFIGURED_IN_ENV_VARIABLES]`
- `STRIPE_WEBHOOK_SECRET`: Configure your live webhook signing secret when creating the webhook endpoint in Stripe Dashboard.

### Step 2: Configure Stripe Webhook in Stripe Dashboard
1. Go to **Stripe Dashboard → Developers → Webhooks → Add Endpoint**.
2. Endpoint URL: `https://salesgency.com/api/stripe/webhook` (or your production domain).
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`
4. Copy the Signing Secret (`whsec_...`) into your production environment variables as `STRIPE_WEBHOOK_SECRET`.

### Step 3: Deployment Trigger
Push the clean codebase to Git / deploy via Vercel CLI:
```bash
git add .
git commit -m "feat: SalesGency v5.0 Next Version — Live Stripe integration, WCAG 2.2 AA contrast overhaul, and midmarket buyer alignment"
git push origin main
```

### Step 4: Post-Deploy Smoke Test Run
1. Run `node scripts/simulate-midmarket-buyer.js` pointing to the production URL.
2. Complete one real $19.99 test purchase on production to confirm end-to-end receipt and webhook acknowledgment.

---

## 5. Summary of Automated Verification Scripts Available

- **Full Sweep Audit**: `node scripts/audit-sweep.js` (Scans 64 HTML files for contrast, links, nav consistency, and Stripe slugs).
- **Buyer Simulation**: `node scripts/simulate-midmarket-buyer.js` (Simulates CRO, VP RevOps, and Architect checkout flows).
