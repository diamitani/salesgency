/* ==========================================================================
   SalesGency v2 — shared site chrome. ONE nav, ONE footer, every page.
   Pages include: <div id="sg-header"></div> ... <div id="sg-footer"></div>
   and call SG.init('page-key') on load. No per-page chrome drift.
   ========================================================================== */
(function () {
  var NAV = [
    { key: 'home',      label: 'Home',       href: 'index.html' },
    { key: 'skills',    label: 'Skills',     href: 'skills.html' },
    { key: 'templates', label: 'Templates',  href: 'templates.html' },
    { key: 'packages',  label: 'Packages',   href: 'packages.html' },
    { key: 'agency',    label: 'Agency',     href: 'agency.html' },
    { key: 'gtm-agent', label: 'GTM Agent',  href: 'gtm-agent.html' },
    { key: 'pricing',   label: 'Pricing',    href: 'pricing.html' }
  ];

  function esc(s) { return s; } // labels are static/trusted

  function header(activeKey) {
    var links = NAV.map(function (n) {
      var cls = n.key === activeKey ? ' class="active"' : '';
      return '<li><a href="' + n.href + '"' + cls + '>' + esc(n.label) + '</a></li>';
    }).join('');
    return (
      '<header class="sg-header"><div class="container">' +
        '<nav class="sg-nav" aria-label="Main navigation">' +
          '<a href="index.html" aria-label="SalesGency home">' +
            '<img class="sg-wordmark" src="assets/img/salesgency-wordmark-gradient.svg" alt="SalesGency.">' +
          '</a>' +
          '<button class="sg-menu-toggle" id="sg-menu-toggle" aria-label="Toggle menu" aria-expanded="false">☰</button>' +
          '<ul class="sg-nav-links" id="sg-nav-links">' + links +
            '<li class="sg-nav-cta"><a href="book.html" class="btn btn-primary btn-sm">Book a Call</a></li>' +
          '</ul>' +
        '</nav>' +
      '</div></header>'
    );
  }

  function footer() {
    return (
      '<footer class="sg-footer"><div class="container">' +
        '<div class="sg-footer-grid">' +
          '<div>' +
            '<a href="index.html"><img class="sg-wordmark" src="assets/img/salesgency-wordmark-gradient.svg" alt="SalesGency." style="margin-bottom:16px"></a>' +
            '<p style="color:var(--sg-muted);font-size:0.95rem;max-width:22rem">The GTM engineering agency. Free skills, free workflow templates, done-for-you build packages, and the GTM Agent SaaS portal — all powered by the ROSTR framework.</p>' +
          '</div>' +
          '<div><h4>Explore</h4><ul>' +
            '<li><a href="skills.html">Skills Library</a></li>' +
            '<li><a href="templates.html">Workflow Templates</a></li>' +
            '<li><a href="packages.html">Build Packages</a></li>' +
            '<li><a href="gtm-agent.html">GTM Agent Portal</a></li>' +
          '</ul></div>' +
          '<div><h4>Services</h4><ul>' +
            '<li><a href="agency.html">Agency Services</a></li>' +
            '<li><a href="agency.html#custom">Custom Agents</a></li>' +
            '<li><a href="agency.html#custom">Custom Workflows</a></li>' +
            '<li><a href="agency.html#custom">Custom Skills</a></li>' +
          '</ul></div>' +
          '<div><h4>Company</h4><ul>' +
            '<li><a href="pricing.html">Pricing</a></li>' +
            '<li><a href="book.html">Book a Call</a></li>' +
            '<li><a href="about.html">About</a></li>' +
            '<li><a href="privacy.html">Privacy</a></li>' +
          '</ul></div>' +
        '</div>' +
        '<div class="sg-footer-bottom">' +
          '<span>© 2026 SalesGency. All rights reserved.</span>' +
          '<span>Built on the ROSTR framework.</span>' +
        '</div>' +
      '</div></footer>'
    );
  }

  function init(activeKey) {
    var h = document.getElementById('sg-header');
    var f = document.getElementById('sg-footer');
    if (h) h.innerHTML = header(activeKey || 'home');
    if (f) f.innerHTML = footer();
    var t = document.getElementById('sg-menu-toggle');
    var l = document.getElementById('sg-nav-links');
    if (t && l) {
      t.addEventListener('click', function () {
        var open = l.classList.toggle('open');
        t.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }
    // Highlight skill pages under "Skills" and template pages under "Templates"
    // (activeKey is set explicitly per page, so nothing more needed here)
  }

  window.SG = { init: init };
})();
