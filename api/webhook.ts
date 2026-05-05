import Stripe from 'stripe';
import { buffer } from 'micro';
import { Resend } from 'resend';

// Vercel Serverless config: Disable body parsing so Stripe can verify the raw signature
export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { 
    apiVersion: '2024-06-20' 
});
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'] as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET as string);
  } catch (err: any) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful payment
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    try {
      const shopId = process.env.PRINTIFY_SHOP_ID;
      const token = process.env.PRINTIFY_ACCESS_TOKEN;
      
      const shippingDetails = session.shipping_details?.address;
      const customerName = session.shipping_details?.name || session.customer_details?.name || '';
      
      // Extract First and Last Name for Printify
      const nameParts = customerName.split(' ');
      const firstName = nameParts[0] || 'Customer';
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

      if (shippingDetails && session.metadata?.variant_id) {
        
        // Structure the payload exactly how Printify demands it
        const orderData = {
          external_id: session.id, // Links Printify order to Stripe transaction
          label: `Stripe Order ${session.id}`,
          line_items: [
            {
              variant_id: parseInt(session.metadata.variant_id),
              quantity: 1
            }
          ],
          shipping_method: 1, // 1 = Standard Shipping
          send_shipping_notification: true,
          address_to: {
            first_name: firstName,
            last_name: lastName,
            email: session.customer_details?.email || 'hey@coolo.co.nz',
            phone: session.customer_details?.phone || "",
            country: shippingDetails.country,
            region: shippingDetails.state || "",
            address1: shippingDetails.line1,
            address2: shippingDetails.line2 || "",
            city: shippingDetails.city,
            zip: shippingDetails.postal_code
          }
        };

        // Push order to Printify
        const printifyRes = await fetch(`https://api.printify.com/v1/shops/${shopId}/orders.json`, {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(orderData)
        });

        if (!printifyRes.ok) {
           const errText = await printifyRes.text();
           console.error('Printify Order Submission Failed:', errText);
           throw new Error(errText);
        }

        // Optional: Alert the team a sale was processed and sent to factory
        if (process.env.RESEND_API_KEY) {
            await resend.emails.send({
                from: 'COOLO Store <system@coolo.co.nz>',
                to: ['hey@coolo.co.nz'],
                subject: `Order Sent to Printify: ${session.metadata.product_slug}`,
                html: `<p>Payment successful. Order automatically routed to Printify for <strong>${customerName}</strong>.</p>`
            });
        }
      }

    } catch (e) {
      console.error('Error processing Printify order:', e);
      // Stripe expects a 200 response even if our internal stuff fails, 
      // otherwise it will keep retrying the webhook.
    }
  }

  res.status(200).json({ received: true });
}