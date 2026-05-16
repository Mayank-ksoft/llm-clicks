import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

const MAX_NAME_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 2000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(value: string): string {
  return value.replace(/[<>"'&]/g, "");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.EMAIL || !process.env.PASS) {
    console.error("EMAIL and/or PASS environment variables are not configured");
    return res.status(500).json({ error: "Server configuration error. Please try again later." });
  }

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
      <!-- Header -->
      <div style="background: linear-gradient(135deg, ${brandNavy} 0%, #242b3d 100%); padding: 32px 40px; border-radius: 12px 12px 0 0;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: ${brandTeal}; letter-spacing: -0.5px;">
          LLM Clicks
        </h1>
        <p style="margin: 6px 0 0; font-size: 13px; color: #8b95a5;">New Contact Form Submission</p>
      </div>

      <!-- Body -->
      <div style="background: #ffffff; padding: 36px 40px; border-left: 1px solid #e8eaed; border-right: 1px solid #e8eaed;">
        <p style="margin: 0 0 24px; font-size: 15px; color: ${brandNavy}; line-height: 1.5;">
          You've received a new message from the contact form:
        </p>

        <!-- Sender info -->
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

        <!-- Message -->
        <div style="margin-bottom: 24px;">
          <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #9ca3af; margin: 0 0 10px; font-weight: 600;">Message</p>
          <div style="background: #fafbfc; border: 1px solid #e8eaed; border-radius: 8px; padding: 20px; font-size: 14px; color: #374151; line-height: 1.7; white-space: pre-wrap;">${sMessage}</div>
        </div>

        <!-- Reply CTA -->
        <div style="text-align: center; margin-top: 28px;">
          <a href="mailto:${sEmail}" style="display: inline-block; background: ${brandTeal}; color: #ffffff; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600; letter-spacing: 0.3px;">
            Reply to ${fName}
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: ${brandNavy}; padding: 20px 40px; border-radius: 0 0 12px 12px; text-align: center;">
        <p style="margin: 0; font-size: 12px; color: #6b7280;">
          &copy; ${new Date().getFullYear()} LLM Clicks &middot; AI-Powered SEO Platform
        </p>
      </div>
    </div>
  `;

  // Auto-reply receipt sent to the user who submitted the form
  const receiptHtml = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f4f6f9;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, ${brandNavy} 0%, #242b3d 100%); padding: 32px 40px; border-radius: 12px 12px 0 0;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: ${brandTeal}; letter-spacing: -0.5px;">
          LLMClicks.ai
        </h1>
        <p style="margin: 6px 0 0; font-size: 13px; color: #8b95a5;">We received your message</p>
      </div>

      <!-- Body -->
      <div style="background: #ffffff; padding: 36px 40px; border-left: 1px solid #e8eaed; border-right: 1px solid #e8eaed;">
        <h2 style="margin: 0 0 16px; font-size: 20px; font-weight: 700; color: ${brandNavy};">Hi ${fName},</h2>
        <p style="margin: 0 0 18px; font-size: 15px; color: ${brandNavy}; line-height: 1.6;">
          Thank you for reaching out to <strong>LLMClicks.ai</strong>. We have received your inquiry, and our support team will review it and get back to you shortly — typically within 1 business day.
        </p>
        <p style="margin: 0 0 24px; font-size: 14px; color: #4b5563; line-height: 1.6;">
          For your records, here's a copy of the message you submitted:
        </p>

        <!-- Submitted message recap -->
        <div style="background: #f8fafb; border-left: 4px solid ${brandTeal}; padding: 16px 20px; border-radius: 0 8px 8px 0; margin-bottom: 28px;">
          <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #9ca3af; margin: 0 0 8px; font-weight: 600;">Your message</p>
          <div style="font-size: 14px; color: #374151; line-height: 1.7; white-space: pre-wrap;">${sMessage}</div>
        </div>

        <p style="margin: 0 0 6px; font-size: 14px; color: ${brandNavy};">Regards,</p>
        <p style="margin: 0; font-size: 14px; font-weight: 600; color: ${brandNavy};">The LLMClicks.ai Team</p>
      </div>

      <!-- Footer -->
      <div style="background: ${brandNavy}; padding: 20px 40px; border-radius: 0 0 12px 12px; text-align: center;">
        <p style="margin: 0 0 4px; font-size: 12px; color: #8b95a5;">
          <a href="https://llmclicks.ai" style="color: ${brandTeal}; text-decoration: none;">llmclicks.ai</a> &middot; AI Visibility Platform
        </p>
        <p style="margin: 0; font-size: 11px; color: #6b7280;">
          This is an automated confirmation. Please do not reply to this email.
        </p>
      </div>
    </div>
  `;

  const receiptText = `Hi ${fName},

Thank you for reaching out to LLMClicks.ai. We have received your inquiry, and our support team will review it and get back to you shortly.

Your message:
${sMessage}

Regards,
The LLMClicks.ai Team
https://llmclicks.ai`;

  try {
    // 1. Internal notification to the LLMClicks team
    await transporter.sendMail({
      from: `"LLMClicks.ai" <${process.env.EMAIL}>`,
      to: process.env.EMAIL,
      replyTo: sEmail,
      subject: `Contact Form: ${fName} ${lName}`,
      html: htmlBody,
    });

    // 2. Auto-reply receipt to the user (best-effort — don't fail the request if this fails)
    try {
      await transporter.sendMail({
        from: `"LLMClicks.ai" <${process.env.EMAIL}>`,
        to: sEmail,
        subject: "We received your message | LLMClicks.ai",
        text: receiptText,
        html: receiptHtml,
      });
    } catch (receiptErr) {
      console.error("Auto-reply receipt failed:", receiptErr);
    }

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error("Email send error:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
