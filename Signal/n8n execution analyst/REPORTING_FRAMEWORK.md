# REPORTING_FRAMEWORK — n8n Execution Analyst

## Primary KPIs

| KPI | Definition | Data Source | Target |
|---|---|---|---|
| Time-to-diagnose | Minutes from "something's wrong" to identified failing node + cause | Manual timing / skill usage | < 2 min |
| Proactive catch rate | % of failures surfaced by health scan before an end user reports them | Health-scan log | Majority |
| Workflow coverage | # workflows the skill can resolve & analyze | n8n API | 100% of instance |
| Mean failure age at detection | How long a failure had been running before caught | Execution timestamps | Trending down |

## Per-Analysis Output Fields (the standard "report")
For any analyzed workflow, the skill reports:
- Workflow name, ID, active status, schedule
- Last run + status; success/error counts over available history
- **Failing node + exact error message** (if any)
- **First-failure timestamp** (when the breakage started)
- Per-node timing (to spot slow/stalling nodes)
- Plain-English root-cause summary + suggested next step

## Storage
- Default: transient (generated per request)
- Optional: persist pulled executions to a store (TBD) so trends survive the ~25-execution n8n retention limit

## Display
- Inline table (quick look)
- .xlsx / .csv (share / archive)
- Written summary (for non-technical stakeholders / leadership)
- Optional HTML or Slack/Teams health report (scheduled scan)

## Update Frequency
- On-demand (any time the user asks)
- Scheduled health scan (stretch): daily or per-business-day across all workflows

## Owner
Patrick Diamitani
