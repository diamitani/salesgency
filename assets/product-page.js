/**
 * SalesGency Product Page Module (Cut 2 — Corporate Enterprise Edition)
 * Dynamically loads a single product from URL param and renders executive detail view
 */
(function(window) {
  'use strict';

  function formatPrice(cents) {
    const dollars = cents / 100;
    return '$' + dollars.toLocaleString('en-US', { minimumFractionDigits: 0 });
  }

  function getBadgeClass(badge) {
    const map = {
      'Core Engine': 'core', 'Advanced': 'advanced', 'Premium': 'premium',
      'Best Value': 'best-value', 'Skill': 'skill', 'Agent': 'agent',
      'Template': 'template', 'Live Sprint': 'live-sprint', 'With Founder': 'with-founder'
    };
    return map[badge] || '';
  }

  function getCategoryLabel(cat) {
    const map = {
      'inbound': 'Inbound Engines', 'outbound': 'Outbound Engines', 'revops': 'RevOps & Telemetry',
      'custom-skills': 'Custom Skills', 'custom-templates': 'Custom Templates',
      'custom-agents': 'Custom Agents', 'bundle': 'Master Bundles', 'session': 'Co-Build Sprints'
    };
    return map[cat] || cat;
  }

  function getEngineIconSvg(iconType) {
    switch (iconType) {
      case 'inbound':
        return `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`;
      case 'outbound':
      case 'copy':
        return `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`;
      case 'pre-call':
      case 'post-call':
        return `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`;
      case 'execution':
      case 'revops':
      case 'gtm':
        return `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`;
      case 'crm':
      case 'enrich':
      case 'dns':
      case 'apollo':
        return `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`;
      case 'bundle':
        return `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`;
      case 'session':
      case 'audit':
        return `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`;
      default:
        return `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`;
    }
  }

  async function loadProduct(productId) {
    try {
      let product;
      try {
        const res = await fetch(`/api/catalog?id=${productId}`);
        product = await res.json();
      } catch {
        const res = await fetch('data/products.json');
        const all = await res.json();
        product = all.find(p => p.id === productId);
      }
      return product || null;
    } catch (err) {
      console.error('[Product Page] Failed to load:', err);
      return null;
    }
  }

  async function loadRelated(category, excludeId, count = 3) {
    try {
      let products;
      try {
        const res = await fetch(`/api/catalog?category=${category}`);
        const data = await res.json();
        products = data.products || data;
      } catch {
        const res = await fetch('data/products.json');
        products = (await res.json()).filter(p => p.category === category);
      }
      return products.filter(p => p.id !== excludeId).slice(0, count);
    } catch {
      return [];
    }
  }

  function renderProductDetail(product) {
    const iconSvg = getEngineIconSvg(product.icon || product.category);
    const includesList = (product.includes || []).map(inc => `<li><span class="file-icon">📄</span> <code>${inc}</code></li>`).join('');

    return `
      <div class="product-detail-breadcrumb">
        <a href="marketplace.html">Marketplace</a>
        <span class="sep">›</span>
        <a href="marketplace.html?category=${product.category}">${getCategoryLabel(product.category)}</a>
        <span class="sep">›</span>
        <span>${product.name}</span>
      </div>

      <div class="product-detail-hero corp-detail-hero">
        <div class="product-detail-vector-banner">
          <div class="product-detail-vector-icon">
            ${iconSvg}
          </div>
          <div class="product-detail-telemetry-badge">
            <span class="telemetry-pill">
              <span class="live-dot-green"></span>
              <span>100% PRODUCTION VERIFIED</span>
            </span>
          </div>
          <div class="product-detail-spec-box">
            <div class="spec-header">Package Specification</div>
            <ul class="spec-file-list">
              ${includesList}
            </ul>
          </div>
        </div>

        <div class="product-detail-info">
          <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 12px;">
            <span class="product-card-badge ${getBadgeClass(product.badge)}">${product.badge}</span>
            <span class="corp-tag" style="font-family: var(--font-mono);">${product.type.toUpperCase()}</span>
          </div>
          <h1 class="product-detail-name">${product.name}</h1>
          <p class="product-detail-tagline">${product.description}</p>

          <div class="product-detail-price-block">
            <span class="product-detail-price">${formatPrice(product.price)}</span>
            <span class="product-detail-price-note">One-time payment · 100% client-owned source code · Zero vendor lock-in</span>
          </div>

          <div class="product-detail-actions">
            <button class="product-detail-buy" data-stripe-product="${product.id}">
              Deploy Package · ${formatPrice(product.price)} →
            </button>
            <a href="book.html?product=${product.id}" class="product-detail-secondary">
              Book Co-Build Sprint ($1,000) →
            </a>
          </div>

          <div class="enterprise-trust-strip" style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-subtle); display: flex; gap: 20px; font-size: 13px; color: var(--text-secondary);">
            <span>🔒 SOC2-Ready Infrastructure</span>
            <span>⚡ Instant Webhook Delivery</span>
            <span>📦 Lifetime Updates Included</span>
          </div>
        </div>
      </div>
    `;
  }

  function renderFeatures(product) {
    if (!product.features || product.features.length === 0) return '';
    return `
      <section class="product-features corp-features">
        <div class="badge-tag">Engine Capabilities</div>
        <h2 style="font-size: 26px; font-weight: 900; color: var(--text-heading); margin-top: 8px;">Deterministic Architecture Specifications</h2>
        <div class="product-features-grid" style="margin-top: 24px;">
          ${product.features.map(f => `
            <div class="product-feature-item">
              <div class="product-feature-check">
                <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3.5 8 6.5 11 12.5 5"></polyline></svg>
              </div>
              <span class="product-feature-text">${f}</span>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  function renderRelated(products) {
    if (!products || products.length === 0) return '';

    const cards = products.map(p => {
      const iconSvg = getEngineIconSvg(p.icon || p.category);
      return `
        <article class="product-card corp-card" onclick="window.location.href='product.html?id=${p.id}'">
          <div class="product-card-corp-banner" style="padding: 16px;">
            <div class="product-card-corp-icon" style="width: 36px; height: 36px;">
              ${iconSvg}
            </div>
          </div>
          <div class="product-card-body">
            <span class="product-card-badge ${getBadgeClass(p.badge)}">${p.badge}</span>
            <h3 class="product-card-name" style="font-size: 16px;">${p.name}</h3>
            <p class="product-card-tagline" style="font-size: 13px;">${p.tagline}</p>
            <div class="product-card-footer">
              <span class="product-card-price" style="font-size: 18px;">${formatPrice(p.price)}</span>
              <button class="product-card-buy" data-stripe-product="${p.id}" onclick="event.stopPropagation()">Deploy →</button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    return `
      <section class="related-products" style="margin-top: 60px; padding-top: 40px; border-top: 1px solid var(--border-hairline);">
        <div class="badge-tag">Complementary Engines</div>
        <h2 style="font-size: 24px; font-weight: 900; color: var(--text-heading); margin-top: 8px;">Related GTM Systems</h2>
        <div class="related-products-grid" style="margin-top: 24px;">${cards}</div>
      </section>
    `;
  }

  window.SalesgencyProductPage = {
    async init() {
      const container = document.getElementById('productDetail');
      if (!container) return;

      const params = new URLSearchParams(window.location.search);
      const productId = params.get('id');

      if (!productId) {
        container.innerHTML = `
          <div style="text-align: center; padding: 80px 20px;">
            <h2 style="font-size: 24px; font-weight: 900; margin-bottom: 12px;">Product Not Found</h2>
            <p style="color: var(--text-muted); margin-bottom: 20px;">No product ID specified.</p>
            <a href="marketplace.html" class="btn-hero-primary" style="display: inline-flex;">Browse Solutions →</a>
          </div>
        `;
        return;
      }

      // Show loading
      container.innerHTML = '<div style="text-align: center; padding: 80px 20px;"><p style="color: var(--text-muted);">Loading system specifications…</p></div>';

      const product = await loadProduct(productId);

      if (!product) {
        container.innerHTML = `
          <div style="text-align: center; padding: 80px 20px;">
            <h2 style="font-size: 24px; font-weight: 900; margin-bottom: 12px;">Product Not Found</h2>
            <p style="color: var(--text-muted); margin-bottom: 20px;">The product "${productId}" does not exist.</p>
            <a href="marketplace.html" class="btn-hero-primary" style="display: inline-flex;">Browse Solutions →</a>
          </div>
        `;
        return;
      }

      // Update page title
      document.title = `${product.name} | SalesGency® Enterprise GTM`;

      // Render product detail
      let html = renderProductDetail(product);
      html += renderFeatures(product);

      // Load and render related products
      const related = await loadRelated(product.category, product.id);
      html += renderRelated(related);

      container.innerHTML = html;

      // Re-bind Stripe checkout
      if (window.SalesGencyStripe && typeof window.SalesGencyStripe.bindCheckoutButtons === 'function') {
        window.SalesGencyStripe.bindCheckoutButtons();
      }
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.SalesgencyProductPage.init());
  } else {
    window.SalesgencyProductPage.init();
  }
})(window);
