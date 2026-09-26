---
artifact_type: stack-adr
project_id: salesgency
version: v5.0.0
status: approved
owner: eng
reviewers: [eng, architecture]
well_architected_review: pass
upstream: [architecture@v2.0.0]
confidence: 1.0
---

# 11. SalesGency Stack Decision Records (ADRs)

## ADR-001: Pure Semantic HTML5 + Vanilla CSS Design System over React/Next.js SPA

- **Status:** Approved
- **Context:** SalesGency is a high-authority GTM platform where instant first impressions, sub-50ms TTFB, zero bundle hydration overhead, and 100 Lighthouse scores directly impact conversion rates.
- **Decision:** Build the entire user-facing experience using semantic HTML5, modern CSS custom properties (`assets/salesgencytokens.css`, `assets/unified.css`), and modular vanilla JavaScript (`assets/unified-nav.js`, `assets/stripe-client.js`).
- **Consequences:**
  - *Positive:* 0KB JavaScript framework tax, 98–100 Lighthouse scores, immediate First Contentful Paint, zero hydration bugs.
  - *Negative:* Manual component updates across static HTML files (mitigated via unified script injection and automated audit sweeps).
- **Invalidation Trigger:** If the platform transitions into an enterprise multi-tenant collaborative canvas requiring rich real-time CRDT multiplayer state.

---

## ADR-002: Stripe-Hosted Checkout & Managed Payments over Embedded Elements

- **Status:** Approved
- **Context:** Minimizing PCI compliance burden, maximizing trust with executive buyers, and supporting global tax automation.
- **Decision:** Route all checkout requests to official Stripe-Hosted Checkout Sessions configured with automatic tax collection (`txcd_10000000`).
- **Consequences:**
  - *Positive:* PCI DSS SAQ-A qualification, automatic Apple Pay / Google Pay support, automated 3D Secure fraud handling, zero card data on servers.
  - *Negative:* User navigates temporarily away from domain (mitigated by immediate return to `/checkout-success.html`).
- **Invalidation Trigger:** Requirement for fully white-labeled in-canvas custom form fields without external redirection.

---

## ADR-003: Serverless Edge Functions (Vercel) over Dedicated Node Server

- **Status:** Approved
- **Context:** Cost optimization, zero idle infrastructure spend, and global low-latency execution for catalog and payment gateways.
- **Decision:** Deploy API routes (`/api/stripe.js`, `/api/agent.js`, `/api/builder.js`, `/api/catalog.js`) as Vercel Serverless Functions.
- **Consequences:**
  - *Positive:* Scale-to-zero compute costs, automated SSL termination, global edge caching.
  - *Negative:* Execution time limits (10s on hobby / 60s on pro), mitigated by fast sub-300ms execution times.
- **Invalidation Trigger:** Requirement for continuous long-running background tasks (>15 minutes) or real-time WebSocket multiplexing.
