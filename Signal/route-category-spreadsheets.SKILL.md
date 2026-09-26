---
name: route-category-spreadsheets
description: Upsert every analyzed public Figma conversation into Figma Sentinel Master and matching category spreadsheets. Start with known categories, but create a new category spreadsheet and registry definition when a recurring or high-severity theme does not fit. Use after URL ingest and analysis. Ask before spreadsheet writes.
icon: table
color: Green
related_server_ids: [gsheets]
---

# Route category spreadsheets

## Durable outputs
Always find and update these existing workbooks before creating anything new:
- Figma Sentinel Master
- Figma Sentinel — Reddit
- Figma Sentinel — Web and HN
- Figma Sentinel — Love
- Figma Sentinel — Hate
- Figma Sentinel — Make
- Figma Sentinel — Dev Mode MCP
- Figma Sentinel — Pricing
- Figma Sentinel — Competitors
- Figma Sentinel — Principles
- Figma Sentinel — Roadmap Map
- Figma Sentinel — Daily Reports

No dated copies. No new workbook per session. Master is the all-time system of record.

## Master first
Upsert every accessible OP and comment to `Figma Sentinel Master` → `all_mentions` before category routing.

Minimum raw-ingest fields:

```csv
source_pk,platform,source_archive,coverage,kind,thread_id,comment_id,parent_id,url,subreddit_or_forum,author_hash,created_utc,first_seen,last_seen,score,body_span,raw_body_location,ingest_status,session_id
```

Add analysis fields after classification:

```csv
op_topic,themes,sentiment_label,sentiment_score,intent,want,need,figma_products,design_principles,software_entities,figma_pillar,alignment,confidence,categories
```

Upsert on `source_pk`. Keep `first_seen`; update `last_seen`, score, body_span, labels, and categories. Never delete because the record is old.

## Existing category routing
A row can go to Master and multiple category books.

| Condition | Workbook |
| --- | --- |
| Reddit source | Figma Sentinel — Reddit |
| HN/web/Lemmy/Bluesky/StackExchange/GitHub/YouTube | Figma Sentinel — Web and HN |
| love or like, confidence >= .55 | Figma Sentinel — Love |
| hate or dislike, confidence >= .55 | Figma Sentinel — Hate |
| Make / figma_make | Figma Sentinel — Make |
| Dev Mode / MCP / Code Connect | Figma Sentinel — Dev Mode MCP |
| pricing / credits / seats | Figma Sentinel — Pricing |
| Penpot/Framer/v0/Lovable/Cursor/other tool comparison | Figma Sentinel — Competitors |
| auto layout/tokens/variants/accessibility/visual hierarchy | Figma Sentinel — Principles |
| public pillar + alignment | Figma Sentinel — Roadmap Map |

## Dynamic category creation
Do not force every conversation into a pre-existing box.

Create a new category workbook only when it meets one rule:
1. 3+ distinct source_pk records share a novel theme in the active window.
2. One high-severity issue: data loss, privacy/security, accessibility, billing shock, or clear workflow blocker.
3. The theme corresponds to a public Figma product surface or a leadership decision.
4. The user asks to track it.

Before creating, search `category_registry` to avoid duplicates.

Title: `Figma Sentinel — {Human Theme}`
Examples: Performance and Memory; Figma Sites; Motion; File Organization; Design Agent; Enterprise Admin.

Add the definition to Master → `category_registry`:

```csv
category_id,category_name,definition,trigger_terms,creation_reason,created_at,created_by,active,review_after
```

New categories are `provisional` for 7 days. Merge/rename only with an audit note; never silently lose old rows.

## Session output
Return master upserts, category upserts, categories created, categories proposed but not created, and rows held for unclear classification.
