/**
 * SalesGency Booking Wizard
 * Conversational chat-style qualification → recommendation → Stripe checkout
 */
(function(window) {
  'use strict';

  const STEPS = [
    {
      id: 'welcome',
      bot: "Hey! 👋 I'm the SalesGency Workflow Architect. I'll help you find the right automation package for your revenue team. Ready?",
      type: 'action',
      actionLabel: "Let's go →"
    },
    {
      id: 'teamSize',
      bot: "First — how many sales reps are on your team?",
      type: 'chips',
      options: ['1–5', '6–15', '16–50', '50+']
    },
    {
      id: 'crm',
      bot: "What CRM does your team run on?",
      type: 'chips',
      options: ['HubSpot', 'Salesforce', 'Close', 'Spreadsheets', 'Other']
    },
    {
      id: 'primaryPain',
      bot: "What's your #1 revenue bottleneck right now?",
      type: 'chips',
      options: [
        'Outbound reply rates',
        'Inbound speed-to-lead',
        'CRM data quality',
        'Meeting prep / post-call',
        'Pipeline visibility',
        'All of the above'
      ]
    },
    {
      id: 'leadVolume',
      bot: "Roughly how many leads or outbound emails per month?",
      type: 'chips',
      options: ['Under 500', '500–2K', '2K–10K', '10K+']
    },
    {
      id: 'recommendation',
      bot: null, // Dynamic — set by generateRecommendation()
      type: 'recommendation'
    },
    {
      id: 'email',
      bot: "Great choice! Drop your email and we'll take you to secure checkout.",
      type: 'email'
    }
  ];

  let currentStep = 0;
  let answers = {};
  let selectedProduct = null;

  function scrollToBottom() {
    const container = document.getElementById('wizardMessages');
    if (container) {
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }, 100);
    }
  }

  function addBotMessage(html, delay = 600) {
    const container = document.getElementById('wizardMessages');
    if (!container) return;

    // Show typing indicator
    const typingId = 'typing-' + Date.now();
    container.innerHTML += `
      <div class="chat-message bot" id="${typingId}">
        <div class="chat-avatar bot">S</div>
        <div class="chat-typing">
          <div class="chat-typing-dot"></div>
          <div class="chat-typing-dot"></div>
          <div class="chat-typing-dot"></div>
        </div>
      </div>
    `;
    scrollToBottom();

    return new Promise(resolve => {
      setTimeout(() => {
        const typingEl = document.getElementById(typingId);
        if (typingEl) typingEl.remove();

        container.innerHTML += `
          <div class="chat-message bot">
            <div class="chat-avatar bot">S</div>
            <div class="chat-bubble bot">${html}</div>
          </div>
        `;
        scrollToBottom();
        resolve();
      }, delay);
    });
  }

  function addUserMessage(text) {
    const container = document.getElementById('wizardMessages');
    if (!container) return;

    container.innerHTML += `
      <div class="chat-message user">
        <div class="chat-avatar user">You</div>
        <div class="chat-bubble user">${text}</div>
      </div>
    `;
    scrollToBottom();
  }

  function addInteraction(html) {
    const container = document.getElementById('wizardMessages');
    if (!container) return;

    container.innerHTML += `
      <div class="chat-message bot" style="max-width: 95%;">
        <div class="chat-avatar bot" style="visibility: hidden;">S</div>
        <div style="flex: 1;">${html}</div>
      </div>
    `;
    scrollToBottom();
  }

  function generateRecommendation() {
    const pain = answers.primaryPain || '';
    const volume = answers.leadVolume || '';
    const isPainMultiple = pain === 'All of the above' || pain === 'Pipeline visibility';
    const isHighVolume = volume === '2K–10K' || volume === '10K+';

    let recommended, alternative;

    if (isPainMultiple || isHighVolume) {
      recommended = {
        id: 'build-session',
        name: 'The $1,000 Build Session',
        desc: '4 hours of live co-building across 6 sessions. Walk away with a working prototype on real data.',
        price: '$1,000',
        isRecommended: true
      };
      alternative = {
        id: 'master-bundle',
        name: 'Master GTM Bundle',
        desc: 'All 6 engines + every advanced package + lifetime updates. DIY deployment.',
        price: '$1,997',
        isRecommended: false
      };
    } else if (pain === 'Outbound reply rates') {
      recommended = {
        id: 'outbound-automation',
        name: 'Outbound Automation Engine',
        desc: '5-Pillar PAE: triggers → dedupe → enrichment → AI copy → sequence enrollment.',
        price: '$399',
        isRecommended: true
      };
      alternative = {
        id: 'build-session',
        name: 'The $1,000 Build Session',
        desc: 'Want us to build it with you? 4 hours, 6 sessions, live prototype.',
        price: '$1,000',
        isRecommended: false
      };
    } else if (pain === 'Inbound speed-to-lead') {
      recommended = {
        id: 'inbound-automation',
        name: 'Inbound Automation Engine',
        desc: 'Sub-30s speed-to-lead with AI qualification, routing, and calendar booking.',
        price: '$299',
        isRecommended: true
      };
      alternative = {
        id: 'build-session',
        name: 'The $1,000 Build Session',
        desc: 'Want custom configuration? We co-build it with you live.',
        price: '$1,000',
        isRecommended: false
      };
    } else if (pain === 'CRM data quality') {
      recommended = {
        id: 'crm-hygiene',
        name: 'CRM Hygiene & Dedupe Engine',
        desc: 'Automated deduplication, normalization, and ongoing data hygiene.',
        price: '$397',
        isRecommended: true
      };
      alternative = {
        id: 'build-session',
        name: 'The $1,000 Build Session',
        desc: 'Need custom CRM logic? We architect and prototype it together.',
        price: '$1,000',
        isRecommended: false
      };
    } else {
      // Meeting prep / post-call
      recommended = {
        id: 'build-session',
        name: 'The $1,000 Build Session',
        desc: '4 hours of live co-building. Pre-call dossiers + post-call CRM sync customized to your stack.',
        price: '$1,000',
        isRecommended: true
      };
      alternative = {
        id: 'pre-call-automation',
        name: 'Pre-Call Automation Engine',
        desc: 'Autonomous 10-minute pre-call dossier with LinkedIn, tech stack, and talk tracks.',
        price: '$249',
        isRecommended: false
      };
    }

    return { recommended, alternative };
  }

  async function processStep() {
    const step = STEPS[currentStep];
    if (!step) return;

    if (step.type === 'recommendation') {
      const { recommended, alternative } = generateRecommendation();
      const teamSize = answers.teamSize || '';
      const pain = answers.primaryPain || '';

      await addBotMessage(`Based on your team (${teamSize} reps) and primary bottleneck (${pain.toLowerCase()}), here's what I'd recommend:`);

      const recCardsHtml = `
        <div class="wizard-recommendation">
          <div class="wizard-rec-card recommended" onclick="SalesgencyWizard.selectProduct('${recommended.id}')">
            <div class="wizard-rec-info">
              <h4>${recommended.name}</h4>
              <p>${recommended.desc}</p>
            </div>
            <div class="wizard-rec-price">${recommended.price}</div>
          </div>
          <div class="wizard-rec-card" onclick="SalesgencyWizard.selectProduct('${alternative.id}')">
            <div class="wizard-rec-info">
              <h4>${alternative.name}</h4>
              <p>${alternative.desc}</p>
            </div>
            <div class="wizard-rec-price">${alternative.price}</div>
          </div>
        </div>
      `;
      addInteraction(recCardsHtml);
      return;
    }

    if (step.bot) {
      await addBotMessage(step.bot);
    }

    if (step.type === 'action') {
      addInteraction(`
        <div class="wizard-chips">
          <button class="wizard-chip" onclick="SalesgencyWizard.advance()">${step.actionLabel}</button>
        </div>
      `);
    } else if (step.type === 'chips') {
      const chipsHtml = step.options.map(opt =>
        `<button class="wizard-chip" onclick="SalesgencyWizard.selectChip('${step.id}', '${opt}', this)">${opt}</button>`
      ).join('');
      addInteraction(`<div class="wizard-chips">${chipsHtml}</div>`);
    } else if (step.type === 'email') {
      addInteraction(`
        <div class="wizard-email-form">
          <input type="email" class="wizard-email-input" id="wizardEmail" placeholder="you@company.com" required>
          <button class="wizard-email-submit" onclick="SalesgencyWizard.submitEmail()">Proceed to Checkout →</button>
        </div>
      `);
    }
  }

  const SalesgencyWizard = {
    init() {
      currentStep = 0;
      answers = {};
      selectedProduct = null;

      // Check URL params for pre-selected product
      const params = new URLSearchParams(window.location.search);
      if (params.get('product')) {
        selectedProduct = params.get('product');
      }

      processStep();
    },

    advance() {
      currentStep++;
      processStep();
    },

    selectChip(stepId, value, chipEl) {
      answers[stepId] = value;

      // Disable all chips in this group
      const parent = chipEl.closest('.wizard-chips');
      if (parent) {
        parent.querySelectorAll('.wizard-chip').forEach(c => {
          c.classList.remove('selected');
          c.disabled = true;
          c.style.opacity = '0.5';
          c.style.pointerEvents = 'none';
        });
        chipEl.classList.add('selected');
        chipEl.style.opacity = '1';
      }

      addUserMessage(value);

      setTimeout(() => {
        currentStep++;
        processStep();
      }, 400);
    },

    selectProduct(productId) {
      selectedProduct = productId;

      // Disable rec cards
      document.querySelectorAll('.wizard-rec-card').forEach(card => {
        card.style.pointerEvents = 'none';
        card.style.opacity = '0.5';
      });
      const selected = document.querySelector(`.wizard-rec-card[onclick*="${productId}"]`);
      if (selected) {
        selected.style.opacity = '1';
        selected.style.border = '2px solid #10B981';
      }

      const productName = selected ? selected.querySelector('h4')?.textContent : productId;
      addUserMessage(`I'll go with ${productName}`);

      setTimeout(() => {
        currentStep++;
        processStep();
      }, 400);
    },

    async submitEmail() {
      const emailInput = document.getElementById('wizardEmail');
      const email = emailInput ? emailInput.value.trim() : '';

      if (!email || !email.includes('@')) {
        emailInput.style.borderColor = '#E11D48';
        emailInput.focus();
        return;
      }

      if (!selectedProduct) {
        addBotMessage("Please select a product above first.");
        return;
      }

      addUserMessage(email);

      // Store qualification data
      const qualificationData = {
        teamSize: answers.teamSize || '',
        crm: answers.crm || '',
        primaryPain: answers.primaryPain || '',
        leadVolume: answers.leadVolume || '',
        source: 'booking-wizard'
      };

      sessionStorage.setItem('salesgency_qualification', JSON.stringify(qualificationData));

      await addBotMessage("Redirecting you to secure checkout… 🔒");

      // Trigger Stripe checkout with qualification data
      try {
        const response = await fetch('/api/stripe/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId: selectedProduct,
            customerEmail: email,
            qualificationData,
            returnUrl: window.location.origin
          })
        });

        const data = await response.json();

        if (data.url) {
          window.location.href = data.url;
        } else {
          throw new Error(data.error || 'No checkout URL returned');
        }
      } catch (err) {
        console.error('[Wizard Checkout Error]:', err);
        await addBotMessage(`Checkout couldn't start: ${err.message}. Please try again or <a href="marketplace.html" style="color: var(--accent-blue); text-decoration: underline;">browse packages directly</a>.`);
      }
    }
  };

  window.SalesgencyWizard = SalesgencyWizard;
})(window);
