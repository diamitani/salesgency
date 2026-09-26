---
artifact_type: frontend-ui
project_id: salesgency
version: v5.0.0
status: approved
owner: design
reviewers: [design, frontend]
well_architected_review: pass
upstream: [design-system@v2.0.0, ia@v5.0.0]
confidence: 1.0
---

# 14. SalesGency Frontend UI Specification

## 1. Visual Standards & Layout System
- **Container Max Width:** `1200px` (desktop), `100%` with `24px` gutter padding (mobile).
- **Responsive Breakpoints:**
  - Mobile: `< 640px` (single-column cards, full-width buttons).
  - Tablet: `640px – 1024px` (2-column grids).
  - Desktop: `> 1024px` (3–4 column grids, interactive GSAP sticky stacks).
- **Surface Elevation Layers:**
  - Level 0: Pure canvas background (`var(--sg-mist)` or `var(--bg-obsidian)`).
  - Level 1: Standard card surface (`var(--sg-white)` or `rgba(15, 23, 42, 0.6)`).
  - Level 2: Raised interactive cards (`box-shadow: 0 24px 48px rgba(10, 20, 40, 0.08)`).
  - Level 3: Overlays, modals, and sticky nav (`backdrop-filter: blur(16px)`).

---

## 2. Animation & Motion Design Guidelines
- **Framework:** GSAP 3.12 + ScrollTrigger CDN for performant hardware-accelerated transforms.
- **Micro-Interactions:**
  - Button hover: `transform: translateY(-2px)`, subtle inset glow.
  - Card hover: `transform: translateY(-8px)`, increased shadow depth.
  - Sticky stack (`services.html`): `scale(0.95 + 0.05 * progress)`, sticky top offset `120px`.
- **Motion Budget:** All animations complete within `300ms` with easing `cubic-bezier(0.16, 1, 0.3, 1)`.

---

## 3. Form & Checkout Interaction States
Every interactive trigger (`[data-stripe-product]`) implements:
- **Idle State:** Clear title, price display, and CTA button.
- **Loading State:** Button disables, spinner activates, text changes to "Preparing Checkout...".
- **Success State:** Redirect to Stripe or `/checkout-success.html`.
- **Error State:** In-line non-blocking alert banner explaining network error with instant retry.
