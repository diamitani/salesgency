const { stripe } = require('../_stripe');

/**
 * Serverless Handler: Stripe Terminal (In-Person Event Sales & Popups)
 * Adheres strictly to Stripe Best Practices:
 * - Terminal is the ONLY scenario where payment_method_types: ['card_present'] is passed on PaymentIntent
 */
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { action, amount = 49500, currency = 'usd', description = 'Salesgency Live Event Ticket' } = req.body || {};

  try {
    switch (action) {
      // 1. Connection token for Terminal reader registration
      case 'create_connection_token': {
        const connectionToken = await stripe.terminal.connectionTokens.create();
        return res.status(200).json({ secret: connectionToken.secret });
      }

      // 2. In-person PaymentIntent (EXPLICIT exception for card_present)
      case 'create_payment_intent': {
        const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency,
          payment_method_types: ['card_present'], // MANDATORY and ONLY permitted here
          capture_method: 'automatic',
          description,
          metadata: {
            channel: 'stripe_terminal_event',
          },
        });

        return res.status(200).json({
          clientSecret: paymentIntent.client_secret,
          id: paymentIntent.id,
          amount: paymentIntent.amount,
        });
      }

      default:
        return res.status(400).json({
          error: 'Invalid action. Supported actions: create_connection_token, create_payment_intent',
        });
    }
  } catch (error) {
    console.error('[Terminal Error]', error);
    return res.status(500).json({
      error: error.message || 'Failed to process Terminal request',
    });
  }
};
