---
name: design-reference-catalog
description: Process/Note derived from design-reference-catalog.md
source_path: prospect-pal-landing-page-build/project/uploads/artifacts-2/design-reference-catalog.md
---

# design-reference-catalog.md

## Context
This skill provides knowledge, processes, and instructions derived from the document: `design-reference-catalog.md`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

# Design Reference Catalog

Use this catalog to establish interaction and visual direction. These are inspiration references, not code, layouts, or assets to copy. Confirm availability and licensing at build time.

## Selection process

1. Identify the primary product motion: chat-first, dashboard-first, workflow-first, service-sales, or commerce.
2. Select one primary reference and at most two supporting references.
3. Extract principles, not pixels: hierarchy, navigation, density, tone, motion restraint, conversion placement, and state design.
4. Turn the extraction into original tokens, components, and acceptance criteria.
5. Validate the result against brand, accessibility, mobile behavior, and the core JTBD.

## References

| Reference | Best for | Extract | Do not copy |
|---|---|---|---|
| AI Chat SaaS Dashboard UI Design — Dribbble shot 27043577 | Chat-first AI workspace | Calm hierarchy, restrained gradients, clear chat-mode controls, low visual noise | Exact screen composition, artwork, or branded elements |
| AgentX AI Chatbot SaaS Landing Page — Dribbble shot 27659806 | AI SaaS landing page | Clear hero-to-CTA rhythm, product credibility, modular benefit sections | Copy, logos, illustrations, or exact layout |
| The Unified Interface for LLMs — Dribbble shot 27664640 | Multi-model AI platform | Model-selection clarity, platform positioning, structured explanation of complex capability | Proprietary interface treatment |
| Modelence SaaS AI Platform — Dribbble shot 27593794 | Premium data/AI platform | Trust cues, feature hierarchy, dense-but-scannable product storytelling | Visual assets and code |
| AI Chat SaaS Landing Page — Dribbble shot 27170763 | Modern LLM landing experience | Outcome-led landing narrative, progressive product reveal, conversion placement | Pixel-for-pixel page structure |
| Lazylines AI Creator Chat Interface — Dribbble shot 27171536 | Creator-oriented generative tool | Prompt/output workflow visibility, creative controls, approachable UI density | Any creator artwork or unique interaction assets |

## Reusable frontend templates

| Template | Routes | Core components | Best use |
|---|---|---|---|
| Chat workspace | `/`, `/pricing`, `/app/chat`, `/app/history`, `/app/settings` | Conversation rail, composer, streamed message, tool approval card, sources panel | Agent, copilot, research, support |
| SaaS dashboard | `/`, `/pricing`, `/app`, `/app/analytics`, `/app/billing`, `/app/settings` | KPI cards, activity feed, filters, empty states, plan meter | B2B workflow and operations product |
| Productized service | `/`, `/services`, `/case-studies`, `/checkout`, `/app/portal` | Offer selector, intake wizard, order timeline, deliverable area | Agencies and service workflows |
| Marketplace | `/`, `/explore`, `/listing/[id]`, `/checkout`, `/app/orders` | Search/filter, listing card, trust badge, seller/buyer portal | Multi-sided transactions |
| Creator commerce | `/`, `/store`, `/product/[slug]`, `/checkout`, `/app/library` | Media hero, product cards, license selector, purchase library | Digital goods and memberships |

## Design acceptance checklist

- One obvious primary action per key screen.
- Navigation exposes the primary JTBD without hidden critical paths.
- Every async interaction has loading, success, empty, permission-denied, and recoverable-error states.
- Color contrast, focus indication, semantic structure, and keyboard operation are intentional.
- Mobile layout preserves the conversion and core completion path.
- Marketing CTA, authentication, checkout, entitlement, and in-app activation flow are continuous.
- Original assets and design tokens are used; no third-party visual work is copied.
