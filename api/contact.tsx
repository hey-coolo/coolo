import { Resend } from 'resend';
import { MissionReceivedEmail } from './components/emails/MissionReceived.tsx';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Destructure the NEW fields
  const { name, email, vibe, budget, message } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: 'Email and Name are required' });
  }

  try {
    // 1. Add to Audience (Optional)
    if (process.env.RESEND_AUDIENCE_ID) {
      const { error: contactError } = await resend.contacts.create({
        email: email,
        firstName: name.split(' ')[0],
        lastName: name.split(' ').slice(1).join(' '),
        unsubscribed: false,
        audienceId: process.env.RESEND_AUDIENCE_ID,
      });
      if (contactError) console.warn("Audience creation warning:", contactError);
    }

    // 2. Send "Mission Received" Confirmation to User
    const { error: emailError } = await resend.emails.send({
      from: 'COOLO <hey@coolo.co.nz>',
      to: [email],
      subject: 'We got your message // COOLO',
      react: MissionReceivedEmail({ name }),
    });

    if (emailError) {
      console.error("Email sending failed:", emailError);
      return res.status(500).json({ error: emailError.message });
    }

    // 3. Notify Admin (You)
    await resend.emails.send({
      from: 'COOLO Bot <system@coolo.co.nz>',
      to: ['hey@coolo.co.nz'],
      subject: `New Lead: ${name} (${vibe})`,
      html: `
        <h2>New Inquiry from Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mission:</strong> ${vibe}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <br/>
        <p><strong>Message:</strong><br/>${message}</p>
      `
    });

    return res.status(200).json({ message: 'Success' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}