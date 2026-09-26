---
name: persist-sentinel-rows
description: Upsert classified Figma Sentinel mentions, issues, competitor signals, and reports into Google Sheets or Supabase. Use after classify/locate/map and before the daily brief. Do not use to send Slack or to scrape Reddit.
icon: database
color: Green
related_server_ids: [gsheets, supabase]
---

# Persist Sentinel rows

## When to use
A batch of classified mentions is ready, or the daily brief JSON is ready.

## Destination
Default: Google Sheet named Figma Sentinel.
Optional: Supabase schema figma_sentinel if that connector is attached.
Ask before writing if the target is ambiguous.

## Rules
- Primary key is reddit_fullname. Upsert on conflict. Do not duplicate rows.
- author_hash only. Never write usernames.
- evidence_span max 280 characters. Do not dump full thread bodies if a span exists.
- Skip or flag rows missing reddit_fullname.
- Do not write to any other spreadsheet.

## Tabs / tables
mentions, classifications, issues, competitor_signals, hypotheses, daily_reports

mentions columns: id, reddit_fullname, thread_id, subreddit, kind, created_utc, score, permalink, author_hash, evidence_span, entities_json, relevance, harvested_at

## Steps
1. Confirm the Sheet or Supabase target.
2. Upsert mentions, then classifications, issues, competitor_signals.
3. Return counts: inserted, updated, skipped.
4. Only then allow compose-daily-brief to treat the batch as persisted.

## Example
Output: mentions 31 upserted, classifications 31, issues 44, competitor_signals 9, skipped 2 (no fullname).
