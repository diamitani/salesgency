---
artifact_type: marketing-copy-deck
document_type: landing-text-mockup
project_id: prospect-pal
page: /
route: src/app/(marketing)/home/page.tsx
kit: Prospect PAL Design System/ui_kits/marketing
audience_agent: pal-website-agent
secondary_agents: [cto-dev-engineer, marketing-implementer]
status: approved-copy
version: v1
last_updated: 2026-08-27
owner: product
approval_state: copy-locked-layout-open
---

# Prospect PAL — Landing copy deck and text mockup

Feed this file to the website agent as the **source of truth for marketing strings**. Do not invent slogans. Do not restore the previous “Answer eight questions” hero. Place copy in the slots below. If a slot is empty, leave the current UI string only when marked `KEEP`.

## Agent instructions

1. Read this deck before editing `page.tsx`, `Hero.jsx`, `Sections.jsx`, `SiteChrome.jsx`, or `site.config.ts`.
2. Replace strings by `slot_id`. Do not rewrite nearby microcopy unless a slot is provided.
3. Keep the marketing chrome: announcement strip, sticky nav, hero + canvas, section grid, pricing cards, footer.
4. New copy needs two extra sections: **How it works** (`#process`) and **Agent tools** (`#tools`). Insert them in the page order below.
5. Park **Signals** (`#signals`) off the primary nav. Do not delete the component; hide or move below the fold until new signal copy exists.
6. Voice: operator, concrete, second person. No emojis. No gradient-text. Product name is **Prospect PAL** (space, PAL in caps).
7. Platforms: **n8n**, **Make**, **Gumloop**. Integrations: HubSpot, Clay, Amplemarket, Apollo. Never “gum loop”, “make.com engineer” as a product name, or “ample market”.
8. Security line is non-negotiable: keys stay on the customer instance. Never imply Prospect PAL stores API keys or sends email during setup.
9. Primary CTA action: checkout / start Team ($99/mo). Secondary: demo or sign in. Tertiary: download DIY skill package.
10. Character budgets are hard. If copy overflows, shorten the **supporting** line, not the headline.

## Page order (render this)

```
TopStrip
SiteNav
Hero
  └ canvas: 9-node pipeline (KEEP visual; retitle chrome)
HowItWorks     #process        NEW
WhatYouGet     #deliverables   REWRITE
AgentTools     #tools          REWRITE of Architecture/Integrations
Pricing        #pricing        REWRITE tiers
Close          #get-started    NEW
SiteFooter
Signals        #signals        PARK (do not show in nav)
```

Nav labels: `How it works` · `Tools` · `Deliverables` · `Pricing`

CTA targets:

| Button | Action |
|---|---|
| Get Prospect PAL / Start Team | checkout modal, Team $99/mo |
| See a compile | demo modal |
| Sign in | `/login` |
| Download skill package | DIY SKU / download |
| Request Elite | checkout / contact, Elite |

---

## Text mockup (wireframe)

Use this block as the Figma/HTML text mockup. Bracketed labels are slots, not visible type.

```
┌─────────────────────────────────────────────────────────────┐
│ [strip.badge] New                                           │
│ [strip.body] Agent copilot for outbound. Compile a workflow │
│ that runs on your n8n, Make, or Gumloop instance.           │
│ [strip.link] See how it works →                             │
├─────────────────────────────────────────────────────────────┤
│ Prospect PAL   [nav.badge] Agent copilot                    │
│ How it works  Tools  Deliverables  Pricing                  │
│ Sign in          [nav.cta] Get Prospect PAL                 │
├─────────────────────────────────────────────────────────────┤
│                 [hero.badge] BYOK · your instance           │
│                                                             │
│              [hero.h1] Prospect PAL                         │
│     [hero.h1_accent] Your agent copilot for                 │
│           building outbound sales motions.                  │
│                                                             │
│ [hero.sub] Prospect PAL enables sales teams to book more    │
│ qualified meetings. An agent copilot tailored to your tech  │
│ stack, product, and ICP — with skills, sub-agents, and a    │
│ harness — builds an outbound workflow in n8n, Make,         │
│ Gumloop, or a custom AI solution that deploys from your     │
│ instance.                                                   │
│                                                             │
│  [hero.cta_primary] Get Prospect PAL — $99/mo               │
│  [hero.cta_secondary] See a compile, 2 min                  │
│                                                             │
│  [stat.1] Your instance     Deploy, don't rent              │
│  [stat.2] BYOK              Keys never leave your workspace │
│  [stat.3] Unlimited         Campaigns on Team               │
│  [stat.4] Deterministic     Template + your data            │
│                                                             │
│  ┌─ canvas (KEEP 9-node rail) ───────────────────────────┐  │
│  │ [canvas.filename] workflow.json · compiled · approved │  │
│  │ [canvas.status] Graph compiled                        │  │
│  │ 01–09 nodes (KEEP titles/bindings)                    │  │
│  │ [canvas.node_cta] Configure this node                 │  │
│  └───────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│ [process.eyebrow] Process                                   │
│ [process.title] Three inputs. One workflow you own.         │
│ [process.desc] The agent compiles your stack, knowledge,    │
│ and tools into importable JSON. You add credentials.        │
│                                                             │
│  01  [p1.title] Choose your automation platform             │
│      [p1.body] n8n, Make, Gumloop, or custom. We load the   │
│      language, setup, and docs for that platform.           │
│                                                             │
│  02  [p2.title] Add your knowledge base                     │
│      [p2.body] Company, ICP, value prop. Pricing and sales  │
│      cycle help. Messaging scripts keep or update copy.     │
│      Agent form can walk you through it.                    │
│                                                             │
│  03  [p3.title] Identify your tools                         │
│      [p3.body] List integrations you have or want. Configure│
│      credentials on your end. No keys exposed to us.        │
│                                                             │
│ [process.note] Connect your account and the agent can       │
│ generate the workflow directly on your platform.            │
├─────────────────────────────────────────────────────────────┤
│ [get.eyebrow] Production artifacts                          │
│ [get.title] What a compile hands you                        │
│ [get.desc] Customized JSON from your inputs and templates.  │
│ Upload to your workspace. Add credentials. Run.             │
│                                                             │
│  [d1] workflow.json          Import-ready                   │
│  [d2] Custom build prompt    Essential skill                │
│  [d3] Skill package          Agent directory + SKILL.md     │
│  [d4] Daily execution report Runs, leads, reply rates       │
│  [d5] Execution analysis     Failures + suggested fixes     │
│  [d6] Credential map         Configure on your instance     │
├─────────────────────────────────────────────────────────────┤
│ [tools.eyebrow] The tools we use                            │
│ [tools.title] A harness, not a black box                    │
│ [tools.desc] Each tool builds a customizable outreach       │
│ workflow with a deterministic process.                      │
│                                                             │
│  n8n Engineer                                               │
│  Make & Gumloop Engineer                                    │
│  n8n Execution Agent                                        │
│  Daily Execution Report                                     │
│  Prospect Automation Workflow                               │
│  Custom Build Prompt                                        │
├─────────────────────────────────────────────────────────────┤
│ [pricing.eyebrow] Plans                                     │
│ [pricing.title] Bring your own key. Automate campaigns.     │
│ [pricing.desc] Master agent, canvas, and workspace.         │
│                                                             │
│  DIY skill package     Team (featured)     Elite            │
│  Download              $99/mo              Custom           │
│  Configure your keys   Unlimited campaigns Prompt-to-setup  │
│                                                             │
│ [pricing.trust] We never store an API key, and we never     │
│ send an email on your behalf during setup.                  │
├─────────────────────────────────────────────────────────────┤
│ [close.eyebrow] Ready?                                      │
│ [close.title] Build your sales motion with an agent copilot │
│ [close.body] Research leads, generate new ones, send        │
│ personalized messages, and get accurate reporting.          │
│ [close.cta] Get your Prospect PAL today                     │
├─────────────────────────────────────────────────────────────┤
│ © 2026 Prospect PAL · GTM automation, compiled and handed   │
│ over.    Architecture  Security  Docs                       │
└─────────────────────────────────────────────────────────────┘
```

---

## Slot ledger

Type roles follow the design system: `display-1` hero, `section heading` + eyebrow, `body` / `body-sm`, `caption` / `micro` for chrome.

### 0. Document meta / SEO

| slot_id | placement | type | max | copy |
|---|---|---|---|---|
| `seo.title` | `<title>` | — | 60 | Prospect PAL — Agent copilot for outbound sales motions |
| `seo.description` | meta | — | 160 | Build outbound automation on n8n, Make, or Gumloop. Tailored to your stack, product, and ICP. BYOK. $99/mo. |
| `seo.og_title` | OG | — | 60 | Prospect PAL |
| `seo.og_description` | OG | — | 110 | Your agent copilot for building outbound sales motions. |

### 1. Announcement strip — `SiteChrome.jsx` `TopStrip`

| slot_id | component | type | max | copy |
|---|---|---|---|---|
| `strip.badge` | Badge tone=deep | caption | 12 | New |
| `strip.body` | strip text | caption | 110 | Agent copilot for outbound. Compile a workflow that runs on your n8n, Make, or Gumloop instance. |
| `strip.emphasis` | strong inside body | caption | 28 | Agent copilot for outbound. |
| `strip.link` | champagne link → `#process` | caption | 22 | See how it works |

Replace current “Tech signals live…” strip. Do not keep the 1,400+ companies line on this pass.

### 2. Nav — `SiteChrome.jsx` `SiteNav`

| slot_id | component | type | max | copy |
|---|---|---|---|---|
| `nav.badge` | Badge tone=brand | caption | 22 | Agent copilot |
| `nav.link.process` | `#process` | body-sm | 16 | How it works |
| `nav.link.tools` | `#tools` | body-sm | 12 | Tools |
| `nav.link.deliverables` | `#deliverables` | body-sm | 16 | Deliverables |
| `nav.link.pricing` | `#pricing` | body-sm | 12 | Pricing |
| `nav.signin` | outline button | — | 10 | Sign in |
| `nav.cta` | accent button | — | 20 | Get Prospect PAL |

Drop Architecture and Signals from the primary nav.

### 3. Hero — `Hero.jsx`

| slot_id | component | type | max | copy |
|---|---|---|---|---|
| `hero.badge` | Badge tone=brand icon=shield-check | caption | 28 | BYOK · your instance |
| `hero.h1` | h1 display-1 | display-1 | 18 | Prospect PAL |
| `hero.h1_accent` | cobalt span, line 2–3 | display-1 | 56 | Your agent copilot for building outbound sales motions. |
| `hero.sub` | p, max-width 660 | 19px body | 320 | Prospect PAL enables sales teams to book more qualified meetings. We provide an agent copilot tailored to your tech stack, product, and ICP, and equip it with skills, sub-agents, and a harness to build an outbound automation workflow in n8n, Make, Gumloop, or a custom AI solution that deploys from your instance. |
| `hero.cta_primary` | Button accent lg | — | 32 | Get Prospect PAL — $99/mo |
| `hero.cta_secondary` | Button outline lg | — | 28 | See a compile, 2 min |

**Headline treatment:** line 1 product name; accent line is the positioning statement. Do not use the old “Answer eight questions / Get a workflow you own.”

#### Hero stats (`StatTile` × 4)

| slot_id | value | unit / label |
|---|---|---|
| `stat.1` | Your instance | Deploy, don’t rent |
| `stat.2` | 100% BYOK | Keys stay in your workspace |
| `stat.3` | Unlimited | Campaigns on Team |
| `stat.4` | Deterministic | Templates + your data |

#### Hero canvas chrome (visual KEEP)

| slot_id | copy |
|---|---|
| `canvas.filename` | workflow.json · compiled · approved |
| `canvas.status` | Graph compiled |
| `canvas.node_cta` | Configure this node |

Keep `window.NINE_NODES` titles, subtitles, and bindings. This deck does not rewrite node names.

### 4. How it works — NEW section `id="process"`

Component: `SectionHeading` + 3-step numbered cards (new). Place after Hero, before Deliverables.

| slot_id | type | max | copy |
|---|---|---|---|
| `process.eyebrow` | eyebrow | 16 | Process |
| `process.title` | section title | 48 | Three inputs. One workflow you own. |
| `process.desc` | description | 160 | The agent compiles your stack, knowledge, and tools into a customized JSON file. Upload it to your workspace and add credentials. |
| `process.note` | caption under cards | 140 | Prefer hands-off? Connect your account and our AI generates the workflow directly on your platform. |

#### Step cards

| slot_id | title | body |
|---|---|---|
| `process.step1` | Choose your automation platform | n8n, Make, Gumloop, or a custom AI solution. We load the language, setup, and documentation for that platform so the agent builds against your stack. |
| `process.step2` | Add your knowledge base | Files about your company, ICP, and value proposition. Product pricing and sales cycle are appreciated, not required. Messaging scripts help the agent keep or update your copy. Need help? The agent form walks you through building it out. |
| `process.step3` | Identify your tools | List the integrations you have in your automation service, or want in custom tools. Configure them in your credential settings. Keys never leave your instance. |

Card numbers: `01` `02` `03`. Use `font-data` for numbers.

### 5. What you get — rewrite `#deliverables`

Reuse `DeliverableCard` grid (3×2). Eyebrow can stay “Production artifacts”.

| slot_id | copy |
|---|---|
| `get.eyebrow` | Production artifacts |
| `get.title` | What a compile hands you |
| `get.desc` | A customized JSON file tailored to your data and workflow templates. Upload to your workspace, add credentials, and run. |

| slot_id | file | badge | label | description |
|---|---|---|---|---|
| `d1` | workflow.json | Import ready | Production workflow | Customized n8n, Make, or Gumloop JSON from your inputs and the campaign template. |
| `d2` | BUILD_PROMPT.md | Essential skill | Custom build prompt | System instructions to generate or edit the prospect automation workflow with the automation engineer. |
| `d3` | skill-package/ | DIY | Agent skill package | Agent directory, sub-agents, SKILL.md files, and templates for your own coding harness. |
| `d4` | daily-report | Reporting | Daily execution report | Nodes processed, data packs stored or deleted, leads processed, leads emailed, open/reply rates. |
| `d5` | execution-agent | Ops | Execution analysis | Reads workflow runs by ID, scans failures, and suggests fixes. |
| `d6` | credentials | Security | Your keys, your instance | Connectors listed so you configure credentials locally. No keys exposed to Prospect PAL. |

### 6. Agent tools — rewrite `#tools` (was Architecture / Integrations)

Reuse `IntegrationCard` grid, 2×3. This is **our** agent skills, not the customer CRM list. Do not show HubSpot/Salesforce/Apollo as the primary grid on this pass.

| slot_id | copy |
|---|---|
| `tools.eyebrow` | The tools we use |
| `tools.title` | A harness, not a black box |
| `tools.desc` | Skills and sub-agents that compile a customizable outreach workflow with a deterministic process. |

| slot_id | name | capability | description | icon |
|---|---|---|---|---|
| `t1` | n8n Engineer | workflow-compile | Master at n8n workflows. Nodes, ELT, connectors, platform docs. HubSpot, Clay, Amplemarket, Apollo, and more. | workflow |
| `t2` | Make & Gumloop Engineer | workflow-compile | Same compile skill, specialized for Make and Gumloop. | layers |
| `t3` | n8n Execution Agent | run-triage | Analyzes workflows by execution run and ID. Scans failures and suggests fixes. | search |
| `t4` | Daily Execution Report | reporting | Daily update of runs: nodes processed, data packs, leads processed, emails, open/reply rates. | mail |
| `t5` | Prospect Automation Workflow | base-graph | Foundational flow that connects each part from structure and campaign setup. Multiple guides to select. | database |
| `t6` | Custom Build Prompt | system-skill | Generates a custom n8n, Make, or Gumloop prospect workflow from your inputs and the template. Use with the automation engineer to edit. | sparkles |

Customer integrations (HubSpot, Clay, Amplemarket, Apollo, Slack, etc.) may appear as a caption row under the grid, not as the six primary cards:

`tools.integrations_caption`: Common connectors: HubSpot, Clay, Amplemarket, Apollo, and the tools already in your automation workspace.

### 7. Pricing — rewrite `#pricing`

Keep three `PricingCard`s. Featured middle card is Team. Align SKUs with checkout.

| slot_id | copy |
|---|---|
| `pricing.eyebrow` | Plans |
| `pricing.title` | Bring your own key. Automate campaigns. |
| `pricing.desc` | Master agent, canvas, and workspace. No per-lead markup. You own the workflow. |
| `pricing.trust` | We never store an API key, and we never send an email on your behalf during setup. |

#### Card A — left, outline

| field | copy |
|---|---|
| name | DIY skill package |
| price | Download |
| note | Configure your keys |
| description | Agent directory files, sub-agents, SKILL.md files, and templates. Upload into your own coding harness and deploy. |
| features | Agent directory + sub-agents; SKILL.md files and templates; Prospect automation workflow guides; Custom build prompt; You configure keys |
| cta | Download the package |

If checkout still requires a dollar amount, use the existing DIY SKU ($19.99 one-time) **only in the checkout modal**, not in this headline. Landing card copy says Download.

#### Card B — featured, accent (Team)

| field | copy |
|---|---|
| name | Team |
| price | $99 |
| cadence | / month |
| note | Cancel anytime · BYOK |
| description | For sales teams, small business owners, and startups. Unlimited sales campaigns with the master agent, canvas, and workspace. |
| features | Agent copilot tailored to stack, product, and ICP; Skills, sub-agents, and harness; Custom JSON from your inputs; Connect and generate on your platform; Daily execution reporting; Unlimited campaigns |
| cta | Start Team |

#### Card C — sunken (Elite)

| field | copy |
|---|---|
| name | Elite |
| price | Custom |
| note | White-glove · prompt-to-setup |
| description | For companies that want a customized agent platform or deeper integration with automation tools. Includes setting up the workflow directly from the prompt. |
| features | Everything in Team; Workflow set up from the prompt; Deeper automation-tool integration; Customized agent platform; Dedicated setup |
| cta | Request Elite |

Do not use the old names “Pro unlimited engine” or “Custom architecture $999+” on the landing cards unless checkout IDs still require them internally. Map checkout: DIY → existing package SKU, Team → $99/mo, Elite → request/custom.

### 8. Close — NEW `id="get-started"`

Full-width band before footer. Paper or sunken surface. One headline, one paragraph, one accent button.

| slot_id | max | copy |
|---|---|---|
| `close.eyebrow` | 16 | Ready? |
| `close.title` | 72 | Build your sales motion with an agent copilot |
| `close.body` | 180 | Research your leads, generate new ones, send personalized messages, and get accurate reporting. |
| `close.cta` | 36 | Get your Prospect PAL today |

Question form in the source copy (“What do you say? Do you want to…”) is **not** the on-page headline. Converted to a statement. Keep the original question only in sales email, not on the landing page.

### 9. Footer — `SiteChrome.jsx` `SiteFooter`

| slot_id | copy | rule |
|---|---|---|
| `footer.legal` | © 2026 Prospect PAL · GTM automation, compiled and handed over. | KEEP |
| `footer.link.architecture` | Architecture | KEEP, point to `#tools` |
| `footer.link.security` | Security | KEEP |
| `footer.link.docs` | Docs | KEEP |

### 10. Parked — Signals

Do not place new copy in `#signals`. Hide from nav. If the section remains in the DOM for the kit, leave existing lead cards untouched.

---

## Layout mapping (kit → this deck)

| Kit file | Current section | This deck |
|---|---|---|
| `SiteChrome.jsx` TopStrip | Tech signals live | `strip.*` rewrite |
| `SiteChrome.jsx` SiteNav | Architecture, Deliverables, Signals, Pricing | How it works, Tools, Deliverables, Pricing |
| `Hero.jsx` | Eight questions / own the workflow | `hero.*` + `stat.*` rewrite; canvas KEEP |
| — | — | `#process` NEW |
| `Sections.jsx` Deliverables | Six compile files | `d1`–`d6` rewrite |
| `Sections.jsx` Integrations | Customer CRM/enrichment grid | `#tools` agent-skill grid |
| `Sections.jsx` Signals | n8n hiring leads | PARK |
| `Sections.jsx` Pricing | DIY $19.99 / Pro $99 / Custom $999+ | DIY download / Team $99 / Elite custom |
| — | — | `#get-started` NEW |
| `SiteChrome.jsx` SiteFooter | KEEP | KEEP |

Source of truth for structure: `diamitani/prospect-pal` → `src/app/(marketing)/home/page.tsx`. Apply copy here; do not invent a second landing layout.

---

## site.config.ts seed

```ts
export const landingCopy = {
  seo: {
    title: "Prospect PAL — Agent copilot for outbound sales motions",
    description:
      "Build outbound automation on n8n, Make, or Gumloop. Tailored to your stack, product, and ICP. BYOK. $99/mo.",
  },
  nav: {
    badge: "Agent copilot",
    links: [
      { href: "#process", label: "How it works" },
      { href: "#tools", label: "Tools" },
      { href: "#deliverables", label: "Deliverables" },
      { href: "#pricing", label: "Pricing" },
    ],
    cta: "Get Prospect PAL",
  },
  hero: {
    badge: "BYOK · your instance",
    h1: "Prospect PAL",
    h1Accent: "Your agent copilot for building outbound sales motions.",
    sub: "Prospect PAL enables sales teams to book more qualified meetings. We provide an agent copilot tailored to your tech stack, product, and ICP, and equip it with skills, sub-agents, and a harness to build an outbound automation workflow in n8n, Make, Gumloop, or a custom AI solution that deploys from your instance.",
    ctaPrimary: "Get Prospect PAL — $99/mo",
    ctaSecondary: "See a compile, 2 min",
  },
  closeCta: "Get your Prospect PAL today",
};
```

---

## Do / don’t

- Do keep the 9-node canvas, checkout modal, and demo modal.
- Do keep the trust line under pricing verbatim.
- Do use Team $99/month as the featured plan.
- Don’t put API-key fields on the marketing page.
- Don’t restore green brand, emoji icons, or “Pro unlimited engine” on-page.
- Don’t use the conversational close (“What do you say?”) as a heading.
- Don’t merge Make and n8n into one engineer card; they are two cards (`t1`, `t2`).
- Don’t delete Signals code; park it.

## Done means

- Every `slot_id` in this deck is present on `/` or explicitly parked.
- Nav anchors match rendered `id`s.
- Hero no longer says “Answer eight questions”.
- Pricing featured card is Team at $99/mo.
- Lint/typecheck/build still pass after string swaps.
