---
name: present-sentinel-report
description: Transform Figma Sentinel raw analysis into a beautiful, plain-English leadership report. Use after quality-gate and before delivery. This is the presentation skill: it makes the report readable, scannable, visual, and decision-oriented without changing the underlying evidence.
icon: presentation
color: Purple
---

# Present Sentinel report

## Purpose
Turn technical harvest output into a polished product-intelligence report that a PMM, product leader, design leader, or executive can read in under five minutes.

This skill **does not re-harvest, reclassify, or invent claims**. It packages approved source-grounded findings into a human-readable report.

## Inputs
- Quality-gated report data
- Master spreadsheet aggregates
- Top themes, sentiments, wants, needs, roadmap mappings, examples, and source health
- Report mode: `BOOTSTRAP` or `NEW TODAY`

## Audience modes
Default: `executive`.

- `executive`: decision, risk, opportunity, recommended action; limited methods language.
- `product`: issue clusters, owner, product surface, evidence, recommendation.
- `pmm`: language, objections, education gaps, competitor framing, message tests.
- `design`: workflow friction, systems, craft, agent behavior, usability.

Ask only if the requested audience materially changes the report. Otherwise generate executive first and append a compact appendix.

## Report design rules
- Lead with **what changed and what leadership should do**. Never lead with endpoint errors.
- Use one short headline, one “bottom line” paragraph, and no more than five key findings.
- Use plain English: “People are struggling to…” not “the cluster indicates a negative polarity.”
- Every finding gets: `what we heard`, `why it matters`, `what to do`.
- Use short evidence snippets only, maximum 180 characters each. No usernames.
- Use a concise table where it increases scanability.
- Keep methodology, source coverage, classifier limitations, and low-n caveats in a final “Confidence and coverage” section.
- Do not use fake precision. Round counts when quality is weak. Example: “about 300 threads,” not “300.0.”
- Call sentiment “directional community signal,” never NPS, satisfaction, market share, or a census.

## Required executive report structure

```md
# Figma Sentinel — Executive brief
## Bottom line
[2–3 sentences: the most important community signal, strategic implication, and recommended focus.]

## What changed
- [Up to 3 observable changes or top findings]

## What people are saying
| Theme | What we heard | Why it matters | Public Figma fit |
|---|---|---|---|

## What people want from us
1. [Need/outcome, not feature list]
2. [Need/outcome]
3. [Need/outcome]

## Leadership decisions
| Priority | Recommended action | Owner | Why now | Success signal |
|---|---|---|---|---|

## Competitive pressure
[Only actual evidence-backed alternatives and the job they are hired for.]

## Watch items
[Uncertain, low-volume, contradictory, or unresolved signals.]

## Confidence and coverage
[Sources, period, sample limitations, source blocks, and why the report is directional.]
```

## Visual report artifact
When the user asks for a report artifact or presentation:

1. Create a clean white report page or Markdown/HTML document.
2. Use a Figma-inspired palette sparingly:
   - Red `#F24E1E` = risk / pain
   - Purple `#A259FF` = product / opportunity
   - Blue `#1ABCFE` = source coverage / context
   - Green `#0ACF83` = positive momentum
3. Include four visual cards only: Coverage, Positive momentum, Friction, Recommended focus.
4. Include one 2×2 decision matrix only if enough evidence exists; otherwise omit it.
5. Never create decorative charts that imply statistical rigor the data does not support.

## Example rewrite
Technical: “MCP / Cursor hallucination cluster n=75; gap on dev_handoff_mcp + core_design_systems.”

Executive: “Designers want AI handoff to respect the system they already built. When auto layout and components are loose, coding tools guess spacing and create lookalike UI. The immediate opportunity is a clear ‘system-ready handoff’ workflow and education path, not a new promise.”

## Output contract
Return:
1. Executive brief in Markdown
2. Leadership actions table
3. Optional HTML/white-page report when asked
4. A one-paragraph Slack summary marked `DRAFT — not sent`

Then call `store-report-artifact` to persist the report and its metadata.
