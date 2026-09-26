---
name: prospect-pal-landing-copy-deck
description: Process/Note derived from Prospect-PAL-Landing-Copy-Deck.md
source_path: Prospect-PAL-Landing-Copy-Deck.md
---

# Prospect-PAL-Landing-Copy-Deck.md

## Context
This skill provides knowledge, processes, and instructions derived from the document: `Prospect-PAL-Landing-Copy-Deck.md`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

---
artifact_type: marketing-copy-deck
document_type: landing-text-mockup
project_id: prospect-pal
page: /
route: src/app/(marketing)/home/page.tsx
kit: Prospect PAL Design System/ui_kits/marketing
audience_agent: pal-website-agent
secondary_agents: [cto-dev-engineer, marketing-implementer]
status: approved-copy
version: v1
last_updated: 2026-08-27
owner: product
approval_state: copy-locked-layout-open
---

# Prospect PAL — Landing copy deck and text mockup

Feed this file to the website agent as the **source of truth for marketing strings**. Do not invent slogans. Do not restore the previous “Answer eight questions” hero. Place copy in the slots below. If a slot is empty, leave the current UI string only when marked `KEEP`.

## Agent instructions

1. Read this deck before editing `page.tsx`, `Hero.jsx`, `Sections.jsx`, `SiteChrome.jsx`, or `site.config.ts`.
2. Replace strings by `slot_id`. Do not rewrite nearby microcopy unless a slot is provided.
3. Keep the marketing chrome: announcement strip, sticky nav, hero + canvas, section grid, pricing cards, footer.
4. New copy needs two extra sections: **How it works** (`#process`) and **Agent tools** (`#tools`). Insert them in the page order below.
5. Park **Signals** (`#signals`) off the primary nav. Do not delete the component; hide or move below the fold until new signal copy exists.
6. Voice: operator, concrete, second person. No emojis. No gradient-text. Product name is **Prospect PAL** (space, PAL in caps).
7. Platforms: **n8n**, **Make**, **Gumloop**. Integrations: HubSpot, Clay, Amplemarket, Apollo. Never “gum loop”, “make.com engineer” as a product name, or “ample market”.
8. Security line is non-negotiable: keys stay on the customer instance. Never imply Prospect PAL stores API keys or sends email during setup.
9. Primary CTA action: checkout / start Team ($99/mo). Secondary: demo or sign in. Tertiary: download DIY skill package.
10. Character budgets are hard. If copy overflows, shorten the **supporting** line, not the headline.

## Page order (render this)
