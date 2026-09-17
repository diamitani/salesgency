/**
 * SalesGency Marketplace Module (Cut 2 - Corporate Enterprise Edition)
 * Handles product fetching, filtering, sorting, and high-density corporate grid rendering
 */
(function(window) {
  'use strict';

  let allProducts = [];
  let currentFilters = { category: 'all', type: 'all', search: '', sort: 'popular' };

  const CATEGORY_LABELS = {
    'all': 'All Solutions',
    'inbound': 'Inbound Engines',
    'outbound': 'Outbound Engines',
    'revops': 'RevOps & Telemetry',
    'custom-skills': 'Agent Skills (SKILL.md)',
    'custom-templates': 'n8n Workflow Kits',
    'custom-agents': 'Autonomous Agents',
    'bundle': 'Master Bundles',
    'session': 'Co-Build Sprints'
  };

  const TYPE_LABELS = {
    'all': 'All Delivery Types',
    'package': 'Build Packages',
    'session': 'Live Co-Build',
    'bundle': 'Master Suites',
    'skill': 'AI Prompt Skills',
    'template': 'Workflow Templates',
    'agent': 'Agent Souls'
  };

  function formatPrice(cents) {
    const dollars = cents / 100;
    return '$' + dollars.toLocaleString('en-US', { minimumFractionDigits: 0 });
  }

  function getBadgeClass(badge) {
    const map = {
      'Core Engine': 'core',
      'Advanced': 'advanced',
      'Premium': 'premium',
      'Best Value': 'best-value',
      'Skill': 'skill',
      'Agent': 'agent',
      'Template': 'template',
      'Live Sprint': 'live-sprint',
      'With Founder': 'with-founder',
      'Portal': 'portal'
    };
    return map[badge] || '';
  }

  function getEngineIconSvg(iconType) {
    switch (iconType) {
      case 'inbound':
        return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`;
      case 'outbound':
      case 'copy':
        return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`;
      case 'pre-call':
      case 'post-call':
        return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`;
      case 'execution':
      case 'revops':
      case 'gtm':
        return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`;
      case 'crm':
      case 'enrich':
      case 'dns':
      case 'apollo':
        return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`;
      case 'bundle':
        return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`;
      case 'session':
      case 'audit':
        return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`;
      default:
        return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`;
    }
  }

  function renderProductCard(product) {
    const iconSvg = getEngineIconSvg(product.icon || product.category);
    const tagsHtml = (product.tags || []).slice(0, 3).map(t => `<span class="corp-tag">${t}</span>`).join('');

    return `
      <article class="product-card corp-card" data-product-id="${product.id}" onclick="window.location.href='product.html?id=${product.id}'">
        <div class="product-card-corp-banner">
          <div class="product-card-corp-icon">
            ${iconSvg}
          </div>
          <div class="product-card-corp-telemetry">
            <span class="telemetry-pill">
              <span class="live-dot-green"></span>
              <span>VERIFIED BUILD</span>
            </span>
          </div>
        </div>
        <div class="product-card-body">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <span class="product-card-badge ${getBadgeClass(product.badge)}">${product.badge}</span>
            <span class="product-card-engine-id">${product.engineOrder ? 'ENGINE ' + String(product.engineOrder).padStart(2, '0') : product.category.toUpperCase()}</span>
          </div>
          <h3 class="product-card-name">${product.name}</h3>
          <p class="product-card-tagline">${product.tagline}</p>
          <div class="product-card-tags">
            ${tagsHtml}
          </div>
          <div class="product-card-footer">
            <div class="product-price-wrap">
              <span class="product-card-price">${formatPrice(product.price)}</span>
              <span class="product-card-license">Own Outright</span>
            </div>
            <button class="product-card-buy" data-stripe-product="${product.id}" onclick="event.stopPropagation()">Deploy →</button>
          </div>
        </div>
      </article>
    `;
  }

  function renderSkeletonCards(count) {
    let html = '';
    for (let i = 0; i < count; i++) {
      html += `
        <div class="skeleton-card corp-card">
          <div class="skeleton-card-corp-header skeleton"></div>
          <div class="skeleton-card-body">
            <div class="skeleton-badge skeleton"></div>
            <div class="skeleton-title skeleton"></div>
            <div class="skeleton-text skeleton"></div>
            <div class="skeleton-text-short skeleton"></div>
            <div class="skeleton-footer">
              <div class="skeleton-price skeleton"></div>
              <div class="skeleton-btn skeleton"></div>
            </div>
          </div>
        </div>
      `;
    }
    return html;
  }

  function filterProducts() {
    let filtered = [...allProducts];

    if (currentFilters.category !== 'all') {
      filtered = filtered.filter(p => p.category === currentFilters.category);
    }
    if (currentFilters.type !== 'all') {
      filtered = filtered.filter(p => p.type === currentFilters.type);
    }
    if (currentFilters.search) {
      const q = currentFilters.search.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    // Sort
    switch (currentFilters.sort) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'popular':
      default:
        filtered.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
        break;
    }

    renderGrid(filtered);
    updateResultCount(filtered.length);
  }

  function renderGrid(products) {
    const grid = document.getElementById('marketplaceGrid');
    const empty = document.getElementById('marketplaceEmpty');
    if (!grid) return;

    if (products.length === 0) {
      grid.innerHTML = '';
      if (empty) empty.style.display = 'block';
      return;
    }

    if (empty) empty.style.display = 'none';
    grid.innerHTML = products.map(renderProductCard).join('');

    // Re-bind Stripe checkout buttons
    if (window.SalesGencyStripe && typeof window.SalesGencyStripe.bindCheckoutButtons === 'function') {
      window.SalesGencyStripe.bindCheckoutButtons();
    }
  }

  function updateResultCount(count) {
    const countEl = document.getElementById('resultCount');
    if (countEl) {
      countEl.textContent = `${count} production package${count !== 1 ? 's' : ''} found`;
    }
  }

  async function init() {
    const grid = document.getElementById('marketplaceGrid');
    if (grid) {
      grid.innerHTML = renderSkeletonCards(6);
    }

    try {
      let data;
      try {
        const res = await fetch('/api/catalog');
        data = await res.json();
        allProducts = data.products || data;
      } catch {
        const res = await fetch('data/products.json');
        allProducts = await res.json();
      }

      if (!Array.isArray(allProducts)) {
        allProducts = [];
      }

      // Check URL params for initial filters
      const params = new URLSearchParams(window.location.search);
      if (params.has('category')) {
        currentFilters.category = params.get('category');
      }
      if (params.has('type')) {
        currentFilters.type = params.get('type');
      }
      if (params.has('search')) {
        currentFilters.search = params.get('search');
        const searchInput = document.getElementById('marketplaceSearch');
        if (searchInput) searchInput.value = currentFilters.search;
      }

      // Sync filter UI tabs
      updateActiveTabs();
      filterProducts();
      setupEventListeners();
    } catch (err) {
      console.error('[Marketplace] Initialization error:', err);
      if (grid) {
        grid.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 40px;">Unable to load products. Please refresh.</p>';
      }
    }
  }

  function updateActiveTabs() {
    document.querySelectorAll('[data-category-filter]').forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-category-filter') === currentFilters.category);
    });
    document.querySelectorAll('[data-type-filter]').forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-type-filter') === currentFilters.type);
    });
  }

  function setupEventListeners() {
    // Category tabs
    document.querySelectorAll('[data-category-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        currentFilters.category = btn.getAttribute('data-category-filter');
        updateActiveTabs();
        filterProducts();
      });
    });

    // Type pills
    document.querySelectorAll('[data-type-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        currentFilters.type = btn.getAttribute('data-type-filter');
        updateActiveTabs();
        filterProducts();
      });
    });

    // Search input (debounced)
    const searchInput = document.getElementById('marketplaceSearch');
    if (searchInput) {
      let debounce;
      searchInput.addEventListener('input', () => {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
          currentFilters.search = searchInput.value.trim();
          filterProducts();
        }, 200);
      });
    }

    // Sort select
    const sortSelect = document.getElementById('marketplaceSort');
    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        currentFilters.sort = sortSelect.value;
        filterProducts();
      });
    }
  }

  // Expose
  window.SalesGencyMarketplace = {
    init: init,
    filter: filterProducts,
    getProducts: () => allProducts
  };

  // Auto-init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})(window);
