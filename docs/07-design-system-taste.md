# DDC Stage: Design System & Taste Specification - v1

**Run ID:** `ddc_20260910_prompt2app_init`  
**Stage:** `design_system`  
**Framework:** Delali Development Cycle (DDC) Planning Runtime v1.0.0  
**Timestamp:** 2026-09-10T22:36:00-05:00  

---

## 1. Design Philosophy & Anti-Slop Principles
Taking inspiration from the refined dark aesthetic of `prompt2app.prebuiltui.com` and elevating it to enterprise-grade finish:
- **No generic flat colors:** Deep layered obsidian tones (`#070a11`, `#0d131f`, `#131b2e`).
- **Gradients & Accents:** Subtle radial glow backgrounds, emerald (`#10b981`), electric cyan (`#06b6d4`), and indigo (`#6366f1`).
- **Glassmorphism:** Frosted borders with 1px semi-transparent outlines (`rgba(255, 255, 255, 0.08)`), subtle backdrop-filter blurs (`backdrop-filter: blur(16px)`).
- **Typography:** Modern clean sans-serif stack (`Outfit` / `Inter`, `SF Pro Display`, system fallback) with calibrated line-heights and tight tracking on headings.
- **Micro-animations:** Hover card scale effects, glowing input outlines on focus, animated terminal typing cursor, and smooth tab transitions.

---

## 2. Core Tokens

```css
:root {
  --bg-dark: #070a11;
  --bg-card: rgba(15, 23, 42, 0.65);
  --bg-card-hover: rgba(30, 41, 59, 0.8);
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-accent: rgba(16, 185, 129, 0.3);
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --accent-emerald: #10b981;
  --accent-cyan: #06b6d4;
  --accent-indigo: #6366f1;
  --accent-gradient: linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #6366f1 100%);
  --glow-emerald: 0 0 30px rgba(16, 185, 129, 0.2);
}
```

---

## 3. Component Architecture
1. **Header / Navbar:** Logo mark with pill navigation (`Home`, `Automation Builder`, `Skill Builder`, `Agent Builder`, `Templates`, `Pricing`, `Launch Sandbox`).
2. **Hero Section:**
   - Pill badge: `✨ AI-Powered Sales Infrastructure Engine`
   - Bold display headline: `Build Production Sales Infrastructure with AI`
   - Subtitle: `No complex manual scripts. Just describe your sales stack and launch autonomous n8n workflows, custom skills, and agent souls instantly.`
   - Interactive Mode Switcher tabs: `Automation Builder` | `Skill Builder` | `Agent Builder` | `Browse Templates`
   - Multi-line Smart Prompt Input Bar with live "Generate in Sandbox" button.
3. **Interactive Agent Sandbox / Terminal:**
   - Dual-pane layout: Interactive CLI Terminal on left (with simulated live execution stream) + Generated Code Viewer on right (JSON / Markdown with syntax highlighting and instant Download / Copy buttons).
4. **3 Core Feature Pillars:**
   - ⚡ *Autonomous System Connectors* (HubSpot, Apollo, Clay, Smartlead, Stripe)
   - 🧠 *Workflow & Skill Synthesizer* (Deterministic n8n node compiler & PAS prompt architect)
   - 🛡️ *Sandbox CLI & Isolated Execution* (Live tool calling, AST linting, zero-downtime deployment)
5. **4-Step Interactive Process:**
   - *Step 1: Describe Your Stack & Goals*
   - *Step 2: Agent Handshake & Sandbox Setup*
   - *Step 3: Synthesis of Workflows & Skills*
   - *Step 4: Deploy to Stack or Download JSON*
6. **Template Marketplace & Download Grid:**
   - Filterable catalog (All, Inbound, Outbound, RevOps, Skills, Agents, Bundles) pulling live from the backend with instant Stripe checkout triggers.
7. **Pricing & Plans:**
   - Starter ($49/mo), Pro Growth ($149/mo), Enterprise Scale, plus individual template downloads.
8. **Testimonial Grid, FAQ & Footer.**
