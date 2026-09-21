/**
 * SalesGency Automated Full Sweep & Contrast / Link / Stripe Audit Script
 */
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const catalogPath = path.join(ROOT_DIR, 'data', 'products.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const validProductSlugs = (Array.isArray(catalog) ? catalog : (catalog.products || [])).map(p => p.id);

// Problematic low-contrast colors on light backgrounds (WCAG AA failures < 4.5:1 on #ffffff)
const LOW_CONTRAST_ON_LIGHT = [
  /#9ca3af/i,
  /#94a3b8/i,
  /#a1a1aa/i,
  /#cbd5e1/i,
  /#d1d5db/i,
  /#888888/i,
  /#999999/i,
  /#aaaaaa/i,
  /color:\s*#bbb/i,
  /color:\s*#ccc/i,
];

// Dark on dark issues
const DARK_ON_DARK = [
  /background:\s*(#0[0-9a-f]{5}|#1[0-9a-f]{5}|black)[^;]*;[^>]*color:\s*(#0[0-9a-f]{5}|#1[0-9a-f]{5}|#2[0-9a-f]{5})/i,
];

const htmlFiles = fs.readdirSync(ROOT_DIR).filter(f => f.endsWith('.html'));

console.log(`\n🔍 STARTING FULL SWEEP AUDIT ACROSS ${htmlFiles.length} HTML FILES...\n`);

let totalIssues = 0;
let fileReports = [];

htmlFiles.forEach(file => {
  const filePath = path.join(ROOT_DIR, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];

  // 1. Check title & viewport
  if (!content.includes('<title>')) {
    issues.push('Missing <title> tag');
  }
  if (!content.includes('name="viewport"')) {
    issues.push('Missing viewport meta tag');
  }

  // 2. Check for unified navigation / assets
  const isRedirect = content.includes('http-equiv="refresh"');
  const hasUnifiedNav = content.includes('unified-nav.js') || content.includes('sgu-nav');
  if (!hasUnifiedNav && !file.startsWith('product-template') && file !== 'portal.html' && file !== 'app.html' && !isRedirect) {
    issues.push('Does not include unified-nav.js');
  }

  // 3. Contrast Checks
  LOW_CONTRAST_ON_LIGHT.forEach(regex => {
    if (regex.test(content)) {
      // Check if it's explicitly inside a dark container or standalone
      const matches = content.match(new RegExp(`.{0,50}${regex.source}.{0,50}`, 'gi')) || [];
      matches.slice(0, 3).forEach(m => {
        const isDarkContext = 
          m.includes('background:#0') || 
          m.includes('background:#1') || 
          m.includes('background: #0') || 
          m.includes('background: #1') ||
          m.includes('background: rgba(255,255,255') ||
          m.includes('terminal-block') ||
          m.includes('product-detail-vector-banner') ||
          m.includes('telemetry-pill') ||
          m.includes('background: rgba(16,185,129') ||
          m.includes('background: rgba(37,99,235');
        
        if (!isDarkContext) {
          issues.push(`Potential low contrast text: "${m.trim()}"`);
        }
      });
    }
  });

  // 4. Broken anchor tags
  const emptyLinks = content.match(/href=["'](undefined|null|javascript:void\(0\)|#\s*)["']/g) || [];
  if (emptyLinks.length > 2 && !file.includes('app.html')) {
    issues.push(`Contains ${emptyLinks.length} empty or placeholder links`);
  }

  // 5. Check Stripe Product triggers
  const stripeButtons = content.match(/data-stripe-product=["']([^"']+)["']/g) || [];
  stripeButtons.forEach(btn => {
    const slugMatch = btn.match(/data-stripe-product=["']([^"']+)["']/);
    if (slugMatch) {
      const slug = slugMatch[1];
      if (slug.startsWith('${')) return; // Dynamic JS template literal
      // Check if slug exists in catalog or aliases
      const isValid = validProductSlugs.includes(slug) || [
        'inbound-automation', 'outbound-automation', 'pre-call-automation',
        'post-call-automation', 'daily-execution-report', 'daily-gtm-report',
        'build-session', '30-day-sprint', '14-day-sprint', 'fractional-gtm-engineer',
        'free-skill-download', 'free-template-download', 'agent-build-package'
      ].includes(slug);
      if (!isValid) {
        issues.push(`data-stripe-product="${slug}" is not a valid catalog product slug`);
      }
    }
  });

  if (issues.length > 0) {
    totalIssues += issues.length;
    fileReports.push({ file, issues });
  }
});

console.log(`📊 AUDIT FINDINGS:`);
if (fileReports.length === 0) {
  console.log('✅ ALL PAGES CLEAN AND PASSING AUDIT!');
} else {
  fileReports.forEach(r => {
    console.log(`\n📄 [${r.file}]:`);
    r.issues.forEach(iss => console.log(`   ⚠️ ${iss}`));
  });
}

console.log(`\n🏁 Total Issues Detected: ${totalIssues}\n`);
