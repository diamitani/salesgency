---
name: url-json-fallback-and-ingestskill
description: Process/Note derived from url-json-fallback-and-ingest.SKILL.md
source_path: url-json-fallback-and-ingest.SKILL.md
---

# url-json-fallback-and-ingest.SKILL.md

## Context
This skill provides knowledge, processes, and instructions derived from the document: `url-json-fallback-and-ingest.SKILL.md`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

---
name: url-json-fallback-and-ingest
description: Ingest a Reddit URL and all accessible comments into the Figma Sentinel Master spreadsheet. Prefer URL + .json because it yields the attached post/comment tree. If JSON is blocked, automatically fall back to Playwright/Selenium browser extraction, then Arctic Shift tree/search, then PullPush. Never abandon a URL merely because .json fails.
icon: link
color: Orange
---

# URL JSON fallback and master ingest

## Job
Given a Reddit thread URL, create the canonical `/.json` URL, retrieve all accessible OP/comment data, normalize every comment, and upsert it to **Figma Sentinel Master** before analysis.

The URL is the evidence anchor. The Master sheet is the durable running corpus.

## What “read the .json” means
For a URL such as:

`https://www.reddit.com/r/FigmaDesign/comments/abc123/title/`

the preferred machine-readable comment tree is:

`https://www.reddit.com/r/FigmaDesign/comments/abc123/title/.json?limit=500&raw_json=1`

The JSON normally contains:
- thread title and OP body
- comment IDs and parent IDs
- nested replies
- score, timestamps, and permalink fields
- author field (must be hashed before storage)

It is preferred because it gives structured data rather than trying to parse rendered HTML. It is **not mandatory** when Reddit blocks it.

## Fallback ladder (required)

### 1. Preferred: `/.json`
- Fetch canonical URL plus `.json?limit=500&raw_json=1`
- Parse OP and recursively parse every accessible comment/reply
- Log `more` objects as `unexpanded_more`; do not invent missing replies

### 2. Browser automation: Playwright preferred, Selenium fallback
Use only when the execution environment actually provides a browser/code ability. Use a normal headed/visible-browser policy where applicable; comply with applicable terms and rate limits.

- Open the canonical Reddit thread URL
- Wait for comments to render
- Click “load more comments” / “more replies” only while visible and available
- Capture accessible rendered text, permalink, score if visible, and nesting depth
- Do not log in, bypass CAPTCHAs, defeat paywalls, impersonate users, or automate posting/voting
- Mark `source_archive=reddit_browser`, `coverage=rendered_accessible`, not `full_tree`

Playwright sketch:
