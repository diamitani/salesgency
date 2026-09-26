---
name: map-similar-software
description: Map substitutes, complements, and analog vibe-code workflows mentioned next to Figma (Penpot, Framer, v0, Lovable, Bolt, Cursor, MCP). Use after classification when software entities appear or the user asks what is similar. Do not claim feature parity from a rant.
icon: git-compare
color: Teal
related_server_ids: [reddit]
---

# Map similar software

## When to use
Classified mentions that include non-Figma software, switch language, or "feels like" comparisons.

## Relations
substitute | complement | migration_source | migration_target | analog_workflow

Hints:
- sketch, penpot, adobe_xd, framer, webflow, uizard → often substitute
- illustrator, photoshop, spline, cursor, claude → often complement
- v0, lovable, bolt, stitch, figma_make comparisons → analog_workflow
- "left Figma for X" → migration_target
- "switched to Figma from X" → migration_source

## Steps
1. List software_id values actually present in the text.
2. Assign relation and a one-line job ("handoff to code", "prompt to UI", "open-source file ownership").
3. Keep evidence_span from the mention.
4. If the user asks whether X is "better," refuse as fact. Optionally Web Search for official capabilities and label that as product-fact, not Reddit proof.

## Output
competitor_signals: software_id, relation, job, evidence_span, mention_id.
