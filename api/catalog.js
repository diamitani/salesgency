const { getProducts, getProduct } = require('./_catalog');

/**
 * Serverless Handler: Product Catalog API
 * GET /api/catalog — returns filtered product list
 * Query params: category, type, tag, search, sort, popular, id, minPrice, maxPrice
 */
module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { category, type, tag, search, sort, popular, id, minPrice, maxPrice } = req.query || {};

    // Single product lookup
    if (id) {
      const product = getProduct(id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found', id });
      }
      return res.status(200).json(product);
    }

    // Filtered list
    const filters = {};
    if (category) filters.category = category;
    if (type) filters.type = type;
    if (tag) filters.tag = tag;
    if (search) filters.search = search;
    if (sort) filters.sort = sort;
    if (popular === 'true') filters.popular = true;
    if (minPrice) filters.minPrice = parseInt(minPrice, 10);
    if (maxPrice) filters.maxPrice = parseInt(maxPrice, 10);

    const products = getProducts(filters);

    // Set cache headers for edge caching
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');

    return res.status(200).json({
      count: products.length,
      products,
    });
  } catch (error) {
    console.error('[Catalog API Error]', error);
    return res.status(500).json({ error: 'Failed to load product catalog' });
  }
};
