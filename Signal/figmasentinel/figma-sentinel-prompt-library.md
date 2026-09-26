# Figma Sentinel — starter prompt library

Paste these into the Gumloop agent chat. Run Setup → Dry run → Full harvest.

## Setup

**S1 — Create the database**
Create the Figma Sentinel Google spreadsheet using create-sentinel-spreadsheet. Confirm every tab and header. Do not harvest Reddit yet. Return the spreadsheet URL.

**S2 — Confirm tools**
List connected connectors and abilities. Confirm Web Fetch and Web Search are on. Confirm no Reddit write tools are available. Confirm Google Sheets writes will ask for approval.

**S3 — Refresh Figma public context**
Load figma-public-context. Fetch the official Config 2026 recap, code-on-canvas post, and release notes. Summarize pillars in 10 bullets. Do not use Reddit as product fact.

## Harvest

**H1 — Dry run 20 URLs**
Dry run only. Load search-figma-reddit-urls and stop at 20 unique thread URLs. Show thread_id, canonical_url, json_url, query, source. Do not fetch JSON yet.

**H2 — Dry run fetch + brief**
For the 20 URLs from this conversation: fetch-reddit-json, analyze-thread-dump, figma-public-context, map-chatter-to-roadmap, persist-master-db, quality-gate, compose-daily-brief. Pause 1s between JSON fetches. Do not Slack.

**H3 — Full harvest 100 URLs**
Full run. Collect at least 100 unique Reddit thread URLs via DuckDuckGo then Web Search. Fetch /.json, dump markdown, classify, map to public Figma pillars, persist, quality-gate, write the brief. Ask before Slack. Never post on Reddit.

**H4 — Incremental daily**
Load incremental-url-refresh. Refresh stale tracked URLs (cap 40) plus up to 20 new thread ids. Do not delete old registry rows. Then analyze, map, persist, quality-gate, brief. Ask before Slack.

## Questions (Sheet first)

**Q1** From the master Sheet: what do people want, say, and need, and how that maps to public roadmap pillars. Cite thread_ids.

**Q2** What’s going on with Figma Make? Sentiment, wants, needs, code_as_material fit. Harvest more only if n is under 8.

**Q3** Dev Mode vs Figma MCP vs Cursor as the same job. Map to dev_handoff_mcp and code_as_material.

**Q4** Penpot, Framer, v0, Lovable: what job are people hiring them for?

**Q5** Pricing and credits complaints only. Do not invent Figma pricing changes.

**Q6** Design-system talk: auto layout, variables, tokens, a11y. how_to vs complaint. Map to core_design_systems.

**Q7** Config 2026: Motion and code layers. Aligned, gap, or unaware?

**Q8** Roadmap gap board: pillar, volume, alignment mix, top want, top need, PMM action. Separate table for not_public wants.

## Delivery

**D1** quality-gate today’s brief. If pass, Ask Question, then deliver-daily-slack. If fail, show hard_fails and do not send.

**D2** Compose today’s brief from the Sheet. Label DRAFT. Do not Slack.

**D3** Update the relevant skills from this run. Do not dump process into the system prompt.

**D4** Registry health: total ids, new last 24h, blocked, oldest last_seen. Recommend full harvest vs incremental.

**D5** Re-fetch registry rows with fetch_status blocked or error. Cap 30. Analyze and upsert.

## Scheduled trigger

If url_registry has fewer than 100 thread_ids, full harvest to 100. Otherwise incremental-url-refresh. Then fetch → analyze → context → map → persist → quality-gate → brief. Ask before Slack. Never post on Reddit.
