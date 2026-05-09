"use server";

import nodemailer from "nodemailer";
import { AdminInviteEmailTemplate } from "@/components/email-templates/AdminInviteEmail";

export async function sendAdminInviteEmail(data: {
  name: string;
  email: string;
  baseUrl: string;
}) {
  const { name, email, baseUrl } = data;
  const loginUrl = `${baseUrl}/admin/login`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const { renderToStaticMarkup } = await import("react-dom/server");
    const fromEmail = process.env.EMAIL_FROM || process.env.EMAIL_USER;

    const emailHtml = renderToStaticMarkup(
      AdminInviteEmailTemplate({ name, email, loginUrl })
    );

    await transporter.sendMail({
      from: `"Quantum Blaze" <${fromEmail}>`,
      to: email,
      subject: `Account Activated: Welcome to the Quantum Blaze Admin Team`,
      html: emailHtml,
    });

    console.log(`Invite email sent successfully to ${email}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to send admin invite email:", error);
    return { success: false, error: "Failed to send invitation email." };
  }
}
