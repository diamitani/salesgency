---
artifact_type: specifications
project_id: salesgency
version: v5.0.0
status: approved
owner: eng
reviewers: [eng, security, devops]
well_architected_review: pass
upstream: [prd@v5.0.0, ia@v5.0.0]
confidence: 1.0
---

# 09. SalesGency Functional & Non-Functional Specifications

## 1. Functional Interface Specifications

### 1.1 Stripe Checkout Session Creation
- **Endpoint:** `POST /api/stripe/create-checkout-session` (or `POST /api/stripe` with path routing)
- **Request Body (JSON):**
  ```json
  {
    "product": "build-session",
    "email": "buyer@acmecorp.com",
    "success_url": "https://salesgency.com/checkout-success.html?session_id={CHECKOUT_SESSION_ID}",
    "cancel_url": "https://salesgency.com/pricing.html"
  }
  ```
- **Response (JSON):**
  ```json
  {
    "url": "https://checkout.stripe.com/c/pay/cs_live_..."
  }
  ```
- **Error Codes:**
  - `400 Bad Request`: Unknown product slug or missing parameters.
  - `405 Method Not Allowed`: Non-POST method requested.
  - `500 Internal Server Error`: Stripe API failure (with sanitized error message).

### 1.2 Webhook Processing & Idempotency
- **Endpoint:** `POST /api/stripe/webhook`
- **Headers:** `stripe-signature: t=...,v1=...`
- **Supported Events:**
  - `checkout.session.completed`
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `invoice.paid`
  - `invoice.payment_failed`
- **Response:** `HTTP 200 OK` `{ "received": true }`

### 1.3 Agent Prompt Synthesis
- **Endpoint:** `POST /api/agent`
- **Request Body:**
  ```json
  {
    "prompt": "Create cold outbound campaign with Clay waterfall and Smartlead sync",
    "mode": "automation",
    "stack": ["Clay", "Apollo", "n8n", "Smartlead"]
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "workflow": {
      "name": "Autonomous Revenue Engine",
      "nodes": [...],
      "connections": {...}
    },
    "script": "curl -X POST ...",
    "metadata": { "nodes_count": 5, "latency_ms": 240 }
  }
  ```

---

## 2. Non-Functional Specifications & SLOs

| Concern | Baseline Target (v5.0) | Scale Target (10M MAU) |
|---|---|---|
| **Availability (SLO)** | 99.99% monthly uptime | 99.999% multi-region |
| **Edge TTFB (p95)** | < 50ms | < 25ms |
| **API Latency (p95)** | < 400ms (origin) | < 200ms (edge compute) |
| **RPO (Recovery Point)** | 0 seconds (Stripe is truth) | 0 seconds |
| **RTO (Recovery Time)** | < 5 minutes (Vercel redeploy) | < 1 minute (Anycast DNS failover) |
| **A11y Standard** | WCAG 2.2 AA (100 Lighthouse) | WCAG 2.2 AAA on reading text |

---

## 3. Data Classification & Security Boundaries

| Data Class | Examples | Controls & Restrictions |
|---|---|---|
| **Public** | Marketing copy, product catalog, public pricing | Edge cached, globally readable |
| **Internal** | Serverless execution metrics, non-PII telemetry | Restrict to engineering logs |
| **Confidential** | Customer email, session IDs, client prompt schemas | TLS in-flight, short-lived memory only |
| **Restricted** | Stripe Secret Key, Webhook Secret Key | Encrypted env vars, zero client access |
