import { Resend } from 'resend';
import { MissionReceivedEmail } from '../components/emails/MissionReceived';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // 1. Security check
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, business, role, problem, goal } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: 'Email and Name are required' });
  }

  try {
    // 2. Add to Audience (Optional)
    if (process.env.RESEND_AUDIENCE_ID) {
        try {
            await resend.contacts.create({
                email: email,
                firstName: name.split(' ')[0],
                lastName: name.split(' ').slice(1).join(' '),
                unsubscribed: false,
                audienceId: process.env.RESEND_AUDIENCE_ID
            });
        } catch (e) {
            console.warn("Audience skipped:", e);
        }
    } else {
        // Try adding to default audience if no ID provided
        try {
             await resend.contacts.create({
                email: email,
                firstName: name.split(' ')[0],
                lastName: name.split(' ').slice(1).join(' '),
                unsubscribed: false
            });
        } catch (e) {
            console.warn("Default Audience skipped:", e);
        }
    }

    // 3. Send Stylized Email
    const emailRequest = resend.emails.send({
      from: 'COOLO <hey@coolo.co.nz>',
      to: [email],
      subject: 'Mission Received // COOLO',
      react: MissionReceivedEmail({ name }),
    });

    // 4. Notify You
    const adminRequest = resend.emails.send({
      from: 'COOLO Bot <system@coolo.co.nz>',
      to: ['hey@coolo.co.nz'],
      subject: `New Lead: ${name}`,
      html: `<p>New inquiry from ${name} (${email}).<br/>Business: ${business}<br/>Goal: ${goal}</p>`
    });

    await Promise.all([emailRequest, adminRequest]);

    return res.status(200).json({ message: 'Success' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}