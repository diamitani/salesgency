---
name: compose-daily-brief
description: Write the Figma Sentinel daily operator brief from persisted rows. Five-minute read with sentiment mix, issue map, similar tools, hypotheses, and sampling bias. Use after persist and hypotheses. Do not harvest or reclassify inside this skill. Ask before Slack or email.
icon: file-text
color: Blue
related_server_ids: [gsheets, slack, notion]
---

# Compose daily brief

## When to use
Scheduled daily run, or "write today's brief" after data is in Sheets/Supabase.

## Headline rules
- Denominator = mentions with confidence >= 0.55 and sentiment_label not unclear.
- Weak-n clusters (<3) do not appear as trends.
- Quotes only from stored evidence_span.
- No usernames.

## Brief structure
1. Window, volume, unique threads, harvest health
2. Sentiment mix vs prior 7-day baseline if rows exist, else say baseline missing
3. Top love themes with mention ids
4. Top hate/issue clusters and where they lie
5. Design-principle talk
6. Software map and what is similar
7. Vibe-code pairing patterns (Make, MCP, Cursor, v0, Lovable, Bolt)
8. 3 to 5 hypotheses from propose-pmm-hypotheses
9. Uncertainties, contradictions, Reddit sampling bias
10. Now / next / later
11. One Slack-ready paragraph, not sent until approved

## Delivery
- Always write markdown in chat and save to daily_reports tab.
- Slack / Gmail / Notion only after Ask Question or tool approval.
- Never post the brief on Reddit.

## Example Slack paragraph
"Figma Sentinel 8/28: n=31 headline mentions, love+like 42%, dislike+hate 29%. Biggest cluster is Dev Mode inspect lag (n=6). Analog: Cursor+MCP as handoff job. Hypotheses in thread. Reddit is not a census."
