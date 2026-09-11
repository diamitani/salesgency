const { stripe } = require('../_stripe');

/**
 * Serverless Handler: Stripe Issuing & v2 Financial Accounts (Treasury)
 * Adheres strictly to Stripe Best Practices:
 * - Uses v2 Financial Accounts API (NOT legacy v1 Treasury)
 * - Provisions virtual spend cards with strict spending limit controls
 */
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { action, cardholderData, spendLimitMonthlyCents = 500000 } = req.body || {};

  try {
    switch (action) {
      // 1. Issue a virtual card for marketing spend (Meta, Google, LinkedIn Ads)
      case 'create_virtual_card': {
        const { name, email, phone_number, line1, city, state, postal_code, country = 'US' } = cardholderData || {};

        if (!name || !email) {
          return res.status(400).json({ error: 'Missing name or email for cardholder' });
        }

        // Create Issuing Cardholder
        const cardholder = await stripe.issuing.cardholders.create({
          name,
          email,
          phone_number: phone_number || '+15555550100',
          status: 'active',
          type: 'individual',
          billing: {
            address: {
              line1: line1 || '123 GTM Way',
              city: city || 'San Francisco',
              state: state || 'CA',
              postal_code: postal_code || '94105',
              country,
            },
          },
        });

        // Create Virtual Card with monthly spending controls
        const card = await stripe.issuing.cards.create({
          cardholder: cardholder.id,
          currency: 'usd',
          type: 'virtual',
          status: 'active',
          spending_controls: {
            spending_limits: [
              {
                amount: spendLimitMonthlyCents, // e.g. $5,000 monthly limit
                interval: 'monthly',
                categories: ['advertising_services', 'direct_marketing_merchants'],
              },
            ],
          },
          metadata: {
            platform: 'salesgency_gtm_ad_spend',
          },
        });

        return res.status(200).json({
          cardholderId: cardholder.id,
          cardId: card.id,
          last4: card.last4,
          brand: card.brand,
          status: card.status,
          type: card.type,
        });
      }

      // 2. Provision v2 Financial Account (Treasury)
      case 'create_v2_financial_account': {
        // v2 Financial Account endpoint call via raw request or v2 SDK methods
        const response = await stripe.rawRequest(
          'POST',
          '/v2/core/vault/financial_accounts',
          {
            supported_currencies: ['usd'],
            features: {
              inbound_transfers: { ach: { requested: true } },
              outbound_transfers: { ach: { requested: true }, us_domestic_wire: { requested: true } },
            },
          }
        );

        return res.status(200).json(response);
      }

      default:
        return res.status(400).json({
          error: 'Invalid action. Supported actions: create_virtual_card, create_v2_financial_account',
        });
    }
  } catch (error) {
    console.error('[Issuing / Treasury Error]', error);
    return res.status(500).json({
      error: error.message || 'Failed to execute Issuing/Treasury action',
    });
  }
};
