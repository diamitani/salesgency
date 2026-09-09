# Cold Email Deliverability & DNS Configuration Playbook

Guaranteed 0% spam folder landing and 99%+ inbox placement protocol for cold outbound infrastructure.

---

## 🛡️ The 4 Mandatory DNS Records

### 1. SPF (Sender Policy Framework)
Add a `TXT` record at your domain root (`@`):
```text
Type: TXT
Host: @
Value: v=spf1 include:_spf.google.com include:sendgrid.net ~all
```

### 2. DKIM (DomainKeys Identified Mail)
Generate 2048-bit DKIM keys from your email host (Google Workspace / Microsoft 365) and publish the CNAME or TXT record:
```text
Type: TXT
Host: google._domainkey
Value: v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...
```

### 3. DMARC (Domain-based Message Authentication)
Publish a DMARC policy at `_dmarc.yourdomain.com`:
```text
Type: TXT
Host: _dmarc
Value: v=DMARC1; p=quarantine; rua=mailto:dmarc-reports@yourdomain.com; pct=100; adkim=r; aspf=r
```

### 4. Custom Tracking Domain (CNAME)
Never use generic Smartlead or Instantly tracking domains. Configure your own:
```text
Type: CNAME
Host: track
Value: prox.smartlead.ai
```

---

## 📈 14-Day Automated Warmup Schedule

| Day | Emails / Day / Inbox | Target Ramp |
|---|---|---|
| Day 1–3 | 5 emails | Warmup network only |
| Day 4–7 | 12 emails | Warmup network (100% reply rate) |
| Day 8–11 | 20 emails | 15 Warmup + 5 Outbound |
| Day 12–14 | 35 emails | 20 Warmup + 15 Outbound |
| Day 15+ | 40 emails (MAX) | 15 Warmup + 25 Outbound |

> [!IMPORTANT]
> Never send more than 35-40 cold emails per mailbox per day. To send 1,000 emails/day, provision 25 distinct secondary domains with 1 mailbox each.
