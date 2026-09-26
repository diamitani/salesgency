---
name: incremental-url-refresh
description: Daily refresh of already tracked Reddit thread URLs plus a smaller new-search. Use on scheduled runs after the registry already has 100 plus thread ids. Do not wipe old URLs. Use search-figma-reddit-urls instead for the first full 100 URL harvest.
icon: refresh-cw
color: Purple
---

# Incremental URL refresh

## When to use
Scheduled daily run when url_registry already has at least 100 thread_ids.

## Steps
1. Read url_registry. Take threads whose last_seen is older than 24 hours, cap 40, plus any with fetch_status blocked, cap 10.
2. Re-fetch those json_url values with `fetch-reddit-json`. Pause 1 second between calls.
3. Run `search-figma-reddit-urls` with a new-only intent. Stop after 20 new unique thread_ids not already in the registry.
4. Analyze only new or changed dumps (comment_count grew or body changed).
5. Map, persist (upsert, update last_seen), quality-gate, brief.

## Rules
- Never delete old registry rows
- Registry must stay at or above 100 ids
- Report new_urls vs refreshed_urls separately
- Same never-post-on-Reddit rule as the rest of the agent

## Output
refreshed_count, new_count, still_blocked, registry_total.

Then continue the normal pipeline from analyze through brief.
