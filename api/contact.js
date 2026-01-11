// api/contact.js
import { Resend } from 'resend';
import { MissionReceivedEmail } from '../components/emails/MissionReceived';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, business, role, problem, goal } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: 'Email and Name are required' });
  }

  try {
    // --- 1. RESEND: Add to "Web Leads" Audience (Database) ---
    // This replaces Mailchimp. The user is now stored in Resend Contacts.
    // Note: You can create an Audience in Resend Dashboard and get the ID.
    // If you don't have an ID yet, you can remove the 'audienceId' line, 
    // and it will add to your default 'General' audience.
    const contactRequest = resend.contacts.create({
      email: email,
      firstName: name.split(' ')[0],
      lastName: name.split(' ').slice(1).join(' '),
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID, 
      properties: {
        business_name: business || '',
        job_role: role || '',
        pain_point: problem?.substring(0, 250) || '', // Limit char length for properties
      }
    });

    // --- 2. RESEND: Send Stylized Auto-Reply (Transactional) ---
    const emailRequest = resend.emails.send({
      from: 'COOLO <hey@coolo.co.nz>', 
      to: [email],
      subject: 'Mission Received // COOLO',
      react: MissionReceivedEmail({ name }),
    });

    // --- 3. RESEND: Notify YOU (Admin Notification) ---
    const adminNotificationRequest = resend.emails.send({
      from: 'COOLO Bot <system@coolo.co.nz>',
      to: ['hey@coolo.co.nz'],
      subject: `New Brief: ${name} from ${business}`,
      html: `
        <h1>New Intel Received</h1>
        <p><strong>Agent:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Role:</strong> ${role} @ ${business}</p>
        <hr />
        <h3>The Pain</h3>
        <p>${problem}</p>
        <h3>The Goal</h3>
        <p>${goal}</p>
        <hr />
        <p><em>Contact securely stored in Resend Audience.</em></p>
      `,
    });

    // Execute all in parallel for speed
    await Promise.all([contactRequest, emailRequest, adminNotificationRequest]);

    return res.status(200).json({ message: 'Transmission Successful' });

  } catch (error) {
    console.error('Resend Error:', error);
    return res.status(500).json({ error: 'Internal System Error' });
  }
}