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
  console.log("Contact Action: Started for", name);

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
    const fromEmail = process.env.EMAIL_FROM || process.env.EMAIL_USER;

    // 1. Send Email to Admin
    console.log("Contact Action: Sending admin email...");
    const adminEmailHtml = renderToStaticMarkup(
      AdminEmailTemplate({ name, email, projectType, budget, message })
    );

    await transporter.sendMail({
      from: `"Quantum Blaze" <${fromEmail}>`,
      to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
      cc: [
        "vihanga@quantumblaze.lk",
        "supun@quantumblaze.lk",
        "ravishka@quantumblaze.lk",
      ],
      subject: `New Project Inquiry from ${name}`,
      html: adminEmailHtml,
    });

    // 2. Send Auto-reply to Customer
    console.log("Contact Action: Sending customer auto-reply...");
    const customerEmailHtml = renderToStaticMarkup(
      CustomerEmailTemplate({ name })
    );

    await transporter.sendMail({
      from: `"Quantum Blaze" <${fromEmail}>`,
      to: email,
      subject: `We've received your message! - Quantum Blaze`,
      html: customerEmailHtml,
    });

    // 3. Save to Google Sheet (CRM)
    const excelUrl = process.env.EXCEL_URL;
    if (excelUrl) {
      try {
        console.log("Contact Action: Syncing to Google Sheets...");
        const response = await fetch(excelUrl, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify({
            name,
            email,
            projectType,
            budget,
            message,
          }),
          redirect: "follow",
        });

        if (response.ok) {
          console.log("Contact Action: Google Sheets sync successful");
        } else {
          console.log(
            "Contact Action: Google Sheets error status:",
            response.status
          );
        }
      } catch (sheetError) {
        console.error(
          "Contact Action: Google Sheets connection failed:",
          sheetError
        );
      }
    }

    // 4. Send Telegram Notification (Instant Alert)
    const tgToken = process.env.TELEGRAM_BOT_TOKEN;
    const tgChatId = process.env.TELEGRAM_CHAT_ID;

    if (tgToken && tgChatId) {
      try {
        console.log("Contact Action: Sending Telegram notification...");
        const messageText = `
🚀 *New Lead: Quantum Blaze*

👤 *Name:* ${name}
📧 *Email:* ${email}
💼 *Service:* ${projectType}
💰 *Budget:* ${budget}

📝 *Message:*
${message}

📅 _Submitted on: ${new Date().toLocaleString()}_
        `;

        await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: tgChatId,
            text: messageText,
            parse_mode: "Markdown",
          }),
        });
        console.log("Contact Action: Telegram notification successful");
      } catch (tgError) {
        console.error("Contact Action: Telegram notification failed:", tgError);
      }
    }

    console.log("Contact Action: Completed successfully for", name);
    return { success: true };
  } catch (error) {
    console.error("Contact Action: Process failed:", error);
    return { success: false, error: "Process failed." };
  }
}
