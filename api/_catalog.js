// Canonical product catalog for Salesgency
// Reads from data/products.json as the single source of truth
const path = require('path');
const fs = require('fs');

let _products = null;

function loadProducts() {
  if (_products) return _products;
  const filePath = path.resolve(__dirname, '..', 'data', 'products.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  _products = JSON.parse(raw);
  return _products;
}

/**
 * Get the full catalog as a { [id]: product } map (backward-compatible)
 */
function getCatalog() {
  const products = loadProducts();
  const catalog = {};
  for (const p of products) {
    catalog[p.id] = {
      name: p.name,
      amount: p.price,
      currency: p.currency,
      mode: p.mode,
      description: p.description,
      interval: p.mode === 'subscription' ? 'month' : undefined,
    };
  }
  return catalog;
}

/**
 * Get a single product by ID (full product data)
 */
function getProduct(id) {
  const products = loadProducts();
  return products.find(p => p.id === id) || null;
}

/**
 * Get all products as an array with optional filters
 */
function getProducts(filters = {}) {
  let products = [...loadProducts()];

  if (filters.category) {
    products = products.filter(p => p.category === filters.category);
  }
  if (filters.type) {
    products = products.filter(p => p.type === filters.type);
  }
  if (filters.tag) {
    products = products.filter(p => p.tags && p.tags.includes(filters.tag));
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    products = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
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
    products = products.filter(p => p.id === filters.id);
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
