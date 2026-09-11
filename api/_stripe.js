const Stripe = require('stripe');

const apiKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder_key_unconfigured';

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('[Stripe] STRIPE_SECRET_KEY is not set. Using placeholder key. Provide a valid key in .env or your host secrets vault.');
}

// Always instantiate a StripeClient with the latest API version
const stripe = new Stripe(apiKey, {
  apiVersion: '2026-08-26.dahlia',
  appInfo: {
    name: 'Salesgency GTM Automation Platform',
    version: '1.0.0',
    url: 'https://salesgency.com',
  },
});

module.exports = { stripe };
