---
name: prospect-automation-workflow---technical-logic-1
description: Process/Note derived from Prospect Automation Workflow - Technical Logic (1).docx
source_path: Prospect Automation Workflow - Technical Logic (1).docx
---

# Prospect Automation Workflow - Technical Logic (1).docx

## Context
This skill provides knowledge, processes, and instructions derived from the document: `Prospect Automation Workflow - Technical Logic (1).docx`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

Prospect Automation Workflow: Technical Logic:
This document serves as the technical documentation and logic map for the automation.
Phase 1: Initialization & Ingestion
Goal: Wake up, define the timeframe, and pull the raw intent data.
1. Schedule Trigger
Function:
 Triggers the workflow every day at 2:00 AM.
Why:
 Runs overnight so leads are ready in the CRM when US-based reps log in.
2. Set Yesterday Range (Code Node)
Function:
 Calculates two timestamps: 00:00:00 and 23:59:59 of the previous day.
Why:
 We only want to process 
fresh
 intent signals. This ensures we don't re-process old leads or overwhelm the API.
3. Get HubSpot Companies - Intent (HTTP Request)
Function:
 Queries HubSpot via API.
Logic:
 Searches for companies where 
zoominfo___most_recent_workflow_date
 is between the timestamps calculated in Node 2.
KPI:
 This node determines our 
Total Available Market (TAM)
 for the day.
4. Split Each Company (Loop)
Function:
 Breaks the batch of companies (e.g., 50 companies) into individual items.
Why:
 Allows us to process each company one by one through the complex filters below.
Phase 2: Qualification & Filtering (The "Shield")
Goal: Aggressively disqualify unfit companies to protect reputation and save API credits.
5. Filter - remove apac (Code Node)
Function:
 A custom script that analyzes country codes, phone numbers, and location names.
Logic:
 Drops any record associated with Asia-Pacific (China, Japan, Australia, etc.).
Why:
 Strategic alignment. We are currently focusing this automation on North American and EMEA time zones.
6. Filter for Northeast (Filter)
Function:
 Checks the 
State
 property.
Logic:
 Only allows companies in NY, NJ, PA, MA, CT, etc.
Why:
 This suggests the workflow is currently running for a specific sales territory or pilot group.
7. Filter - 0 associated deals (Filter)
Function:
 Checks 
num_associated_deals
.
Logic:
 If the company has an open Deal, 
STOP
.
Why:
 Critical Rule of Engagement. We cannot prospect a company that an Account Executive is already actively selling to.
8. Filter - Lifecycle stage (Filter)
Function:
 Checks 
lifecyclestage
.
Logic:
 If stage is "Customer", 
STOP
.
Why:
 Prevents embarrassing "Buy our product" emails going to existing clients.
9. Filter - last engagement (Filter)
Function:
 Checks 
hs_last_sales_activity_timestamp
.
Logic:
 If a rep emailed/called them in the last 30 days, 
STOP
.
Why:
 Prevents prospect fatigue and stepping on toes.
10. remove competitors (Filter)
Function:
 Checks Company Name.
Logic:
 Excludes "Deel", "Remote", "Rippling".
Why:
 We do not want to alert competitors to our outreach strategy or waste money prospecting them.
Phase 3: Routing & Enrichment
Goal: Assign the right human owner and find the right people to contact.
11. Round Robin Assignment -all (Code Node)
Function:
 A complex JavaScript "Traffic Cop."
Logic:
Maps States (e.g., CA, WA) to specific reps (Stacy, Amanda).
Maps Countries (UK, Germany) to EMEA reps (Chiara).
Fallback:
 If no mapping exists, assigns to "James" to ensure no lead is lost.
KPI:
 
Lead Distribution Fairness.
12. Update a company (HubSpot Node)
Function:
 Writes the assigned Owner ID back to the Company record in HubSpot.
Why:
 Ensures the Account Executive sees the account in their name immediately.
13. HTTP Request - AmpleMarket API
Function:
 Calls an external data provider (Amplemarket).
Logic:
 "Find people at [Company Domain] with titles in 'Human Resources' or 'Finance' located in 'United States'."
Why:
 This converts a "Company Lead" into specific "People Leads."
14. NORMALIZE CONTACTS (Code Node)
Function:
 Data sanitation.
Logic:
 Takes the raw data from Amplemarket and standardizes fields (First Name, Last Name, Title, Email). Matches them back to the target company to ensure we aren't pulling data for the wrong entity.
15. RANK CONTACTS (Code Node)
Function:
 The "Brain" of the operation.
Logic:
 Assigns a score to every job title found.
CHRO / VP People
 = High Score (50pts)
HR Manager
 = Medium Score (20pts)
Intern / Assistant
 = Negative Score (Disqualify)
KPI:
 
Persona Fit.
 Ensures we prioritize decision-makers over individual contributors.
16. Filter (Rank <= 7)
Function:
 Limits the output.
Logic:
 Only keeps the top 7 highest-ranked contacts per company.
Why:
 Prevents spamming an entire organization. We take a "sniper" approach, not a "shotgun" approach.
Phase 4: Email Discovery & Verification
Goal: Ensure we have a valid way to contact the selected people.
17. Split - Has Email (If Node)
Function:
 Checks if Amplemarket provided an email address in step 13.
Path A (Yes):
 Proceed to AI.
Path B (No):
 Proceed to "Get Email".
18. get email (HTTP Request - Amplemarket)
Function:
 Uses "Credits" to reveal a hidden email address.
Why:
 Only spends budget on high-value prospects (Ranked Top 7) that we missed in the first pass.
19. Merge All Contacts
Function:
 Recombines the contacts from Path A and Path B into a single list for AI processing.
Phase 5: The AI Content Factory
Goal: Generate hyper-personalized emails that look manually written.
20. Company Research Summary (AI Agent)
Function:
 GPT-4o analyzes the company name and domain.
Output:
 A 3-bullet summary of what the company does, their industry, and their hiring signals.
Why:
 Provides context for the sales rep and feeds the next AI steps.
21. AI Pain Point Hypothesis (AI Agent)
Function:
 GPT-4o analyzes the Prospect's Title + Company Industry + Intent Signal.
Output:
 "As a VP of People at a growing Fintech, you are likely struggling with [Specific Problem]."
Why:
 This is the core of our personalization strategy.
22. AI Email 1, 2, & 3 (AI Agents)
Function:
 Three separate GPT-4o calls.
Email 1:
 Intro & Hook.
Email 2:
 Value Proposition & Case Study.
Email 3:
 Break-up / Nurture.
Logic:
 Strict constraints on length (no more than 150 words), tone (consultative), and formatting (HTML breaks).
23. AI SUBJECT LINE 1, 2, & 3 (AI Agents)
Function:
 Generates a unique subject line for each of the 3 emails based on the body content.
Why:
 Increases open rates by avoiding generic subject lines like "Meeting?".
Phase 6: Activation & Reporting
Goal: Push data to CRM and launch the sequence.
24. Create or update a contact (HubSpot Node)
Function:
 Creates the person in HubSpot.
Map:
 Saves all the AI-generated emails and research summaries into custom properties (
ai_email_1
, 
ai_pain_point_hypotheses
, etc.).
Why:
 Allows the Sales Rep to review the AI's work before they hop on a call.
25. Sequence Config (Code Node)
Function:
 Maps the Assigned Rep (from step 11) to their specific Sequence ID in HubSpot.
Logic:
 "If Rep is Emily, use Sequence ID 123. If Rep is Patrick, use Sequence ID 456."
26. Enroll in Sequence (HTTP Request)
Function:
 The trigger pull.
Logic:
 Adds the contact to the specific HubSpot Sequence using the 
sequence_user_id
.
Impact:
 The prospect will receive Email 1 automatically within minutes.
27. Add a contact to a list (HubSpot Node)
Function:
 Adds the contact to a static list (e.g., "AI_PROCESSED_LIST").
Why:
 For reporting and easy rollback if needed.
28. Aggregate Execution Data (Code Node)
Function:
 Counts how many companies were processed, how many contacts found, and how many errors occurred.
29. AI Execution Report (AI Agent)
Function:
 specific GPT-4o prompt to read the aggregate data and write a summary.
Output:
 "Execution Report: Processed 50 companies, found 120 contacts. 5 dropped due to competitor filter."
Why:
 Provides transparency to the Ops team.
