---
name: agsprospectautomation
description: Process/Note derived from AGS_PROSPECT_AUTOMATION.json
source_path: Atlas Portfolio/Portfolio/AGS_PROSPECT_AUTOMATION.json
---

# AGS_PROSPECT_AUTOMATION.json

## Context
This skill provides knowledge, processes, and instructions derived from the document: `AGS_PROSPECT_AUTOMATION.json`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

{
  "name": "AGS_PROSPECT_AUTOMATION",
  "nodes": [
    {
      "parameters": {
        "method": "POST",
        "url": "https://api.hubapi.com/crm/v3/objects/companies/search",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "hubspotOAuth2Api",
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"filterGroups\": [\n    {\n      \"filters\": [\n        {\n          \"propertyName\": \"zoominfo___most_recent_workflow_date\",\n          \"operator\": \"GTE\",\n          \"value\": {{ $node[\"Set Yesterday Range\"].json.startTs }}\n        },\n        {\n          \"propertyName\": \"zoominfo___most_recent_workflow_date\",\n          \"operator\": \"LTE\",\n          \"value\": {{ $node[\"Set Yesterday Range\"].json.endTs }}\n        }\n      ]\n    },\n    {\n      \"filters\": [\n        {\n          \"propertyName\": \"factors_abm__workflow_date\",\n          \"operator\": \"GTE\",\n          \"value\": {{ $node[\"Set Yesterday Range\"].json.startTs }}\n        },\n        {\n          \"propertyName\": \"factors_abm__workflow_date\",\n          \"operator\": \"LTE\",\n          \"value\": {{ $node[\"Set Yesterday Range\"].json.endTs }}\n        }\n      ]\n    }\n  ],\n  \"limit\": 200,\n  \"properties\": [\n    \"name\",\n    \"zoominfo___most_recent_workflow_date\",\n    \"factors_abm__workflow_date\",\n    \"domain\",\n    \"hubspot_owner_id\",\n    \"createdate\",\n    \"zoominfo___most_recent_workflow\",\n    \"num_associated_deals\",\n    \"num_associated_contacts\",\n    \"tickets_associated\",\n    \"hs_last_sales_activity_timestamp\",\n    \"company_size_segmentation\",\n    \"numberofemployees\",\n    \"founded_year\",\n    \"industry\",\n    \"industry___naics_code__2_digit_\",\n    \"industry___naics_label___2_digit_\",\n    \"linkedin_company_page\",\n    \"state\",\n    \"select_state_province\",\n    \"country\",\n    \"country__c\",\n    \"lifecyclestage\",\n    \"notes_last_updated\",\n    \"type\",\n    \"intent_type\",\n    \"website\",\n    \"domain\"\n  ]\n}\n",
        "options": {}
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.3,
      "position": [
        224,
        1424
      ],
      "id": "a2c8e8dc-d214-45e1-af87-ea73c40a2eb9",
      "name": "Get HubSpot Companies - Intent",
      "credentials": {
        "hubspotOAuth2Api": {
          "id": "SZUmgKBPA7DV3rOs",
          "name": "HubSpot"
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
            "version": 2
          },
          "conditions": [
            {
              "id": "ee607974-c0ae-4430-84f6-496c5a19d531",
              "leftValue": "={{ $json.properties.num_associated_deals }}",
              "rightValue": "=",
              "operator": {
                "type": "string",
                "operation": "notExists",
                "singleValue": true
              }
            }
          ],
          "combinator": "or"
        },
        "options": {}
      },
      "type": "n8n-nodes-base.filter",
      "typeVersion": 2.2,
      "position": [
        1104,
        1424
      ],
      "id": "946cf1f8-2bc9-422b-8c47-a91263fb6d04",
      "name": "Filter - 0 associated deals"
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 2
          },
          "conditions": [
            {
              "id": "e3458b4e-9991-4708-9a68-63e67dd36258",
              "leftValue": "={{$json.properties.lifecyclestage}}",
              "rightValue": "=customer",
              "operator": {
                "type": "string",
                "operation": "notEquals"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "type": "n8n-nodes-base.filter",
      "typeVersion": 2.2,
      "position": [
        1328,
        1424
      ],
      "id": "0df37fc9-30b9-411a-b907-62cfa2e726d0",
      "name": "Filter - Lifecycle stage"
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 2
          },
          "conditions": [
            {
              "id": "555e8ce5-84e7-4311-ad79-1b01d067c7a7",
              "leftValue": "={{ $json.properties.type}}",
              "rightValue": "Customer",
              "operator": {
                "type": "string",
                "operation": "notEquals"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "type": "n8n-nodes-base.filter",
      "typeVersion": 2.2,
      "position": [
        1552,
        1424
      ],
      "id": "480e44f1-5f5f-454c-909c-48ed6937da98",
      "name": "Filter - type"
    },
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "triggerAtHour": 7
            }
          ]
        }
      },
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1.2,
      "position": [
        -224,
        1424
      ],
      "id": "82636cf3-a33d-45a7-9f02-40a35f4263ab",
      "name": "Schedule Trigger"
    },
    {
      "parameters": {
        "jsCode": "// ---- n8n Code node â€“ â€œSet Yesterday Rangeâ€ ----\nconst now = new Date();\n\n// ---- start of yesterday (00:00:00.000) ----\nconst start = new Date(\n  now.getFullYear(),\n  now.getMonth(),\n  now.getDate() - 7,   // yesterday\n  0, 0, 0, 0\n);\n\n// ---- end of yesterday (23:59:59.999) ----\nconst end = new Date(start);\nend.setHours(23, 59, 59, 999);\n\nreturn [\n  {\n    json: {\n      startTs: start.getTime(),\n      endTs:   end.getTime(),\n    },\n  },\n];"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        0,
        1424
      ],
      "id": "ed37db4f-270a-428c-b7e8-4b0da8bd645f",
      "name": "Set Yesterday Range"
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "b5315f38-bdec-43c1-b133-2ec6ab0eb272",
              "name": "assigned_owner_email",
              "value": "={{ $json.assigned_owner_email }}",
              "type": "string"
            },
            {
              "id": "9591d510-a9b4-4d42-973f-06e0350dec26",
              "name": "assigned_owner_name",
              "value": "={{ $json.assigned_owner_name }}",
              "type": "string"
            },
            {
              "id": "630d616f-2543-4607-aad5-a02ff8d48178",
              "name": "company_domain",
              "value": "={{ $json.company_domain }}",
              "type": "string"
            },
            {
              "id": "a848d40e-1ead-4918-806f-1c3018a016a8",
              "name": "intent_type",
              "value": "={{ $json.intent_type }}",
              "type": "string"
            },
            {
              "id": "1f7fdd31-c45d-4f32-b2b3-dc65a3db4404",
              "name": "company_linkedin_url",
              "value": "={{ $json.company_linkedin_url }}",
              "type": "string"
            },
            {
              "id": "00a79e36-8693-4843-aad5-f3c1e51e71d0",
              "name": "hubspot_owner_id",
              "value": "={{ $json.hubspot_owner_id }}",
              "type": "string"
            },
            {
              "id": "aafc1c6b-3510-45df-b359-0a4eab0ecf07",
              "name": "company_state",
              "value": "={{ $json.company_state }}",
              "type": "string"
            },
            {
              "id": "22e7b158-02df-43c9-b5bf-1c05beaf9a60",
              "name": "company_id",
              "value": "={{ $json.company_id }}",
              "type": "string"
            },
            {
              "id": "6cb08bd6-b1e2-4574-9325-ffc2ad39461e",
              "name": "company_name",
              "value": "={{ $json.company_name }}",
              "type": "string"
            },
            {
              "id": "07602c58-3005-4744-8667-b6e716a06100",
              "name": "raw_company_state",
              "value": "={{ $json.raw_company_state }}",
              "type": "string"
            },
            {
              "id": "2ffb5a39-e085-48e3-a019-27ffad78cd9d",
              "name": "normalized_country",
              "value": "={{ $json.normalized_country }}",
              "type": "string"
            },
            {
              "id": "ebf143ce-57f8-491f-9a54-d02ed55ef5e7",
              "name": "properties.industry",
              "value": "={{ $('ICP Filter - Schools & Governments').item.json.properties.industry }}",
              "type": "string"
            },
            {
              "id": "9a445df1-2088-46c3-b4ff-e20cfa81bd4b",
              "name": "properties.numberofemployees",
              "value": "={{ $('remove competitors').item.json.properties.numberofemployees }}",
              "type": "string"
            },
            {
              "id": "640e4ec7-b29f-4f42-9017-3e29ee8ec189",
              "name": "properties.company_size_segmentation",
              "value": "={{ $('remove competitors').item.json.properties.company_size_segmentation }}",
              "type": "string"
            },
            {
              "id": "11cd181d-f2b2-4620-8044-9a6efd47fa2c",
              "name": "results[0].properties.zoominfo___most_recent_workflow",
              "value": "={{ $('Get HubSpot Companies - Intent').item.json.results[0].properties.zoominfo___most_recent_workflow }}",
              "type": "string"
            },
            {
              "id": "c7489573-28f7-46fd-80eb-16c1c58f4c49",
              "name": "results[0].properties.zoominfo___most_recent_workflow_date",
              "value": "={{ $('Get HubSpot Companies - Intent').item.json.results[0].properties.zoominfo___most_recent_workflow_date }}",
              "type": "string"
            },
            {
              "id": "fd10397b-8b27-44cf-900c-35f102150fef",
              "name": "results[0].properties.factors_abm__workflow_date",
              "value": "={{ $('Get HubSpot Companies - Intent').item.json.results[0].properties.factors_abm__workflow_date }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        2768,
        1424
      ],
      "id": "f4ff3e6e-f952-45e7-af9d-7a2c78e256d4",
      "name": "Edit Fields"
    },
    {
      "parameters": {
        "fieldToSplitOut": "results",
        "options": {}
      },
      "type": "n8n-nodes-base.splitOut",
      "typeVersion": 1,
      "position": [
        448,
        1424
      ],
      "id": "3b001c80-5519-4b6c-8045-041426b19fa2",
      "name": "Split Each Company"
    },
    {
      "parameters": {
        "jsCode": "// ============================================================\n// HubSpot Company Round Robin Assignment — FULL VERSION\n// Includes intent_type + company_domain + company_linkedin_url\n// UPDATED: Fixed US West/Midwest/Northeast Routing\n// ============================================================\n\nconst items = $input.all();\nconst output = [];\n\n// -------------------------------\n// Normalization helpers\n// -------------------------------\nfunction normalize(value) {\n  if (value === undefined || value === null) return \"\";\n  const s = String(value).trim().toLowerCase();\n  if (!s) return \"\";\n  return s.replace(/\\./g, \"\").replace(/\\s+/g, \" \");\n}\n\nconst locMap = {\n  al: \"alabama\", ak: \"alaska\", az: \"arizona\", ar: \"arkansas\", ca: \"california\",\n  co: \"colorado\", ct: \"connecticut\", de: \"delaware\", fl: \"florida\", ga: \"georgia\",\n  hi: \"hawaii\", id: \"idaho\", il: \"illinois\", in: \"indiana\", ia: \"iowa\",\n  ks: \"kansas\", ky: \"kentucky\", la: \"louisiana\", me: \"maine\", md: \"maryland\",\n  ma: \"massachusetts\", mi: \"michigan\", mn: \"minnesota\", ms: \"mississippi\", mo: \"missouri\",\n  mt: \"montana\", ne: \"nebraska\", nv: \"nevada\", nh: \"new hampshire\", nj: \"new jersey\",\n  nm: \"new mexico\", ny: \"new york\", nc: \"north carolina\", nd: \"north dakota\", oh: \"ohio\",\n  ok: \"oklahoma\", or: \"oregon\", pa: \"pennsylvania\", ri: \"rhode island\", sc: \"south carolina\",\n  sd: \"south dakota\", tn: \"tennessee\", tx: \"texas\", ut: \"utah\", vt: \"vermont\",\n  va: \"virginia\", wa: \"washington\", wv: \"west virginia\", wi: \"wisconsin\", wy: \"wyoming\",\n  dc: \"district of columbia\",\n  pr: \"puerto rico\",\n  vi: \"virgin islands\",\n  ab: \"alberta\", bc: \"british columbia\", mb: \"manitoba\",\n  on: \"ontario\", qc: \"quebec\", sk: \"saskatchewan\",\n  usa: \"united states\",\n  us: \"united states\",\n  uk: \"united kingdom\",\n  uae: \"united arab emirates\"\n};\n\nfunction normalizeLocation(value) {\n  const v = normalize(value);\n  if (!v) return \"\";\n  return locMap[v] ?? v;\n}\n\n// -------------------------------\n// Location extraction\n// -------------------------------\nfunction getLocationParts(company) {\n  const p = company.properties || {};\n\n  const raw_select_state_province = p.select_state_province ?? \"\";\n  const raw_state = p.state ?? company.state ?? \"\";\n\n  const raw_country__c = p.country__c ?? \"\";\n  const raw_country = p.country ?? company.country ?? \"\";\n\n  const raw_region__c = p.region__c ?? \"\";\n  const raw_region = p.region ?? company.region ?? \"\";\n\n  const state = normalizeLocation(raw_select_state_province || raw_state);\n  const country = normalizeLocation(raw_country__c || raw_country);\n  const region = normalizeLocation(raw_region__c || raw_region);\n\n  return {\n    state,\n    country,\n    region,\n    raw_select_state_province,\n    raw_state,\n    raw_country__c,\n    raw_country,\n    raw_region__c,\n    raw_region,\n  };\n}\n\n// -------------------------------\n// PODS\n// -------------------------------\nconst pods = {\n  \"US - Midwest (Emily)\": [\n    { name: \"Emily Reynolds\", id: \"79810165\", email: \"emilyr@atlashxm.com\" },\n  ],\n  \"US - West (Amanda)\": [\n    { name: \"Amanda Barcelona\", id: \"90305036\", email: \"amandab@atlashxm.com\" },\n  ],\n  \"US - Northeast (Patrick)\": [\n    { name: \"Patrick Magnotta\", id: \"268037023\", email: \"patrickm@atlashxm.com\" },\n  ],\n  \"US - South/Central (James)\": [\n    { name: \"James Apps\", id: \"754496064\", email: \"jamesa@atlashxm.com\" },\n  ],\n  \"EMEA + Canada (Chiara/James)\": [\n    { name: \"Chiara Navigante\", id: \"732232099\", email: \"chiaran@atlashxm.com\" },\n    { name: \"James Apps\", id: \"754496064\", email: \"jamesa@atlashxm.com\" },\n  ],\n  \"Global - Unmapped (James)\": [\n    { name: \"James Apps\", id: \"754496064\", email: \"jamesa@atlashxm.com\" },\n  ],\n};\n\nconst rr = Object.fromEntries(Object.keys(pods).map(k => [k, 0]));\n\nfunction pickRep(podName) {\n  const group = pods[podName];\n  if (!group || group.length === 0) return pods[\"Global - Unmapped (James)\"][0];\n  if (group.length === 1) return group[0];\n  const idx = rr[podName] % group.length;\n  rr[podName] = (rr[podName] + 1) % group.length;\n  return group[idx];\n}\n\n// -------------------------------\n// Territory Sets (UPDATED)\n// -------------------------------\nconst westStates = new Set([\"california\", \"oregon\", \"washington\", \"nevada\", \"idaho\", \"utah\", \"arizona\", \"montana\", \"wyoming\", \"colorado\", \"new mexico\", \"alaska\", \"hawaii\"]);\nconst midwestStates = new Set([\"north dakota\", \"south dakota\", \"nebraska\", \"kansas\", \"minnesota\", \"iowa\", \"missouri\", \"wisconsin\", \"illinois\", \"michigan\", \"indiana\", \"ohio\"]);\nconst northeastStates = new Set([\"maine\", \"new hampshire\", \"vermont\", \"massachusetts\", \"rhode island\", \"connecticut\", \"new york\", \"pennsylvania\", \"new jersey\"]);\nconst southCentralStates = new Set([\"texas\", \"oklahoma\", \"arkansas\", \"louisiana\", \"mississippi\", \"alabama\", \"tennessee\", \"kentucky\", \"west virginia\", \"maryland\", \"delaware\", \"virginia\", \"north carolina\", \"south carolina\", \"georgia\", \"florida\", \"district of columbia\", \"puerto rico\", \"virgin islands\"]);\n\nfunction resolveAssignment({ state, country }) {\n\n  // 1. Canada Check\n  if (country === \"canada\") {\n    return { pod: \"EMEA + Canada (Chiara/James)\", territory: \"Canada\" };\n  }\n\n  // 2. US Check\n  const isUSCountry = (country === \"united states\");\n  \n  if (isUSCountry || westStates.has(state) || midwestStates.has(state) || northeastStates.has(state) || southCentralStates.has(state)) {\n    if (westStates.has(state)) {\n      return { pod: \"US - West (Amanda)\", territory: \"US\" };\n    }\n    if (midwestStates.has(state)) {\n      return { pod: \"US - Midwest (Emily)\", territory: \"US\" };\n    }\n    if (northeastStates.has(state)) {\n      return { pod: \"US - Northeast (Patrick)\", territory: \"US\" };\n    }\n    // Default to James for South/Central or if state is unknown/missing but country is US\n    return { pod: \"US - South/Central (James)\", territory: \"US\" };\n  }\n\n  // 3. International/Global Catch-all\n  return { pod: \"Global - Unmapped (James)\", territory: \"Global\" };\n}\n\n// -------------------------------\n// Process Items\n// -------------------------------\nfor (const item of items) {\n\n  const company = item.json || {};\n  const props = company.properties || {};\n\n  const companyId = company.id || props.hs_object_id || \"\";\n  const companyName = props.name || props.company_name || \"\";\n\n  const loc = getLocationParts(company);\n  const match = resolveAssignment(loc);\n  const rep = pickRep(match.pod);\n\n  output.push({\n    json: {\n      company_id: String(companyId),\n      company_name: String(companyName),\n\n      intent_type: String(props.intent_type ?? \"\"),\n      company_domain: String(props.domain ?? \"\"),\n      company_linkedin_url: String(props.linkedin_company_page ?? \"\"),\n\n      company_state: loc.state,\n      company_country: loc.country,\n      company_region: loc.region,\n\n      hubspot_owner_id: String(rep.id),\n      assigned_owner_name: rep.name,\n      assigned_owner_email: rep.email,\n\n      assigned_pod: match.pod,\n      territory: match.territory,\n      assignment_date: new Date().toISOString(),\n\n      normalized_state: loc.state,\n      normalized_country: loc.country,\n      normalized_region: loc.region,\n\n      raw_company_state: loc.raw_select_state_province || loc.raw_state || \"\",\n      raw_company_country: loc.raw_country__c || loc.raw_country || \"\",\n      raw_company_region: loc.raw_region__c || loc.raw_region || \"\",\n    }\n  });\n}\n\nreturn output;"
      },
      "id": "9fa6373a-22c7-4c62-961c-c136781968a7",
      "name": "Round Robin Assignment -all",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        2448,
        1424
      ]
    },
    {
      "parameters": {
        "jsCode": "// ----------------------------------------------------\n// FILTER OUT APAC ONLY (allow everything else)\n// v2 — Added domain TLD, domain keyword, and company\n//       name detection for records with empty location fields\n// Includes explicit overrides to KEEP all US territories\n// ----------------------------------------------------\n\n// -------------------------------\n// NORMALIZATION\n// -------------------------------\nfunction normalize(value) {\n  if (!value) return null;\n  return value\n    .toString()\n    .trim()\n    .toLowerCase()\n    .replace(/\\./g, \"\")      // remove periods (U.S.)\n    .replace(/\\s+/g, \" \");   // collapse whitespace\n}\n\n// -------------------------------\n// US TERRITORIES OVERRIDE (KEEP)\n// -------------------------------\nconst usTerritories = new Set([\n  \"puerto rico\",\n  \"virgin islands\",\n  \"us virgin islands\",\n  \"u s virgin islands\",\n  \"u.s. virgin islands\",\n  \"guam\",\n  \"american samoa\",\n  \"northern mariana islands\",\n  \"commonwealth of the northern mariana islands\",\n  \"united states minor outlying islands\",\n  \"district of columbia\",\n]);\n\n// -------------------------------\n// APAC REGION KEYWORDS (EXCLUDE)\n// (avoid generic \"asia\" because it would catch Middle East)\n// -------------------------------\nconst apacRegionKeywords = [\n  \"apac\",\n  \"asia pacific\",\n  \"asia-pacific\",\n  \"australasia\",\n  \"oceania\",\n];\n\n// -------------------------------\n// APAC COUNTRIES / AREAS (EXCLUDE)\n// (but US territories in the Pacific are NOT listed here)\n// -------------------------------\nconst apacCountries = new Set([\n  // East Asia\n  \"china\",\n  \"hong kong\",\n  \"macau\",\n  \"taiwan\",\n  \"japan\",\n  \"south korea\",\n  \"republic of korea\",\n  \"north korea\",\n  \"democratic people's republic of korea\",\n  \"mongolia\",\n\n  // Southeast Asia\n  \"myanmar\",\n  \"burma\",\n  \"thailand\",\n  \"vietnam\",\n  \"cambodia\",\n  \"laos\",\n  \"lao people's democratic republic\",\n  \"malaysia\",\n  \"singapore\",\n  \"indonesia\",\n  \"philippines\",\n  \"brunei\",\n  \"brunei darussalam\",\n  \"timor-leste\",\n  \"east timor\",\n\n  // South Asia\n  \"india\",\n  \"pakistan\",\n  \"bangladesh\",\n  \"sri lanka\",\n  \"nepal\",\n  \"bhutan\",\n  \"maldives\",\n  \"afghanistan\",\n\n  // Oceania / Pacific (non-US territories)\n  \"australia\",\n  \"new zealand\",\n  \"papua new guinea\",\n  \"fiji\",\n  \"solomon islands\",\n  \"vanuatu\",\n  \"samoa\",\n  \"tonga\",\n  \"kiribati\",\n  \"micronesia\",\n  \"federated states of micronesia\",\n  \"marshall islands\",\n  \"palau\",\n  \"nauru\",\n  \"tuvalu\",\n  \"cook islands\",\n  \"niue\",\n  \"tokelau\",\n  \"french polynesia\",\n  \"new caledonia\",\n]);\n\n// Common 2-letter codes that sometimes appear in \"country\" fields\nconst apacCountryCodes = new Set([\n  \"au\", \"nz\", \"cn\", \"jp\", \"kr\", \"kp\", \"tw\", \"hk\", \"mo\", \"mn\",\n  \"in\", \"pk\", \"bd\", \"lk\", \"np\", \"bt\", \"mv\", \"af\",\n  \"mm\", \"th\", \"vn\", \"kh\", \"la\", \"my\", \"sg\", \"id\", \"ph\", \"bn\", \"tl\",\n  \"pg\", \"fj\", \"sb\", \"vu\", \"ws\", \"to\", \"ki\", \"fm\", \"mh\", \"pw\", \"nr\", \"tv\",\n]);\n\n// -------------------------------\n// NEW: APAC DOMAIN TLDs (EXCLUDE)\n// Country-code TLDs for APAC countries\n// -------------------------------\nconst apacTLDs = new Set([\n  \"cn\", \"hk\", \"jp\", \"kr\", \"tw\", \"sg\", \"my\", \"id\", \"th\", \"ph\", \"vn\",\n  \"in\", \"pk\", \"bd\", \"lk\", \"au\", \"nz\", \"mm\", \"kh\", \"la\", \"mn\", \"np\",\n  \"fj\", \"pg\", \"bn\", \"mo\", \"af\", \"bt\", \"mv\", \"to\", \"ws\", \"vu\", \"ki\",\n  \"nz\", \"pw\", \"nr\", \"tv\",\n]);\n\n// -------------------------------\n// NEW: APAC KEYWORDS for domain and company name matching\n// Catches companies like \"China Mobile Hong Kong\" or \"chinamobilehk.com\"\n// when HubSpot location fields are empty\n// -------------------------------\nconst apacNameKeywords = [\n  // Countries / regions\n  \"china\", \"hong kong\", \"hongkong\", \"beijing\", \"shanghai\", \"shenzhen\",\n  \"guangzhou\", \"chengdu\", \"wuhan\", \"hangzhou\", \"nanjing\", \"tianjin\",\n  \"japan\", \"tokyo\", \"osaka\", \"nagoya\", \"kyoto\",\n  \"korea\", \"seoul\", \"busan\",\n  \"taiwan\", \"taipei\",\n  \"singapore\",\n  \"india\", \"mumbai\", \"delhi\", \"bangalore\", \"bengaluru\", \"hyderabad\",\n  \"chennai\", \"kolkata\", \"pune\",\n  \"australia\", \"sydney\", \"melbourne\", \"brisbane\", \"perth\",\n  \"new zealand\", \"auckland\", \"wellington\",\n  \"thailand\", \"bangkok\",\n  \"indonesia\", \"jakarta\",\n  \"philippines\", \"manila\",\n  \"vietnam\", \"hanoi\", \"ho chi minh\",\n  \"malaysia\", \"kuala lumpur\",\n  \"pakistan\", \"karachi\", \"lahore\", \"islamabad\",\n  \"bangladesh\", \"dhaka\",\n  \"sri lanka\", \"colombo\",\n  \"cambodia\", \"phnom penh\",\n  \"myanmar\", \"yangon\",\n  \"mongolia\", \"ulaanbaatar\",\n  \"nepal\", \"kathmandu\",\n\n  // Demonyms / adjectives\n  \"chinese\", \"japanese\", \"korean\", \"taiwanese\", \"singaporean\",\n  \"indian\", \"australian\", \"thai\", \"indonesian\", \"filipino\",\n  \"vietnamese\", \"malaysian\", \"pakistani\", \"bangladeshi\",\n];\n\n// -------------------------------\n// Extract location fields safely\n// -------------------------------\nfunction extractLocationStrings(item) {\n  const p = item.json.properties || {};\n\n  return [\n    p.state,\n    p.province,\n    p.region,\n    p.country,\n    p.location,\n    item.json.state,\n    item.json.province,\n    item.json.region,\n    item.json.country,\n  ].filter(Boolean);\n}\n\n// -------------------------------\n// APAC CHECK (with US territory override)\n// Now includes domain + company name fallback\n// -------------------------------\nfunction isApac(item) {\n  const p = item.json.properties || {};\n  const rawValues = extractLocationStrings(item);\n  const normalizedValues = rawValues\n    .map(normalize)\n    .filter(Boolean);\n\n  // US territories override: if any field explicitly indicates a US territory, KEEP it\n  for (const v of normalizedValues) {\n    if (usTerritories.has(v)) return false;\n  }\n\n  // ── CHECK 1: Location fields (original logic) ──\n\n  // Region keyword match (apac / asia pacific / oceania / etc.)\n  for (const v of normalizedValues) {\n    for (const k of apacRegionKeywords) {\n      if (v === k || v.includes(k)) return true;\n    }\n  }\n\n  // Country / area match\n  for (const v of normalizedValues) {\n    if (apacCountries.has(v)) return true;\n    if (v.length === 2 && apacCountryCodes.has(v)) return true;\n  }\n\n  // ── CHECK 2: Domain TLD (NEW — catches .hk, .cn, .jp, etc.) ──\n\n  const rawDomain = (p.domain || p.website || item.json.domain || '')\n    .toString().toLowerCase().trim()\n    .replace(/^https?:\\/\\//i, '')\n    .replace(/^www\\./i, '')\n    .split('/')[0];\n\n  if (rawDomain) {\n    const parts = rawDomain.split('.');\n    const tld = parts[parts.length - 1];\n\n    // Check country-code TLD\n    if (tld && apacTLDs.has(tld)) {\n      console.log(`APAC detected via TLD: \"${rawDomain}\" (.${tld})`);\n      return true;\n    }\n\n    // Check second-level TLD (e.g., .co.jp, .com.au, .co.in)\n    if (parts.length >= 3) {\n      const secondLevelTLD = parts[parts.length - 1];\n      const thirdLevel = parts[parts.length - 2];\n      // Pattern: something.co.jp, something.com.au, something.co.in\n      if (['co', 'com', 'net', 'org', 'ac', 'gov'].includes(thirdLevel)) {\n        if (apacTLDs.has(secondLevelTLD)) {\n          console.log(`APAC detected via second-level TLD: \"${rawDomain}\" (.${thirdLevel}.${secondLevelTLD})`);\n          return true;\n        }\n      }\n    }\n\n    // Check for APAC keywords in the domain itself\n    for (const kw of apacNameKeywords) {\n      if (rawDomain.includes(kw.replace(/\\s+/g, ''))) {\n        console.log(`APAC detected via domain keyword: \"${rawDomain}\" matched \"${kw}\"`);\n        return true;\n      }\n    }\n  }\n\n  // ── CHECK 3: Company name (NEW — catches \"China Mobile Hong Kong\" etc.) ──\n\n  const companyName = (p.name || item.json.name || '').toString().toLowerCase().trim();\n\n  if (companyName) {\n    for (const kw of apacNameKeywords) {\n      if (companyName.includes(kw)) {\n        console.log(`APAC detected via company name: \"${companyName}\" matched \"${kw}\"`);\n        return true;\n      }\n    }\n  }\n\n  // Not APAC — keep it\n  return false;\n}\n\n// -------------------------------\n// FILTERING LOGIC: remove APAC only\n// -------------------------------\nconst items = $input.all();\nconst output = [];\nlet droppedCount = 0;\n\nfor (const item of items) {\n  if (!isApac(item)) {\n    output.push(item);\n  } else {\n    droppedCount++;\n    const name = item.json.properties?.name || item.json.name || 'unknown';\n    console.log(`FILTERED OUT (APAC): \"${name}\"`);\n  }\n}\n\nconsole.log(`\\n════ APAC FILTER SUMMARY ════`);\nconsole.log(`Input: ${items.length} | Kept: ${output.length} | Removed: ${droppedCount}`);\n\nreturn output;"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        880,
        1424
      ],
      "id": "6a9c9066-3095-4916-ab5a-d682125f3df0",
      "name": "Filter - remove apac"
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
              "id": "a8abbf2f-8eeb-4ed8-9de7-affdec462db3",
              "leftValue": "={{ $json.properties.name }}",
              "rightValue": "deel",
              "operator": {
                "type": "string",
                "operation": "notContains"
              }
            },
            {
              "id": "d9a3a74e-4474-4658-aebe-0e41070992a0",
              "leftValue": "={{ $json.properties.name }}",
              "rightValue": "remote",
              "operator": {
                "type": "string",
                "operation": "notContains"
              }
            },
            {
              "id": "f71f8481-9deb-4f9c-b4fd-70dfbc8ad790",
              "leftValue": "={{ $json.properties.name }}",
              "rightValue": "rippling",
              "operator": {
                "type": "string",
                "operation": "notContains"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "type": "n8n-nodes-base.filter",
      "typeVersion": 2.3,
      "position": [
        2000,
        1424
      ],
      "id": "7a75deba-406d-4942-b8dd-2c5deaca4203",
      "name": "remove competitors"
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 2
          },
          "conditions": [
            {
              "id": "c21c6349-4cd3-4bb1-afff-fd42928fd675",
              "leftValue": "={{\n  !$json.properties.hs_last_sales_activity_timestamp ||\n  $json.properties.hs_last_sales_activity_timestamp < new Date(Date.now() - (30 * 24 * 60 * 60 * 1000)).toISOString()\n}}",
              "rightValue": "={{\n  !$json.properties.hs_last_sales_activity_timestamp ||\n  $json.properties.hs_last_sales_activity_timestamp < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()\n}}",
              "operator": {
                "type": "boolean",
                "operation": "true",
                "singleValue": true
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "type": "n8n-nodes-base.filter",
      "typeVersion": 2.2,
      "position": [
        1776,
        1424
      ],
      "id": "b4efd385-6b47-4889-a0dc-254804eaddfa",
      "name": "Filter - last sales activity",
      "alwaysOutputData": false
    },
    {
      "parameters": {
        "jsCode": "// ============================================================\n// ICP FILTER: Remove Schools and Governments\n// NGOs are kept (they are valid prospects)\n// ============================================================\n\nconst items = $input.all();\n\n// Keywords that indicate a school/education institution\nconst schoolKeywords = [\n  'university', 'college', 'school district', 'k-12',\n  'elementary', 'high school', 'middle school',\n  'academy', 'institute of technology', 'polytechnic',\n  'community college', 'vocational', 'training center',\n  'education department', 'board of education',\n  'public school', 'private school', 'charter school',\n  'university hospital', 'medical school'\n];\n\n// Keywords that indicate government entity\nconst governmentKeywords = [\n  'department of', 'gov', '.gov', 'government',\n  'city of', 'county of', 'state of', 'federal',\n  'municipality', 'township', 'metropolitan',\n  'police department', 'fire department', 'sheriff',\n  'public works', 'department of transportation',\n  'defense', 'military', 'army', 'navy', 'air force',\n  'Veterans Affairs', 'VA Hospital', 'US Army',\n  'congress', 'senate', 'parliament', 'legislature',\n  'court', 'judicial', 'judicial system',\n  'embassy', 'consulate', 'foreign affairs',\n  'parks and recreation', 'recreation department',\n  'environmental protection', 'EPA', 'DOE',\n  'IRS', 'tax department', 'revenue department'\n];\n\n// Company types that are automatically excluded\nconst excludeTypes = new Set([\n  'government', 'government agency', 'public sector',\n  'educational institution', 'school', 'university',\n  'hospital', 'healthcare'  // careful - some may be valid\n]);\n\nfunction normalize(s) {\n  if (!s) return '';\n  return String(s).toLowerCase().replace(/[^a-z0-9\\s]/g, ' ').replace(/\\s+/g, ' ').trim();\n}\n\nfunction hasAny(text, keywords) {\n  if (!text) return false;\n  const t = normalize(text);\n  return keywords.some(k => t.includes(normalize(k)));\n}\n\nconst output = [];\nlet kept = 0;\nlet removed = 0;\n\nfor (const item of items) {\n  const j = item.json || {};\n  const props = j.properties || {};\n\n  const companyName = j.name || props.name || '';\n  const domain = j.domain || props.domain || props.website || '';\n  const industry = j.industry || props.industry || '';\n  const companyType = j.type || props.type || '';\n  const description = j.company_description || props.company_description || '';\n\n  // Check all text fields\n  const allText = [companyName, domain, industry, companyType, description].join(' ');\n\n  const isSchool = hasAny(allText, schoolKeywords);\n  const isGovernment = hasAny(allText, governmentKeywords);\n  const isExcludedType = excludeTypes.has(normalize(companyType));\n\n  // Schools: exclude\n  if (isSchool) {\n    removed++;\n    item.json._icp_filter_reason = 'School/Educational Institution';\n    continue;\n  }\n\n  // Government: exclude (but NOT NGOs)\n  if (isGovernment) {\n    // Double-check it's not an NGO by name\n    const isNgo = hasAny(allText, ['nonprofit', 'non-profit', 'ngo', 'charity', 'foundation', 'association']);\n    if (isNgo) {\n      // NGO - KEEP\n      kept++;\n      item.json._icp_filter_reason = '';\n      output.push(item);\n      continue;\n    }\n    removed++;\n    item.json._icp_filter_reason = 'Government Entity';\n    continue;\n  }\n\n  // Excluded company type\n  if (isExcludedType && normalize(companyType).includes('government')) {\n    removed++;\n    item.json._icp_filter_reason = 'Excluded Company Type: ' + companyType;\n    continue;\n  }\n\n  // Valid prospect - keep\n  kept++;\n  item.json._icp_filter_reason = '';\n  output.push(item);\n}\n\nconsole.log(`\\n═══ ICP FILTER ═══`);\nconsole.log(`Input:  ${items.length}`);\nconsole.log(`Kept:   ${kept} (valid prospects)`);\nconsole.log(`Removed: ${removed} (schools/governments)`);\n\nif (removed > 0) {\n  const removedItems = items.filter(i => i.json._icp_filter_reason);\n  console.log('\\nRemoved companies:');\n  for (const ri of removedItems) {\n    const j = ri.json || {};\n    console.log(`  - ${j.name || 'unnamed'} | ${j._icp_filter_reason}`);\n  }\n}\n\nreturn output;\n"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        2224,
        1424
      ],
      "id": "6e15e3e6-9344-4969-9dec-1a79bf9581a0",
      "name": "ICP Filter - Schools & Governments"
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://api.clay.com/v3/sources/webhook/pull-in-data-from-a-webhook-429f9ee2-9b99-410f-99e7-05ce080799e6",
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"company_id\": \"{{ $json.company_id }}\",\n  \"company_linkedin_url\": \"{{ $json.company_linkedin_url }}\",\n  \"company_domain\": \"{{ $json.company_domain }}\",\n  \"company_name\": \"{{ $json.company_name }}\",\n  \"company_state\": \"{{ $json.company_state }}\",\n  \"hubspot_owner_id\": \"{{ $json.hubspot_owner_id }}\",\n  \"intent_type\": \"{{ $json.intent_type }}\",\n  \"country\": \"{{ $json.normalized_country }}\",\n  \"industry\": \"{{ $json.properties.industry }}\",\n  \"n8n_webhook_url\": \"{{ $execution.resumeUrl }}\"\n}",
        "options": {
          "batching": {
            "batch": {
              "batchSize": 1,
              "batchInterval": 5000
            }
          }
        }
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.3,
      "position": [
        3104,
        1424
      ],
      "id": "921fec0d-24ed-45d2-897e-933e6f8d454c",
      "name": "HTTP Request",
      "retryOnFail": true,
      "waitBetweenTries": 5000
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
              "id": "29cac146-24f7-491a-8132-a8b9ae5cc020",
              "leftValue": "={{ $json.properties.numberofemployees?.toNumber() }}",
              "rightValue": 2000,
              "operator": {
                "type": "number",
                "operation": "lte"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "type": "n8n-nodes-base.filter",
      "typeVersion": 2.3,
      "position": [
        656,
        1424
      ],
      "id": "43f772ee-9d66-4bbe-8bcf-fc4e4ff6e60d",
      "name": "Less than 2,000 employees"
    },
    {
      "parameters": {
        "operation": "upsert",
        "dataTableId": {
          "__rl": true,
          "value": "cCvhvO8KrdUn6Tmf",
          "mode": "list",
          "cachedResultName": "Get Hubspot Companies Data",
          "cachedResultUrl": "/projects/WvtsN50IrMcuz3dw/datatables/cCvhvO8KrdUn6Tmf"
        },
        "filters": {
          "conditions": [
            {
              "keyValue": "={{ $json.company_id }}"
            }
          ]
        },
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "company_name": "={{ $json.company_name }}",
            "intent_type": "={{ $json.intent_type }}",
            "company_linkedin": "={{ $json.company_linkedin_url }}",
            "company_state": "={{ $json.company_state }}",
            "company_country": "={{ $json.normalized_country }}",
            "company_segment": "={{ $json.properties.company_size_segmentation }}",
            "company_size": "={{ $json.properties.numberofemployees }}",
            "company_domain": "={{ $json.company_domain }}",
            "zoominfo_workflow": "={{ $json.results[0].properties.zoominfo___most_recent_workflow }}"
          },
          "matchingColumns": [],
          "schema": [
            {
              "id": "company_name",
              "displayName": "company_name",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "readOnly": false,
              "removed": false
            },
            {
              "id": "company_domain",
              "displayName": "company_domain",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "readOnly": false,
              "removed": false
            },
            {
              "id": "company_linkedin",
              "displayName": "company_linkedin",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "readOnly": false,
              "removed": false
            },
            {
              "id": "company_size",
              "displayName": "company_size",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "readOnly": false,
              "removed": false
            },
            {
              "id": "company_segment",
              "displayName": "company_segment",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "readOnly": false,
              "removed": false
            },
            {
              "id": "zoominfo_workflow",
              "displayName": "zoominfo_workflow",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "readOnly": false,
              "removed": false
            },
            {
              "id": "company_state",
              "displayName": "company_state",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "readOnly": false,
              "removed": false
            },
            {
              "id": "company_country",
              "displayName": "company_country",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "readOnly": false,
              "removed": false
            },
            {
              "id": "intent_type",
              "displayName": "intent_type",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "readOnly": false,
              "removed": false
            },
            {
              "id": "intent_source",
              "displayName": "intent_source",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "readOnly": false,
              "removed": true
            },
            {
              "id": "company_research",
              "displayName": "company_research",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "readOnly": false,
              "removed": true
            }
          ],
          "attemptToConvertTypes": false,
          "convertFieldsToString": false
        },
        "options": {
          "dryRun": false
        }
      },
      "type": "n8n-nodes-base.dataTable",
      "typeVersion": 1,
      "position": [
        3040,
        1216
      ],
      "id": "90c8f163-d682-44e5-8319-243c4a432cec",
      "name": "Send to Datatable"
    }
  ],
  "pinData": {},
  "connections": {
    "Get HubSpot Companies - Intent": {
      "main": [
        [
          {
            "node": "Split Each Company",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Filter - 0 associated deals": {
      "main": [
        [
          {
            "node": "Filter - Lifecycle stage",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Filter - Lifecycle stage": {
      "main": [
        [
          {
            "node": "Filter - type",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Filter - type": {
      "main": [
        [
          {
            "node": "Filter - last sales activity",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Schedule Trigger": {
      "main": [
        [
          {
            "node": "Set Yesterday Range",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Set Yesterday Range": {
      "main": [
        [
          {
            "node": "Get HubSpot Companies - Intent",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Edit Fields": {
      "main": [
        [
          {
            "node": "HTTP Request",
            "type": "main",
            "index": 0
          },
          {
            "node": "Send to Datatable",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Round Robin Assignment -all": {
      "main": [
        [
          {
            "node": "Edit Fields",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Filter - remove apac": {
      "main": [
        [
          {
            "node": "Filter - 0 associated deals",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "remove competitors": {
      "main": [
        [
          {
            "node": "ICP Filter - Schools & Governments",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Split Each Company": {
      "main": [
        [
          {
            "node": "Less than 2,000 employees",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Filter - last sales activity": {
      "main": [
        [
          {
            "node": "remove competitors",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "ICP Filter - Schools & Governments": {
      "main": [
        [
          {
            "node": "Round Robin Assignment -all",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "HTTP Request": {
      "main": [
        []
      ]
    },
    "Less than 2,000 employees": {
      "main": [
        [
          {
            "node": "Filter - remove apac",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Send to Datatable": {
      "main": [
        []
      ]
    }
  },
  "active": true,
  "settings": {
    "executionOrder": "v1"
  },
  "versionId": "aeab32af-bd1a-4cc4-a6d2-9ea1086793d0",
  "meta": {
    "templateCredsSetupCompleted": true,
    "instanceId": "da98df5c5d7ca09b34ad4f795244e87a7663d8722c18682c2021c70624938526"
  },
  "id": "1mkwGOR55KQL78NG",
  "tags": [
    {
      "updatedAt": "2026-01-21T23:26:51.343Z",
      "createdAt": "2026-01-21T23:26:51.343Z",
      "id": "037k6KgjN5M1MTji",
      "name": "Prospect Automation"
    },
    {
      "updatedAt": "2026-04-08T12:40:26.830Z",
      "createdAt": "2026-04-08T12:40:26.830Z",
      "id": "P2qGd6AokbgYx0NW",
      "name": "SALES"
    },
    {
      "updatedAt": "2026-04-08T12:40:18.236Z",
      "createdAt": "2026-04-08T12:40:18.236Z",
      "id": "v8fNd5xmFuiI31Bp",
      "name": "AGS"
    }
  ]
}
