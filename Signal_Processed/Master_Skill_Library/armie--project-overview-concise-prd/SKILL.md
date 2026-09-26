---
name: armie--project-overview-concise-prd
description: Process/Note derived from Armie – Project Overview (Concise PRD).docx
source_path: Armie – Project Overview (Concise PRD).docx
---

# Armie – Project Overview (Concise PRD).docx

## Context
This skill provides knowledge, processes, and instructions derived from the document: `Armie – Project Overview (Concise PRD).docx`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

Tab 1
Armie – Project Overview (Concise PRD)
Purpose
Prompts and copy blocks to generate a homepage and in-app dashboard for 
Armie
, the Artist Manager Assistant. Designed for v0.dev or any AI UI/code generator. Copy is modular; keep voice friendly, actionable, and artist-focused.
Global Creative Brief (use in every generation)
Product
: An AI manager for independent artists. Armie organizes tools, contracts, and tasks into one workspace: EPKs, press, PRO registration, licensing, campaign launches, merch, and financial wellness. Includes assistants (from CSVs) to handle repetitive artist development workflows.
Audience
: Independent musicians, creatives, and small teams.
Brand Voice
: Empowering, approachable, concise. Plain-spoken (no jargon). Tone of a trusted manager/mentor.
Design Aesthetic
: Clean modern SaaS. Music-adjacent cues (subtle waveforms, vinyl textures). Rounded-2xl, soft shadows.
Primary color = royal purple (#6D28D9)
Accent = coral (#F43F5E)
Neutral = slate palette
Primary CTA
: “Launch My Artist Plan”
Secondary CTA
: “Explore Armie’s Toolkit”
Proof
: Logo strip of music brands / testimonials.
Navigation
: Dashboard · Toolkit · Campaigns · Contracts · Finances · Assistant · Settings
Accessibility
: WCAG AA, min contrast 4.5:1, keyboard nav, prefers-reduced-motion friendly.
Prompt — Homepage (System + User)
SYSTEM
 You are a senior product designer and frontend engineer. Generate a production-ready Next.js + Tailwind homepage with shadcn/ui components.
USER – Build the Homepage for “Armie”
 Requirements:
Hero
Headline: “Your AI Artist Manager.”
Subhead: “Plan, launch, and grow your career with contracts, campaigns, and a manager that never sleeps.”
CTAs: Primary Launch My Artist Plan; Secondary Explore Armie’s Toolkit.
Visual: stacked mock cards (EPK preview, Contract generator, Campaign progress).
Trust strip with logos / small testimonials.
Outcomes Section (“Why artists choose Armie”)
3–4 cards with icon + stat + sentence:
“EPK ready in 10 minutes.”
“Contracts tailored to your needs instantly.”
“First campaign live in under an hour.”
“Track royalties & finances in one dashboard.”
Toolkit Section
Grid showing tool categories: EPKs, Contracts, Campaigns, Merch, Licensing, Finances.
Each card links to assistant detail.
Assistants Section
Carousel of AI assistants from CSV: e.g. “Press Release Generator”, “PRO Registration Guide”, “Campaign Builder”.
Include preview chat bubble.
Artist Roadmap Section
Stepper illustration: Setup → Assets → Campaigns → Distribution → Growth.
CTA to launch roadmap.
Security & Compliance
Bullets: “Data encrypted at rest”, “Secure contracts & uploads”, “Role-based access”.
Footer
Links to Product, Company, Resources; socials.
Prompt — Dashboard (System + User)
SYSTEM
 Generate a production-ready dashboard page in Next.js + Tailwind + shadcn/ui.
USER – Build the Dashboard for “Armie”
 Requirements:
Page Header
Title: Dashboard
Subtitle: “Your career at a glance.”
Primary CTA: Launch Artist Plan (if no data); else Open Roadmap.
Career Progress Overview
Progress ring (EPK, Contracts, Campaigns, Merch, Finances).
Assistant availability indicator.
Today’s Focus
Task list (auto-generated from assistants): e.g., “Register 1 song with BMI”, “Send press release”, “Set up merch campaign.”
Recent Docs
Table with Title, Type (Contract/EPK/Campaign), Updated, Actions.
Assistant Shortcut
Compact chat: placeholder “Ask Armie to draft a press release…”
Financial Snapshot
Mini-cards: royalties tracked, expenses logged, campaign ROI.
Right Rail (xl+)
Metrics: assets created, submissions sent, fans reached.
Copy Library (plug-and-play)
Headlines
“Your AI Artist Manager.”
“From ideas to income in hours.”
Subheads
“Plan, launch, and grow your career with contracts, campaigns, and a manager that never sleeps.”
CTAs
Primary: “Launch My Artist Plan”
Secondary: “Explore Armie’s Toolkit”
Benefit Bullets
“EPKs in 10 minutes.”
“Custom contracts for every deal.”
“Campaigns launched same day.”
“One dashboard for finances, royalties, and growth.”
Component Guidelines
Use shadcn/ui (Button, Card, Tabs, Badge, Table, Progress, Tooltip, Dialog, Skeleton).
Spacing: space-y-6; grid gap-6.
Cards: rounded-2xl border-slate-200 shadow-sm hover:shadow-md.
Headings: Hero = text-4xl font-semibold; Section = text-xl font-semibold.
Icons: lucide-react (Music, FileText, DollarSign, Sparkles).
Animations: framer-motion fade/slide; respect reduced motion.
Sample Placeholder Data (Dashboard)
{
  "career": {"complete": 0.5, "sections": {"EPK": true, "Contracts": true, "Campaigns": false, "Merch": false, "Finances": true}},
  "tasksToday": [
    {"type":"contract","task":"Draft split sheet"},
    {"type":"press","task":"Send press release"},
    {"type":"finance","task":"Log streaming royalties"}
  ],
  "recentDocs": [
    {"title":"Summer Tour Press Release","type":"Press","updated":"2025-09-10"},
    {"title":"Split Sheet Template","type":"Contract","updated":"2025-09-12"}
  ]
}
Acceptance Checklist
Lighthouse ≥ 90 accessibility & performance.
CLS < 0.02.
No layout shift on font load.
Keyboard reachability on all actions.
One-Shot “Make It” Prompt (for v0/dev)
Build a responsive Next.js + Tailwind homepage and dashboard for a SaaS called Armie, the AI Artist Manager. Use shadcn/ui + lucide-react. Aesthetic: clean, modern, rounded-2xl, primary #6D28D9, accent #F43F5E. Accessibility first. Include hero with CTAs, outcomes, toolkit grid, assistants carousel, roadmap stepper, and structured footer. Then build a signed-in dashboard with progress cards, today’s tasks, recent docs, assistant quick input, financial snapshot, and right-rail metrics. Provide production-ready React components with Tailwind, semantic HTML, aria labels, skeleton/empty states, and small framer-motion animations.
Tab 2
Armie – Project Overview (PRD v2 with Assistants)
Purpose
Prompts and copy blocks to generate a homepage and dashboard for 
Armie
, the AI Artist Manager Assistant. Designed for v0.dev or any AI UI/code generator. Copy is modular; keep voice friendly, artist-first, and actionable.
Global Creative Brief
Product
: An AI manager for independent artists. Armie organizes tools, contracts, campaigns, and finances into one workspace. Includes 20+ assistants for tasks like EPK creation, PRO registration, licensing, campaign building, merch, and royalties.
Audience
: Independent musicians, creatives, and small teams.
Brand Voice
: Empowering, approachable, concise. Tone of a trusted manager/mentor.
Design Aesthetic
: Clean SaaS with subtle music cues (waveforms, vinyl textures).
Primary = royal purple 
#6D28D9
Accent = coral 
#F43F5E
Neutral = Tailwind slate
Primary CTA
: “Launch My Artist Plan”
Secondary CTA
: “Explore Armie’s Toolkit”
Navigation
: Dashboard · Toolkit · Campaigns · Contracts · Finances · Assistants · Settings
Prompt — Homepage
SYSTEM
 You are a senior product designer and frontend engineer. Generate a production-ready Next.js + Tailwind homepage with shadcn/ui.
USER Requirements
Hero
Headline: “Your AI Artist Manager.”
Subhead: “Plan, launch, and grow your career with contracts, campaigns, and a manager that never sleeps.”
CTAs: Launch My Artist Plan (primary), Explore Armie’s Toolkit (secondary).
Visual: stacked mock cards (EPK preview, Contract generator, Campaign progress).
Trust strip with logos/testimonials.
Outcomes Section (“Why artists choose Armie”)
“EPK ready in 10 minutes.”
“Contracts tailored instantly.”
“First campaign live in an hour.”
“Track royalties & finances in one dashboard.”
Toolkit Grid
 (directly from CSV categories)
EPK Builder
Contract Generator
Campaign Builder
Licensing Assistant
Merch Designer
Financial Wellness Hub
Assistants Carousel
 (from CSVs, hard-coded)
Press Release Generator
PRO Registration Guide
Music Submissions Assistant
Copyright Registration Helper
Social Media Automation Assistant
Artist Roadmap Builder
Tour Booking Assistant
Merch Design Assistant
Promo Cards Creator
Custom Music Contracts Generator
EPK One-Sheet Assistant
Artist Bio Builder
Campaign Manager
Distribution & Publishing Assistant
Roadmap Section
Stepper: Setup → Assets → Campaigns → Distribution → Growth.
Security & Compliance
Bullets: Data encrypted at rest, Secure contracts & uploads, Role-based access.
Footer
Links: Product, Company, Resources, Socials.
Prompt — Dashboard
SYSTEM
 Generate a production-ready dashboard page (Next.js + Tailwind + shadcn/ui).
USER Requirements
Header
Title: Dashboard
Subtitle: “Your career at a glance.”
CTA: Launch Artist Plan (if empty); else Open Roadmap.
Career Progress
Ring showing: EPK · Contracts · Campaigns · Merch · Finances.
Today’s Focus
Auto-generated tasks from assistants (examples):
“Register a new song with BMI.”
“Send press release to blogs.”
“Set up merch campaign.”
Recent Docs
Table: Title · Type · Updated · Actions.
Assistant Shortcut
Compact chat: “Ask Armie to draft a press release…”
Financial Snapshot
Royalties tracked, Expenses logged, Campaign ROI.
Right Rail (xl+)
Metrics: Assets created, Submissions sent, Fans reached.
Copy Library
Headlines
“Your AI Artist Manager.”
“From ideas to income in hours.”
CTAs
Launch My Artist Plan
Explore Armie’s Toolkit
Benefit Bullets
“EPKs in 10 minutes.”
“Custom contracts for every deal.”
“Campaigns launched same day.”
“One dashboard for finances, royalties, and growth.”
Component Guidelines
shadcn/ui: Button, Card, Tabs, Badge, Table, Progress, Tooltip, Dialog, Skeleton.
Spacing: 
space-y-6
, grid 
gap-6
.
Cards: 
rounded-2xl border-slate-200 shadow-sm hover:shadow-md
.
Icons: lucide-react (Music, FileText, DollarSign, Sparkles).
Animations: framer-motion fade/slide; respect reduced motion.
Sample Dashboard Data
{
  "career": {"complete": 0.5, "sections": {"EPK": true, "Contracts": true, "Campaigns": false, "Merch": false, "Finances": true}},
  "tasksToday": [
    {"type":"contract","task":"Draft split sheet"},
    {"type":"press","task":"Send Summer Tour press release"},
    {"type":"finance","task":"Log Spotify royalties"}
  ],
  "recentDocs": [
    {"title":"Split Sheet Template","type":"Contract","updated":"2025-09-12"},
    {"title":"Summer Tour Press Release","type":"Press","updated":"2025-09-10"}
  ]
}
Acceptance Checklist
Lighthouse ≥ 90 performance & a11y.
CLS < 0.02.
Keyboard reachability on all actions.
No layout shift on font load.
One-Shot “Make It” Prompt
Build a responsive Next.js + Tailwind homepage and dashboard for Armie, the AI Artist Manager. Use shadcn/ui + lucide-react. Aesthetic: clean, modern, rounded-2xl, primary 
#6D28D9
, accent 
#F43F5E
. Accessibility first. Homepage: hero with CTAs, outcomes cards, toolkit grid, assistants carousel (with named assistants above), roadmap stepper, and structured footer. Dashboard: progress ring, today’s tasks, recent docs, assistant quick input, financial snapshot, right-rail metrics. Provide production-ready React components with Tailwind, semantic HTML, aria labels, skeleton/empty states, and framer-motion animations.
Tab 3
Armie – Project Overview (PRD v3 with Assistants + Descriptions)
Purpose
Generate a homepage and dashboard for 
Armie
, the AI Artist Manager. Designed for v0.dev or similar. Copy and structure are concise, modular, and generator-friendly.
Global Creative Brief
Product
: AI manager for independent artists. Organizes tools, contracts, campaigns, merch, and finances into one workspace. Backed by assistants for admin-heavy artist development tasks.
Audience
: Independent musicians and creatives.
Voice
: Empowering, approachable, concise. Mentor/manager tone.
Aesthetic
: Clean SaaS with music cues (subtle waveforms, vinyl textures).
Primary = royal purple 
#6D28D9
Accent = coral 
#F43F5E
Primary CTA
: “Launch My Artist Plan”
Secondary CTA
: “Explore Armie’s Toolkit”
Navigation
: Dashboard · Toolkit · Campaigns · Contracts · Finances · Assistants · Settings
Homepage Prompt
Hero
Headline: “Your AI Artist Manager.”
Subhead: “Plan, launch, and grow your career with contracts, campaigns, and a manager that never sleeps.”
CTAs: Launch My Artist Plan / Explore Toolkit.
Visual: stacked cards (EPK preview, Contract generator, Campaign progress).
Outcomes
EPK ready in 10 minutes.
Contracts tailored instantly.
First campaign live in 1 hour.
Track royalties & finances in one dashboard.
Toolkit Grid
EPK Builder
Contract Generator
Campaign Builder
Licensing Assistant
Merch Designer
Financial Hub
Assistants Carousel (with descriptions)
Press Release Generator
 – Draft and format press releases for blogs, radio, and media.
PRO Registration Guide
 – Step-by-step guidance for ASCAP/BMI sign-up.
Music Submissions Assistant
 – Upload and submit tracks to playlists, blogs, and venues.
Copyright Registration Helper
 – File copyright claims and registrations correctly.
Social Media Automation Assistant
 – Generate and schedule branded content posts.
Artist Roadmap Builder
 – Create a milestone-based plan for career growth.
Tour Booking Assistant
 – Manage venue outreach, dates, and routing.
Merch Design Assistant
 – Create designs and upload assets for merch production.
Promo Cards Creator
 – Generate promotional graphics for social and events.
Custom Music Contracts Generator
 – Auto-fill music contract templates (split sheets, management, etc.).
EPK One-Sheet Assistant
 – Build professional press kits with bios, links, and photos.
Artist Bio Builder
 – Draft and polish compelling artist bios.
Campaign Manager
 – Launch and track promotional campaigns across channels.
Distribution & Publishing Assistant
 – Help set up distribution (DistroKid, Tunecore) and register with PROs.
Roadmap Section
 Stepper: Setup → Assets → Campaigns → Distribution → Growth.
Footer
 Standard product/company/resources/social.
Dashboard Prompt
Career Progress Ring
 Sections: EPK, Contracts, Campaigns, Merch, Finances.
Today’s Focus (auto-generated from assistants)
Register a new song with BMI.
Send press release to blogs.
Set up merch campaign.
Recent Docs Table
Title · Type · Updated · Actions.
Assistant Shortcut
 Compact chat: “Ask Armie to draft a press release…”
Financial Snapshot
Royalties tracked, Expenses logged, Campaign ROI.
Right Rail
Assets created, Submissions sent, Fans reached.
Copy Blocks
Headlines
: “Your AI Artist Manager.” / “From ideas to income in hours.”
 
Benefit Bullets
: EPKs in 10 minutes · Custom contracts · Campaigns same day · One dashboard for finances.
Sample Data
{
  "career": {"complete": 0.5, "sections": {"EPK": true, "Contracts": true, "Campaigns": false, "Merch": false, "Finances": true}},
  "tasksToday": [
    {"type":"contract","task":"Draft split sheet"},
    {"type":"press","task":"Send Summer Tour press release"},
    {"type":"finance","task":"Log Spotify royalties"}
  ],
  "recentDocs": [
    {"title":"Split Sheet Template","type":"Contract","updated":"2025-09-12"},
    {"title":"Summer Tour Press Release","type":"Press","updated":"2025-09-10"}
  ]
}
One-Shot “Make It” Prompt
Build a responsive Next.js + Tailwind homepage and dashboard for Armie, the AI Artist Manager. Use shadcn/ui + lucide-react. Aesthetic: clean, modern, rounded-2xl, primary 
#6D28D9
, accent 
#F43F5E
. Accessibility first. Homepage: hero with CTAs, outcomes, toolkit grid, assistants carousel (with names and descriptions above), roadmap stepper, and structured footer. Dashboard: progress ring, today’s tasks, recent docs, assistant quick input, financial snapshot, right-rail metrics. Provide production-ready React components with Tailwind, semantic HTML, aria labels, skeleton/empty states, and framer-motion animations.
