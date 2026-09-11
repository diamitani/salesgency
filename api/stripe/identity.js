const { stripe } = require('../_stripe');

/**
 * Serverless Handler: Stripe Identity VerificationSession
 * Verifies government ID and biometrics prior to card issuance or treasury access
 */
module.exports = async (req, res) => {
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
    return res.status(500).json({
      error: error.message || 'Failed to create Identity verification session',
    });
  }
};
