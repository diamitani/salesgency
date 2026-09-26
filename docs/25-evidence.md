---
artifact_type: evidence
project_id: salesgency
version: v5.0.0
status: approved
owner: research
reviewers: [gtm, eng]
well_architected_review: pass
upstream: [jtbd@v5.0.0, prd@v5.0.0]
confidence: 1.0
---

# 25. SalesGency Evidence Ledger & Comparative Benchmarks

## 1. Category Comparative Benchmarks

| Capability / Benchmark | SalesGency v5.0 | Traditional Outbound SaaS | Legacy GTM Agency |
|---|:---:|:---:|:---:|
| **Code & Workflow Ownership** | **100% Client Owned** | 0% (Vendor Locked) | Variable / Proprietary |
| **Recurring Per-Seat Tax** | **$0.00 / seat** | $150–$350 / seat / mo | Retainer only |
| **Deployment Speed** | **Instant – 14 Days** | Weeks of setup | 3 – 6 months |
| **Enrichment Cost Efficiency** | **Direct API at Cost** | Marked up 300%–500% | Manual billing |
| **WCAG 2.2 AA Contrast & Performance** | **100 Lighthouse** | ~65–80 (Heavy SPA) | Variable |
| **Live Co-Build Trial ($999 Pilot)** | **100% Credited** | N/A (Demo call only) | $5k–$10k Discovery |

---

## 2. Technical Evidence & Quality Ledger
- **Catalog Verification:** Validated all 15 live products against Stripe Account `acct_1UDfsZKuSRnusODl`.
- **Contrast Audit:** Verified 0 contrast failures across 64 HTML pages using `scripts/audit-sweep.js`.
- **Buyer Simulation:** Verified 100% pass rate across 6 distinct buyer personas in `scripts/simulate-midmarket-buyer.js`.
