import Stripe from 'stripe';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const body = req.body || {};

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
      console.error("Missing STRIPE_SECRET_KEY");
      return res.status(500).json({ error: "Payment gateway misconfigured." });
  }

  const stripe = new Stripe(stripeKey, { apiVersion: '2024-06-20' });

  try {
    const { slug, title, variantTitle, price, variantId, imageUrl } = body;

    if (!slug || !price) {
      return res.status(400).json({ error: "Missing required product data (slug or price)." });
    }

    // Stripe REQUIRES absolute URLs for images. If missing or relative, fallback to your logo.
    const absoluteImage = imageUrl && imageUrl.startsWith('http') 
        ? imageUrl 
        : 'https://coolo.co.nz/assets/logos/logo-dark.png';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['NZ', 'AU', 'US', 'GB', 'CA'], 
      },
      line_items: [
        {
          price_data: {
            currency: 'nzd',
            product_data: {
              name: `${title || 'COOLO Drop'} - ${variantTitle || 'Standard'}`,
              images: [absoluteImage],
            },
            unit_amount: Math.round(parseFloat(price) * 100),
          },
          quantity: 1,
        }
      ],
      mode: 'payment',
      success_url: `https://coolo.co.nz/support-an-artist?success=true`,
      cancel_url: `https://coolo.co.nz/support-an-artist/${slug}?canceled=true`,
      metadata: {
         // Metadata values MUST be strings for Stripe
         product_slug: String(slug),
         variant_id: String(variantId || 'unknown')
      }
    });

    return res.status(200).json({ url: session.url });

  } catch (error: any) {
    console.error('Checkout API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}