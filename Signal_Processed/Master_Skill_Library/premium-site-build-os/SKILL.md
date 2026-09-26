---
name: premium-site-build-os
description: Process/Note derived from premium-site-build-os.md
source_path: Prospect Automation Engine Frontend/uploads/premium-site-build-os.md
---

# premium-site-build-os.md

## Context
This skill provides knowledge, processes, and instructions derived from the document: `premium-site-build-os.md`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

# Premium Site Build Operating System

**Codename:** Site Empire OS  
**Version:** 1.0.0  
**Status:** Canonical — use as README, `soul.md`, `SKILL.md`, or instruction pack  
**Owner:** Builder / operator (you)  
**Governing frameworks:** PAL (Parse → Ambiguity Scan → Latent Intent → Expand → Compile) · Software Development Life Cycle · AWS Well-Architected Framework (six pillars)

This is the single operating system for producing any premium site: marketing, SaaS, marketplace, creator platform, e-commerce, community, or agent console. It is written so an engineer, designer, or coding agent can execute without inventing process. Every future project starts here. No phase is optional. Beauty without payments is a brochure. Payments without architecture is a liability. Architecture without taste is a spreadsheet.

---

## 0. How to use this document

### 0.1 Roles this file can play

| Filename | When to use |
|---|---|
| `README.md` | Human operators and contractors. Read first. |
| `soul.md` | Agent identity, mission, denied tools, evaluation. |
| `SKILL.md` | Agent skill: when to trigger, inputs, outputs, checklists. |
| `instruction-pack.md` | Full build brief handed to a coding agent. |
| `AGENTS.md` | Repo-root rules for Cursor / Claude Code / Codex. |

Copy the soul and skill sections at the end of this file into those filenames. Keep this file as the system of record.

### 0.2 Non-negotiable invariants

1. PAL precedes execution. Do not write production code before intent, IA, architecture, and a PRD exist.
2. Artifacts are versioned, immutable, and traceable (`org/project/run/artifact/version`).
3. Secrets never live in git, client bundles, chat logs, or screenshots.
4. Side effects (payments, deploys, emails, repo writes, spend) require explicit approval.
5. Accessibility, responsive design, and security are not later phases.
6. Scale is designed in, not bolted on. Day-one architecture must not block ten-million users even if it does not yet provision for them.
7. Taste is a quality gate. Generic AI-slop UI is a defect.
8. Every screen that takes money, identity, or private data has error, empty, loading, success, and denied states.

### 0.3 Definition of premium

A site is premium only if all of the following are true:

- A stranger can understand the offer in five seconds.
- A user can create an account with OAuth, pay, and reach the core job in under three minutes.
- Visual hierarchy, type, motion, and spacing look intentional (Taste Skill / design-taste-frontend).
- Core flows work on mobile, tablet, and desktop with WCAG 2.2 AA contrast and keyboard access.
- Payments are PCI-aware (Stripe or equivalent), webhook-verified, tax-capable, and refundable.
- The system is observable, backed up, secret-managed, and recoverable.
- The product can grow from 1 user to 1B users by changing **capacity and topology**, not by rewriting the product model.

---

## 1. Doctrine: PAL × SDLC × Well-Architected

### 1.1 PAL (always first)

| Step | Question | Output |
|---|---|---|
| **Parse** | What was explicitly asked? Audience, stack, features, constraints. | Intake record |
| **Ambiguity Scan** | What is missing? Auth, payments, errors, breakpoints, data ownership, tenancy. | Clarification list (one material question at a time) |
| **Latent Intent** | What job is the user hiring this site to do? | JTBD + success metric |
| **Expand** | Color, type, IA, schema, APIs, threats, cost, scale path. | Design system + architecture + data model |
| **Compile** | Production specs and executable next step. | PRD, playbook, instruction pack, code |

PAL maps to ROSTR’s pipeline: intake → intent-spec → evidence → JTBD → NPAO plan → instruction pack → PRD → quality gate.

### 1.2 SDLC (always around PAL)

| SDLC phase | PAL / docs | Infra / product |
|---|---|---|
| Planning | Intent spec, JTBD, roadmap, budget, risk | Org, domains, billing account, tags |
| Analysis | PRD, user stories, constraints, tenancy | Threat model, data classification |
| Design | IA, sitemap, system architecture, UI spec, API spec | Stack decision record |
| Development | Component code, schema, secrets wiring | Feature flags, preview deploys |
| Testing | Acceptance criteria, a11y, load, security | CI, eval fixtures, contract tests |
| Deployment | Runbook, rollback, versioning | CDN, DNS, WAF, canary |
| Maintenance | Changelog, learning loop, support | Backups, on-call, cost review |

### 1.3 AWS Well-Architected pillars (gates on every artifact)

The framework exists so architectural decisions are conscious, measurable, and remediable — not an audit theater. Apply all six pillars to every workload, including a Vercel + Supabase stack that later moves heavy pieces onto AWS.

| Pillar | Meaning | Site-build translation |
|---|---|---|
| **Operational excellence** | Run as code, small reversible changes, observe, improve after failure | IaC, CI/CD, runbooks, dashboards, blameless postmortems |
| **Security** | Protect identity, infra, data, incident response | Least-privilege IAM, MFA, encryption, audit logs, segmentation, automated detection |
| **Reliability** | Keep working through failure and demand change | Multi-AZ / replicas, backups, health checks, queues, retries, autoscaling |
| **Performance efficiency** | Right resources, evolve with data | Caching, edge, managed services, measure bottlenecks, scale on real load |
| **Cost optimization** | Value without idle waste | Tags, right-size, serverless where it fits, budgets, kill unused |
| **Sustainability** | Lower environmental impact | High utilization, efficient regions, no zombie environments, right-size images |

**WAF review cadence:** after architecture freeze, before first paid launch, at 10k / 100k / 1M MAU, after any Sev-1, and when entering a new region.

---

## 2. Artifact catalog (required documents)

No production build starts until these artifacts exist at `draft` or better. Status values: `missing` · `draft` · `review` · `approved` · `superseded`.

### 2.1 Document set

| # | Artifact | Filename | Owner | Exit criteria |
|---|---|---|---|---|
| 01 | Intent spec | `docs/01-intent-spec.md` | Product | Problem, users, scope, non-goals, assumptions, acceptance signals |
| 02 | JTBD report | `docs/02-jtbd.md` | Product | Primary/secondary jobs, success metrics, switching triggers |
| 03 | User stories | `docs/03-user-stories.md` | Product | INVEST stories, acceptance tests, personas |
| 04 | Information architecture | `docs/04-ia.md` | Design | Objects, navigation, taxonomy, permissions by object |
| 05 | Sitemap | `docs/05-sitemap.md` | Design | Every URL, auth gate, SEO intent |
| 06 | User flows | `docs/06-flows.md` | Design | Onboarding, OAuth, pay, core job, chat, cancel |
| 07 | Design system / taste brief | `docs/07-design-system.md` | Design | Type, color, motion, anti-slop, dark mode |
| 08 | PRD | `docs/08-prd.md` | Product | Problem, solution, requirements, metrics, rollout |
| 09 | Functional + non-functional spec | `docs/09-specifications.md` | Eng | APIs, SLOs, threats, data classes |
| 10 | System architecture | `docs/10-architecture.md` | Eng | C4 L1–L3, sequence diagrams, failure modes |
| 11 | Stack decision record | `docs/11-stack-adr.md` | Eng | Choice, why, alternative, invalidation |
| 12 | Data model | `docs/12-data-model.md` | Eng | ERD, RLS, retention, PII |
| 13 | API contract | `docs/13-api.md` | Eng | OpenAPI or tRPC router map, errors, idempotency |
| 14 | Frontend UI spec | `docs/14-frontend-ui.md` | Design/Eng | Marketing, auth, pricing, checkout, app, chat |
| 15 | Backend / infra spec | `docs/15-backend-infra.md` | Eng | Compute, DB, storage, secrets, hosting, deploy, versions |
| 16 | Payments spec | `docs/16-payments.md` | Eng/GTM | Catalog, tax, webhooks, dunning, refunds |
| 17 | Security + privacy | `docs/17-security.md` | Eng | Threat model, DPA, cookies, logging redaction |
| 18 | Observability | `docs/18-observability.md` | Eng | Metrics, traces, logs, alerts, SLOs |
| 19 | Product roadmap | `docs/19-roadmap.md` | Product | Now / Next / Later mapped to scale stages |
| 20 | Build playbook | `docs/20-playbook.md` | Eng | Critical path, definition of done, gates |
| 21 | Quality scorecard | `docs/21-quality.md` | QA | Contract, a11y, security, taste, performance |
| 22 | Runbook + incident | `docs/22-runbook.md` | Ops | Deploy, rollback, restore, on-call |
| 23 | Legal pack | `docs/23-legal.md` | Operator | Terms, privacy, cookies, acceptable use, refunds |
| 24 | Instruction pack | `docs/24-instruction-pack.md` | Agent | Souls, tools, env, phased prompts |
| 25 | Evidence ledger | `docs/25-evidence.md` | Research | Sources, confidence, gaps |

### 2.2 Artifact envelope (every doc header)
