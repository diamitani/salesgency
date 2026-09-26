---
artifact_type: flows
project_id: salesgency
version: v5.0.0
status: approved
owner: design
reviewers: [eng, product]
well_architected_review: pass
upstream: [ia@v5.0.0, sitemap@v2.0.0]
confidence: 1.0
---

# 06. SalesGency Canonical User Flows

## 1. Flow Overview
This document specifies the step-by-step user journeys and system interactions for all primary commercial, technical, and fulfillment operations.

---

## 2. Flow 1: Zero-Friction Free Asset Fulfillment

```mermaid
sequenceDiagram
  autonumber
  actor Visitor as Evaluator
  participant Browser as Web Client (stripe-client.js)
  participant Success as /checkout-success.html
  participant Asset as CDN Download Asset

  Visitor->>Browser: Clicks "Download Free Masterclass" (data-stripe-product="free-skill-download")
  Browser->>Browser: Evaluates price === $0.00 from local catalog
  Browser->>Success: Instant window redirect to /checkout-success.html?product=free-skill-download&status=free
  Success->>Success: Renders download card without payment gate
  Visitor->>Asset: Clicks "Download PDF / Markdown Guide"
  Asset-->>Visitor: Delivers assets instantly
```

---

## 3. Flow 2: Paid Commercial Checkout & Webhook Ingestion

```mermaid
sequenceDiagram
  autonumber
  actor Buyer as Midmarket CRO / Builder
  participant Client as Web Client
  participant API as /api/stripe/create-checkout-session
  participant Catalog as api/_catalog.js
  participant Stripe as Stripe Hosted Checkout
  participant Webhook as /api/stripe/webhook
  participant Success as /checkout-success.html

  Buyer->>Client: Clicks "Deploy Engine" (e.g. data-stripe-product="build-session")
  Client->>API: POST /api/stripe/create-checkout-session { product: "build-session" }
  API->>Catalog: Resolve live Price ID (price_1UHh89KuSRnusODlG46j3rJz) and Tax Code (txcd_10000000)
  API->>Stripe: stripe.checkout.sessions.create({ line_items, tax, mode, success_url, cancel_url })
  Stripe-->>API: Returns { url: "https://checkout.stripe.com/c/pay/cs_live_..." }
  API-->>Client: Returns JSON { url }
  Client->>Stripe: Browser redirect to Stripe Checkout
  Buyer->>Stripe: Completes payment via Card / Apple Pay / Google Pay
  Stripe->>Webhook: Sends checkout.session.completed (signed HMAC-SHA256)
  Webhook->>Webhook: stripe.webhooks.constructEvent(rawBody, sig, STRIPE_WEBHOOK_SECRET)
  Webhook-->>Stripe: Returns HTTP 200 { received: true }
  Stripe->>Success: Redirects buyer to /checkout-success.html?session_id=cs_live_...
  Success->>Buyer: Displays confirmed transaction receipt and direct asset download
```

---

## 4. Flow 3: Interactive Prompt-to-Workflow Studio (`app.html`)

```mermaid
sequenceDiagram
  autonumber
  actor User as RevOps Engineer
  participant Studio as app.html UI
  participant AgentAPI as /api/agent or /api/builder
  participant Exporter as Client Exporter

  User->>Studio: Selects Mode ("Automation", "Skill", "Agent")
  User->>Studio: Types prompt: "Build Apollo waterfall enrichment with CRM deduplication"
  User->>Studio: Clicks "Generate Architecture"
  Studio->>Studio: Animates live sandbox terminal status logs
  Studio->>AgentAPI: POST /api/agent { prompt, mode, stack: ["n8n", "Clay", "Apollo"] }
  AgentAPI-->>Studio: Returns synthesized n8n node graph JSON + execution commands
  Studio->>Studio: Updates live visualizer & JSON code display
  User->>Exporter: Clicks "Download n8n Workflow (.json)" or "Copy JSON"
  Exporter-->>User: Delivers valid importable n8n workflow file
```

---

## 5. Flow 4: Self-Service Customer Billing Portal

```mermaid
sequenceDiagram
  autonumber
  actor Subscriber as Retainer Client ($19,999/mo)
  participant Client as Web Client
  participant PortalAPI as /api/stripe/portal
  participant StripePortal as Stripe Customer Portal

  Subscriber->>Client: Clicks "Manage Billing" in Header / Settings
  Client->>PortalAPI: POST /api/stripe/portal { session_id or customer_id }
  PortalAPI->>StripePortal: stripe.billingPortal.sessions.create({ customer, return_url })
  StripePortal-->>PortalAPI: Returns { url: "https://billing.stripe.com/p/session/..." }
  PortalAPI-->>Client: Returns { url }
  Client->>StripePortal: Redirects to Stripe Customer Portal
  Subscriber->>StripePortal: Downloads past invoices, updates payment card, manages seats
```
