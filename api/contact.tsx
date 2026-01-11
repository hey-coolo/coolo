import { Resend } from 'resend';
import { MissionReceivedEmail } from './components/emails/MissionReceived.tsx';

// Securely load the API key
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // 1. Security Check
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, business, role, problem, goal } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: 'Email and Name are required' });
  }

  try {
    // 2. Add to Audience (Updated based on your Docs)
     if (process.env.RESEND_AUDIENCE_ID) {
      const { error: contactError } = await resend.contacts.create({
        email: email,
        firstName: name.split(' ')[0],
        lastName: name.split(' ').slice(1).join(' '),
        unsubscribed: false,
        audienceId: process.env.RESEND_AUDIENCE_ID,
      });

      if (contactError) {
        console.warn("Audience creation warning:", contactError);
      }
    }

    // 3. Send Stylized Email
    const { error: emailError } = await resend.emails.send({
      from: 'COOLO <hey@coolo.co.nz>',
      to: [email],
      subject: 'Mission Received // COOLO',
      react: MissionReceivedEmail({ name }),
    });

    if (emailError) {
      console.error("Email sending failed:", emailError);
      return res.status(500).json({ error: emailError.message });
    }

    // 4. Notify You (Admin Email)
    await resend.emails.send({
      from: 'COOLO Bot <system@coolo.co.nz>',
      to: ['hey@coolo.co.nz'],
      subject: `New Lead: ${name}`,
      html: `<p>New inquiry from ${name} (${email}).<br/>Business: ${business}<br/>Goal: ${goal}</p>`
    });

    return res.status(200).json({ message: 'Success' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}