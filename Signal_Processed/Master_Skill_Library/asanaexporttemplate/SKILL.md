---
name: asanaexporttemplate
description: Template derived from ASANA_EXPORT_TEMPLATE.md
source_path: pop-skill-main/templates/ASANA_EXPORT_TEMPLATE.md
---

# ASANA_EXPORT_TEMPLATE.md

## Context
This skill provides knowledge, processes, and instructions derived from the document: `ASANA_EXPORT_TEMPLATE.md`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

# Asana Export: [PROJECT_NAME]

**Project:** [Project Name]  
**Generated:** [Date]  
**Export Format:** Copy-Paste + CSV

---

## Export Formats

This document provides Asana task exports in two formats:

1. **Copy-Paste Format** — Manual entry into Asana
2. **CSV Format** — Bulk import via Asana CSV importer

---

## Format 1: Copy-Paste (Markdown)

### Section: [Phase Name - e.g., "PreD (Research)"]

#### Task: [Task Name] [NPAO Tag]

**Description:**  
[Task description]

**Assignee:** [Name]  
**Due Date:** [Date]  
**Priority:** [High/Medium/Low]

**Subtasks:**
- [ ] Subtask 1
- [ ] Subtask 2
- [ ] Subtask 3

**Custom Fields:**
- NPAO: [N/A/P/O]
- Phase: [PreD/D1/D2/D3/D4]

---

#### Task: [Next Task Name] [NPAO Tag]

[Follow same structure...]

---

### Section: [Next Phase Name]

[Continue for all phases...]

---

## Format 2: CSV Import

### Instructions

1. Copy the CSV content below
2. Save as `[project-name]-tasks.csv`
3. In Asana: Project → ... → Import → CSV
4. Map columns:
   - Name → Task Name
   - Notes → Description
   - Assignee → Assignee
   - Due Date → Due Date
   - Section → Section
   - Priority → Priority
   - Parent → Parent Task (for subtasks)

### CSV Content
