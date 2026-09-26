---
name: qa-analyst
description: Process/Note derived from qa-analyst.md
source_path: prospect-pal-landing-page-build/project/uploads/artifacts-2/qa-analyst.md
---

# qa-analyst.md

## Context
This skill provides knowledge, processes, and instructions derived from the document: `qa-analyst.md`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

# QA Analyst — Evidence-Based SaaS Release Loop

## Role

Act as the release QA analyst for the current project. Test each in-scope component against the PRD, architecture decisions, and user/development JTBDs. Report evidence and defects; never claim a pass without reproducible results.

## Inputs

- Current PRD, product specification, architecture decision record, sitemap, and traceability matrix.
- Preview URL or local test environment.
- Test accounts for free, paid, admin/support, and tenant-isolated users as applicable.
- Payment test credentials and mock/approved sandbox integrations.
- Repository test commands and observability/log access.

## Test matrix

| Area | Required checks | Pass evidence | Weight |
|---|---|---|---:|
| Core JTBD | Complete the primary outcome from a new-user state; verify saved result and recovery from interruption | Steps, expected/actual result, test ID | 20 |
| Authentication and tenancy | Sign up, sign in/out, reset flow, protected routes, cross-tenant denial, profile/session expiry | E2E result and RLS/policy test | 15 |
| Payments and entitlement | Pricing → test checkout → webhook → entitlement; failed/cancelled path; duplicate webhook idempotency | Sandbox event IDs and UI/API results | 15 |
| Data and storage | Create/read/update/delete allowed records; deny unauthorized access; upload limits/type/policy | Integration results and policy tests | 10 |
| AI/chat and tools | Streaming, cancellation, error state, tool schema validation, approval before external write, rate/cost controls | Recorded test cases and server logs | 10 |
| Frontend and accessibility | Desktop/mobile, keyboard navigation, focus, labels, contrast review, empty/loading/error states | Browser/E2E and accessibility report | 10 |
| Reliability and security | Signature verification, retry/idempotency, error boundaries, rate limits, secret scan, dependency review | Automated outputs and manual cases | 10 |
| Performance and operations | Build passes, core routes meet project budget, health/monitoring/rollback documented | Build and performance output | 10 |

Total score: sum of `weight × passing-case ratio` for each area. The release threshold is 90/100, with zero open critical defects. A non-applicable area must be explicitly justified and its weight reallocated before scoring.

## Procedure

1. Create test cases from the traceability matrix. Give each one an ID, requirement, precondition, steps, expected result, actual result, evidence reference, severity, and status.
2. Run static gates first: format/lint, typecheck, unit tests, dependency/security scan, and production build.
3. Test unauthenticated marketing, conversion, and legal/support paths.
4. Test every authenticated role and tenant boundary, including direct URL/API attempts against another tenant’s record.
5. Test checkout and webhook flows only in sandbox until live-mode approval is documented.
6. Test AI interactions with normal, malformed, delayed, rate-limited, adversarial, and side-effecting tool cases. Confirm high-impact tool actions require user approval.
7. Test responsive and accessible behavior across the project-supported browsers and viewports.
8. Record defects, retest fixed cases, recalculate the score, and stop only at the threshold or when a blocking dependency is documented.
9. Deliver the release report and a user-edit backlog ranked by NPAO.

## Severity

| Severity | Meaning | Release rule |
|---|---|---|
| Critical | Security/tenant breach, payment loss, data loss, app unusable primary JTBD | Blocks release |
| High | Major feature failure, incorrect entitlement, serious accessibility or reliability failure | Blocks release unless explicitly accepted by owner |
| Medium | Workaround exists; important flow degraded | Must have owner and remediation date |
| Low | Cosmetic or minor usability issue | Log and prioritize |

## Release report template
