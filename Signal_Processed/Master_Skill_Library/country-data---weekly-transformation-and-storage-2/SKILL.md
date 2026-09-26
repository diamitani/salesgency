---
name: country-data---weekly-transformation-and-storage-2
description: Process/Note derived from Country Data - Weekly Transformation and Storage-2.json
source_path: Atlas Portfolio/Country Data - Weekly Transformation and Storage-2.json
---

# Country Data - Weekly Transformation and Storage-2.json

## Context
This skill provides knowledge, processes, and instructions derived from the document: `Country Data - Weekly Transformation and Storage-2.json`.
Use this information to inform GTM strategies, sales playbooks, automation engine logic, and CRM setup.

## Knowledge Source

{
  "name": "Country Data - Weekly Transformation and Storage",
  "nodes": [
    {
      "parameters": {},
      "type": "n8n-nodes-base.manualTrigger",
      "typeVersion": 1,
      "position": [
        15680,
        8624
      ],
      "id": "9835a712-d1f3-4b49-a3b0-d8513e9fbc34",
      "name": "When clicking 'Execute workflow'"
    },
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "weeks",
              "triggerAtDay": [
                1
              ],
              "triggerAtHour": 6
            }
          ]
        }
      },
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1.2,
      "position": [
        15680,
        8832
      ],
      "id": "bc4bc983-6a2f-4c14-85c7-c48738465add",
      "name": "Weekly Schedule (Monday 6AM)"
    },
    {
      "parameters": {
        "mode": "raw",
        "jsonOutput": "{\n  \"case_spec\": {\n    \"case\": { \"client_name\": \"Demo Prospect\", \"date\": \"2025-12-26\" },\n    \"roles\": [{ \"title\": \"Customer Support Specialist\", \"level\": \"mid\", \"headcount\": 20 }],\n    \"constraints\": {\n      \"languages\": [\n        { \"language\": \"French\", \"min_proficiency\": \"C1\" },\n        { \"language\": \"English\", \"min_proficiency\": \"B2\" }\n      ],\n      \"timezone_overlap\": { \"anchor_timezones\": [\"Europe/Paris\"], \"min_overlap_hours\": 4 },\n      \"budget\": { \"currency\": \"USD\", \"max_monthly_fully_loaded_per_hire\": 3500 },\n      \"must_have\": [\"EOR_available\"]\n    },\n    \"output\": { \"top_n_countries\": 5 }\n  }\n}\n",
        "options": {}
      },
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        15888,
        8624
      ],
      "id": "ae210450-536c-4d8e-acae-fd418074bc49",
      "name": "Set Case Spec"
    },
    {
      "parameters": {
        "content": "## Follow Up\nReports to add from OnSpring: \n\nBenefits: \nhttps://atlashxm.onspring.com/Report/1035/Display\n\nRequired Country Knowledge Question: \n\nSales Enablement Report: \n-Needs to be created-",
        "height": 320
      },
      "type": "n8n-nodes-base.stickyNote",
      "position": [
        15824,
        8288
      ],
      "typeVersion": 1,
      "id": "d3c357f8-8131-4a8d-bf07-4aa76b874a6c",
      "name": "Sticky Note"
    },
    {
      "parameters": {
        "jsCode": "const crypto = require('crypto');\n\nreturn [{\n  case_id: crypto.randomUUID(),\n  retrieved_at: new Date().toISOString(),\n  case_spec: $json.case_spec,\n  facts: [],\n  sources: []\n}];\n"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        16096,
        8624
      ],
      "id": "be0e1e6e-06a7-472c-a182-ccceaf4ebfc9",
      "name": "Initialize Variables"
    },
    {
      "parameters": {
        "url": "https://api.worldbank.org/v2/country",
        "sendQuery": true,
        "queryParameters": {
          "parameters": [
            {
              "name": "format",
              "value": "json"
            },
            {
              "name": "per_page",
              "value": "400"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.3,
      "position": [
        16304,
        8624
      ],
      "id": "dcaba713-92e5-427b-9692-acfb110551cd",
      "name": "Get Countries"
    },
    {
      "parameters": {
        "jsCode": "// Get the two items returned by \"Get Countries\"\nconst items = $items(\"Get Countries\");\n\n// items[0].json = metadata\n// items[1].json = array of country + aggregate records\nconst records = items?.[1]?.json;\n\nif (!Array.isArray(records)) {\n  throw new Error(\n    `Expected item 1 of \"Get Countries\" to be an array. Got: ${typeof records}`\n  );\n}\n\n// Filter out aggregates (World Bank aggregates have region.id === 'NA')\nconst realCountries = records.filter(r => r?.region?.id && r.region.id !== 'NA');\n\n// Return one n8n item per country (keep the full record intact)\n\n// -----------------------------------------------------------------------------\n// SUPPLEMENTAL COUNTRIES (added 2026-06-23 — Patrick Diamitani)\n// World Bank omits certain territories Atlas supports. Without this list they\n// never reach blob storage. Add new entries here as needed (one per country).\n// Roll back: restore versionId ad00198a-ff18-4463-93ff-ee6cabca8941\n// -----------------------------------------------------------------------------\nconst wbMissingCountries = [\n  {\n    id: 'TWN', iso2Code: 'TW', name: 'Taiwan',\n    region: { id: 'EAS', value: 'East Asia & Pacific' },\n    adminregion: { id: '', value: '' },\n    incomeLevel: { id: 'HIC', value: 'High income' },\n    lendingType: { id: 'LNX', value: 'Not classified' },\n    capitalCity: 'Taipei', longitude: '121.5654', latitude: '25.0330'\n  },\n  {\n    id: 'XKX', iso2Code: 'XK', name: 'Kosovo',\n    region: { id: 'ECS', value: 'Europe & Central Asia' },\n    adminregion: { id: 'ECA', value: 'Europe & Central Asia (excl. high income)' },\n    incomeLevel: { id: 'UMC', value: 'Upper middle income' },\n    lendingType: { id: 'IBD', value: 'IBRD' },\n    capitalCity: 'Pristina', longitude: '21.1655', latitude: '42.6629'\n  },\n  {\n    id: 'MAC', iso2Code: 'MO', name: 'Macau',\n    region: { id: 'EAS', value: 'East Asia & Pacific' },\n    adminregion: { id: '', value: '' },\n    incomeLevel: { id: 'HIC', value: 'High income' },\n    lendingType: { id: 'LNX', value: 'Not classified' },\n    capitalCity: 'Macau', longitude: '113.5439', latitude: '22.1987'\n  }\n];\nconst existingIso3 = new Set(realCountries.map(r => r.id));\nconst supplemental = wbMissingCountries.filter(c => !existingIso3.has(c.id));\nconst allCountries = [...realCountries, ...supplemental];\n\nreturn allCountries.map(r => ({ json: r }));\n"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        16512,
        8624
      ],
      "id": "89a52e98-f94b-4407-a917-9d5ab92eea98",
      "name": "Countries -> Items"
    },
    {
      "parameters": {
        "url": "=https://api.worldbank.org/v2/country/{{ $json.iso2Code }}/indicator/NY.GDP.PCAP.CD",
        "sendQuery": true,
        "queryParameters": {
          "parameters": [
            {
              "name": "format",
              "value": "json"
            },
            {
              "name": "per_page",
              "value": "5"
            }
          ]
        },
        "options": {
          "response": {
            "response": {
              "responseFormat": "json"
            }
          }
        }
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.3,
      "position": [
        16720,
        8720
      ],
      "id": "6e8c8d0b-2ed3-436b-8782-9c7943979447",
      "name": "Get WorldBank Data per Country - GDP",
      "executeOnce": false,
      "retryOnFail": true,
      "maxTries": 3,
      "waitBetweenTries": 1000,
      "onError": "continueRegularOutput"
    },
    {
      "parameters": {
        "url": "=https://api.worldbank.org/v2/country/{{ $json.iso2Code }}/indicator/SL.UEM.TOTL.ZS",
        "sendQuery": true,
        "queryParameters": {
          "parameters": [
            {
              "name": "format",
              "value": "json"
            },
            {
              "name": "per_page",
              "value": "5"
            }
          ]
        },
        "options": {
          "response": {
            "response": {
              "responseFormat": "json"
            }
          }
        }
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.3,
      "position": [
        16720,
        8896
      ],
      "id": "c26d4770-361d-412a-908c-fcfc0f36249f",
      "name": "Get WorldBank Data - Unemployment",
      "retryOnFail": true,
      "maxTries": 3,
      "waitBetweenTries": 1000,
      "onError": "continueRegularOutput"
    },
    {
      "parameters": {
        "jsCode": "const items = $input.all().map(i => i.json);\n\nfunction looksLikeMeta(x) {\n  return x && typeof x === 'object' && x.page !== undefined && x.pages !== undefined;\n}\n\nconst output = [];\n\nfor (let i = 0; i < items.length; i += 2) {\n  const meta = items[i];\n  const rows = items[i + 1];\n\n  // Validate pair structure\n  if (!looksLikeMeta(meta) || !Array.isArray(rows)) {\n    continue;\n  }\n\n  // Rows are newest â†’ oldest; pick first non-null value\n  const latest = rows.find(r => r && r.value !== null && r.value !== undefined);\n  if (!latest) continue;\n\n  const iso3 = latest.countryiso3code;\n  if (!iso3) continue;\n\n  output.push({\n    json: {\n      iso3,\n      unemployment: latest.value\n    }\n  });\n}\n\nreturn output;\n"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        16928,
        8896
      ],
      "id": "705be36f-fed7-44d9-ad3e-0007e31cf0fe",
      "name": "Organize WorldBank - Unemployment"
    },
    {
      "parameters": {
        "url": "=https://api.worldbank.org/v2/country/{{ $json.iso2Code }}/indicator/SL.TLF.TOTL.IN\n",
        "sendQuery": true,
        "queryParameters": {
          "parameters": [
            {
              "name": "format",
              "value": "json"
            },
            {
              "name": "per_page",
              "value": "5"
            }
          ]
        },
        "options": {
          "response": {
            "response": {
              "responseFormat": "json"
            }
          }
        }
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.3,
      "position": [
        16720,
        9072
      ],
      "id": "6c109c57-b22c-45b0-9335-799de297c8a4",
      "name": "Get WorldBank Data - Total Labor Force",
      "retryOnFail": true,
      "maxTries": 3,
      "waitBetweenTries": 1000,
      "onError": "continueRegularOutput"
    },
    {
      "parameters": {
        "jsCode": "const items = $input.all().map(i => i.json);\n\nfunction looksLikeMeta(x) {\n  return x && typeof x === 'object' && x.page !== undefined && x.pages !== undefined;\n}\n\nconst output = [];\n\nfor (let i = 0; i < items.length; i += 2) {\n  const meta = items[i];\n  const rows = items[i + 1];\n\n  // Validate pair structure\n  if (!looksLikeMeta(meta) || !Array.isArray(rows)) {\n    continue;\n  }\n\n  // Rows are newest â†’ oldest; pick first non-null value\n  const latest = rows.find(r => r && r.value !== null && r.value !== undefined);\n  if (!latest) continue;\n\n  const iso3 = latest.countryiso3code;\n  if (!iso3) continue;\n\n  output.push({\n    json: {\n      iso3,\n      totalLaborForce: latest.value\n    }\n  });\n}\n\nreturn output;\n"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        16928,
        9072
      ],
      "id": "0818dc87-dbc2-4659-af80-c93a274b4e33",
      "name": "Organize WorldBank - Total Labor Force"
    },
    {
      "parameters": {
        "jsCode": "const items = $input.all().map(i => i.json);\n\nfunction looksLikeMeta(x) {\n  return x && typeof x === 'object' && x.page !== undefined && x.pages !== undefined;\n}\n\nconst output = [];\n\nfor (let i = 0; i < items.length; i += 2) {\n  const meta = items[i];\n  const rows = items[i + 1];\n\n  // Validate pair structure\n  if (!looksLikeMeta(meta) || !Array.isArray(rows)) {\n    continue;\n  }\n\n  // Rows are newest â†’ oldest; pick first non-null value\n  const latest = rows.find(r => r && r.value !== null && r.value !== undefined);\n  if (!latest) continue;\n\n  const iso3 = latest.countryiso3code;\n  if (!iso3) continue;\n\n  output.push({\n    json: {\n      iso3,\n      gdpPerCapitaInUSD: latest.value\n    }\n  });\n}\n\nreturn output;\n"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        16928,
        8720
      ],
      "id": "ed32d9eb-e656-4a5f-9360-b782f03db0a6",
      "name": "Organize WorldBank - GDP"
    },
    {
      "parameters": {
        "url": "=https://api.worldbank.org/v2/country/{{ $json.iso2Code }}/indicator/NY.GNP.PCAP.CD\n",
        "sendQuery": true,
        "queryParameters": {
          "parameters": [
            {
              "name": "format",
              "value": "json"
            },
            {
              "name": "per_page",
              "value": "5"
            }
          ]
        },
        "options": {
          "response": {
            "response": {
              "responseFormat": "json"
            }
          }
        }
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.3,
      "position": [
        16720,
        9248
      ],
      "id": "1dcb0100-cf36-4206-962c-5378025e2d2d",
      "name": "Get WorldBank Data - GNI Per Capita",
      "retryOnFail": true,
      "maxTries": 3,
      "waitBetweenTries": 1000,
      "onError": "continueRegularOutput"
    },
    {
      "parameters": {
        "jsCode": "const items = $input.all().map(i => i.json);\n\nfunction looksLikeMeta(x) {\n  return x && typeof x === 'object' && x.page !== undefined && x.pages !== undefined;\n}\n\nconst output = [];\n\nfor (let i = 0; i < items.length; i += 2) {\n  const meta = items[i];\n  const rows = items[i + 1];\n\n  // Validate pair structure\n  if (!looksLikeMeta(meta) || !Array.isArray(rows)) {\n    continue;\n  }\n\n  // Rows are newest â†’ oldest; pick first non-null value\n  const latest = rows.find(r => r && r.value !== null && r.value !== undefined);\n  if (!latest) continue;\n\n  const iso3 = latest.countryiso3code;\n  if (!iso3) continue;\n\n  output.push({\n    json: {\n      iso3,\n      gniPerCapita: latest.value\n    }\n  });\n}\n\nreturn output;\n"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        16928,
        9248
      ],
      "id": "eda74c93-3392-4ec9-9218-379ec8d78998",
      "name": "Organize WorldBank - GNI Per Capita"
    },
    {
      "parameters": {
        "mode": "combine",
        "fieldsToMatchString": "iso3",
        "joinMode": "keepEverything",
        "options": {}
      },
      "type": "n8n-nodes-base.merge",
      "typeVersion": 3.2,
      "position": [
        17136,
        9168
      ],
      "id": "47ae37e8-f036-40f0-bdcb-f385a0c5e42a",
      "name": "Merge"
    },
    {
      "parameters": {
        "mode": "combine",
        "fieldsToMatchString": "iso3",
        "joinMode": "keepEverything",
        "options": {}
      },
      "type": "n8n-nodes-base.merge",
      "typeVersion": 3.2,
      "position": [
        17136,
        8800
      ],
      "id": "2d41e94c-5b1e-47de-a5be-7e1a73011b05",
      "name": "Merge1"
    },
    {
      "parameters": {
        "mode": "combine",
        "fieldsToMatchString": "iso3",
        "joinMode": "keepEverything",
        "options": {}
      },
      "type": "n8n-nodes-base.merge",
      "typeVersion": 3.2,
      "position": [
        17328,
        8976
      ],
      "id": "234e3010-df92-41f5-bc0f-42c845f5921a",
      "name": "WorldBank Data Merge"
    },
    {
      "parameters": {
        "mode": "combine",
        "advanced": true,
        "mergeByFields": {
          "values": [
            {
              "field1": "id",
              "field2": "iso3"
            }
          ]
        },
        "joinMode": "keepEverything",
        "options": {}
      },
      "type": "n8n-nodes-base.merge",
      "typeVersion": 3.2,
      "position": [
        17504,
        8640
      ],
      "id": "e14a39e5-a67d-48b8-86d3-62325e59d52a",
      "name": "Country and WorldBank Data"
    },
    {
      "parameters": {
        "url": "=https://www.atlashxm.com/api/v1/country/?countries={{ $json.iso2Code }}&token=ZsYfMt81gopVLuTJzhxm1gT8Ait9xg75&schema=true ",
        "options": {}
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.3,
      "position": [
        16720,
        9440
      ],
      "id": "8c0ff637-0f80-4670-b1bd-e77c18a23680",
      "name": "Atlas Vantage - Get Country Data",
      "retryOnFail": true,
      "maxTries": 3,
      "waitBetweenTries": 2000,
      "onError": "continueRegularOutput"
    },
    {
      "parameters": {
        "url": "=https://www.atlashxm.com/api/v1/country/insights/?country={{ $json.iso2Code }}&format=json&lang=us&token=ZsYfMt81gopVLuTJzhxm1gT8Ait9xg75&scope=website",
        "options": {}
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.3,
      "position": [
        16720,
        9616
      ],
      "id": "432ddf66-7571-4cd6-ba6a-b63c07139449",
      "name": "Atlas Vantage - Get Country Insights",
      "retryOnFail": true,
      "maxTries": 3,
      "waitBetweenTries": 2000,
      "onError": "continueRegularOutput"
    },
    {
      "parameters": {
        "jsCode": "// Extract and organize Atlas Vantage country data\nconst input = $input.all();\nconst output = [];\n\nfor (const item of input) {\n  const response = item.json;\n  \n  // Skip failed requests\n  if (!response || response.status !== '200' || !response.data) {\n    continue;\n  }\n  \n  // Get the first (and typically only) country from the data object\n  const countryKey = Object.keys(response.data)[0];\n  if (!countryKey) continue;\n  \n  const c = response.data[countryKey];\n  \n  output.push({\n    json: {\n      iso3: c.iso3,\n      atlas_iso2: c.iso2,\n      atlas_name: c.name,\n      atlas_name_official: c.name_off?.en,\n      atlas_region: c.reg_name,\n      atlas_capital: c.cap,\n      atlas_capital_population: c.capi?.popu,\n      atlas_lat: c.lat,\n      atlas_lon: c.lon,\n      atlas_income_level: c.monetary?.inc_levl,\n      atlas_currency: c.monetary?.curr,\n      atlas_currency_symbol: c.monetary?.curr_symbol,\n      atlas_timezone: c.tzon ? Object.keys(c.tzon)[0] : null,\n      atlas_languages: c.lang,\n      atlas_borders: c.bord,\n      atlas_continent: c.cont,\n      atlas_work_hours_weekly: c.work_hours,\n      atlas_website_slug: c.website_slug,\n      // Indicators\n      atlas_population: c.indicats?.popu_val,\n      atlas_population_date: c.indicats?.popu_dat,\n      atlas_urban_population_pct: c.indicats?.urbp_val,\n      atlas_gdp_per_capita: c.indicats?.gdpe_val,\n      atlas_gdp_growth_pct: c.indicats?.gdpg_val,\n      atlas_gni_per_capita: c.indicats?.gdpc_val,\n      atlas_unemployment_pct: c.indicats?.unem_val,\n      atlas_labor_force_participation: c.indicats?.labf_val,\n      atlas_total_labor_force: c.indicats?.laft_val,\n      atlas_female_labor_force_pct: c.indicats?.laff_val,\n      atlas_life_expectancy: c.indicats?.lifx_val,\n      atlas_gini_index: c.indicats?.gini_val,\n      atlas_inflation_pct: c.indicats?.infc_val,\n      atlas_internet_coverage_pct: c.indicats?.incv_val,\n      atlas_electricity_coverage_pct: c.indicats?.elcv_val,\n      atlas_mobile_subscriptions_per_100: c.indicats?.mobs_val,\n      atlas_bank_account_pct: c.indicats?.bacv_val,\n      atlas_healthcare_coverage_pct: c.indicats?.uhcv_val,\n      atlas_regulatory_quality_pct: c.indicats?.regq_val,\n      atlas_rule_of_law_pct: c.indicats?.rolr_val,\n      atlas_corruption_control_pct: c.indicats?.ccor_val,\n      atlas_logistics_performance: c.indicats?.logp_val,\n      // Atlas Scores\n      atlas_total_score: c.atlas_score?.sTS,\n      atlas_economic_score: c.atlas_score?.sEC,\n      atlas_compliance_score: c.atlas_score?.sCM,\n      atlas_workforce_score: c.atlas_score?.sWF,\n      atlas_infrastructure_score: c.atlas_score?.sIF,\n      // URLs\n      atlas_cia_factbook_url: c.urls?.ciagov,\n      atlas_video_url: c.video_vimeo_url\n    }\n  });\n}\n\nreturn output;\n"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        16928,
        9440
      ],
      "id": "31005853-6308-42de-bf26-3baa51aedf3c",
      "name": "Organize Atlas - Country Data"
    },
    {
      "parameters": {
        "jsCode": "// Extract and organize Atlas Vantage insights data\nconst input = $input.all();\nconst output = [];\n\nfor (const item of input) {\n  const response = item.json;\n  \n  // Skip failed requests\n  if (!response || response.status !== '200' || !response.data) {\n    continue;\n  }\n  \n  const d = response.data;\n  \n  // Helper to strip HTML tags for cleaner text\n  function stripHtml(html) {\n    if (!html) return '';\n    return html\n      .replace(/<h3>/gi, '\\n### ')\n      .replace(/<\\/h3>/gi, '\\n')\n      .replace(/<p>/gi, '\\n')\n      .replace(/<\\/p>/gi, '')\n      .replace(/<ul>/gi, '')\n      .replace(/<\\/ul>/gi, '')\n      .replace(/<li>/gi, '\\n- ')\n      .replace(/<\\/li>/gi, '')\n      .replace(/<strong>/gi, '**')\n      .replace(/<\\/strong>/gi, '**')\n      .replace(/<em>/gi, '*')\n      .replace(/<\\/em>/gi, '*')\n      .replace(/<[^>]*>/g, '')\n      .replace(/&quot;/g, '\"')\n      .replace(/&rsquo;/g, \"'\")\n      .replace(/&ldquo;/g, '\"')\n      .replace(/&rdquo;/g, '\"')\n      .replace(/&mdash;/g, 'â€”')\n      .replace(/&ndash;/g, 'â€“')\n      .replace(/&amp;/g, '&')\n      .replace(/&#39;/g, \"'\")\n      .replace(/\\n{3,}/g, '\\n\\n')\n      .trim();\n  }\n  \n  // We need to get the iso2 from the request URL since insights response doesn't include it\n  // The iso2 is passed through from the previous node\n  const iso2 = item.json._pairedIso2 || $('Atlas Vantage - Get Country Insights').item?.json?.iso2Code;\n  \n  output.push({\n    json: {\n      insights_employment_relationship: d.erelation ? stripHtml(d.erelation.content) : null,\n      insights_employment_contracts: d.agreement ? stripHtml(d.agreement.content) : null,\n      insights_probation_period: d.probation ? stripHtml(d.probation.content) : null,\n      insights_working_hours: d.workhours ? stripHtml(d.workhours.content) : null,\n      insights_minimum_age: d.empminage ? stripHtml(d.empminage.content) : null,\n      insights_public_holidays: d.statholid ? stripHtml(d.statholid.content) : null,\n      insights_vacation_leave: d.paidleave ? stripHtml(d.paidleave.content) : null,\n      insights_sick_leave: d.sickleave ? stripHtml(d.sickleave.content) : null,\n      insights_maternity_leave: d.maternity ? stripHtml(d.maternity.content) : null,\n      insights_paternity_leave: d.paternity ? stripHtml(d.paternity.content) : null,\n      insights_compensation: d.compensat ? stripHtml(d.compensat.content) : null,\n      insights_termination: d.terminate ? stripHtml(d.terminate.content) : null,\n      insights_social_security: d.socialsec ? stripHtml(d.socialsec.content) : null,\n      insights_taxation: d.taxations ? stripHtml(d.taxations.content) : null,\n      insights_immigration: d.immigrate ? stripHtml(d.immigrate.content) : null\n    }\n  });\n}\n\nreturn output;\n"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        16928,
        9616
      ],
      "id": "adbebdb5-a073-411c-919b-52cea7715f10",
      "name": "Organize Atlas - Insights"
    },
    {
      "parameters": {
        "mode": "combine",
        "combineBy": "combineByPosition",
        "options": {}
      },
      "type": "n8n-nodes-base.merge",
      "typeVersion": 3.2,
      "position": [
        17136,
        9536
      ],
      "id": "2b49ffe3-491d-4f03-9a1e-e1330e1ccc72",
      "name": "Merge Atlas Data"
    },
    {
      "parameters": {
        "mode": "combine",
        "advanced": true,
        "mergeByFields": {
          "values": [
            {
              "field1": "id",
              "field2": "iso3"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.merge",
      "typeVersion": 3.2,
      "position": [
        17712,
        9024
      ],
      "id": "777d789c-50b9-4de2-9729-102365d04a9a",
      "name": "Final Country Profile Merge"
    },
    {
      "parameters": {
        "jsCode": "// Generate both JSON and Markdown formats for each country\nconst input = $input.all();\nconst output = [];\n\nfunction normalizeCountryName(name) {\n  if (!name || typeof name !== 'string') return null;\n  return name\n    .toLowerCase()\n    .replace(/&/g, 'and')\n    .replace(/[^a-z0-9]+/g, ' ')\n    .trim();\n}\n\n\n// World Bank name -> Onspring common-name aliases.\n// Verified against live Onspring report rows (execution 31127, 2026-07-13):\n// these 25 countries EXIST in Onspring under the alias, but the World Bank\n// name never matched, so their Onspring sections were silently empty.\nconst ONSPRING_NAME_ALIASES = {\n  'bahamas the': ['Bahamas'],\n  'brunei darussalam': ['Brunei'],\n  'cabo verde': ['Cape Verde'],\n  'egypt arab rep': ['Egypt'],\n  'gambia the': ['Gambia'],\n  'hong kong sar china': ['Hong Kong'],\n  'iran islamic rep': ['Iran'],\n  'korea dem people s rep': ['North Korea'],\n  'korea rep': ['South Korea'],\n  'kyrgyz republic': ['Kyrgyzstan'],\n  'lao pdr': ['Laos'],\n  'macao sar china': ['Macau', 'Macao'],\n  'puerto rico us': ['Puerto Rico'],\n  'russian federation': ['Russia'],\n  'samoa': ['Western Samoa'],\n  'slovak republic': ['Slovakia'],\n  'somalia fed rep': ['Somalia'],\n  'syrian arab republic': ['Syria'],\n  'timor leste': ['East Timor', 'Timor Leste'],\n  'turkiye': ['Turkey', 'Turkiye'],\n  'turks and caicos islands': ['Turks & Caicos'],\n  'venezuela rb': ['Venezuela'],\n  'viet nam': ['Vietnam'],\n  'virgin islands u s': ['US Virgin Islands'],\n  'yemen rep': ['Yemen'],\n};\n\nfunction stripHtml(html) {\n  if (!html || typeof html !== 'string') return null;\n  return html\n    .replace(/<\\s*br\\s*\\/?\\s*>/gi, '\\n')\n    .replace(/<\\s*\\/p\\s*>/gi, '\\n')\n    .replace(/<\\s*p[^>]*>/gi, '')\n    .replace(/<\\s*li[^>]*>/gi, '- ')\n    .replace(/<\\s*\\/li\\s*>/gi, '\\n')\n    .replace(/<\\s*ul[^>]*>/gi, '')\n    .replace(/<[^>]*>/g, '')\n    .replace(/&nbsp;/gi, ' ')\n    .replace(/&amp;/gi, '&')\n    .replace(/&quot;/gi, '\"')\n    .replace(/&#39;/gi, \"'\")\n    .replace(/&rsquo;/gi, \"'\")\n    .replace(/&ldquo;/gi, '\"')\n    .replace(/&rdquo;/gi, '\"')\n    .replace(/\\r\\n/g, '\\n')\n    .replace(/\\n{3,}/g, '\\n\\n')\n    .trim();\n}\n\nfunction cleanText(value) {\n  if (value === null || value === undefined) return null;\n  if (typeof value !== 'string') return value;\n  const cleaned = stripHtml(value);\n  if (!cleaned) return null;\n  return cleaned;\n}\n\nfunction toNumberOrNull(value) {\n  if (value === null || value === undefined || value === '') return null;\n  if (typeof value === 'number' && Number.isFinite(value)) return value;\n  if (typeof value === 'string') {\n    const n = Number(value);\n    return Number.isFinite(n) ? n : null;\n  }\n  return null;\n}\n\nfunction buildOnspringRows(nodeName) {\n  const items = $items(nodeName);\n  if (!items || !items.length) return [];\n  const report = items[0].json;\n  if (!report || !Array.isArray(report.columns) || !Array.isArray(report.rows)) return [];\n  return report.rows.map(row => {\n    const obj = { recordId: row.recordId };\n    report.columns.forEach((col, idx) => {\n      obj[col] = row.cells[idx];\n    });\n    return obj;\n  });\n}\n\nfunction getFromMap(map, nameCandidates) {\n  for (const name of nameCandidates) {\n    const key = normalizeCountryName(name);\n    if (key && map.has(key)) return map.get(key);\n  }\n  return null;\n}\n\nfunction formatMdValue(value) {\n  if (!value) return 'N/A';\n  const text = String(value);\n  if (text.includes('\\n')) {\n    return `\\n  ${text.replace(/\\n/g, '\\n  ')}`;\n  }\n  return text;\n}\n\n// Build Onspring maps once\nconst onspringBenefitsRows = buildOnspringRows('Onspring - Get Country Benefits');\nconst onspringPocRows = buildOnspringRows('Onspring - Get Point of Contact');\nconst onspringTasksRows = buildOnspringRows('Onspring - Get Country Tasks Data');\nconst onspringEntityRows = buildOnspringRows('Onspring - Get Country Entity Readiness');\nconst onspringKnowledgeRows = buildOnspringRows('Onspring - Get Country Knowledge');\nconst onspringEmployeeRows = buildOnspringRows('Onspring - Get Country Employee Count');\n\n// ===================================================================\n// OVERWRITE-SAFETY GUARD (added 2026-06-23 — Patrick Diamitani)\n// The blob write OVERWRITES every country file on each run. If any\n// required Onspring report returns no rows (e.g. lost API access),\n// this guard stops the run BEFORE any blob write, preserving the\n// last-good files. The error message names the exact failed report(s).\n// To roll back this change: restore versionId ad00198a-ff18-4463-93ff-ee6cabca8941\n// ===================================================================\nconst onspringHealth = {\n  'Report 978 (Point of Contact)':  onspringPocRows.length,\n  'Report 1164 (Country Tasks)':    onspringTasksRows.length,\n  'Report 1035 (Benefits)':         onspringBenefitsRows.length,\n  'Report 954 (Entity Readiness)':  onspringEntityRows.length,\n  'Report 971 (Country Knowledge)': onspringKnowledgeRows.length,\n  'Report 703 (Employee Count)':    onspringEmployeeRows.length,\n};\nconst failedReports = Object.entries(onspringHealth).filter(([,c]) => c === 0).map(([n]) => n);\nif (failedReports.length > 0) {\n  throw new Error(\n    'BLOB WRITE BLOCKED to protect existing country files. ' +\n    'These Onspring reports returned no data: ' + failedReports.join('; ') +\n    '. No files were overwritten. Restore report access and re-run. ' +\n    'Health: ' + JSON.stringify(onspringHealth)\n  );\n}\n// ===================================================================\n// END GUARD\n// ===================================================================\n\n\n\nconst benefitsByCountry = new Map();\nfor (const row of onspringBenefitsRows) {\n  const country = cleanText(row['Country']);\n  if (!country) continue;\n  const key = normalizeCountryName(country);\n  if (!key) continue;\n  benefitsByCountry.set(key, {\n    source: 'Onspring',\n    region: cleanText(row['Region']),\n    medical_supplemental: cleanText(row['Medical (Supplemental)']),\n    dental_supplemental: cleanText(row['Dental (Supplemental)']),\n    optical_supplemental: cleanText(row['Optical (Supplemental)']),\n    life_supplemental: cleanText(row['Life (Supplemental)']),\n    ltd_supplemental: cleanText(row['LTD (Supplemental)']),\n    std_supplemental: cleanText(row['STD (Supplemental)']),\n    travel_insurance: cleanText(row['Travel Insurance']),\n    employee_assistance_program: cleanText(row['Employee Assistance Program (EAP)']),\n    additional_benefits: cleanText(row['Additional benefits/comments'])\n  });\n}\n\nconst pocByCountry = new Map();\nfor (const row of onspringPocRows) {\n  const country = cleanText(row['Country']);\n  if (!country) continue;\n  const key = normalizeCountryName(country);\n  if (!key) continue;\n  const list = pocByCountry.get(key) || [];\n  list.push({\n    source: 'Onspring',\n    name: cleanText(row['Point of Contact']),\n    role: cleanText(row['Role']),\n    region: cleanText(row['Regions']),\n    sub_region: cleanText(row['Sub-Regions'])\n  });\n  pocByCountry.set(key, list);\n}\n\nconst tasksByCountry = new Map();\nfor (const row of onspringTasksRows) {\n  const country = cleanText(row['Country']);\n  if (!country) continue;\n  const key = normalizeCountryName(country);\n  if (!key) continue;\n  const list = tasksByCountry.get(key) || [];\n  list.push({\n    source: 'Onspring',\n    record_id: row['Record ID'],\n    task_name: cleanText(row['Task Name']),\n    region: cleanText(row['Regions']),\n    task_owner: cleanText(row['Task Owner']),\n    task_group: cleanText(row['Task Group']),\n    response: cleanText(row['Response']),\n    task_status: cleanText(row['Task Status']),\n    doc_link: cleanText(row['Doc link']),\n    important_links: cleanText(row['Important Links']),\n    sharepoint_link: cleanText(row['SharePoint Link'])\n  });\n  tasksByCountry.set(key, list);\n}\n\nconst entityByCountry = new Map();\nfor (const row of onspringEntityRows) {\n  const country = cleanText(row['Country']);\n  if (!country) continue;\n  const key = normalizeCountryName(country);\n  if (!key) continue;\n  entityByCountry.set(key, {\n    source: 'Onspring',\n    region: cleanText(row['Region']),\n    entity: cleanText(row['Entity']),\n    entity_status: cleanText(row['Entity Status']),\n    can_sponsor: cleanText(row['Can Atlas sponsor in this country?'])\n  });\n}\n\nconst employeeByCountry = new Map();\nfor (const row of onspringEmployeeRows) {\n  const country = cleanText(row['Country']);\n  if (!country) continue;\n  const key = normalizeCountryName(country);\n  if (!key) continue;\n  employeeByCountry.set(key, {\n    source: 'Onspring',\n    region: cleanText(row['Region']),\n    entity_status: cleanText(row['Entity Status']),\n    internal_employees: toNumberOrNull(row['Number of Internal Employees']),\n    wse_employees: toNumberOrNull(row['Number of WSEs']),\n    total_employees: toNumberOrNull(row['Total Employees'])\n  });\n}\n\nconst knowledgeByCountry = new Map();\nfor (const row of onspringKnowledgeRows) {\n  const country = cleanText(row['Country']);\n  if (!country) continue;\n  const key = normalizeCountryName(country);\n  if (!key) continue;\n  const answer = cleanText(row['In Country Partner - Answer']);\n  if (!answer) continue; // keep only answered questions for clean RAG data\n  const list = knowledgeByCountry.get(key) || [];\n  list.push({\n    source: 'Onspring',\n    record_id: row['Record Id'],\n    number: row['Number'],\n    question_group: cleanText(row['Question Group']),\n    topic: cleanText(row['Topic']),\n    question: cleanText(row['Question Text']),\n    answer\n  });\n  knowledgeByCountry.set(key, list);\n}\n\nfor (const item of input) {\n  const c = item.json;\n  if (!c || (!c.name && !c.id && !c.iso3 && !c.iso2Code && !c.atlas_iso2)) {\n    continue;\n  }\n  const timestamp = new Date().toISOString();\n  const nameCandidates = [c.name, c.atlas_name, c.atlas_name_official].filter(Boolean);\n  // Expand with Onspring aliases so World Bank naming variants still match.\n  const aliasCandidates = [];\n  for (const cand of nameCandidates) {\n    const extra = ONSPRING_NAME_ALIASES[normalizeCountryName(cand)];\n    if (extra) aliasCandidates.push(...extra);\n  }\n  nameCandidates.push(...aliasCandidates);\n\n  const onspringBenefits = getFromMap(benefitsByCountry, nameCandidates);\n  const onspringPocs = getFromMap(pocByCountry, nameCandidates);\n  const onspringTasks = getFromMap(tasksByCountry, nameCandidates);\n  const onspringEntity = getFromMap(entityByCountry, nameCandidates);\n  const onspringEmployees = getFromMap(employeeByCountry, nameCandidates);\n  const onspringKnowledge = getFromMap(knowledgeByCountry, nameCandidates);\n\n  const onspringData = {};\n  if (onspringPocs && onspringPocs.length) onspringData.point_of_contact = onspringPocs;\n  if (onspringEntity) onspringData.entity_readiness = onspringEntity;\n  if (onspringEmployees) onspringData.employee_counts = onspringEmployees;\n  if (onspringBenefits) onspringData.benefits = onspringBenefits;\n  if (onspringTasks && onspringTasks.length) onspringData.tasks = onspringTasks;\n  if (onspringKnowledge && onspringKnowledge.length) {\n    onspringData.knowledge = {\n      source: 'Onspring',\n      answered_count: onspringKnowledge.length,\n      answered_questions: onspringKnowledge\n    };\n  }\n\n  const hasOnspring = Object.keys(onspringData).length > 0;\n  const sources = ['World Bank', 'Atlas Vantage'];\n  if (hasOnspring) sources.push('Onspring');\n\n  const regionPreferred = onspringEntity?.region || onspringBenefits?.region || onspringEmployees?.region || c.region?.value || c.atlas_region;\n  const regionSource = onspringEntity?.region || onspringBenefits?.region || onspringEmployees?.region ? 'Onspring' : (c.region?.value ? 'World Bank' : 'Atlas Vantage');\n\n  // Build comprehensive JSON object\n  const jsonData = {\n    metadata: {\n      iso3: c.id || c.iso3,\n      iso2: c.iso2Code || c.atlas_iso2,\n      name: c.name,\n      official_name: c.atlas_name_official,\n      last_updated: timestamp,\n      sources\n    },\n    geography: {\n      region: regionPreferred,\n      region_source: regionSource,\n      capital: c.capitalCity || c.atlas_capital,\n      latitude: c.latitude || c.atlas_lat,\n      longitude: c.longitude || c.atlas_lon,\n      borders: c.atlas_borders,\n      continent: c.atlas_continent,\n      timezone: c.atlas_timezone,\n      source: c.region?.value ? 'World Bank / Atlas Vantage' : 'Atlas Vantage'\n    },\n    economy: {\n      income_level: c.incomeLevel?.value || c.atlas_income_level,\n      currency: c.atlas_currency,\n      currency_symbol: c.atlas_currency_symbol,\n      gdp_per_capita_usd: c.gdpPerCapitaInUSD || c.atlas_gdp_per_capita,\n      gni_per_capita_usd: c.gniPerCapita || c.atlas_gni_per_capita,\n      gdp_growth_pct: c.atlas_gdp_growth_pct,\n      inflation_pct: c.atlas_inflation_pct,\n      gini_index: c.atlas_gini_index,\n      source: 'World Bank / Atlas Vantage'\n    },\n    workforce: {\n      unemployment_pct: c.unemployment || c.atlas_unemployment_pct,\n      total_labor_force: c.totalLaborForce || c.atlas_total_labor_force,\n      labor_force_participation_pct: c.atlas_labor_force_participation,\n      female_labor_force_pct: c.atlas_female_labor_force_pct,\n      standard_work_hours_weekly: c.atlas_work_hours_weekly,\n      source: 'World Bank / Atlas Vantage'\n    },\n    demographics: {\n      population: c.atlas_population,\n      urban_population_pct: c.atlas_urban_population_pct,\n      life_expectancy: c.atlas_life_expectancy,\n      languages: c.atlas_languages,\n      source: 'Atlas Vantage'\n    },\n    infrastructure: {\n      internet_coverage_pct: c.atlas_internet_coverage_pct,\n      electricity_coverage_pct: c.atlas_electricity_coverage_pct,\n      mobile_subscriptions_per_100: c.atlas_mobile_subscriptions_per_100,\n      bank_account_pct: c.atlas_bank_account_pct,\n      healthcare_coverage_pct: c.atlas_healthcare_coverage_pct,\n      logistics_performance_index: c.atlas_logistics_performance,\n      source: 'Atlas Vantage'\n    },\n    governance: {\n      regulatory_quality_pct: c.atlas_regulatory_quality_pct,\n      rule_of_law_pct: c.atlas_rule_of_law_pct,\n      corruption_control_pct: c.atlas_corruption_control_pct,\n      source: 'Atlas Vantage'\n    },\n    atlas_scores: {\n      total_score: c.atlas_total_score,\n      economic_score: c.atlas_economic_score,\n      compliance_score: c.atlas_compliance_score,\n      workforce_score: c.atlas_workforce_score,\n      infrastructure_score: c.atlas_infrastructure_score,\n      source: 'Atlas Vantage'\n    },\n    employment_insights: {\n      employment_relationship: c.insights_employment_relationship,\n      employment_contracts: c.insights_employment_contracts,\n      probation_period: c.insights_probation_period,\n      working_hours: c.insights_working_hours,\n      minimum_employment_age: c.insights_minimum_age,\n      public_holidays: c.insights_public_holidays,\n      vacation_leave: c.insights_vacation_leave,\n      sick_leave: c.insights_sick_leave,\n      maternity_leave: c.insights_maternity_leave,\n      paternity_leave: c.insights_paternity_leave,\n      compensation: c.insights_compensation,\n      termination_severance: c.insights_termination,\n      social_security: c.insights_social_security,\n      taxation: c.insights_taxation,\n      immigration_visas: c.insights_immigration,\n      source: 'Atlas Vantage'\n    },\n    urls: {\n      cia_factbook: c.atlas_cia_factbook_url,\n      video_overview: c.atlas_video_url,\n      source: 'Atlas Vantage'\n    }\n  };\n\n  if (hasOnspring) {\n    jsonData.onspring = onspringData;\n  }\n\n  // Build Markdown content optimized for RAG\n  let md = `# ${c.name}\\n\\n`;\n\n  md += `## Overview\\n`;\n  md += `- **Official Name:** ${c.atlas_name_official || c.name}\\n`;\n  md += `- **ISO Codes:** ${c.iso2Code || c.atlas_iso2} / ${c.id || c.iso3}\\n`;\n  md += `- **Region:** ${regionPreferred || 'N/A'}${regionSource ? ` (Source: ${regionSource})` : ''}\\n`;\n  md += `- **Income Level:** ${c.incomeLevel?.value || c.atlas_income_level || 'N/A'}\\n`;\n  md += `- **Capital:** ${c.capitalCity || c.atlas_capital || 'N/A'}\\n`;\n  md += `- **Currency:** ${c.atlas_currency_symbol || ''} (${c.atlas_currency || 'N/A'})\\n`;\n  md += `- **Languages:** ${c.atlas_languages || 'N/A'}\\n`;\n  md += `- **Timezone:** ${c.atlas_timezone || 'N/A'}\\n\\n`;\n\n  if (hasOnspring) {\n    md += `## Onspring (Internal)\\n`;\n    md += `*Source: Onspring*\\n`;\n\n    if (onspringPocs && onspringPocs.length) {\n      md += `### Point of Contact\\n`;\n      for (const p of onspringPocs) {\n        const parts = [p.name, p.role].filter(Boolean).join(' - ');\n        const region = [p.region, p.sub_region].filter(Boolean).join(' / ');\n        md += `- ${parts || 'Contact'}${region ? ` (${region})` : ''}\\n`;\n      }\n      md += `\\n`;\n    }\n\n    if (onspringEntity) {\n      md += `### Entity Readiness\\n`;\n      md += `- **Entity:** ${onspringEntity.entity || 'N/A'}\\n`;\n      md += `- **Entity Status:** ${onspringEntity.entity_status || 'N/A'}\\n`;\n      md += `- **Can Sponsor:** ${onspringEntity.can_sponsor || 'N/A'}\\n\\n`;\n    }\n\n    if (onspringEmployees) {\n      md += `### Employee Counts\\n`;\n      md += `- **Internal Employees:** ${onspringEmployees.internal_employees ?? 'N/A'}\\n`;\n      md += `- **WSE Employees:** ${onspringEmployees.wse_employees ?? 'N/A'}\\n`;\n      md += `- **Total Employees:** ${onspringEmployees.total_employees ?? 'N/A'}\\n\\n`;\n    }\n\n    if (onspringBenefits) {\n      md += `### Benefits (Onspring)\\n`;\n      md += `- **Medical (Supplemental):** ${formatMdValue(onspringBenefits.medical_supplemental)}\\n`;\n      md += `- **Dental (Supplemental):** ${formatMdValue(onspringBenefits.dental_supplemental)}\\n`;\n      md += `- **Optical (Supplemental):** ${formatMdValue(onspringBenefits.optical_supplemental)}\\n`;\n      md += `- **Life (Supplemental):** ${formatMdValue(onspringBenefits.life_supplemental)}\\n`;\n      md += `- **LTD (Supplemental):** ${formatMdValue(onspringBenefits.ltd_supplemental)}\\n`;\n      md += `- **STD (Supplemental):** ${formatMdValue(onspringBenefits.std_supplemental)}\\n`;\n      md += `- **Travel Insurance:** ${formatMdValue(onspringBenefits.travel_insurance)}\\n`;\n      md += `- **Employee Assistance Program (EAP):** ${formatMdValue(onspringBenefits.employee_assistance_program)}\\n`;\n      md += `- **Additional Benefits/Comments:** ${formatMdValue(onspringBenefits.additional_benefits)}\\n\\n`;\n    }\n\n    if (onspringTasks && onspringTasks.length) {\n      md += `### Tasks (Onspring)\\n`;\n      for (const t of onspringTasks) {\n        const owner = t.task_owner ? `Owner: ${t.task_owner}` : null;\n        const group = t.task_group ? `Group: ${t.task_group}` : null;\n        const status = t.task_status ? `Status: ${t.task_status}` : null;\n        const meta = [owner, group, status].filter(Boolean).join(' | ');\n        const links = [t.doc_link, t.important_links, t.sharepoint_link].filter(Boolean).join(' | ');\n        const response = t.response ? `Response: ${t.response}` : null;\n        md += `- **${t.task_name || 'Task'}**${meta ? ` (${meta})` : ''}`;\n        if (response) md += `\n  - ${response}`;\n        if (links) md += `\n  - Links: ${links}`;\n        md += `\n`;\n      }\n      md += `\\n`;\n    }\n\n    if (onspringKnowledge && onspringKnowledge.length) {\n      md += `### Country Knowledge (Onspring)\\n`;\n      for (const k of onspringKnowledge) {\n        const label = [k.number, k.question_group, k.topic].filter(Boolean).join(' - ');\n        md += `- **${label || 'Question'}** ${formatMdValue(k.question)}\\n`;\n        md += `  - Answer: ${formatMdValue(k.answer)}\\n`;\n      }\n      md += `\\n`;\n    }\n  }\n\n  md += `## Economic Indicators\\n`;\n  md += `*Source: World Bank / Atlas Vantage*\\n`;\n  md += `- **GDP per Capita:** $${(c.gdpPerCapitaInUSD || c.atlas_gdp_per_capita || 0).toLocaleString()} USD\\n`;\n  md += `- **GNI per Capita:** $${(c.gniPerCapita || c.atlas_gni_per_capita || 0).toLocaleString()} USD\\n`;\n  md += `- **GDP Growth:** ${c.atlas_gdp_growth_pct || 'N/A'}%\\n`;\n  md += `- **Inflation Rate:** ${c.atlas_inflation_pct || 'N/A'}%\\n`;\n  md += `- **GINI Index:** ${c.atlas_gini_index || 'N/A'}\\n\\n`;\n\n  md += `## Workforce & Labor Market\\n`;\n  md += `*Source: World Bank / Atlas Vantage*\\n`;\n  md += `- **Unemployment Rate:** ${c.unemployment || c.atlas_unemployment_pct || 'N/A'}%\\n`;\n  md += `- **Total Labor Force:** ${(c.totalLaborForce || c.atlas_total_labor_force || 0).toLocaleString()}\\n`;\n  md += `- **Labor Force Participation:** ${c.atlas_labor_force_participation || 'N/A'}%\\n`;\n  md += `- **Female Labor Force:** ${c.atlas_female_labor_force_pct || 'N/A'}%\\n`;\n  md += `- **Standard Work Week:** ${c.atlas_work_hours_weekly || 'N/A'} hours\\n\\n`;\n\n  md += `## Demographics\\n`;\n  md += `*Source: Atlas Vantage*\\n`;\n  md += `- **Population:** ${(c.atlas_population || 0).toLocaleString()}\\n`;\n  md += `- **Urban Population:** ${c.atlas_urban_population_pct || 'N/A'}%\\n`;\n  md += `- **Life Expectancy:** ${c.atlas_life_expectancy || 'N/A'} years\\n\\n`;\n\n  md += `## Infrastructure\\n`;\n  md += `*Source: Atlas Vantage*\\n`;\n  md += `- **Internet Coverage:** ${c.atlas_internet_coverage_pct || 'N/A'}%\\n`;\n  md += `- **Electricity Access:** ${c.atlas_electricity_coverage_pct || 'N/A'}%\\n`;\n  md += `- **Mobile Subscriptions:** ${c.atlas_mobile_subscriptions_per_100 || 'N/A'} per 100 people\\n`;\n  md += `- **Bank Account Access:** ${c.atlas_bank_account_pct || 'N/A'}%\\n`;\n  md += `- **Healthcare Coverage:** ${c.atlas_healthcare_coverage_pct || 'N/A'}%\\n`;\n  md += `- **Logistics Performance Index:** ${c.atlas_logistics_performance || 'N/A'}\\n\\n`;\n\n  md += `## Governance Indicators\\n`;\n  md += `*Source: Atlas Vantage*\\n`;\n  md += `- **Regulatory Quality:** ${c.atlas_regulatory_quality_pct || 'N/A'}%\\n`;\n  md += `- **Rule of Law:** ${c.atlas_rule_of_law_pct || 'N/A'}%\\n`;\n  md += `- **Corruption Control:** ${c.atlas_corruption_control_pct || 'N/A'}%\\n\\n`;\n\n  md += `## Atlas Expansion Scores\\n`;\n  md += `*Source: Atlas Vantage*\\n`;\n  md += `- **Total Score:** ${c.atlas_total_score || 'N/A'}/100\\n`;\n  md += `- **Economic Score:** ${c.atlas_economic_score || 'N/A'}/100\\n`;\n  md += `- **Compliance Score:** ${c.atlas_compliance_score || 'N/A'}/100\\n`;\n  md += `- **Workforce Score:** ${c.atlas_workforce_score || 'N/A'}/100\\n`;\n  md += `- **Infrastructure Score:** ${c.atlas_infrastructure_score || 'N/A'}/100\\n\\n`;\n\n  md += `## Employment & Labor Laws\\n`;\n  md += `*Source: Atlas Vantage*\\n\\n`;\n\n  md += `### Employment Relationship\\n${c.insights_employment_relationship || 'No data available.'}\\n\\n`;\n  md += `### Employment Contracts\\n${c.insights_employment_contracts || 'No data available.'}\\n\\n`;\n  md += `### Probationary Period\\n${c.insights_probation_period || 'No data available.'}\\n\\n`;\n  md += `### Working Hours\\n${c.insights_working_hours || 'No data available.'}\\n\\n`;\n  md += `### Public Holidays\\n${c.insights_public_holidays || 'No data available.'}\\n\\n`;\n  md += `### Vacation Leave\\n${c.insights_vacation_leave || 'No data available.'}\\n\\n`;\n  md += `### Sick Leave\\n${c.insights_sick_leave || 'No data available.'}\\n\\n`;\n  md += `### Maternity Leave\\n${c.insights_maternity_leave || 'No data available.'}\\n\\n`;\n  md += `### Paternity Leave\\n${c.insights_paternity_leave || 'No data available.'}\\n\\n`;\n  md += `### Compensation & Wages\\n${c.insights_compensation || 'No data available.'}\\n\\n`;\n  md += `### Termination & Severance\\n${c.insights_termination || 'No data available.'}\\n\\n`;\n  md += `### Social Security\\n${c.insights_social_security || 'No data available.'}\\n\\n`;\n  md += `### Taxation\\n${c.insights_taxation || 'No data available.'}\\n\\n`;\n  md += `### Immigration & Visas\\n${c.insights_immigration || 'No data available.'}\\n\\n`;\n\n  md += `---\\n*Last Updated: ${timestamp}*\\n*Sources: ${sources.join(', ')}*\\n`;\n\n  output.push({\n    json: {\n      iso3: c.id || c.iso3,\n      country_name: c.name,\n      json_content: JSON.stringify(jsonData, null, 2),\n      markdown_content: md\n    }\n  });\n}\n\nreturn output;\n"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        17920,
        9024
      ],
      "id": "e8ad5e0e-f690-4996-be51-a449eac0f37a",
      "name": "Generate JSON and Markdown"
    },
    {
      "parameters": {
        "operation": "toText",
        "sourceProperty": "json_content",
        "options": {
          "fileName": "={{ $json.iso3 }}.json"
        }
      },
      "type": "n8n-nodes-base.convertToFile",
      "typeVersion": 1.1,
      "position": [
        18128,
        8944
      ],
      "id": "765212f4-d0e5-4bcd-8150-941289a9dda2",
      "name": "Convert JSON to File"
    },
    {
      "parameters": {
        "operation": "toText",
        "sourceProperty": "markdown_content",
        "options": {
          "fileName": "={{ $json.iso3 }}.md"
        }
      },
      "type": "n8n-nodes-base.convertToFile",
      "typeVersion": 1.1,
      "position": [
        18128,
        9104
      ],
      "id": "11a01cbf-2135-4d7c-9c10-56bc22ed8c10",
      "name": "Convert Markdown to File"
    },
    {
      "parameters": {
        "resource": "blob",
        "operation": "create",
        "container": {
          "__rl": true,
          "value": "sales-enablement",
          "mode": "list",
          "cachedResultName": "sales-enablement"
        },
        "blobCreate": "=country-data/{{ $('Generate JSON and Markdown').item.json.iso3 }}.md",
        "options": {},
        "requestOptions": {}
      },
      "type": "n8n-nodes-base.azureStorage",
      "typeVersion": 1,
      "position": [
        18336,
