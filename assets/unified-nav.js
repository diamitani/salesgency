/**
 * Salesgency Unified Nav — the ONE nav bar for every page.
 * Removes legacy header/nav markup and inserts the canonical nav.
 * Auto-marks the active page. Mobile hamburger included.
 */
(function () {
  var LINKS = [
    { href: 'agency.html', label: 'Agency' },
    { href: 'activations.html', label: 'Activations' },
    { href: 'marketplace.html', label: 'Marketplace' },
    { href: 'portal.html', label: 'Portal' },
    { href: 'pricing.html', label: 'Pricing' },
    { href: 'case-studies.html', label: 'Case Studies' },
    { href: 'outreach.html', label: 'Outreach' },
    { href: 'sitemap.html', label: 'Sitemap' }
  ];
  var CTA = { href: 'build-session.html', label: 'Book a build session — $1,000' };

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
    brand.innerHTML = 'Salesgency<span>.</span>';

    var ul = document.createElement('ul');
    ul.className = 'sgu-links';
    LINKS.forEach(function (l) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = l.href;
      a.textContent = l.label;
      if (l.href.toLowerCase() === page) a.className = 'sgu-active';
      li.appendChild(a);
      ul.appendChild(li);
    });

    var cta = document.createElement('a');
    cta.className = 'sgu-cta';
    cta.href = CTA.href;
    cta.textContent = CTA.label;

    var burger = document.createElement('button');
    burger.className = 'sgu-burger';
    burger.setAttribute('aria-label', 'Open menu');
    burger.textContent = '\u2630';
    burger.addEventListener('click', function () {
      header.classList.toggle('sgu-open');
      burger.textContent = header.classList.contains('sgu-open') ? '\u2715' : '\u2630';
    });

    inner.appendChild(brand);
    inner.appendChild(ul);
    inner.appendChild(cta);
    inner.appendChild(burger);
    header.appendChild(inner);
    return header;
  }

  function removeLegacyNav() {
    // Remove any body-level header (all of them are site navs — verified by audit)
    // and any stray nav elements with legacy classes.
    var olds = document.querySelectorAll(
      'body > header, nav.nav-bar, nav.nav-links, header.nav-wrapper'
    );
    olds.forEach(function (el) { el.remove(); });
  }

  function init() {
    if (document.querySelector('header.sgu-nav')) return; // already unified
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
