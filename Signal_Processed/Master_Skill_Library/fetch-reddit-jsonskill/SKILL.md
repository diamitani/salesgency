---
name: fetch-reddit-jsonskill
description: Process/Note derived from fetch-reddit-json.SKILL.md
source_path: figmasentinel/fetch-reddit-json.SKILL.md
---

# fetch-reddit-json.SKILL.md

## Context
This skill provides knowledge, processes, and instructions derived from the document: `fetch-reddit-json.SKILL.md`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

---
name: fetch-reddit-json
description: For each Reddit thread URL, append .json, fetch OP plus comments with Web Fetch, and write a markdown dump. Use after search-figma-reddit-urls. Do not classify or map to roadmap here. Never post, vote, or comment on Reddit.
icon: download
color: Orange
---

# Fetch Reddit JSON to markdown

## Goal
Turn each canonical thread URL into a markdown page of OP plus comments. That dump is the corpus. Search snippets are not.

## URL rule
Thread:

`https://www.reddit.com/r/FigmaDesign/comments/abc123/some_title/`

Fetch:

`https://www.reddit.com/r/FigmaDesign/comments/abc123/some_title/.json?limit=500&raw_json=1`

If www is blocked, retry with `https://old.reddit.com/` and the same path plus `.json?limit=500&raw_json=1`.

## Rate limit
- Pause about 1 second between fetches
- On HTTP 429 or 403, stop the burst, wait, then resume remaining ids
- Record `fetch_status` per URL: ok, blocked, empty, error
- Do not retry in a tight loop

## Parse JSON
Reddit returns a 2-element array.

- `[0].data.children[0].data` = OP (title, selftext, score, created_utc, subreddit, permalink, num_comments)
- `[1].data.children` = top-level comments
- Recurse `data.replies.data.children` for replies
- Skip `kind=more`. Log `unexpanded_more`. Do not invent those replies
- Hash `author`. Never store the raw username
- Mark `[deleted]` and `[removed]` bodies

## Markdown dump
Filename: `{thread_id}.md`
