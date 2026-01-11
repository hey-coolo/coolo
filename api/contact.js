// api/contact.js
import { Resend } from 'resend';
import { MissionReceivedEmail } from '../components/emails/MissionReceived';

// Initialize Resend
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
    // --- 1. MAILCHIMP: Add to Audience (Marketing) ---
    const MC_API_KEY = process.env.MAILCHIMP_API_KEY;
    const MC_LIST_ID = process.env.MAILCHIMP_LIST_ID;
    const MC_DATACENTER = MC_API_KEY.split('-')[1];

    const mcData = {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: name,
        COMPANY: business || '',
        ROLE: role || ''
      },
    };

    // We don't await this blocking the whole process, we can fire it off
    const mailchimpRequest = fetch(
      `https://${MC_DATACENTER}.api.mailchimp.com/3.0/lists/${MC_LIST_ID}/members`,
      {
        body: JSON.stringify(mcData),
        headers: {
          Authorization: `apikey ${MC_API_KEY}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }
    );

    // --- 2. RESEND: Send Stylized Auto-Reply (Transactional) ---
    const emailRequest = resend.emails.send({
      from: 'COOLO <hey@coolo.co.nz>', // You must verify this domain in Resend
      to: [email],
      subject: 'Mission Received // COOLO',
      react: MissionReceivedEmail({ name }), // Using the component we just built
    });

    // --- 3. RESEND: Notify YOU (Admin Notification) ---
    // Sends the full form data to you so you can read the brief immediately
    const adminNotificationRequest = resend.emails.send({
      from: 'COOLO Bot <system@coolo.co.nz>',
      to: ['hey@coolo.co.nz'],
      subject: `New Brief: ${name} from ${business}`,
      html: `
        <h1>New Intel Received</h1>
        <p><strong>Agent:</strong> ${name}</p>
        <p><strong>Role:</strong> ${role} @ ${business}</p>
        <hr />
        <h3>The Pain</h3>
        <p>${problem}</p>
        <h3>The Goal</h3>
        <p>${goal}</p>
        <hr />
        <p><em>User added to Mailchimp Database.</em></p>
      `,
    });

    // Wait for all requests to finish
    await Promise.all([mailchimpRequest, emailRequest, adminNotificationRequest]);

    return res.status(200).json({ message: 'Transmission Successful' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal System Error' });
  }
}