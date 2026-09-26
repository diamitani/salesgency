---
name: enably-gtm---project-overview
description: Process/Note derived from Enably GTM - Project Overview.docx
source_path: Enably GTM - Project Overview.docx
---

# Enably GTM - Project Overview.docx

## Context
This skill provides knowledge, processes, and instructions derived from the document: `Enably GTM - Project Overview.docx`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

Enably GTM - Project Overview
Enably GTM - Project Overview
Purpose
Prompts and copy blocks to generate a world‑class 
homepage
 and 
in‑app dashboard
 for the GTM OS. Designed for v0.dev or any AI UI/code generator. Copy is modular; keep voice crisp, outcome‑oriented, and founder/SDR friendly.
Global Creative Brief (use in every generation)
Product
: A GTM operating system that helps teams define ICPs, personas, USPs, use‑cases, sales bible, messaging templates, research/enrichment, and CRM sync—with an assistant that remembers context.
Brand Voice
: Confident, helpful, concise. Challenger energy without jargon. Avoid buzzwords; use verbs and outcomes. Friendly to founders and SDRs.
Design Aesthetic
: Clean, modern SaaS. Ample white space. Subtle glass/blur accents. Rounded‑2xl, soft shadows, micro‑interactions. Primary color = electric indigo (
#635BFF
) with slate neutrals. Accent = emerald (
#10B981
) for success.
Primary CTA
: “Start the GTM Wizard”
Secondary CTA
: “Explore the Demo Workspace”
Proof
: Social tiles (logos) + short quantified outcomes.
Navigation
: Dashboard · Wizard · Playbook · Messaging · Research · Hub · Integrations · Assistant · Settings
Accessibility
: Min contrast ratio 4.5:1; focus rings visible; keyboard navigable; prefers‑reduced‑motion friendly.
Prompt — Homepage (System + User)
SYSTEM
You are a senior product designer and frontend engineer. Generate a production‑ready Next.js + Tailwind homepage with shadcn/ui components. Output a single React page (App Router) that is accessible, responsive, and fast. Include semantic HTML, ARIA where needed, and mobile‑first layout. Use a clear content hierarchy and persuasive copy tailored to a GTM operating system.
USER
Build the 
Homepage
 for “GTM OS”. Requirements:
Hero
 (above the fold)
Headline: 
Ship your GTM in days, not months.
Subhead: 
Define ICPs, write playbooks, generate outreach, and sync to CRM—backed by a memory‑aware assistant.
CTAs: Primary 
Start the GTM Wizard
; Secondary 
Explore the Demo Workspace
.
Visual: right‑side mock dashboard card stack (ICP preview, Playbook progress, Assistant message). Use tasteful gradient background and subtle grid.
Trust: mini logo strip with tooltip captions.
Outcomes Section
 (“Why teams choose us”)
3–4 cards with icon + stat + sentence:
<15 min to first ICP
3+ exportable assets on Day 1
First cadence live in 30 min
CRM sync in your first session
Guided Wizard Section
Stepper illustration with steps: ICP → Personas → USPs → Use‑Cases → Messaging → Positioning → Review/Export.
Short explainer and CTA link to wizard.
Sales Bible & Messaging
Two side‑by‑side feature panels: Activity Targets/SOPs/Cadences and Template Generator with variable chips (e.g., 
{{first_name}}
, 
{{pain_point}}
).
Research & Enrichment
One wide panel showing company snapshot (summary, triggers) and a 
Generate Email
 button.
Assistant with Memory
Chat preview with context toggles (ICP / Playbook / Current Lead). Include message bubble example with citations.
Integrations
HubSpot primary; S3, Clearbit listed. Badges with short labels. Include note: 
Salesforce coming soon.
Security & Compliance
Bullet list: row‑level access, encrypted secrets, signed uploads, rate limiting.
Footer
Product, Company, Resources columns; social; copyright.
Design Tokens (Tailwind)
Primary: 
#635BFF
Accent (success): 
#10B981
Gray scale: slate (Tailwind)
Radius: 
rounded-2xl
Shadows: 
shadow-lg shadow-slate-900/5
Container widths: 
max-w-7xl
 with 
px-6 md:px-8
.
Micro‑interactions
Button hover translate‑y‑0.5 + shadow intensify.
Cards subtle hover ring (
ring-1 ring-slate-200
).
Reduce motion if 
prefers-reduced-motion
.
Copy Blocks
 (inject as literals)
Proof points:
“Time‑to‑first‑ICP: 
14:32
 on average.”
“Users export 
3.6
 assets their first day.”
“From idea → cadence in 
29 minutes
.”
Security bullets: “Row‑level auth by workspace”, “Encrypted integration secrets”, “Signed S3 uploads”, “Upstash rate limiting”.
Acceptance
Lighthouse ≥ 95 performance on desktop, ≥ 90 a11y.
CLS < 0.02.
No layout shift on font load (use system fonts or 
display=swap
).
Prompt — Dashboard (System + User)
SYSTEM
You are a senior product designer and frontend engineer. Generate a production‑ready 
Dashboard
 page (in‑app) using Next.js + Tailwind + shadcn/ui. The dashboard should summarize progress and provide fast access to core actions. Include skeleton states, empty states, and real‑looking placeholders. It must be accessible and responsive.
USER
Build the 
Dashboard
 for logged‑in users of GTM OS. Requirements:
Page Header
Title: 
Dashboard
Subtitle: 
Your GTM at a glance.
Primary CTA: 
Start the GTM Wizard
 (if no ICP found); else 
Open Playbook
.
Progress Overview (cards row)
GTM Foundation
: completion ring (ICP, Personas, USPs, Use‑Cases, Messaging, Positioning).
Playbook Readiness
: status chips (Activity Targets, SOPs, Cadences, Qualification).
Integrations
: HubSpot, S3, Enrichment — show connected/not connected.
Today’s Focus
List of 5 tasks pulled from activity targets (e.g., “Send 40 emails”, “20 DMs”, “30 calls”). Include quick actions (copy template, open generator, log to CRM). Empty state: “No tasks yet—set Activity Targets in your Playbook.”
Recent Documents
Table with Title, Type (ICP/Persona/Playbook/Template), Updated, Actions (View, Export, Pin). Empty state card with CTA: “Generate your first ICP”.
Assistant Shortcut
Compact chat input: placeholder 
Ask the assistant to draft a cadence…
; recent suggestions chips.
Research Quick Add
Domain/URL input; on submit, create snapshot card and button 
Draft Email from Triggers
.
Right Rail (optional on xl+)
Metrics mini‑cards: 
Assets exported this week
, 
Meetings booked
, 
Reply rate
. Use placeholders and clear units.
Variants (stateful)
New workspace: show setup checklist widget (Connect CRM, Create ICP, Add first template).
Returning user: show progress ring and last opened doc link.
Empty States (copy)
“Let’s kickstart your GTM. The wizard turns your inputs into ICPs, personas, and playbooks in minutes.”
“No recent docs yet. Create your 
ICP
 to unlock messaging variables.”
Skeletons
Use 
animate-pulse
 cards for loading; reserve layout space to prevent CLS.
Acceptance
Keyboard reachability for all quick actions.
Announce dynamic updates with 
aria-live="polite"
 where relevant.
Responsive down to 320px; grid collapses to single column.
Copy Library (plug‑and‑play)
Homepage Headlines
“Ship your GTM in days, not months.”
“From zero to outbound in one afternoon.”
Subheads
“Define ICPs, write playbooks, generate outreach, and sync to CRM—backed by a memory‑aware assistant.”
“Founders and SDRs move faster with a shared, living GTM.”
CTAs
Primary: “Start the GTM Wizard”
Secondary: “Explore the Demo Workspace”
Benefit Bullets
“Time‑to‑first‑ICP under 15 minutes.”
“Auto‑generate cadences, DMs, and call openers.”
“Company snapshots with triggers in one click.”
“Works with HubSpot; Salesforce next.”
Trust Snippets
“Teams use GTM OS to compress strategy work from weeks to hours.”
Dashboard Microcopy
“Good morning—ready to move 5 deals forward?”
“Your playbook is 72% complete. Add Cadences to unlock the generator presets.”
“Connect HubSpot to log activities automatically.”
Component Guidelines (for generators)
Use 
shadcn/ui
: Button, Card, Tabs, Badge, Dialog, Sheet, Progress, Table, Input, Textarea, Tooltip, Skeleton.
Spacing: 
space-y-6
 per section; grid gaps 
gap-6
.
Cards: 
rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition
.
Headings: 
text-3xl md:text-4xl font-semibold tracking-tight
 for hero; 
text-xl font-semibold
 for section titles.
Icons: 
lucide-react
 (e.g., Target, Book, Bot, Database, PlugZap, Shield, BarChart3).
Animations: use 
framer-motion
 for fade/slide in on scroll; respect reduced motion.
Sample Placeholder Data (Dashboard)
{
  "foundation": {"complete": 0.72, "sections": {"ICP": true, "Personas": true, "USPs": true, "UseCases": false, "Messaging": true, "Positioning": false}},
  "playbook": {"activityTargets": true, "sops": true, "cadences": false, "qualification": "MEDDICC"},
  "integrations": {"hubspot": false, "s3": true, "enrichment": false},
  "tasksToday": [
    {"type":"email","count":40},
    {"type":"dm","count":20},
    {"type":"call","count":30}
  ],
  "recentDocs": [
    {"title":"Mid‑Market SaaS Security Buyers","type":"ICP","updated":"2025-08-09"},
    {"title":"CISO Persona v2","type":"Persona","updated":"2025-08-09"},
    {"title":"Outbound Cadence A","type":"Playbook","updated":"2025-08-08"}
  ]
}
Acceptance Checklist (UI & UX)
One‑Shot “Make It” Prompt (for v0/dev or similar)
Paste this as a single prompt:
Build a responsive Next.js + Tailwind homepage and dashboard for a SaaS called 
GTM OS
 following the spec below. Use shadcn/ui and lucide-react. Aesthetic: clean, modern, rounded‑2xl, subtle gradients, primary 
#635BFF
, success 
#10B981
. Accessibility first. Include hero with action CTAs, outcomes metrics cards, wizard stepper section, sales bible/messaging panels, research snapshot, assistant preview, integrations row, security bullets, and a structured footer. Then a signed‑in dashboard with progress cards, today’s tasks, recent docs table, assistant quick input, research quick add, and right‑rail metrics. Provide production‑ready React components for the App Router, with Tailwind classes, semantic HTML, aria labels, skeleton/empty states, and small framer‑motion animations. Use the copy blocks provided verbatim where specified. Ensure Lighthouse ≥ 90 a11y. Output a single file per page, 
page.tsx
, and include any small UI subcomponents inline.
Stretch: Dark Mode Palette (optional)
Background: 
#0B1020
Card: 
#0F152A
Text: 
#E5E7EB
Borders: 
#1E293B
Accent: keep 
#635BFF
, success 
#10B981
 with 90% opacity.
Site Directory
Site Directory
Home Page
Home Page
Dashboard
Dashboard
Tab 5
I.C.P. Generator 
P.R.D.
P.R.D.
Cline PRD
Cline PRD
### __Project: Enably - The Go-to-Market OS (V1)__
#### __1. Product Requirements Document (PRD)__
__1.1. Vision__ A self-serve, AI-powered Go-to-Market (GTM) operating system. Enably empowers founders, sales, and marketing teams to rapidly build and execute a world-class GTM strategy. It starts by defining a strategic foundation (ICP, Personas, USPs) and flows into tactical execution with playbooks, messaging, and an intelligent SDR assistant. The goal is not to replace humans, but to make them faster, smarter, and more consistent.
__1.2. Target Users & Key Jobs-to-be-Done (JTBD)__
- __Founder / Head of Growth:__
  - __JTBD:__ "I need a solid GTM foundation, fast."
  - __Solution:__ A guided wizard to generate foundational documents (ICP, Personas, USPs).
- __SDR / AE (Sales Development Rep / Account Executive):__
  - __JTBD:__ "Give me a 'sales bible' and clear steps for outreach."
  - __Solution:__ A dynamic Sales Playbook with activity targets, SOPs, and messaging templates.
  - __JTBD:__ "Help me write relevant, personalized messages to every lead."
  - __Solution:__ A research micro-agent and a context-aware message generator.
- __RevOps / Admin:__
  - __JTBD:__ "Keep our GTM assets organized, synced, and secure."
  - __Solution:__ A centralized document hub, CRM integration, and user/workspace management.
__1.3. V1 Scope & Core Features__
1. __Onboarding & GTM Wizard:__ A step-by-step conversational flow to capture company, product, and market details.
   - __Outputs:__ Structured, downloadable documents for Ideal Customer Profile (ICP), Personas, Unique Selling Propositions (USPs), and Use Cases.
2. __The Sales Bible & Playbook:__ A central repository for sales strategy and operations.
   - __Includes:__ Activity targets (dials, emails), Standard Operating Procedures (SOPs), and outreach cadence templates.
3. __Messaging Workshop:__ An AI-powered generator for crafting outreach copy (emails, LinkedIn DMs, call scripts) using variables from the GTM foundation.
4. __Research & Enrichment Micro-Agent:__ A tool to fetch and summarize key information about a lead or company from a URL, providing talking points for outreach.
5. __Document Hub:__ A central, versioned repository for all generated assets and user uploads, organized by workspace.
6. __CRM Integration (V1: HubSpot):__ OAuth connection to sync contacts, companies, and notes, enabling a seamless workflow between Enably and the user's CRM.
7. __Memory-Aware Assistant:__ An AI chat assistant with retrieval-augmented generation (RAG) capabilities, allowing it to answer questions based on the user's documents and workspace context.
__1.4. Success Metrics (V1)__
- __Activation:__ Time-to-first-ICP document < 15 minutes.
- __Engagement:__ > 40% of users export at least 3 assets within their first day.
- __Adoption:__ > 30% of users connect their CRM during their first session.
---
#### __2. Project Overview & Architecture__
__2.1. System Architecture & Tech Stack__
- __Frontend:__ __Next.js 14__ (App Router), TypeScript, Tailwind CSS.
- __UI Components:__ __shadcn/ui__ for a modern, accessible, and consistent design system.
- __State Management:__ __Zustand__ for lightweight global state.
- __Forms:__ __React Hook Form__ with __Zod__ for validation.
- __Backend:__ __Supabase__
  - __Database:__ Postgres with __pgvector__ for embeddings.
  - __Auth:__ Supabase Auth for user and organization management.
  - __Storage:__ Supabase Storage for file uploads (documents, assets).
  - __Serverless Functions:__ Supabase Edge Functions for backend logic (e.g., AI-powered generation, CRM sync).
- __ORM:__ __Prisma__ for type-safe database access.
- __AI:__ __OpenAI API__ (`gpt-4o-mini` for generation, `text-embedding-3-large` for embeddings).
- __Web Scraping:__ __Metascraper__ and `jsdom` for the research agent.
- __PDF Generation:__ __@react-pdf/renderer__ for exporting documents.
__2.2. Information Architecture (IA)__
- __Top Navigation:__ Dashboard | Wizard | Playbook | Messaging | Research | Hub | Integrations | Assistant.
- __Dashboard:__ An overview of key activities, progress, and quick-access links.
- __Data Models:__ A robust Prisma schema defining `Workspace`, `Member`, `Document`, `Product`, `Lead`, `Template`, and `Integration` relationships, ensuring data integrity and multi-tenancy.
__2.3. High-Level Build Plan__
1. __Phase 1: Foundation (The "Enable" Sprint)__
   - __Setup:__ Initialize Next.js project, install all dependencies.
   - __Database:__ Set up Supabase project, enable `pgvector`, and run initial Prisma migrations based on the defined schema.
   - __Auth & Orgs:__ Configure Supabase Auth for user sign-up, login, and workspace management.
   - __Core UI:__ Scaffold the main application layout, navigation, and basic pages using `shadcn/ui`.
2. __Phase 2: The Wizard & Document Hub__
   - Build the multi-step GTM Wizard form.
   - Create the backend API endpoint to take wizard inputs, call the OpenAI API, and generate structured JSON documents.
   - Implement the Document Hub to list, view, and export these generated documents (PDF & JSON).
3. __Phase 3: Playbook & Messaging__
   - Develop the UI for the Sales Playbook and Messaging Workshop.
   - Create the AI-powered message generator.
4. __Phase 4: Assistant & Integrations__
   - Implement the embedding process on document save.
   - Build the RAG-powered chat assistant.
   - Set up HubSpot OAuth and initial data sync functionality.
This refined plan provides a clear, actionable path to building the V1 of Enably. It leverages the power of Supabase for a streamlined backend experience while following the excellent, detailed architecture you provided.
Build Prompts
Build Prompts
Tab 8
Hello! That sounds like an incredibly ambitious and powerful platform. Building "Enably: Go-to-Market Architect" will involve several complex, interconnected components. I'm excited to help you architect this.
Given the scope, I recommend a phased approach to build this out systematically. Here is a high-level plan I've drafted, along with a suggested technology stack to create the "beautiful front end" you've described.
### Proposed Development Plan
__Phase 1: Foundation & Core Frontend__
1. __Project Setup:__ Initialize a new project using a modern web framework.
2. __UI/UX Framework:__ Integrate a component library and styling solution to ensure a consistent and professional look from the start.
3. __Authentication & User Management:__ Set up user sign-up, login, and profile management using Supabase Auth.
4. __Dashboard Shell:__ Create the main application layout, including navigation, a sidebar, and a central content area where the different features will live.
__Phase 2: Central Assistant & Chat Interface__
1. __Chat Component:__ Build a reusable, real-time chat interface.
2. __OpenAI Integration:__ Connect the chat interface to the OpenAI Assistants API to create the "Central Agent."
3. __Conversation History:__ Use Supabase's database to store and retrieve chat threads, providing a complete conversational history for users.
__Phase 3: Go-to-Market Engine - ICP & Personas__
1. __Conversational Workflow:__ Design and implement the guided, conversational flow to collect information for the Ideal Customer Profile (ICP).
2. __Document Generation:__ Create backend logic (likely using Supabase Edge Functions) that takes the collected data, sends it to an OpenAI model, and generates a comprehensive ICP document.
3. __Display Pages:__ Build dedicated pages to beautifully render the generated ICPs, user personas, industry research, and unique selling propositions.
__Phase 4: Go-to-Market Engine - Sales Playbook & Messaging__
1. __Playbook Generation:__ Similar to the ICP module, create a workflow to generate the Sales Playbook.
2. __Content Sections:__ Develop the UI for the various playbook sections: BDR/AE activities, SOPs, KPIs, messaging templates (email, phone, DM), and sales presentation assets.
__Phase 5: Advanced Integrations & Customization__
1. __CRM Connection:__ Integrate with a CRM API to handle lead management, prospecting, and data enrichment. We will need to decide on a specific CRM to target first.
2. __Custom Assistants:__ Build the functionality for users to create their own assistants, leveraging custom knowledge bases stored in Supabase.
### Recommended Technology Stack
To achieve the "beautiful front end" and robust backend you're looking for, I suggest the following technologies:
- __Frontend Framework:__ __Next.js 14__ (using the App Router). It's a production-grade React framework that offers server-side rendering, static site generation, and a great developer experience.
- __UI Components:__ __Shadcn/UI__. This is not a traditional component library but a collection of reusable, accessible, and beautifully designed components that you can copy and paste into your project. It's built on top of Radix UI and Tailwind CSS.
- __Styling:__ __Tailwind CSS__. A utility-first CSS framework that allows for rapid and custom UI development. It's the industry standard for modern web apps.
- __Backend & Database:__ __Supabase__ (as you requested). We'll use it for the PostgreSQL database, authentication, object storage (for user uploads), and serverless Edge Functions.
- __AI & Agents:__ __OpenAI Assistants API__ and __Vercel AI SDK__. The Vercel SDK simplifies integrating AI chat features into a Next.js application, managing streaming responses and message history.
This plan provides a structured path forward. We can start with Phase 1 to get the foundation in place.
What do you think of this initial plan and technology stack? We can adjust it based on your priorities. Once you're happy with the plan, please ask me to "toggle to
Act Mode (⌘⇧A)," and I can start building the project structure.
API Request$0.0220
Hello! That sounds like an incredibly ambitious and powerful platform. Building "Enably: Go-to-Market Architect" will involve several complex, interconnected components. I'm excited to help you architect this.
Given the scope, I recommend a phased approach to build this out systematically. Here is a high-level plan I've drafted, along with a suggested technology stack to create the "beautiful front end" you've described.
### Proposed Development Plan
__Phase 1: Foundation & Core Frontend__
1. __Project Setup:__ Initialize a new project using a modern web framework.
2. __UI/UX Framework:__ Integrate a component library and styling solution to ensure a consistent and professional look from the start.
3. __Authentication & User Management:__ Set up user sign-up, login, and profile management using Supabase Auth.
4. __Dashboard Shell:__ Create the main application layout, including navigation, a sidebar, and a central content area where the different features will live.
__Phase 2: Central Assistant & Chat Interface__
1. __Chat Component:__ Build a reusable, real-time chat interface.
2. __OpenAI Integration:__ Connect the chat interface to the OpenAI Assistants API to create the "Central Agent."
3. __Conversation History:__ Use Supabase's database to store and retrieve chat threads, providing a complete conversational history for users.
__Phase 3: Go-to-Market Engine - ICP & Personas__
1. __Conversational Workflow:__ Design and implement the guided, conversational flow to collect information for the Ideal Customer Profile (ICP).
2. __Document Generation:__ Create backend logic (likely using Supabase Edge Functions) that takes the collected data, sends it to an OpenAI model, and generates a comprehensive ICP document.
3. __Display Pages:__ Build dedicated pages to beautifully render the generated ICPs, user personas, industry research, and unique selling propositions.
__Phase 4: Go-to-Market Engine - Sales Playbook & Messaging__
1. __Playbook Generation:__ Similar to the ICP module, create a workflow to generate the Sales Playbook.
2. __Content Sections:__ Develop the UI for the various playbook sections: BDR/AE activities, SOPs, KPIs, messaging templates (email, phone, DM), and sales presentation assets.
__Phase 5: Advanced Integrations & Customization__
1. __CRM Connection:__ Integrate with a CRM API to handle lead management, prospecting, and data enrichment. We will need to decide on a specific CRM to target first.
2. __Custom Assistants:__ Build the functionality for users to create their own assistants, leveraging custom knowledge bases stored in Supabase.
### Recommended Technology Stack
To achieve the "beautiful front end" and robust backend you're looking for, I suggest the following technologies:
- __Frontend Framework:__ __Next.js 14__ (using the App Router). It's a production-grade React framework that offers server-side rendering, static site generation, and a great developer experience.
- __UI Components:__ __Shadcn/UI__. This is not a traditional component library but a collection of reusable, accessible, and beautifully designed components that you can copy and paste into your project. It's built on top of Radix UI and Tailwind CSS.
- __Styling:__ __Tailwind CSS__. A utility-first CSS framework that allows for rapid and custom UI development. It's the industry standard for modern web apps.
- __Backend & Database:__ __Supabase__ (as you requested). We'll use it for the PostgreSQL database, authentication, object storage (for user uploads), and serverless Edge Functions.
- __AI & Agents:__ __OpenAI Assistants API__ and __Vercel AI SDK__. The Vercel SDK simplifies integrating AI chat features into a Next.js application, managing streaming responses and message history.
This plan provides a structured path forward. We can start with Phase 1 to get the foundation in place.
What do you think of this initial plan and technology stack? We can adjust it based on your priorities. Once you're happy with the plan, please ask me to "toggle to
Act Mode (⌘⇧A)," and I can start building the project structure.
Responses
Responses
Cline Response
Hello! That sounds like an incredibly ambitious and powerful platform. Building "Enably: Go-to-Market Architect" will involve several complex, interconnected components. I'm excited to help you architect this.
Given the scope, I recommend a phased approach to build this out systematically. Here is a high-level plan I've drafted, along with a suggested technology stack to create the "beautiful front end" you've described.
### Proposed Development Plan
__Phase 1: Foundation & Core Frontend__
1. __Project Setup:__ Initialize a new project using a modern web framework.
2. __UI/UX Framework:__ Integrate a component library and styling solution to ensure a consistent and professional look from the start.
3. __Authentication & User Management:__ Set up user sign-up, login, and profile management using Supabase Auth.
4. __Dashboard Shell:__ Create the main application layout, including navigation, a sidebar, and a central content area where the different features will live.
__Phase 2: Central Assistant & Chat Interface__
1. __Chat Component:__ Build a reusable, real-time chat interface.
2. __OpenAI Integration:__ Connect the chat interface to the OpenAI Assistants API to create the "Central Agent."
3. __Conversation History:__ Use Supabase's database to store and retrieve chat threads, providing a complete conversational history for users.
__Phase 3: Go-to-Market Engine - ICP & Personas__
1. __Conversational Workflow:__ Design and implement the guided, conversational flow to collect information for the Ideal Customer Profile (ICP).
2. __Document Generation:__ Create backend logic (likely using Supabase Edge Functions) that takes the collected data, sends it to an OpenAI model, and generates a comprehensive ICP document.
3. __Display Pages:__ Build dedicated pages to beautifully render the generated ICPs, user personas, industry research, and unique selling propositions.
__Phase 4: Go-to-Market Engine - Sales Playbook & Messaging__
1. __Playbook Generation:__ Similar to the ICP module, create a workflow to generate the Sales Playbook.
2. __Content Sections:__ Develop the UI for the various playbook sections: BDR/AE activities, SOPs, KPIs, messaging templates (email, phone, DM), and sales presentation assets.
__Phase 5: Advanced Integrations & Customization__
1. __CRM Connection:__ Integrate with a CRM API to handle lead management, prospecting, and data enrichment. We will need to decide on a specific CRM to target first.
2. __Custom Assistants:__ Build the functionality for users to create their own assistants, leveraging custom knowledge bases stored in Supabase.
### Recommended Technology Stack
To achieve the "beautiful front end" and robust backend you're looking for, I suggest the following technologies:
- __Frontend Framework:__ __Next.js 14__ (using the App Router). It's a production-grade React framework that offers server-side rendering, static site generation, and a great developer experience.
- __UI Components:__ __Shadcn/UI__. This is not a traditional component library but a collection of reusable, accessible, and beautifully designed components that you can copy and paste into your project. It's built on top of Radix UI and Tailwind CSS.
- __Styling:__ __Tailwind CSS__. A utility-first CSS framework that allows for rapid and custom UI development. It's the industry standard for modern web apps.
- __Backend & Database:__ __Supabase__ (as you requested). We'll use it for the PostgreSQL database, authentication, object storage (for user uploads), and serverless Edge Functions.
- __AI & Agents:__ __OpenAI Assistants API__ and __Vercel AI SDK__. The Vercel SDK simplifies integrating AI chat features into a Next.js application, managing streaming responses and message history.
This plan provides a structured path forward. We can start with Phase 1 to get the foundation in place.
What do you think of this initial plan and technology stack? We can adjust it based on your priorities. Once you're happy with the plan, please ask me to "toggle to
Act Mode (⌘⇧A)," and I can start building the project structure.
API Request$0.0220
Hello! That sounds like an incredibly ambitious and powerful platform. Building "Enably: Go-to-Market Architect" will involve several complex, interconnected components. I'm excited to help you architect this.
Given the scope, I recommend a phased approach to build this out systematically. Here is a high-level plan I've drafted, along with a suggested technology stack to create the "beautiful front end" you've described.
### Proposed Development Plan
__Phase 1: Foundation & Core Frontend__
1. __Project Setup:__ Initialize a new project using a modern web framework.
2. __UI/UX Framework:__ Integrate a component library and styling solution to ensure a consistent and professional look from the start.
3. __Authentication & User Management:__ Set up user sign-up, login, and profile management using Supabase Auth.
4. __Dashboard Shell:__ Create the main application layout, including navigation, a sidebar, and a central content area where the different features will live.
__Phase 2: Central Assistant & Chat Interface__
1. __Chat Component:__ Build a reusable, real-time chat interface.
2. __OpenAI Integration:__ Connect the chat interface to the OpenAI Assistants API to create the "Central Agent."
3. __Conversation History:__ Use Supabase's database to store and retrieve chat threads, providing a complete conversational history for users.
__Phase 3: Go-to-Market Engine - ICP & Personas__
1. __Conversational Workflow:__ Design and implement the guided, conversational flow to collect information for the Ideal Customer Profile (ICP).
2. __Document Generation:__ Create backend logic (likely using Supabase Edge Functions) that takes the collected data, sends it to an OpenAI model, and generates a comprehensive ICP document.
3. __Display Pages:__ Build dedicated pages to beautifully render the generated ICPs, user personas, industry research, and unique selling propositions.
__Phase 4: Go-to-Market Engine - Sales Playbook & Messaging__
1. __Playbook Generation:__ Similar to the ICP module, create a workflow to generate the Sales Playbook.
2. __Content Sections:__ Develop the UI for the various playbook sections: BDR/AE activities, SOPs, KPIs, messaging templates (email, phone, DM), and sales presentation assets.
__Phase 5: Advanced Integrations & Customization__
1. __CRM Connection:__ Integrate with a CRM API to handle lead management, prospecting, and data enrichment. We will need to decide on a specific CRM to target first.
2. __Custom Assistants:__ Build the functionality for users to create their own assistants, leveraging custom knowledge bases stored in Supabase.
### Recommended Technology Stack
To achieve the "beautiful front end" and robust backend you're looking for, I suggest the following technologies:
- __Frontend Framework:__ __Next.js 14__ (using the App Router). It's a production-grade React framework that offers server-side rendering, static site generation, and a great developer experience.
- __UI Components:__ __Shadcn/UI__. This is not a traditional component library but a collection of reusable, accessible, and beautifully designed components that you can copy and paste into your project. It's built on top of Radix UI and Tailwind CSS.
- __Styling:__ __Tailwind CSS__. A utility-first CSS framework that allows for rapid and custom UI development. It's the industry standard for modern web apps.
- __Backend & Database:__ __Supabase__ (as you requested). We'll use it for the PostgreSQL database, authentication, object storage (for user uploads), and serverless Edge Functions.
- __AI & Agents:__ __OpenAI Assistants API__ and __Vercel AI SDK__. The Vercel SDK simplifies integrating AI chat features into a Next.js application, managing streaming responses and message history.
This plan provides a structured path forward. We can start with Phase 1 to get the foundation in place.
What do you think of this initial plan and technology stack? We can adjust it based on your priorities. Once you're happy with the plan, please ask me to "toggle to
Act Mode (⌘⇧A)," and I can start building the project structure.
Components
Components 
Assistant chat
Assistant chat
npx shadcn@latest add "
https://21st.dev/r/coderislive07/ai-assistat
"
21st.dev - Craft with AI
 - 
https://21st.dev/coderislive07/ai-assistat/default
