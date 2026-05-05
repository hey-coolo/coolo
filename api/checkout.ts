import { Resend } from 'resend';

// NOTE: To make this fully live, you will need to `npm install stripe` 
// and add STRIPE_SECRET_KEY to your Vercel Environment Variables.
// import Stripe from 'stripe';
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2023-10-16' });

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { slug, size, price, email } = req.body;

  try {
    /* // 1. STRIPE CHECKOUT SESSION INTEGRATION 
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'nzd',
              product_data: {
                name: `COOLO Drop: ${slug} (Size: ${size || 'OS'})`,
                images: ['https://coolo.co.nz/assets/logos/logo-dark.png'],
              },
              unit_amount: parseInt(price) * 100, // Stripe expects cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.VERCEL_URL}/support-an-artist?success=true`,
        cancel_url: `${process.env.VERCEL_URL}/support-an-artist/${slug}?canceled=true`,
        metadata: {
           product_slug: slug,
           size: size
        }
      });
      
      // Return session.url to the frontend to redirect the user to Stripe.
      // return res.status(200).json({ url: session.url });
    */

    /*
      // 2. PRINTIFY INTEGRATION (Triggered via Stripe Webhook after success)
      // Once Stripe confirms payment, a separate webhook route (e.g., /api/webhook) 
      // hits the Printify API to create the order for automated fulfillment.
      
      await fetch(`https://api.printify.com/v1/shops/${process.env.PRINTIFY_SHOP_ID}/orders.json`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.PRINTIFY_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            external_id: "STRIPE_SESSION_ID",
            line_items: [{ product_id: "PRINTIFY_PRODUCT_ID", variant_id: "VARIANT_ID", quantity: 1 }],
            shipping_method: 1,
            send_shipping_notification: true,
            address_to: { ...customerDataFromStripe }
        })
      });
    */

    // 3. For now, simulate success and trigger an internal alert
    if (email) {
      await resend.emails.send({
        from: 'COOLO Store <system@coolo.co.nz>',
        to: ['hey@coolo.co.nz'],
        subject: `New Cart Intent: ${slug}`,
        html: `<p>Someone tried to buy <strong>${slug}</strong> (Size: ${size}). Wire up Stripe!</p>`
      });
    }

    // Mock successful response so frontend UI knows the API caught it
    return res.status(200).json({ success: true, message: 'Checkout API blueprint ready.' });

  } catch (error: any) {
    console.error('Checkout API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}