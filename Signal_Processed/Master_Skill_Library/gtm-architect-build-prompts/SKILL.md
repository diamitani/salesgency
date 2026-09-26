---
name: gtm-architect-build-prompts
description: Process/Note derived from GTM Architect Build Prompts.docx
source_path: GTM Architect Build Prompts.docx
---

# GTM Architect Build Prompts.docx

## Context
This skill provides knowledge, processes, and instructions derived from the document: `GTM Architect Build Prompts.docx`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

Original Prompt:
Original Prompt:
i am using v0 and i intend to build a Go-To-Market Architect Wizard. Ideally, this is a chat based assistant, that uses a wizard theme and design, to walk a user through uploading their content or developing new content using AI, to have a fully built GTM assistant ready for them at the end of the process. They may copy and paste their website info (not necessarily just the link becuase it might not read it) , upload their documents, for products, etc, anything and everyhting about their company, product and indutry. and each step, it will guide the user to add it to their knowledge base, or create new documentation, like case studies, use cases, icps, etc. the goal is to have at the end of the document and link and assistant conversational question, a dashboard, where you can go and ask to create GTM materials, like use case one pagers, ICPs, a full completely playbook, email campaign text and more, baased on your personal business. help me write hte promp for this eautiful platform and dashboard and landing page. Thank you and God bless
Main Prompt
V0 Prompts - GTM Architect
Powered by:
Create a fantasy-themed landing page and dashboard UI for a SaaS product called "Go-To-Market Architect Wizard". The UI should feel magical and whimsical, using a wizard aesthetic (dark purples, enchanted glows, scroll-like cards). Include:
- A landing hero section with a floating wizard hat icon, big headline: "Summon Your GTM Strategy"
- CTA button: "Start Your Wizard Journey"
- Sections below for: Features (chat-based assistant, document uploads, AI GTM generation), Testimonials, Pricing Plans
- Use shadcn/ui components with Tailwind v4
- Add animations using Framer Motion (e.g. glowing button hover, scroll fade-ins)
- Add dark/light theme toggle
Also generate a second page: 
- A user dashboard layout with top nav, sidebar (links: Wizard Chat, Knowledge Base, Generate Materials), and a main panel
- The chat panel shows a chat UI with wizard-style bubbles (e.g., floating parchment design)
- Sidebar icons should match fantasy theme (e.g., wand, scroll, potion)
Use shadcn/ui with composition-ready layout, Tailwind v4 utility classes, and accessible components. Include page transitions and loading states styled like magical spells.
Supabase DB schema for GTM Wizard
Supabase DB schema for GTM Wizard
Design a PostgreSQL schema for a SaaS wizard assistant. Tables:
- users: id (uuid, pk), email (text), name (text), created_at (timestamp)
- files: id (uuid, pk), user_id (fk), filename (text), type (text), url (text), created_at
- knowledge_entries: id (uuid, pk), user_id (fk), content (text), source (text), created_at
- gtm_outputs: id (uuid, pk), user_id (fk), type (text), content (text), created_at
Each user uploads files or pastes data to build a knowledge base. AI uses this to generate GTM content (ICP, emails, etc.).
Auth setup with Supabase and magic link
Auth setup with Supabase and magic link
Build a login page using shadcn/ui for a SaaS app with magic link auth via Supabase. Include:
- Email input field
- "Send Magic Link" button
- Success/failure toast feedback
- Form validation
- Post-login redirect to /dashboard
Use Next.js 15, Supabase client, and Tailwind v4. Make it styled like a wizard login with glowy inputs.
AI Assistant Chat Interface
AI Assistant Chat Interface
Design a clean, professional chat interface for a SaaS GTM assistant. Features:
- Two-pane layout: sidebar with "Knowledge", "Generate", and "Assistant", main pane for chat
- Chat bubbles styled like modern note cards (rounded, subtle shadows, sans-serif)
- Input bar pinned at bottom with:
  - Textarea input
  - "Send" button with loading spinner
- Typing indicator styled like “Assistant is thinking...”
- Use shadcn/ui, Tailwind v4, and accessible keyboard nav
- Include empty state with message: “Ask your GTM Architect anything…”
Avoid fantasy visuals. Aim for strategic/architect tone: elegant serif titles, modern sans UI.
Supabase Edge Function using Gemini API
Supabase Edge Function: 
/functions/chat-wizard
 using Gemini API
Create a Supabase Edge Function named `chat-wizard` that:
1. Accepts a POST request with { userId, message }
2. Queries Supabase `knowledge_entries` table for that user
3. Sends the message + entries as context to Gemini Pro via Google AI Studio API
4. Returns the response text as JSON
Use `@supabase/supabase-js` to query, and `fetch()` to call Gemini. Load Gemini API key from environment vars.
Upload files + extract content into knowledge base
Upload files + extract content into knowledge base
Create a UI + API for file upload (PDF, TXT) that does:
- Drag and drop or file select
- Show file preview
- On upload, extract text (client or server) and save to Supabase:
  - Add file to files table
  - Add extracted content to knowledge_entries table
Use shadcn/ui Dropzone component, Supabase Storage, and Tailwind v4.
AI content generation dashboard for GTM outputs
AI content generation dashboard for GTM outputs
Design a dashboard section for generating GTM materials with tabs:
- Use Case One-Pager
- Ideal Customer Profile (ICP)
- Sales Email Campaign
- GTM Playbook
Each tab has a "Generate" button that calls `/api/generate?type={type}`. Show spinner, then render result in a styled card with copy button.
Styled with shadcn/ui, Tailwind v4, and Framer Motion.
Supabase Edge Function with Gemini API
Supabase Edge Function: 
/functions/generate-gtm
 with Gemini API
Create a Supabase Edge Function called `generate-gtm` that:
- Accepts POST with { userId, type }
- Looks up related `knowledge_entries` from Supabase
- Sends prompt to Gemini Pro based on `type`, e.g.:
  - type = "ICP": "Using this company info, generate an Ideal Customer Profile..."
  - type = "use_case": "Create a one-pager use case for this product..."
  - etc.
- Saves result in `gtm_outputs` table
- Returns result as JSON
Use Gemini API key from env. Include error and logging handling.
Admin UI for knowledge entries (list + edit)
Admin UI for knowledge entries (list + edit)
Create a dashboard section to manage uploaded knowledge:
- Table of entries: content preview, source, created date
- Edit modal to tweak content
- Delete button with confirm dialog
- Search bar at top
- Uses shadcn/ui Table, Dialog, Input components
Style it like a spellbook admin panel with Tailwind v4.
UX flows for error, empty, and loading states
UX flows for error, empty, and loading states
Add global UI states for better UX:
- Loading spinner with glowing magical orb animation
- Empty state with wizard illustration and "Nothing here yet!"
- Error toast with "The spell misfired..." messaging
- Use shadcn/ui Toast, Skeleton, and Alert components
- Style everything with Tailwind v4
Plug into chat, file upload, and generate flows.
Prompt tester
Prompt tester to try your own prompts + see response
Add a "Prompt Lab" to dashboard:
- Input textarea for custom prompt
- Optional selector for tone (casual, formal, wizard)
- Output box to view AI response
- Button: "Run Prompt"
- Show loading and save outputs to gtm_outputs
Use shadcn/ui, Tailwind v4, and styled like a magical testing room.
Helper function
Helper function to call Gemini with custom prompt + context
Create a TypeScript function to call Gemini Pro API via Google AI Studio endpoint. Inputs:
- prompt (string)
- context (string[])
- apiKey (from env)
Output:
- Combined result text from Gemini
- Handle streaming if supported, fallback to full response
Use `fetch()` with Gemini JSON schema, including content safety headers and error catch.
