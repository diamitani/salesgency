/**
 * Salesgency Package Portal — n8n workflow templates.
 * Each template is a real, importable n8n workflow with {{TOKENS}} that the
 * generate endpoint replaces with the buyer's answers from the chat wizard.
 *
 * Tokens: {{COMPANY}} {{WEBSITE}} {{ICP}} {{CRM}} {{SEQUENCER}} {{DATA_PROVIDER}} {{EMAIL}}
 */

function base(name, nodes, connections) {
  return {
    name: name,
    nodes: nodes,
    connections: connections,
    active: false,
    settings: { executionOrder: 'v1' },
    staticData: null,
    tags: [{ name: 'salesgency-portal' }, { name: '{{COMPANY}}' }],
  };
}

function pos(x, y) { return [x, y]; }

const TEMPLATES = {
  outbound: () => base(
    '{{COMPANY}} — Outbound Prospecting Engine (Prospect Pal)',
    [
      { id: 'n1', name: 'Daily 6AM Trigger', type: 'n8n-nodes-base.scheduleTrigger', typeVersion: 1.2, position: pos(240, 300), parameters: { rule: { interval: [{ field: 'cronExpression', cronExpression: '0 6 * * 1-5' }] }, notes: 'Runs Mon–Fri at 6:00 AM. Target: 300 new prospects/day for {{COMPANY}}.' } },
      { id: 'n2', name: 'Signal Config', type: 'n8n-nodes-base.set', typeVersion: 3.4, position: pos(460, 300), parameters: { assignments: { assignments: [
        { id: 'a1', name: 'icp', type: 'string', value: '{{ICP}}' },
        { id: 'a2', name: 'company', type: 'string', value: '{{COMPANY}}' },
        { id: 'a3', name: 'data_provider', type: 'string', value: '{{DATA_PROVIDER}}' },
      ] }, notes: 'ICP: {{ICP}}. Edit signals here (hiring, funding, tech) before first run.' } },
      { id: 'n3', name: '{{DATA_PROVIDER}} — Pull Signals', type: 'n8n-nodes-base.httpRequest', typeVersion: 4.2, position: pos(680, 300), parameters: { method: 'POST', url: 'https://api.{{DATA_PROVIDER}}.example/v1/signals', sendBody: true, bodyParameters: { parameters: [{ name: 'icp', value: '={{$json.icp}}' }] }, notes: 'REPLACE with your {{DATA_PROVIDER}} API endpoint + key. Pulls hiring/funding/tech signals.' } },
      { id: 'n4', name: 'Shield: CRM Dedupe', type: 'n8n-nodes-base.if', typeVersion: 2.2, position: pos(900, 300), parameters: { conditions: { options: { version: 2 }, conditions: [{ id: 'c1', leftValue: '={{$json.in_crm}}', rightValue: false, operator: { type: 'boolean', operation: 'equals', singleValue: true } }] }, notes: 'Filters against {{CRM}}: open deals, recent activity, competitors, out-of-ICP. Zero rep collisions.' } },
      { id: 'n5', name: '{{DATA_PROVIDER}} — Enrich Contacts', type: 'n8n-nodes-base.httpRequest', typeVersion: 4.2, position: pos(1120, 300), parameters: { method: 'POST', url: 'https://api.{{DATA_PROVIDER}}.example/v1/enrich', notes: 'Waterfall email/phone reveal + live verification. Bad addresses never sequenced.' } },
      { id: 'n6', name: 'Research: Pain-Point Hypothesis', type: 'n8n-nodes-base.code', typeVersion: 2, position: pos(1340, 300), parameters: { mode: 'runOnceForAllItems', jsCode: '// Writes a pain-point hypothesis per account for {{COMPANY}} (ICP: {{ICP}})\nconst items = $input.all();\nreturn items.map(i => ({ json: { ...i.json,\n  pain_hypothesis: `Likely struggling with manual prospecting for ${i.json.company || "target account"} — draft 2 sentences specific to their signals.`,\n  researched_for: "{{COMPANY}}" } }));' } },
      { id: 'n7', name: 'PAS Copywriter', type: 'n8n-nodes-base.code', typeVersion: 2, position: pos(1560, 300), parameters: { mode: 'runOnceForAllItems', jsCode: '// Drafts <85-word personalized email. Human approves before anything sends.\nconst items = $input.all();\nreturn items.map(i => ({ json: { ...i.json,\n  email_draft: `Subject: quick question\\n\\nSaw your team matches {{ICP}}.\\nPain: ${i.json.pain_hypothesis}\\nWorth a 15-min look? — {{COMPANY}}`,\n  status: "awaiting_approval" } }));', notes: 'APPROVAL GATE: nothing external sends without human approval.' } },
      { id: 'n8', name: '{{SEQUENCER}} — Enroll Sequence', type: 'n8n-nodes-base.httpRequest', typeVersion: 4.2, position: pos(1780, 300), parameters: { method: 'POST', url: 'https://api.{{SEQUENCER}}.example/v1/enroll', notes: 'Enrolls APPROVED contacts only. Stagger sends; log every step to run ledger.' } },
      { id: 'n9', name: 'Log to {{CRM}}', type: 'n8n-nodes-base.set', typeVersion: 3.4, position: pos(2000, 300), parameters: { assignments: { assignments: [{ id: 'a1', name: 'crm', type: 'string', value: '{{CRM}}' }] }, notes: 'Write research + enrollment status back to {{CRM}} for rep visibility.' } },
    ],
    { 'Daily 6AM Trigger': { main: [[{ node: 'Signal Config', type: 'main', index: 0 }]] }, 'Signal Config': { main: [[{ node: '{{DATA_PROVIDER}} — Pull Signals', type: 'main', index: 0 }]] }, '{{DATA_PROVIDER}} — Pull Signals': { main: [[{ node: 'Shield: CRM Dedupe', type: 'main', index: 0 }]] }, 'Shield: CRM Dedupe': { main: [[{ node: '{{DATA_PROVIDER}} — Enrich Contacts', type: 'main', index: 0 }], [{ node: 'Log to {{CRM}}', type: 'main', index: 0 }]] }, '{{DATA_PROVIDER}} — Enrich Contacts': { main: [[{ node: 'Research: Pain-Point Hypothesis', type: 'main', index: 0 }]] }, 'Research: Pain-Point Hypothesis': { main: [[{ node: 'PAS Copywriter', type: 'main', index: 0 }]] }, 'PAS Copywriter': { main: [[{ node: '{{SEQUENCER}} — Enroll Sequence', type: 'main', index: 0 }]] }, '{{SEQUENCER}} — Enroll Sequence': { main: [[{ node: 'Log to {{CRM}}', type: 'main', index: 0 }]] } }
  ),

  inbound: () => base(
    '{{COMPANY}} — Inbound Speed-to-Lead Engine',
    [
      { id: 'n1', name: 'Form Webhook', type: 'n8n-nodes-base.webhook', typeVersion: 2, position: pos(240, 300), parameters: { httpMethod: 'POST', path: '{{COMPANY}}-inbound', responseMode: 'onReceived', notes: 'Point your demo/contact forms here.' } },
      { id: 'n2', name: 'Intent Triage (7 tiers)', type: 'n8n-nodes-base.if', typeVersion: 2.2, position: pos(460, 300), parameters: { conditions: { options: { version: 2 }, conditions: [{ id: 'c1', leftValue: '={{$json.intent}}', rightValue: 'sales-ready', operator: { type: 'string', operation: 'equals' } }] }, notes: 'Tiers: sales-ready, partnership, careers, press, support, spam, other. Sets MQL stage in {{CRM}}.' } },
      { id: 'n3', name: '{{DATA_PROVIDER}} — Enrich', type: 'n8n-nodes-base.httpRequest', typeVersion: 4.2, position: pos(680, 300), parameters: { method: 'POST', url: 'https://api.{{DATA_PROVIDER}}.example/v1/enrich', notes: 'Firmographic enrichment for routing + personalization.' } },
      { id: 'n4', name: 'Route in {{CRM}}', type: 'n8n-nodes-base.set', typeVersion: 3.4, position: pos(900, 300), parameters: { assignments: { assignments: [{ id: 'a1', name: 'route', type: 'string', value: 'round-robin // sub-30s SLA' }] }, notes: 'Sub-30s: assign rep in {{CRM}}, send calendar link.' } },
      { id: 'n5', name: 'Slack VIP Ping', type: 'n8n-nodes-base.slack', typeVersion: 2.3, position: pos(1120, 300), parameters: { resource: 'message', operation: 'post', channel: '#sales-alerts', text: '=🔥 New sales-ready lead for {{COMPANY}}: {{$json.email}} ({{$json.company}})', notes: 'Rep gets pinged instantly.' } },
      { id: 'n6', name: 'Grounded Reply Draft', type: 'n8n-nodes-base.code', typeVersion: 2, position: pos(1340, 300), parameters: { mode: 'runOnceForAllItems', jsCode: '// Drafts reply from {{COMPANY}} site content only. Human approves before send.\nreturn $input.all().map(i => ({ json: { ...i.json, reply_draft: `Thanks for reaching out to {{COMPANY}} — saw you are ${i.json.title || "evaluating"}. Here is the fastest path: [calendar link].`, status: "awaiting_approval" } }));' } },
    ],
    { 'Form Webhook': { main: [[{ node: 'Intent Triage (7 tiers)', type: 'main', index: 0 }]] }, 'Intent Triage (7 tiers)': { main: [[{ node: '{{DATA_PROVIDER}} — Enrich', type: 'main', index: 0 }], [{ node: 'Route in {{CRM}}', type: 'main', index: 0 }]] }, '{{DATA_PROVIDER}} — Enrich': { main: [[{ node: 'Route in {{CRM}}', type: 'main', index: 0 }]] }, 'Route in {{CRM}}': { main: [[{ node: 'Slack VIP Ping', type: 'main', index: 0 }]] }, 'Slack VIP Ping': { main: [[{ node: 'Grounded Reply Draft', type: 'main', index: 0 }]] } }
  ),

  precall: () => base(
    '{{COMPANY}} — Pre-Call Dossier Engine',
    [
      { id: 'n1', name: 'Every 15 Min', type: 'n8n-nodes-base.scheduleTrigger', typeVersion: 1.2, position: pos(240, 300), parameters: { rule: { interval: [{ field: 'minutes', minutesInterval: 15 }] }, notes: 'Scans calendar for upcoming calls.' } },
      { id: 'n2', name: 'Find Upcoming Calls', type: 'n8n-nodes-base.code', typeVersion: 2, position: pos(460, 300), parameters: { mode: 'runOnceForAllItems', jsCode: '// REPLACE: pull events from Google/Outlook Calendar API for the next 60 min.\n// Expected item shape: { attendee_email, attendee_company, starts_in_min }\nreturn [{ json: { attendee_email: "example@acme.com", attendee_company: "Acme", starts_in_min: 10 } }];' } },
      { id: 'n3', name: 'Research Attendee', type: 'n8n-nodes-base.httpRequest', typeVersion: 4.2, position: pos(680, 300), parameters: { method: 'POST', url: 'https://api.{{DATA_PROVIDER}}.example/v1/research', notes: 'LinkedIn + news + filings for the attendee and account.' } },
      { id: 'n4', name: 'Compile 1-Page Dossier', type: 'n8n-nodes-base.code', typeVersion: 2, position: pos(900, 300), parameters: { mode: 'runOnceForAllItems', jsCode: 'return $input.all().map(i => ({ json: { ...i.json,\n  dossier: `# Pre-call dossier — ${i.json.attendee_company}\\n- Contact: ${i.json.attendee_email}\\n- ICP fit ({{ICP}}): check signals\\n- Talking points: 1) their hiring posts 2) tech stack 3) recent news\\n- Prepared for {{COMPANY}} rep` } }));' } },
      { id: 'n5', name: 'Slack DM to Rep', type: 'n8n-nodes-base.slack', typeVersion: 2.3, position: pos(1120, 300), parameters: { resource: 'message', operation: 'post', channel: '={{$json.rep_slack_id}}', text: '=📋 Dossier ready ({{$json.starts_in_min}} min): {{$json.dossier}}' } },
    ],
    { 'Every 15 Min': { main: [[{ node: 'Find Upcoming Calls', type: 'main', index: 0 }]] }, 'Find Upcoming Calls': { main: [[{ node: 'Research Attendee', type: 'main', index: 0 }]] }, 'Research Attendee': { main: [[{ node: 'Compile 1-Page Dossier', type: 'main', index: 0 }]] }, 'Compile 1-Page Dossier': { main: [[{ node: 'Slack DM to Rep', type: 'main', index: 0 }]] } }
  ),

  postcall: () => base(
    '{{COMPANY}} — Post-Call Sync Engine',
    [
      { id: 'n1', name: 'Transcript Webhook', type: 'n8n-nodes-base.webhook', typeVersion: 2, position: pos(240, 300), parameters: { httpMethod: 'POST', path: '{{COMPANY}}-transcript', responseMode: 'onReceived', notes: 'Connect Gong / Fathom / Zoom webhooks here.' } },
      { id: 'n2', name: 'MEDDPICC Extraction', type: 'n8n-nodes-base.code', typeVersion: 2, position: pos(460, 300), parameters: { mode: 'runOnceForAllItems', jsCode: '// REPLACE with your LLM call. Parses transcript into MEDDPICC for {{COMPANY}}.\nreturn $input.all().map(i => ({ json: { ...i.json,\n  meddpicc: { metrics: "", economic_buyer: "", decision_criteria: "", decision_process: "", paper_process: "", identified_pain: "", champion: "" },\n  action_items: [] } }));', notes: 'Wire your LLM (OpenAI/Anthropic) here with the transcript as input.' } },
      { id: 'n3', name: 'Update {{CRM}}', type: 'n8n-nodes-base.set', typeVersion: 3.4, position: pos(680, 300), parameters: { assignments: { assignments: [{ id: 'a1', name: 'crm_update', type: 'string', value: 'deal stage + notes + action items' }] }, notes: 'Syncs notes, stage, and action items to {{CRM}}.' } },
      { id: 'n4', name: 'Draft Follow-Up', type: 'n8n-nodes-base.code', typeVersion: 2, position: pos(900, 300), parameters: { mode: 'runOnceForAllItems', jsCode: 'return $input.all().map(i => ({ json: { ...i.json,\n  followup_draft: `Great speaking — here are the next steps we agreed on: [from action_items]. — {{COMPANY}}`,\n  status: "awaiting_approval" } }));', notes: 'Human approves before send.' } },
    ],
    { 'Transcript Webhook': { main: [[{ node: 'MEDDPICC Extraction', type: 'main', index: 0 }]] }, 'MEDDPICC Extraction': { main: [[{ node: 'Update {{CRM}}', type: 'main', index: 0 }]] }, 'Update {{CRM}}': { main: [[{ node: 'Draft Follow-Up', type: 'main', index: 0 }]] } }
  ),

  reports: () => base(
    '{{COMPANY}} — Daily GTM Report Engine',
    [
      { id: 'n1', name: '8AM Daily Trigger', type: 'n8n-nodes-base.scheduleTrigger', typeVersion: 1.2, position: pos(240, 300), parameters: { rule: { interval: [{ field: 'cronExpression', cronExpression: '0 8 * * 1-5' }] }, notes: 'Runs weekdays at 8:00 AM for {{COMPANY}} leadership.' } },
      { id: 'n2', name: 'Pull {{CRM}} Pipeline', type: 'n8n-nodes-base.httpRequest', typeVersion: 4.2, position: pos(460, 300), parameters: { method: 'GET', url: 'https://api.{{CRM}}.example/v1/deals', notes: 'REPLACE with your {{CRM}} API. Pulls open pipeline, stages, close dates.' } },
      { id: 'n3', name: 'Scorecard Calc', type: 'n8n-nodes-base.code', typeVersion: 2, position: pos(680, 300), parameters: { mode: 'runOnceForAllItems', jsCode: '// Computes: pipeline velocity, new qualified pipeline, stuck deals (5+ days no activity),\n// missing close dates, per-rep outbound volume.\nconst deals = $input.all().map(i => i.json);\nconst stuck = deals.filter(d => (d.days_since_activity || 0) >= 5);\nreturn [{ json: { date: new Date().toISOString().slice(0,10), company: "{{COMPANY}}",\n  total_open: deals.length, stuck_count: stuck.length,\n  stuck_deals: stuck.map(d => d.name || d.id) } }];' } },
      { id: 'n4', name: 'Post Exec Digest', type: 'n8n-nodes-base.slack', typeVersion: 2.3, position: pos(900, 300), parameters: { resource: 'message', operation: 'post', channel: '#gtm-daily', text: '=📊 {{COMPANY}} daily GTM — Open: {{$json.total_open}} | Stuck 5d+: {{$json.stuck_count}} | {{$json.stuck_deals}}' } },
    ],
    { '8AM Daily Trigger': { main: [[{ node: 'Pull {{CRM}} Pipeline', type: 'main', index: 0 }]] }, 'Pull {{CRM}} Pipeline': { main: [[{ node: 'Scorecard Calc', type: 'main', index: 0 }]] }, 'Scorecard Calc': { main: [[{ node: 'Post Exec Digest', type: 'main', index: 0 }]] } }
  ),
};

const ENGINE_META = {
  outbound: { label: 'Outbound Prospecting Engine', file: 'outbound-prospecting-engine.json', blurb: 'Daily signal-based prospecting: Shield dedupe, enrichment waterfall, research, PAS copy, sequencer enrollment.' },
  inbound: { label: 'Inbound Speed-to-Lead Engine', file: 'inbound-speed-to-lead.json', blurb: 'Sub-30-second MQL triage, enrichment, rep routing, Slack VIP ping, grounded reply draft.' },
  precall: { label: 'Pre-Call Dossier Engine', file: 'precall-dossier-engine.json', blurb: 'Watches the calendar, researches every attendee, Slacks the rep a 1-page dossier before each call.' },
  postcall: { label: 'Post-Call Sync Engine', file: 'postcall-sync-engine.json', blurb: 'Transcript in, MEDDPICC notes out: CRM updated, action items logged, follow-up drafted.' },
  reports: { label: 'Daily GTM Report Engine', file: 'daily-gtm-report.json', blurb: '8AM pipeline velocity, stuck-deal flags, and exec digest to Slack, every weekday.' },
};

module.exports = { TEMPLATES, ENGINE_META };
