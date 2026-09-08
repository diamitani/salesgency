# Asana — Delali Development Cycle Master Template

**Workspace (resolved):** Product Development (`1209554147627141`)  
**Fallback:** Diamitani Industries, Incorporated. (`1217616799444463`)  
**Project name:** Delali Development Cycle — Master Template  
**View:** List  
**How to reuse:** Duplicate this project for every new site. Do not execute work in the template itself.

Education text (grade 7) lives in each task description. Executive “done when” is the last line.

Custom fields to add if the workspace allows: Site type (enum), Stage (enum), Quality (number), Education (enum on/off), PAL status, Approval.

---

## Section 0 — Settings (copy into project notes)

Site types: ecommerce | marketing_agency | chat_agent | web_app | saas | b2b | mobile | directory | gallery_portfolio | other

Default: `education_mode = on`. GTM = on. Payments = auto.

Hardcoded command: any new site request starts at Intake. No magic prompt.

---

## Tasks to create (in order)

Use `resource_subtype: section` where the API allows, else prefix names with the section title.

### Intake
1. **INTAKE — Write what we heard** — Teach: so we do not invent a new product tomorrow. Done when: `intake/v1` saved (goal, type, files, links). PAL parse complete.
2. **INTAKE — One question if needed** — Money, login, or who owns data. Never more than one open question.
3. **INTAKE — Goal, mission, keys, value proposition** — Help them write it if missing. Executive one-liner + proof.

### Documentation (PAL + ROSTR)
4. **PAL — Ambiguity scan** — Label stated vs guessed.
5. **PAL — Latent intent** — When / I want / so I can.
6. **ROSTR — Intent spec** — Fence, non-goals, acceptance.
7. **ROSTR — Evidence + resource map** — 3 peer sites; score visual, IA, SEO, trust, speed. “Upwork-level?” is a gap score.
8. **ROSTR — JTBD** — Primary job + metric.
9. **ROSTR — NPAO playbook** — Now = landing + identity + pay-if-needed + core job.
10. **DOCS — Stories, IA, sitemap, flows**
11. **DOCS — PRD + specifications**
12. **DOCS — Architecture + six Well-Architected answers**
13. **DOCS — Frontend UI spec** — landing, OAuth, pricing, checkout, chat as applicable; AIDA on marketing copy.
14. **DOCS — Backend / secrets / hosting / versioning**
15. **DOCS — Payments spec or written waiver**
16. **GTM — ICP, persona, channels, AIDA, campaigns, inbound SLA, brand**
17. **GATE — Quality plan ≥ 4/5** — Unlock scaffolding only after this task.

### Scaffolding
18. **SCAFFOLD — Duplicate GitHub template / folders / AGENTS.md / skills**

### Scripts
19. **SCRIPTS — Schema + RLS tests**
20. **SCRIPTS — Auth + core job**
21. **SCRIPTS — Stripe webhook idempotency (if pay)**

### Connecting
22. **CONNECT — OAuth, email, secrets names only** — Approval required.

### Deploying
23. **DEPLOY — Preview** — Approval required.
24. **DEPLOY — Production** — Approval required. `/ready` green.

### Testing
25. **TEST — Playwright critical path + a11y**

### Refining
26. **REFINE — Taste + SEO vs resource map**

### Maintaining
27. **MAINTAIN — Runbook, backup drill, cost alert, learning loop**

### Project 2 (later, not in v1 Now)
28. **LATER — Builder portal + Electron desktop (compete on operator UX)** — Out of scope for a client site; this is the DDC product.

---

## Duplicate rule

When starting a client or product:

1. Duplicate project.
2. Set site type.
3. Assign Intake to the operator.
4. Agents or humans may not check GATE-Quality until artifacts exist.
5. Connecting and Deploying stay approval tasks.
