import Stripe from 'stripe';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) return res.status(500).json({ error: "Payment gateway misconfigured." });

  const stripe = new Stripe(stripeKey, { apiVersion: '2024-06-20' });

  try {
    const { slug, variantId, price } = req.body;

    if (!slug || !price) {
      return res.status(400).json({ error: "Missing required product data." });
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(parseFloat(price) * 100), // Stripe expects cents
      currency: 'nzd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
         product_slug: String(slug),
         variant_id: String(variantId || 'unknown')
      }
    });

    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error('Payment Intent Error:', error);
    return res.status(500).json({ error: error.message });
  }
}