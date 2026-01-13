import { Resend } from 'resend';
import { ResourceDelivery } from '../components/emails/ResourceDelivery';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { email, resourceTitle, downloadLink } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required.' });

  try {
    const absoluteUrl = `https://coolo.co.nz${downloadLink.replace(/^\./, '')}`;

    if (process.env.RESEND_AUDIENCE_ID) {
      try {
        await resend.contacts.create({
          email,
          unsubscribed: false,
          audienceId: process.env.RESEND_AUDIENCE_ID,
        });
      } catch (e) { /* skip */ }
    }

  const emailRequest = resend.emails.send({
    from: 'COOLO <hey@coolo.co.nz>',
    to: [email],
    reply_to: 'hey@coolo.co.nz',
    subject: `Your tool is ready: ${resourceTitle}`,
    react: ResourceDelivery({ resourceName: resourceTitle, downloadLink: absoluteUrl }),
  });

  const adminRequest = resend.emails.send({
    from: 'COOLO Site <system@coolo.co.nz>',
    to: ['hey@coolo.co.nz'],
    subject: 'New Tool Downloaded',
    html: `<p><strong>${email}</strong> just grabbed the <strong>${resourceTitle}</strong>.</p>`
});

    await Promise.all([emailRequest, adminRequest]);
    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}