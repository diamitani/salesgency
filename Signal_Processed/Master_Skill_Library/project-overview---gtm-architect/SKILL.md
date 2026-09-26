---
name: project-overview---gtm-architect
description: Process/Note derived from Project Overview - GTM Architect.docx
source_path: Project Overview - GTM Architect.docx
---

# Project Overview - GTM Architect.docx

## Context
This skill provides knowledge, processes, and instructions derived from the document: `Project Overview - GTM Architect.docx`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

Project Overview
Name:
 Go-To-Market Architect Wizard
 
Core Purpose:
 A guided, chat-based assistant in a whimsical “wizard” theme that helps users build their company’s go-to-market (GTM) materials by uploading their content or generating new content using AI.
 
Core Features:
Chat-based wizard interface
Upload content (e.g., website info, PDFs, product docs)
Build knowledge base from user input
AI-generated GTM assets (ICPs, use cases, email campaigns, full playbooks)
Dashboard to manage knowledge, generate materials, and ask AI for outputs
Tech Stack:
Frontend:
 Next.js 15 + Tailwind CSS v4 + shadcn/ui
Backend:
 Edge Functions via Vercel + Supabase
AI:
 OpenAI API (text generation, embedding for KB)
Storage:
 Supabase Storage for uploads
Authentication:
 Supabase Auth (magic link or OAuth)
Integrations:
 OpenAI, Stripe (for tiered pricing later), Vercel API (for deployments)
