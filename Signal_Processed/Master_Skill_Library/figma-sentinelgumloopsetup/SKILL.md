---
name: figma-sentinelgumloopsetup
description: Process/Note derived from figma-sentinel.gumloop.setup.md
source_path: figmasentinel/figma-sentinel.gumloop.setup.md
---

# figma-sentinel.gumloop.setup.md

## Context
This skill provides knowledge, processes, and instructions derived from the document: `figma-sentinel.gumloop.setup.md`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

# Figma Sentinel — Gumloop agent (current UI)

Paste these values into the agent builder. Gumloop’s Agent tab holds **Agent Preferences** (model + system prompt), then **Triggers**, **Connectors**, **Skills**, **Subagents**, **Abilities**. The Settings tab holds name, description, Slack, secrets. Keep the system prompt short; put process in skills. Skills load on demand from name + description only.

Docs: [Agents](https://docs.gumloop.com/core-concepts/agents), [Skills](https://docs.gumloop.com/core-concepts/skills), [Reddit MCP](https://docs.gumloop.com/nodes/mcp/reddit).

---

## Settings → Personalization

**Name:** Figma Sentinel

**Description:** Reddit design and vibe-code analyst. Harvests Figma, design-principle, and adjacent-software talk, classifies love vs hate, locates issues, stores structured rows, and writes a daily PMM brief with killable hypotheses.

**Icon:** radar or chart-line (Lucide)

---

## Agent tab → Agent Preferences

**Model:** Claude Sonnet (switch to Opus when authoring or revising skills).

**Self-improving instructions:** ON (default). Correct once, then say “update your system prompt so you always do it this way.”

**Advanced (optional):** Max Steps 150. Parallel tool calls ON. Image generation is off in Abilities, not here.

**System prompt:** paste the block in `figma-sentinel.gumloop.system-prompt.md`. Stay under ~200 words of universal rules. Do not paste skill playbooks here.

---

## Agent tab → Connectors

Click **+ Connector**. Start with the few it needs.

| Connector | Why | Tool Management preset |
| --- | --- | --- |
| Reddit Scraper | Read-only harvest, no Reddit app creds | Always allow |
| Reddit MCP | Only if you need official OAuth search. **Deny every create/edit/delete post or comment tool.** | Custom: allow search, retrieve post, get details, fetch comments. Deny all writes. |
| Google Sheets | Canonical store if you skip Supabase | Ask for writes/deletes |
| Supabase | Optional Postgres system of record | Ask for writes/deletes |
| Slack | Daily brief delivery | Ask for writes/deletes |
| Notion | Optional report archive | Ask for writes/deletes |
| Gmail | Optional email brief | Ask for writes/deletes |

**AI Discovery / Tool Discovery:** Auto.

**Account:** Use Personal Default until this is a team agent, then Use Team Default for Sheets/Slack.

Do not connect X, LinkedIn, or Discord in v1.

Reddit MCP write tools exist (create/edit/delete posts and comments). Leave them denied. If you only need reads, prefer Reddit Scraper so credentials are not required.

---

## Agent tab → Skills

**AI Skill Editing / Skill Editing & Creation:** ON.

**+ Skill → Add Existing Skill** after you create these (kebab-case names only):

1. `harvest-reddit-mentions`
2. `classify-figma-sentiment`
3. `locate-product-issues`
4. `map-similar-software`
5. `persist-sentinel-rows`
6. `compose-daily-brief`
7. `propose-pmm-hypotheses`

Create via **Write Skill Instructions** (Name, Description, Instructions) or **Upload Files** with a `SKILL.md`. Paste from the skill files in this pack.

---

## Agent tab → Triggers

**AI Managed:** OFF until the first manual run looks right.

**+ Trigger → Scheduled Trigger**

- When: every day at 06:00 America/Chicago
- Prompt template:
