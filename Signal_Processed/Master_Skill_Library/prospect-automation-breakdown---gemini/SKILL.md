---
name: prospect-automation-breakdown---gemini
description: Process/Note derived from Prospect Automation Breakdown - Gemini.docx
source_path: Prospect Automation Breakdown - Gemini.docx
---

# Prospect Automation Breakdown - Gemini.docx

## Context
This skill provides knowledge, processes, and instructions derived from the document: `Prospect Automation Breakdown - Gemini.docx`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

This is a comprehensive breakdown of the 
"Project Atlas" Autonomous Prospecting Engine
.
As the Automation Manager, I have designed this workflow to function not just as a tool, but as a 
digital SDR (Sales Development Representative)
. It automates the entire top-of-funnel sales process—from intent signal detection to personalized outreach—allowing our Account Executives (AEs) to focus solely on closing deals rather than researching and writing emails.
1. Executive Summary: The "Project Atlas" Engine
Objective:
 To operationalize high-intent data immediately. When a prospect shows interest (via ZoomInfo or 6sense/Factors signals) or fits our Ideal Customer Profile (ICP), this engine acts instantly to identify the right decision-maker, research them, and launch a hyper-personalized sequence.
Strategic Value:
Speed to Lead:
 Reduces response time from days (manual) to minutes/hours (automated).
Scale:
 Capable of processing thousands of companies per week without adding headcount.
Consistency:
 Every email is on-brand, compliance-checked, and utilizes our best messaging frameworks.
2. Detailed Architecture & Workflow Breakdown
The workflow operates in 
six distinct phases
, executed daily at 2:00 AM to ensure leads are ready when the sales team logs in.
Phase 1: Signal Detection & Filtering (The "Brains")
Input:
 The workflow queries HubSpot for companies showing "High Intent" (based on 
zoominfo___most_recent_workflow_date
).
Geo-Fencing:
 Filters for specific US regions (Northeast, West, etc.) using state logic.
Exclusion Logic:
Competitor Shield:
 Automatically removes companies associated with competitors like Deel, Remote, and Rippling to avoid wasted ad spend or awkward outreach.
Customer Shield:
 Excludes current customers or active deals to prevent friction.
APAC Filter:
 A specific code block removes APAC-based companies to align with our current territory focus.
Phase 2: Prospect Identification (The "Hunter")
Data Enrichment:
 Connects to 
Amplemarket
 to find specific people within the identified companies.
Targeting:
 It looks specifically for HR, Finance, and Operations leaders (titles like CHRO, VP of People, CFO).
Contact Ranking:
 A sophisticated algorithm (
RANK CONTACTS
 node) scores prospects. It prioritizes a "Chief People Officer" over an "HR Manager," ensuring we only message the highest-value target.
Phase 3: Territory Routing (The "Traffic Cop")
Round Robin Logic:
 A custom Javascript node assigns the prospect to the correct Human AE based on complex territory rules (State, Country, Zip).
Pod Support:
 Handles routing for specific "Pods" (e.g., Emily, West Pod, Northeast Pod) and includes fallback logic (defaults to "James" if a territory is undefined) to ensure no lead is lost.
Phase 4: The AI Agent Layer (The "Copywriter")
Research Agent:
 An Azure OpenAI (GPT-4o) agent analyzes the company website and LinkedIn profile to create a "Research Summary."
Pain Point Engine:
 Based on the prospect's title and the company's industry, the AI hypothesizes a specific problem they are facing (e.g., "Compliance risks in expansion" for a Legal VP).
Content Generation:
Email 1 (The Hook):
 Highly personalized intro referencing the intent signal.
Email 2 (The Value):
 Follow-up focusing on the specific pain point.
Email 3 (The Breakup):
 A polite "closing the loop" message.
Subject Lines:
 Generates 3 unique subject lines per prospect to maximize open rates.
Phase 5: CRM Execution (The "Closer")
HubSpot Updates:
 Creates or updates the Contact record in HubSpot with all AI-generated data.
Sequence Enrollment:
 Automatically enrolls the prospect into a HubSpot Sequence owned by the assigned Sales Rep.
Safety Checks:
 Verifies email deliverability and ensures valid ownership before enrollment.
Phase 6: Reporting (The "Analyst")
Self-Auditing:
 The workflow aggregates its own stats (Companies processed, Contacts found, Dropped leads).
AI Report:
 GPT-4o generates a human-readable summary of the execution run, highlighting key insights and any potential errors, which is logged for the Ops team.
3. KPIs & Success Metrics
We are tracking the success of this automation against the following targets:
Metric
Target
Why it matters
Enrichment Match Rate
>65%
Ensures we are finding valid contacts for the companies showing intent.
AI Personalization Score
N/A (Qualitative)
Sales Rep feedback on the quality of the AI-generated "Pain Hypotheses."
Sequence Reply Rate
>8%
Industry average is 3-5%. We aim higher due to high intent + AI personalization.
Meeting Book Rate
>1.5%
The ultimate revenue driver.
Hours Saved per Rep
10 hrs/week
Time reclaimed from manual prospecting to be used for closing.
4. Stakeholder AssetsA. For the Board of Directors & ELT (Strategic Overview)
Headline:
 
Scaling Revenue Operations with Generative AI.
Narrative:
 "We have deployed an autonomous agent that acts as a force multiplier for our sales team. By automating the low-value tasks of research and data entry, we have effectively added the capacity of 5 full-time SDRs without increasing headcount, while simultaneously increasing our speed-to-lead on high-intent accounts."
Key Stat:
 "100% coverage of high-intent signals within 24 hours of detection."
B. For the Sales Team (Enablement)
Pitch:
 "Stop digging for emails and writing cold opens. Wake up to booked meetings."
Process:
You will receive a HubSpot notification when a new "High Intent" lead is assigned to you.
The contact is 
already
 enrolled in a sequence.
Your Job:
 Monitor the replies. If they reply, the AI stops, and you take over. Review the "AI Research Summary" field in HubSpot before your call to sound like an expert.
C. For the Direct Manager (Technical Reliability)
Error Handling:
 The workflow includes "Sticky Notes" identifying potential failure points (e.g., "Create Contact Has Errors"). Logic is built in to skip bad records without crashing the whole batch.
Cost Control:
 We are using Azure OpenAI with specific token limits and batching Amplemarket requests to ensure we stay within API rate limits and budget.
Optimization:
 The "Rank Contacts" node is fully customizable. If we decide to target "CFOs" over "CHROs" next quarter, we change one variable in the code, and the entire machine pivots instantly.
5. Project Plan: Next Steps
Phase 1: Stabilization (Current)
Monitor the "Round Robin" logic to ensure territories are respected.
Review "Dropped Contacts" logs to ensure we aren't filtering out good leads (specifically checking the APAC filter logic).
Phase 2: A/B Testing (Weeks 2-4)
Test two variations of the "AI Pain Point Hypothesis" prompt to see which generates higher reply rates.
Compare "High Intent" leads vs. "General ICP" leads to measure conversion delta.
Phase 3: Expansion (Month 2)
Remove the "Northeast" geo-fence and open the automation to the UK/EMEA teams (utilizing the "Chiara & James" pod logic already built).
Integrate Slack notifications to alert Reps of "Hot" outbound placements.
6. Technical Asset: Logic Flow (Simplified)
Code snippet
graph TD
    A[Daily Trigger 2AM] --> B[Get Companies (Intent Data)]
    B --> C{Filter: Competitors/Customers?}
    C -- Yes --> D[Drop]
    C -- No --> E[Amplemarket: Find People]
    E --> F[Code: Rank & Score Contacts]
    F --> G[Code: Assign Owner (Round Robin)]
    G --> H[AI Agent: Generate Research & Emails]
    H --> I[HubSpot: Create Contact & Enroll in Sequence]
    I --> J[Generate Execution Report]
This workflow represents a mature, enterprise-grade approach to automation. It is robust, scalable, and directly tied to revenue generation.
