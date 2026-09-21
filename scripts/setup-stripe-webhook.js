const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function main() {
  console.log('Listing existing Stripe webhooks...');
  const endpoints = await stripe.webhookEndpoints.list({ limit: 10 });
  const targetUrl = 'https://salesgency.com/api/stripe/webhook';
  let matched = endpoints.data.find(ep => ep.url === targetUrl);

  if (matched) {
    console.log('Found existing webhook endpoint:', matched.id, matched.url);
    console.log('Secret:', matched.secret || '(secret is only shown upon creation or roll)');
  } else {
    console.log('Creating new webhook endpoint for:', targetUrl);
    const created = await stripe.webhookEndpoints.create({
      url: targetUrl,
      enabled_events: [
        'checkout.session.completed',
        'customer.subscription.created',
        'customer.subscription.updated',
        'customer.subscription.deleted',
        'invoice.paid',
        'invoice.payment_failed',
      ],
      description: 'SalesGency Production Webhook',
    });
    console.log('Created webhook endpoint:', created.id);
    console.log('Secret:', created.secret);
    matched = created;
  }

  // Save the secret to .env.local if present
  if (matched.secret) {
    const envPath = path.resolve(__dirname, '../.env.local');
    let envContent = fs.readFileSync(envPath, 'utf8');
    if (envContent.includes('STRIPE_WEBHOOK_SECRET=')) {
      envContent = envContent.replace(/STRIPE_WEBHOOK_SECRET=.*/, `STRIPE_WEBHOOK_SECRET=${matched.secret}`);
    } else {
      envContent += `\nSTRIPE_WEBHOOK_SECRET=${matched.secret}\n`;
    }
    fs.writeFileSync(envPath, envContent);
    console.log('Updated .env.local with STRIPE_WEBHOOK_SECRET');
  }
}

main().catch(err => {
  console.error('Error with Stripe webhook:', err.message);
  process.exit(1);
});
