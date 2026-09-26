---
artifact_type: prd
project_id: salesgency
version: v5.0.0
status: approved
owner: product
reviewers: [eng, design, security, ops]
well_architected_review: pass
upstream: [intent-spec@v5.0.0, user-stories@v5.0.0, ia@v5.0.0]
confidence: 1.0
---

# 08. SalesGency Product Requirements Document (PRD)

## 1. Problem & Strategic Objectives
Modern B2B revenue teams waste over 65% of their working hours on manual prospecting admin, debugging fragile integration tools, and writing generic outreach that damages sender reputation. High-cost traditional SaaS platforms charge thousands per seat while locking companies into vendor traps.

**SalesGency v5.0** delivers an autonomous GTM engineering platform that gives clients **100% ownership** of their sales infrastructure, n8n workflows, and AI prompts.

---

## 2. Quantifiable Success Metrics
- **Visitor-to-Lead Conversion:** Free guide download conversion ≥ 12.5%.
- **Paid Checkout Conversion:** Self-serve catalog conversion ≥ 3.8%.
- **Time-to-Value (TTV):** Instant unlock for free assets (< 2 seconds); instant Stripe Checkout redirection (< 800ms).
- **Page Load Performance:** Lighthouse Performance ≥ 98, Accessibility = 100, Best Practices = 100, SEO = 100.
- **System Availability:** 99.99% serverless edge uptime with zero single points of failure.

---

## 3. Functional Requirements (FR)

### FR-001 through FR-010: Commercial Catalog & Stripe Integration
- **FR-001:** The platform shall maintain a synchronized catalog (`data/products.json` and `api/_catalog.js`) mapping 15 commercial items to live Stripe Price IDs on Account `acct_1UDfsZKuSRnusODl`.
- **FR-002:** The checkout handler `POST /api/stripe/create-checkout-session` shall dynamically configure Stripe Managed Payments with tax code `txcd_10000000` (Software/Professional Services).
- **FR-003:** All $0.00 items (`free-skill-download`, `free-b2b-prompts`) shall bypass Stripe and route directly to `/checkout-success.html?status=free`.
- **FR-004:** Webhook listener `POST /api/stripe/webhook` shall verify HMAC-SHA256 signatures via `stripe.webhooks.constructEvent` and acknowledge events idempotently.
- **FR-005:** The platform shall provide a self-service customer portal gateway at `POST /api/stripe/portal` for subscription and payment management.

### FR-011 through FR-020: Interactive Studio & Prompt-to-Workflow Synthesis
- **FR-011:** `app.html` shall provide a dual-mode generation workbench (Automation, Skill, Agent, Blueprint).
- **FR-012:** When given a natural language prompt, the backend (`api/agent.js` / `api/builder.js`) shall synthesize valid n8n node graphs with multi-provider waterfall enrichment and AI PAS copywriting.
- **FR-013:** The UI shall display animated terminal diagnostics simulating execution steps and providing instant JSON copy and `.json` file download.

### FR-021 through FR-030: Brand Experience, Aesthetics & Navigation
- **FR-021:** All pages shall import `assets/unified-nav.js` to ensure uniform obsidian header navigation with WCAG 2.2 AA compliant contrast (≥ 7:1 for headers).
- **FR-022:** `services.html` shall feature interactive GSAP scroll-triggered stacking cards for Inbound, Outbound, and Deal Intelligence engines.
- **FR-023:** `pricing.html` shall present the full 15-tier commercial matrix with explicit midmarket ($19,999/mo) and sprint ($999 to $4,999) options.

---

## 4. Non-Functional Requirements (NFR)

| Category | Requirement | Metric / Standard |
|---|---|---|
| **Availability** | Serverless Edge CDN uptime | ≥ 99.99% monthly |
| **Latency (p95)** | Edge-cached pages & catalog lookups | < 50ms TTFB |
| **API Latency (p95)** | Session creation & agent fallback | < 600ms |
| **Accessibility** | Keyboard navigation, ARIA roles, contrast | WCAG 2.2 AA (100 Lighthouse) |
| **Security** | Secret isolation, PCI SAQ-A compliance | 0 client secrets, PCI Level 1 hosted |

---

## 5. Rollout Plan & Release Gates
1. **Gate 1 (Internal Audit):** 100% pass rate on `scripts/audit-sweep.js` across all 64 HTML pages.
2. **Gate 2 (Buyer Simulation):** 6/6 test scenarios passing in `scripts/simulate-midmarket-buyer.js`.
3. **Gate 3 (Production Deployment):** Push to Vercel production edge with live environment variables.
