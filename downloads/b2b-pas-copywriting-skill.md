---
name: b2b-pas-copywriting-skill
description: "Production LLM Skill for crafting high-converting B2B cold outbound email sequences using the Problem-Agitate-Solve (PAS) framework. Adheres to strict anti-slop rules, under-75-word limits, and hyper-relevant industry triggers."
---

# B2B PAS Copywriting Skill (Problem • Agitate • Solve)

Use this skill to transform raw prospect firmographics and trigger events into punchy, high-converting cold email copy.

---

## 🎯 Core Tenets & Anti-Slop Rules

1. **Strict Length Ceiling**: Under 75 words total per email. 3 to 4 sentences maximum.
2. **Subject Line Standard**: 2 to 4 words, lowercase, no clickbait or fake `Re:`. Example: `quick question re: hiring`, `n8n workflows for acme`, `lead triage delay`.
3. **Never Sound Like an AI**:
   - ❌ FORBIDDEN: "I hope this email finds you well", "In today's fast-paced digital world", "Cutting-edge", "Game-changer", "Streamline", "Revolutionize", "Leverage", "Synergy", "Supercharge".
   - ❌ FORBIDDEN: Multiple questions, exclamation marks, or aggressive closes ("When do you have 15 minutes this Tuesday?").
4. **The 3-Sentence Formula**:
   - **Sentence 1 (Problem + Trigger)**: Point out a specific friction point based on an observable trigger (e.g., job hiring post, recent tech stack change, slow response time).
   - **Sentence 2 (Agitate / Impact)**: Quantify or illustrate the hidden cost of that friction (e.g., leads cooling off in HubSpot, reps wasting 12 hrs/wk manually copying transcripts).
   - **Sentence 3 (Solve / Low-Friction CTA)**: Propose a low-friction resource, teardown, or question. Example: "Open to seeing the 2-minute workflow breakdown we built for [Similar Company]?"

---

## 📋 Few-Shot Prompt Template

```yaml
role: "Senior B2B GTM Copywriter & Technical SDR"
context:
  prospect_name: "{{prospect_first_name}}"
  company: "{{company_name}}"
  title: "{{prospect_title}}"
  trigger_event: "{{trigger_event}}"
  target_pain_point: "{{identified_pain}}"
  social_proof: "{{relevant_case_study}}"

output_format:
  subject_line: "2-4 words, lowercase, neutral"
  email_body: "3 sentences, < 75 words"
  follow_up_variant: "2 sentences bump after 4 days"
```

### Example 1: Inbound Lead Triage Friction
**Subject**: `lead response time at {{company_name}}`
**Body**:
> Hi {{prospect_first_name}}, noticed you're scaling SDR headcount on LinkedIn.
> 
> Usually when inbound volume jumps past 200/mo, leads wait 45+ minutes in HubSpot before reps get notified, causing 60% of demos to ghost.
> 
> We built a webhook blueprint that enriches and routes demo forms in under 30 seconds. Worth sending the video breakdown?

### Example 2: Outbound CRM Hygiene & Dedupe
**Subject**: `crm dedupe for {{company_name}}`
**Body**:
> Hi {{prospect_first_name}}, saw {{company_name}} just added 4 new account executives this month.
> 
> As reps launch outbound in Smartlead, unshielded lists often hit existing customer accounts or create duplicate records in Salesforce.
> 
> We engineered an n8n gate that checks domain ownership before sequence enrollment. Open to a 2-min Loom on how it runs?

---

## 🛠️ Execution Checklist
- [ ] Check word count is between 45 and 70 words.
- [ ] Check reading level is Grade 5–7 (simple, clear words).
- [ ] Ensure 100% of claims cite a real trigger.
- [ ] CTA is interest-based, not calendar-forcing.
