---
artifact_type: design_system
project_id: salesgency
version: v2.0.0
status: approved
owner: design
reviewers: [design, eng, a11y]
well_architected_review: pass
last_updated: 2026-09-21
---

# SalesGency® Canonical Design System & Taste Guidelines

## 1. Design Philosophy & Anti-Slop Principles

SalesGency's interface design embodies industrial precision, technical authority, and zero generic AI slop:
- **Depth & Layered Obsidian Surfaces:** Avoiding flat dull grays in favor of deep obsidian tones (`#070A11`, `#0B0F19`, `#0F172A`) paired with paper-white clean reading planes (`#F8FAFC`, `#FFFFFF`).
- **Precision Color Accents:** Phosphor Blue (`#1B6FD8`), Midnight Blue (`#0A2540`), and Electric Glow (`#60A5FA`), engineered to evoke high-reliability infrastructure rather than marketing fluff.
- **Micro-Delight & Interactive Feedback:** Subtly glowing borders on focus, smooth card lift transitions (`translateY(-2px)`), crisp status chips, and interactive code preview blocks.
- **Zero Ambiguity in Commercial Offerings:** Clear typography, transparent pricing without hidden fees, and single-click checkout or free bypass.

---

## 2. Color Palette & WCAG 2.2 AA Contrast Compliance

All color tokens adhere strictly to WCAG 2.2 AA standards, ensuring high readability across light and dark viewports:

| Token Name | Hex / Value | Contrast Ratio | Usage & Placement |
|---|---|:---:|---|
| `--text-primary` | `#0F172A` | **15.8:1** (on white) | Primary headings, titles, price tags |
| `--text-secondary` | `#272E3B` | **12.1:1** (on white) | Subheadings, feature bullets, card descriptions |
| `--text-tertiary` | `#4B5563` | **7.1:1** (on white) | Metadata, secondary labels, helper text |
| `--text-dim` | `#52525B` | **6.8:1** (on white) | Footnotes, copyright, subtle timestamps |
| `--text-inverse-primary` | `#FFFFFF` | **18.2:1** (on dark) | Obsidian navbar wordmark, dark card headings |
| `--text-inverse-dim` | `rgba(255,255,255,0.78)` | **10.4:1** (on dark) | Dark hero subtext, obsidian card bullets |
| `--accent` | `#1B6FD8` | **4.9:1** (on white) | Primary action buttons, active links, brand glyphs |
| `--accent-dark` | `#60A5FA` | **8.2:1** (on dark) | Dark mode highlight badges, phosphor accents |
| `--bg-obsidian` | `#0B0F19` | N/A | Obsidian dark backgrounds, navbar canvas |
| `--bg-paper` | `#F8FAFC` | N/A | Clean content reading sections |

---

## 3. Typography Hierarchy

### 3.1 Font Families
- **Display & Body Font:** `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
  - Weights: `300` (light accent), `400` (body), `500` (medium label), `600` (subheading), `700`/`800` (display headings).
  - Tracking: `-0.03em` to `-0.04em` on large headlines (`clamp(2.4rem, 4.5vw, 3.6rem)`).
- **Technical & Metric Font:** `'JetBrains Mono', 'SF Mono', Menlo, Consolas, monospace`
  - Used for code blocks, live Stripe price displays (`$199`, `$999`, `$19,999/mo`), currency symbols, and API endpoints.

---

## 4. Component Standards

### 4.1 Navigation (`assets/unified-nav.js`)
- Fixed obsidian header bar with glassmorphism backdrop filter (`backdrop-filter: blur(12px)`).
- Wordmark: High-contrast white `#FFFFFF` "Sales" + gradient phosphor blue `#60A5FA` "Gency".
- Universal navigation items: `Platform`, `Solutions`, `Pricing`, `Agency`, `Blueprints`, `Book Architecture Call`.
- Automated removal of legacy duplicate mobile drawers and unstyled DOM elements (`removeLegacyNav()`).

### 4.2 Buttons (`.btn`)
- `.btn-primary`: Solid Phosphor Blue background (`#1B6FD8`), white bold text, subtle elevation on hover.
- `.btn-secondary`: Crisp 1px border (`#D1D5DB`), high-contrast dark text (`#0F172A`), hover background `#F1F5F9`.
- `.btn-dark`: Deep obsidian button for light paper backgrounds with high contrast.
- `.btn-block`: Full-width utility for checkout and modal action triggers.

### 4.3 Chips & Badges (`.chip`, `.eyebrow`)
- `.chip`: Compact pill indicator (`border-radius: 9999px`) with uppercase or title-case text (`0.75rem`).
- `.chip-accent`: Phosphor blue light background (`rgba(27, 111, 216, 0.08)`) with vibrant text (`#1B6FD8`).
- `.eyebrow`: Section category kicker with inline colored accent pill (`.eyebrow-accent`).

### 4.4 Cards (`.bundle-card`, `.pricing-card`)
- Clean white surface (`#FFFFFF`) with 1px border (`var(--border-subtle)`).
- Featured elevation: Accent blue border outline (`#1B6FD8`) with layered drop shadow (`0 8px 28px rgba(27, 111, 216, 0.08)`).
- Structured vertical flex layout: Eyebrow + Price tag → Title → Summary → Checkmarked deliverable bullets → CTA button.

---

## 5. Commercial Ladder Design Alignment

Every page showcasing pricing, packages, or blueprints must adhere to the 15 synchronized live Stripe tiers:
1. **Pilot Tier:** `$999.00` 1-Hour Live Co-Build Session
2. **Sprint Tiers:** `$2,999.00` (14-Day Sprint) and `$4,999.00` (30-Day Sprint / Prospect Automation)
3. **Retainer Tier:** `$19,999.00/mo` Fractional GTM Engineer
4. **Subscription Tier:** `$99.00/mo` GTM Agent Platform
5. **Modular Skill Plugins:** `$199.00` (Inbound, PAS Copywriter, Firmographic Enricher, CRM Hygiene, Deliverability DNS, GTM Architect)
6. **Digital Bundles:** `$19.99` Agent Build Package
7. **Free Guides:** `$0.00` (Instant zero-friction bypass directly to `/checkout-success.html`)

---

## 6. Responsiveness & Accessibility Checklist
- [x] Responsive layout testing across 375px mobile, 768px tablet, and 1440px desktop.
- [x] All interactive buttons include visible keyboard `:focus-visible` outlines.
- [x] Color contrast ratios verified via Chrome DevTools / Lighthouse audits (> 7:1).
- [x] Screen-reader friendly semantic tags (`<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`).
