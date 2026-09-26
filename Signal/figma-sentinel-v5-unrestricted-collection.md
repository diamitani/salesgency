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

```md
## Modes

1. **Bootstrap / backfill** — discover and ingest any relevant Figma URLs and comments reachable from configured sources. Continue pagination while each page returns new source keys and the source allows it. There is no URL target and no comment minimum.

2. **Daily watch** — find and ingest any new or changed relevant records after the last watermark. A daily run can add one record, thousands of records, or zero records.

A source’s accessibility, pagination cursor, rate limit, time budget, and terms of use are the only collection boundaries.
```

### Replace the system-prompt collection language with

```text
Collect any relevant, reachable public Figma URL or comment. There is no 100-link target and no comment-count requirement.

For bootstrap, paginate each allowed source while it returns new source_pk values and while rate limits/time budget permit. For daily watch, ingest any new or changed source_pk values after the saved watermark.

One relevant link or comment is sufficient to store, classify, map, and route. Zero new results is a valid daily outcome. Never stop or fail because a numeric URL target was not reached.
```

### Add under “Master database”

```md
The database is append-only and durable, not quota-driven. Every accessible relevant record is a candidate for the Master workbook. Category workbooks receive every matching row even if that category has only one row.
```

### Replace “Quality” with

```md
## Quality
- Report actual counts; do not compare them to a required URL quota.
- A run is successful if collection attempted the configured sources, persisted valid new/changed rows, and records source health.
- A zero-result daily watch is successful when all sources were checked and no new records were found.
- Report API blocks, timeouts, cursor exhaustion, and rate limits as collection health — not as a failure to reach a target.
```

## Replace bootstrap-full-scrape skill goal

```md
## Goal
Discover and ingest **any relevant Figma Reddit URLs, posts, and comments reachable** through configured sources. Continue until pagination is exhausted, a source returns no new source keys, or the source rate-limits/times out.

There is no URL target, no “minimum 100,” and no comment cap. Store every valid accessible record.
```

## Replace watch-new-daily skill goal

```md
## Goal
Find any new or changed relevant Figma record after the last watermark. New count may be 0, 1, or many. Do not re-fetch historical data unless the user asks for refresh/backfill.
```

## Replace Arctic Shift pagination instruction

```md
## Pagination
Bootstrap: begin at the source’s earliest usable archive timestamp and paginate each subreddit × query while pages yield new Reddit IDs. Stop only for empty/no-new pages, a source cursor ending, a documented API boundary, rate limiting, timeout, or user cancellation.

Daily: query after `last_watch_at`; paginate while the API returns new IDs after that point.

Do not set an arbitrary maximum number of URLs, comments, pages, or rows. Use the source’s allowed page-size maximum, dedupe on source_pk, sleep politely, and checkpoint watermarks after each completed batch.
```

## Replace category route rule

```md
## Routing
Every valid classified record is upserted into Figma Sentinel Master regardless of volume, score, or comment count.

Category workbooks receive every matching row. A category with a single matching row is still valid and useful. Do not require a minimum cluster size to persist or report it; label small samples as `low_n` in analysis when needed.
```

## Simplified user prompts

### Bootstrap

```text
Collect all relevant accessible Figma conversations now. Use Arctic Shift for Reddit if live Reddit is blocked, then search the other enabled public sources. Keep paging while sources return new records and respect their limits. Store every valid result in the same Master and category spreadsheets. There is no URL or comment target. Show collection health and a BOOTSTRAP brief. Do not Slack.
```

### Daily

```text
Run the daily Figma Sentinel watch. Find any new or changed relevant Figma conversations after the saved watermarks, update the existing Master and category spreadsheets, and show what is new today. Zero new records is okay. Do not Slack.
```

### Single URL

```text
Analyze this URL. If it contains relevant Figma conversation, extract all accessible comments, classify them, map them to public Figma pillars, and upsert them into the existing Master and matching category spreadsheets. Do not require any other URLs.
```

## Report changes

Remove language such as:
- “full-run target: 100 unique threads”
- “stop at 100”
- “minimum 100”
- “must have 100+ thread IDs”

Use instead:
- `records discovered`
- `new records persisted`
- `records updated`
- `source pages exhausted`
- `blocked / rate-limited / timed out`
- `watermark advanced`

## Suggested report health block

```md
## Collection health
- Sources checked: Arctic Shift, HN Algolia, DuckDuckGo
- Records discovered: 17
- New records persisted: 12
- Existing records updated: 3
- Duplicates skipped: 2
- Source state: Arctic Shift cursor exhausted; HN complete; DuckDuckGo returned 0 new links
- Watermark: advanced to 2026-08-28T08:00:00Z
```
