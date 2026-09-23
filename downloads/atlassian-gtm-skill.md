---
name: atlassian-gtm
description: "Wire GTM work to Atlassian Cloud: log tasks to Jira (epics, stories, bugs), publish and update playbook pages in Confluence, and read sprint/project state back into the GTM loop. REST-first; credential-gated via ATLASSIAN_SITE, ATLASSIAN_EMAIL, ATLASSIAN_API_TOKEN. Without credentials it returns NEEDS-CREDENTIALS guidance and never fakes results."
---

# atlassian-gtm

Use this skill when the task touches Jira or Confluence: logging GTM work
as Jira issues, publishing playbook/report pages to Confluence, or reading
sprint and project state back into a GTM operating rhythm.

## Credential gate (read first)

The skill works ONLY when these environment variables are set:

- `ATLASSIAN_SITE` — e.g. `https://praecipio.atlassian.net` (no trailing slash)
- `ATLASSIAN_EMAIL` — the Atlassian account email
- `ATLASSIAN_API_TOKEN` — an API token from https://id.atlassian.com/manage-profile/security/api-tokens

If any is missing: stop and return the NEEDS-CREDENTIALS block at the
bottom. NEVER fabricate issue keys, page IDs, sprint data, or "success"
responses. Faking an Atlassian result is lying to the person about the
state of their real systems.

All requests use HTTP Basic auth: `email:api_token`, base64-encoded.

```bash
export ATLASSIAN_SITE="https://praecipio.atlassian.net"
export ATLASSIAN_EMAIL="ops@example.com"
export ATLASSIAN_API_TOKEN="<token>"
AUTH="$(printf '%s:%s' "$ATLASSIAN_EMAIL" "$ATLASSIAN_API_TOKEN" | base64 -w0)"
```

## Jira — core endpoints

### Create an issue (log a GTM task)

```bash
curl -s -X POST "$ATLASSIAN_SITE/rest/api/3/issue" \
  -H "Authorization: Basic $AUTH" -H "Content-Type: application/json" \
  -d '{
    "fields": {
      "project": { "key": "GTM" },
      "issuetype": { "name": "Task" },
      "summary": "Publish playbook v1.1 to Confluence",
      "description": {
        "type": "doc", "version": 1,
        "content": [{ "type": "paragraph",
          "content": [{ "type": "text", "text": "Owner: playbook-manager. Due before Thursday demo." }] }]
      },
      "labels": ["gtm", "playbook"],
      "priority": { "name": "High" }
    }
  }'
```

- Find valid issue types first: `GET /rest/api/3/issuetype` (or per project:
  `GET /rest/api/3/project/{key}`).
- Link issues (blocks / relates to): `POST /rest/api/3/issueLink` with
  `"type": {"name": "Blocks"}, "inwardIssue": {"key": "GTM-12"}, "outwardIssue": {"key": "GTM-14"}`.
- Transition a task (To Do → In Progress → Done): first `GET
  /rest/api/3/issue/{key}/transitions`, then `POST` with
  `{"transition": {"id": "<transitionId>"}}`.

### Search / read state (sprint and project)

JQL examples — always URL-encode the query:

```bash
# Everything open in the GTM project, newest first
curl -s -G "$ATLASSIAN_SITE/rest/api/3/search/jql" \
  -H "Authorization: Basic $AUTH" \
  --data-urlencode "jql=project = GTM AND statusCategory != Done ORDER BY created DESC" \
  --data-urlencode "maxResults=25" --data-urlencode "fields=summary,status,assignee,duedate"

# Current sprint for a board (Agile API)
curl -s "$ATLASSIAN_SITE/rest/agile/1.0/board" -H "Authorization: Basic $AUTH"
curl -s "$ATLASSIAN_SITE/rest/agile/1.0/board/{boardId}/sprint?state=active" \
  -H "Authorization: Basic $AUTH"
curl -s "$ATLASSIAN_SITE/rest/agile/1.0/sprint/{sprintId}/issue" \
  -H "Authorization: Basic $AUTH"
```

### Comment on an issue

```bash
curl -s -X POST "$ATLASSIAN_SITE/rest/api/3/issue/GTM-12/comment" \
  -H "Authorization: Basic $AUTH" -H "Content-Type: application/json" \
  -d '{"body": {"type": "doc", "version": 1, "content": [
        {"type": "paragraph", "content": [{"type": "text",
         "text": "Execution-analyst: workflow WF-9 failed 3/10 runs — fix proposed, awaiting approval."}]}]}}'
```

## Confluence — core endpoints

### Create a page (publish a playbook or report)

Body uses Atlassian Document Format inside `storage` representation as
plain HTML. To publish under a parent page, include `ancestors`.

```bash
curl -s -X POST "$ATLASSIAN_SITE/wiki/rest/api/content" \
  -H "Authorization: Basic $AUTH" -H "Content-Type: application/json" \
  -d '{
    "type": "page",
    "title": "GTM Playbook v1.0 — Atlassian-Ecosystem Services Buyers",
    "space": { "key": "GTM" },
    "ancestors": [{ "id": "<parentPageId>" }],
    "body": { "storage": {
      "value": "<h1>ICP</h1><p>200-5,000 employees; $50M-$2B revenue; NA primary.</p>",
      "representation": "storage"
    } }
  }'
```

### Update a page (version it)

Read first — updates require the current version number:

```bash
curl -s "$ATLASSIAN_SITE/wiki/rest/api/content/<pageId>?expand=version" \
  -H "Authorization: Basic $AUTH"
# then PUT with "version": {"number": <current+1>}
curl -s -X PUT "$ATLASSIAN_SITE/wiki/rest/api/content/<pageId>" \
  -H "Authorization: Basic $AUTH" -H "Content-Type: application/json" \
  -d '{"type":"page","title":"GTM Playbook v1.1","version":{"number":2},
       "body":{"storage":{"value":"<h1>ICP</h1><p>...</p>","representation":"storage"}}}'
```

### Search pages

```bash
curl -s -G "$ATLASSIAN_SITE/wiki/rest/api/content/search" \
  -H "Authorization: Basic $AUTH" \
  --data-urlencode "cql=text ~ \"playbook\" AND space = GTM" \
  --data-urlencode "limit=10"
```

## GTM operating conventions

- **Jira project key** for GTM work: agree one key with the person first
  (e.g. `GTM`); never invent a key.
- **Epics** = GTM motions (Outbound Engine, Inbound Capture, Pre-Call,
  Post-Call, Health Reporting, Executive Dashboard). **Tasks/stories** =
  concrete work items. **Bugs** = broken workflows flagged by
  execution-analyst.
- **Confluence space** for playbooks: agree one space key first; version
  every published playbook (v1.0, v1.1…), never overwrite silently.
- Writes that change the real world (create/transition issues, publish
  pages) follow the propose → approve discipline: show the exact payload
  or a plain-English plan, get explicit approval, then execute.

## Rate limits and failures

Atlassian Cloud enforces per-user rate limits. On HTTP 429, back off
exponentially (1s, 2s, 4s…). Report errors honestly with the status code
and the response body — never retry a 400-class validation error
blindly; the payload is wrong, not the timing.

## NEEDS-CREDENTIALS block

If `ATLASSIAN_SITE`, `ATLASSIAN_EMAIL`, or `ATLASSIAN_API_TOKEN` is
missing, reply with exactly this, and do nothing else:

> **NEEDS CREDENTIALS** — I can't reach Jira or Confluence yet. To wire
> me up:
> 1. Set `ATLASSIAN_SITE` (your `https://<site>.atlassian.net`)
> 2. Set `ATLASSIAN_EMAIL` (your Atlassian login email)
> 3. Create an API token at
>    https://id.atlassian.com/manage-profile/security/api-tokens and set
>    `ATLASSIAN_API_TOKEN`
>
> Then tell me the Jira project key and Confluence space key to use, and
> I'll verify the connection with a read-only call before touching
> anything.
