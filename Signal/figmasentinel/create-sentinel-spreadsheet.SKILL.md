---
name: create-sentinel-spreadsheet
description: Create the Figma Sentinel Google Sheet and tabs if they do not exist. Use on first run, when persist-master-db cannot find the spreadsheet, or when the user asks to set up the database. Do not harvest Reddit in this skill.
icon: table
color: Green
related_server_ids: [gsheets]
---

# Create Sentinel spreadsheet

## Goal
One Google Sheet named **Figma Sentinel** with empty header rows so later upserts have a stable schema.

## Steps
1. Search connected Google Drive or Sheets for a spreadsheet titled Figma Sentinel.
2. If found, verify tabs listed below. Add any missing tab. Do not wipe existing rows.
3. If not found, Ask Question, then create it.
4. Put headers in row 1 of each tab. Leave data rows empty.

## Tabs and header row

url_registry
thread_id, canonical_url, json_url, subreddit, first_seen, last_seen, last_http_status, fetch_status, title, dump_md_name, comment_count, op_topic

dumps
thread_id, fetched_at, markdown, json_bytes, more_objects_unexpanded

comments
comment_id, thread_id, parent_id, author_hash, score, body, created_utc, depth

classifications
thread_id, comment_id, role, op_topic, themes, sentiment_label, sentiment_score, intent, want, need, evidence_span, confidence, classified_at

roadmap_map
thread_id, figma_pillar, public_product, alignment, people_want, people_say, people_need, roadmap_note, evidence_ids

daily_reports
report_date, url_count, new_urls, refreshed_urls, failed_fetches, markdown, json_payload

## Output
Spreadsheet URL plus a checklist of tabs created vs already present.

## Never
Do not delete existing data. Do not write sample fake threads.
