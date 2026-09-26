# Figma Sentinel — Gumloop agent (current UI)

Paste these values into the agent builder. Gumloop’s Agent tab holds **Agent Preferences** (model + system prompt), then **Triggers**, **Connectors**, **Skills**, **Subagents**, **Abilities**. The Settings tab holds name, description, Slack, secrets. Keep the system prompt short; put process in skills. Skills load on demand from name + description only.

Docs: [Agents](https://docs.gumloop.com/core-concepts/agents), [Skills](https://docs.gumloop.com/core-concepts/skills), [Reddit MCP](https://docs.gumloop.com/nodes/mcp/reddit).

---

## Settings → Personalization

**Name:** Figma Sentinel

**Description:** Reddit design and vibe-code analyst. Harvests Figma, design-principle, and adjacent-software talk, classifies love vs hate, locates issues, stores structured rows, and writes a daily PMM brief with killable hypotheses.

**Icon:** radar or chart-line (Lucide)

---

## Agent tab → Agent Preferences

**Model:** Claude Sonnet (switch to Opus when authoring or revising skills).

**Self-improving instructions:** ON (default). Correct once, then say “update your system prompt so you always do it this way.”

**Advanced (optional):** Max Steps 150. Parallel tool calls ON. Image generation is off in Abilities, not here.

**System prompt:** paste the block in `figma-sentinel.gumloop.system-prompt.md`. Stay under ~200 words of universal rules. Do not paste skill playbooks here.

---

## Agent tab → Connectors

Click **+ Connector**. Start with the few it needs.

| Connector | Why | Tool Management preset |
| --- | --- | --- |
| Reddit Scraper | Read-only harvest, no Reddit app creds | Always allow |
| Reddit MCP | Only if you need official OAuth search. **Deny every create/edit/delete post or comment tool.** | Custom: allow search, retrieve post, get details, fetch comments. Deny all writes. |
| Google Sheets | Canonical store if you skip Supabase | Ask for writes/deletes |
| Supabase | Optional Postgres system of record | Ask for writes/deletes |
| Slack | Daily brief delivery | Ask for writes/deletes |
| Notion | Optional report archive | Ask for writes/deletes |
| Gmail | Optional email brief | Ask for writes/deletes |

**AI Discovery / Tool Discovery:** Auto.

**Account:** Use Personal Default until this is a team agent, then Use Team Default for Sheets/Slack.

Do not connect X, LinkedIn, or Discord in v1.

Reddit MCP write tools exist (create/edit/delete posts and comments). Leave them denied. If you only need reads, prefer Reddit Scraper so credentials are not required.

---

## Agent tab → Skills

**AI Skill Editing / Skill Editing & Creation:** ON.

**+ Skill → Add Existing Skill** after you create these (kebab-case names only):

1. `harvest-reddit-mentions`
2. `classify-figma-sentiment`
3. `locate-product-issues`
4. `map-similar-software`
5. `persist-sentinel-rows`
6. `compose-daily-brief`
7. `propose-pmm-hypotheses`

Create via **Write Skill Instructions** (Name, Description, Instructions) or **Upload Files** with a `SKILL.md`. Paste from the skill files in this pack.

---

## Agent tab → Triggers

**AI Managed:** OFF until the first manual run looks right.

**+ Trigger → Scheduled Trigger**

- When: every day at 06:00 America/Chicago
- Prompt template:

```
Run Figma Sentinel for the last 24 hours.
Load harvest-reddit-mentions, then classify-figma-sentiment, locate-product-issues, and map-similar-software.
Persist with persist-sentinel-rows.
Write hypotheses with propose-pmm-hypotheses.
Compose the operator brief with compose-daily-brief.
Do not post, vote, or comment on Reddit.
Ask before sending Slack, email, or Notion.
Exclude unclear and confidence below 0.55 from headline metrics.
```

Optional later: Slack App Trigger when someone says `@Figma Sentinel what's going on with Make?`

---

## Agent tab → Subagents

Leave self-clone **(Me)** enabled. Do not add other agents in v1. After harvest, the parent may clone itself to classify batches in parallel, then fan in for persist + report.

---

## Agent tab → Abilities

| Ability | Setting |
| --- | --- |
| Web Search | ON — competitor capability facts only, never as Reddit SoR |
| Web Fetch | ON — permalinks if scraper returns URLs |
| Image Generation | OFF |
| Search Past Conversations | ON |
| Ask Question | ON |
| Tool Discovery | Auto |
| App Rules Creation | ON if your plan has it |
| + Workflow | none required for v1 |

---

## Settings → Chat / Slack / Secrets

**Smart Suggestions:** ON.

**Slack Preferences:** reply in thread; include attribution.

**Secrets (sandbox, never logged):** only if you skip Gumloop connectors and call APIs from scripts.

- `REDDIT_CLIENT_ID`
- `REDDIT_CLIENT_SECRET`
- `REDDIT_USER_AGENT` = `script:figma-sentinel:v1.0.0 (by /u/YOURNAME)`
- `SUPABASE_DB_URL` (optional)

Do not put secrets in the system prompt or skills.

---

## App Rules (plain English)

Create these so they evaluate on every MCP call:

1. Never create, edit, delete, vote on, or comment on Reddit content.
2. Never include Reddit usernames or raw author fields in briefs, Sheets, Slack, or Notion. Use hashes only.
3. Never send Slack, email, or public Notion pages without approval.
4. Only write structured Sentinel rows to the designated Sheet or Supabase schema. Do not overwrite other spreadsheets.
5. Treat Reddit as community sentiment, not proof that a Figma feature exists or is broken.

---

## Knowledge Sources

Optional: attach Figma product docs, competitor one-pagers, and the taxonomy JSON so Brain citations back product facts. Reddit comments stay in Sheets/DB, not Brain.

---

## First chats (in order)

1. `Connect Reddit Scraper (read-only) and Google Sheets. Confirm write tools on Reddit are denied.`
2. `Run a 24h harvest on r/FigmaDesign only. Classify, persist, and show me the brief. Do not Slack it.`
3. `Turn the working run into updates on the attached skills. Do not dump process into the system prompt.`
4. After quality looks right: `Create a scheduled trigger for 06:00 America/Chicago using the daily harvest prompt.`

---

## Sheets schema (create before persist)

Spreadsheet name: `Figma Sentinel`

Tabs: `mentions`, `classifications`, `issues`, `competitor_signals`, `hypotheses`, `daily_reports`

`mentions` columns: `id`, `reddit_fullname`, `thread_id`, `subreddit`, `kind`, `created_utc`, `score`, `permalink`, `author_hash`, `evidence_span`, `entities_json`, `relevance`, `harvested_at`

`classifications` columns: `mention_id`, `sentiment_label`, `sentiment_score`, `intent`, `confidence`, `model`, `classified_at`

Do not store usernames.
