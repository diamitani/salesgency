---
artifact_type: payments
project_id: salesgency
version: v5.0.0
status: approved
owner: eng
reviewers: [eng, gtm, finance]
well_architected_review: pass
upstream: [architecture@v2.0.0, data-model@v5.0.0]
confidence: 1.0
---

# 16. SalesGency Payments & Tax Automation Specification

## 1. Stripe Account Architecture
- **Stripe Account ID:** `acct_1UDfsZKuSRnusODl`
- **Account Name:** SalesGency (Diamitani Industries)
- **Compliance Standard:** PCI DSS SAQ-A via Stripe-hosted Checkout Sessions
- **Tax Automation:** Stripe Managed Payments with universal software/professional services tax code: `txcd_10000000`

---

## 2. Active Commercial Catalog & Price ID Map

| Product Slug | Product Name | Mode | Price ID | Price | Tax Code |
|---|---|:---:|---|:---:|:---:|
| `build-session` | 1-Hour Build Session | `payment` | `price_1UHh89KuSRnusODlG46j3rJz` | $999.00 | `txcd_10000000` |
| `14-day-build-sprint` | 14-Day Build Sprint | `payment` | `price_1UHhdtKuSRnusODlS27K6rT7` | $2,999.00 | `txcd_10000000` |
| `30-day-build-sprint` | 30-Day Build Sprint | `payment` | `price_1UHhcYKuSRnusODlO403cK23` | $4,999.00 | `txcd_10000000` |
| `full-build-prospect-automation` | Full Prospect Automation | `payment` | `price_1UHhbLKuSRnusODlI5s54cT3` | $4,999.00 | `txcd_10000000` |
| `fractional-gtm-engineer` | Fractional GTM Engineer | `subscription` | `price_1UHha6KuSRnusODlyD4Jz6uK` | $19,999.00/mo | `txcd_10000000` |
| `gtm-platform-starter` | GTM Agent Subscription | `subscription` | `price_1UHhkjKuSRnusODl1UvN5Xw4` | $99.00/mo | `txcd_10000000` |
| `skill-plugin-inbound` | Inbound Responder Plugin | `payment` | `price_1UHhjHKuSRnusODl86n6d6X6` | $199.00 | `txcd_10000000` |
| `skill-plugin-pas` | PAS Copywriter Plugin | `payment` | `price_1UHhieKuSRnusODlqNnKx3iV` | $199.00 | `txcd_10000000` |
| `skill-plugin-enrich` | Firmographic Enricher | `payment` | `price_1UHhhYKuSRnusODluD3eJg3F` | $199.00 | `txcd_10000000` |
| `skill-plugin-crm` | CRM Hygiene Plugin | `payment` | `price_1UHhgXKuSRnusODlUqKj1B0V` | $199.00 | `txcd_10000000` |
| `skill-plugin-dns` | Deliverability & DNS | `payment` | `price_1UHhfVKuSRnusODlU6N5ZfF6` | $199.00 | `txcd_10000000` |
| `skill-plugin-gtm-arch` | GTM Architect Plugin | `payment` | `price_1UHhkAKuSRnusODlv9xH90cQ` | $199.00 | `txcd_10000000` |
| `agent-build-package` | Agent Build Package | `payment` | `price_1UHhmEKuSRnusODl9G1BqF56` | $19.99 | `txcd_10000000` |
| `free-skill-download` | Cold Email Masterclass | `bypass` | N/A | $0.00 | Exempt |
| `free-b2b-prompts` | 50 B2B Prompts Guide | `bypass` | N/A | $0.00 | Exempt |

---

## 3. Webhook Handling & Dunning
- **Signature Verification:** HMAC-SHA256 validated via `stripe.webhooks.constructEvent` with `STRIPE_WEBHOOK_SECRET`.
- **Dunning:** Handled by Stripe Smart Retries. If subscription invoices fail, customer portal emails notify buyer automatically.
- **Refund Policy:** 100% money-back guarantee within 14 days if the 1-Hour Build Session or sprint does not deliver agreed architectural milestones.
