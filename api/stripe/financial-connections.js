const { stripe } = require('../_stripe');

/**
 * Serverless Handler: Stripe Financial Connections
 * Generates session for instant bank account linking & ACH direct debit verification
 */
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { customerId, customerEmail, permissions = ['payment_method', 'balances'] } = req.body || {};

    let customer;
    if (customerId) {
      customer = await stripe.customers.retrieve(customerId);
    } else if (customerEmail) {
      const list = await stripe.customers.list({ email: customerEmail, limit: 1 });
      customer = list.data[0] || (await stripe.customers.create({ email: customerEmail }));
    } else {
      return res.status(400).json({ error: 'customerId or customerEmail is required' });
    }

    const session = await stripe.financialConnections.sessions.create({
      account_holder: {
        type: 'customer',
        customer: customer.id,
      },
      permissions: permissions,
      filters: {
        countries: ['US'],
      },
    });

    return res.status(200).json({
      sessionId: session.id,
      clientSecret: session.client_secret,
    });
  } catch (error) {
    console.error('[Financial Connections Error]', error);
    return res.status(500).json({
      error: error.message || 'Failed to create Financial Connections session',
    });
  }
};
