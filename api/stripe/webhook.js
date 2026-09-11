const { stripe } = require('../_stripe');

/**
 * Helper to get raw buffer from request stream
 */
async function getRawBody(req) {
  if (req.rawBody) return req.rawBody;
  if (Buffer.isBuffer(req.body)) return req.body;

  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', (err) => reject(err));
  });
}

/**
 * Serverless Handler: Stripe Webhook
 * Adheres strictly to Stripe Best Practices:
 * - Always verifies event signature with STRIPE_WEBHOOK_SECRET
 * - Required for all post-payment fulfillment and subscription lifecycle
 * - Fulfills on BOTH checkout.session.completed (if payment_status !== 'unpaid')
 *   AND checkout.session.async_payment_succeeded for delayed payment methods
 */
const webhookHandler = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('[Stripe Webhook] Missing STRIPE_WEBHOOK_SECRET in environment variables');
    return res.status(500).json({ error: 'Webhook secret is unconfigured on server' });
  }

  if (!sig) {
    return res.status(400).json({ error: 'Missing stripe-signature header' });
  }

  let event;
  try {
    const rawBody = await getRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error(`[Stripe Webhook Signature Verification Failed]:`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log(`[Stripe Webhook Received] ID: ${event.id}, Type: ${event.type}`);

  try {
    switch (event.type) {
      // 1. One-time or Subscription Checkout completed
      case 'checkout.session.completed': {
        const session = event.data.object;
        // CRITICAL RULE: Fulfill only when payment_status is not unpaid
        if (session.payment_status !== 'unpaid') {
          await fulfillOrder(session);
        } else {
          console.log(`[Checkout Completed - Awaiting Payment] Session ${session.id} payment_status is unpaid.`);
        }
        break;
      }

      // 2. Delayed payment methods succeeded (e.g. ACH, SEPA)
      case 'checkout.session.async_payment_succeeded': {
        const session = event.data.object;
        await fulfillOrder(session);
        break;
      }

      // 3. Delayed payment methods failed
      case 'checkout.session.async_payment_failed': {
        const session = event.data.object;
        console.warn(`[Checkout Async Payment Failed] Session: ${session.id}`);
        // Notify customer or alert RevOps team
        break;
      }

      // 4. Subscription lifecycle updates
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        console.log(`[Subscription Updated] Sub ID: ${subscription.id}, Status: ${subscription.status}`);
        // Update client active plan status in DB
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        console.log(`[Subscription Cancelled] Sub ID: ${subscription.id}`);
        // Revoke retainer engineering access in DB
        break;
      }

      // 5. Invoicing lifecycle
      case 'invoice.paid': {
        const invoice = event.data.object;
        console.log(`[Invoice Paid] Invoice ID: ${invoice.id}, Amount: $${invoice.amount_paid / 100}`);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        console.warn(`[Invoice Payment Failed] Invoice ID: ${invoice.id}`);
        break;
      }

      // 6. Identity Verification completed
      case 'identity.verification_session.verified': {
        const verificationSession = event.data.object;
        console.log(`[Identity Verified] Session: ${verificationSession.id}, Client: ${verificationSession.client_reference_id}`);
        // Mark client KYC verified in DB to allow card issuing / treasury
        break;
      }

      // 7. Issuing Authorization Request (Real-time spending control)
      case 'issuing_authorization.request': {
        const auth = event.data.object;
        console.log(`[Issuing Auth Request] Card: ${auth.card.id}, Amount: $${auth.amount / 100}`);
        // Auto-approve within bounds or custom limit checks
        break;
      }

      default:
        console.log(`[Stripe Webhook Unhandled Event] ${event.type}`);
    }

    return res.status(200).json({ received: true });
  } catch (handlerErr) {
    console.error(`[Stripe Webhook Handler Error]:`, handlerErr);
    return res.status(500).json({ error: 'Handler processing failed' });
  }
};

/**
 * Fulfill the purchased product or subscription
 */
async function fulfillOrder(session) {
  const productId = session.metadata?.productId;
  const customerEmail = session.customer_details?.email || session.customer_email;

  console.log(`[Fulfillment Success] Product: ${productId}, Customer: ${customerEmail}, Session: ${session.id}`);
  // In production: Grant download token, dispatch email via Resend/SendGrid, enroll in license vault
}

// Disable body parser for Vercel/Next serverless to preserve raw buffer for signature verification
module.exports = webhookHandler;
module.exports.config = {
  api: {
    bodyParser: false,
  },
};
