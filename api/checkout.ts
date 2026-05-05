import Stripe from 'stripe';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { slug, size, price, variantId } = req.body;

  // Safely grab key inside handler
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
      console.error("Missing STRIPE_SECRET_KEY");
      return res.status(500).json({ error: "Payment gateway misconfigured." });
  }

  // Initialize inside the function
  const stripe = new Stripe(stripeKey, { 
      apiVersion: '2024-06-20' 
  });

  try {
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
              name: `COOLO Drop: ${slug.replace(/-/g, ' ').toUpperCase()}`,
              description: `Size/Option: ${size}`,
              images: ['https://coolo.co.nz/assets/logos/logo-dark.png'],
            },
            unit_amount: Math.round(parseFloat(price) * 100), 
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `https://coolo.co.nz/support-an-artist?success=true`,
      cancel_url: `https://coolo.co.nz/support-an-artist/${slug}?canceled=true`,
      metadata: {
         product_slug: slug,
         variant_id: variantId,
         size: size
      }
    });

    return res.status(200).json({ url: session.url });

  } catch (error: any) {
    console.error('Checkout API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}