import Stripe from 'stripe';
import { Resend } from 'resend';
import crypto from 'node:crypto';

// Vercel Serverless config: Disable body parsing so Stripe can verify the raw signature
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to read the raw body natively
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
    const printfulSignature = req.headers['x-printful-signature'] as string;

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
        
        const storeId = process.env.PRINTFUL_STORE_ID;
        const token = process.env.PRINTFUL_ACCESS_TOKEN;
        
        if (!token) {
            console.error("Missing Printful credentials");
            return res.status(500).json({ error: "Fulfillment configuration error" });
        }

        const shippingDetails = session.shipping_details?.address;
        const customerName = session.shipping_details?.name || session.customer_details?.name || '';

        if (shippingDetails && session.metadata?.variant_id) {
          
          // Printful API v1 Order Payload
          const orderData = {
            external_id: session.id, 
            recipient: {
              name: customerName,
              address1: shippingDetails.line1,
              address2: shippingDetails.line2 || "",
              city: shippingDetails.city,
              state_code: shippingDetails.state || "",
              country_code: shippingDetails.country,
              zip: shippingDetails.postal_code,
              email: session.customer_details?.email || 'hey@coolo.co.nz',
              phone: session.customer_details?.phone || ""
            },
            items: [
              {
                sync_variant_id: parseInt(session.metadata.variant_id),
                quantity: 1
              }
            ]
          };

          const headers: any = {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          };
          if (storeId) headers['X-PF-Store-Id'] = storeId;

          const printfulRes = await fetch(`https://api.printful.com/orders`, {
            method: 'POST',
            headers,
            body: JSON.stringify(orderData)
          });

          if (!printfulRes.ok) {
             const errText = await printfulRes.text();
             console.error('Printful Order Submission Failed:', errText);
             throw new Error(errText);
          }

          // Optional Team Alert
          if (resend) {
              try {
                  await resend.emails.send({
                      from: 'COOLO Store <system@coolo.co.nz>',
                      to: ['hey@coolo.co.nz'],
                      subject: `Order Sent to Printful: ${session.metadata.product_slug}`,
                      html: `<p>Payment successful. Order automatically routed to Printful for <strong>${customerName}</strong>.</p>`
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
    // 2. PRINTFUL WEBHOOK HANDLER
    // ==========================================
    else if (printfulSignature) {
      const printfulWebhookSecret = process.env.PRINTFUL_WEBHOOK_SECRET;

      if (!printfulWebhookSecret) {
        console.error("Missing Printful Webhook Secret");
        return res.status(500).json({ error: "Server configuration error" });
      }

      // Verify Printful Signature using Node's crypto library (HMAC-SHA256)
      const expectedSignature = crypto
        .createHmac('sha256', printfulWebhookSecret)
        .update(buf)
        .digest('hex');
      
      const formattedExpectedSig = `sha256=${expectedSignature}`;

      if (printfulSignature !== expectedSignature && printfulSignature !== formattedExpectedSig) {
        console.error('Printful webhook signature verification failed.');
        return res.status(400).send('Webhook Error: Invalid Printful Signature');
      }

      const printfulEvent = JSON.parse(buf.toString('utf8'));

      // Handle Printful events (e.g., when the order gets shipped)
      if (printfulEvent.type === 'package_shipped') {
        if (resend) {
          try {
             await resend.emails.send({
                from: 'COOLO Store <system@coolo.co.nz>',
                to: ['hey@coolo.co.nz'], 
                subject: `Printful Order Shipped!`,
                html: `<p>Good news! An order has shipped. Check your dashboard for tracking details.</p>`
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