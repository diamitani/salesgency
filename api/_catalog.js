// Canonical product catalog for SalesGency
// Reads from data/products.json as the single source of truth and maps directly to live Stripe IDs
const path = require('path');
const fs = require('fs');

let _products = null;

const ALIASES = {
  'inbound-automation': 'skill-plugin-inbound',
  'outbound-automation': 'full-build-pae',
  'pre-call-automation': 'skill-plugin-presales',
  'post-call-automation': 'skill-plugin-postsales',
  'daily-execution-report': 'skill-plugin-automation-engineer',
  'daily-gtm-report': 'skill-plugin-gtm-coe',
  'cold-outreach': 'skill-plugin-pae',
  'builder-starter': 'gtm-agent-subscription',
  'builder-pro': 'sprint-14day',
  'builder-enterprise': 'sprint-30day',
  'paid-audit': 'build-session',
};

function loadProducts() {
  if (_products) return _products;
  const filePath = path.resolve(__dirname, '..', 'data', 'products.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  _products = JSON.parse(raw);
  return _products;
}

/**
 * Get the full catalog as a { [key]: product } map (backward-compatible and indexed by ID, Stripe Prod ID, and Stripe Price ID)
 */
function getCatalog() {
  const products = loadProducts();
  const catalog = {};

  for (const p of products) {
    const entry = {
      id: p.id,
      name: p.name,
      amount: p.price,
      price: p.price,
      currency: p.currency || 'usd',
      mode: p.mode || 'payment',
      description: p.description,
      interval: p.mode === 'subscription' ? (p.interval || 'month') : undefined,
      stripeProductId: p.stripeProductId,
      stripePriceId: p.stripePriceId,
      features: p.features || [],
      badge: p.badge || '',
      type: p.type || 'package',
    };

    // Primary key: slug ID
    catalog[p.id] = entry;

    // Direct Stripe IDs for seamless dispatch
    if (p.stripeProductId) catalog[p.stripeProductId] = entry;
    if (p.stripePriceId) catalog[p.stripePriceId] = entry;
  }

  // Map legacy aliases
  for (const [alias, targetId] of Object.entries(ALIASES)) {
    if (catalog[targetId]) {
      catalog[alias] = catalog[targetId];
    }
  }

  return catalog;
}

/**
 * Get a single product by ID (full product data)
 */
function getProduct(id) {
  if (!id) return null;
  const targetId = ALIASES[id] || id;
  const products = loadProducts();
  return (
    products.find(
      p => p.id === targetId || p.stripeProductId === targetId || p.stripePriceId === targetId
    ) || null
  );
}

/**
 * Get all products as an array with optional filters
 */
function getProducts(filters = {}) {
  let products = [...loadProducts()];

  if (filters.category && filters.category !== 'all') {
    products = products.filter(p => p.category === filters.category);
  }
  if (filters.type && filters.type !== 'all') {
    products = products.filter(p => p.type === filters.type);
  }
  if (filters.tag) {
    products = products.filter(p => p.tags && p.tags.includes(filters.tag));
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    products = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.tagline && p.tagline.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q)) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
    );
  }
  if (filters.minPrice !== undefined) {
    products = products.filter(p => p.price >= filters.minPrice);
  }
  if (filters.maxPrice !== undefined) {
    products = products.filter(p => p.price <= filters.maxPrice);
  }
  if (filters.popular) {
    products = products.filter(p => p.popular === true);
  }
  if (filters.id) {
    const targetId = ALIASES[filters.id] || filters.id;
    products = products.filter(
      p => p.id === targetId || p.stripeProductId === targetId || p.stripePriceId === targetId
    );
  }

  // Sort
  if (filters.sort === 'price-asc') {
    products.sort((a, b) => a.price - b.price);
  } else if (filters.sort === 'price-desc') {
    products.sort((a, b) => b.price - a.price);
  } else if (filters.sort === 'popular') {
    products.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
  } else if (filters.sort === 'engine') {
    products.sort((a, b) => (a.engineOrder || 999) - (b.engineOrder || 999));
  }

  return products;
}

// Backward-compatible CATALOG export
const CATALOG = getCatalog();

module.exports = { CATALOG, getCatalog, getProduct, getProducts };
