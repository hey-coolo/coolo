import Stripe from 'stripe';
import { Resend } from 'resend';

// Vercel Serverless config: Disable body parsing so Stripe can verify the raw signature
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to read the raw body natively (removes the need for the 'micro' dependency)
async function getRawBody(req: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const buf = await getRawBody(req);
    
    // Identify who is sending the webhook based on headers
    const stripeSignature = req.headers['stripe-signature'] as string;
    const printifySignature = req.headers['x-printify-signature'] as string;

    const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

    // ==========================================
    // 1. STRIPE WEBHOOK HANDLER
    // ==========================================
    if (stripeSignature) {
      const stripeKey = process.env.STRIPE_SECRET_KEY;
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
      
      if (!stripeKey || !webhookSecret) {
        console.error("Missing Stripe environment variables");
        return res.status(500).json({ error: "Server configuration error" });
      }

      const stripe = new Stripe(stripeKey, { apiVersion: '2024-06-20' });
      let event;

      try {
        event = stripe.webhooks.constructEvent(buf, stripeSignature, webhookSecret);
      } catch (err: any) {
        console.error('Webhook signature verification failed.', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }

      // Handle successful payment
      if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        
        const shopId = process.env.PRINTIFY_SHOP_ID;
        const token = process.env.PRINTIFY_ACCESS_TOKEN;
        
        if (!shopId || !token) {
            console.error("Missing Printify credentials");
            return res.status(500).json({ error: "Fulfillment configuration error" });
        }

        const shippingDetails = session.shipping_details?.address;
        const customerName = session.shipping_details?.name || session.customer_details?.name || '';
        
        // Extract First and Last Name for Printify
        const nameParts = customerName.split(' ');
        const firstName = nameParts[0] || 'Customer';
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

        if (shippingDetails && session.metadata?.variant_id) {
          
          const orderData = {
            external_id: session.id, 
            label: `Stripe Order ${session.id}`,
            line_items: [
              {
                variant_id: parseInt(session.metadata.variant_id),
                quantity: 1
              }
            ],
            shipping_method: 1, 
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

          // Optional Team Alert
          if (resend) {
              try {
                  await resend.emails.send({
                      from: 'COOLO Store <system@coolo.co.nz>',
                      to: ['hey@coolo.co.nz'],
                      subject: `Order Sent to Printify: ${session.metadata.product_slug}`,
                      html: `<p>Payment successful. Order automatically routed to Printify for <strong>${customerName}</strong>.</p>`
                  });
              } catch (emailErr) {
                  console.error("Email notification failed, but order was sent.", emailErr);
              }
          }
        }
      }

      return res.status(200).json({ received: true });
    }

    // ==========================================
    // 2. PRINTIFY WEBHOOK HANDLER
    // ==========================================
    else if (printifySignature) {
      const printifyWebhookSecret = process.env.PRINTIFY_WEBHOOK_SECRET;

      if (!printifyWebhookSecret) {
        console.error("Missing Printify Webhook Secret");
        return res.status(500).json({ error: "Server configuration error" });
      }

      // Verify Printify Signature using Node's crypto library (HMAC-SHA256)
      const expectedSignature = crypto
        .createHmac('sha256', printifyWebhookSecret)
        .update(buf)
        .digest('hex');
      
      const formattedExpectedSig = `sha256=${expectedSignature}`;

      if (printifySignature !== expectedSignature && printifySignature !== formattedExpectedSig) {
        console.error('Printify webhook signature verification failed.');
        return res.status(400).send('Webhook Error: Invalid Printify Signature');
      }

      const printifyEvent = JSON.parse(buf.toString('utf8'));

      // Handle Printify events (e.g., when the order gets shipped)
      if (printifyEvent.type === 'order:shipment:generated') {
        console.log(`Printify order shipped: ${printifyEvent.data.order_id}`);
        
        if (resend) {
          try {
             // You can easily adjust the "to" field here to email the actual customer by
             // using order metadata if saved, or just send a team alert for now.
             await resend.emails.send({
                from: 'COOLO Store <system@coolo.co.nz>',
                to: ['hey@coolo.co.nz'], 
                subject: `Printify Order Shipped!`,
                html: `<p>Good news! An order has shipped. Tracking URL: <a href="${printifyEvent.data.tracking_url}">Track Here</a></p>`
             });
          } catch (emailErr) {
             console.error("Failed to send tracking alert.", emailErr);
          }
        }
      }

      return res.status(200).json({ received: true });
    }

    // ==========================================
    // 3. UNKNOWN WEBHOOK
    // ==========================================
    else {
      console.error("Unrecognized webhook source");
      return res.status(400).json({ error: "Unrecognized webhook source" });
    }

  } catch (error: any) {
    console.error("Webhook processing error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}