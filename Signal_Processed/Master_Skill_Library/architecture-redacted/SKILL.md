---
name: architecture-redacted
description: Process/Note derived from architecture-redacted.docx
source_path: architecture-redacted.docx
---

# architecture-redacted.docx

## Context
This skill provides knowledge, processes, and instructions derived from the document: `architecture-redacted.docx`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

Prospect Automation Engine — Architecture Reference
GTM AI & Automation — architecture reference
 
Companion to the Case Study and PRD · FULL VERSION
This document holds the diagrams: the current production architecture, the three-generation evolution, the qualification decision logic, the data flow, and the failure-handling model.
Redacted version. Vendors appear as capability descriptors. The topology, decision logic, and known gaps are unchanged.
1. Current production architecture
Three layers, matching the operating model: the CRM is the system of record, an enrichment-and-research layer does the expensive work, and an activation layer sends.
Diagram 1
The same flow in eight steps
Hot and warm leads are sent from
 
a commercial intent-data provider
 
to
 
the CRM
 
daily, on criteria set in the primary intent provider.
The
 
an automation platform
 
automation searches the CRM for that day’s hot and warm leads.
the automation platform sends company names, URLs, and contact data to the data platform (
a multi-source data-enrichment platform
 
/
 
a sales-engagement and contact-data platform
).
the automation platform and the enrichment platform enrich the company data against preset filters — ICP size, segment, persona.
the automation platform and the enrichment platform conduct web research on the prospect and the company.
the automation platform and the enrichment platform generate a personalized email message based on that research.
the automation platform and the enrichment platform write the email body back to
 
the CRM
, stored as a message token for the sequence.
the automation platform and the enrichment platform send prospect data — email, name, persona — to the sequence tool, which enrolls them.
2. Architectural evolution — three generations
The shape of the system changed twice. Both changes were responses to diagnosed problems, not preferences.
Diagram 2
Gen 1 (pilot)
Gen 2 (refactor)
Gen 3 (production)
Workflow nodes
59
22
orchestration only
LLM calls per contact
7
1
1 (in the enrichment platform)
Filter implementation
8 nodes
1 function
1 function
Email sourcing
single source
single source + ranking gate
multi-source waterfall
Web research
none
the web-research API tool
native, in enrichment
Sending
CRM sequences, corporate inbox
same
dedicated warmed mailboxes
Calling
manual tasks
manual tasks
auto-queued via dialer
Intent sources
1
1
2
Open rate
3.86%
—
43–55%
3. Qualification decision logic
Eight sequential gates. Any single failure disqualifies the company — and every rejection is counted by reason, which is what makes
 
“
are we filtering out good leads?
”
 
an answerable question.
Diagram 3
Why the APAC filter is 150 lines and not one line.
 
Location arrives as free text across four possible fields. The filter normalizes case, punctuation, and whitespace, then matches against full country names, two-letter ISO codes, and regional labels (
“
APAC
”
,
 
“
Asia Pacific
”
,
 
“
Australasia
”
,
 
“
Oceania
”
) — with an explicit allowlist that runs
 
first
, so US territories (Puerto Rico, Guam, US Virgin Islands, American Samoa, Northern Mariana Islands, DC) can never be excluded as Pacific. That override exists because the naive version silently dropped legitimate US accounts.
4. Routing: guaranteed assignment
The stated design rule in the code is
 
no skips
. Every record leaves this function with an owner.
Diagram 4
The red catch-all is the important box. It exists so that a record with an unrecognizable location is assigned to a human rather than disappearing. A dropped lead produces no error message — which is exactly why it needs a structural guarantee rather than vigilance.
5. Contact selection: sniper, not shotgun
Diagram 5
Two design decisions are visible here.
 
Ranking happens before the paid reveal
 
— credits are only ever spent on people the system has already decided are worth contacting. And
 
only the top N per company are ever contacted
, deliberately, so the system messages a few right people rather than an entire org chart.
6. Failure handling model
Diagram 6
Three principles.
 
One record’s failure never aborts the batch. Model output is parsed as untrusted input — fences stripped, non-objects coerced, parse errors returned as diagnosable data rather than thrown. And the AI layer is optional: with it disabled, records pass through and the deterministic pipeline still runs.
7. Where money is spent
Worth its own diagram, because
 
“
spend late
”
 
was a deliberate architectural constraint rather than an optimization applied afterward.
Diagram 7
Everything free happens first. The two genuinely expensive steps sit at positions 7 and 8 of 9 — after qualification has removed unfit companies and after ranking has removed unfit people. In the pilot, the reveal sat earlier in the chain and the system was paying to enrich contacts it was about to discard; moving it was a direct cost reduction.
8. Known gaps in the current architecture
Marked on the diagram, so to speak — the honest annotations.
Gap
Where
Consequence
Audit logging in dry-run mode
Orchestration layer, data-table write
No run-level audit trail is being persisted
Company size + industry blank
Enrichment layer, ICP scoring inputs
Scoring runs on missing data; bad-fit companies pass (4 of 15 on a sampled day)
Second intent source not flowing
Signal layer
Roughly half the intended signal volume is missing
No run-level idempotency key
Orchestration layer
A re-run could duplicate enrollments
EMEA routing built but inactive
Routing
Capacity exists, not switched on
A/B testing framework absent
Content layer
Copy cannot be tested against the open reply-rate problem
Compliance not independently specified
Activation layer
Regional outbound rules assumed via the sending platform, not verified
GTM AI & Automation case file · REDACTED VERSION — cleared for public portfolio use
 
No credential value appears anywhere in this document.
