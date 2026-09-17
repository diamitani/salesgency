# DDC Intake - v2 (SalesGency Platform Rebuild)

**Run ID:** `ddc_20260917_salesgency_rebuild`  
**Timestamp:** 2026-09-17T16:00:00-05:00  
**Framework:** Delali Development Cycle (DDC) Planning Runtime v1.0.0  
**Status:** `in_progress`  
**Education Mode:** `true`  
**GTM Enabled:** `true`  
**Payments:** `auto`  

---

## 1. Raw Operator Input
- **Prompt:** `"pull the github repo. We're building a front end for SalesGency. A GTM AI & Automation Agency. Use www.salesgency.com as a referency for copy. extract what you can about the site products skills tools etc. and rebuild it, except with a clean ui, structured site map, core marketplace and project sections etc. and then the backend dashboard and agent with tools outputs etc. to make it a full saas/agency platform. i like this design: https://www.figma.com/design/M288tzVcfbjxF7g9S3c105/Design-Agency-Web-Landing-Page--Community-?m=auto&t=HJ8Oy6sRMODk0sS0-1 but you can use any other that makes sense. clean. modern look. use logo and branding."`
- **Reference Site:** `www.salesgency.com` (Live copy, core offerings, 8-stage PAE engine, 6 activations, 42 skills, n8n templates)
- **Design Reference:** Figma Design Agency Web Landing Page (Obsidian dark mode `#090A0F`, cyan-to-purple gradient highlights, glassmorphism cards, glowing borders, crisp typography)
- **Branding Assets Extracted:**
  - Logos: `assets/salesgency-wordmark-gradient.svg`, `assets/salesgency-wordmark-light.svg`, `assets/salesgency-wordmark-dark.svg`
  - Client / Project Assets: `assets/project-aeorim.jpg`, `assets/project-archin.jpg`, `assets/project-vntnr.jpg`, `assets/founder.jpg`

---

## 2. Inferred Capabilities & Platform Scope
1. **Core Public Site (High-Converting Agency Front-End):**
   - Clean, modern layout using custom CSS design system (`assets/sg-design-system.css`).
   - Structured navigation & sitemap: Agency Home (`index.html`), Marketplace (`marketplace.html`), Skills (`skills.html`), Templates (`templates.html`), Agency Services (`agency.html`), Case Studies (`case-studies.html`), Pricing (`pricing.html`), Booking (`book.html`).
2. **Core Marketplace Hub (`marketplace.html`):**
   - 25+ products cataloged with categories, live search, instant preview modal, free downloads, and Stripe checkout links.
3. **Backend SaaS Dashboard & GTM Agent Workspace (`app.html` & `portal.html`):**
   - Overview metrics dashboard.
   - Interactive GTM AI Agent with 5 real-time tool execution engines (Prospect Waterfall, CRM Dedupe Shield, PAS Copywriter, n8n Workflow JSON Builder, Soul Configurator).
   - Live workflow orchestration logs & payload inspector.
   - Self-service custom package zip generator (`/api/portal/generate`).
