from langchain_core.tools import tool
import json

# --- Inbound Engine Tools ---

@tool
def enrich_lead_data(email: str) -> str:
    """Enriches a lead's profile with company, role, and industry data based on their email."""
    # Mock enrichment logic (e.g., Clearbit, Clay, or Apollo integration)
    domain = email.split("@")[-1] if "@" in email else "unknown.com"
    enriched_data = {
        "email": email,
        "company_domain": domain,
        "company_size": "50-200" if "startup" in domain else "1000+",
        "industry": "B2B SaaS",
        "estimated_revenue": "$10M - $50M",
        "job_title": "VP of Growth" if "vp" in email else "Founder/CEO"
    }
    return json.dumps(enriched_data)

@tool
def classify_mql(lead_data_json: str) -> str:
    """Classifies if an enriched lead meets the Marketing Qualified Lead (MQL) criteria."""
    try:
        data = json.loads(lead_data_json)
        # Mock scoring logic
        score = 0
        if "VP" in data.get("job_title", "") or "Founder" in data.get("job_title", ""):
            score += 50
        if data.get("industry") == "B2B SaaS":
            score += 30
            
        is_mql = score >= 50
        return f"Lead Score: {score}. MQL Status: {'QUALIFIED' if is_mql else 'DISQUALIFIED'}."
    except Exception as e:
        return f"Error classifying MQL: {str(e)}"

# --- Outbound Engine Tools ---

@tool
def send_email(to_email: str, subject: str, body: str) -> str:
    """Sends an outreach email to the prospect. Use this after drafting the copy."""
    # Mock email sending logic (e.g., Resend, Sendgrid, or Mailgun API)
    print(f"\n[EMAIL SENT] To: {to_email} | Subject: {subject}\n{body}\n")
    return f"Successfully sent email to {to_email}"

@tool
def draft_linkedin_message(profile_data_json: str) -> str:
    """Drafts a personalized 300-character LinkedIn connection request message."""
    try:
        data = json.loads(profile_data_json)
        role = data.get("job_title", "Leader")
        company = data.get("company_domain", "your company")
        msg = f"Hi there, noticed your work as {role} at {company}. We're helping similar B2B SaaS teams scale GTM automation. Would love to connect!"
        return msg
    except:
        return "Hi, would love to connect and share notes on GTM automation."

# --- CRM Engine Tools ---

@tool
def create_crm_contact(name: str, email: str, company: str, stage: str = "Lead") -> str:
    """Creates a new contact record in the CRM (e.g., HubSpot or Salesforce)."""
    # Mock CRM API call
    contact_id = f"crm_cnt_{abs(hash(email))}"
    return f"Created CRM contact '{name}' ({email}) at {company} with ID: {contact_id}. Stage: {stage}."

# --- Sales Playbook Engine Tools ---

@tool
def generate_battlecard(competitor_name: str) -> str:
    """Retrieves or generates a competitor battlecard with objection handling points."""
    battlecard = f"""
    Battlecard vs {competitor_name}:
    1. Weakness: Slow deployment. Our counter: We deploy in hours, not weeks.
    2. Weakness: Generic prompts. Our counter: We use verified skill plugins.
    3. Weakness: Per-seat pricing. Our counter: We charge flat usage fees with zero recurring platform tax.
    """
    return battlecard

# --- Reporting Engine Tools ---

@tool
def fetch_campaign_metrics(campaign_name: str) -> str:
    """Fetches real-time open rates, click rates, and reply rates for a campaign."""
    metrics = {
        "campaign": campaign_name,
        "emails_sent": 1540,
        "open_rate": "42%",
        "click_rate": "12%",
        "reply_rate": "4.5%",
        "meetings_booked": 8
    }
    return json.dumps(metrics)

# Expose grouped tools for the agents
INBOUND_TOOLS = [enrich_lead_data, classify_mql]
OUTBOUND_TOOLS = [send_email, draft_linkedin_message]
CRM_TOOLS = [create_crm_contact]
PLAYBOOK_TOOLS = [generate_battlecard]
REPORTING_TOOLS = [fetch_campaign_metrics]
