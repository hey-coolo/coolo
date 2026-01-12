import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  try {
    // This command asks Resend to list all your audiences
    const response = await resend.audiences.list();
    
    // This will print the ID to your VS Code Terminal
    console.log("👇👇👇 YOUR AUDIENCE ID IS BELOW 👇👇👇");
    console.log(JSON.stringify(response, null, 2));

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}