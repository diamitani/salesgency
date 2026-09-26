---
name: dailybrief2026-08-28
description: Process/Note derived from daily_brief_2026-08-28.md
source_path: daily_brief_2026-08-28.md
---

# daily_brief_2026-08-28.md

## Context
This skill provides knowledge, processes, and instructions derived from the document: `daily_brief_2026-08-28.md`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

# Figma Sentinel daily brief — 2026-08-28

**Status:** quality-gate **pass** with warnings. Sheets skipped (`gsheets` not connected). Local master: `/home/user/harvest/master/`. Not sent to Slack, email, or Notion.

## 1. Window, volume, harvest health

| | |
|---|---|
| Window | ~last 1–2 weeks of public Reddit, harvested 2026-08-28 |
| Unique threads | **300** (target 100+) |
| Successful dumps | **300 / 300** |
| Comments in corpus | **2,263** (Arctic comments API cap **100/thread**; 1 thread truncated at 100) |
| Classified comments | 2,151 non-empty |
| Headline n | **78** (confidence ≥ 0.55, sentiment ≠ unclear) |
| Baseline | **missing** (first full run; no prior 7-day rows) |

**Harvest path (not a census):** DuckDuckGo HTML = captcha. Gumloop Web Search = empty. `reddit.com` / `old.reddit.com` JSON = **403**. Pullpush = agent rate-limit. Corpus = **Arctic Shift** read-only (`source=arctic_shift`): 100 r/FigmaDesign + 200 adjacent (`UXDesign`, `web_design`, `UI_Design`, `webdev`, `cursor`, `Framer`, `ChatGPT`, etc.). Search snippets were not used.

**Warnings:** Reddit.com blocked 100%. Adjacent subs inflate AI/career talk. Keyword sentiment over-counts “like” on how-to posts. Weak-n clusters are labeled. One billing OP body is `[removed]`.

## 2. Sentiment mix

Headline n=78 (not a census; keyword classifier; no 7-day baseline):

| | n | share |
|---|---|---|
| love + like | 57 | 73% |
| mixed | 8 | 10% |
| dislike + hate | 13 | 17% |

r/FigmaDesign headline subset n=19: like 14, mixed 1, dislike 3, hate 1. Treat the 73% “like” as **inflated**. Product-shaped talk in FigmaDesign is mixed-to-frustrated on memory, billing, Sites, MCP context, and Motion overlays.

## 3. Top love / like themes (headline only)

Use as “what people bother to praise,” not NPS.

- **Agent as design-system lackey** (n threads with theme “Figma agent quality” = 13 total / not all headline). People who wired the DS in say the agent is useful for variants, lint, batch variable scope — not for “doing the design.” Evidence [https://www.reddit.com/r/FigmaDesign/comments/1vvitfq/how_is_figma_ai_agent_actually_working_for_you/](https://www.reddit.com/r/FigmaDesign/comments/1vvitfq/how_is_figma_ai_agent_actually_working_for_you/), [https://www.reddit.com/r/UXDesign/comments/1vvirgj/how_is_figma_ai_agent_actually_working_for_you/](https://www.reddit.com/r/UXDesign/comments/1vvirgj/how_is_figma_ai_agent_actually_working_for_you/).
- **MCP + Claude/Cursor as the on-ramp** (theme “MCP / Cursor handoff” = 75 threads, many adjacent). Experienced designers tell returnees: hook MCP to Claude Code or Cursor and build something you already know. Evidence [https://www.reddit.com/r/UXDesign/comments/1vkn558/if_you_had_to_explain_to_an_experienced_figma/](https://www.reddit.com/r/UXDesign/comments/1vkn558/if_you_had_to_explain_to_an_experienced_figma/).
- **Motion is “very cool” when it isn’t looping behind overlays.** Community reply on [https://www.reddit.com/r/FigmaDesign/comments/1vunc1o/figma_motion_questions/](https://www.reddit.com/r/FigmaDesign/comments/1vunc1o/figma_motion_questions/).

Quote (≤280): “I use it for tasks related to the designs system like creating variants or components and I do feel agent is quite good at creating new design if you have already design system.” — [https://www.reddit.com/r/FigmaDesign/comments/1vvitfq/how_is_figma_ai_agent_actually_working_for_you/](https://www.reddit.com/r/FigmaDesign/comments/1vvitfq/how_is_figma_ai_agent_actually_working_for_you/)

Quote: “I view it as my little design lackey and send it off to do the menial, tedious, and repetitive tasks.” — [https://www.reddit.com/r/UXDesign/comments/1vvirgj/how_is_figma_ai_agent_actually_working_for_you/](https://www.reddit.com/r/UXDesign/comments/1vvirgj/how_is_figma_ai_agent_actually_working_for_you/)

## 4. Top hate / issue clusters (where they sit)

Clusters with **≥3 threads** unless marked weak-n.

| Cluster | Approx. thread n (theme) | Where it sits | Alignment |
|---|---|---|---|
| MCP / Cursor hallucinates spacing unless auto-layout is tight | 75 theme / core examples [https://www.reddit.com/r/FigmaDesign/comments/1vycog6/cursor_keeps_hallucinating_my_figma_components/](https://www.reddit.com/r/FigmaDesign/comments/1vycog6/cursor_keeps_hallucinating_my_figma_components/), [https://www.reddit.com/r/FigmaDesign/comments/1vx7bro/ai_is_good_at_generating_ui_but_it_keeps_breaking/](https://www.reddit.com/r/FigmaDesign/comments/1vx7bro/ai_is_good_at_generating_ui_but_it_keeps_breaking/) | Dev Mode, MCP, auto layout | **gap** on `dev_handoff_mcp` + `core_design_systems` |
| Variables / modes for many brands | 95 theme; flagship [https://www.reddit.com/r/FigmaDesign/comments/1vz7ao0/designing_a_scalable_figma_design_system_for_50/](https://www.reddit.com/r/FigmaDesign/comments/1vz7ao0/designing_a_scalable_figma_design_system_for_50/) | Variables, libraries | **gap** on `core_design_systems` |
| Desktop RAM / Electron wrapper | 35 theme; flagship [https://www.reddit.com/r/FigmaDesign/comments/1vwx4oz/memory_hungry_and_desktop_app_is_just_a_wrapper/](https://www.reddit.com/r/FigmaDesign/comments/1vwx4oz/memory_hungry_and_desktop_app_is_just_a_wrapper/) | Desktop app, canvas | **gap** on `unbounded_canvas` |
| Billing / seats / credits | 26 theme; flagship [https://www.reddit.com/r/FigmaDesign/comments/1w0jce6/figmas_billing_ux_is_unacceptable_5940_annual/](https://www.reddit.com/r/FigmaDesign/comments/1w0jce6/figmas_billing_ux_is_unacceptable_5940_annual/) (OP removed) | Admin, AI credits | **gap** on `admin_enterprise` |
| Make / vibe-code looks generic | 21 theme; [https://www.reddit.com/r/cursor/comments/1vvznhr/i_finally_figured_out_why_every_aicoded_site/](https://www.reddit.com/r/cursor/comments/1vvznhr/i_finally_figured_out_why_every_aicoded_site/), [https://www.reddit.com/r/cursor/comments/1uc5ani/how_do_you_get_cursor_to_build_premium_saas_ui/](https://www.reddit.com/r/cursor/comments/1uc5ani/how_do_you_get_cursor_to_build_premium_saas_ui/) | Make, code layers, agent | **gap** on `code_as_material` |
| Sites vs Framer for publish | 39 theme; [https://www.reddit.com/r/FigmaDesign/comments/1vvznpj/need_help_in_building_my_portfolio_on_figma_sites/](https://www.reddit.com/r/FigmaDesign/comments/1vvznpj/need_help_in_building_my_portfolio_on_figma_sites/), [https://www.reddit.com/r/framer/comments/1vtfjs5/figma_framer_or_learn_framer_properly_first/](https://www.reddit.com/r/framer/comments/1vtfjs5/figma_framer_or_learn_framer_properly_first/) | Sites | **gap** on `go_to_market_surfaces` |
| Motion overlay replay / prototype wiring | 33 theme; [https://www.reddit.com/r/FigmaDesign/comments/1vunc1o/figma_motion_questions/](https://www.reddit.com/r/FigmaDesign/comments/1vunc1o/figma_motion_questions/), [https://www.reddit.com/r/FigmaDesign/comments/1vxr05k/figma_motion_to_prototype_not_possible/](https://www.reddit.com/r/FigmaDesign/comments/1vxr05k/figma_motion_to_prototype_not_possible/) (weak-n bugs) | Motion | **gap** on `motion_on_canvas` |
| File browser folders lost thumbnails | weak-n [https://www.reddit.com/r/FigmaDesign/comments/1vui5ic/figma_folders_card_without_thumbnails_no_list/](https://www.reddit.com/r/FigmaDesign/comments/1vui5ic/figma_folders_card_without_thumbnails_no_list/) | File org | **not_public** |
| Penpot / free MCP limits | weak-n [https://www.reddit.com/r/UI_Design/comments/1vwizno/figma_vs_penpot_for_a_saas_finance_web_app/](https://www.reddit.com/r/UI_Design/comments/1vwizno/figma_vs_penpot_for_a_saas_finance_web_app/) | MCP plans | **gap** (not a switch census) |

Quotes:

“I'm sad… desktop app is just an electron wrapper… Today i ran out of 32GBs of ram.” — [https://www.reddit.com/r/FigmaDesign/comments/1vwx4oz/memory_hungry_and_desktop_app_is_just_a_wrapper/](https://www.reddit.com/r/FigmaDesign/comments/1vwx4oz/memory_hungry_and_desktop_app_is_just_a_wrapper/)

“Screenshot → Cursor is always lossy for spacing. The model is guessing padding from pixels, so anything that isn't tight auto-layout will drift.” — [https://www.reddit.com/r/FigmaDesign/comments/1vycog6/cursor_keeps_hallucinating_my_figma_components/](https://www.reddit.com/r/FigmaDesign/comments/1vycog6/cursor_keeps_hallucinating_my_figma_components/)

“I ask AI to add a button… it creates a new one. Slightly different size, different radius… even though the correct Button component already exists.” — [https://www.reddit.com/r/FigmaDesign/comments/1vx7bro/ai_is_good_at_generating_ui_but_it_keeps_breaking/](https://www.reddit.com/r/FigmaDesign/comments/1vx7bro/ai_is_good_at_generating_ui_but_it_keeps_breaking/)

“Don’t do it in Figma sites… If you really want to do it as a website maybe use framer.” — [https://www.reddit.com/r/FigmaDesign/comments/1vvznpj/need_help_in_building_my_portfolio_on_figma_sites/](https://www.reddit.com/r/FigmaDesign/comments/1vvznpj/need_help_in_building_my_portfolio_on_figma_sites/)

“cropping has to be one of the worst handled things in all of Figma.” — [https://www.reddit.com/r/FigmaDesign/comments/1vuavj1/need_help_with_figma/](https://www.reddit.com/r/FigmaDesign/comments/1vuavj1/need_help_with_figma/)

## 5. Design-principle talk

- **Systems over screens:** white-label work wants variables/modes, not 50 forked files ([https://www.reddit.com/r/FigmaDesign/comments/1vz7ao0/designing_a_scalable_figma_design_system_for_50/](https://www.reddit.com/r/FigmaDesign/comments/1vz7ao0/designing_a_scalable_figma_design_system_for_50/)).
- **Auto layout as the contract with agents:** messy stacks → hallucinated CSS ([https://www.reddit.com/r/FigmaDesign/comments/1vycog6/cursor_keeps_hallucinating_my_figma_components/](https://www.reddit.com/r/FigmaDesign/comments/1vycog6/cursor_keeps_hallucinating_my_figma_components/)).
- **Comments as craft:** r/UXDesign asks what “good Figma comments” sound like — edge cases, consistency, a11y — not pixel nits ([https://www.reddit.com/r/UXDesign/comments/1vmh919/what_kind_of_figma_comments_make_you_immediately/](https://www.reddit.com/r/UXDesign/comments/1vmh919/what_kind_of_figma_comments_make_you_immediately/)). Weak as a Figma product signal.
- **Negative space / visual hierarchy** shows up in UI_Design rants and “generic AI SaaS” threads ([https://www.reddit.com/r/cursor/comments/1vvznhr/i_finally_figured_out_why_every_aicoded_site/](https://www.reddit.com/r/cursor/comments/1vvznhr/i_finally_figured_out_why_every_aicoded_site/), [https://www.reddit.com/r/cursor/comments/1uc5ani/how_do_you_get_cursor_to_build_premium_saas_ui/](https://www.reddit.com/r/cursor/comments/1uc5ani/how_do_you_get_cursor_to_build_premium_saas_ui/)): purple-gradient mean is the design-principle failure mode of unconstrained generation.

## 6. Software map (what is similar)

Mention counts are **thread co-occurrence in this harvest**, not market share.

| Analog | Threads (co-occur) | Job they steal |
|---|---|---|
| Claude | 79 | Agent + MCP codegen |
| Cursor | 33 | Design-to-code, “premium SaaS UI” |
| ChatGPT | 31 | Generic UI / copy |
| Framer | 24 | Publish the portfolio/site |
| Photoshop / Illustrator / AE | 22 / 19 / 11 | Draw, motion, print-adjacent |
| Lovable | 9 | Vibe-code prototype |
| Webflow | 8 | Marketing sites |
| Penpot | 4 | Free MCP / open source |
| Sketch | 11 | Legacy compare |
| Airship (OSS canvas on the live app) | [https://www.reddit.com/r/UXDesign/comments/1vlin4f/i_opensourced_a_figmalike_editor_for_claude_code/](https://www.reddit.com/r/UXDesign/comments/1vlin4f/i_opensourced_a_figmalike_editor_for_claude_code/) | Edit the product, skip Figma |
| Dessn.ai | [https://www.reddit.com/r/FigmaDesign/comments/1vzg02o/make_in_your_local_codebase_beta_access/](https://www.reddit.com/r/FigmaDesign/comments/1vzg02o/make_in_your_local_codebase_beta_access/) | Iterate in the local codebase (same job as Make-in-codebase beta) |

Public Figma surfaces named in chatter: Make (noisy keyword), MCP, Motion, agent, Sites, Weave (thin), Dev Mode (thin vs MCP). **Code layers** almost absent in this window (1 keyword hit) despite Config 2026.

## 7. Vibe-code pairing patterns

1. **Figma MCP → Claude Code / Cursor** is the default “how to start with AI” recipe ([https://www.reddit.com/r/UXDesign/comments/1vkn558/if_you_had_to_explain_to_an_experienced_figma/](https://www.reddit.com/r/UXDesign/comments/1vkn558/if_you_had_to_explain_to_an_experienced_figma/), [https://www.reddit.com/r/UXDesign/comments/1vs83u2/whats_your_honest_take_on_vibecoding_as_a/](https://www.reddit.com/r/UXDesign/comments/1vs83u2/whats_your_honest_take_on_vibecoding_as_a/)). People still say screenshots are lossy.
2. **Agent inside Figma, Make parked:** at least one power user stopped using Make for months after Agent + custom skills + DS connection ([https://www.reddit.com/r/FigmaDesign/comments/1vvitfq/how_is_figma_ai_agent_actually_working_for_you/](https://www.reddit.com/r/FigmaDesign/comments/1vvitfq/how_is_figma_ai_agent_actually_working_for_you/)). Counter: “Never use it for design. That’s my job.”
3. **Generic output:** unconstrained Cursor/Claude → same SaaS template ([https://www.reddit.com/r/cursor/comments/1vvznhr/i_finally_figured_out_why_every_aicoded_site/](https://www.reddit.com/r/cursor/comments/1vvznhr/i_finally_figured_out_why_every_aicoded_site/), [https://www.reddit.com/r/cursor/comments/1uc5ani/how_do_you_get_cursor_to_build_premium_saas_ui/](https://www.reddit.com/r/cursor/comments/1uc5ani/how_do_you_get_cursor_to_build_premium_saas_ui/)). Fix people invent: tokens file, `design.md`, stop letting the model pick radius/spacing.
4. **Make in local codebase** is the asked-for bridge vs Dessn ([https://www.reddit.com/r/FigmaDesign/comments/1vzg02o/make_in_your_local_codebase_beta_access/](https://www.reddit.com/r/FigmaDesign/comments/1vzg02o/make_in_your_local_codebase_beta_access/)). Public: code-on-canvas blog says import GitHub / local folder and bring Make onto the canvas. Access chatter says enterprise closed beta.
5. **Skip Figma:** shadcn live demo ([https://www.reddit.com/r/UI_Design/comments/1vwizno/figma_vs_penpot_for_a_saas_finance_web_app/](https://www.reddit.com/r/UI_Design/comments/1vwizno/figma_vs_penpot_for_a_saas_finance_web_app/)); OSS in-app canvas ([https://www.reddit.com/r/UXDesign/comments/1vlin4f/i_opensourced_a_figmalike_editor_for_claude_code/](https://www.reddit.com/r/UXDesign/comments/1vlin4f/i_opensourced_a_figmalike_editor_for_claude_code/)); Framer for sites ([https://www.reddit.com/r/FigmaDesign/comments/1vvznpj/need_help_in_building_my_portfolio_on_figma_sites/](https://www.reddit.com/r/FigmaDesign/comments/1vvznpj/need_help_in_building_my_portfolio_on_figma_sites/), [https://www.reddit.com/r/framer/comments/1vtfjs5/figma_framer_or_learn_framer_properly_first/](https://www.reddit.com/r/framer/comments/1vtfjs5/figma_framer_or_learn_framer_properly_first/)).

## 8. Hypotheses (killable)

1. **Because** MCP/Cursor still guesses padding off screenshots ([https://www.reddit.com/r/FigmaDesign/comments/1vycog6/cursor_keeps_hallucinating_my_figma_components/](https://www.reddit.com/r/FigmaDesign/comments/1vycog6/cursor_keeps_hallucinating_my_figma_components/), [https://www.reddit.com/r/FigmaDesign/comments/1vx7bro/ai_is_good_at_generating_ui_but_it_keeps_breaking/](https://www.reddit.com/r/FigmaDesign/comments/1vx7bro/ai_is_good_at_generating_ui_but_it_keeps_breaking/)), **if** PMM + education ship a “auto-layout is the MCP contract” recipe (Dev Mode + MCP docs, not a new unpublished feature), **then** “hallucinating components” threads in r/FigmaDesign drop within 30 days. **Kill if** next harvest still ≥3 new MCP-hallucination OPs after the recipe is live. Owner: education / PMM.

2. **Because** people want agent output that **reuses** Button/tokens ([https://www.reddit.com/r/FigmaDesign/comments/1vx7bro/ai_is_good_at_generating_ui_but_it_keeps_breaking/](https://www.reddit.com/r/FigmaDesign/comments/1vx7bro/ai_is_good_at_generating_ui_but_it_keeps_breaking/), [https://www.reddit.com/r/FigmaDesign/comments/1vvitfq/how_is_figma_ai_agent_actually_working_for_you/](https://www.reddit.com/r/FigmaDesign/comments/1vvitfq/how_is_figma_ai_agent_actually_working_for_you/)), **if** product frames Agent/Make as “on-system only” when a library is attached, **then** DS-break complaints fall. **Kill if** attached-library runs still spawn duplicate components in ≥3 new threads. Owner: product (`design_agent`, `code_as_material`). Public bet already exists; this is a **gap**, not a new roadmap item.

3. **Because** Sites is getting “use Framer / Claude instead” ([https://www.reddit.com/r/FigmaDesign/comments/1vvznpj/need_help_in_building_my_portfolio_on_figma_sites/](https://www.reddit.com/r/FigmaDesign/comments/1vvznpj/need_help_in_building_my_portfolio_on_figma_sites/)) while Config/GTM still sells canvas→live, **if** PMM is honest about when Sites is for vs Framer/Webflow (subscription, auto layout required, motion), **then** Sites how-to threads convert instead of bouncing. **Kill if** next window’s Sites threads still majority-recommend leaving. Owner: PMM (`go_to_market_surfaces`).

4. **Because** billing/seat surprise is the loudest admin OP ([https://www.reddit.com/r/FigmaDesign/comments/1w0jce6/figmas_billing_ux_is_unacceptable_5940_annual/](https://www.reddit.com/r/FigmaDesign/comments/1w0jce6/figmas_billing_ux_is_unacceptable_5940_annual/)) and plan-choice how-tos persist ([https://www.reddit.com/r/FigmaDesign/comments/1vvz6n3/help_me_understand_which_paid_plan_i_need/](https://www.reddit.com/r/FigmaDesign/comments/1vvz6n3/help_me_understand_which_paid_plan_i_need/)), **if** admin UX copy makes Collab vs Full and AI-credit multipliers unmistakable **before** charge, **then** “unacceptable billing” posts do not recur. **Kill if** a second billing-surprise OP appears in 14 days. Owner: product (`admin_enterprise`). Unpublished pricing changes: **unknown**.

5. **Because** Motion overlays replay the page timeline ([https://www.reddit.com/r/FigmaDesign/comments/1vunc1o/figma_motion_questions/](https://www.reddit.com/r/FigmaDesign/comments/1vunc1o/figma_motion_questions/)) while Config sells motion-on-canvas + Dev Mode inspect, **if** the already-acknowledged overlay bug ships, **then** “unusable with menus/modals” dies. **Kill if** overlay-replay still reported after the next Motion release note. Owner: product (`motion_on_canvas`). Do not invent a date.

## 9. Uncertainties, contradictions, bias

- **Not a census.** r/FigmaDesign + AI-adjacent subs. Career/AI-anxiety (91 threads) is Reddit, not Figma usage telemetry.
- **Keyword “like” is too happy.** Many likes are “best source to learn” / plugin launches.
- **Contradiction:** Config 2026 = unbounded canvas, code as material, agent, Weave, shaders. This window’s pain is **RAM, folders, crop, seats, MCP fidelity, Sites publish, Motion overlay** — core craft + admin. Code layers / Weave / shaders barely appear.
- **Contradiction:** “Has any org stopped using Figma?” ([https://www.reddit.com/r/UXDesign/comments/1vq42uk/has_any_matured_organization_stopped_using_figma/](https://www.reddit.com/r/UXDesign/comments/1vq42uk/has_any_matured_organization_stopped_using_figma/)) is treated as astroturf by commenters; do not read as churn.
- **Penpot n=4** ≠ migration wave.
- **OP `[removed]`** on billing; title only.
- **Arctic comment cap 100**; one ChatGPT thread truncated.
- Unpublished roadmap = **unknown**. No dates or unannounced features claimed.

## 10. Now / next / later

**Now (public pillars, quality/education gaps)**  
- Teach auto layout + variables as the MCP/Agent contract.  
- Agent/Make: reuse existing components, don’t mint lookalikes.  
- Billing/seat language; AI credit multipliers are already on the public release-notes banner — connect that to seat UX.  
- Sites: when not to use it (portfolio publish) vs Framer.

**Next (shipped bets, known bugs)**  
- Motion: overlay/timeline replay ([https://www.reddit.com/r/FigmaDesign/comments/1vunc1o/figma_motion_questions/](https://www.reddit.com/r/FigmaDesign/comments/1vunc1o/figma_motion_questions/)); prototype trigger from agent-made motion ([https://www.reddit.com/r/FigmaDesign/comments/1vxr05k/figma_motion_to_prototype_not_possible/](https://www.reddit.com/r/FigmaDesign/comments/1vxr05k/figma_motion_to_prototype_not_possible/) resolved by OP — still an education miss).  
- Make in local codebase access beyond enterprise ([https://www.reddit.com/r/FigmaDesign/comments/1vzg02o/make_in_your_local_codebase_beta_access/](https://www.reddit.com/r/FigmaDesign/comments/1vzg02o/make_in_your_local_codebase_beta_access/)) — public code-on-canvas already describes GitHub/local folder; access is the gap.  
- File browser thumbnails in folders ([https://www.reddit.com/r/FigmaDesign/comments/1vui5ic/figma_folders_card_without_thumbnails_no_list/](https://www.reddit.com/r/FigmaDesign/comments/1vui5ic/figma_folders_card_without_thumbnails_no_list/)) — **not_public**.

**Later**  
- Native/lighter desktop ([https://www.reddit.com/r/FigmaDesign/comments/1vwx4oz/memory_hungry_and_desktop_app_is_just_a_wrapper/](https://www.reddit.com/r/FigmaDesign/comments/1vwx4oz/memory_hungry_and_desktop_app_is_just_a_wrapper/)) — **not_public** as a native rewrite; Support already said WebGL is shared. Don’t promise native.  
- Crop/image-fill ([https://www.reddit.com/r/FigmaDesign/comments/1vuavj1/need_help_with_figma/](https://www.reddit.com/r/FigmaDesign/comments/1vuavj1/need_help_with_figma/)) — core craft, not Config 2026.

## 11. Slack-ready paragraph (not sent)

Figma Sentinel 8/28: n=78 headline mentions (keyword; baseline missing), love+like 73% / dislike+hate 17% — treat like-rate as inflated. Corpus 300 threads / 2263 comments via Arctic Shift after Reddit 403 + DDG captcha. Biggest product clusters: MCP/Cursor spacing hallucination ([https://www.reddit.com/r/FigmaDesign/comments/1vycog6/cursor_keeps_hallucinating_my_figma_components/](https://www.reddit.com/r/FigmaDesign/comments/1vycog6/cursor_keeps_hallucinating_my_figma_components/)), DS-breaking AI buttons ([https://www.reddit.com/r/FigmaDesign/comments/1vx7bro/ai_is_good_at_generating_ui_but_it_keeps_breaking/](https://www.reddit.com/r/FigmaDesign/comments/1vx7bro/ai_is_good_at_generating_ui_but_it_keeps_breaking/)), desktop RAM ([https://www.reddit.com/r/FigmaDesign/comments/1vwx4oz/memory_hungry_and_desktop_app_is_just_a_wrapper/](https://www.reddit.com/r/FigmaDesign/comments/1vwx4oz/memory_hungry_and_desktop_app_is_just_a_wrapper/)), Sites→Framer bounce ([https://www.reddit.com/r/FigmaDesign/comments/1vvznpj/need_help_in_building_my_portfolio_on_figma_sites/](https://www.reddit.com/r/FigmaDesign/comments/1vvznpj/need_help_in_building_my_portfolio_on_figma_sites/)), Motion overlay replay ([https://www.reddit.com/r/FigmaDesign/comments/1vunc1o/figma_motion_questions/](https://www.reddit.com/r/FigmaDesign/comments/1vunc1o/figma_motion_questions/)). Analog: Claude+Cursor for the handoff job. Config 2026 code-layers/Weave almost silent here. Reddit is not a census. Hypotheses in the brief.

---

### Quality-gate checklist

- registry_total 300, dumps 300, failed_fetches 0 (Arctic); Reddit.com blocked — **reported**
- no usernames in this brief
- no Reddit writes
- headline claims have thread_id + evidence_span
- alignment labels only aligned / gap / contradiction / not_public
- no unpublished roadmap invented
- headline excludes unclear and conf < 0.55

**Warnings:** unique URLs via Arctic not DDG; Reddit JSON blocked 100%; weak-n used only when labeled; DDG captcha.

**Ask:** approve Slack / email / Notion before any send. Connect Google Sheets if you want the Figma Sentinel workbook upserted.
