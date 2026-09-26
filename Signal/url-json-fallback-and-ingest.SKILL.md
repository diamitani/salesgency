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

```python
from playwright.sync_api import sync_playwright

url = "https://www.reddit.com/r/FigmaDesign/comments/abc123/title/"
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto(url, wait_until="domcontentloaded", timeout=60000)
    page.wait_for_timeout(2500)
    for _ in range(10):
        buttons = page.locator('button:has-text("more replies"), button:has-text("load more comments")')
        if buttons.count() == 0:
            break
        buttons.first.click(timeout=3000)
        page.wait_for_timeout(600)
    text = page.locator("body").inner_text()
    browser.close()
```

Selenium fallback sketch:

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait

browser = webdriver.Chrome()
browser.get(url)
WebDriverWait(browser, 20).until(lambda d: d.find_element(By.TAG_NAME, "body"))
text = browser.find_element(By.TAG_NAME, "body").text
browser.quit()
```

### 3. Arctic Shift (primary archive fallback)
- Extract the Reddit post ID from URL
- Retrieve post by ID, then comment tree:
  - `/api/posts/ids?ids=t3_{id}`
  - `/api/comments/tree?link_id=t3_{id}`
- If the tree endpoint fails, use `comments/search?link_id=t3_{id}`
- Source = `arctic_shift`
- This can provide archived records even when Reddit blocks the live URL.

### 4. PullPush fallback
Search comments/submissions by post ID, permalink terms, or subreddit + title terms.
Source = `pullpush`.

### 5. Last resort: indexed page evidence
If no structured or browser-accessible comments are available, store the URL as `source_pk=reddit_thread:{thread_id}` with status `unavailable_comments` and a short indexed snippet only if it genuinely comes from a public search result.

Do not pretend snippets are comment threads. Do not fabricate comments.

## Ingest every accessible comment first
Before classification, upsert all accessible rows to Master.

### Master spreadsheet: Figma Sentinel Master
Tab: `all_mentions`

Exact minimum comment columns:

```csv
source_pk,platform,source_archive,coverage,kind,thread_id,comment_id,parent_id,url,subreddit_or_forum,author_hash,created_utc,first_seen,last_seen,score,body_span,raw_body_location,ingest_status,session_id
```

- `source_pk`: `reddit:{comment_id}` or `reddit_thread:{thread_id}` for OP
- `raw_body_location`: link/path to the stored Markdown dump or attachment, not a duplicate full body cell when a dump exists
- `ingest_status`: `full_tree`, `partial_tree`, `rendered_accessible`, `archive_tree`, `unavailable_comments`

Then pass each record to `analyze-thread-dump` and `route-category-spreadsheets`.

## Dynamic categories — do not force every record into a fixed box
Start with known categories (Love, Hate, Make, Dev Mode MCP, Pricing, Competitors, Principles), but create a new category when the agent finds a recurring or strategically meaningful theme that does not fit.

Create a category when at least one condition is true:
- The theme has 3+ distinct source_pk values in a reporting window.
- The theme is an explicit high-severity blocker, even at n=1 (billing surprise, data loss, security, accessibility).
- The theme maps to a distinct public Figma surface or leadership decision.
- The user explicitly asks to monitor it.

Name format: `Figma Sentinel — {Human Theme}`.
Examples: `Performance and Memory`, `Figma Sites`, `Motion`, `File Organization`, `Design Agent`, `Enterprise Admin`.

Write the category definition to Master tab `category_registry`:

```csv
category_id,category_name,definition,trigger_terms,created_at,created_by,active,review_after
```

Do not create near-duplicate categories. Reuse existing taxonomy where it is genuinely appropriate. Mark a new category `provisional` until reviewed after 7 days.

## Output
For each URL: canonical_url, json_url, retrieval_path, comments_ingested, comments_unavailable, dump_location, master_upserted, categories_created.

Never skip Master upsert just because a report cannot yet be written.
