import Stripe from 'stripe';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) return res.status(500).json({ error: "Payment gateway misconfigured." });

  const stripe = new Stripe(stripeKey, { apiVersion: '2024-06-20' });

  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Basket items missing or empty." });
    }

    // Secure itemized summation calculation loops
    let totalCents = 0;
    items.forEach((item: any) => {
        const itemPrice = parseFloat(item.price) || 0;
        const qty = parseInt(item.quantity) || 1;
        totalCents += Math.round(itemPrice * 100) * qty;
    });

    if (totalCents <= 0) {
        return res.status(400).json({ error: "Invalid currency total aggregation calculation values." });
    }

    // Build unified metadata references
    const variantIdString = items.map((i: any) => `${i.variantId}:${i.quantity}`).join(',');

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCents,
      currency: 'nzd',
      automatic_payment_methods: { enabled: true },
      metadata: {
         // Pack item maps into metadata hooks for tracking/webhooks pipelines
         variant_ids_map: variantIdString.substring(0, 500)
      }
    });

    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error('Payment Intent Error:', error);
    return res.status(500).json({ error: error.message });
  }
}