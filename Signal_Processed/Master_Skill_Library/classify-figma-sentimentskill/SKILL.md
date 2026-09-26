---
name: classify-figma-sentimentskill
description: Process/Note derived from classify-figma-sentiment.SKILL.md
source_path: figmasentinel/classify-figma-sentiment.SKILL.md
---

# classify-figma-sentiment.SKILL.md

## Context
This skill provides knowledge, processes, and instructions derived from the document: `classify-figma-sentiment.SKILL.md`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

---
name: classify-figma-sentiment
description: Classify Reddit mentions for Figma love vs hate, intent, and entities (Figma products, design principles, software). Use after harvest or when the user pastes comments to label. Do not use for writing the daily brief, harvesting, or posting.
icon: heart
color: Pink
related_server_ids: [reddit]
---

# Classify Figma sentiment

## When to use
Every harvested event that might mention Figma, a design principle, or adjacent software.

## Relevance
Drop events with no Figma / principle / software match (relevance < 0.5).
"Figma file" as a file format with no product opinion can still be relevant if the thread is about workflow.

## Labels
sentiment_label: love | like | mixed | dislike | hate | unclear
sentiment_score: integer -2 to +2
intent: praise | complaint | bug | feature_request | how_to | switch_from_figma | switch_to_figma | compare | hiring | tutorial | vibe_code | principle_discussion | pricing | other

## Rules
- Sarcasm, hiring posts, and "drop a Figma link" are not love.
- Praise plus a blocking issue = mixed, score 0.
- Question with no valence = unclear + how_to.
- Confidence below 0.55 still persist later, but they are not headline metrics.
- evidence_span max 280 characters, copied from the comment, not paraphrased into a new claim.
- Do not use upvote count as sentiment.

## Entities to extract
Figma products: figma_design, figjam, dev_mode, figma_make, figma_sites, figma_slides, variables, code_connect, figma_mcp.
Principles: auto_layout, constraints, tokens, variants, visual_hierarchy, spacing_8pt, accessibility_wcag, consistency, responsive.
Software: sketch, penpot, adobe_xd, framer, webflow, v0, lovable, bolt, cursor, claude, uizard, stitch, spline, protopie.

## Steps
1. Read title + body + one parent comment if present.
2. Extract entities.
3. Assign sentiment, score, intent, confidence, evidence_span.
4. Pass the classified mention to `locate-product-issues` and `map-similar-software`.

## Example
Input: "Dev Mode is still slow. Thinking about Penpot."
Output: dislike, -1, complaint, entities dev_mode + penpot, confidence 0.8, span the quoted sentence.
