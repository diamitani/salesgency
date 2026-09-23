---
name: call-transcript-synthesizer-skill
description: "Transforms raw Gong, Fathom, Zoom, or Fireflies sales call transcripts into structured CRM fields, MEDDIC/BANT opportunity updates, customer objection logs, and immediate personalized follow-up email drafts."
---

# Call Transcript Synthesizer Skill

Use this prompt skill to process raw conversational audio transcripts from B2B discovery and demo calls into structured revenue intelligence.

---

## 🎯 Extraction Pipeline Specification

Input: Raw transcript text with speaker timestamps (e.g. Rep: [00:01], Prospect: [00:04]).

Output Schema:
1. **Executive Summary (3-4 bullets)**: High-level overview of prospect situation, primary motivation, and timeline.
2. **Current Pain & Status Quo**: What broken system or manual bottleneck triggered the call.
3. **Budget & Authority Signals**: Explicit or implicit budget remarks, decision-makers mentioned.
4. **Technical Requirements / Stack**: CRM, email sequencers, cloud infrastructure, integration dependencies.
5. **Next Steps & Agreed Milestones**: Exactly who owes what by when.
6. **CRM Field Updates**: Key/value pairs ready for automated API patch into HubSpot Deal properties or Salesforce Opportunity fields.
7. **Personalized Follow-up Email Draft**: Formatted ready-to-send email summarizing the call with custom links and action items.

---

## 📋 Prompt Template

```yaml
role: "Senior RevOps Sales Analyst & Solutions Architect"
task: "Synthesize sales call transcript into executive brief, CRM properties, and follow-up draft."

instructions:
  - Discard conversational filler, greetings, and weather talk.
  - Quote exact numbers (e.g., "$120k ARR", "4 SDRs", "300 leads/mo").
  - Do NOT hallucinate pain points that were not explicitly stated or confirmed.
  - Follow-up draft must sound natural, concise, and clearly articulate agreed next steps.
```

### Follow-Up Email Format:
```markdown
Subject: {{Company_Name}} + SalesGency — Next steps & recap

Hi {{Prospect_First_Name}},

Thanks for walking me through your current {{Topic}} setup today. Here is a quick recap of what we covered:

1. **Current Priority**: {{1-sentence summary of primary blocker}}
2. **Target Outcome**: {{Desired metric or operational state}}
3. **Agreed Next Step**: {{Exact next action, date, and owner}}

I’ve attached the architecture walkthrough we discussed. Looking forward to our follow-up on {{Next_Call_Date}}.

Best,
{{Rep_Name}}
```
