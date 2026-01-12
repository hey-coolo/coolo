import { Resend } from 'resend';
import { MissionReceivedEmail } from '../components/emails/MissionReceived';
import { NewLeadAlert } from '../components/emails/NewLeadAlert';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, vibe, budget, message } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: 'Name and Email are required' });
  }

  try {
    // 1. Create/Update Contact in Resend
    try {
      await resend.contacts.create({
        email: email,
        firstName: name.split(' ')[0],
        lastName: name.split(' ').slice(1).join(' '),
        unsubscribed: false,
        audienceId: process.env.RESEND_AUDIENCE_ID || '',
      });
    } catch (e) {
      console.warn("Contact registration skipped (likely already exists).");
    }

    // 2. Send Automated Emails
    await Promise.all([
      // To User: The "Mission Received" Brief
      resend.emails.send({
        from: 'COOLO <hey@coolo.co.nz>',
        to: [email],
        subject: 'Message Received // COOLO',
        react: MissionReceivedEmail({ name }),
      }),
      // To Admin: Detailed Lead Brief
      resend.emails.send({
        from: 'COOLO Bot <system@coolo.co.nz>',
        to: ['hey@coolo.co.nz'],
        subject: `New Lead: ${name} (${vibe})`,
        react: NewLeadAlert({ name, email, vibe, budget, message }),
      })
    ]);

    return res.status(200).json({ message: 'Brief processed successfully' });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}