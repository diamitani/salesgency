/**
 * SalesGency Unified Nav - Canonical Floating Pill Header Injection (Light Mode)
 * Official Brand Wordmark & Icon Emblem, Geist typography, active pills, mobile drawer, and high-contrast actions.
 * Compliant with design-taste-frontend anti-slop rules (single-line desktop, <80px height, WCAG AA contrast, zero em-dashes).
 */
(function () {
  var LINKS = [
    { href: 'index.html', label: 'Home' },
    { href: 'agency.html', label: 'Agency' },
    { href: 'marketplace.html', label: 'Marketplace' },
    { href: 'skills.html', label: 'Skills' },
    { href: 'templates.html', label: 'Templates' },
    { href: 'case-studies.html', label: 'Case Studies' },
    { href: 'pricing.html', label: 'Pricing' }
  ];

  function currentPage() {
    var p = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    return p === '' ? 'index.html' : p;
  }

  function buildNav() {
    var page = currentPage();
    var header = document.createElement('header');
    header.className = 'sgu-nav';
    header.setAttribute('role', 'banner');

    var inner = document.createElement('div');
    inner.className = 'sgu-nav-inner';

    var brand = document.createElement('a');
    brand.className = 'sgu-brand';
    brand.href = 'index.html';
    brand.setAttribute('aria-label', 'SalesGency Home');
    
    // Inline SVG with Brand Emblem + Gradient Typography for Light Mode
    brand.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 40" width="144" height="28" style="display:block;"><defs><linearGradient id="sg-nav-grad-light" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0284C7"/><stop offset="100%" stop-color="#7C3AED"/></linearGradient></defs><g transform="translate(2, 4)"><polygon points="16,2 28,9 28,23 16,30 4,23 4,9" fill="#F8FAFC" stroke="url(#sg-nav-grad-light)" stroke-width="2" stroke-linejoin="round"/><path d="M16,2 L16,16 L28,23" fill="none" stroke="url(#sg-nav-grad-light)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4,9 L16,16 L4,23" fill="none" stroke="url(#sg-nav-grad-light)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="16" cy="16" r="2.8" fill="#0284C7"/><circle cx="16" cy="2" r="1.4" fill="#0284C7"/><circle cx="28" cy="9" r="1.4" fill="#7C3AED"/><circle cx="28" cy="23" r="1.4" fill="#7C3AED"/><circle cx="16" cy="30" r="1.4" fill="#0284C7"/><circle cx="4" cy="23" r="1.4" fill="#0284C7"/><circle cx="4" cy="9" r="1.4" fill="#0284C7"/></g><g transform="translate(42, 28)"><text font-family="Geist, Outfit, -apple-system, sans-serif" font-size="24" font-weight="800" letter-spacing="-0.03em"><tspan fill="#0F172A">Sales</tspan><tspan fill="url(#sg-nav-grad-light)">Gency</tspan><tspan fill="#0284C7" dx="1">.</tspan></text></g></svg>';

    var ul = document.createElement('ul');
    ul.className = 'sgu-links';
    LINKS.forEach(function (l) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = l.href;
      a.textContent = l.label;
      if (l.href.toLowerCase() === page || (page === '' && l.href === 'index.html')) {
        a.className = 'sgu-active';
      }
      li.appendChild(a);
      ul.appendChild(li);
    });

    var actions = document.createElement('div');
    actions.className = 'sgu-nav-actions';

    var portalBtn = document.createElement('a');
    portalBtn.className = 'sgu-portal-btn';
    portalBtn.href = 'app.html';
    portalBtn.innerHTML = '<span class="sgu-pulse-dot"></span> Agent Platform';

    var cta = document.createElement('a');
    cta.className = 'sgu-cta-btn';
    cta.href = 'book.html';
    cta.textContent = 'Book Build Session';

    var burger = document.createElement('button');
    burger.className = 'sgu-burger';
    burger.setAttribute('aria-label', 'Toggle Navigation Menu');
    burger.innerHTML = '&#9776;';
    burger.addEventListener('click', function () {
      header.classList.toggle('sgu-open');
      burger.innerHTML = header.classList.contains('sgu-open') ? '&times;' : '&#9776;';
    });

    actions.appendChild(portalBtn);
    actions.appendChild(cta);
    actions.appendChild(burger);

    inner.appendChild(brand);
    inner.appendChild(ul);
    inner.appendChild(actions);
    header.appendChild(inner);
    return header;
  }

  function removeLegacyNav() {
    var olds = document.querySelectorAll(
      'body > header:not(.sgu-nav), nav.nav-bar, nav.nav-links, header.nav-wrapper, header.nav'
    );
    olds.forEach(function (el) { el.remove(); });
  }

  function init() {
    if (document.querySelector('header.sgu-nav')) return;
    removeLegacyNav();
    var nav = buildNav();
    document.body.insertBefore(nav, document.body.firstChild);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
