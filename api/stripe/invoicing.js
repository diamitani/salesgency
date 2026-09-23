const { stripe } = require('../_stripe');

/**
 * Serverless Handler: Stripe Invoicing for Enterprise Agency Sprints
 * Supports Net-15/30 payment terms, PDF generation, and automated collection
 */
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { customerEmail, customerName, items, daysUntilDue = 30, description } = req.body || {};

    if (!customerEmail || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: 'Missing required invoice fields: customerEmail and non-empty items array',
      });
    }

    // 1. Locate or create customer
    const existingCustomers = await stripe.customers.list({
      email: customerEmail,
      limit: 1,
    });

    let customer = existingCustomers.data[0];
    if (!customer) {
      customer = await stripe.customers.create({
        email: customerEmail,
        name: customerName,
        description: `Enterprise Client - ${customerName || customerEmail}`,
      });
    }

    // 2. Create invoice items
    for (const item of items) {
      await stripe.invoiceItems.create({
        customer: customer.id,
        amount: item.amount, // in cents
        currency: item.currency || 'usd',
        description: item.description,
      });
    }

    // 3. Create and finalize the draft invoice
    const invoice = await stripe.invoices.create({
      customer: customer.id,
      collection_method: 'send_invoice',
      days_until_due: daysUntilDue,
      description: description || 'Salesgency Enterprise GTM Engineering Sprint',
      metadata: {
        channel: 'enterprise_invoicing',
      },
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
    return res.status(500).json({
      error: error.message || 'Failed to create and finalize invoice',
    });
  }
};
