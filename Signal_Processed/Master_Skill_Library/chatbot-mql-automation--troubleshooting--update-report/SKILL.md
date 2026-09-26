---
name: chatbot-mql-automation--troubleshooting--update-report
description: Process/Note derived from Chatbot MQL Automation — Troubleshooting & Update Report.pdf
source_path: Atlas Portfolio/Chatbot MQL Automation — Troubleshooting & Update Report.pdf
---

# Chatbot MQL Automation — Troubleshooting & Update Report.pdf

## Context
This skill provides knowledge, processes, and instructions derived from the document: `Chatbot MQL Automation — Troubleshooting & Update Report.pdf`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

Chatbot MQL Automation | Troubleshooting & Update Report | 6.25.26
Project: Atlas HXM HubSpot Customer Agent / Maia MQL Automation
Workflow: Chatbot MQL Automation - Final
System: HubSpot + n8n + Azure OpenAI
Status: Built and tested through full closed-chat enrichment flow
Written by Patrick Diamitani | GTM AI & Automation Manager
1. Executive Summary
The chatbot MQL automation was updated to process closed HubSpot Customer Agent
conversations, retrieve the associated contact and conversation thread data, pull the full
message transcript, analyze the transcript with AI, classify the contact as MQL or NonMQL, and update the HubSpot contact record with structured chatbot intelligence.
The workflow now supports transcript capture, buying-need interpretation, country
extraction, hiring timeline extraction, workforce setup analysis, EOR intent, MQL
classification, AI-generated email body output, session ID storage, and conditional
lifecycle-stage updates for MQLs.
A major architecture improvement was the addition of a dedicated preparation layer
between the AI node and HubSpot update node. This prevents raw AI output from being
sent directly to HubSpot and allows invalid or blank values to be cleaned before the
contact update runs.

2. Final Workflow Architecture
The final intended flow is:
•
•
•
•
•
•
•

HubSpot Closed Conversation Webhook
Find Contact
Get Conversation Thread
Get Thread Messages
Normalize Conversation + Transcript
Analyze + Draft Email
Prepare HubSpot Contact Fields

•

Create or Update Contact

Atlas HXM – Confidential

Node Purpose Summary
Node

Purpose

HubSpot Closed Conversation
Webhook

Receives the closed chatbot
conversation payload from HubSpot,
including contact ID and thread ID.

Find Contact

Searches HubSpot CRM for the
contact using hs_object_id.

Get Conversation Thread

Retrieves HubSpot conversation
thread metadata. Used for validation
and thread/session context.

Get Thread Messages

Pulls the conversation messages
from the HubSpot Conversations API.

Normalize Conversation + Transcript

Sorts messages, builds a clean
transcript, extracts email, phone,
company, domain, and session
fields.

Analyze + Draft Email

Uses Azure OpenAI to analyze the
transcript and return structured MQL
fields.

Structured Output Parser

Attempts to enforce consistent JSON
from the AI node.

Prepare HubSpot Contact Fields

Cleans, flattens, truncates, and
normalizes AI output before HubSpot
update.

Create or Update Contact

Updates the HubSpot contact using
mapped standard and custom
properties.

3. Key Changes Made
A. Fixed Contact Lookup
The workflow now looks up contacts by HubSpot record ID using:
hs_object_id

Atlas HXM – Confidential

This fixed the earlier issue where broad contact searches returned unrelated records.

The contact search now uses the CRM search endpoint:
POST https://api.hubapi.com/crm/v3/objects/contacts/search
with a filter on:
propertyName: hs_object_id
operator: EQ
value: webhook body hs_object_id
B. Fixed Thread and Message Retrieval
The workflow was updated to use the HubSpot Conversations API to retrieve the thread
and messages using the thread ID from the webhook.
Thread endpoint:
https://api.hubapi.com/conversations/v3/conversations/threads/{hs_thread_id}
Messages endpoint:
https://api.hubapi.com/conversations/v3/conversations/threads/{hs_thread_id}/message
s
This resolved the earlier issue where only conversation metadata was returned and no
transcript was available. The transcript must come from the /messages endpoint, not the
base thread endpoint.
C. Added Transcript Normalization
A new Normalize Conversation + Transcript code node was added.
This node:
•
•
•
•
•
•

Sorts messages oldest-to-newest.
Labels messages as Visitor or Atlas HXM assistant.
Removes HTML and extra whitespace.
Builds a clean transcript.
Extracts visitor messages separately.
Extracts email, phone, company name, company domain, website, and contact
details when available.

Atlas HXM – Confidential

•

Creates clean session fields such as chatbot_session_id and
chatbot_last_session_date.
This prevents the AI from analyzing raw HubSpot message payloads with unnecessary
metadata.
D. Added Structured AI Analysis
The AI prompt was expanded to return structured JSON for all required chatbot fields.
The AI now analyzes:
•
•
•
•
•
•
•
•
•
•
•
•

MQL status
Confidence
Buying need
Pain points
Hiring timeline
Countries of interest
EOR intent
Workforce setup
Visitor questions asked
Recommended next step
Disqualification reason
Follow-up email body

•
•
•
•

MQL lifecycle output
Number of employees hiring
Current EOR usage
Current EOR challenge information

E. Updated MQL Classification Rules
The MQL logic was tightened.
A contact should only be classified as MQL when there is a work email or clear company
identity plus B2B intent around:
•
•
•
•

Global hiring
EOR
Payroll
Compliance

•
•

Benefits
Pricing

Atlas HXM – Confidential

•
•

Demo request
Country coverage

• Entity avoidance or setup
• Hiring timeline
• Employee headcount
• International workforce support
The AI was also instructed not to classify contacts as MQL based only on Maia’s chatbot
responses. Only visitor messages count as buying intent.
F. Added AI Email Body Output
The workflow now outputs the AI-generated email body to:
ai_mql_response_1
The email output rules were refined so the AI returns only the middle body content.
The email body should not include:
• Greeting
• Contact name
• Intro
• Subject line
• Signature
• Sign-off
This allows the text to be inserted into an existing formatted email template.
G. Added Conditional Lifecycle Stage Logic
The workflow now creates a lifecycle-stage output only when:
chatbot_mql_status = MQL
When MQL, the output is:
lifecyclestage = marketingqualifiedlead
For Non-MQL contacts, lifecycle stage remains blank and should not be sent to HubSpot.
This prevents Non-MQL records from overwriting existing lifecycle values.
H. Added Field Preparation Layer
A Prepare HubSpot Contact Fields node was added between the AI node and the HubSpot
update node.
This node:

Atlas HXM – Confidential

•
•

Parses AI output.
Handles JSON parsing failures.

• Merges normalized contact/session data with AI output.
• Truncates long values.
• Joins country arrays into HubSpot-safe strings.
• Deletes blank values before HubSpot update.
• Prevents empty values from overwriting existing CRM data.
• Adds MQL-only fields when applicable.
This was a major stability improvement.

4. HubSpot Properties Added or Updated
The workflow now supports updating the following HubSpot properties.
Core Chatbot Fields
Property

Purpose

chatbot_transcript

Full cleaned conversation transcript.

chatbot_wses

Workforce setup / workforce scenario.

chatbot_timeline

Hiring, EOR, payroll, implementation, or
buying timeline.

chatbot_countries

Countries mentioned or implied by the
visitor.

chatbot_eor_intent

Whether the visitor showed EOR intent.

chatbot_mql_status

MQL or Non-MQL classification.

chatbot_session_id

HubSpot conversation thread ID.

chatbot_buyer_need

Interpreted buying need from the transcript.

chatbot_pain_points

Pain points, blockers, or risks from the
transcript.

ai_chatbot_processed

Indicates the AI analysis was processed.

chatbot_questions_asked

Visitor questions only, not Maia’s questions.

Atlas HXM – Confidential

chatbot_last_session_date

Last chatbot session/message date.

chatbot_recommended_next_step

Recommended next sales/system action.

chatbot_disqualification_reason

Reason for Non-MQL status, if applicable.

MQL and Sales Fields
Property

Purpose

ai_mql_response_1

AI-generated follow
email body.

lifecyclestage

Set to
marketingqualifiedl
only for MQLs.

hs_lead_status

Set to NEW for MQL

customer_agent_mql_date

Date the chatbot
classified contact a
MQL.

mql___number_of_employees_hiring

Number of employe
the visitor wants to
hire/pay/support.

are_you_currently_using_an_employer_of_record__eor__service_

Whether visitor
currently uses an E
service.

mql___what_challenges_you_re_facing_with_your_current_eor_service___multi_

Current EOR provid
challenges, if
applicable.

Standard Contact Fields
Property

Purpose

email

Contact email.

firstname

Contact first name.

lastname

Contact last name.

Atlas HXM – Confidential

phone

Phone number from CRM or transcript.

company

Company name from CRM, transcript, or
domain inference.

domain

Company domain.

website

Website URL.

jobtitle

Job title from CRM or transcript.

5. Issues Encountered and Fixes
Issue 1: Wrong Contact Returned
Problem: HubSpot returned an unrelated contact because the contact search was too
broad.
Fix: Search was updated to filter by:
hs_object_id
using the contact ID from the webhook.

Issue 2: Thread Endpoint Returned Metadata Only
Problem: The base thread endpoint returned metadata like ID, status, created date, and
associated contact ID, but not the transcript.
Fix: Added the messages endpoint:
/conversations/v3/conversations/threads/{threadId}/messages
This endpoint provides the actual chat messages needed to build the transcript.

Issue 3: AI Output Did Not Fit Required Format
Problem: The AI sometimes returned malformed JSON or schema-like labels instead of
valid values.
Fixes:
•

Added a Structured Output Parser.

Atlas HXM – Confidential

•
•

Tightened the AI prompt to require valid JSON only.
Added explicit output requirements.

•
•

Added parser compatibility rules.
Added a Prepare HubSpot Contact Fields node to parse and clean output before
HubSpot update.
Recommended fallback:
•
•

Set the AI node’s error behavior to continue where possible.
Let the Prepare node create safe default values if the AI output fails.

Issue 4: HubSpot Property Values Were Not Valid
Problem: HubSpot rejected updates because some values did not match property types or
allowed dropdown values.
Most likely causes included:
•
•
•
•
Fixes:
•
•
•
•
•

Date fields receiving full ISO datetime instead of date-only values.
Dropdowns receiving lowercase yes/no/unknown when HubSpot expected exact
option values.
Multi-select fields receiving free text instead of allowed option values.
Empty or invalid optional fields being sent.
Delete blank values before HubSpot update.
Do not send optional fields if unavailable.
Do not send free text into multi-select properties.
Only populate current EOR challenge fields when the visitor actually uses a current
EOR and mentions a challenge.
Use date-only formatting when the HubSpot property is a date picker.

Issue 5: Questions Asked Field Included Maia’s Questions
Problem: The AI initially placed Maia’s qualifying questions into chatbot_questions_asked.
Fix: Prompt was updated to specify that chatbot_questions_asked must include only
questions asked by the visitor. If the visitor did not ask a question, the field should be
empty.

Atlas HXM – Confidential

Issue 6: Chatbot Timeline Was Misinterpreted
Problem: chatbot_timeline was initially treated as a conversation timeline/log.
Fix: The field was redefined to mean the buyer’s hiring, payroll, EOR, implementation, or
purchase timeline.
Example:
65 days
not:
Visitor asked about EOR, then Maia asked about country, then visitor gave timeline.

Issue 7: Follow-Up Email Included Intro/Signature
Problem: The generated email body initially included greetings or intro-style copy.
Fix: Prompt was updated so follow_up_email_body and ai_mql_response_1 return only
middle-body copy with no greeting, no intro, no subject, no signature, and no sign-off.

6. Final Field Logic
MQL Logic
If:
chatbot_mql_status = MQL
then set:
lifecyclestage = marketingqualifiedlead
hs_lead_status = NEW
customer_agent_mql_date = today
If:
chatbot_mql_status = Non-MQL
then do not send lifecyclestage.
AI Email Logic
If MQL and there is a clear buyer need:
ai_mql_response_1 = follow_up_email_body

Atlas HXM – Confidential

If Non-MQL or buyer need is unclear:
ai_mql_response_1 = blank
EOR Challenge Logic
If visitor is currently using an EOR and mentions challenges:
mql___what_challenges_you_re_facing_with_your_current_eor_service___multi_ = valid
HubSpot option value
If visitor is starting fresh or not using an EOR:
mql___what_challenges_you_re_facing_with_your_current_eor_service___multi_ = blank
Optional Field Logic
If a field is empty, missing, null, or invalid:
Do not send it to HubSpot.
This prevents update failures and avoids overwriting existing CRM data.

7. Current Known Risk Areas
A. Dropdown and Multi-Select Option Values
HubSpot dropdown, radio, and multi-checkbox properties require exact internal option
values.
Fields to verify:
chatbot_eor_intent
chatbot_mql_status
ai_chatbot_processed
chatbot_lead_temperature
are_you_currently_using_an_employer_of_record__eor__service_
mql___what_challenges_you_re_facing_with_your_current_eor_service___multi_
B. Date Property Formatting
If a HubSpot property is a date picker, send:
YYYY-MM-DD
not full ISO datetime.

Atlas HXM – Confidential

Example:
2026-06-02
C. Native HubSpot Node Behavior With Blank Values
The native HubSpot Create or Update Contact node may still attempt to send mapped
blank fields. For production, optional fields should either be omitted before mapping or
split into separate update nodes.
Recommended production structure:
Prepare HubSpot Contact Fields
→ HubSpot Base Update
→ IF isMQL
→ HubSpot MQL Update

8. Recommended Production Architecture
Base Update Node
Always update safe fields:
email
firstname
lastname
phone
company
domain
website
jobtitle
chatbot_transcript
chatbot_session_id
chatbot_last_session_date
ai_chatbot_processed
chatbot_mql_status
chatbot_buyer_need
chatbot_recommended_next_step
maia_chat_summary
MQL-Only Update Node
Only run when:

Atlas HXM – Confidential

isMQL = true
Update:
lifecyclestage
hs_lead_status
customer_agent_mql_date
mql___number_of_employees_hiring
are_you_currently_using_an_employer_of_record__eor__service_
ai_mql_response_1
Conditional / Optional Fields
Only update if valid:
mql___what_challenges_you_re_facing_with_your_current_eor_service___multi_
chatbot_pain_points
chatbot_questions_asked
chatbot_disqualification_reason

9. Troubleshooting Checklist
If HubSpot update fails with “Property values were not valid”
Check:
1. Is a dropdown receiving a value that does not match HubSpot internal option
values?
2. Is a date field receiving full ISO datetime instead of YYYY-MM-DD?
3. Is a multi-select property receiving free text?
4. Are duplicate mappings sending different values to the same property?
5. Is a blank mapped field overwriting a required property?
6. Is lifecyclestage being sent blank for Non-MQL records?
If AI node fails with “Model output does not fit required format”
Check:
1. Is the Structured Output Parser schema using real example values, not labels like
MQL or Non-MQL?
2. Is the AI returning markdown or code fences?
3. Is the AI returning an array instead of a single object?
4. Is a field returning the wrong type, such as string instead of array?

Atlas HXM – Confidential

5. Is the model temperature too high for structured output?
Recommended fix:
Set temperature to 0 and allow the Prepare node to handle fallback parsing.
If transcript is wrong or backwards
Check:
1. Are messages sorted oldest-to-newest?
2. Is the transcript using the /messages endpoint?
3. Are sender labels correctly identifying Visitor vs Atlas HXM assistant?
4. Is the thread ID coming from the correct webhook execution item?
If MQL classification is wrong
Check:
1. Did the visitor provide actual buying intent?
2. Is the AI counting Maia’s messages as buyer intent?
3. Did the visitor say “no” to global hiring or EOR needs?
4. Is confidence below 0.65?
5. Is the visitor a job seeker, support request, vendor, partner, or spam?
If company, phone, or domain are missing
Check:
1. Did Find Contact request those properties?
2. Did the visitor provide them in the transcript?
3. Did Normalize extract them?
4. Are the HubSpot node mappings using the prepared top-level fields, not raw AI
fields?
10. Final Outcome
The workflow now provides a complete closed-chat MQL automation for Atlas HXM.
It can:
•
•

Receive closed HubSpot Customer Agent chat data.
Identify the associated contact.

•
•
•

Pull the conversation thread and messages.
Build a clean transcript.
Analyze the transcript with AI.

Atlas HXM – Confidential

•
•
•
•
•
•

Determine MQL vs Non-MQL.
Interpret buyer need, timeline, country, EOR intent, workforce setup, and employee
count.
Generate a reusable AI email body.
Update the HubSpot contact with structured fields.
Set lifecycle stage to marketingqualifiedlead when qualified.
Avoid blocking updates when optional fields are empty.

This creates a scalable foundation for routing qualified chatbot conversations into sales
follow-up and round-robin assignment workflows.

Atlas HXM – Confidential
