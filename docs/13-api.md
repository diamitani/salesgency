---
artifact_type: api
project_id: salesgency
version: v5.0.0
status: approved
owner: eng
reviewers: [eng, api]
well_architected_review: pass
upstream: [specifications@v5.0.0, data-model@v5.0.0]
confidence: 1.0
---

# 13. SalesGency API Contract & Endpoint Map

## 1. Overview
SalesGency provides serverless API handlers serving commerce, agent generation, and catalog queries.

---

## 2. Endpoint Specifications

### 2.1 Public Config Endpoint
- **Route:** `GET /api/stripe/config` (or `GET /api/stripe?action=config`)
- **Description:** Returns public publishable key for client SDK initialization.
- **Response:**
  ```json
  {
    "publishableKey": "pk_live_51UDfsZKuSRnusODlxFPAoZApYKnEUT7VAf2WbklbCMMCm9uNNvaEHsLSQeTp0N6rSboaTa3UT9EZ54xivWFa9W1b00zE7gB2YT"
  }
  ```

---

### 2.2 Create Checkout Session Endpoint
- **Route:** `POST /api/stripe/create-checkout-session` (or `POST /api/stripe`)
- **Description:** Creates a Stripe-hosted checkout session with automated tax calculations.
- **Request:**
  ```json
  {
    "product": "build-session",
    "email": "executive@company.com",
    "success_url": "https://salesgency.com/checkout-success.html?session_id={CHECKOUT_SESSION_ID}",
    "cancel_url": "https://salesgency.com/pricing.html"
  }
  ```
- **Response:**
  ```json
  {
    "url": "https://checkout.stripe.com/c/pay/cs_live_..."
  }
  ```

---

### 2.3 Stripe Webhook Listener
- **Route:** `POST /api/stripe/webhook`
- **Headers:** `stripe-signature`
- **Description:** Validates HMAC-SHA256 signature and handles billing lifecycle events.
- **Response:**
  ```json
  {
    "received": true
  }
  ```

---

### 2.4 Agent Generation Endpoint
- **Route:** `POST /api/agent`
- **Description:** Synthesizes custom n8n workflow JSON graphs and execution commands.
- **Request:**
  ```json
  {
    "prompt": "Synthesize outbound Clay waterfall with Smartlead sequencer",
    "mode": "automation",
    "stack": ["Clay", "n8n", "Smartlead"]
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
    "metadata": {
      "nodes_count": 5
    }
  }
  ```

---

### 2.5 Catalog Resolver Endpoint
- **Route:** `GET /api/catalog`
- **Description:** Returns active product and skill catalog.
- **Response:**
  ```json
  {
    "products": [...],
    "count": 15
  }
  ```
