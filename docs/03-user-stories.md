---
artifact_type: user-stories
project_id: salesgency
version: v5.0.0
status: approved
owner: product
reviewers: [eng, qa]
well_architected_review: pass
upstream: [jtbd@v5.0.0]
confidence: 1.0
---

# 03. SalesGency Canonical User Stories

## 1. Persona Catalog
- **USR-P1: Visitor** — First-time evaluator looking for sales automation solutions.
- **USR-P2: Lead Signer** — Downloading free prompt guides and resources.
- **USR-P3: Solo Builder / SDR** — Purchasing individual skill plugins ($199) and digital bundles ($19.99).
- **USR-P4: Executive Buyer (CRO / VP RevOps)** — Purchasing co-build sessions ($999), sprints ($2,999–$4,999), or fractional retainers ($19,999/mo).
- **USR-P5: Autonomous Agent / Engine** — Synthesizing n8n workflows and executing background jobs.

---

## 2. INVEST User Story Matrix

### US-01: Instant Landing Comprehension
- **As a** Visitor,
- **I want** to understand SalesGency's core value proposition, sovereign code ownership promise, and pricing tiers in under 5 seconds,
- **So that** I know whether this platform fits my revenue engineering needs.
- **Acceptance Criteria (Given/When/Then):**
  - *Given* a visitor navigates to `/`,
  - *When* the page loads on mobile (375px) or desktop (1440px),
  - *Then* the hero displays the headline, sub-headline, primary CTA button, proof tickers, and live product teasers above the fold with WCAG 2.2 AA contrast.

---

### US-02: Zero-Friction Free Asset Fulfillment
- **As a** Lead Signer,
- **I want** to access the Cold Email Masterclass or 50 B2B Prompts guide without entering credit card details,
- **So that** I can immediately evaluate the technical frameworks.
- **Acceptance Criteria:**
  - *Given* a user clicks "Download Free Guide" (`data-stripe-product="free-skill-download"`),
  - *When* the request triggers client-side,
  - *Then* the browser bypasses Stripe and redirects to `/checkout-success.html?product=free-skill-download&status=free` with immediate download links unlocked.

---

### US-03: Low-Friction Co-Build Pilot ($999 1-Hour Build Session)
- **As an** Executive Buyer,
- **I want** to purchase a 1-Hour Build Session with full credit toward future sprints,
- **So that** my team can test the engineering pod before committing to a 30-day turnkey build.
- **Acceptance Criteria:**
  - *Given* a user selects the 1-Hour Build Session (`data-stripe-product="build-session"`),
  - *When* the user clicks "Book 1-Hour Build",
  - *Then* `POST /api/stripe/create-checkout-session` creates a Stripe session for Price `price_1UHh89KuSRnusODlG46j3rJz` ($999.00 flat) with tax code `txcd_10000000` and redirects to Stripe Checkout.

---

### US-04: Enterprise Midmarket Retainer Checkout ($19,999/mo)
- **As a** Midmarket CRO ($20k/mo budget envelope),
- **I want** to retain a Fractional GTM Engineering pod on a recurring monthly plan,
- **So that** our sales team has dedicated engineers building and maintaining custom revenue engines.
- **Acceptance Criteria:**
  - *Given* an executive selects Fractional GTM Engineer (`data-stripe-product="fractional-gtm-engineer"`),
  - *When* they click "Retain Fractional Team",
  - *Then* a recurring subscription session is generated for Price `price_1UHha6KuSRnusODlyD4Jz6uK` ($19,999.00/mo) and processed securely.

---

### US-05: Interactive Prompt-to-Workflow Synthesis (`app.html`)
- **As a** Solo Builder or RevOps Specialist,
- **I want** to describe my sales automation requirements in plain English,
- **So that** the platform synthesizes valid n8n node graphs, JSON configurations, and execution commands in real time.
- **Acceptance Criteria:**
  - *Given* a user inputs a prompt into the Workbench in `app.html`,
  - *When* the user clicks "Generate Architecture",
  - *Then* the sandbox visualizer renders animated terminal feedback, produces the n8n JSON graph, and enables one-click "Copy JSON" and "Download n8n Workflow".

---

### US-06: Verified Webhook Ingestion & Idempotency
- **As a** Platform Operator,
- **I want** all Stripe webhook events (`checkout.session.completed`, `customer.subscription.created`) to be verified via HMAC signatures,
- **So that** only authentic transactions unlock fulfillment and duplicates are safely ignored.
- **Acceptance Criteria:**
  - *Given* Stripe sends an event to `POST /api/stripe/webhook`,
  - *When* `stripe.webhooks.constructEvent` validates `STRIPE_WEBHOOK_SECRET`,
  - *Then* the event is processed idempotently and returns HTTP 200 `{ received: true }`.
