---
name: pae-individual-system-architecture
description: Process/Note derived from pae-individual-system-architecture.md
source_path: pae2/pae-individual-system-architecture.md
---

# pae-individual-system-architecture.md

## Context
This skill provides knowledge, processes, and instructions derived from the document: `pae-individual-system-architecture.md`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

# PAE Individual System — Sitemap & Compile Architecture

**Product:** Prospect Automation Engineer — Build with agent (self-serve)
**Status:** Spec for last-mile build
**Date:** 2026-08-26

The Amplemarket + CRM template is a **reference implementation**, not the product. The individual system compiles a client-specific n8n workflow from business context + stack bindings.

---

## 1. Mental model

Two compilers run after intake. They share one instruction pack.

| Compiler | Input | Output |
|---|---|---|
| Prompt compiler | Company, product, ICP, persona, voice, proof | System prompt for the AI node |
| Graph compiler | Trigger, CRM, data API, sequencer, LLM, gates | n8n `workflow.json` + credential setup guide |

The graph is a **capability path**, not a vendor path:
