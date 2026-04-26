"use server";

import nodemailer from "nodemailer";
import { AdminEmailTemplate } from "@/components/email-templates/AdminContactEmail";
import { CustomerEmailTemplate } from "@/components/email-templates/CustomerAutoReply";

export async function sendContactEmail(formData: {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}) {
  const { name, email, projectType, budget, message } = formData;

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const { renderToStaticMarkup } = await import("react-dom/server");

    // 1. Send Email to Admin
    const adminEmailHtml = renderToStaticMarkup(
      AdminEmailTemplate({ name, email, projectType, budget, message })
    );

    await transporter.sendMail({
      from: `"Quantum Blaze" <${process.env.EMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
      cc: [
        "vihangaheshan37@gmail.com",
        "supunsulakshana2001@gmail.com",
        "ravishkaindrajith9.9@gmail.com",
      ],
      subject: `New Project Inquiry from ${name}`,
      html: adminEmailHtml,
    });

    // 2. Send Auto-reply to Customer
    const customerEmailHtml = renderToStaticMarkup(
      CustomerEmailTemplate({ name })
    );

    await transporter.sendMail({
      from: `"Quantum Blaze" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `We've received your message! - Quantum Blaze`,
      html: customerEmailHtml,
    });

    return { success: true };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, error: "Failed to send email. Please try again." };
  }
}
