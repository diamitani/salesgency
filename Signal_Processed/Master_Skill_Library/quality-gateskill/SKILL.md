---
name: quality-gateskill
description: Process/Note derived from quality-gate.SKILL.md
source_path: figmasentinel/quality-gate.SKILL.md
---

# quality-gate.SKILL.md

## Context
This skill provides knowledge, processes, and instructions derived from the document: `quality-gate.SKILL.md`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

---
name: quality-gate
description: Check a Figma Sentinel run before the daily brief is treated as publishable. Use after persist-master-db and before compose-daily-brief or Slack. Fail the run with a remediation list if gates are not met.
icon: shield-check
color: Red
---

# Quality gate

Fail the brief if any hard gate fails. Return a checklist, not a pretty report.

## Hard gates
- Unique successful thread dumps today, or registry_total, is known. Do not hide fetch failures.
- No Reddit usernames appear in Sheet preview, brief draft, or Slack draft
- No Reddit write tools were called
- Every headline want, need, or sentiment claim has thread_id plus evidence_span
- Alignment labels are only aligned, gap, contradiction, or not_public
- Unpublished Figma roadmap is not invented
- Headline sentiment excludes unclear and confidence below 0.55

## Soft gates (warn, do not fail)
- Full run unique URLs below 100
- JSON blocked rate above 20 percent
- Weak-n clusters (under 3 threads) used as trends
- DuckDuckGo returned listing pages that had to be dropped

## Output
status: pass | fail
hard_fails[]
warnings[]
remediation[]

If fail, do not load deliver-daily-slack. Still allow compose-daily-brief labeled DRAFT.

If pass, load compose-daily-brief as final.
