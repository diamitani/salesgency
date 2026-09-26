# Scaffold Prompt Pack

Replace angle-bracket placeholders from the accepted build contract. Run prompts in order and require each stage to produce files plus verification evidence, not commentary only.

## 1. Repository scaffold

```text
You are the implementation lead. Build <product_name> from the accepted PRD and ADRs below.

Inputs: <prd>, <architecture_decisions>, <design_tokens>, <jtbd>, <repo_constraints>.

Create a production-oriented TypeScript repository. First output the complete directory tree. Then implement the smallest vertical slice that lets a new visitor: understand the offer, authenticate, enter the app, complete <primary_jtbd>, and see persisted tenant-scoped data.

Use only approved stack choices. Create .env.example with names only; never insert values. Add server-only configuration validation, database migrations, RLS/policies, typed domain models, error states, test setup, CI commands, README, and a decision log. Do not deploy or create cloud resources. End by running lint, typecheck, unit tests, and build; report exact evidence and open blockers.
```

## 2. Product UI

```text
Act as a senior product designer and React engineer. Implement original responsive UI for <product_name> using <selected_template> as an inspiration principle, not as material to reproduce.

Ship routes: <route_list>. Make the primary JTBD obvious within one screen. Define original tokens for color, typography, spacing, radius, elevation, motion, and states. Include loading, empty, validation, permission-denied, offline/retry, and error states. Ensure keyboard navigation, visible focus, semantic labels, responsive behavior, and no image or copy taken from reference sites.

Return changed files and browser-test evidence for desktop and mobile critical paths.
```

## 3. Auth, data, and storage

```text
Implement <auth_provider>, <database_provider>, and <storage_provider> for a multi-tenant app.

Requirements: all browser-accessible tables have RLS/policies; every record has tenant ownership; privileged keys are server-only; uploads enforce tenant-scoped object paths, MIME/type and size rules; APIs validate identity and input. Create migrations, policies, typed repository functions, integration tests proving allowed access and cross-tenant denial, and a rollback-safe migration note.

Do not create a cloud project or alter production. Do not store secrets in code.
```

## 4. Billing and CRM setup agent

```text
Implement an internal CRM setup agent for <crm_provider> and billing for <payment_provider>.

The agent may prepare configuration, validate environment-variable presence, generate import-safe field/property mappings, create test fixtures, and produce an approval-ready plan. It must not create live payment products, activate live billing, alter CRM records, or send emails without an explicit approval token.

Implement: pricing source of truth; test checkout; signed webhook verification; idempotent subscription/entitlement sync; failed, cancelled, refunded, and duplicate-event handling; event schema for lead_created, signup_completed, checkout_started, purchase_completed, and activation_completed. Include sandbox tests and a manual approval checklist.
```

## 5. AI/chat and enablement agent

```text
Implement <agent_name>, an in-product enablement agent that helps a signed-in user complete <primary_jtbd>.

Use a server-side provider adapter and typed tool schemas. The UI must show streaming, source/status where applicable, cancellation, retry, and tool-progress states. Tools are deny-by-default, timeout-bound, tenant-scoped, and validated. Any external write, message, purchase, deployment, permission change, or data deletion requires a clear in-product user confirmation and server-side approval check.

Add unit/integration tests for successful tool use, invalid arguments, denied authorization, timeout, provider failure, and approval refusal. Never expose provider keys to the browser.
```

## 6. QA remediation loop

```text
Act as the dedicated QA analyst. Use the provided test matrix and traceability table to test <preview_url_or_local_environment>.

Run static checks, core JTBD, auth/tenancy, billing/webhooks, data/storage, AI/tools, accessibility, security/reliability, and performance/operations. Capture reproducible evidence for each case. Calculate readiness as defined by the QA matrix. For every failed test, make the smallest safe code fix, rerun the failed test and affected regression tests, then update the report.

Do not claim a 90/100 score without evidence. Do not deploy production, use live billing, or invoke write-capable integrations without documented approval.
```
