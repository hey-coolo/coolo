import Stripe from 'stripe';
import { Resend } from 'resend';
import crypto from 'node:crypto';

export const config = {
  api: {
    bodyParser: false,
  },
};

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
    const stripeSignature = req.headers['stripe-signature'] as string;
    const printfulSignature = req.headers['x-printful-signature'] as string;
    const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

    if (stripeSignature) {
      const stripeKey = process.env.STRIPE_SECRET_KEY;
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
      
      if (!stripeKey || !webhookSecret) return res.status(500).json({ error: "Server config error" });

      const stripe = new Stripe(stripeKey, { apiVersion: '2024-06-20' });
      let event;

      try {
        event = stripe.webhooks.constructEvent(buf, stripeSignature, webhookSecret);
      } catch (err: any) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }

      // Changed from checkout.session to payment_intent
      if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const storeId = process.env.PRINTFUL_STORE_ID;
        const token = process.env.PRINTFUL_ACCESS_TOKEN;
        
        if (!token) return res.status(500).json({ error: "Fulfillment configuration error" });

        const shippingDetails = paymentIntent.shipping;
        const customerName = shippingDetails?.name || 'Customer';

        if (shippingDetails && paymentIntent.metadata?.variant_id) {
          
          const orderData = {
            external_id: paymentIntent.id, 
            recipient: {
              name: customerName,
              address1: shippingDetails.address?.line1,
              address2: shippingDetails.address?.line2 || "",
              city: shippingDetails.address?.city,
              state_code: shippingDetails.address?.state || "",
              country_code: shippingDetails.address?.country,
              zip: shippingDetails.address?.postal_code,
              email: 'hey@coolo.co.nz', // Fallback, Stripe Elements doesn't enforce email on shipping object
              phone: shippingDetails.phone || ""
            },
            items: [
              {
                sync_variant_id: parseInt(paymentIntent.metadata.variant_id),
                quantity: 1
              }
            ]
          };

          const headers: any = {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          };
          if (storeId) headers['X-PF-Store-Id'] = storeId;

          const printfulRes = await fetch(`https://api.printful.com/v2/orders`, {
            method: 'POST',
            headers,
            body: JSON.stringify(orderData)
          });

          if (!printfulRes.ok) console.error('Printful Order Submission Failed:', await printfulRes.text());

          if (resend) {
              try {
                  await resend.emails.send({
                      from: 'COOLO Store <system@coolo.co.nz>',
                      to: ['hey@coolo.co.nz'],
                      subject: `Order Sent to Printful: ${paymentIntent.metadata.product_slug}`,
                      html: `<p>Payment successful. Order routed to Printful for <strong>${customerName}</strong>.</p>`
                  });
              } catch (e) {}
          }
        }
      }
      return res.status(200).json({ received: true });
    }

    else if (printfulSignature) {
      const secret = process.env.PRINTFUL_WEBHOOK_SECRET;
      if (!secret) return res.status(500).json({ error: "Webhook secret error" });

      const expectedSignature = crypto.createHmac('sha256', secret).update(buf).digest('hex');
      if (printfulSignature !== expectedSignature && printfulSignature !== `sha256=${expectedSignature}`) {
        return res.status(400).send('Invalid Printful Signature');
      }

      const payload = JSON.parse(buf.toString('utf8'));

      if (payload.type === 'package_shipped') {
        if (resend) {
          try {
             await resend.emails.send({
                from: 'COOLO Store <system@coolo.co.nz>',
                to: ['hey@coolo.co.nz'], 
                subject: `Printful Order Shipped!`,
                html: `<p>An order has shipped. Check Printful dashboard for tracking.</p>`
             });
          } catch (e) {}
        }
      }
      return res.status(200).json({ received: true });
    }

    return res.status(400).json({ error: "Unrecognized webhook source" });
  } catch (error: any) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}