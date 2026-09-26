# POP — Project Output Planner

**The master project-starter skill built on the ROSTR framework.**

POP turns any raw ask into a complete, formatted, end-to-end project output package. Say "POP" or "start a project" — get 11 production-ready artifacts instantly.

[![Landing Page](https://img.shields.io/badge/Landing%20Page-Live-blue)](https://diamitani.github.io/pop-landing/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🚀 Quick Start

### Install

```bash
# Download the skill
git clone https://github.com/diamitani/pop-skill.git ~/.hermes/skills/pop

# Or via Hermes CLI (if available)
hermes skills install pop
```

### Use

Just say to your AI agent:

- "**POP**"
- "Start a project"
- "Plan this project"
- "Turn this into a project"
- Drop an Asana task into the POP intake project

POP will interview you (5 questions), research gaps, and produce the full artifact package.

---

## 📦 What You Get

Every POP run produces **11 artifacts:**

| # | Artifact | Description |
|---|----------|-------------|
| **A** | Intent Brief | PAL-compiled project intent |
| **B** | JTBD Document | Jobs-to-be-Done framework with NPAO tags |
| **C** | KPI & Tracking | North-star KPIs, metrics, reporting framework |
| **D** | Architecture Diagram | Mermaid.js system diagram (PNG + source) |
| **I** | Project Master Doc | 14 sections: goals, stack, deployment, testing |
| **J** | Build Guide | Hierarchical task tree (phase → task → subtask) |
| **K** | Execution Handoff | Agent bootstrap prompt + guardrails |
| **E** | PRD | Product Requirements Document (optional) |
| **F** | Project Overview | Executive deck/ELT document (optional) |
| **G** | Asana Export | Tasks/subtasks as CSV or copy-paste (optional) |
| **H** | Sub-Skill | Purpose-built repeatable capability (as needed) |

---

## 🏗️ Architecture

POP orchestrates the full **ROSTR framework**:

```
User Ask
   ↓
0. INPUT      → Detect source (prompt / Asana / form)
   ↓
1. PAL        → Compile intent (5-stage pipeline)
   ↓
2. INTERVIEW  → Ask 5 envisioning questions
   ↓
3. RAG DAL    → Research gaps (multi-pass retrieval)
   ↓
4. NPAO       → Classify & sequence (5D phases + 4D priority)
   ↓
5. GENERATE   → Produce 11 artifacts
   ↓
6. HANDOFF    → Deliver + persist via ContextEngine
```

### ROSTR Components

- **PAL** (Prompt Abstraction Layer) — Intent compiler
- **JTBD** — Jobs-to-be-Done methodology
- **RAG DAL** — Retrieval-Augmented Generation with Dynamic Acquisition
- **NPAO** — Navigate, Prioritize, Allocate, Orchestrate
- **ContextEngine** — Persistent state management

---

## 🎯 When to Use POP

**Always:**
- Starting a new project (any size)
- Scoping a vague ask from a boss/client
- Turning a raw idea into an execution plan
- Asana task intake automation
- Multi-phase project planning

**Especially when:**
- You need complete documentation fast
- You're handing off to another agent/human
- You need KPI tracking from day 1
- You want NPAO-ordered task lists
- You're building on the ROSTR framework

---

## 📖 Input Methods

POP accepts input **three ways:**

### 1. Direct Prompt (Default)
```
User: "POP — build a lead generation engine"
POP: [Runs full flow → produces 11 artifacts]
```

### 2. Asana Task
Submit a task to the POP intake project in Asana. POP reads:
- Task name → Project name
- Description → Raw ask
- Custom fields → Owner, Manager, Priority
- Attachments → Input files

### 3. Asana Intake Form
Boss fills a structured Asana form. Form fields map to interview answers.

---

## 🗂️ Templates Included

All templates are in `/templates/`:

- `PROJECT_MASTER_DOC_TEMPLATE.md` — 14-section project doc
- `BUILD_GUIDE_TEMPLATE.md` — Hierarchical task tree
- `EXECUTION_HANDOFF_TEMPLATE.md` — Agent handoff script
- `KPI_TRACKING_TEMPLATE.md` — Metrics & reporting framework
- `JTBD_TEMPLATE.md` — Jobs-to-be-Done document
- `PRD_TEMPLATE.md` — Product Requirements Document
- `ASANA_EXPORT_TEMPLATE.md` — Task export (CSV + copy-paste)

---

## 🎨 Customization

### Personas

Edit `/scopes/personas.md` to define default settings per user type:

- **patrick** — Founder/technical lead (execution-first, compressed shorthand)
- **executive** — Non-technical stakeholder (business-focused, plain language)
- **team-lead** — Engineering manager (balanced technical + management)
- **revops** — Revenue operations (process-focused, metrics-driven)

### NPAO Weights

Adjust priority scoring in persona config:

```yaml
NPAO Priority Weights:
  Phase Urgency: 0.35
  Dependency Impact: 0.30
  Business Impact: 0.25
  Resource Efficiency: 0.10
```

### Artifact Selection

Choose which artifacts to generate by default (per persona).

---

## 🔧 Configuration

POP looks for these config files:

- `/scopes/personas.md` — User persona defaults
- `/templates/*.md` — Output artifact templates
- `/references/*.md` — Additional reference docs (optional)

---

## 🧪 Example Workflow

```bash
# User says:
"POP — build a prospect automation engine"

# POP runs:
0. INPUT:      Detects direct prompt, infers persona "patrick"
1. PAL:        Extracts intent → "automation / prospect generation / n8n workflow"
2. INTERVIEW:  Asks 5 questions (outcome, working model, tools, knowledge, gaps)
3. RAG DAL:    Researches n8n, Clay, LinkedIn APIs (Tier 1-3 sources)
4. NPAO:       Classifies 47 tasks across 5 phases (PreD → D1 → D2 → D3 → D4)
5. GENERATE:   Produces 11 artifacts in /projects/prospect-automation/
6. HANDOFF:    Delivers files + diagram + execution prompt

# User gets:
/projects/prospect-automation/
├── INTENT_BRIEF.md
├── JTBD.md
├── KPI_TRACKING.md
├── ARCHITECTURE.png
├── ARCHITECTURE.mmd
├── PROJECT_MASTER_DOC.md
├── BUILD_GUIDE.md
├── EXECUTION_HANDOFF.md
├── PRD.md (optional)
├── PROJECT_OVERVIEW.md (optional)
└── ASANA_EXPORT.md (optional)
```

---

## 📚 Documentation

- **SKILL.md** — Complete skill specification
- **Landing Page** — [https://diamitani.github.io/pop-landing/](https://diamitani.github.io/pop-landing/)
- **ROSTR Framework** — See CLAUDE.md in parent repo
- **Templates** — All in `/templates/` with inline docs

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 🙏 Credits

**Built on the ROSTR Framework:**
- PAL (Prompt Abstraction Layer)
- JTBD (Jobs-to-be-Done)
- RAG DAL (Dynamic Acquisition Layer)
- NPAO (Navigate, Prioritize, Allocate, Orchestrate)
- ContextEngine (Persistent state management)

**Author:** Patrick Diamitani  
**Organization:** Diamitani Industries  
**Framework:** ROSTR  
**Version:** 2.0

---

## 🔗 Links

- **Landing Page:** [https://diamitani.github.io/pop-landing/](https://diamitani.github.io/pop-landing/)
- **GitHub:** [https://github.com/diamitani/pop-skill](https://github.com/diamitani/pop-skill)
- **Issues:** [https://github.com/diamitani/pop-skill/issues](https://github.com/diamitani/pop-skill/issues)

---

**Say "POP" — get a complete project plan instantly.** 🚀
