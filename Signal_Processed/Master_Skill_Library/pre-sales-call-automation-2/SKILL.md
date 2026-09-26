---
name: pre-sales-call-automation-2
description: Process/Note derived from Pre-Sales Call Automation (2).json
source_path: Pre-Sales Call Automation (2).json
---

# Pre-Sales Call Automation (2).json

## Context
This skill provides knowledge, processes, and instructions derived from the document: `Pre-Sales Call Automation (2).json`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

{
  "name": "Pre-Sales Call Automation",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "precall",
        "authentication": "headerAuth",
        "options": {}
      },
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2.1,
      "position": [
        -2080,
        0
      ],
      "id": "9acf7fbb-63be-4fdd-8d9a-65c945cdb613",
      "name": "Webhook",
      "webhookId": "d684eeb9-dfdf-45cd-9e41-bd44d58677f8",
      "credentials": {
        "httpHeaderAuth": {
          "id": "jL6mIjMZipJSP1iV",
          "name": "n8n_hubspot_flow_key"
        }
      }
    },
    {
      "parameters": {
        "jsCode": "// Accept both contact-based and meeting-based HubSpot workflow webhook payloads\nconst body = $json.body || {};\nlet contactId = body.vid ?? body.contactId ?? body.hs_object_id ?? null;\nlet meetingId = body.meetingId ?? body.engagementId ?? null;\n// HubSpot behavioral/workflow webhooks: objectId + objectTypeId ('0-1' contact, '0-47' meeting)\nif (!contactId && String(body.objectTypeId || '') === '0-1') contactId = body.objectId;\nif (!meetingId && String(body.objectTypeId || '') === '0-47') meetingId = body.objectId;\nif (!contactId && !meetingId) {\n  throw new Error('Webhook payload has no contact or meeting id. Keys received: ' + JSON.stringify(Object.keys(body)));\n}\nreturn [{ json: {\n  contactId: contactId ? String(contactId) : '',\n  meetingIdFromPayload: meetingId ? String(meetingId) : ''\n}}];"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        -1856,
        0
      ],
      "id": "4a94f76b-43bf-4e44-bf55-f0cbbd87bde7",
      "name": "Normalize Payload"
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 3
          },
          "conditions": [
            {
              "id": "238d16a7-e010-48a4-80f7-4bff63fba3f7",
              "leftValue": "={{ $json.contactId }}",
              "rightValue": "",
              "operator": {
                "type": "string",
                "operation": "notEmpty",
                "singleValue": true
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.3,
      "position": [
        -1632,
        0
      ],
      "id": "04be9d91-10ba-459d-a039-c3cc6d226d80",
      "name": "Has Contact ID?"
    },
    {
      "parameters": {
        "url": "=https://api.hubapi.com/crm/v3/objects/meetings/{{ $json.meetingIdFromPayload }}/associations/contacts",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "httpBearerAuth",
        "options": {
          "timeout": 30000
        }
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.3,
      "position": [
        -1408,
        192
      ],
      "id": "0ebe0a40-9e18-4fd1-a6c5-b8e3fc5c2776",
      "name": "Get Meeting Contacts",
      "credentials": {
        "httpBearerAuth": {
          "id": "lAToSjxvjYQPjr9Q",
          "name": "Hubspot API"
        }
      }
    },
    {
      "parameters": {
        "jsCode": "// Meeting-based payload: adopt the meeting's first associated contact\nconst norm = $('Normalize Payload').first().json;\nconst r = ($json.results || [])[0];\nif (!r) throw new Error('Meeting ' + norm.meetingIdFromPayload + ' has no associated contact — nothing to brief.');\nreturn [{ json: { ...norm, contactId: String(r.id ?? r.toObjectId) } }];"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        -1184,
        192
      ],
      "id": "bb5fdd49-7c41-446a-896c-12c06e582956",
      "name": "Adopt Meeting Contact"
    },
    {
      "parameters": {
        "url": "=https://api.hubapi.com/crm/v3/objects/contacts/{{ $json.contactId }}?associations=deals,companies,meetings&properties=email,firstname,lastname,jobtitle,phone,lifecyclestage,hs_lead_status,hubspot_owner_id,message,country,hs_analytics_source,recent_conversion_event_name",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "httpBearerAuth",
        "options": {
          "timeout": 30000
        }
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.3,
      "position": [
        -1184,
        0
      ],
      "id": "c272a2e4-d44e-403b-a04e-b615f23f7123",
      "name": "Get Contact",
      "credentials": {
        "httpBearerAuth": {
          "id": "lAToSjxvjYQPjr9Q",
          "name": "Hubspot API"
        }
      }
    },
    {
      "parameters": {
        "jsCode": "// Normalize contact + association ids into one object\nconst c = $json;\nif (!c || !c.properties) throw new Error('Contact fetch returned no properties: ' + JSON.stringify(c).slice(0, 300));\nconst norm = $('Normalize Payload').first().json;\nconst assoc = c.associations || {};\nconst ids = new Set(((assoc.meetings || {}).results || []).map(r => String(r.id)));\nif (norm.meetingIdFromPayload) ids.add(norm.meetingIdFromPayload);\nreturn [{ json: {\n  contactId: String(c.id),\n  contact: c.properties,\n  companyId: String((((assoc.companies || {}).results || [])[0] || {}).id ?? ''),\n  dealId: String((((assoc.deals || {}).results || [])[0] || {}).id ?? ''),\n  meetingIds: [...ids],\n  meetingIdFromPayload: norm.meetingIdFromPayload\n}}];"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        -960,
        0
      ],
      "id": "ec687bcb-3835-4cd2-84b4-c4dfc907b691",
      "name": "Extract Associations"
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 3
          },
          "conditions": [
            {
              "id": "4fa34d19-292c-4cc0-b724-b886261b22d5",
              "leftValue": "={{ $json.meetingIds.length }}",
              "rightValue": 0,
              "operator": {
                "type": "number",
                "operation": "gt"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.3,
      "position": [
        -736,
        0
      ],
      "id": "071ac2b0-7426-4f2e-a5d9-9e5780ff4119",
      "name": "Has Meetings?"
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://api.hubapi.com/crm/v3/objects/meetings/batch/read",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "httpBearerAuth",
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={{ JSON.stringify({ properties: ['hs_meeting_title','hs_meeting_start_time','hs_meeting_end_time','hs_meeting_body','hs_meeting_location','hs_activity_type','hs_meeting_outcome','hubspot_owner_id'], inputs: $json.meetingIds.map(id => ({ id })) }) }}",
        "options": {
          "timeout": 30000
        }
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.3,
      "position": [
        -512,
        0
      ],
      "id": "befd5ce2-316c-49ad-bd49-40909e900784",
      "name": "Batch Read Meetings",
      "credentials": {
        "httpBearerAuth": {
          "id": "lAToSjxvjYQPjr9Q",
          "name": "Hubspot API"
        }
      }
    },
    {
      "parameters": {
        "jsCode": "// Pick the meeting to brief: prefer the id sent by HubSpot, else next upcoming meeting\nconst prev = $('Extract Associations').first().json;\nconst results = $json.results || [];\nconst now = Date.now();\nconst candidates = results.filter(m => {\n  const p = m.properties || {};\n  const st = p.hs_meeting_start_time ? new Date(p.hs_meeting_start_time).getTime() : 0;\n  const outcome = String(p.hs_meeting_outcome || '').toUpperCase();\n  return st > now && outcome !== 'CANCELED' && outcome !== 'CANCELLED';\n});\ncandidates.sort((a, b) => new Date(a.properties.hs_meeting_start_time) - new Date(b.properties.hs_meeting_start_time));\nconst preferred = candidates.find(m => String(m.id) === prev.meetingIdFromPayload);\nconst target = preferred || candidates[0] || null;\nreturn [{ json: {\n  ...prev,\n  hasUpcomingMeeting: !!target,\n  meeting: target ? { id: String(target.id), ...target.properties } : null\n}}];"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        -288,
        0
      ],
      "id": "b72db9a5-b182-429e-9731-494bddadd1ce",
      "name": "Pick Target Meeting"
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 3
          },
          "conditions": [
            {
              "id": "e68fb295-f513-4d69-9f41-a6c51f240c70",
              "leftValue": "={{ $json.hasUpcomingMeeting }}",
              "rightValue": true,
              "operator": {
                "type": "boolean",
                "operation": "equals"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.3,
      "position": [
        -64,
        0
      ],
      "id": "69659873-b4a5-46c6-b889-d7dab8004cb6",
      "name": "Has Upcoming Meeting?"
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://api.hubapi.com/crm/v3/objects/notes/search",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "httpBearerAuth",
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={{ JSON.stringify({ filterGroups: [{ filters: [{ propertyName: 'hs_note_body', operator: 'CONTAINS_TOKEN', value: 'PRECALL' + $json.meeting.id }] }], limit: 1 }) }}",
        "options": {
          "timeout": 30000
        }
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.3,
      "position": [
        160,
        0
      ],
      "id": "c69b6ec5-5542-4e30-bd7d-fde1d81c60fc",
      "name": "Check for Existing Brief",
      "credentials": {
        "httpBearerAuth": {
          "id": "lAToSjxvjYQPjr9Q",
          "name": "Hubspot API"
        }
      }
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 3
          },
          "conditions": [
            {
              "id": "7323fdb6-76f8-40d6-a510-ae7f2d0a901c",
              "leftValue": "={{ $json.total }}",
              "rightValue": 0,
              "operator": {
                "type": "number",
                "operation": "equals"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.3,
      "position": [
        384,
        0
      ],
      "id": "b5718764-95fc-41f8-ae7e-8c4b4641cc32",
      "name": "Not Already Processed?"
    },
    {
      "parameters": {
        "url": "=https://api.hubapi.com/crm/v3/objects/companies/{{ $('Pick Target Meeting').item.json.companyId || '0' }}?properties=name,domain,website,industry,numberofemployees,annualrevenue,country,city,description,linkedin_company_page",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "httpBearerAuth",
        "options": {
          "timeout": 30000
        }
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.3,
      "position": [
        608,
        0
      ],
      "id": "6df94546-13e2-4ce5-8105-7e2ceaac6721",
      "name": "Get Company",
      "credentials": {
        "httpBearerAuth": {
          "id": "lAToSjxvjYQPjr9Q",
          "name": "Hubspot API"
        }
      },
      "onError": "continueRegularOutput"
    },
    {
      "parameters": {
        "url": "=https://api.hubapi.com/crm/v3/objects/deals/{{ $('Pick Target Meeting').item.json.dealId || '0' }}?properties=dealname,dealstage,pipeline,amount,closedate,createdate,hubspot_owner_id",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "httpBearerAuth",
        "options": {
          "timeout": 30000
        }
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.3,
      "position": [
        832,
        0
      ],
      "id": "292ba594-3cb8-4412-81ab-0699386e004c",
      "name": "Get Deal",
      "credentials": {
        "httpBearerAuth": {
          "id": "lAToSjxvjYQPjr9Q",
          "name": "Hubspot API"
        }
      },
      "onError": "continueRegularOutput"
    },
    {
      "parameters": {
        "url": "=https://api.hubapi.com/crm/v3/owners/{{ $('Pick Target Meeting').item.json.meeting.hubspot_owner_id || $('Pick Target Meeting').item.json.contact.hubspot_owner_id || '0' }}",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "httpBearerAuth",
        "options": {
          "timeout": 30000
        }
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.3,
      "position": [
        1056,
        0
      ],
      "id": "531c8d74-10ac-472d-97e5-cdd3b85d979a",
      "name": "Get Rep (Owner)",
      "credentials": {
        "httpBearerAuth": {
          "id": "lAToSjxvjYQPjr9Q",
          "name": "Hubspot API"
        }
      },
      "onError": "continueRegularOutput"
    },
    {
      "parameters": {
        "url": "https://api.factors.ai/v1/journeys",
        "options": {
          "timeout": 30000
        }
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.3,
      "position": [
        1280,
        0
      ],
      "id": "79704bb9-3151-4cdb-adab-615d16179a04",
      "name": "Get Factors Intent Data",
      "disabled": true,
      "onError": "continueRegularOutput"
    },
    {
      "parameters": {
        "jsCode": "// Assemble everything the model is allowed to see. Missing sources become null (never invented).\nconst base = $('Pick Target Meeting').first().json;\nconst grab = (name) => {\n  try {\n    const j = $(name).first().json;\n    if (!j || j.error) return null;\n    return j;\n  } catch (e) { return null; }\n};\nconst companyRes = grab('Get Company');\nconst dealRes = grab('Get Deal');\nconst ownerRes = grab('Get Rep (Owner)');\nconst context = {\n  meeting: base.meeting,\n  contact: { id: base.contactId, ...base.contact },\n  company: companyRes && companyRes.properties ? { id: companyRes.id, ...companyRes.properties } : null,\n  deal: dealRes && dealRes.properties ? { id: dealRes.id, ...dealRes.properties } : null,\n  rep: ownerRes && ownerRes.email ? { email: ownerRes.email, firstName: ownerRes.firstName || '', lastName: ownerRes.lastName || '' } : null\n};\nreturn [{ json: { context, context_json: JSON.stringify(context, null, 2) } }];"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        1504,
        0
      ],
      "id": "af2e1238-4f5b-4527-b01f-d97fc683f472",
      "name": "Gather Pre-Call Context"
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "=Prepare a pre-call brief for the assigned rep using ONLY this CRM data (JSON):\n\n{{ $json.context_json }}",
        "hasOutputParser": true,
        "options": {
          "systemMessage": "You are a GTM research analyst at Atlas HXM, a global Employer of Record (EOR) that helps companies hire and manage employees in 160+ countries through a 100% direct EOR model. You produce pre-call briefs for Atlas sales reps ahead of external meetings.\n\nSTRICT GROUNDING RULES:\n- Use ONLY facts present in the provided JSON. Never invent names, numbers, news, intent data, or company details.\n- If a field is null, missing, or empty in the CRM data, do not mention it in the brief text. Record genuine gaps in risk_flags instead (e.g. \"No deal associated with this contact yet\").\n- ALWAYS return every JSON key in the schema. If a list has no content, return an empty array []. If a string has no content, return \"\". NEVER omit a key.\n- Do not speculate about the company beyond the provided data.\n- Keep it tight: reps read this on their phone minutes before the call.\n\nOUTPUT — respond ONLY with valid JSON matching the schema:\n- email_subject: \"Pre-Call Brief: {contact name} @ {company} — {meeting title or day/time}\". Skip segments you don't have data for, but always include the key.\n- summary_paragraph: ONE short paragraph (max 4 sentences) covering who the rep is meeting, the company, and where the deal stands.\n- key_points: 3-6 short factual bullets (contact role, company size/industry/geography, deal stage and amount, any message the contact submitted, meeting context).\n- talking_points: 2-4 suggested angles for the rep, connecting the specific data provided to Atlas EOR strengths (global hiring in 160+ countries, direct EOR model, compliance, global payroll). Only reference data that exists.\n- risk_flags: data gaps or risks the rep should know before the call.\n- hubspot_note_body: plain-text version of the full brief (no HTML, use simple line breaks and dashes)."
        }
      },
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 3,
      "position": [
        1728,
        0
      ],
      "id": "da51436e-5e73-47f4-a493-05568a245e99",
      "name": "Draft Pre-Call Brief",
      "retryOnFail": true,
      "maxTries": 2,
      "onError": "continueRegularOutput"
    },
    {
      "parameters": {
        "model": "gpt-4o-mini",
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.lmChatAzureOpenAi",
      "typeVersion": 1,
      "position": [
        1664,
        224
      ],
      "id": "b773bc41-7789-4470-b85e-c71993e37092",
      "name": "Azure OpenAI Chat Model",
      "credentials": {
        "azureOpenAiApi": {
          "id": "wPtjoDFwCbv9eRl4",
          "name": "gpt-4o-mini"
        }
      }
    },
    {
      "parameters": {
        "schemaType": "manual",
        "inputSchema": "{\n  \"type\": \"object\",\n  \"properties\": {\n    \"email_subject\": {\n      \"type\": \"string\",\n      \"description\": \"Pre-Call Brief: {contact} @ {company} - {meeting title or day/time}\"\n    },\n    \"summary_paragraph\": {\n      \"type\": \"string\",\n      \"description\": \"One short paragraph, max 4 sentences, grounded in the CRM data\"\n    },\n    \"key_points\": {\n      \"type\": \"array\",\n      \"items\": {\n        \"type\": \"string\"\n      },\n      \"description\": \"3-6 factual bullets taken directly from the CRM data\"\n    },\n    \"talking_points\": {\n      \"type\": \"array\",\n      \"items\": {\n        \"type\": \"string\"\n      },\n      \"description\": \"2-4 suggested angles for the rep grounded in the data\"\n    },\n    \"risk_flags\": {\n      \"type\": \"array\",\n      \"items\": {\n        \"type\": \"string\"\n      },\n      \"description\": \"Data gaps or risks the rep should know\"\n    },\n    \"hubspot_note_body\": {\n      \"type\": \"string\",\n      \"description\": \"Plain-text version of the brief\"\n    }\n  },\n  \"required\": [\n    \"email_subject\",\n    \"summary_paragraph\",\n    \"hubspot_note_body\"\n  ]\n}",
        "autoFix": true
      },
      "type": "@n8n/n8n-nodes-langchain.outputParserStructured",
      "typeVersion": 1.3,
      "position": [
        1888,
        224
      ],
      "id": "e213cb6f-e19c-4f1b-b1d2-804b9f43fdd5",
      "name": "Structured Output Parser"
    },
    {
      "parameters": {
        "jsCode": "// Build a plain-text email + HubSpot note (with dedup marker) from the agent output\nconst raw = $json.output || $json;\nconst ctx = $('Gather Pre-Call Context').first().json.context;\nlet when = 'Time TBD';\nif (ctx.meeting && ctx.meeting.hs_meeting_start_time) {\n  when = new Date(ctx.meeting.hs_meeting_start_time).toLocaleString('en-US', { timeZone: 'America/Chicago', weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) + ' CT';\n}\nconst contactName = [ctx.contact.firstname, ctx.contact.lastname].filter(Boolean).join(' ') || ctx.contact.email || 'Contact';\nconst companyName = ctx.company ? (ctx.company.name || ctx.company.domain || '') : '';\nconst subject = raw.email_subject || `Pre-Call Brief: ${contactName}${companyName ? ' @ ' + companyName : ''} — ${when}`;\nconst marker = `PRECALL${ctx.meeting.id}`;\nconst section = (title, arr) => {\n  if (!arr || !arr.length) return '';\n  return `\\n${title.toUpperCase()}\\n` + arr.map(b => `- ${b}`).join('\\n') + '\\n';\n};\nconst email_text = [\n  `PRE-CALL BRIEF`,\n  `${contactName}${companyName ? ' | ' + companyName : ''} | ${when}`,\n  ``,\n  raw.summary_paragraph || '',\n  section('Key Points', raw.key_points),\n  section('Talking Points', raw.talking_points),\n  section('Watch Outs', raw.risk_flags),\n  `Automated pre-call brief | Atlas HXM GTM AI | ref ${marker}`\n].join('\\n');\nconst hubspot_note_body = `PRE-CALL BRIEF (automated)\\n\\n${raw.hubspot_note_body || raw.summary_paragraph || ''}\\n\\n[ref ${marker}]`;\nreturn [{ json: {\n  email_subject: subject,\n  email_text,\n  hubspot_note_body,\n  contact_id: ctx.contact.id,\n  rep_email: ctx.rep && ctx.rep.email ? ctx.rep.email : ''\n}}];"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        2064,
        0
      ],
      "id": "f6462964-eb99-452f-b808-67bda3ac5ea0",
      "name": "Format Pre-Call Email"
    },
    {
      "parameters": {
        "toRecipients": "={{ $json.rep_email ? $json.rep_email + ', pdiamitani@atlashxm.com' : 'pdiamitani@atlashxm.com' }}",
        "subject": "={{ $json.email_subject }}",
        "bodyContent": "={{ $json.email_text }}",
        "additionalFields": {
          "bodyContentType": "text"
        }
      },
      "type": "n8n-nodes-base.microsoftOutlook",
      "typeVersion": 2,
      "position": [
        2496,
        -96
      ],
      "id": "d9d9953c-bb9e-4950-834d-3ae36046ecd1",
      "name": "Send Email to Rep",
      "webhookId": "078a5038-9883-4f85-be10-e6144e7eb8ce",
      "credentials": {
        "microsoftOutlookOAuth2Api": {
          "id": "UlScp1yx4jDk16u3",
          "name": "Nick Marshall Outlook"
        }
      },
      "disabled": true
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://api.hubapi.com/crm/v3/objects/notes",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "httpBearerAuth",
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={{ JSON.stringify({ properties: { hs_timestamp: Date.now(), hs_note_body: $json.hubspot_note_body }, associations: [{ to: { id: $json.contact_id }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }] }] }) }}",
        "options": {
          "timeout": 30000
        }
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.3,
      "position": [
        2496,
        96
      ],
      "id": "dc5e4411-7ab2-410e-a7f8-f981a64930f8",
      "name": "Create HubSpot Note",
      "credentials": {
        "httpBearerAuth": {
          "id": "lAToSjxvjYQPjr9Q",
          "name": "Hubspot API"
        }
      },
      "disabled": true
    },
    {
      "parameters": {
        "method": "PATCH",
        "url": "=https://api.hubapi.com/crm/v3/objects/contacts/{{ $json.contact_id }}",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "httpBearerAuth",
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={{ JSON.stringify({ properties: { pre_call_notes: $json.hubspot_note_body } }) }}",
        "options": {
          "timeout": 30000
        }
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.3,
      "position": [
        2496,
        288
      ],
      "id": "2de0f2a5-0851-4856-a241-b7120ca93d86",
      "name": "Update Pre-Call Notes Property",
      "credentials": {
        "httpBearerAuth": {
          "id": "lAToSjxvjYQPjr9Q",
          "name": "Hubspot API"
        }
      },
      "disabled": true,
      "onError": "continueRegularOutput"
    },
    {
      "parameters": {
        "content": "## Pre-Sales Call Automation v1\n**Trigger:** HubSpot workflow webhook when a new external meeting with an associated contact is booked.\n**Output:** concise pre-call brief emailed to the assigned rep + logged as a HubSpot note on the contact.\n\n**Flow:** Webhook → resolve contact → find upcoming meeting → dedup guardrail → pull company/deal/owner → AI brief (grounded, no hallucination) → email rep + HubSpot note.\n\nBuilt 7/7/26 from the Post Sales Call Automation patterns (same credentials).",
        "height": 320,
        "width": 560
      },
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [
        -2144,
        -384
      ],
      "id": "a310f5af-4cec-462e-bd8e-b89b9bab3512",
      "name": "Sticky Note 25"
    },
    {
      "parameters": {
        "content": "## HubSpot setup\nPoint the HubSpot workflow webhook action at:\n\n**Production:** `https://atlas-hxm.app.n8n.cloud/webhook/8aacbd05-b0bb-498d-a209-4ab8fa8fefcb`\n**Test:** `https://atlas-hxm.app.n8n.cloud/webhook-test/8aacbd05-b0bb-498d-a209-4ab8fa8fefcb`\n\nPayload supported:\n- Contact-based workflow: body includes `vid` (like Post-Sales flow)\n- Meeting-based workflow: body includes `objectId` + `objectTypeId: '0-47'`",
        "height": 320,
        "width": 520,
        "color": 4
      },
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [
        -1552,
        -384
      ],
      "id": "edacae66-75a5-4e97-a901-03939c6e7059",
      "name": "Sticky Note 26"
    },
    {
      "parameters": {
        "content": "## Dedup guardrail\nEvery brief embeds a `PRECALL<meetingId>` marker in the HubSpot note.\nBefore generating, we search notes for that marker — if found, the run stops.\nThis makes it safe to trigger instantly on booking without repeating briefs.",
        "height": 220,
        "width": 460,
        "color": 5
      },
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [
        96,
        -288
      ],
      "id": "d7649e1a-c663-4699-8193-de3dfbb9bbcc",
      "name": "Sticky Note 27"
    },
    {
      "parameters": {
        "content": "## Not yet wired\n- **Get Factors Intent Data** (disabled): enable once Factors.ai API credential + Journey endpoint are confirmed.\n- **Update Pre-Call Notes Property** (disabled): verify the contact property internal name (`pre_call_notes`) exists in HubSpot before enabling.\n- No web search (out of scope per project brief).",
        "height": 260,
        "width": 520,
        "color": 3
      },
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [
        1232,
        -320
      ],
      "id": "4dd320c3-e79b-4f4d-9031-e87fa92a7a7e",
      "name": "Sticky Note 28"
    },
    {
      "parameters": {
        "content": "## Testing mode\nWorkflow ships **inactive**. Rep email + pdiamitani@atlashxm.com are both recipients.\nTo test: activate, book a test meeting on a test contact, confirm email + note, check execution data.",
        "height": 200,
        "width": 460,
        "color": 6
      },
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [
        2224,
        -320
      ],
      "id": "34d2b7fd-e0c9-4c15-af1a-6f37aa97b128",
      "name": "Sticky Note 29"
    },
    {
      "parameters": {
        "toRecipients": "pdiamitani@atlashxm.com",
        "subject": "={{ $json.email_subject }}",
        "bodyContent": "={{ $json.email_text }}",
        "additionalFields": {
          "bodyContentType": "text"
        }
      },
      "type": "n8n-nodes-base.microsoftOutlook",
      "typeVersion": 2,
      "position": [
        2240,
        -128
      ],
      "id": "5e1b752b-0ff3-4dd3-b22b-3c4eedf78e65",
      "name": "Send a message",
      "webhookId": "daf82714-0f0a-4572-83d0-ac2e532ae490",
      "credentials": {
        "microsoftOutlookOAuth2Api": {
          "id": "ctizexFzQop7Y1XP",
          "name": "pdiamitani@atlashxm.com"
        }
      }
    }
  ],
  "pinData": {},
  "connections": {
    "Webhook": {
      "main": [
        [
          {
            "node": "Normalize Payload",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Normalize Payload": {
      "main": [
        [
          {
            "node": "Has Contact ID?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Has Contact ID?": {
      "main": [
        [
          {
            "node": "Get Contact",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Get Meeting Contacts",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get Meeting Contacts": {
      "main": [
        [
          {
            "node": "Adopt Meeting Contact",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Adopt Meeting Contact": {
      "main": [
        [
          {
            "node": "Get Contact",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get Contact": {
      "main": [
        [
          {
            "node": "Extract Associations",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Extract Associations": {
      "main": [
        [
          {
            "node": "Has Meetings?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Has Meetings?": {
      "main": [
        [
          {
            "node": "Batch Read Meetings",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Batch Read Meetings": {
      "main": [
        [
          {
            "node": "Pick Target Meeting",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Pick Target Meeting": {
      "main": [
        [
          {
            "node": "Has Upcoming Meeting?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Has Upcoming Meeting?": {
      "main": [
        [
          {
            "node": "Check for Existing Brief",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Check for Existing Brief": {
      "main": [
        [
          {
            "node": "Not Already Processed?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Not Already Processed?": {
      "main": [
        [
          {
            "node": "Get Company",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get Company": {
      "main": [
        [
          {
            "node": "Get Deal",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get Deal": {
      "main": [
        [
          {
            "node": "Get Rep (Owner)",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get Rep (Owner)": {
      "main": [
        [
          {
            "node": "Get Factors Intent Data",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get Factors Intent Data": {
      "main": [
        [
          {
            "node": "Gather Pre-Call Context",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Gather Pre-Call Context": {
      "main": [
        [
          {
            "node": "Draft Pre-Call Brief",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Azure OpenAI Chat Model": {
      "ai_languageModel": [
        [
          {
            "node": "Draft Pre-Call Brief",
            "type": "ai_languageModel",
            "index": 0
          },
          {
            "node": "Structured Output Parser",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    },
    "Structured Output Parser": {
      "ai_outputParser": [
        [
          {
            "node": "Draft Pre-Call Brief",
            "type": "ai_outputParser",
            "index": 0
          }
        ]
      ]
    },
    "Draft Pre-Call Brief": {
      "main": [
        [
          {
            "node": "Format Pre-Call Email",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Format Pre-Call Email": {
      "main": [
        [
          {
            "node": "Create HubSpot Note",
            "type": "main",
            "index": 0
          },
          {
            "node": "Update Pre-Call Notes Property",
            "type": "main",
            "index": 0
          },
          {
            "node": "Send a message",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Send a message": {
      "main": [
        [
          {
            "node": "Send Email to Rep",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": false,
  "settings": {
    "executionOrder": "v1",
    "saveDataErrorExecution": "all",
    "saveDataSuccessExecution": "all",
    "saveExecutionProgress": true,
    "saveManualExecutions": true,
    "callerPolicy": "workflowsFromSameOwner",
    "availableInMCP": false
  },
  "versionId": "b136f37e-d490-4abf-b2e6-10fef5e94f60",
  "meta": {
    "templateCredsSetupCompleted": true,
    "instanceId": "da98df5c5d7ca09b34ad4f795244e87a7663d8722c18682c2021c70624938526"
  },
  "id": "ZNJ1FhOieG8qdWKp",
  "tags": []
}
