# v4 first chats

## After Reddit blocked

Reddit.com returned blocked. Use Arctic Shift, not /.json.

```
Locate existing Google Sheets titled “Figma Sentinel Master” and the category books. Do not create dated copies.
Reddit is blocked. Load arctic-shift-reddit. Harvest Figma posts and comments for every watch sub since archive start. If Arctic Shift errors, use pullpush-reddit.
Then web-comment-search (HN Algolia, Lemmy, Bluesky, Stack Exchange, DuckDuckGo).
Classify. Route rows into Master plus Love, Hate, Make, Dev Mode MCP, Pricing, Competitors, Principles, Reddit, Web and HN.
BOOTSTRAP brief. Do not Slack. Do not wipe historical rows.
```

## Daily (same sheets)

```
Load watch-new-daily. Read last_watch_at from Master. Arctic Shift after= that watermark. HN numericFilters created_at_i>watermark. Upsert the same category spreadsheets. NEW TODAY brief. Ask before Slack.
```
