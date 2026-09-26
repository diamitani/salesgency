# Signal: Master GTM Agent Architecture

## Overview
Signal is the Master GTM (Go-To-Market) Agent built on Langchain and LangGraph. It orchestrates a funnel-type system to automate inbound marketing, outbound sales, CRM setup, and reporting analytics. 

Signal operates via a central supervisor agent that delegates tasks to specialized sub-agents.

## Core Components & Langchain Architecture

### 1. Master Agent: `Signal` (The Orchestrator)
- **Role:** Supervisor agent that routes tasks to the appropriate sub-agent based on the user intent or workflow trigger.
- **Tech Stack:** LangGraph `StateGraph`, `ChatAnthropic` / `ChatOpenAI`.
- **State:** Tracks the current lead status, active campaigns, and requested tasks.

### 2. Sub-Agents

#### A. Inbound Automation Engine
- **Role:** Processes incoming leads, website forms, and chat interactions. Classifies MQLs (Marketing Qualified Leads) and enriches them via Clay or Apollo integrations.
- **Tools:** `FormIngestTool`, `LeadEnrichmentTool`, `MQLClassifier`.
- **Workflow:** Ingest -> Enrich -> Score -> Route to CRM.

#### B. Outbound Automation Engine (Prospect Automation Engine)
- **Role:** Orchestrates multi-touch outbound sequences (Email, LinkedIn, Calls).
- **Tools:** `EmailSequencer`, `LinkedInOutreachTool`, `PersonalizationEngine`.
- **Workflow:** Pull ICP -> Generate tailored copy -> Execute touchpoints -> Handle replies.

#### C. CRM GTM Setup (Enably)
- **Role:** Automates the setup of CRM pipelines, custom fields, and webhook listeners.
- **Tools:** `CRMConfigurator`, `WebhookManager`, `DataMappingTool`.
- **Workflow:** Audit current CRM -> Apply Enably Best Practices -> Create Pipelines -> Sync data.

#### D. Sales Playbook Engine
- **Role:** Generates and maintains dynamic sales playbooks, objection handling scripts, and call scripts.
- **Tools:** `PlaybookGenerator`, `ScriptSynthesizer`, `CompetitorIntel`.
- **Workflow:** Analyze product -> Generate value props -> Build battlecards.

#### E. Reporting Dashboard / Analytics / Execution Report
- **Role:** Aggregates metrics from all engines to provide daily/weekly execution reports.
- **Tools:** `DataAggregator`, `ReportGenerator`, `MetricsVisualizer`.
- **Workflow:** Query databases -> Compile metrics -> Generate Markdown/PDF reports.

## Funnel-Type System Logic

1. **Top of Funnel (TOFU):** Managed by Inbound Automation Engine and Outbound Prospecting Engine.
2. **Middle of Funnel (MOFU):** Managed by Sales Playbook Engine (providing collateral) and CRM Setup (tracking stages).
3. **Bottom of Funnel (BOFU):** Managed by the Master Agent closing logic and human handoff.

## Plugin & Skills Distribution
Each of these sub-agents can be packaged as standalone `.skill` files or Langchain Tools.
- `inbound-engine.skill`
- `outbound-engine.skill`
- `crm-setup.skill`
- `reporting-analytics.skill`
- `sales-playbook.skill`

## Deployment Instructions
1. Install dependencies: `pip install langchain langgraph openai anthropic pydantic`
2. Configure environment variables for LLMs, CRM, and communication tools.
3. Run the LangGraph compilation step to initialize the Signal master node.
