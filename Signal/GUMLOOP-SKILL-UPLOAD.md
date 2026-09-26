# Upload these skills to Gumloop

Gumloop accepts a `.md`, `.zip`, or `.skill` file with YAML frontmatter (`name`, `description`). Agent tab → Skills → + Skill → Upload Files.

If the picker wants a file named `SKILL.md`, download one file, rename it to `SKILL.md`, upload, repeat. Or zip folders like `search-figma-reddit-urls/SKILL.md`.

## Attach all 11

Core pipeline
1. search-figma-reddit-urls.SKILL.md
2. fetch-reddit-json.SKILL.md
3. analyze-thread-dump.SKILL.md
4. figma-public-context.SKILL.md
5. map-chatter-to-roadmap.SKILL.md
6. persist-master-db.SKILL.md
7. compose-daily-brief.SKILL.md

More
8. create-sentinel-spreadsheet.SKILL.md
9. quality-gate.SKILL.md
10. deliver-daily-slack.SKILL.md
11. incremental-url-refresh.SKILL.md

Turn Skill Editing and Creation ON.

## Connectors these skills expect
- Google Sheets (Ask for writes)
- Slack (Ask for writes)
- Web Fetch + Web Search abilities ON

## First chat after upload
Create the Figma Sentinel spreadsheet. Then dry-run 20 DuckDuckGo thread URLs, fetch JSON, dump markdown, map to public pillars, persist, show the brief. Do not Slack.
