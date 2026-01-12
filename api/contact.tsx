import { Resend } from 'resend';
import { MissionReceivedEmail } from '../components/emails/MissionReceived';
import { NewLeadAlert } from '../components/emails/NewLeadAlert';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { name, email, vibe, message } = req.body;
  if (!email || !name) return res.status(400).json({ error: 'Name and email required.' });

  try {
    // 1. Add to crew (Contacts)
    if (process.env.RESEND_AUDIENCE_ID) {
      try {
        await resend.contacts.create({
          email: email,
          firstName: name.split(' ')[0],
          unsubscribed: false,
          audienceId: process.env.RESEND_AUDIENCE_ID,
        });
      } catch (e) { /* skip */ }
    }

    // 2. Personal auto-reply
    const emailRequest = resend.emails.send({
      from: 'COOLO <hey@coolo.co.nz>',
      to: [email],
      subject: 'Talk soon // COOLO',
      react: MissionReceivedEmail({ name }),
    });

    // 3. Admin notification
    const adminRequest = resend.emails.send({
      from: 'COOLO Bot <system@coolo.co.nz>',
      to: ['hey@coolo.co.nz'],
      subject: `New Thread: ${name} (${vibe})`,
      react: NewLeadAlert({ name, email, vibe, message, budget: 'Confirmed via UI' }),
    });

    await Promise.all([emailRequest, adminRequest]);
    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}