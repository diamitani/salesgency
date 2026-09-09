# SalesGency® Complete Product & Pricing Guide
**Version 1.0 · September 2026**  
*Confidential — For Client & Partner Use Only*

---

## What Is the Prospect Automation Engine?

The **Prospect Automation Engine (PAE)** is SalesGency's flagship system for building consistent, recurring outbound sales pipeline. It combines autonomous lead discovery, deep company and contact research, and AI-personalized email copywriting into a single end-to-end workflow — running on autopilot so your team can focus on closing, not sourcing.

The core engine executes five pillars in sequence:
```
[ Trigger & Ingest ] ➔ [ CRM Dedupe Shield ] ➔ [ Contact Reveal ] ➔ [ AI Research & Copywriting ] ➔ [ Sequence Enrollment ]
```

Every prospect that enters the system is validated, enriched, researched, and messaged with a custom 3-sentence email — without a single manual step.

---

## The Three Products / Channels

SalesGency sells the PAE in three distinct channels, each designed for a different buyer profile and level of involvement.

---

### 🏗️ Product 1 — Custom Engagement
> *"We build your go-to-market engine for you."*

A full-service, hands-on engagement where the SalesGency team designs, builds, tests, and delivers a fully customized automation system tailored to your business, ICP, and tech stack.

#### Who It's For
- Revenue teams that want a production-ready system without internal technical resources
- Companies setting up outbound for the first time or re-platforming their GTM motion
- Teams needing a repeatable, scalable pipeline engine fast

#### How It Works
- **Step 1 — Intake (Day 1)**: We learn your Business (offer, value prop, deal size), Customers (titles, industries, pain triggers), and Tech Stack (CRM, sequencers, enrichment tools). Handled via call or Intake Form.
- **Step 2 — Build (Days 2–3)**: Once intake data and system credentials (keysheet) are received, construction begins.
- **Step 3 — Credentials, Revision & Final (Days 3–5)**: Integration validation, end-to-end testing, final keys, and complete package delivery.

#### Trigger Options
- **Skill to Webhook**: Upload a SalesGency skill to your LLM; send prospect data directly via webhook.
- **Daily Trigger**: Scheduled pull from your CRM or spreadsheet at a set time each day.
- **Custom Agent**: Fully autonomous — scans for ICP-matched companies, builds list, and runs end-to-end.

#### Automation Types
- **Company Automation**: Target company list without contacts — finds decision makers, enriches data, and sends outreach.
- **Contact Automation**: Existing contacts in spreadsheet/CRM — skips people-find, executes research and personalized PAS copy directly.

#### Deliverables
- ✅ **1× Customized n8n Workflow JSON**: Production-ready PAE workflow for your n8n instance.
- ✅ **1× n8n Engineer Skill**: LLM skill file so you (or AI) can modify workflows in the future.
- ✅ **1× Prompt & Template Build Package**: Reusable prompts & templates for future automations.
- 🎁 **BONUS: n8n Execution Analyst**: Monitors workflow runs and alerts on failures.
- 🎁 **BONUS: Daily Execution Report Workflow**: Sends daily report on outreach automation performance.

#### Timeline & Pricing
| Package | Timeline | Price | Description |
|---|---|---|---|
| **3-Day Sprint** | Deliver in 72 hours | **$5,000** | High-velocity build & deployment |
| **7-Day Sprint** | Deliver in 1 week | **$2,500** | Standard 1-week turnkey deployment |
| **30-Day Maintenance** | Post-delivery | **$1,250 / mo** | Ongoing support & workflow optimization |

---

### 🤖 Product 2 — Custom Agent (Platform Subscription)
> *"Your AI GTM teammate — always on, always prospecting."*

Access the SalesGency AI harness as a subscription product. The custom agent is SalesGency's internal agentic system that autonomously finds companies matching your ICP, researches them, writes personalized outreach, and manages your pipeline — all from a chat interface with full tool access.

#### Who It's For
- Teams that want ongoing, autonomous prospecting without a recurring agency fee
- Operators comfortable with AI-native workflows
- Companies scaling pipeline month-over-month who need a system that learns and adapts

#### What the Agent Does
- **Tech Stack Setup**: Connects data tools, CRM, and outreach sequencers
- **ICP Discovery**: Scans for companies and contacts matching ideal buying signals
- **Research & Analysis**: Pulls company data, news, job postings, and intent signals
- **AI Copywriting**: Generates personalized Problem-Agitate-Solve (PAS) emails
- **Pipeline Management**: Manages sequences, tracks replies, and flags hot leads

#### How It's Delivered & Pricing
- Deployed as a conversational agent with integrated tool access (n8n instance or SalesGency-hosted).
- **Pricing**: Scoped subscription pricing based on volume, tool integrations, and seat requirements.

---

### 📦 Product 3 — DIY Build Package
> *"Everything you need to build it yourself."*

A downloadable product bundle containing all the skills, templates, prompts, and documentation needed to construct your own prospect automation engine using your own tools and agent.

#### Who It's For
- Technical operators and RevOps teams who want full control
- Agencies building PAE systems for their own clients
- Developers and AI-native builders looking for a head start

#### What's Included
- **n8n Engineer Skill**: LLM-agnostic skill instructing any AI to build production-ready n8n workflows.
- **n8n Outreach Automation Templates**: JSON workflow templates covering company automation and contact automation patterns.
- **n8n Build Prompt**: System instructions combining inputs, templates, and skill to generate personalized GTM workflows.

#### How to Deploy
1. Download the build package.
2. Upload the `n8n Engineer Skill` to your LLM (Claude, GPT-4, Gemini, Antigravity).
3. Connect n8n tools via MCP or direct integration.
4. Run the Build Prompt with your ICP, tools, and trigger.

---

## Supported Tools & Integrations

### Data & Contact Intelligence
- **Clay**: Multi-waterfall enrichment, contact reveal, company research
- **Apollo.io**: Contact database, email/phone reveal, intent data
- **ZoomInfo**: Enterprise contact & company intelligence
- **FindyMail**: Verified email discovery
- **Lusha**: Contact and company data enrichment
- **Reply.io**: Contact data + outreach sequencing
- **Amplemarket**: All-in-one sales intelligence
- **Custom (Web Search)**: Built-in fallback using public data and AI web research

### CRM Integrations
- **HubSpot**: Contact/deal sync, sequence enrollment, deduplication
- **Salesforce**: Full CRM integration, opportunity management
- **Attio**: Modern CRM sync with AI-native workflows
- **Zoho CRM**: Contact and pipeline management
- **Pipedrive**: Deal-centric pipeline sync
- **Monday.com**: Project/contact board integration
- **ClickUp**: Task and CRM workflow integration

### Outreach & Sequencing
- **Instantly**: Cold email sequencing and deliverability
- **HubSpot Sales**: Native sequence enrollment
- **Attio**: CRM-native outreach
- **Salesforce**: Email and cadence management
- **Zoho**: Outreach automation

---

## The 5-Pillar Architecture (Technical Reference)

```
┌─────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   01: Trigger   │ ──> │  02: Normalizer  │ ──> │  03: CRM Dedupe  │
│     Ingest      │     │  Clean & Enrich  │     │      Shield      │
└─────────────────┘     └──────────────────┘     └──────────────────┘
                                                           │
┌─────────────────┐     ┌──────────────────┐               ▼
│  06: Approval   │ <── │   05: AI PAS     │ <── ┌──────────────────┐
│     Switch      │     │   Copywriting    │     │   04: Contact    │
└─────────────────┘     └──────────────────┘     │ Reveal & Enrich  │
         │                                       └──────────────────┘
         ├──────────────────────┐
         ▼ (Approved)           ▼ (Review)
┌─────────────────┐     ┌──────────────────┐
│     07: CRM     │     │  09: Slack Alert │
│     Upsert      │     │ (1-click approve)│
└─────────────────┘     └──────────────────┘
         │
         ▼
┌─────────────────┐
│  08: Sequence   │
│   Enrollment    │
└─────────────────┘
```

### Key Engineering Principles:
1. **Zero hardcoded credentials**: All secrets stored in `.env` or n8n credential store (`={{ $env.API_KEY }}`).
2. **CRM Shield mandatory**: Always runs before any outreach action to prevent deal collision and domain spam.
3. **Human approval gate**: Slack 1-click confirm for high-impact actions.
4. **Full execution observability**: Error handling paths and structured run data for automated analysis.
