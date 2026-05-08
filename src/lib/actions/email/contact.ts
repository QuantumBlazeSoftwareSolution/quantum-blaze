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

    const fromEmail = process.env.EMAIL_FROM || process.env.EMAIL_USER;

    // 1. Send Email to Admin
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
        console.log("Sending data to Google Sheet...");
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
          console.log("✅ Lead successfully saved to Google Sheet");
        } else {
          console.log(`❌ Google Sheet Error: ${response.status} ${response.statusText}`);
        }
      } catch (sheetError) {
        console.error("❌ Failed to connect to Google Sheet:", sheetError);
      }
    }

    // 4. Send Telegram Notification (Instant Alert)
    const tgToken = process.env.TELEGRAM_BOT_TOKEN;
    const tgChatId = process.env.TELEGRAM_CHAT_ID;

    if (tgToken && tgChatId) {
      try {
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
        console.log("✅ Telegram notification sent");
      } catch (tgError) {
        console.error("❌ Telegram Notification Failed:", tgError);
      }
    }

    return { success: true };
  } catch (error) {
    console.error("❌ Action failed:", error);
    return { success: false, error: "Process failed." };
  }
}
