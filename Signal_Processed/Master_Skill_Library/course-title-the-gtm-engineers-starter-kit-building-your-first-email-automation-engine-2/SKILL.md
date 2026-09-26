---
name: course-title-the-gtm-engineers-starter-kit-building-your-first-email-automation-engine-2
description: Course Material derived from Course Title_ The GTM Engineer's Starter Kit_ Building Your First Email Automation Engine-2.docx
source_path: Course Title_ The GTM Engineer's Starter Kit_ Building Your First Email Automation Engine-2.docx
---

# Course Title_ The GTM Engineer's Starter Kit_ Building Your First Email Automation Engine-2.docx

## Context
This skill provides knowledge, processes, and instructions derived from the document: `Course Title_ The GTM Engineer's Starter Kit_ Building Your First Email Automation Engine-2.docx`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

Tab 1
The GTM Engineer's Starter Kit: Building Your First Email Automation Engine
Course Description: Welcome to the world of Go-to-Market (GTM) Engineering. In this hands-on course, you will move beyond traditional sales and marketing tactics to become a GTM Engineer—someone who builds, connects, and optimizes systems to drive growth. We will demystify the process of automation by building a powerful, cost-effective email outreach engine from scratch using Make.com, Google Sheets, and Resend.com. By the end of this course, you will have a fully functional and trackable cold outbound system, empowering you to reach prospects at scale without expensive subscription tools.
Target Audience:
Sales Professionals & SDRs
Marketing Managers
Startup Founders & Solopreneurs
Anyone interested in workflow automation and operational efficiency.
Prerequisites:
A Google Account (for Google Sheets)
A free Make.com account
A free Resend.com account
A domain name you own (for email sending configuration)
Module 1: The Foundations of GTM Engineering
Objective: Understand the core concepts behind GTM Engineering and the tools we'll be using.
Lesson 1.1: Welcome to Go-to-Market Engineering
Content:
What is GTM Engineering? We'll start by defining this new, powerful function. It’s not just a buzzword; it’s a shift in mindset. GTM Engineering is the practice of applying systems thinking and technology to solve sales and marketing challenges. Instead of just using tools, you become the architect who connects them to create custom solutions.
The Modern Sales Environment: Markets are saturated, and prospects are harder to reach. We'll discuss why manual, repetitive tasks are no longer sustainable and how automation gives you a competitive edge.
Course Outcome: By the end of this course, you will have built your first GTM system: an automated email outreach engine. This project will serve as the foundation for all your future automation work.
Lesson 1.2: Your GTM Tech Stack Explained
Content:
The Orchestrator: Make.com
Make.com is a visual workflow automation platform. Think of it as the central brain of our operation. It connects to different software applications (like Google and Resend) and tells them what to do and when to do it. We'll explore its visual canvas, where you drag and drop "modules" to build powerful workflows without writing a single line of code.
The Database: Google Sheets
For this project, Google Sheets will be our simple, flexible, and free database. It will store our prospect list and, more importantly, act as our tracking system to log when emails are sent.
The Delivery Engine: Resend.com
Resend.com is an email API built for deliverability. Sending cold emails from your primary Gmail or Outlook account is risky. Email providers can flag your account for spam, damaging your domain's reputation and sending all future emails to the junk folder.
Resend solves this by managing your sending reputation for you. It ensures your domain is properly configured with security standards (DKIM, SPF, DMARC), maximizing the chance your emails land in the primary inbox.
Lesson 1.3: Understanding APIs and Email Deliverability
Content:
What is an API Key? An API (Application Programming Interface) is a way for different software programs to talk to each other. An API Key is like a secret password that grants one application (Make.com) permission to access and use another application's features (Resend.com). We will generate an API key from Resend and securely add it to Make.com to establish this connection.
Why Deliverability Matters: We'll briefly cover the key terms Resend handles for you:
SPF (Sender Policy Framework): A list of approved servers allowed to send email from your domain.
DKIM (DomainKeys Identified Mail): A digital signature that proves your email hasn't been tampered with.
DMARC (Domain-based Message Authentication, Reporting, and Conformance): A policy that tells receiving servers what to do with emails that fail SPF or DKIM checks.
Using a tool like Resend that manages this is the professional way to handle email outreach.
Quiz: Module 1 Knowledge Check
What is the primary role of a GTM Engineer?
In our project, what function does Make.com serve?
Why is it better to use Resend.com instead of a standard Gmail account for cold outreach?
Module 2: Setting Up Your Toolbox
Objective: Prepare all the necessary accounts and assets before building the automation.
Lesson 2.1: Preparing Your Google Sheet Database
Content:
Create a new Google Sheet. Name it "Outreach Prospect List."
Essential Columns: Set up the following columns:
FirstName (For personalization)
LastName
Company
Email (This is the only mandatory field for the automation to run)
LinkedInProfile (Optional, for advanced flows)
Email Sent - 1 (This is crucial for tracking!)
Email Sent - 2 (For future follow-ups)
Reply Date (For future reply tracking)
Paste in 2-3 sample contacts to start, including your own test email address. Leave the "Email Sent" columns blank.
Lesson 2.2: Configuring Resend.com and Getting Your API Key
Content: (Includes video walkthrough)
Step 1: Sign Up: Create your free account on Resend.com.
Step 2: Add Your Domain: Navigate to the "Domains" section and add the domain you'll be sending emails from (e.g., yourcompany.com).
Step 3: Configure DNS: Resend will provide you with DNS records (DKIM, etc.). You will need to log in to your domain provider (GoDaddy, AWS, Namecheap, etc.) and add these records. This step is critical for verification. Resend has excellent guides for this process.
Step 4: Generate API Key: Once your domain is verified, navigate to the "API Keys" section. Click "Create API Key," give it a name (e.g., "Make.com Key"), and set permissions to "Full Access."
Step 5: Save Your Key: IMPORTANT! Copy the API key and save it somewhere secure, like a password manager. You will not be able to see it again.
Module 3: Building the Core Email Automation in Make.com
Objective: Build, configure, and test the step-by-step email sending and tracking automation.
Lesson 3.1: Scenario Setup & The Google Sheets Trigger
Content: (Includes video walkthrough)
Log in to Make.com and click "Create a new scenario."
Click the central + button and search for Google Sheets. Select the "Search Rows" module.
Connect your Google Account.
Select your "Outreach Prospect List" spreadsheet and the correct sheet.
Crucially, set up the Filter:
Condition 1: Email (Column D) -> Exists (Text operator).
Click "Add AND rule".
Condition 2: Email Sent - 1 (Column F) -> Does not exist (Text operator).
This filter tells Make.com: "Only grab rows that have an email address AND have NOT had the first email sent to them yet."
Lesson 3.2: Sending the Email with Resend.com
Content: (Includes video walkthrough)
Click the + on the side of the Google Sheets module to add the next step.
Search for and select Resend, then choose the "Send an Email" module.
Click "Add" to create a new connection. Paste your Resend API key here.
Map the Fields:
To: Click into the field and map the Email variable from the Google Sheets module.
From: Type in your verified domain email (e.g., your.name@yourverifieddomain.com).
Subject Line: Write your subject. You can personalize it! E.g., "Question for [map FirstName]"
Body: Choose "Text" for plain text. Write your email body. Use the mapped variables from Google Sheets to personalize it (e.g., "Hi [map FirstName], ...").
Lesson 3.3: Adding a Delay and Updating the Sheet
Content: (Includes video walkthrough)
Step 1: The Delay: Click the + between the two modules and select "Tools", then "Sleep". Set the delay for 3 seconds. This prevents all emails from sending at once, which can look spammy and throttle your outbox.
Step 2: Closing the Loop: Add a final module. Choose Google Sheets again, but this time select "Update a Row".
Map the Fields:
Select the same spreadsheet and sheet.
Row number: Map the Row number variable from the first Google Sheets module. This tells Make.com exactly which row to update.
Find the Email Sent - 1 column and in its field, map the special now variable from the "Date and time" tab. This will insert the current date and time as a timestamp.
Lesson 3.4: Testing and Activation
Content:
Your final scenario should look like this: Google Sheets (Search) -> Tools (Sleep) -> Resend (Send) -> Google Sheets (Update).
Run Once: Click the "Run once" button in the bottom left. The automation will execute.
Check Your Work:
Check the inbox of your test email. Did you receive the personalized email?
Check your Google Sheet. Is there a timestamp in the "Email Sent - 1" column for your test contact?
Scheduling: Once you are confident it works, turn the scenario ON. You can set a schedule (e.g., "Run every day at 9 AM") to make it fully automated.
Assignment: Build the core automation. Submit a screenshot of your active Make.com scenario and your Google Sheet showing a successful timestamped test.
Module 4: Leveling Up: Advanced GTM Automations
Objective: Explore how to enhance the core automation with AI personalization and reply tracking.
Lesson 4.1: Dynamic Personalization with AI (LLMs)
Content:
This is where you truly become a GTM Engineer. Let's add a step to create unique messages for each prospect.
The Flow: The new scenario will be: Google Sheets -> HTTP (Get a file) -> OpenAI (Create a Completion) -> Resend.
HTTP Module: Use this to scrape the text from a prospect's LinkedInProfile URL.
OpenAI Module: Connect your OpenAI API key. Feed the scraped text into the prompt field with an instruction like: "Based on the following LinkedIn profile text, write a single, compelling opening sentence for a cold email that mentions a specific achievement or interest. Profile: [map text from HTTP module]"
Update Resend Module: In your Resend email body, map the output from the OpenAI module as your opening line. Now every email is 100% unique!
Lesson 4.2: Building a Reply Tracking System
Content:
Create a new scenario in Make.com.
Trigger: Use the Gmail or Microsoft 365 Email module with the "Watch Emails" trigger.
Filter: Set a filter to only proceed if the sender's email address exists in your Google Sheet's "Email" column.
Action: Use the Google Sheets "Update a Row" module. First, you'll need a "Search Rows" module to find the correct row number based on the sender's email. Then, in the "Update a Row" module, map the Reply Date column with the now variable.
Module 5: Course Wrap-Up & Your Next Steps
Objective: Review the course, consolidate resources, and adopt the GTM Engineer's mindset.
Lesson 5.1: Review and Key Takeaways
Content:
Congratulations! You have successfully built a scalable, trackable, and professional email outreach system.
We've covered the "why" of GTM Engineering, the "what" of our tech stack, and the step-by-step "how" of building a real-world automation.
You now possess the foundational skills to look at any repetitive sales or marketing process and ask, "How can I automate this?"
Lesson 5.2: Resources & Glossary
Glossary: (Consolidated from Module 1)
GTM Engineering: The function of building out AI and Automations for sales and marketing activities.
Make.com: A workflow automation platform that connects software tools together.
Resend.com: An email deliverability tool that manages domain reputation for outreach.
API Key: A secure connector that allows different tools to communicate and share data.
Helpful Links:
Make.com Documentation
Resend.com API Docs
Guides on setting up DNS records for popular domain providers.
Lesson 5.3: The GTM Engineer's Mindset
Content:
This is just the beginning. The mindset of a GTM Engineer is one of continuous improvement and experimentation.
Challenge: Look at your daily work. What are three repetitive tasks you do every week? Sketch out a Make.com scenario that could automate one of them.
Keep learning, keep building, and keep optimizing. Welcome to the future of Go-to-Market.
Tab 2
Of course. Here is the complete, rewritten course from start to finish, seamlessly integrating the AI personalization module using Gemini.
Course Title: The GTM Engineer's Starter Kit: Building Your First AI-Powered Email Automation Engine
Course Description: Welcome to the world of Go-to-Market (GTM) Engineering. In this hands-on course, you will move beyond traditional sales tactics to become a GTM Engineer—someone who builds, connects, and optimizes systems to drive growth. We will demystify automation by building a powerful, AI-driven email outreach engine from scratch. Using Make.com, Google Sheets, and Google's Gemini AI, you will learn to dynamically generate hyper-personalized messages for every prospect. By the end of this course, you will have a fully functional, intelligent, and trackable cold outbound system, empowering you to reach prospects at scale without expensive subscription tools.
Target Audience:
Sales Professionals & SDRs
Marketing Managers
Startup Founders & Solopreneurs
Anyone interested in workflow automation and operational efficiency.
Prerequisites:
A Google Account (for Google Sheets & Gemini)
A free Make.com account
A free Resend.com account
A domain name you own (for email sending configuration)
Module 1: The Foundations of GTM Engineering
Objective: Understand the core concepts behind GTM Engineering and the tools we'll be using.
Lesson 1.1: Welcome to Go-to-Market Engineering
Content:
What is GTM Engineering? We'll start by defining this new, powerful function. It���s not just a buzzword; it’s a shift in mindset. GTM Engineering is the practice of applying systems thinking and technology to solve sales and marketing challenges. Instead of just using tools, you become the architect who connects them to create custom solutions.
The Modern Sales Environment: Markets are saturated, and prospects are harder to reach. We'll discuss why manual, repetitive tasks are no longer sustainable and how automation and AI give you a competitive edge.
Course Outcome: By the end of this course, you will have built your first GTM system: an automated, AI-powered email outreach engine. This project will serve as the foundation for all your future automation work.
Lesson 1.2: Your GTM Tech Stack Explained
Content:
The Orchestrator: Make.com: The central brain of our operation. A visual workflow automation platform where we will build our process without writing code.
The Database: Google Sheets: Our simple, flexible, and free database. It will store our prospect list and act as our tracking system.
The Delivery Engine: Resend.com: An email API built for deliverability. It manages your sending reputation, ensuring your domain is properly configured with security standards (DKIM, SPF, DMARC) to maximize the chance your emails land in the primary inbox.
The Intelligence Engine: Google Gemini: A Large Language Model (LLM) that will act as our AI sales assistant, dynamically writing personalized email content for each prospect.
Lesson 1.3: Understanding APIs and Email Deliverability
Content:
What is an API Key? An API (Application Programming Interface) is a way for different software programs to talk to each other. An API Key is like a secret password that grants one application (Make.com) permission to access another's features (Resend.com, Gemini).
Why Deliverability Matters: A brief overview of SPF, DKIM, and DMARC, and why using a tool like Resend is the professional way to handle email outreach and protect your domain's reputation.
Quiz: Module 1 Knowledge Check
What is the primary role of a GTM Engineer?
In our project, what function does Gemini serve?
Why is it better to use Resend.com instead of a standard Gmail account for cold outreach?
Module 2: Setting Up Your Toolbox
Objective: Prepare all the necessary accounts and assets before building the automation.
Lesson 2.1: Preparing Your Google Sheet Database
Content:
Create a new Google Sheet. Name it "AI Outreach Prospect List."
Essential Columns: Set up the following columns. The columns in bold are critical for our AI personalization in Module 4.
FirstName
LastName
Email (Mandatory for the automation to run)
Title (e.g., "VP of Marketing")
Company
Company Website (e.g., "https://www.company.com")
LinkedInProfile (Optional)
Email Sent - 1 (Crucial for tracking)
Reply Date (For future reply tracking)
Paste in 2-3 sample contacts to start, including your own test email address. Be sure to fill out the Title and Company Website for your test contacts.
Lesson 2.2: Configuring Resend.com and Getting Your API Key
Content: (Includes video walkthrough)
Step 1: Sign Up & Add Domain: Create your free Resend.com account and add your domain.
Step 2: Configure DNS: Resend will provide you with DNS records (DKIM, etc.). Log in to your domain provider (GoDaddy, AWS, etc.) and add these records to get your domain verified.
Step 3: Generate & Save API Key: Navigate to the "API Keys" section, create a new key, and copy it somewhere secure. You will not be able to see it again.
Module 3: Building the Core Email Automation in Make.com
Objective: Build, configure, and test the step-by-step email sending and tracking automation. In this module, we will build the basic framework before adding the AI layer.
Lesson 3.1: Scenario Setup & The Google Sheets Trigger
Content: (Includes video walkthrough)
Log in to Make.com and create a new scenario.
Select the Google Sheets "Search Rows" module.
Connect your Google Account and select your "AI Outreach Prospect List" spreadsheet.
Set up the Filter:
Condition 1: Email -> Exists.
AND
Condition 2: Email Sent - 1 -> Does not exist.
This tells Make.com: "Only grab rows that have an email address AND have NOT had the first email sent to them yet."
Lesson 3.2: Sending the Email with Resend.com
Content: (Includes video walkthrough)
Add the Resend "Send an Email" module.
Connect your Resend account using your API key.
Map the Fields:
To: Map the Email variable from the Google Sheets module.
From: Type in your verified domain email (e.g., your.name@yourdomain.com).
Subject Line: "Question for [map FirstName]"
Body: For now, we'll use a simple template: "Hi [map FirstName], I was looking at [map Company] and had a question..."
Lesson 3.3: Adding a Delay and Updating the Sheet
Content: (Includes video walkthrough)
Step 1: The Delay: Add a "Tools" -> "Sleep" module and set the delay for 3 seconds. This prevents sending emails too quickly.
Step 2: Closing the Loop: Add a final Google Sheets "Update a Row" module.
Map the Fields:
Row number: Map the Row number from the first Google Sheets module.
Find the Email Sent - 1 column and map the special now variable to insert a timestamp.
Lesson 3.4: Testing and Activation
Content:
Your scenario should be: Google Sheets (Search) -> Resend (Send) -> Tools (Sleep) -> Google Sheets (Update). (Note: We'll add the Sleep before the Send in the final version for better practice).
Click "Run once" and check your test email inbox and your Google Sheet for the timestamp.
Once confirmed, turn the scenario ON and set a schedule.
Assignment: Build the core automation. Submit a screenshot of your active Make.com scenario and your Google Sheet showing a successful timestamped test.
Module 4: Leveling Up: AI-Powered GTM Automations
Objective: Transform your basic automation into an intelligent outreach system by integrating Google's Gemini AI for hyper-personalization.
Lesson 4.1: Hyper-Personalization with Google's Gemini
Content: This is where you truly become a GTM Engineer. We will now insert an AI brain into our automation to craft a unique message for every single prospect.
Prerequisites: Get a Gemini API Key from Google AI Studio by clicking "Get API key."
Step-by-Step Implementation:
Modify Your Make.com Scenario: We will insert the Gemini module right after the initial Google Sheets module. Your new, final flow will be: Google Sheets (Search Rows) -> Google Vertex AI (Generate Content) -> Tools (Sleep) -> Resend (Send an Email) -> Google Sheets (Update a Row).
Configure the Gemini Module:
Add a new module between Sheets and Sleep. Search for "Google Vertex AI".
Select the action "Generate Content".
Create a new connection using your Gemini API key.
Select a Model: Choose gemini-1.5-flash (faster and cheaper) or gemini-pro.
The Prompt: In the "Prompt" field, construct a detailed set of instructions for the AI. Copy and paste the template below, replacing the bracketed text with your own information.
PROMPT TEMPLATE:
Your Role: You are an expert B2B Sales Development Representative. Your goal is to write a compelling, personalized opening paragraph for a cold email.
My Company's Product: My company provides [ENTER YOUR ONE-SENTENCE PRODUCT DESCRIPTION HERE]. Our key value proposition is that we help companies to [ENTER YOUR KEY VALUE PROPOSITION HERE].
Prospect's Information:
Title: [Map Title from Google Sheets]
Company Website: [Map Company Website from Google Sheets]
Your Task: Based on all the information above, write a single, personalized opening paragraph (2-3 sentences) for an email. The paragraph MUST connect a likely challenge or goal of someone with their Title at their type of company to my company's solution.
Rules:
Address them by their first name, which will be added later. Start the paragraph with a greeting like "Hi," but do not include the name.
Do not write the full email, only the opening paragraph.
The tone should be professional, concise, and helpful.
The output must be plain text only.
Update the Resend Module:
Go back to your Resend (Send an Email) module.
In the Body field, delete the old template.
Map the FirstName variable from Google Sheets, then map the output from the Gemini module. It will look something like [4. choices[].parts[].text].
Add your closing below it. The final body should look like this:
Hi [map FirstName from Sheets],
[map text output from Gemini]
Would you be open to a brief call next week to explore this?
Best, [Your Name]
**Testing Your AI **
Click "Run once." Check the output of the Gemini module to see the text it generated. Then check your test email inbox to see the final, assembled email. If the output isn't perfect, go back and tweak your prompt!
Lesson 4.2: Building a Reply Tracking System (Bonus Flow)
Content:
In a new scenario, use the Gmail "Watch Emails" trigger.
Add a filter to only proceed if the sender's email exists in your Google Sheet.
Use Google Sheets "Update a Row" to find the correct row and map the Reply Date column with the now variable to timestamp the reply.
Module 5: Course Wrap-Up & Your Next Steps
Objective: Review the course, consolidate resources, and adopt the GTM Engineer's mindset.
Lesson 5.1: Review and Key Takeaways
Content:
Congratulations! You have successfully built a scalable, AI-powered, and professional email outreach system.
We've covered the "why" of GTM Engineering, the "what" of our tech stack, and the step-by-step "how" of building a real-world intelligent automation.
You now possess the foundational skills to look at any repetitive sales or marketing process and ask, "How can I automate and add intelligence to this?"
Lesson 5.2: Resources & Glossary
Glossary:
GTM Engineering: The function of building out AI and Automations for sales and marketing activities.
Make.com: A workflow automation platform that connects software tools together.
Resend.com: An email deliverability tool that manages domain reputation for outreach.
Gemini (LLM): A Large Language Model used here to dynamically generate personalized content.
API Key: A secure connector that allows different tools to communicate.
Helpful Links:
Make.com Documentation
Google AI Studio
Resend.com API Docs
Lesson 5.3: The GTM Engineer's Mindset
Content:
This is just the beginning. The mindset of a GTM Engineer is one of continuous improvement and experimentation.
Challenge: Look at your daily work. What are three repetitive tasks you do every week? Sketch out a Make.com scenario that could automate one of them.
Keep learning, keep building, and keep optimizing. Welcome to the future of Go-to-Market.
