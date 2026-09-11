/**
 * Salesgency Stripe Client Helper
 * Handles smooth checkout redirection and customer portal integration
 */
(function (window) {
  const SalesgencyStripe = {
    /**
     * Start Checkout for a product or subscription
     */
    async checkout(productId, customerEmail = '') {
      try {
        const response = await fetch('/api/stripe/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId,
            customerEmail: customerEmail || undefined,
            returnUrl: window.location.origin,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to start checkout');
        }

        if (data.url) {
          window.location.href = data.url;
        } else {
          throw new Error('No checkout URL returned from server');
        }
      } catch (err) {
        console.error('[Salesgency Stripe Error]:', err);
        alert(`Checkout could not be initialized: ${err.message}`);
      }
    },

    /**
     * Open Customer Billing Portal
     */
    async openPortal(customerId) {
      try {
        const response = await fetch('/api/stripe/customer-portal', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customerId,
            returnUrl: window.location.origin,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Failed to open customer portal');
        }

        if (data.url) {
          window.location.href = data.url;
        }
      } catch (err) {
        console.error('[Salesgency Portal Error]:', err);
        alert(`Customer portal error: ${err.message}`);
      }
    },

    /**
     * Bind all checkout trigger buttons on page load
     */
    init() {
      document.addEventListener('click', (e) => {
        const target = e.target.closest('[data-stripe-checkout], [data-stripe-product]');
        if (target) {
          e.preventDefault();
          const productId = target.getAttribute('data-stripe-checkout') || target.getAttribute('data-stripe-product');
          if (productId) {
            const originalText = target.innerHTML;
            target.setAttribute('disabled', 'true');
            target.innerHTML = `<span>Redirecting to Checkout…</span>`;

            SalesgencyStripe.checkout(productId).finally(() => {
              target.removeAttribute('disabled');
              target.innerHTML = originalText;
            });
          }
        }
      });
    },
  };

  window.SalesgencyStripe = SalesgencyStripe;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => SalesgencyStripe.init());
  } else {
    SalesgencyStripe.init();
  }
})(window);
