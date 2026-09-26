---
name: the-gtm-ai-platform--patrick-diamitani
description: Process/Note derived from The GTM AI Platform — Patrick Diamitani.pdf
source_path: Atlas Portfolio/The GTM AI Platform — Patrick Diamitani.pdf
---

# The GTM AI Platform — Patrick Diamitani.pdf

## Context
This skill provides knowledge, processes, and instructions derived from the document: `The GTM AI Platform — Patrick Diamitani.pdf`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

7/17/26, 3:06 PM

The GTM AI Platform — Patrick Diamitani

Patrick Diamitani / ENTERPRISE AI PRODUCTION

LinkedIn ↗

Skill & Product Library / Platform
Platform

Live in production

The GTM AI Platform
Not one automation — the operating system a 50-person GTM org runs its AI adoption on.
40+ skills live across a 50-person org; idea-to-scoped-project cut from 4-8 hrs to under 30 min
Claude Skills

n8n

Ollama

platform

governance

ROSTR

Overview
Any single automation is a win. Fifty-plus reps and marketers using AI daily requires a system —
standards, reusable skills, project governance, and knowledge that survives its author. This is the
platform layer every other product in this portfolio runs on: a published build methodology (a
framework applied to every agent in the org), a project-intake engine that turns any raw idea into a
leadership-ready package in under 30 minutes, a 40+ skill library covering brand content, GTM
automation, chatbot management, and cross-session memory, and a self-hosted local AI
infrastructure for zero-API-key development. This is the Director-level story: not automations, but the
standards, governance, and observability layer that lets one person's work compound across fifty.

The Problem
One-off automations don't scale past their author. Without shared standards, every new skill reinvents
its own conventions, every new project idea takes hours of back-and-forth to scope, institutional
knowledge lives in one person's head, and there's no way for a non-technical org of 50+ to safely adopt
AI at the pace the business needs.

How It Works
https://diamitani.github.io/patrick-diamitani-portfolio/products/gtm-ai-platform.html

1/5

7/17/26, 3:06 PM

The GTM AI Platform — Patrick Diamitani

1. A published build methodology. A framework combining prompt compilation (setting technical
depth and framing for a given audience), jobs-to-be-done planning (what outcome the build
actually serves), a work-classification spine (navigate/prioritize/allocate/orchestrate — a
repeatable shape for any project), and provenance honesty (never presenting an inference as a
verified fact). Applied to every agent manifest built across the platform, so a new skill isn't a blank
page — it inherits a proven shape.
2. A project-intake engine. Takes any raw idea — text, files, links, a chat thread — and turns it into a
leadership-ready package: a PRD, an architecture diagram, a build plan, a KPI framework, and a
project-management export. Cut idea-to-scoped-project from 4–8 hours of manual scoping to
under 30 minutes, and made every resulting project auditable by anyone, not just its author.
3. A 40+ skill library for the GTM team. A brand suite (on-brand social/email/blog/proposal
generation using official fonts, colors, and logos — so content stays on-brand without a designer in
the loop for every post); a proposal & presentation builder (branded slide-deck output); a GTM
automation architect skill (enrichment/workflow/CRM automation expert, callable in plain English);
a workflow architect & engineer (turns a rough automation idea into a full technical spec); a chatbot
manager; a context-engine (persistent memory across AI sessions, so context doesn't reset every
conversation); the case-study builder that generated this very document; a token-spend analyst;
and more — each a reusable, packaged capability rather than a one-off script.
4. Local AI infrastructure. A self-hosted stack running an AI coding assistant against local open
models via a custom translation proxy — a small Python service that lets the assistant's API calls
target locally-run models instead of a hosted API. Persisted as background services (surviving
reboots without manual restarting) with a model-routing config, enabling zero-API-key
development and cost-controlled experimentation before anything touches production credentials.
5. Governance that compounds. Every skill inherits the same production discipline visible across this
portfolio: dry-run defaults, audit trails, ownership routing, and provenance honesty — so the system
gets safer as it gets bigger, not riskier.

Stack & Integrations
Tool

Role

Access needed

Claude / Anthropic ecosystem (skills, MCP
servers, agents)

The runtime every skill and
agent in the platform is built
on

Claude Code / Claude
access, org-level skill
deployment

Python

Intake engine logic, local
proxy service, analysis
pipelines

Local/sandboxed runtime

https://diamitani.github.io/patrick-diamitani-portfolio/products/gtm-ai-platform.html

2/5

7/17/26, 3:06 PM

The GTM AI Platform — Patrick Diamitani

Tool

Role

Access needed

n8n

Orchestration layer for
automation-heavy skills

n8n workspace

Background service manager (e.g.
launchd)

Persists local proxy + modelruntime services across
reboots

Local machine admin

Local model runtime (e.g. Ollama)

Local model runtime for
zero-API-key development

Local install

GTM SaaS stack (CRM, enrichment,
sequencing, call-intelligence, project
management, intent data, productivity
suite)

The systems every
downstream skill in the
platform integrates with

Per-tool credentials, scoped
per skill

Setup Process
1. Stand up an AI coding/skill environment as the org's shared skill-execution runtime.
2. Publish a build methodology spec as the required shape for any new skill or agent build.
3. Deploy a project-intake skill as the front door for any new automation idea — text, file, or link in,
leadership package out.
4. Roll out the skill library in phases (brand suite first for immediate content value, then automationfacing skills).
5. Stand up a context-engine for persistent cross-session memory once the team is running enough
recurring work to benefit from it.
6. Optionally stand up local AI infrastructure (local model + translation proxy + background services)
for cost-controlled experimentation separate from production API spend.
7. Establish a lightweight review cadence so the skill library doesn't drift from the standard.

What You Need
[ ] AI coding/skill environment access for the org (or at minimum, for the platform owner)
[ ] A written intake/PRD convention the org will actually follow
[ ] Time to build the first 5–10 skills against the standard before the library reaches critical mass
[ ] Optional: a local machine for the local-model/proxy infrastructure if cost-controlled local
development is a priority
[ ] Executive sponsorship — this is a Director-level platform investment, not a single automation
https://diamitani.github.io/patrick-diamitani-portfolio/products/gtm-ai-platform.html

3/5

7/17/26, 3:06 PM

The GTM AI Platform — Patrick Diamitani

Results

40+ skills shipped and in active use across a 50+-person GTM org.
Idea-to-scoped-project time cut from 4–8 hours to under 30 minutes via the project-intake engine.
Every project in the portfolio traces back to the same build methodology — meaning a new hire (or
a hiring committee) can read any one build and understand the standard behind all of them.
Local AI infrastructure enables zero-API-key experimentation, decoupling exploration cost from
production spend.

Challenges & Fixes

Every new skill reinventing its own conventions → a published build spec that every new build
inherits from day one.

New project ideas taking hours of back-and-forth to scope before any work started → a selfserve intake engine that turns raw input into a full leadership package in under 30 minutes.

Institutional knowledge living in one person's head → a documented skill library plus a
persistent context-engine so work compounds instead of resetting.

AI experimentation cost competing with production budget → a local, self-hosted model stack
for exploration, fully decoupled from hosted API spend.

Demonstrates
This is the Director-level story: not automations, but an operating system for a GTM org's AI adoption
— standards, governance, reusable components, cost control, observability, and a documentation
culture, built by one person and used by fifty.

STACK & INTEGRATIONS
Claude Skills/MCP
Factors.ai

n8n

Ollama

HubSpot

Clay

Amplemarket

Avoma

Asana

Microsoft 365

WHAT IT NEEDS

✓ AI coding/skill environment access for the org
✓ A written intake/PRD convention (e.g. ROSTR or your own equivalent)
✓ Time to build the first 5-10 skills against the standard
https://diamitani.github.io/patrick-diamitani-portfolio/products/gtm-ai-platform.html

4/5

7/17/26, 3:06 PM

The GTM AI Platform — Patrick Diamitani

✓ Executive sponsorship — a platform investment, not a single automation
DISCUSS THIS BUILD

Happy to walk through the architecture, the failures along the way, or how this could translate to your team.

Email Patrick

© 2026 Patrick Diamitani. Case studies anonymized for public portfolio use — no employer-identifying or client-identifying detail
included.
pdiamitani@atlashxm.com · linkedin.com/in/diamitani

https://diamitani.github.io/patrick-diamitani-portfolio/products/gtm-ai-platform.html

5/5
