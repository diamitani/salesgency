---
name: objection-handling-battlecards-skill
description: "Production LLM Skill for dynamic B2B objection handling, email reply drafting, and discovery call battlecard synthesis across 24 common sales objections (Timing, Budget, Feature Fit, Internal Build, Competitor)."
---

# B2B Objection Handling & Battlecard Skill

Use this skill when processing prospect replies, email counter-arguments, and live discovery call pushback.

---

## 🎯 Classification Matrix (24 Objection Categories)

1. **Timing / Next Quarter**: "Reach back out in Q3 when we finalize our planning."
2. **Budget / Financial Freeze**: "We have a strict hiring / software freeze right now."
3. **Internal Build / "We can build this"**: "Our in-house engineers are already looking at building this on n8n/Python."
4. **Current Vendor / Competitor Entrenched**: "We already use Zapier / Make / ZoomInfo / Clay."
5. **No Bandwidth / Implementation Burden**: "Our RevOps team is swamped and doesn't have time to implement a new platform."
6. **Authority / "Send me info"**: "Send over a one-pager and I'll share it with my team."

---

## 💡 The 3-Step Non-Defensive De-Escalation Framework

Every objection response must strictly execute:
1. **Validate & Agree**: Never argue or sound defensive. Acknowledge their perspective as 100% rational.
2. **Reframing Question / Contrast**: Introduce an unexpected dimension or hidden friction they may not have modeled.
3. **Zero-Pressure Offer**: Provide a self-serve artifact or case breakdown without requesting a meeting.

---

## 📋 Response Blueprints

### Case 1: "We are building this in-house with engineering"
```markdown
Understood, {{first_name}} — with strong engineers on the team, building custom scripts is often the first instinct.

Where we typically see teams hit a wall 60 days in isn't the initial webhook, but ongoing edge-case maintenance: rate limit backoffs, token refresh failures, and CRM deduplication changes whenever HubSpot updates an API endpoint.

We put together an architectural comparison detailing the 4 breaking points in-house scripts hit at 5k+ monthly events. Would it help to send that over for your technical lead to review?
```

### Case 2: "No budget until next quarter"
```markdown
Totally fair, {{first_name}} — fiscal timing is everything, and forcing an off-cycle purchase never makes sense.

Curious: are you planning to manually triage inbound leads in the interim, or did you find a temporary workaround? 

If it's helpful, we have an open-source JSON node you can import into your self-hosted instance in 5 minutes for free. Happy to share the GitHub link if you want to keep the lights on until Q3.
```

### Case 3: "We already use Zapier / Make"
```markdown
Makes complete sense, {{first_name}} — Zapier is great for simple 2-step triggers.

The primary reason technical GTM teams migrate to our sovereign n8n engines is high-volume task cost (avoiding $800+/mo Zapier tier spikes) and sovereign execution without 3rd-party data leaks.

If you ever want to see the side-by-side execution latency benchmark, let me know.
```
