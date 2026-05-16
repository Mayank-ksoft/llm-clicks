import "dotenv/config";
import express from "express";
import nodemailer from "nodemailer";

if (!process.env.EMAIL || !process.env.PASS) {
  console.warn("WARNING: EMAIL and/or PASS environment variables are not set. Contact form emails will fail.");
}

const app = express();
app.use(express.json());

const MAX_NAME_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 2000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(value: string): string {
  return value.replace(/[<>"'&]/g, "");
}

app.post("/api/send-contact-email", async (req, res) => {
  const { firstName, lastName, email, message } = req.body || {};

  const errors: string[] = [];
  const fName = sanitize(String(firstName || "").trim());
  const lName = sanitize(String(lastName || "").trim());
  const sEmail = String(email || "").trim();
  const sMessage = sanitize(String(message || "").trim());

  if (!fName || fName.length > MAX_NAME_LENGTH) errors.push("Invalid first name");
  if (!lName || lName.length > MAX_NAME_LENGTH) errors.push("Invalid last name");
  if (!sEmail || !EMAIL_REGEX.test(sEmail)) errors.push("Invalid email");
  if (!sMessage || sMessage.length > MAX_MESSAGE_LENGTH) errors.push("Invalid message");

  if (errors.length > 0) return res.status(400).json({ error: errors.join(", ") });

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  const brandTeal = "#1db88e";
  const brandNavy = "#1a1f2e";

  const htmlBody = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f4f6f9;">
      <div style="background: linear-gradient(135deg, ${brandNavy} 0%, #242b3d 100%); padding: 32px 40px; border-radius: 12px 12px 0 0;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: ${brandTeal}; letter-spacing: -0.5px;">
          LLM Clicks
        </h1>
        <p style="margin: 6px 0 0; font-size: 13px; color: #8b95a5;">New Contact Form Submission</p>
      </div>
      <div style="background: #ffffff; padding: 36px 40px; border-left: 1px solid #e8eaed; border-right: 1px solid #e8eaed;">
        <p style="margin: 0 0 24px; font-size: 15px; color: ${brandNavy}; line-height: 1.5;">
          You've received a new message from the contact form:
        </p>
        <div style="background: #f8fafb; border-left: 4px solid ${brandTeal}; padding: 16px 20px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 6px 0; font-size: 13px; color: #6b7280; width: 80px; vertical-align: top;">Name</td>
              <td style="padding: 6px 0; font-size: 14px; color: ${brandNavy}; font-weight: 600;">${fName} ${lName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-size: 13px; color: #6b7280; vertical-align: top;">Email</td>
              <td style="padding: 6px 0; font-size: 14px;">
                <a href="mailto:${sEmail}" style="color: ${brandTeal}; text-decoration: none;">${sEmail}</a>
              </td>
            </tr>
          </table>
        </div>
        <div style="margin-bottom: 24px;">
          <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #9ca3af; margin: 0 0 10px; font-weight: 600;">Message</p>
          <div style="background: #fafbfc; border: 1px solid #e8eaed; border-radius: 8px; padding: 20px; font-size: 14px; color: #374151; line-height: 1.7; white-space: pre-wrap;">${sMessage}</div>
        </div>
        <div style="text-align: center; margin-top: 28px;">
          <a href="mailto:${sEmail}" style="display: inline-block; background: ${brandTeal}; color: #ffffff; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600; letter-spacing: 0.3px;">
            Reply to ${fName}
          </a>
        </div>
      </div>
      <div style="background: ${brandNavy}; padding: 20px 40px; border-radius: 0 0 12px 12px; text-align: center;">
        <p style="margin: 0; font-size: 12px; color: #6b7280;">
          &copy; ${new Date().getFullYear()} LLM Clicks &middot; AI-Powered SEO Platform
        </p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      replyTo: sEmail,
      subject: `Contact Form: ${fName} ${lName}`,
      html: htmlBody,
    });

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error("Email send error:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
});

const port = 3001;
app.listen(port, "0.0.0.0", () => {
  console.log(`API server running on port ${port}`);
});
