import { Resend } from 'resend';
import { ApplicationReceived } from '../components/emails/ApplicationReceived';
import { NewTalentAlert } from '../components/emails/NewTalentAlert';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { name, email, role, rate, portfolio } = req.body;
  if (!email || !name || !portfolio) return res.status(400).json({ error: 'Missing required fields.' });

  try {
    // 1. Add to Crew (Contacts) - Tagging logic would happen in your CRM/Resend Audience
    if (process.env.RESEND_AUDIENCE_ID) {
      try {
        await resend.contacts.create({
          email: email,
          firstName: name.split(' ')[0],
          unsubscribed: false,
          audienceId: process.env.RESEND_AUDIENCE_ID,
        });
      } catch (e) { /* silent fail if contact exists */ }
    }

    // 2. Send Confirmation to Applicant
  const emailRequest = resend.emails.send({
    from: 'COOLO Careers <hey@coolo.co.nz>',
    to: [email],
    reply_to: 'hey@coolo.co.nz',
    subject: 'Application Received // COOLO',
    react: ApplicationReceived({ name }),
    });

  const adminRequest = resend.emails.send({
    from: 'COOLO Bot <system@coolo.co.nz>',
    to: ['hey@coolo.co.nz'],
    reply_to: email,
    subject: `New Talent: ${name} (${role})`,
    react: NewTalentAlert({ name, email, role, rate, portfolio }),
  });

    await Promise.all([emailRequest, adminRequest]);
    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Join API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}