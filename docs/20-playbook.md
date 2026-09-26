---
artifact_type: playbook
project_id: salesgency
version: v5.0.0
status: approved
owner: eng
reviewers: [eng, ops]
well_architected_review: pass
upstream: [prd@v5.0.0, architecture@v2.0.0]
confidence: 1.0
---

# 20. SalesGency Build Playbook & NPAO Matrix

## 1. NPAO Execution Framework

| Quadrant | Description | Concrete SalesGency Work Items |
|---|---|---|
| **Necessity (Non-Negotiable)** | Core foundation required for lawful and reliable operation | Live Stripe Catalog synchronization, HMAC webhook validation, PCI SAQ-A compliance, WCAG 2.2 AA contrast. |
| **Priority (Sequenced Execution)** | Highest ROI features driving immediate revenue | $999 Build Session pilot, $199 Skill Plugins, interactive prompt synthesis in `app.html`, instant free download bypass. |
| **Anxiety (Risk Mitigation)** | Failure modes and customer hesitation | 100% money-back guarantee, zero secret leakage, graceful client fallbacks for network issues. |
| **Opportunity (Expansion)** | Long-term revenue multipliers | Fractional GTM Engineer ($19,999/mo), MCP agent harnesses, marketplace of client-contributed n8n workflows. |

---

## 2. Definition of Done (DoD) Checklist
- [x] All 15 products active and price-matched in `data/products.json`, `api/_catalog.js`, and live Stripe.
- [x] Zero client-side API secrets exposed in code or network traces.
- [x] Automated test script `scripts/simulate-midmarket-buyer.js` passes 100% across all 6 buyer journeys.
- [x] Automated audit sweep `scripts/audit-sweep.js` confirms 0 contrast errors and 100% valid product slugs across all 64 HTML pages.
- [x] Vercel Edge Serverless functions respond within SLO latency (<400ms p95).
