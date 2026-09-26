# Figma Sentinel — Love / Hate spreadsheet headers

Use the **same header row in both** category workbooks:

- `Figma Sentinel — Love`
- `Figma Sentinel — Hate`

Keeping the schemas identical makes it easy to combine, compare, and trend sentiment over time. The only difference is the routing rule.

## Exact row-1 headers

```csv
source_pk,platform,source_archive,kind,thread_id,comment_id,url,subreddit_or_forum,author_hash,created_utc,first_seen,last_seen,score,body_span,op_topic,themes,sentiment_label,sentiment_score,intent,want,need,figma_products,design_principles,software_entities,figma_pillar,alignment,confidence,session_id,source_run
```

## Header definitions

| Header | Definition | Example |
| --- | --- | --- |
| `source_pk` | Stable, cross-platform unique key; used for upsert/deduplication | `reddit:1abcxyz`, `hn:44321001` |
| `platform` | Source platform | `reddit`, `hn`, `lemmy`, `bluesky`, `web`, `github`, `youtube` |
| `source_archive` | Acquisition source or API | `arctic_shift`, `pullpush`, `reddit_json`, `algolia`, `duckduckgo` |
| `kind` | Content type | `comment`, `post`, `story`, `issue`, `discussion` |
| `thread_id` | Parent conversation/thread identifier | `t3_abc123` |
| `comment_id` | Original comment identifier when available | `t1_def456` |
| `url` | Canonical public source URL | `https://www.reddit.com/r/FigmaDesign/comments/...` |
| `subreddit_or_forum` | Community or forum name | `FigmaDesign`, `news.ycombinator.com` |
| `author_hash` | One-way hash; never a raw username | `a3c88f2a902d1e71` |
| `created_utc` | Original source creation timestamp, UTC | `2026-08-27T18:24:00Z` |
| `first_seen` | First time Sentinel inserted the row | `2026-08-28T07:00:00Z` |
| `last_seen` | Last time Sentinel observed or updated the row | `2026-08-28T07:00:00Z` |
| `score` | Source score where public (votes, points, etc.) | `42` |
| `body_span` | Short original evidence excerpt, maximum 280 chars | `“Dev Mode is too slow on large files…”` |
| `op_topic` | One-line description of the original thread topic | `Dev Mode performance on enterprise files` |
| `themes` | Pipe-delimited normalized themes | `dev_mode_handoff|performance_stability` |
| `sentiment_label` | Controlled label | `love`, `like`, `mixed`, `dislike`, `hate`, `unclear` |
| `sentiment_score` | Integer valence | `-2`, `-1`, `0`, `1`, `2` |
| `intent` | Primary speech act | `praise`, `complaint`, `bug`, `feature_request`, `how_to`, `compare`, `vibe_code`, `pricing` |
| `want` | Explicit requested feature/outcome | `Reliable inspect behavior on large files` |
| `need` | Underlying job to be done | `Hand off a production design to engineering without leaving the canvas` |
| `figma_products` | Pipe-delimited Figma product mentions | `dev_mode|figma_mcp` |
| `design_principles` | Pipe-delimited principle mentions | `tokens|auto_layout|accessibility_wcag` |
| `software_entities` | Pipe-delimited other tools | `cursor|penpot|framer` |
| `figma_pillar` | Public Figma pillar used in roadmap map | `dev_handoff_mcp` |
| `alignment` | Public-roadmap relationship | `aligned`, `gap`, `contradiction`, `not_public` |
| `confidence` | Classifier confidence, 0–1 | `0.87` |
| `session_id` | Sentinel run identifier | `bootstrap-2026-08-28T070000Z` |
| `source_run` | Run mode | `bootstrap`, `watch`, `refresh` |

## Routing rules

### Figma Sentinel — Love
Write a row when:

```text
sentiment_label IN (love, like)
AND confidence >= 0.55
```

Also copy `mixed` rows into Love **only if** a positive evidence span has been extracted separately. Otherwise leave mixed rows in Master only, so the Love workbook stays clean.

### Figma Sentinel — Hate
Write a row when:

```text
sentiment_label IN (hate, dislike)
AND confidence >= 0.55
```

Also copy `mixed` rows into Hate **only if** a negative/blocking evidence span has been extracted separately. Otherwise leave mixed rows in Master only.

## Important operational notes

- `source_pk` is the upsert key in both books. It prevents duplicates across daily sessions.
- Do not use a person’s Reddit username in any column. `author_hash` is sufficient for dedupe and repeat-voice analysis.
- Do not put full comment bodies in category sheets; use `body_span` only. Full archived dumps belong in the `dumps` tab of the Master workbook.
- Keep `sentiment_label` even inside a Love/Hate sheet. It preserves auditability and lets a later classifier correction move a row correctly.
- Use `|` inside multi-value fields rather than commas, which makes CSV export safer.
