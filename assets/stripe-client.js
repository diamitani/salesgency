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
        SalesgencyStripe.showCheckoutError(err.message);
      }
    },

    /**
     * Show an honest, inline checkout error (no fake success, no raw stack).
     */
    showCheckoutError(message) {
      let el = document.getElementById('sg-checkout-error');
      if (!el) {
        el = document.createElement('div');
        el.id = 'sg-checkout-error';
        el.setAttribute('role', 'alert');
        el.style.cssText = 'position:fixed;left:50%;bottom:24px;transform:translateX(-50%);max-width:min(520px,90vw);background:#0f2a4a;color:#fff;padding:14px 20px;border-radius:12px;font-size:14px;box-shadow:0 8px 30px rgba(0,0,0,.25);z-index:9999;text-align:center;';
        document.body.appendChild(el);
      }
      el.innerHTML = 'Checkout isn\u2019t available right now. Please email <a href="mailto:Patrick.Diamitani@gmail.com" style="color:#7dd3fc;font-weight:700;">Patrick.Diamitani@gmail.com</a> and we\u2019ll get you set up.';
      el.style.display = 'block';
      clearTimeout(el._hide);
      el._hide = setTimeout(() => { el.style.display = 'none'; }, 8000);
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
     * Bind checkout buttons directly - the method marketplace.js and
     * product-page.js call after rendering dynamic product cards.
     * Safe to call repeatedly; already-bound buttons are skipped.
     */
    bindCheckoutButtons(root) {
      const scope = root || document;
      scope.querySelectorAll('[data-stripe-product]:not([data-sg-bound])').forEach((btn) => {
        btn.setAttribute('data-sg-bound', 'true');
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const productId = btn.getAttribute('data-stripe-product');
          if (!productId) return;
          const original = btn.innerHTML;
          btn.setAttribute('disabled', 'true');
          btn.innerHTML = '<span>Redirecting to checkout\u2026</span>';
          SalesgencyStripe.checkout(productId).finally(() => {
            btn.removeAttribute('disabled');
            btn.innerHTML = original;
          });
        });
      });
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
  // Alias: marketplace.js / product-page.js look for window.SalesGencyStripe
  window.SalesGencyStripe = SalesgencyStripe;

  function boot() {
    SalesgencyStripe.init();
    SalesgencyStripe.bindCheckoutButtons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window);
