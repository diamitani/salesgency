/* SalesGency DI nav — Diamitani house style, injected site-wide.
   Replaces unified-nav.js on pages using the new design system. */
(function () {
  var LINKS = [
    { href: 'agency.html', label: 'Agency' },
    { href: 'activations.html', label: 'Engines' },
    { href: 'marketplace.html', label: 'Templates' },
    { href: 'pricing.html', label: 'Pricing' },
    { href: 'case-studies.html', label: 'Work' },
    { href: 'agent.html', label: 'Agent' },
    { href: 'portal.html', label: 'Portal' }
  ];
  var CTA = { href: 'book.html', label: 'Get a GTM teardown' };

  function currentPage() {
    var p = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    return p === '' ? 'index.html' : p;
  }

  function buildNav() {
    var page = currentPage();
    var header = document.createElement('header');
    header.className = 'di-nav';
    header.setAttribute('role', 'banner');

    var inner = document.createElement('div');
    inner.className = 'di-nav-inner';

    var brand = document.createElement('a');
    brand.className = 'di-brand';
    brand.href = 'index.html';
    brand.setAttribute('aria-label', 'SalesGency — Your In-House GTM Agency');
    brand.innerHTML = '<span><span class="wm-sales">Sales</span><span class="wm-gency">Gency</span></span><span class="wm-tag">In-house GTM agency</span>';

    var nav = document.createElement('nav');
    nav.className = 'di-links';
    nav.setAttribute('aria-label', 'Primary');
    LINKS.forEach(function (l) {
      var a = document.createElement('a');
      a.href = l.href;
      a.textContent = l.label;
      if (l.href.toLowerCase() === page) a.className = 'active';
      nav.appendChild(a);
    });

    var cta = document.createElement('a');
    cta.className = 'di-cta';
    cta.href = CTA.href;
    cta.textContent = CTA.label;

    var toggle = document.createElement('button');
    toggle.className = 'di-toggle';
    toggle.setAttribute('aria-label', 'Menu');
    toggle.innerHTML = '<span></span>';
    toggle.addEventListener('click', function () {
      header.classList.toggle('open');
    });

    inner.appendChild(brand);
    inner.appendChild(nav);
    inner.appendChild(cta);
    inner.appendChild(toggle);
    header.appendChild(inner);
    return header;
  }

  function removeLegacyNav() {
    document.querySelectorAll('body > header, nav.nav-bar, nav.nav-links, header.nav-wrapper')
      .forEach(function (el) { el.remove(); });
  }

  function onScroll() {
    var h = document.querySelector('header.di-nav');
    if (h) h.classList.toggle('scrolled', window.scrollY > 24);
  }

  function revealInit() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  function init() {
    if (document.querySelector('header.di-nav')) return;
    // don't fight the legacy unified nav if a page still loads it
    if (document.querySelector('header.sgu-nav')) return;
    removeLegacyNav();
    document.body.insertBefore(buildNav(), document.body.firstChild);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    revealInit();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
