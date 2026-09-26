---
name: search-figma-reddit-urlsskill
description: Process/Note derived from search-figma-reddit-urls.SKILL.md
source_path: figmasentinel/search-figma-reddit-urls.SKILL.md
---

# search-figma-reddit-urls.SKILL.md

## Context
This skill provides knowledge, processes, and instructions derived from the document: `search-figma-reddit-urls.SKILL.md`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

---
name: search-figma-reddit-urls
description: Find at least 100 unique Reddit thread URLs about Figma and adjacent design or vibe-code talk. Use DuckDuckGo HTML via Web Fetch first, then Gumloop Web Search. Use when starting a harvest, refreshing the URL registry, or the user asks to find Figma Reddit threads. Do not fetch .json or classify in this skill.
icon: search
color: Purple
---

# Search Figma Reddit URLs

## Goal
Build a deduped list of canonical Reddit thread URLs.

- Full run: at least 100 unique `/comments/` thread links
- Dry run: stop at 20 if the user says dry run

## Tools
1. Web Fetch DuckDuckGo HTML: `https://html.duckduckgo.com/html/?q={query}`
2. Fallback: `https://duckduckgo.com/html/?q={query}`
3. If HTML is thin, use Gumloop Web Search with the same queries
4. Keep reddit.com links only

## Queries
Run every query. Paginate DuckDuckGo with `s=0`, `s=30`, `s=60` while new thread ids appear.

- figma site:reddit.com
- figma make site:reddit.com
- figma mcp site:reddit.com
- "dev mode" figma site:reddit.com
- figma sites site:reddit.com
- figjam site:reddit.com
- figma motion site:reddit.com
- "code layers" figma site:reddit.com
- figma vs penpot site:reddit.com
- figma vs framer site:reddit.com
- figma pricing site:reddit.com
- figma auto layout site:reddit.com
- figma variables site:reddit.com
- site:reddit.com/r/FigmaDesign
- site:reddit.com/r/UXDesign figma
- site:reddit.com/r/web_design figma

## Normalize
Keep only thread URLs. Drop subreddit homes, user pages, search pages, and old.reddit duplicates.

Canonical form:

`https://www.reddit.com/r/{sub}/comments/{id}/{slug}/`

- `thread_id` = the `{id}` segment
- Deduplicate on `thread_id`
- `json_url` = canonical URL + `.json?limit=500&raw_json=1`

## Output
A table with: thread_id, canonical_url, json_url, query_that_found_it, source (ddg or web_search).

If you cannot reach 100, report how many you got and which queries failed. Never invent URLs.

## Next skill
`fetch-reddit-json`
