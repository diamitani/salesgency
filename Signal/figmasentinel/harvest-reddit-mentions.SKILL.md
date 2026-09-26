---
name: harvest-reddit-mentions
description: Harvest public Reddit posts and comments about Figma, design principles, and adjacent design or vibe-code software. Use when the user or a scheduled trigger asks to pull mentions, run a 24h harvest, backfill a subreddit, or collect threads before classification. Do not use for classifying sentiment, writing briefs, or posting on Reddit.
icon: radar
color: Purple
related_server_ids: [reddit]
---

# Harvest Reddit mentions

## When to use
Load this skill before any classify, persist, or report step if new Reddit data is needed.

## Tools
- Prefer **Reddit Scraper** (read-only, no app creds).
- Reddit MCP only for search, retrieve post, get details, fetch comments.
- Never call create/edit/delete post or comment tools.

## Watch list (v1)
Subreddits: FigmaDesign, UI_Design, UXDesign, web_design, graphic_design, ProductDesign, DesignSystems, userexperience, webdev, frontend, Framer, webflow, ChatGPTCoding, cursor, ClaudeAI, SideProject, startups.

Query seeds: figma, figjam, dev mode, figma make, figma sites, auto layout, design system, code connect, figma mcp, penpot, framer vs figma.

## Steps
1. Confirm window (default last 24 hours, America/Chicago).
2. Pull `new` listings for each subreddit. Cap 50 posts per sub unless the user asks for more.
3. Search query seeds, sort new, t=day, cap 25 each.
4. Expand comment trees only when the post title/body matches Figma, a watch seed, or the sub is FigmaDesign.
5. Keep id/fullname, thread_id, subreddit, created_utc, score, title, body, permalink. Hash author. Drop username.
6. Stop if the tool errors or rate-limits. Report harvest health. Do not retry in a tight loop.
7. Hand the event list to `classify-figma-sentiment`. Do not classify inside this skill.

## Output
A list of raw events plus counts: posts, comments, empty subs, errors.

## Example
Input: "Harvest last 24h on r/FigmaDesign."
Output: 12 posts, 47 comments, 31 likely relevant, 0 write attempts.
