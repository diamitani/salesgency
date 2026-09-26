---
name: patrick-diamitani-cv-full
description: Process/Note derived from Patrick Diamitani CV full.pdf
source_path: Patrick Diamitani CV full.pdf
---

# Patrick Diamitani CV full.pdf

## Context
This skill provides knowledge, processes, and instructions derived from the document: `Patrick Diamitani CV full.pdf`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

Patrick Diamitani

FORWARD DEPLOYED ENGINEER · GTM AND APPLIED AI SYSTEMS
Chicago, IL (open to relocation) · 319.930.0290 · patrick.diamitani@gmail.com
linkedin.com/in/diamitani · github.com/diamitani · diamitani.com · rostragent.com

SUMMARY

I build enterprise-grade production AI systems that non-technical teams rely on every day. I own AI strategy and
automation for the entire go-to-market organization at Atlas HXM, a global Employer of Record platform with about
500 employees across 160+ countries. The production library holds 16 systems, including a two-channel AI inbound
system credited with $9M+ in attributed pipeline and $16M+ in pipeline enabled overall.
Alongside that I author and maintain ROSTR, a published architecture for production-grade multi-agent systems, and
its open-source implementation. My path here ran through seven years of enterprise sales at Uber, Upwork, and
Techstars, which is why I can sit in the discovery call, translate what a customer actually needs, and then go build
and deploy it.
Every build ships to the same standard: LLMs handle messy language, deterministic unit-tested code decides
anything auditable, and nothing goes live without dry-run tests, a rollback plan, and shared error handling.

TECHNICAL STACK
Languages

Python · JavaScript / TypeScript · Node.js · React & Next.js · SQL and NoSQL · HTML/CSS · Bash

AI & Agents

OpenAI (Agents SDK, Responses API, Assistants, Custom GPTs) · Anthropic Claude (Claude Code,
Skills, Agents, Artifacts) · Google Gemini (API, ADK, AI Studio, Vertex) · AWS Bedrock, SageMaker,
AgentCore · Azure AI Foundry · Ollama and local inference · DeepSeek · RAG pipelines, evaluation
harnesses, prompt architecture

Agent runtimes

ROSTR Framework (author) · Hermes Agent · OpenClaw · Codex · OpenCode · Antigravity (Gemini)

Cloud

AWS: Lambda, S3, IAM, EC2/VPC, API Gateway, RDS, DynamoDB, Redshift, Cognito, Bedrock ·
Azure: Blob Storage, AI Search, Static Web Apps, Container Apps, App Services, AI Foundry, CI/CD
· Supabase · Vercel

Automation

n8n (event-driven multi-agent pipelines) · Make.com · Zapier · HubSpot workflows, webhooks,
and custom code · REST APIs and webhooks · Git/GitHub Actions · CLI tooling (AWS, GitHub,
Claude, Hermes)

GTM systems

HubSpot · Salesforce · Zoho · Clay · Amplemarket · Apollo · ZoomInfo · Gong · Reply.io · Voiceflow
· LinkedIn Sales Navigator

PUBLISHED RESEARCH: THE ROSTR FRAMEWORK

ROSTR: A Unified Architecture for Production-Grade Multi-Agent Systems with Phase-Aware Orchestration
and Persistent Knowledge Compounding. Sole author. Published on Zenodo with DOI, April 2026. 22,000 words,
27 references.
The framework defines four pillars for production multi-agent AI. PAL is a prompt abstraction layer that compiles
natural language into strictly typed agent manifests. NPAO is deterministic phase-aware orchestration with humanin-the-loop gates. RAG DAL is multi-pass retrieval with source-credibility tiers and contradiction detection. Rostr

Hub is persistent cross-session memory.
ROSTR Agent (rostragent.com · github.com/diamitani/rostr-agent) is the MIT-licensed open-source implementation,
built on the Hermes runtime with 41 production skills spanning GTM, development, content, data, automation,
and operations.
BENCHMARK: 200 TASKS ACROSS 8 DOMAINS, IDENTICAL MODEL, TEMPERATURE, AND TOOLS

+23pp task completion · +28pp first-attempt accuracy · +82pp cross-session knowledge retention · 33% lower token
cost per completed task

PROFESSIONAL EXPERIENCE

Atlas HXM | GTM AI & Automation Manager

Chicago, IL · Sep 2025 to Present

Own AI strategy and automation across sales, marketing, and RevOps at a global Employer of Record platform (about
500 employees, 160+ countries). The production library holds 16 systems used daily by 50+ non-technical reps and
marketers; my builds have enabled $16M+ in pipeline to date.
Prospect automation engine — an autonomous five-stage GTM pipeline. (1) Intent signal: ZoomInfo and
Factors.ai flags companies researching EOR / global hiring, written to HubSpot daily. (2) Qualification & routing:
n8n runs an eight-stage deterministic filter chain (employee count, geography, open deals, lifecycle stage, record
type, 30-day recency, competitor suppression, industry) with explicit round-robin territory assignment and 50state coverage self-check. (3) Enrichment: Clay waterfall people search with verified email, mobile, and secondary
phone; waterfall multi-source email verification; company and prospect research via Firecrawl live web search. (4)
Personalization: single schema-constrained LLM call generates three email bodies, three subject lines, and a painpoint analysis grounded in research findings, all stored as HubSpot message tokens. (5) Delivery: prospects
enrolled in Amplemarket with warmed per-rep dedicated mailboxes; Orum auto-queues call tasks. Architecture

→ Gen 2 (22 nodes,
→ Gen 3 (n8n + Clay, 43–55% open rate, 100% success, 75 companies/week). See

evolved across three generations (Nov 2025–Mar 2026): Gen 1 (59 nodes, 3.86% open rate)
optimized orchestration)

portfolio for architecture diagrams.

Inbound automation engine — two-channel system analyzing website chatbot and Contact Us form messages. An
intent classifier determines whether a submission is a sales inquiry (schedule follow-up), general question (send
help resources), press/partnership (route to founder), or spam (silently drop). For sales inquiries, an AI agent
drafts a personalized opening message, assigns the prospect to a rep via round-robin, stores the message in
HubSpot, and enrolls them in a welcome sequence. Combined with prospect automation, these two systems
attributed $9M+ in attributed pipeline and enabled $16M+ in total pipeline.
Designed and launched an automated EOR compliance-screening engine in n8n. An LLM reads messy CRM data
and a unit-tested rules engine makes the call. Corrected 100+ misclassified deals, more than doubled detection of
ineligible deals, perfect production write record with full audit trail.
Inherited a failing four-agent post-sales-call pipeline and rebuilt it from RAG-based design to deterministic
architecture. Zero successful end-to-end runs became fully verified production runs.
Owned a runaway AI and data-enrichment spend incident, then redesigned around a free eligibility gate and tiered
cost profiles. Spend per record dropped roughly 70%, enforced by architecture.
Built and published a 40+ skill AI automation library plus a self-serve project intake engine. Idea-to-scopedproject time fell from 4 to 8 hours down to under 30 minutes across a 50-person GTM organization.
Directed a nine-script enrichment pipeline for an outsourced SDR program: confirmed 0% contact overlap against
thousands of already-contacted records and 91% phone coverage.

Diamitani Industries, Inc. | Founder, AI Engineer

Remote · Jan 2014 to Present

Active NYC C-Corp holding my consulting practices, product portfolio, and recorded music catalog. About 250
repositories across research, agent frameworks, production apps, and open-source skills.
Ship and operate 8+ production web applications end to end on Next.js, React, Vercel, Supabase, and LLM APIs
from OpenAI, Anthropic, and Google.
Author and maintainer of the ROSTR Framework and ROSTR Agent, plus 17 published open-source agent skills
covering agent scaffolding, persistent context, n8n execution diagnostics, HubSpot chatbot management, PQL
routing, and GTM engineering.
Consulting entities: SalesGency (GTM AI consulting) and GencyAI (AI and automation development).
Recorded music: BMI and SoundExchange member; lo-fi hip-hop and EDM instrumentals released under my
own catalog.

GencyAI | AI & Automation Development

Remote · Jan 2024 to Present

An AI development practice for SMB and mid-market clients covering agents, skills, prompt libraries, and production
web apps, taken from SOP to shipped system with adoption built in.
Deployed a production website chatbot for a recruiting agency (Voiceflow, OpenAI) with a custom knowledge base
connecting candidates and employers; wrote the PRD and built the supporting Custom GPTs.
Built a full-stack email outreach platform (v0.dev, Vercel, Supabase, Make.com) that ingests CSVs, processes
webhook data, and sends and tracks campaigns for a startup client.
Rebuilt an education company's site as a custom web app (v0.dev, Vercel, Gemini API) with generative AI course
lessons and text-to-speech voice.
Published 150+ Custom GPTs in the GPT Store under GPTPAT, spanning programming, productivity, sales,
creative, civic, and lifestyle categories.
Delivered content and commerce automation including a YouTube comment moderation tool, an RSS-driven blog
writer matched to the client's voice, and Shopify product-description and transaction-tracking workflows.

Scalytics.io | Founding GTM Engineer, Consulting

Remote · Apr 2025 to Present

Embedded part-time with the founding team of a private-AI infrastructure startup (PhDs and federated-data
experts) to build their go-to-market engine from scratch.
Developed custom CRM tooling, sales playbooks, and lead-generation systems.
Integrated Make.com automations with Zoho and HubSpot, and managed pipeline plus LinkedIn marketing.

Dark Roast Media | Sales Enablement Consultant

Remote · Jan 2024 to Dec 2024

Stood up outbound sales operations end to end with HubSpot, Reply.io, Asana, and LISN. Vetted the tooling,
configured automation sequences, and trained the incoming SDR team.
Identified ICPs and generated 60,000 leads; ran 500 emails a day at a 40% open rate and 12% reply rate.
Held sales calls with C-suite leaders across venture capital, real estate, and startups.

Rand McNally | GTM Consultant, Sales & Marketing

Remote · May 2023 to Dec 2023

Created the outbound sales playbook for the Rand Fleet Software launch; configured automation sequences and
managed leads for six sales reps, driving a 2,000% increase in engagement.
Oversaw marketing email campaigns to 200,000+ customers and leads at a 50% open rate.

Uber, Inc. | Enterprise Representative, Uber for Business

Chicago, IL · Aug 2022 to Jan 2023

Generated $947K+ in gross bookings managing a book of business across technology, automotive, and retail.
Led the hiring cohort in quota attainment; top 10% revenue earner in a sales organization of 100+ reps.
Ran technical discovery and cold outreach with C-suite, director, and VP buyers, averaging 2,000+ emails and 250
dials weekly using ZoomInfo, Gong, and LinkedIn Sales Navigator.

Upwork, Inc. | Senior Enterprise Representative

Chicago, IL · Oct 2019 to Jan 2022

Top 10% performer, consistently above quota with high call-engagement rates.
Partnered with Fortune 500 executives to scope strategic use cases for outsourced and distributed talent.

Techstars Chicago | Portfolio Associate, Sales

Chicago, IL · Jul 2018 to Oct 2018

Supported founders of three accelerator startups on sales infrastructure, playbooks, and go-to-market strategy:
2ndKitchen (acquired), Clyde (acquired), and Rheaply ($40M raised), over $100M raised collectively.

DreamItReel | Founding Account Executive

Chicago, IL · Sep 2016 to Jan 2018

Built the internal sales process from zero and grew revenue from $200K to $1.5M+ at 40% year-over-year growth,
closing 100+ sales to agencies, Fortune 500 brands, and online publishers while managing a team of five.

Omicon Entertainment | Founding Partner

2010 to 2016

Produced 1,000+ shows for 80,000 students at $2M in yearly revenue; trained and managed 30+ interns.

SELECTED TECHNICAL PROJECTS

Founder-built products designed, developed, and deployed end to end, mostly Next.js and React on Vercel with
Supabase, plus LLM APIs from OpenAI, Anthropic, and Google.

ROSTR Agent | rostragent.com
Python · Hermes runtime · multi-provider LLM · vector retrieval · MIT license

Self-improving open-source multi-agent framework implementing PAL, NPAO, RAG DAL, and Hub intelligence layers,
with 41 production skills. Benchmarked against baseline over 200 tasks in 8 domains. Companion repositories
extend the framework to Amazon Bedrock AgentCore, OpenClaw, and a full platform build (backend, core,
dashboard, skills).

Artispreneur | artispreneur.com
Next.js 14 · Supabase · Azure AI · Stripe · multi-tenant

SaaS platform giving independent artists the business layer of a record label. Includes an EPK builder, contract
generation, catalog management, an academy course platform, and AI assistants. Has supported 100+ artists, and
includes a music-industry directory of 78K+ verified contacts.

Replai | replaiall.com
Next.js · LLM rewrite pipeline · per-contact guardrails

AI messaging assistant that rewrites impulsive or emotionally charged texts while preserving the sender's voice, with
per-contact rewrite rules.

Lets Vibe AI | letsvibeai.com
Next.js · Vercel · curriculum agent (ROSTR PAL)

Free AI-builder academy with a 6-module curriculum, 3 project labs, a 10-day bootcamp, and an AI curriculumplanning agent that researches learning resources and generates personalized paths.

Lola | trainlola.com
Next.js · DeepSeek · Ollama · ROSTR Framework

AI fitness coach with personalized workout plans, curated classes drawn from social video, progress tracking, and
accountability partners.

Huddle CoWork | huddleco.work
Next.js · Supabase · programmatic SEO

Coworking directory for finding, comparing, and booking across 7,000+ locations in 1,100+ US cities.

Civic Pie | AI civic engagement platform
Next.js · Supabase · RAG over public records

Hyper-local civic platform covering all 50 Chicago wards, with alderman records, meeting data, and a CivicGuide AI
assistant. Piloted in the 48th Ward alongside a campaign dashboard, volunteer coordination tool, and constituent
feedback-analysis chatbot.

Credit Fixer | fcragent.com
Next.js · LLM guided workflow · FCRA rule set

AI credit repair agent that walks users through identifying and resolving issues on their credit profile.

Pulse AI | Daily AI news aggregator
26 ingestion sources · DeepSeek summarization · RAG chat · Supabase archive

Scheduled ingestion and summarization pipeline with a retrieval-backed chat interface over the archive.

Gency AI | gencyai.com
Next.js · client delivery practice

AI software development practice: agent setup, skills, prompt libraries, and production web apps, fully managed for
clients.

OPEN SOURCE & AGENT SKILLS

github.com/diamitani holds about 250 repositories. 17 published agent skills installable into Claude Code, Hermes,
and any ROSTR-compatible runtime:
rostr-agent-builder: scaffolds production multi-agent

context-engine: persistent cross-session memory,

Python systems from specs

indexing, retrieval

rostr-pal-skill: LLM-agnostic intent compilation into typed

prospect-automation-engine: five-stage autonomous

manifests

lead pipeline (signal

→ qualify → enrich → personalize →

deliver) with live web research, multi-source verification,
and per-rep mailbox warmth
inbound-automation-engine: website chatbot + form

n8n-engineer: designs and builds n8n workflows for lead

intake classifier that routes inquiries and drafts

ingestion, enrichment, deterministic multi-stage

personalized responses to reps via round-robin

qualification, and end-to-end automation pipelines

n8n-execution-analyst: pulls execution data by workflow

hubspot-import-manager: uploads lead CSVs and

ID or link, diagnoses failures, error chains, and fixes;

configures them to a master template for bulk import to

builds observability dashboards

HubSpot; manages custom properties and field mapping

hubspot-ticket-submitter: sends tickets and contact

clay-enrichment-orchestrator: manages lead enrichment

records to HubSpot from Claude or other agents; validates

workflows and waterfall data routing through Clay; sets up

schema and handles async writes

multi-table pipelines and webhook triggers

soul-builder: agent personality, values, and behavior

hubspot-chatbot-manager: chatbot config and delivery

constraints

management

gtm-engineering: GTM system design and build patterns

partner-pql-manager: PQL scoring, routing, follow-up in
HubSpot

marketing-chatbot-execution-analyst: pipeline health

entity-readiness-execution-health: n8n workflow

and conversion analysis

validation and delivery status

monarch-art-vault: photo folders to print-ready catalogs

curriculum-os: PAL-driven research and personalized
curriculum generation

Also maintains Monarch Workspace (agentic workspace where agents plan work and pause for approval before
anything reaches the outside world), an AI tool directory of 900 tools, a public Custom GPT directory, AWS
troubleshooting guides and templates, and a published response to the US AI Action Plan request for comments.

EDUCATION & CERTIFICATIONS

Per Scholas | AWS re/Start Program

Chicago, IL · 2024 to 2025

AWS Certified AI Practitioner (2025) · AWS Certified Cloud Practitioner (2025). Hands-on training deploying
servers (VPC, EC2), serverless applications (Lambda, API Gateway), AI/ML services (Bedrock, Polly, Lex), and
databases (RDS, DynamoDB, Redshift).

St. John's University, Tobin College of Business | B.S. Economics

Queens, NY

Co-founded the Entrepreneurial Society (200+ members), served in elected Student Government administering a
$1M budget, and participated in the G.L.O.B.E. Microfinance Program.

CIVIC & COMMUNITY

48th Ward, Chicago. Precinct Captain. Ground organizing for a local aldermanic campaign; built the campaign's
internal dashboard, precinct coverage and turnout analytics, volunteer coordination tooling, and a constituent
feedback-analysis platform.
Re:Work Training, Sales Training Volunteer (2022 to Present). Lead courses and workshops training new BDRs
from underrepresented backgrounds on sales fundamentals.
