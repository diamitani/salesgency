---
name: figma-sentinel-v5-unrestricted-collection
description: Process/Note derived from figma-sentinel-v5-unrestricted-collection.md
source_path: figma-sentinel-v5-unrestricted-collection.md
---

# figma-sentinel-v5-unrestricted-collection.md

## Context
This skill provides knowledge, processes, and instructions derived from the document: `figma-sentinel-v5-unrestricted-collection.md`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

# Figma Sentinel v5 — Unrestricted collection patch

Apply this patch to `soul.md` and the listed Gumloop skills.

## New operating principle

Collect **any relevant, reachable Figma link or comment**. There is no target number of URLs, no minimum number of comments, and no arbitrary cap on thread discovery.

The agent should be easy to use:
- One relevant URL is enough to analyze and store.
- One relevant comment is enough to classify and route.
- A run may return zero new results; report that honestly.
- Collect all accessible results returned by a source, respecting only source pagination, API limits, timeouts, and rate limits.
- Never stop because it did not reach 100 links.
- Never reject a run because a thread has a low comment count.

## Replace in soul.md

### Replace “Two modes only” with
