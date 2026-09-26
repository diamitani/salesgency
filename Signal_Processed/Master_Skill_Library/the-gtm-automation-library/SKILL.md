---
name: the-gtm-automation-library
description: Process/Note derived from The GTM Automation Library .docx
source_path: The GTM Automation Library .docx
---

# The GTM Automation Library .docx

## Context
This skill provides knowledge, processes, and instructions derived from the document: `The GTM Automation Library .docx`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

The GTM Automation Library (50 Ready-to-Build Scenarios)
.
1) Inbound Lead → Verify → Enrich → CRM → Welcome Email
Goal:
 Capture every lead, validate the email, enrich firmographics, create/update contact, send a personal welcome.
Trigger:
 Webhooks by Make > Custom Webhook (connect your site form)
Modules:
Tools > Set variables (normalize name, company)
Hunter.io (Verify email) or Apollo (Verify email)
Clay (Enrich company + contact) or Apollo “Enrich Contact”
HubSpot > Create or Update a Contact (or Pipedrive)
Resend > Send Email (or Gmail > Send Email)
Slack > Send Channel Message (alert)
Steps:
Create a Custom Webhook and paste URL into your form action.
Verify email. If status is invalid, branch to Slack alert and stop.
Enrich with Clay/Apollo. Pull: domain, HQ location, headcount, industry, funding.
Create or update contact in CRM using email as key.
Send welcome email via Resend.
Post a Slack alert with lead snapshot and link to the CRM record.
Mappings:
HubSpot contact: Email = {{email}}, First Name, Last Name, Company, Phone, Website, Industry, Employees, Funding, Lead Source = Website.
Slack text: “New inbound: {{name}} from {{company}} | FitScore: {{score}} | Link: {{hubspot_contact_url}}”
Email Template:
 Subject: Welcome, quick next step
 Body:
 “Thanks for reaching out. I’ll send a quick GTM outline based on your goals. Do you prefer email or a 15-minute call?”
2) Calendly Booking → Contact + Deal → Pre-Call Brief → SMS Reminder
Goal:
 Auto-create contact and opportunity, assemble research, remind the prospect.
Trigger:
 Calendly > Invitee Created
Modules:
HubSpot > Create/Update Contact
HubSpot > Create Deal (pipeline = Sales, stage = Discovery)
Google Custom Search or Clay > Company snapshot
Twilio > Send SMS (or Resend/Gmail)
Slack > Notify AE
Steps:
Map invitee email to contact.
Create deal with value placeholder and owner.
Pull company facts for pre-call doc (industry, size, recent news).
Send SMS reminder 2 hours before meeting.
Notify AE in Slack with a one-pager summary.
SMS Template:
 “Looking forward to our call at {{time}}. Here is the Zoom link: {{link}}. Reply if you need to reschedule.”
3) New Trial/Checkout → Onboarding Sequence + Task Plan
Trigger:
 Stripe > New Customer or Checkout Session Completed
Modules:
HubSpot > Create/Update Contact
HubSpot > Create Tasks (Day 0, Day 3, Day 7 follow-ups)
Resend > Send Email series (D0, D1, D3, D7)
Slack > Alert “New customer”
Steps:
Create contact with product and plan fields.
Create tasks for CSM or Founder.
Send Day 0 onboarding email with a checklist.
Queue D1, D3, D7 emails using Make’s Sleep or Scheduler.
Email D0 Template:
 Subject: Your onboarding checklist
 Body: “Here is access, your next 3 steps, and a 10-minute setup video.”
4) Outbound CSV → Verify → Enrich → Sequence Loader
Trigger:
 Google Sheets > Watch Rows (CSV import sheet)
Modules:
Hunter or Apollo > Verify Email
Clay > Enrich domain, title, LinkedIn, tech stack
HubSpot > Upsert Contact
Apollo > Add to Sequence (or Instantly API, Mailshake API)
Steps:
On new row, verify email.
Enrich with Clay.
Upsert CRM contact.
Add to outreach sequence and tag with campaign name.
5) Intent Visit → High-Intent Alert → Assign → Sequence
Trigger:
 GA4 or Plausible > New Event (visited pricing or integrations)
Modules:
HubSpot > Create/Update Contact (if known)
Slack > Alert with “hot intent”
Apollo > Add to intent follow-up sequence
Steps:
When user hits high-intent pages, look up email if present or create anonymous record.
If known, notify owner and add to a fast-follow sequence.
If unknown, push to retargeting list.
6) Deal Stuck SLA → Escalation
Trigger:
 HubSpot > Watch Deals (every hour)
Modules:
Tools > Filter where “Days in Stage > X”
Slack > Send to #sales-escalations with owner mention
HubSpot > Create Task “Move this deal or explain”
Steps:
Calculate days in stage.
Alert with context.
Auto-create task with due date and checklist.
7) Proposal Sent → Reminders → Stakeholder Nudge
Trigger:
 PandaDoc/DocuSign > Document Sent
Modules:
Sleep for 48h
Check status; if not viewed/signed
Resend > Gentle reminder email
Slack > Mention AE
Optional: Find VP via Clay and CC on nudge
Email Template:
 Subject: Quick nudge on the proposal
 Body: “Sharing in case it got buried. Happy to walk through the plan live.”
8) New Customer → 30/90-Day QBR Prep
Trigger:
 Stripe > New Subscription or HubSpot Lifecycle change to Customer
Modules:
Google Sheets > Append “Customer Cohort”
Sleep to 30 days
Slack + Email to schedule QBR
HubSpot > Create QBR task with checklist
Steps:
Add to cohort sheet.
At day 30, request QBR with short form link.
Create a prep task listing KPIs to review.
9) Abandoned Checkout → Recovery
Trigger:
 Shopify > Checkout Updated where completed = false
Modules:
Resend > Email 1 at T+1h, Email 2 at T+24h
Twilio > Optional SMS if opted in
HubSpot > Create “Abandoned” deal with small value
Email Template:
 Subject: Need help finishing checkout?
 Body: “Here is your saved cart and a quick way to book help if you need it.”
10) Win/Loss Capture → Learning Log
Trigger:
 HubSpot > Deal Closed Won/Lost
Modules:
Notion > Append to “Win/Loss” database
Google Sheets > Update metrics
Slack > Post summary and tag PMM/Founder
Steps:
On close, write a line with reason, competitor, ACV, cycle time.
Weekly, roll up metrics in a chart.
11) Lead Recycling → Re-Nurture
Trigger:
 HubSpot > Contact property “Last Activity > 45 days” and Lifecycle = MQL/SQL
Modules:
Apollo > Add to “Re-nurture” sequence
HubSpot > Add Note “Recycled”
Slack > Quiet alert to owner
Email Template:
 Subject: Should I close your file?
 Body: “If now is not the time, I will circle back next quarter. Want me to keep this open?”
12) ICP Fit Score → Routing
Trigger:
 Inbound lead or CSV import
Modules:
Tools > Set Variables and Math for Score: firm size, industry, tech stack, geo
HubSpot > Set Lead Score + Owner based on territory
Slack > Notify if score ≥ threshold
Steps:
Compute score from enrichment.
Route by territory or segment.
Prioritize high score for faster SLA.
13) UTM Cleanser → Source of Truth
Trigger:
 Webhook or Sheets row from form
Modules:
Tools > Parse UTM string
HubSpot > Update Original Source + UTM fields
Google Sheets > Append to Attribution log
Steps:
Split and standardize utm_source/medium/campaign.
Update CRM.
Keep a parallel log for audits.
14) Daily GTM Rollup → Email Digest
Trigger:
 Scheduler > Every weekday 8:00
Modules:
HubSpot > Count new contacts, MQLs, SQLs, new deals, closed won
Apollo > Outbound sends, replies, meetings
Stripe > New revenue
Google Sheets > Append daily row
Tools > Create HTML block
Gmail/Resend > Send “Daily GTM” to leadership
Email Section Headings:
 New leads, Meetings, Pipeline added, Revenue, Top sequences, Issues.
15) Support → Expansion Signal
Trigger:
 Intercom/Zendesk > Ticket Closed with “High satisfaction” or “Feature request”
Modules:
HubSpot > Create “Expansion Opportunity” task
Apollo > Add contact to “Expansion” outreach
Slack > Notify AE with context
Steps:
Detect positive signal.
Create a follow-up path for expansion or cross-sell.
Track in pipeline.
16) Lead Magnet Delivery → Enrich → Nurture
Goal:
 Auto-deliver the asset, enrich the lead, start a short nurture.
 
Trigger:
 Webhooks by Make > Custom Webhook (lead magnet form)
 
Modules:
 Hunter or Apollo (verify), Clay (enrich), HubSpot/Pipedrive (upsert contact), Google Drive or Notion (asset link), Resend/Gmail (send)
 
Steps:
Create Custom Webhook and connect your form.
Verify email. If invalid, send Slack alert and stop.
Enrich with Clay for company, size, role, LinkedIn.
Upsert contact in CRM with “Lead Source = Lead Magnet”.
Email asset link and start a 3-touch nurture using Make Scheduler.
17) Webinar Registration → CRM + Reminders → Post-Event Follow-up
Goal:
 Max attendance and convert attendees.
 
Trigger:
 Zoom/WebinarJam/Google Form new registrant
 
Modules:
 HubSpot/Pipedrive, Resend/Gmail, Slack, Google Calendar
 
Steps:
Upsert contact with “Lifecycle = MQL, Campaign = Webinar X”.
Send confirmation email and calendar invite.
T-24h and T-1h reminders.
After event, branch by attendance: attendees get CTA email and “SQL check” task; no-shows get replay link and rebook CTA.
18) LinkedIn Connection Accepted → Profile → CRM → Intro Sequence
Goal:
 Turn accepted connections into pipeline.
 
Trigger:
 Bardeen or Phantombuster webhook when connection accepted
 
Modules:
 LinkedIn scraper, HubSpot/Pipedrive, Apollo sequence add, Slack
 
Steps:
Capture profile URL, headline, company.
Upsert CRM contact with “Source = LinkedIn”.
Add to short “warm intro” sequence.
Slack owner with profile notes and talk-track.
19) Review Intelligence (G2/Capterra) → Expansion Task
Goal:
 Convert happy users into expansion or referrals.
 
Trigger:
 G2/Capterra review webhook or RSS watch
 
Modules:
 HubSpot/Pipedrive, Slack, Resend
 
Steps:
When positive review detected (rating ≥ 4), find contact by email/domain.
Create “Expansion Opportunity” task for AE.
Send thank-you email with referral offer.
Slack AE with review content and account link.
20) Inbound Email Classifier → Route and Respond
Goal:
 Classify replies and route correctly.
 
Trigger:
 Resend/Gmail > New inbound message
 
Modules:
 OpenAI text classify (Assistants or Functions), HubSpot/Pipedrive, Slack
 
Steps:
Parse subject and body.
Classify intent: demo request, support, pricing, unsubscribe.
Create or update CRM record.
Auto-reply template or create task and Slack the owner.
21) Payment Failure → Dunning → Churn Alert
Goal:
 Save at-risk revenue.
 
Trigger:
 Stripe > Invoice payment failed
 
Modules:
 Resend/SMS, HubSpot/Pipedrive, Slack
 
Steps:
Tag contact “At Risk”.
Send dunning email with quick pay link.
Sleep 24h, if unpaid, send SMS and create task.
Slack finance and owner if 3 failures.
22) Fast SLA For Inbound → 10-Minute Escalation
Goal:
 No inbound lead sits unattended.
 
Trigger:
 New lead created in CRM
 
Modules:
 Sleep 10 minutes, HubSpot/Pipedrive check activity, Slack, Task
 
Steps:
On new lead, start 10-minute timer.
If no activity logged, Slack escalate and create “Call now” task.
If owner unavailable, auto-reassign to backup.
23) Sales Collateral Request → Fulfillment → Follow-up
Goal:
 Respond instantly with the right deck or one-pager.
 
Trigger:
 Typeform/Website “Request Deck” form
 
Modules:
 Notion/Drive (asset lookup), Resend/Gmail, HubSpot/Pipedrive
 
Steps:
Match requested asset to a file link.
Email link instantly.
Upsert CRM and create follow-up task T+48h.
Track asset requests in Sheets for PMM.
24) Lost Deal → 60-Day Reactivation
Goal:
 Warm lost deals with value.
 
Trigger:
 Deal marked Lost
 
Modules:
 Sleep 60 days, Resend/Gmail, HubSpot/Pipedrive
 
Steps:
On Lost, capture reason and competitor.
After 60 days, send tailored reactivation email referencing reason.
Create task for AE if reply or open ≥ 2.
25) SDR New Hire → Provisioning Checklist
Goal:
 One-click SDR onboarding.
 
Trigger:
 Google Form “New SDR” submitted
 
Modules:
 HubSpot user invite, Apollo seat invite, Resend account invite, Notion task list, Slack welcome
 
Steps:
Create SDR user accounts via APIs or notify ops.
Add to “SDR Onboarding” Notion template with day-by-day tasks.
Email credentials guide.
Slack team: “SDR live, day 1.”
26) NPS → CS Play → Upsell Path
Goal:
 Turn promoters into upsell and references.
 
Trigger:
 Typeform/NPS tool submission
 
Modules:
 HubSpot/Pipedrive, Resend/Gmail, Slack
 
Steps:
Score <7: create CSM task “Rescue” and send apology resource.
Score 9–10: create AE task “Upsell/Reference” and send referral ask.
Post summary to Slack weekly.
27) ICP Account Watcher: News and Job Changes
Goal:
 Find buying triggers.
 
Trigger:
 Daily Scheduler
 
Modules:
 Clay for company news and role changes, HubSpot/Pipedrive, Slack
 
Steps:
Pull top accounts list from CRM.
Enrich for news headlines, hiring, leadership changes.
If trigger found, create task and Slack owner with suggested opener.
Add contact to micro-sequence.
28) Partner Referral Intake → Tracking → Commission
Goal:
 Formalize referrals.
 
Trigger:
 Typeform/Partner form
 
Modules:
 HubSpot/Pipedrive (Deal), Google Sheets (referral log), Resend, Slack
 
Steps:
Create referral deal with partner attribution.
Append to referral ledger with commission percent.
Send partner confirmation email.
On closed-won, email commission calculation.
29) RFP/RFQ Monitor → Opportunity Task
Goal:
 Catch public RFPs matching keywords.
 
Trigger:
 RSS/Atom watch for target sites or Google Alerts via RSS
 
Modules:
 Parser, HubSpot/Pipedrive, Slack
 
Steps:
Parse new items, filter by keywords.
Create opportunity with due date and link.
Slack owner with summary and next steps.
30) Territory Assignment by State/Zip → Owner Routing
Goal:
 Enforce clean assignment rules.
 
Trigger:
 New or enriched contact
 
Modules:
 Tools > Router, HubSpot/Pipedrive
 
Steps:
Normalize state and zip.
Route to owner by territory table.
Set “Territory” field and notify owner.
31) Email Health Monitor → Warmup and Alerts
Goal:
 Avoid deliverability issues.
 
Trigger:
 Daily Scheduler
 
Modules:
 Resend stats webhook or Gmail API stats, Google Sheets, Slack
 
Steps:
Pull sends, opens, bounces, blocks per domain.
Flag bounce rate > 3 percent or block spikes.
Slack alert with corrective steps and pause sequences if needed.
32) Content Publish → Newsletter + Social Syndication
Goal:
 Use new content to feed demand gen.
 
Trigger:
 WordPress/Notion/Ghost “New post”
 
Modules:
 Resend/Gmail, LinkedIn/Twitter API, HubSpot Campaigns
 
Steps:
Send weekly digest email if post count ≥ 1.
Auto-create 3 social snippets and queue.
Tag CRM contacts who clicked for AE follow-up.
33) Meeting No-Show → Auto-Reschedule Path
Goal:
 Salvage missed meetings.
 
Trigger:
 Google Calendar event ends without attendance (Zoom “no show” tag)
 
Modules:
 Resend/SMS, Calendly link, HubSpot/Pipedrive
 
Steps:
Detect no-show.
Send 2-click reschedule email and SMS.
Create follow-up task.
If rescheduled within 48h, move deal back to “Discovery”.
34) SDR → AE Handoff Checklist
Goal:
 Clean internal handoff.
 
Trigger:
 Deal moved to “Qualified”
 
Modules:
 HubSpot tasks, Notion checklist, Slack
 
Steps:
Create AE checklist tasks: recap, pain, budget, timeline, stakeholders.
Post Slack summary with call recording link.
Assign next meeting creation to AE.
35) Chat → CRM → Instant Callback
Goal:
 Convert chat visitors.
 
Trigger:
 Intercom/Drift new conversation with email present
 
Modules:
 HubSpot/Pipedrive, Twilio Call, Slack
 
Steps:
Upsert contact and tag “Chat”.
If message contains pricing intent, trigger instant callback to AE via Twilio.
Slack transcript and link.
36) Voice of Customer Miner → Weekly Themes
Goal:
 Turn support into messaging and roadmap.
 
Trigger:
 Daily Scheduler
 
Modules:
 Zendesk/Intercom export, OpenAI summarizer, Notion, Slack
 
Steps:
Pull last 24h tickets and product feedback.
Summarize themes and top quotes.
Append to Notion “VOC” database.
Slack weekly digest to Sales and Product.
37) Proposal SLA → Internal Approvals → Send
Goal:
 Eliminate proposal lag.
 
Trigger:
 Deal moved to “Proposal Draft”
 
Modules:
 PandaDoc template, HubSpot tasks, Slack
 
Steps:
Create internal approval tasks with due today.
When approved, generate PandaDoc from template and send.
Slack AE and leadership upon send.
38) Product Usage Threshold → PQL → Sales Outreach
Goal:
 Convert PQLs to pipeline.
 
Trigger:
 Segment/Amplitude event crosses threshold
 
Modules:
 HubSpot/Pipedrive, Resend/Gmail, Slack
 
Steps:
On usage signal, create PQL and task for AE.
Send congratulatory email with relevant case study.
Slack AE with play suggestion.
39) Multi-Touch Attribution Collector → Dashboard Row
Goal:
 Unify source data.
 
Trigger:
 New lead with UTM or ad click data
 
Modules:
 Tools > parser, HubSpot fields, Google Sheets log
 
Steps:
Normalize utm_source, medium, campaign, adgroup.
Update CRM original source and recent source.
Append to Sheets for a Looker Studio dashboard.
40) Legal DPA/Privacy Request → SLA and Tracking
Goal:
 Close the loop on compliance requests.
 
Trigger:
 Typeform/Email labeled “DPA” or “Privacy”
 
Modules:
 Notion legal queue, HubSpot ticket, Resend/Gmail, Slack
 
Steps:
Create legal ticket with SLA timer.
Email acknowledgment with expected completion date.
Slack legal channel with owner assigned.
Close ticket and send completion notice.
41) Case Study Intake → Draft → Approval
Goal:
 Systematize proof creation.
 
Trigger:
 AE submits win form
 
Modules:
 Notion template, OpenAI draft, Google Docs, Slack
 
Steps:
Generate case study draft from win data.
Create Google Doc for PMM review.
Slack PMM with checklist and due date.
On approval, publish URL back to CRM.
42) Competitor Mention → Battlecard Notify
Goal:
 Equip reps with the right talk-track.
 
Trigger:
 Deal note or call transcript includes competitor name
 
Modules:
 OpenAI keyword match, Notion battlecards, Slack
 
Steps:
Detect competitor.
Pull the right battlecard link.
Slack owner with talk-track and objection handling snippet.
43) Trial Expiring → Save or Convert
Goal:
 Convert trials before they die.
 
Trigger:
 Trial start date + 12 days
 
Modules:
 Resend/Gmail, HubSpot tasks, Stripe checkout link
 
Steps:
Email value recap and plan recommendation.
Create AE task “Call before expiry”.
If no response by day 14, send discount or extended trial option.
44) Wholesale Prospecting for Ecommerce → Buyer Finder → Sequence
Goal:
 Break into retail accounts.
 
Trigger:
 Google Sheet of target retailers
 
Modules:
 Clay domain to buyer contact, Apollo verify, CRM upsert, Apollo sequence add
 
Steps:
Enrich retailers for buyer titles.
Verify emails.
Upsert to CRM and add to 5-touch wholesale sequence.
Slack owner when a buyer opens 2+ times.
45) Real Estate Lead Routing → Agent Round-Robin
Goal:
 Speed to lead across agents.
 
Trigger:
 Website form or Zillow lead
 
Modules:
 HubSpot, Tools > Iterator, Slack/SMS
 
Steps:
Upsert contact and property of interest.
Round-robin assign by availability.
SMS the assigned agent and email the prospect with intro.
Reassign if no action in 15 minutes.
46) Law Firm Intake → Conflict Check → Retainer Packet
Goal:
 Automate intake for boutique firms.
 
Trigger:
 Typeform “New case” submission
 
Modules:
 Google Sheets conflict list, HubSpot, PandaDoc, Resend
 
Steps:
Check conflict database for matches.
If clear, create contact and matter record.
Generate retainer in PandaDoc and send.
Notify attorney in Slack.
47) VC Portfolio Import → Ops Score → Assist Queue
Goal:
 Offer GTM help to portfolio companies.
 
Trigger:
 CSV of portfolio companies
 
Modules:
 Clay enrich, scoring function, Notion queue, Resend
 
Steps:
Enrich each company for size, funding, stack.
Score readiness for GTM ops help.
Append to Notion “Assist” board with owner.
Email warm intro offering a free GTM audit.
48) Agency New Client → Asset Checklist → Kickoff Packet
Goal:
 Tight onboarding for agencies.
 
Trigger:
 Deal Closed Won at agency
 
Modules:
 Notion template, Google Drive folder create, Resend
 
Steps:
Create client folder with subfolders.
Generate onboarding checklist.
Email kickoff packet and booking link.
Create internal tasks for creative, media, analytics.
49) Distributor or Channel Deal Reg → Approval Workflow
Goal:
 Manage partner deal registrations.
 
Trigger:
 Partner form submission
 
Modules:
 HubSpot/Pipedrive, Slack, PandaDoc terms
 
Steps:
Create partner deal with “Deal Reg” stage.
Slack channel “Approve or Deny” with buttons via webhook.
If approved, send program terms and incentives.
If denied, send reason and alternative next steps.
50) CFO Rollup → Weekly Revenue and Pipeline Digest
Goal:
 Align execs without meetings.
 
Trigger:
 Weekly Scheduler
 
Modules:
 HubSpot/Pipedrive, Stripe, Google Sheets, Gmail/Resend
 
Steps:
Pull new pipeline, win rate, cycle length, net revenue.
Build HTML email with trends.
Send to exec list and archive to Sheets.
