// api/contact.tsx
import { Resend } from 'resend';
import { MissionReceivedEmail } from '../components/emails/MissionReceived';
import { NewLeadAlert } from '../components/emails/NewLeadAlert';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  // Destructure the new payload from the updated ContactPage
  const { firstName, lastName, email, company, situation, needs, budget, message } = req.body;
  
  if (!email || !firstName) return res.status(400).json({ error: 'Name and email are required.' });

  const fullName = `${firstName} ${lastName}`.trim();

  try {
    // 1. Add to Crew (Contacts)
    if (process.env.RESEND_AUDIENCE_ID) {
      try {
        await resend.contacts.create({
          email: email,
          firstName: firstName,
          lastName: lastName,
          unsubscribed: false,
          audienceId: process.env.RESEND_AUDIENCE_ID,
        });
      } catch (e) { /* silent if exists */ }
    }

    // 2. Personal auto-reply to user (CONFIRMATION)
    const emailRequest = resend.emails.send({
      from: 'COOLO <hey@coolo.co.nz>', 
      to: [email],
      reply_to: 'hey@coolo.co.nz', 
      subject: 'Talk soon // COOLO',
      react: MissionReceivedEmail({ name: firstName }),
    });

    // 3. Stylized brief receipt to hey@coolo.co.nz (INTERNAL ALERT)
    const adminRequest = resend.emails.send({
      from: 'COOLO Bot <system@coolo.co.nz>', 
      to: ['hey@coolo.co.nz'],
      reply_to: email, 
      subject: `New Brief: ${fullName} / ${company || 'Independent'}`,
      react: NewLeadAlert({ 
        name: fullName, 
        email, 
        company, 
        situation, 
        needs, 
        budget, 
        message 
      }),
    });

    await Promise.all([emailRequest, adminRequest]);
    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}