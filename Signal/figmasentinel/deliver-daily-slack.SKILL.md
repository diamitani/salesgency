---
name: deliver-daily-slack
description: Send the approved Figma Sentinel daily brief to Slack. Use only after quality-gate pass and after the user or Ask Question approves delivery. Never post to Reddit. Never send unapproved drafts.
icon: send
color: Blue
related_server_ids: [slack]
---

# Deliver daily Slack

## When to use
The brief exists, quality-gate is pass, and the user said to send Slack or approved Ask Question.

## What to send
1. The Slack-ready paragraph from compose-daily-brief
2. A thread reply with: URL counts, top 3 wants, top 3 needs, pillar fit, hate-share, link or pointer to the Sheet

## Rules
- Ask for writes if Tool Management is Ask
- Reply in thread when possible
- No usernames
- No full markdown dump of every comment
- Do not post, vote, or comment on Reddit
- Do not email or Notion unless the user asked for that channel too

## Output
channel, timestamp, what was sent, approval record.

If approval is missing, stop and Ask Question: "Send today's Figma Sentinel brief to Slack?"
