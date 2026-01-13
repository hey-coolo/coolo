// api/contact.tsx
import { Resend } from 'resend';
import { MissionReceivedEmail } from '../components/emails/MissionReceived';
import { NewLeadAlert } from '../components/emails/NewLeadAlert';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { name, email, vibe, budget, message } = req.body;
  if (!email || !name) return res.status(400).json({ error: 'Name and email are required.' });

  try {
    // 1. Add to Crew (Contacts)
    if (process.env.RESEND_AUDIENCE_ID) {
      try {
        await resend.contacts.create({
          email: email,
          firstName: name.split(' ')[0],
          unsubscribed: false,
          audienceId: process.env.RESEND_AUDIENCE_ID,
        });
      } catch (e) { /* silent if exists */ }
    }

    // 2. Personal auto-reply to user (CONFIRMATION)
    const emailRequest = resend.emails.send({
      // CHANGE: Must use the verified 'send' subdomain
      from: 'COOLO <hey@send.coolo.co.nz>', 
      to: [email],
      // ADD: So when they reply, it goes to your real inbox
      reply_to: 'hey@coolo.co.nz', 
      subject: 'Talk soon // COOLO',
      react: MissionReceivedEmail({ name }),
    });

    // 3. Stylized brief receipt to hey@coolo.co.nz (INTERNAL ALERT)
    const adminRequest = resend.emails.send({
      // CHANGE: Must use the verified 'send' subdomain
      from: 'COOLO Bot <system@send.coolo.co.nz>', 
      to: ['hey@coolo.co.nz'],
      // ADD: So you can hit 'Reply' and it goes to the client
      reply_to: email, 
      subject: `New Lead Brief: ${name} (${vibe})`,
      react: NewLeadAlert({ name, email, vibe, budget, message }),
    });

    await Promise.all([emailRequest, adminRequest]);
    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}