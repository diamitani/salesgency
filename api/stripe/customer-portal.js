const { stripe } = require('../_stripe');

/**
 * Serverless Handler: Stripe Billing Customer Portal
 * Allows subscribers to self-manage payment methods, invoices, and retainer tiers
 */
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { customerId, returnUrl } = req.body || {};

    if (!customerId) {
      return res.status(400).json({ error: 'Missing customerId parameter' });
    }

    const origin = returnUrl || req.headers.origin || 'https://salesgency.com';

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/pricing.html`,
    });

    return res.status(200).json({ url: portalSession.url });
  } catch (error) {
    console.error('[Stripe Customer Portal Error]', error);
    return res.status(500).json({
      error: error.message || 'Failed to generate Customer Portal session',
    });
  }
};
