/**
 * Unified Stripe Router — api/stripe.js
 * Consolidates all Stripe sub-routes into a single Vercel Serverless Function
 * to stay within the Hobby plan 12-function limit.
 *
 * Route dispatch via path segments:
 *   POST /api/stripe/create-checkout-session
 *   POST /api/stripe/customer-portal
 *   POST /api/stripe/webhook            (raw body, no JSON parse)
 *   POST /api/stripe/financial-connections
 *   POST /api/stripe/identity
 *   POST /api/stripe/invoicing
 *   POST /api/stripe/issuing-treasury
 *   POST /api/stripe/terminal
 */

const crypto = require('crypto');
const { stripe } = require('./_stripe');
const { getCatalog } = require('./_catalog');

// ─── Route handlers ───────────────────────────────────────────────────────────

async function handleConfig(req, res) {
  return res.status(200).json({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
  });
}

async function handleCreateCheckoutSession(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  try {
    const { productId, customerEmail, clientReferenceId, returnUrl, qualificationData } = req.body || {};
    const catalog = getCatalog();

    if (!productId || !catalog[productId]) {
      return res.status(400).json({
        error: 'Invalid or missing productId',
        validProductIds: Object.keys(catalog),
      });
    }

    const item = catalog[productId];
    const origin = returnUrl || req.headers.origin || 'https://salesgency.com';

    // Handle $0 free downloads directly
    if (item.amount === 0 || item.price === 0) {
      return res.status(200).json({
        sessionId: 'free_download',
        url: `${origin}/checkout-success.html?product=${encodeURIComponent(item.id || productId)}&status=free`,
      });
    }

    const randomSuffix = crypto.randomBytes(4).toString('hex');
    const integrationIdentifier = `salesgency_${randomSuffix}`;

    let lineItemData;
    if (item.stripePriceId) {
      lineItemData = {
        price: item.stripePriceId,
        quantity: 1,
      };
    } else {
      lineItemData = {
        price_data: {
          currency: item.currency || 'usd',
          product_data: { name: item.name, description: item.description },
          unit_amount: item.amount || item.price,
        },
        quantity: 1,
      };
      if (item.mode === 'subscription') {
        lineItemData.price_data.recurring = { interval: item.interval || 'month' };
      }
    }

    const metadata = {
      productId: item.id || productId,
      productName: item.name,
      stripeProductId: item.stripeProductId || '',
      environment: process.env.NODE_ENV || 'production',
    };

    if (qualificationData && typeof qualificationData === 'object') {
      if (qualificationData.teamSize) metadata.qual_team_size = String(qualificationData.teamSize);
      if (qualificationData.crm) metadata.qual_crm = String(qualificationData.crm);
      if (qualificationData.primaryPain) metadata.qual_primary_pain = String(qualificationData.primaryPain);
      if (qualificationData.leadVolume) metadata.qual_lead_volume = String(qualificationData.leadVolume);
      if (qualificationData.source) metadata.qual_source = String(qualificationData.source);
    }

    const sessionParams = {
      mode: item.mode || 'payment',
      line_items: [lineItemData],
      success_url: `${origin}/checkout-success.html?session_id={CHECKOUT_SESSION_ID}&product=${encodeURIComponent(item.id || productId)}&status=success`,
      cancel_url: `${origin}/pricing.html?cancelled=true`,
      integration_identifier: integrationIdentifier,
      metadata,
    };

    if (customerEmail) sessionParams.customer_email = customerEmail;
    if (clientReferenceId) sessionParams.client_reference_id = clientReferenceId;
    if (process.env.STRIPE_AUTOMATIC_TAX_ENABLED === 'true') {
      sessionParams.automatic_tax = { enabled: true };
    }

    const session = await stripe.checkout.sessions.create(sessionParams);
    return res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('[Stripe Checkout Error]', error);
    return res.status(500).json({ error: error.message || 'Failed to initialize checkout session' });
  }
}

async function handleCustomerPortal(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  try {
    const { customerId, returnUrl } = req.body || {};
    if (!customerId) return res.status(400).json({ error: 'Missing customerId parameter' });

    const origin = returnUrl || req.headers.origin || 'https://salesgency.com';
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/pricing.html`,
    });
    return res.status(200).json({ url: portalSession.url });
  } catch (error) {
    console.error('[Stripe Customer Portal Error]', error);
    return res.status(500).json({ error: error.message || 'Failed to generate Customer Portal session' });
  }
}

// ─── Webhook needs raw body — buffer before JSON parse ────────────────────────
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

async function handleWebhook(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('[Stripe Webhook] Missing STRIPE_WEBHOOK_SECRET');
    return res.status(500).json({ error: 'Webhook secret is unconfigured on server' });
  }
  if (!sig) return res.status(400).json({ error: 'Missing stripe-signature header' });

  let event;
  try {
    const rawBody = await getRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error('[Stripe Webhook Signature Failed]:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log(`[Stripe Webhook] ID: ${event.id}, Type: ${event.type}`);

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        if (session.payment_status !== 'unpaid') await fulfillOrder(session);
        break;
      }
      case 'checkout.session.async_payment_succeeded':
        await fulfillOrder(event.data.object);
        break;
      case 'checkout.session.async_payment_failed':
        console.warn(`[Checkout Async Payment Failed] Session: ${event.data.object.id}`);
        break;
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        console.log(`[Subscription Updated] ${event.data.object.id}, Status: ${event.data.object.status}`);
        break;
      case 'customer.subscription.deleted':
        console.log(`[Subscription Cancelled] ${event.data.object.id}`);
        break;
      case 'invoice.paid':
        console.log(`[Invoice Paid] ${event.data.object.id}, Amount: $${event.data.object.amount_paid / 100}`);
        break;
      case 'invoice.payment_failed':
        console.warn(`[Invoice Payment Failed] ${event.data.object.id}`);
        break;
      case 'identity.verification_session.verified':
        console.log(`[Identity Verified] ${event.data.object.id}`);
        break;
      case 'issuing_authorization.request':
        console.log(`[Issuing Auth Request] Card: ${event.data.object.card.id}`);
        break;
      default:
        console.log(`[Stripe Webhook Unhandled] ${event.type}`);
    }
    return res.status(200).json({ received: true });
  } catch (handlerErr) {
    console.error('[Stripe Webhook Handler Error]:', handlerErr);
    return res.status(500).json({ error: 'Handler processing failed' });
  }
}

async function fulfillOrder(session) {
  const productId = session.metadata?.productId;
  const customerEmail = session.customer_details?.email || session.customer_email;
  console.log(`[Fulfillment] Product: ${productId}, Customer: ${customerEmail}, Session: ${session.id}`);
}

async function handleFinancialConnections(req, res) {
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
      account_holder: { type: 'customer', customer: customer.id },
      permissions,
      filters: { countries: ['US'] },
    });
    return res.status(200).json({ sessionId: session.id, clientSecret: session.client_secret });
  } catch (error) {
    console.error('[Financial Connections Error]', error);
    return res.status(500).json({ error: error.message || 'Failed to create Financial Connections session' });
  }
}

async function handleIdentity(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  try {
    const { clientReferenceId, customerEmail, returnUrl } = req.body || {};
    const origin = returnUrl || req.headers.origin || 'https://salesgency.com';

    const verificationSession = await stripe.identity.verificationSessions.create({
      type: 'document',
      metadata: {
        clientReferenceId: clientReferenceId || 'salesgency_client',
        customerEmail: customerEmail || '',
      },
      options: {
        document: {
          require_matching_selfie: true,
          require_id_number: true,
          require_live_capture: true,
        },
      },
      return_url: `${origin}/qualification.html?identity_status=verified&session_id={PROVISIONING_SESSION_ID}`,
    });

    return res.status(200).json({
      sessionId: verificationSession.id,
      url: verificationSession.url,
      clientSecret: verificationSession.client_secret,
    });
  } catch (error) {
    console.error('[Stripe Identity Error]', error);
    return res.status(500).json({ error: error.message || 'Failed to create Identity verification session' });
  }
}

async function handleInvoicing(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  try {
    const { customerEmail, customerName, items, daysUntilDue = 30, description } = req.body || {};
    if (!customerEmail || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Missing required invoice fields: customerEmail and non-empty items array' });
    }

    const existingCustomers = await stripe.customers.list({ email: customerEmail, limit: 1 });
    let customer = existingCustomers.data[0];
    if (!customer) {
      customer = await stripe.customers.create({
        email: customerEmail,
        name: customerName,
        description: `Enterprise Client - ${customerName || customerEmail}`,
      });
    }

    for (const item of items) {
      await stripe.invoiceItems.create({
        customer: customer.id,
        amount: item.amount,
        currency: item.currency || 'usd',
        description: item.description,
      });
    }

    const invoice = await stripe.invoices.create({
      customer: customer.id,
      collection_method: 'send_invoice',
      days_until_due: daysUntilDue,
      description: description || 'Salesgency Enterprise GTM Engineering Sprint',
      metadata: { channel: 'enterprise_invoicing' },
    });

    const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);
    return res.status(200).json({
      invoiceId: finalizedInvoice.id,
      invoicePdf: finalizedInvoice.invoice_pdf,
      hostedInvoiceUrl: finalizedInvoice.hosted_invoice_url,
      amountDue: finalizedInvoice.amount_due,
      status: finalizedInvoice.status,
    });
  } catch (error) {
    console.error('[Stripe Invoicing Error]', error);
    return res.status(500).json({ error: error.message || 'Failed to create and finalize invoice' });
  }
}

async function handleIssuingTreasury(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  const { action, cardholderData, spendLimitMonthlyCents = 500000 } = req.body || {};
  try {
    switch (action) {
      case 'create_virtual_card': {
        const { name, email, phone_number, line1, city, state, postal_code, country = 'US' } = cardholderData || {};
        if (!name || !email) return res.status(400).json({ error: 'Missing name or email for cardholder' });

        const cardholder = await stripe.issuing.cardholders.create({
          name, email,
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

        const card = await stripe.issuing.cards.create({
          cardholder: cardholder.id,
          currency: 'usd',
          type: 'virtual',
          status: 'active',
          spending_controls: {
            spending_limits: [{
              amount: spendLimitMonthlyCents,
              interval: 'monthly',
              categories: ['advertising_services', 'direct_marketing_merchants'],
            }],
          },
          metadata: { platform: 'salesgency_gtm_ad_spend' },
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
      case 'create_v2_financial_account': {
        const response = await stripe.rawRequest('POST', '/v2/core/vault/financial_accounts', {
          supported_currencies: ['usd'],
          features: {
            inbound_transfers: { ach: { requested: true } },
            outbound_transfers: { ach: { requested: true }, us_domestic_wire: { requested: true } },
          },
        });
        return res.status(200).json(response);
      }
      default:
        return res.status(400).json({ error: 'Invalid action. Supported: create_virtual_card, create_v2_financial_account' });
    }
  } catch (error) {
    console.error('[Issuing / Treasury Error]', error);
    return res.status(500).json({ error: error.message || 'Failed to execute Issuing/Treasury action' });
  }
}

async function handleTerminal(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  const { action, amount = 49500, currency = 'usd', description = 'Salesgency Live Event Ticket' } = req.body || {};
  try {
    switch (action) {
      case 'create_connection_token': {
        const connectionToken = await stripe.terminal.connectionTokens.create();
        return res.status(200).json({ secret: connectionToken.secret });
      }
      case 'create_payment_intent': {
        const paymentIntent = await stripe.paymentIntents.create({
          amount, currency,
          payment_method_types: ['card_present'],
          capture_method: 'automatic',
          description,
          metadata: { channel: 'stripe_terminal_event' },
        });
        return res.status(200).json({
          clientSecret: paymentIntent.client_secret,
          id: paymentIntent.id,
          amount: paymentIntent.amount,
        });
      }
      default:
        return res.status(400).json({ error: 'Invalid action. Supported: create_connection_token, create_payment_intent' });
    }
  } catch (error) {
    console.error('[Terminal Error]', error);
    return res.status(500).json({ error: error.message || 'Failed to process Terminal request' });
  }
}

// ─── Main dispatcher ──────────────────────────────────────────────────────────

const ROUTES = {
  'config':                  handleConfig,
  'create-checkout-session': handleCreateCheckoutSession,
  'customer-portal':         handleCustomerPortal,
  'webhook':                 handleWebhook,
  'financial-connections':   handleFinancialConnections,
  'identity':                handleIdentity,
  'invoicing':               handleInvoicing,
  'issuing-treasury':        handleIssuingTreasury,
  'terminal':                handleTerminal,
};

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, stripe-signature');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // Extract the sub-route: /api/stripe/[sub-route]
  // req.url will be something like /api/stripe/create-checkout-session
  const urlParts = (req.url || '').split('?')[0].split('/').filter(Boolean);
  // urlParts: ['api', 'stripe', 'create-checkout-session']
  const subRoute = urlParts[urlParts.length - 1];

  const handler = ROUTES[subRoute];
  if (!handler) {
    return res.status(404).json({
      error: `Unknown Stripe route: ${subRoute}`,
      available: Object.keys(ROUTES),
    });
  }

  return handler(req, res);
};

// Disable body parser globally so the webhook handler can read the raw stream.
// Non-webhook routes parse the body manually from req.body (Vercel pre-parses JSON).
module.exports.config = {
  api: {
    bodyParser: false,
  },
};
