---
name: readme
description: Process/Note derived from README.md
source_path: prospect-automation-engine-frontend/README.md
---

# README.md

## Context
This skill provides knowledge, processes, and instructions derived from the document: `README.md`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

# CODING AGENTS: READ THIS FIRST

This is a **handoff bundle** from Claude Design (claude.ai/design).

A user mocked up designs in HTML/CSS/JS using an AI design tool, then exported this bundle so a coding agent can implement the designs for real.

## What you should do — IMPORTANT

**Read `prospect-automation-engine-frontend/project/Prospect PAL.dc.html` in full.** The user had this file open when they triggered the handoff, so it's almost certainly the primary design they want built. Read it top to bottom — don't skim. Then **follow its imports**: open every file it pulls in (shared components, CSS, scripts) so you understand how the pieces fit together before you start implementing.

**If anything is ambiguous, ask the user to confirm before you start implementing.** It's much cheaper to clarify scope up front than to build the wrong thing.

## About the design files

The design medium is **HTML/CSS/JS** — these are prototypes, not production code. Your job is to **recreate them pixel-perfectly** in whatever technology makes sense for the target codebase (React, Vue, native, whatever fits). Match the visual output; don't copy the prototype's internal structure unless it happens to fit.

**Don't render these files in a browser or take screenshots unless the user asks you to.** Everything you need — dimensions, colors, layout rules — is spelled out in the source. Read the HTML and CSS directly; a screenshot won't tell you anything they don't.

## Bundle contents

- `prospect-automation-engine-frontend/README.md` — this file
- `prospect-automation-engine-frontend/project/` — the `Prospect Automation Engine Frontend` project files (HTML prototypes, assets, components)
