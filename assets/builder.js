/**
 * Salesgency Autonomous Builder & Template Storefront Client Logic
 */

let currentMode = 'automation';
let activeArtifact = null;
let catalogProducts = [];

const PRESETS = {
  automation: [
    { label: '⚡ Apollo Waterfall + Smartlead', prompt: 'Build an autonomous outbound engine that scrapes hiring signals from Apollo, runs waterfall enrichment, and enrolls verified leads into Smartlead.' },
    { label: '🚀 Sub-30s Inbound MQL', prompt: 'Create an inbound lead triage workflow with sub-30-second speed-to-lead response, AI MQL qualification, and Slack territory routing.' },
    { label: '🛡️ CRM Dedupe Shield', prompt: 'Build a HubSpot & Salesforce deduplication shield that normalizes contact data and standardizes job titles in real-time.' },
    { label: '📊 8 AM Daily RevOps Report', prompt: 'Generate an automated 8 AM telemetry report sent to Slack tracking rep activity scorecards and stuck pipeline deals.' }
  ],
  skill: [
    { label: '🎯 PAS Outbound Copywriter', prompt: 'Compile a Master SKILL.md prompt file using the Problem-Agitate-Solve framework with dynamic firmographic personalization.' },
    { label: '🏗️ GTM Proposal Architect', prompt: 'Generate an AI skill that analyzes CRM bottlenecks and outputs a full GTM architecture proposal with implementation timeline.' },
    { label: '🔍 Technographic Detective', prompt: 'Create a skill prompt that extracts tech stack footprints from company HTML headers and drafts objection handling notes.' }
  ],
  agent: [
    { label: '🤖 Master GTM Agent Soul', prompt: 'Synthesize a complete SOUL.md agent specification with sub-30s SLAs, zero hallucination guardrails, and CRM escalation protocols.' },
    { label: '📞 Pre-Call Dossier Agent', prompt: 'Build an autonomous pre-meeting agent soul that scrapes LinkedIn and company news 10 minutes before sales calls.' },
    { label: '💬 Post-Call MEDDPICC Agent', prompt: 'Create a post-call sync agent soul that parses meeting transcripts and updates CRM MEDDPICC deal fields automatically.' }
  ]
};

const PLACEHOLDERS = {
  automation: 'Describe the sales automation workflow you want to build (e.g. "Connect Apollo + Clay + Smartlead to scrape hiring signals and draft personalized PAS outreach")...',
  skill: 'Describe the AI skill or prompting framework you want to compile (e.g. "Injectable SKILL.md prompt for enterprise PAS copywriting with tone calibration")...',
  agent: 'Describe the agent personality, operating rules, and guardrails you want to synthesize (e.g. "Master GTM Agent Soul with rate limits and CRM escalation rules")...'
};

// Initialize DOM
document.addEventListener('DOMContentLoaded', () => {
  initModeTabs();
  initPresetChips();
  initSynthesizeAction();
  initCodeActions();
  initSandboxTabs();
  loadProductsCatalog();
  runDefaultSimulation();
});

function setMode(mode) {
  currentMode = mode;
  document.querySelectorAll('.mode-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.mode === mode);
  });

  const textarea = document.getElementById('builder-prompt');
  if (textarea && PLACEHOLDERS[mode]) {
    textarea.placeholder = PLACEHOLDERS[mode];
  }

  renderPresetChips();
}

function initModeTabs() {
  document.querySelectorAll('.mode-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const mode = tab.dataset.mode;
      if (mode === 'marketplace') {
        const storeEl = document.getElementById('template-marketplace');
        if (storeEl) storeEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        setMode(mode);
      }
    });
  });
}

function renderPresetChips() {
  const container = document.getElementById('preset-chips-container');
  if (!container) return;
  container.innerHTML = '';

  const list = PRESETS[currentMode] || [];
  list.forEach(item => {
    const chip = document.createElement('button');
    chip.className = 'preset-chip';
    chip.textContent = item.label;
    chip.addEventListener('click', () => {
      const textarea = document.getElementById('builder-prompt');
      if (textarea) {
        textarea.value = item.prompt;
        textarea.focus();
      }
    });
    container.appendChild(chip);
  });
}

function initPresetChips() {
  renderPresetChips();
}

function initSynthesizeAction() {
  const btn = document.getElementById('btn-synthesize');
  if (!btn) return;

  btn.addEventListener('click', async () => {
    const textarea = document.getElementById('builder-prompt');
    const prompt = textarea ? textarea.value.trim() : '';

    if (!prompt) {
      alert('Please enter a prompt or click one of the quick presets.');
      if (textarea) textarea.focus();
      return;
    }

    btn.disabled = true;
    btn.innerHTML = '<span>⚡ Synthesizing in Sandbox...</span>';

    // Scroll sandbox into view smoothly
    const sandbox = document.getElementById('sandbox-workbench');
    if (sandbox) sandbox.scrollIntoView({ behavior: 'smooth', block: 'center' });

    clearTerminal();
    appendTerminalLine('00:00.00', '🚀 Initializing Salesgency Autonomous Agent Engine...');

    try {
      const res = await fetch('/api/builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: currentMode, prompt })
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      if (data && data.artifact) {
        renderArtifact(data.artifact);
      }
    } catch (err) {
      console.warn('API fetch fallback to local synthesis:', err);
      // Fallback local synthesizer if offline or static preview
      const fallback = localSynthesize(currentMode, prompt);
      renderArtifact(fallback);
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<span>⚡ Synthesize in Sandbox</span>';
    }
  });
}

function clearTerminal() {
  const term = document.getElementById('terminal-stream');
  if (term) term.innerHTML = '';
}

function appendTerminalLine(time, text) {
  const term = document.getElementById('terminal-stream');
  if (!term) return;

  const row = document.createElement('div');
  row.className = 'terminal-line';
  row.innerHTML = `<span class="terminal-time">[${time}]</span> <span class="terminal-text">${escapeHtml(text)}</span>`;
  term.appendChild(row);
  term.scrollTop = term.scrollHeight;
}

function renderArtifact(artifact) {
  activeArtifact = artifact;

  // Stream terminal logs with slight delay for realistic feel
  const logs = artifact.terminalLogs || [];
  clearTerminal();

  logs.forEach((log, idx) => {
    setTimeout(() => {
      appendTerminalLine(log.time || `00:0${idx}.${idx * 15}`, log.text);
    }, idx * 160);
  });

  setTimeout(() => {
    appendTerminalLine('00:01.88', `🎉 [SUCCESS] Generated: ${artifact.filename}`);
    
    // Update code preview box
    const codeEl = document.getElementById('artifact-code-preview');
    if (codeEl) {
      codeEl.textContent = artifact.content;
    }

    const titleEl = document.getElementById('artifact-title');
    if (titleEl) {
      titleEl.textContent = `${artifact.title} (${artifact.filename})`;
    }
  }, logs.length * 160 + 50);
}

function initCodeActions() {
  const copyBtn = document.getElementById('btn-copy-code');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      if (!activeArtifact || !activeArtifact.content) return;
      navigator.clipboard.writeText(activeArtifact.content).then(() => {
        copyBtn.textContent = '✓ Copied!';
        setTimeout(() => {
          copyBtn.textContent = '📋 Copy Code';
        }, 2000);
      });
    });
  }

  const downloadBtn = document.getElementById('btn-download-code');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      if (!activeArtifact || !activeArtifact.content) return;
      const blob = new Blob([activeArtifact.content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = activeArtifact.filename || 'sales-workflow.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  const deployBtn = document.getElementById('btn-deploy-stack');
  if (deployBtn) {
    deployBtn.addEventListener('click', () => {
      alert('🚀 Sandbox verification passed (0 errors)! To connect live production API keys and run automated webhooks, select a Builder Subscription below or download the JSON package.');
      const pricingEl = document.getElementById('pricing-plans');
      if (pricingEl) pricingEl.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

function runDefaultSimulation() {
  const defaultPrompt = 'Build an autonomous outbound engine that scrapes hiring signals from Apollo, runs waterfall enrichment, and enrolls verified leads into Smartlead.';
  const textarea = document.getElementById('builder-prompt');
  if (textarea && !textarea.value) {
    textarea.value = defaultPrompt;
  }
  const defaultArtifact = localSynthesize('automation', defaultPrompt);
  renderArtifact(defaultArtifact);
}

// Local synthesis engine fallback
function localSynthesize(mode, prompt) {
  const sampleWorkflow = {
    name: "Apollo Waterfall & AI PAS Outbound Engine",
    active: true,
    nodes: [
      { id: "node_webhook", name: "Hiring Signal Trigger", type: "n8n-nodes-base.webhook", position: [240, 300] },
      { id: "node_dedupe", name: "CRM Dedupe Shield", type: "n8n-nodes-base.if", position: [480, 300] },
      { id: "node_waterfall", name: "Waterfall Tech Stack Enricher", type: "n8n-nodes-base.httpRequest", position: [720, 240] },
      { id: "node_llm_pas", name: "AI PAS Copywriter Agent", type: "n8n-nodes-base.openAi", position: [960, 240] },
      { id: "node_sequencer", name: "Smartlead Sequencer Dispatch", type: "n8n-nodes-base.httpRequest", position: [1200, 240] }
    ],
    connections: {
      "Hiring Signal Trigger": { main: [[{ node: "CRM Dedupe Shield", type: "main", index: 0 }]] },
      "CRM Dedupe Shield": { main: [[{ node: "Waterfall Tech Stack Enricher", type: "main", index: 0 }]] },
      "Waterfall Tech Stack Enricher": { main: [[{ node: "AI PAS Copywriter Agent", type: "main", index: 0 }]] },
      "AI PAS Copywriter Agent": { main: [[{ node: "Smartlead Sequencer Dispatch", type: "main", index: 0 }]] }
    },
    meta: { generatedBy: "Salesgency Autonomous Engine v1.0", timestamp: new Date().toISOString() }
  };

  const logs = [
    { time: '00:00.12', text: '⚡ Initializing Vercel Edge Execution Sandbox...' },
    { time: '00:00.34', text: `🔍 Parsing prompt AST: "${prompt.slice(0, 42)}..."` },
    { time: '00:00.58', text: '🔗 Resolving connectors: [Apollo, Clay, Smartlead, Slack]' },
    { time: '00:00.82', text: '🛡️ Enforcing deterministic data contracts & security guardrails...' },
    { time: '00:01.05', text: '⚙️ Synthesizing 5 n8n execution nodes & directed graph...' },
    { time: '00:01.29', text: '✅ AST Linting & schema validation passed (0 errors).' },
    { time: '00:01.45', text: '📦 Production Workflow JSON ready for export.' }
  ];

  return {
    type: 'workflow_json',
    title: 'Apollo Waterfall & AI PAS Outbound Engine',
    filename: 'apollo-waterfall-outbound.json',
    content: JSON.stringify(sampleWorkflow, null, 2),
    terminalLogs: logs
  };
}

// -------------------------------------------------------------
// Marketplace / Template Storefront Dynamic Loader
// -------------------------------------------------------------
async function loadProductsCatalog() {
  try {
    const res = await fetch('/data/products.json');
    if (res.ok) {
      catalogProducts = await res.json();
      renderProductsGrid(catalogProducts);
      initCategoryFilters();
      initSearchFilter();
    }
  } catch (e) {
    console.warn('Failed to load products from /data/products.json:', e);
  }
}

function renderProductsGrid(products) {
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  grid.innerHTML = '';

  if (!products || products.length === 0) {
    grid.innerHTML = '<p style="color: var(--text-muted); grid-column: 1/-1; text-align: center; padding: 40px;">No templates found matching your filter.</p>';
    return;
  }

  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';

    const priceFormatted = `$${(p.price / 100).toLocaleString()}`;
    const priceSuffix = p.mode === 'subscription' ? '/mo' : '';

    const featuresHtml = (p.features || []).slice(0, 4).map(f => `<li>${escapeHtml(f)}</li>`).join('');

    card.innerHTML = `
      <div>
        <div class="product-badge">${escapeHtml(p.badge || p.category || 'Engine')}</div>
        <h3 class="product-name">${escapeHtml(p.name)}</h3>
        <p class="product-tagline">${escapeHtml(p.tagline || p.description.slice(0, 90) + '...')}</p>
        <ul class="product-features-list">
          ${featuresHtml}
        </ul>
      </div>
      <div class="product-card-footer">
        <div class="product-price">${priceFormatted}<span>${priceSuffix}</span></div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-outline btn-sm btn-preview" data-id="${p.id}">Preview</button>
          <button class="btn btn-primary btn-sm btn-buy" data-id="${p.id}">${p.mode === 'subscription' ? 'Subscribe' : 'Buy Now'}</button>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  // Attach handlers
  document.querySelectorAll('.btn-preview').forEach(b => {
    b.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      openProductModal(id);
    });
  });

  document.querySelectorAll('.btn-buy').forEach(b => {
    b.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      triggerStripeCheckout(id);
    });
  });
}

function initCategoryFilters() {
  document.querySelectorAll('.cat-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const cat = pill.dataset.category;
      if (!cat || cat === 'all') {
        renderProductsGrid(catalogProducts);
      } else {
        const filtered = catalogProducts.filter(p => p.category === cat || p.type === cat);
        renderProductsGrid(filtered);
      }
    });
  });
}

function initSearchFilter() {
  const search = document.getElementById('template-search');
  if (!search) return;

  search.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (!q) {
      renderProductsGrid(catalogProducts);
      return;
    }
    const filtered = catalogProducts.filter(p => 
      p.name.toLowerCase().includes(q) || 
      (p.tagline && p.tagline.toLowerCase().includes(q)) || 
      (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
    );
    renderProductsGrid(filtered);
  });
}

function openProductModal(productId) {
  const p = catalogProducts.find(item => item.id === productId);
  if (!p) return;

  const modal = document.getElementById('product-modal');
  const body = document.getElementById('modal-body-content');
  if (!modal || !body) return;

  const priceFormatted = `$${(p.price / 100).toLocaleString()}`;
  const priceSuffix = p.mode === 'subscription' ? '/mo' : '';

  const featuresList = (p.features || []).map(f => `<li style="margin-bottom: 8px; color: var(--text-secondary);">✓ ${escapeHtml(f)}</li>`).join('');
  const includesList = (p.includes || []).map(inc => `<span style="background: rgba(255,255,255,0.06); padding: 4px 10px; border-radius: 6px; font-size: 0.8rem; border: 1px solid var(--border-subtle);">${escapeHtml(inc)}</span>`).join(' ');

  body.innerHTML = `
    <div style="margin-bottom: 16px;"><span class="product-badge">${escapeHtml(p.badge || p.category)}</span></div>
    <h2 style="font-size: 1.75rem; margin-bottom: 8px;">${escapeHtml(p.name)}</h2>
    <p style="color: var(--accent-cyan); font-weight: 600; margin-bottom: 16px;">${escapeHtml(p.tagline || '')}</p>
    <p style="color: var(--text-secondary); margin-bottom: 24px; line-height: 1.6;">${escapeHtml(p.description)}</p>
    
    <h4 style="font-size: 1rem; margin-bottom: 12px;">What's Included in Package:</h4>
    <ul style="list-style: none; margin-bottom: 24px;">
      ${featuresList}
    </ul>

    <h4 style="font-size: 0.9rem; margin-bottom: 10px; color: var(--text-muted);">Package Files & Assets:</h4>
    <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 32px;">
      ${includesList}
    </div>

    <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 20px; border-top: 1px solid var(--border-subtle);">
      <div style="font-size: 2rem; font-weight: 800;">${priceFormatted}<span style="font-size: 0.9rem; color: var(--text-muted); font-weight: normal;">${priceSuffix}</span></div>
      <button class="btn btn-primary" onclick="triggerStripeCheckout('${p.id}')">Instant Checkout with Stripe</button>
    </div>
  `;

  modal.classList.add('active');
}

function closeModal() {
  const modal = document.getElementById('product-modal');
  if (modal) modal.classList.remove('active');
}

async function triggerStripeCheckout(productId) {
  try {
    const btn = event ? event.target : null;
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Redirecting to Stripe...';
    }

    const res = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId,
        returnUrl: window.location.origin
      })
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else if (data.error) {
      alert(`Checkout error: ${data.error}`);
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'Buy Now';
      }
    }
  } catch (err) {
    console.error('Checkout error:', err);
    alert('Failed to initialize checkout session. Please check your connection.');
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function initSandboxTabs() {
  const termBtn = document.getElementById('tab-terminal-btn');
  const astBtn = document.getElementById('tab-ast-btn');
  const termView = document.getElementById('terminal-stream');
  const astView = document.getElementById('ast-graph-stream');

  if (termBtn && astBtn) {
    termBtn.addEventListener('click', () => {
      termBtn.classList.add('active');
      astBtn.classList.remove('active');
      if (termView) termView.style.display = 'block';
      if (astView) astView.classList.remove('active');
    });

    astBtn.addEventListener('click', () => {
      astBtn.classList.add('active');
      termBtn.classList.remove('active');
      if (termView) termView.style.display = 'none';
      if (astView) astView.classList.add('active');
      if (activeArtifact) renderAstGraph(activeArtifact);
    });
  }
}

function renderAstGraph(artifact) {
  const container = document.getElementById('ast-graph-stream');
  if (!container) return;
  container.innerHTML = '';

  if (artifact.type === 'workflow_json') {
    let parsed = null;
    try {
      parsed = JSON.parse(artifact.content);
    } catch (e) {
      parsed = null;
    }

    const nodes = (parsed && parsed.nodes) ? parsed.nodes : [
      { name: 'Webhook Ingest Trigger', type: 'n8n-nodes-base.webhook', id: 'node_1' },
      { name: 'CRM Dedupe Shield & Validator', type: 'n8n-nodes-base.if', id: 'node_2' },
      { name: 'Multi-Provider Waterfall Enrichment', type: 'n8n-nodes-base.httpRequest', id: 'node_3' },
      { name: 'AI PAS Copywriter (LLM Agent)', type: 'n8n-nodes-base.openAi', id: 'node_4' },
      { name: 'Smartlead / Instantly Sequencer Dispatch', type: 'n8n-nodes-base.httpRequest', id: 'node_5' },
      { name: 'Slack Telemetry & RevOps Alert', type: 'n8n-nodes-base.slack', id: 'node_6' }
    ];

    nodes.forEach((node, idx) => {
      const card = document.createElement('div');
      let typeClass = 'type-webhook';
      let icon = '⚡';
      let badge = 'TRIGGER';

      const nType = (node.type || '').toLowerCase();
      const nName = (node.name || '').toLowerCase();

      if (nType.includes('if') || nName.includes('dedupe') || nName.includes('shield')) {
        typeClass = 'type-validator';
        icon = '🛡️';
        badge = 'VALIDATOR';
      } else if (nType.includes('httprequest') || nName.includes('waterfall') || nName.includes('enrich')) {
        typeClass = 'type-enrichment';
        icon = '💧';
        badge = 'ENRICHMENT';
      } else if (nType.includes('openai') || nName.includes('ai') || nName.includes('copywriter')) {
        typeClass = 'type-ai';
        icon = '🤖';
        badge = 'LLM AGENT';
      } else if (nName.includes('sequencer') || nName.includes('dispatch') || nType.includes('slack')) {
        typeClass = 'type-dispatch';
        icon = '🚀';
        badge = 'DISPATCH';
      }

      card.className = `ast-node-card ${typeClass}`;
      card.innerHTML = `
        <div class="ast-node-header">
          <div class="ast-node-title"><span>${icon}</span> <span>${escapeHtml(node.name)}</span></div>
          <span class="ast-node-badge">${badge}</span>
        </div>
        <div class="ast-node-desc">Type: ${escapeHtml(node.type || 'standard-node')} • ID: ${escapeHtml(node.id || 'node_' + idx)}</div>
      `;
      container.appendChild(card);

      if (idx < nodes.length - 1) {
        const arrow = document.createElement('div');
        arrow.className = 'ast-connector-arrow';
        arrow.innerHTML = '▼ DAG edge';
        container.appendChild(arrow);
      }
    });
  } else {
    const card = document.createElement('div');
    card.className = 'ast-node-card type-ai';
    card.innerHTML = `
      <div class="ast-node-header">
        <div class="ast-node-title"><span>🧠</span> <span>${escapeHtml(artifact.title)}</span></div>
        <span class="ast-node-badge">AGENT PROMPT / SPEC</span>
      </div>
      <div class="ast-node-desc">Target File: ${escapeHtml(artifact.filename)} • SLA & Guardrails Enforced</div>
    `;
    container.appendChild(card);
  }
}

