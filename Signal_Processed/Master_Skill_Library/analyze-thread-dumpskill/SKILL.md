---
name: analyze-thread-dumpskill
description: Process/Note derived from analyze-thread-dump.SKILL.md
source_path: figmasentinel/analyze-thread-dump.SKILL.md
---

# analyze-thread-dump.SKILL.md

## Context
This skill provides knowledge, processes, and instructions derived from the document: `analyze-thread-dump.SKILL.md`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

---
name: analyze-thread-dump
description: Analyze a Reddit markdown dump from JSON fetch. Extract OP topic, conversation themes, sentiment, wants, needs, and evidence spans. Use after fetch-reddit-json. Do not web-search or map Figma roadmap in this skill.
icon: scan-text
color: Pink
---

# Analyze thread dump

## Input
One `{thread_id}.md` dump. Classify from this text only.

## Per thread
- op_topic: one line, what the OP asked or claimed
- themes: short noun phrases (Dev Mode lag, Make quality, pricing credits, auto layout, MCP handoff)
- thread_sentiment: love | like | mixed | dislike | hate | unclear
- thread_score: integer from -2 to +2
- people_say: 2 to 4 bullets, each with an evidence_span
- people_want: requested feature or outcome
- people_need: underlying job, not the feature name
- intents: praise, complaint, bug, feature_request, how_to, switch_from_figma, switch_to_figma, compare, vibe_code, pricing, principle_discussion

## Per comment
Skip empty or deleted. For each remaining comment record:

comment_id, depth, sentiment_label, sentiment_score, intent, evidence_span, confidence

evidence_span max 280 characters, copied from the dump, not rewritten as a new claim.

## Rules
- Sarcasm and "drop a Figma link" are not love
- Praise plus a blocker = mixed, score 0
- Question with no valence = unclear + how_to
- Confidence below 0.55 still goes to persist later, but is not a headline metric
- Do not use upvote count as sentiment

## Output
Thread summary plus comment rows.

## Next skills
`figma-public-context` then `map-chatter-to-roadmap`
