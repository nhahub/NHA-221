import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (req, res) => {
  const { subject, email, message } = req.body;

  try {
    await resend.emails.send({
      from: "Your Website <onboarding@resend.dev>",
      to: process.env.EMAIL,
      replyTo: email,
      subject,
      html: `
        <p><strong>From:</strong> ${email}</p>
        <p>${message}</p>
      `,
    });

    return res.status(200).json({ success: true, message: "Email sent" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
