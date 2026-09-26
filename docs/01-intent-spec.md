---
artifact_type: intent-spec
project_id: salesgency
version: v5.0.0
status: approved
owner: product
reviewers: [eng, design, security]
well_architected_review: pass
upstream: [intake@v2]
confidence: 1.0
---

# 01. SalesGency Intent Specification

## 1. Problem Statement
Modern B2B revenue teams face extreme fragmentation and high software taxes:
1. **Proliferation of Fragile AI Prompt Wrappers:** Teams struggle with generic LLM outputs and uncalibrated outreach that burns domain reputation.
2. **Excessive Recurring Seat Taxes:** Traditional sales software charges $150–$300/seat/month while locking workflows inside walled gardens.
3. **Engineering Resource Bottlenecks:** Growth and RevOps leaders wait weeks for internal engineering to wire CRM webhooks, waterfall enrichment APIs (Clay, Apollo), and multi-step n8n automation graphs.

SalesGency solves this by delivering **autonomous, client-owned GTM revenue engines**, verified skill plugins, and interactive workflow synthesis—deployable within hours and 100% owned by the client with zero perpetual platform tax.

---

## 2. Target Personas & ICP

| Persona | Role | Primary Pain Point | Success Metric |
|---|---|---|---|
| **Visitor / Growth Marketer** | Evaluating outbound & AI GTM tech | Needs proven frameworks and prompt structures | Time to first value < 60 seconds (free guide download) |
| **SDR / RevOps Specialist** | Scaling prospecting & inbox deliverability | High bounce rates, manual lead enrichment | 100% verified lead data, sub-30s speed-to-lead |
| **Growth-Stage Founder (Series A/Seed)** | Building initial sales engine | No dedicated sales engineering hire | Production GTM pipeline live in < 14 days |
| **VP of Sales / CRO (Midmarket $20k budget)** | Scaling predictable revenue | SDR team wasting 70% time on manual admin | +40% qualified pipeline, zero CRM data collision |

---

## 3. Product Scope (v5.0-GA)

### In-Scope:
- **Unified High-Conversion Experience:** FAANG-unicorn aesthetic across landing, services, pricing, process, about, and app console.
- **Synchronized Commercial Catalog:** 15 active Stripe products across 4 pricing tiers ($0 free, $19.99 entry, $199 skill plugins, $999–$4,999 build sprints, and $19,999/mo Fractional GTM).
- **Interactive Visual Studio (`app.html`):** Prompt-to-workflow synthesis, real-time node generation, sandbox CLI validation, and one-click JSON export.
- **Managed Payments & Automated Tax:** Direct Stripe Checkout Sessions with universal tax code (`txcd_10000000`) and webhook fulfillment.
- **Free Asset Fulfillment:** Zero-friction direct unlock for lead magnets without credit card barriers.

### Out-of-Scope (Non-Goals):
- Self-hosted multi-tenant SaaS cluster management (SalesGency provides client-owned infrastructure, not closed SaaS hosting).
- Generic non-GTM automation (strictly focused on B2B revenue, CRM, and prospecting engines).

---

## 4. Acceptance Criteria & Signals
- **Comprehension:** A stranger understands the offer and commercial tiers within 5 seconds of landing.
- **Checkout Velocity:** A buyer can select a product, complete Stripe Checkout, and access fulfillment in < 3 minutes.
- **Visual Polish:** Dark obsidian canvas, frosted glassmorphism, responsive bento grids, and WCAG 2.2 AA contrast compliance.
- **Resilience:** 100% serverless edge availability, zero secret leakage, and automated webhook idempotency.
