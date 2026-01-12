import { Resend } from 'resend';
import { ResourceDelivery } from '../components/emails/ResourceDelivery';
import { FREE_RESOURCES } from '../constants';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, resourceId } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // 1. Find the resource details
    const resource = FREE_RESOURCES.find(r => r.id === resourceId) || FREE_RESOURCES[0];
    
    const baseUrl = 'https://coolo.co.nz'; 
    const cleanPath = resource.link.replace(/^\./, ''); 
    const downloadUrl = `${baseUrl}${cleanPath}`;

    // 2. Add/Update Contact in Resend
    // We use the contacts API to ensure they are in your master list
    try {
      await resend.contacts.create({
        email: email,
        unsubscribed: false,
        audienceId: process.env.RESEND_AUDIENCE_ID || '',
      });
    } catch (e) {
      // If contact exists, we continue to send the email anyway
      console.warn("Contact already exists or Audience ID missing.");
    }

    // 3. Send the File to the User
    const emailRequest = resend.emails.send({
      from: 'COOLO <hey@coolo.co.nz>',
      to: [email],
      subject: `Download: ${resource.title}`,
      react: ResourceDelivery({ 
        resourceName: resource.title,
        downloadLink: downloadUrl
      }),
    });

    // 4. Notify Admin (You)
    const adminRequest = resend.emails.send({
      from: 'COOLO Bot <system@coolo.co.nz>',
      to: ['hey@coolo.co.nz'],
      subject: 'New Resource Download',
      html: `
        <div style="font-family: sans-serif;">
          <h1>New Lead</h1>
          <p><strong>${email}</strong> just requested: <strong>${resource.title}</strong></p>
          <hr />
          <p>Contact has been added to your Resend dashboard.</p>
        </div>
      `
    });

    await Promise.all([emailRequest, adminRequest]);

    return res.status(200).json({ message: 'Success' });

  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}