---
name: persist-master-db
description: Upsert Figma Sentinel URL registry, markdown dumps, comments, classifications, and roadmap maps into the master Google Sheet so 100 plus threads can be tracked over time. Use after mapping. Ask before writes. Do not search Reddit or send Slack in this skill.
icon: database
color: Green
related_server_ids: [gsheets]
---

# Persist master database

## Destination
Google Sheet named **Figma Sentinel**. If it does not exist, load `create-sentinel-spreadsheet` first. Ask before writes.

## Tabs
url_registry, dumps, comments, classifications, roadmap_map, daily_reports

## url_registry columns
thread_id, canonical_url, json_url, subreddit, first_seen, last_seen, last_http_status, fetch_status, title, dump_md_name, comment_count, op_topic

## dumps columns
thread_id, fetched_at, markdown, json_bytes, more_objects_unexpanded

## comments columns
comment_id, thread_id, parent_id, author_hash, score, body, created_utc, depth

## classifications columns
thread_id, comment_id, role, op_topic, themes, sentiment_label, sentiment_score, intent, want, need, evidence_span, confidence, classified_at

## roadmap_map columns
thread_id, figma_pillar, public_product, alignment, people_want, people_say, people_need, roadmap_note, evidence_ids

## daily_reports columns
report_date, url_count, new_urls, refreshed_urls, failed_fetches, markdown, json_payload

## Rules
- Primary key is thread_id. Upsert. Never insert a duplicate URL as a new row.
- First insert sets first_seen. Always update last_seen and fetch_status.
- Keep at least 100 distinct thread_ids in the registry over time. A light day refreshes a subset. Do not delete the rest.
- Store author_hash only. Never write usernames.
- evidence_span max 280 characters.
- Do not write any other spreadsheet.

## After write
Return registry_total, new_urls, refreshed_urls, failed_fetches, comments_upserted.

Then load `quality-gate` then `compose-daily-brief`.
