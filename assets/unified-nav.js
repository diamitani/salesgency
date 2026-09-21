/**
 * SalesGency Unified Nav - Canonical Corporate Authority Header
 * Obsidian background (#0A0B0E), pure white and phosphor blue wordmark, high-contrast links, and mobile drawer.
 * WCAG 2.2 AA compliant contrast (>7:1 on all interactive elements).
 */
(function () {
  'use strict';

  var LINKS = [
    { href: 'services.html', label: 'Engines' },
    { href: 'process.html', label: 'How it works' },
    { href: 'pricing.html', label: 'Pricing' },
    { href: 'about.html', label: 'About' }
  ];

  function currentPage() {
    var p = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    return p === '' ? 'index.html' : p;
  }

  function buildNav() {
    var page = currentPage();
    var header = document.createElement('header');
    header.className = 'sgu-nav';
    header.id = 'sgu-nav';
    header.setAttribute('role', 'banner');

    var inner = document.createElement('div');
    inner.className = 'sgu-nav-inner';

    var brand = document.createElement('a');
    brand.className = 'sgu-brand';
    brand.href = 'index.html';
    brand.setAttribute('aria-label', 'SalesGency Home');

    brand.innerHTML = '<img src="assets/salesgency-wordmark-light.svg" alt="SalesGency" width="160" height="32" style="display:block;">';

    var ul = document.createElement('ul');
    ul.className = 'sgu-links';
    LINKS.forEach(function (l) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = l.href;
      a.textContent = l.label;
      if (l.href.toLowerCase() === page) {
        a.className = 'sgu-active';
      }
      li.appendChild(a);
      ul.appendChild(li);
    });

    var actions = document.createElement('div');
    actions.className = 'sgu-nav-actions';

    var statusEl = document.createElement('div');
    statusEl.className = 'sgu-nav-status';
    statusEl.innerHTML = '<span class="sgu-pulse-dot"></span> All Systems Active';

    var portalBtn = document.createElement('a');
    portalBtn.className = 'sgu-portal-btn';
    portalBtn.href = 'portal.html';
    portalBtn.textContent = 'Client Portal';

    var cta = document.createElement('a');
    cta.className = 'sgu-cta-btn';
    cta.href = 'build-session.html';
    cta.textContent = 'Get a GTM teardown';

    var burger = document.createElement('button');
    burger.className = 'sgu-burger';
    burger.id = 'sgu-burger';
    burger.setAttribute('aria-label', 'Toggle Navigation Menu');
    burger.innerHTML = '&#9776;';
    burger.addEventListener('click', function () {
      header.classList.toggle('sgu-open');
      burger.innerHTML = header.classList.contains('sgu-open') ? '&times;' : '&#9776;';
    });

    actions.appendChild(statusEl);
    actions.appendChild(portalBtn);
    actions.appendChild(cta);
    actions.appendChild(burger);

    inner.appendChild(brand);
    inner.appendChild(ul);
    inner.appendChild(actions);
    header.appendChild(inner);

    window.addEventListener('scroll', function () {
      header.classList.toggle('sgu-scrolled', window.scrollY > 16);
    }, { passive: true });

    return header;
  }

  function removeLegacyNav() {
    var olds = document.querySelectorAll(
      'body > header:not(#sgu-nav), nav.nav-bar, nav.nav-links, header.nav-wrapper, header.nav, .nav-fixed, .mobile-menu-drawer'
    );
    olds.forEach(function (el) {
      if (el && !el.classList.contains('sgu-nav')) {
        el.remove();
      }
    });
  }

  function init() {
    // If static sgu-nav is already present, bind scroll & burger
    var existing = document.getElementById('sgu-nav');
    if (existing) {
      var burger = document.getElementById('sgu-burger');
      if (burger) {
        burger.addEventListener('click', function () {
          existing.classList.toggle('sgu-open');
          burger.innerHTML = existing.classList.contains('sgu-open') ? '&times;' : '&#9776;';
        });
      }
      window.addEventListener('scroll', function () {
        existing.classList.toggle('sgu-scrolled', window.scrollY > 16);
      }, { passive: true });
      return;
    }

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
