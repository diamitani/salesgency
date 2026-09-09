---
name: inbound-automation-engine
description: "Master Inbound Speed-to-Lead Automation Engine. Orchestrates sub-minute webhook ingest, 7-class GPT-4o intent triage (Speak with Sales, Partnership, Career, Support, Press, Verification, General), dynamic country & question-aware follow-up email synthesis, and real-time CRM / Slack routing."
version: "2.4.0"
author: "Patrick Diamitani (SalesGency®)"
compatibility: ["Claude 3.5 Sonnet", "GPT-4o", "Gemini 1.5 Pro", "Cursor", "Antigravity", "n8n"]
---

# Inbound Automation Engine (IAE) — Architecture & Prompt Spec

Use this skill when designing, compiling, or executing sub-minute inbound speed-to-lead automation pipelines for high-velocity B2B revenue teams.

---

## ⚡ Core Operational Principles

1. **Sub-Minute Response Velocity (< 28s)**:
   Inbound buyers are 21x more likely to convert if contacted within 5 minutes. The IAE triggers instantly via form webhook, enriches company firmographics, scores intent, and drafts a human personalized response within 28 seconds.

2. **7-Class Intent Classification Engine**:
   Evaluates raw submission messages and routes them accurately:
   - `Speak with Sales`: Prospect seeking quote, demo, pricing, or international capability.
   - `Partnership Enquiry`: Integration, reseller, referral, or alliance proposals.
   - `Career Enquiry`: Job seekers, CV submissions, employment checks.
   - `Customer Support`: Existing account assistance, billing, portal access.
   - `Press Enquiry`: Journalists, media interviews, public statements.
   - `Employment Verification`: HR / background check requests.
   - `General Enquiry`: Vendor pitches, spam, or miscellaneous queries.

3. **Dynamic Conversational Email Generator (Non-Salesy / Anti-Slop)**:
   - Avoids generic corporate templates ("Thank you for sharing your objectives...").
   - Acknowledges specific prospect questions without over-answering prematurely.
   - Natural country/region context routing.
   - Low-friction meeting invitation with calendar signature hook.

---

## 📐 Production n8n Node Graph Spec

```
[ Inbound Form Webhook ] ──> [ HubSpot Contact Check ] ──> [ GPT-4o 7-Class Intent Triage ]
                                                                      │
                                   ┌──────────────────────────────────┴──────────────────────────────────┐
                                   ▼ (Speak with Sales)                                                  ▼ (Other Intent)
                      [ AI Conversational Drafter ]                                              [ Route to Dedicated Dept ]
                                   │                                                                     │
                      [ Slack Deal Alert with Draft ]                                            [ Auto-Tag in CRM ]
                                   │
                      [ Auto-Send / 1-Click Approval ]
```
