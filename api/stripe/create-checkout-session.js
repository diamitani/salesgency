const crypto = require('crypto');
const { stripe } = require('../_stripe');
const { CATALOG } = require('../_catalog');

/**
 * Serverless Handler: Create Stripe Checkout Session
 * Adheres strictly to Stripe Best Practices:
 * - Omits payment_method_types to enable Dynamic Payment Methods (Apple Pay, Google Pay, Cards, Link)
 * - Tags with integration_identifier containing an 8-char random suffix
 * - Supports one-time payments and recurring subscriptions
 * - Accepts qualification data from booking wizard for CRM enrichment
 */
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { productId, customerEmail, clientReferenceId, returnUrl, qualificationData } = req.body || {};

    if (!productId || !CATALOG[productId]) {
      return res.status(400).json({
        error: 'Invalid or missing productId',
        validProductIds: Object.keys(CATALOG),
      });
    }

    const item = CATALOG[productId];
    const origin = returnUrl || req.headers.origin || 'https://salesgency.com';

    // Generate random 8-letter suffix for integration_identifier
    const randomSuffix = crypto.randomBytes(4).toString('hex');
    const integrationIdentifier = `salesgency_${randomSuffix}`;

    // Line items configuration
    const lineItemData = {
      price_data: {
        currency: item.currency,
        product_data: {
          name: item.name,
          description: item.description,
        },
        unit_amount: item.amount,
      },
      quantity: 1,
    };

    if (item.mode === 'subscription') {
      lineItemData.price_data.recurring = {
        interval: item.interval || 'month',
      };
    }

    // Build metadata - include qualification data from booking wizard
    const metadata = {
      productId,
      productName: item.name,
      environment: process.env.NODE_ENV || 'production',
    };

    // Merge qualification data into metadata (Stripe metadata values must be strings, max 500 chars each)
    if (qualificationData && typeof qualificationData === 'object') {
      if (qualificationData.teamSize) metadata.qual_team_size = String(qualificationData.teamSize);
      if (qualificationData.crm) metadata.qual_crm = String(qualificationData.crm);
      if (qualificationData.primaryPain) metadata.qual_primary_pain = String(qualificationData.primaryPain);
      if (qualificationData.leadVolume) metadata.qual_lead_volume = String(qualificationData.leadVolume);
      if (qualificationData.source) metadata.qual_source = String(qualificationData.source);
    }

    // Build session parameters
    const sessionParams = {
      mode: item.mode,
      line_items: [lineItemData],
      success_url: `${origin}/checkout-success.html?session_id={CHECKOUT_SESSION_ID}&product=${encodeURIComponent(productId)}&status=success`,
      cancel_url: `${origin}/marketplace.html?cancelled=true`,
      integration_identifier: integrationIdentifier,
      metadata,
    };

    if (customerEmail) {
      sessionParams.customer_email = customerEmail;
    }

    if (clientReferenceId) {
      sessionParams.client_reference_id = clientReferenceId;
    }

    // Optional Tax support: only active when STRIPE_AUTOMATIC_TAX_ENABLED is set to true
    if (process.env.STRIPE_AUTOMATIC_TAX_ENABLED === 'true') {
      sessionParams.automatic_tax = { enabled: true };
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return res.status(200).json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('[Stripe Checkout Error]', error);
    return res.status(500).json({
      error: error.message || 'Failed to initialize checkout session',
    });
  }
};
