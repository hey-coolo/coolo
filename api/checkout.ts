import Stripe from 'stripe';

// Initialize Stripe with the secret key from Vercel
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { 
    apiVersion: '2024-06-20' // Using recent stable API version
});

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { slug, size, price, variantId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['NZ', 'AU', 'US', 'GB', 'CA'], // Add countries you want to ship to
      },
      line_items: [
        {
          price_data: {
            currency: 'nzd',
            product_data: {
              name: `COOLO Drop: ${slug.replace(/-/g, ' ').toUpperCase()}`,
              description: `Size/Option: ${size}`,
              images: ['https://coolo.co.nz/assets/logos/logo-dark.png'], // Replace with actual absolute image URL if dynamic
            },
            unit_amount: Math.round(parseFloat(price) * 100), // Stripe expects cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // Redirects back to your site
      success_url: `https://coolo.co.nz/support-an-artist?success=true`,
      cancel_url: `https://coolo.co.nz/support-an-artist/${slug}?canceled=true`,
      
      // We pass the variantId here so the webhook knows exactly what to tell Printify to print
      metadata: {
         product_slug: slug,
         variant_id: variantId,
         size: size
      }
    });

    // Send the secure Stripe URL back to the frontend to redirect the user
    return res.status(200).json({ url: session.url });

  } catch (error: any) {
    console.error('Checkout API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}