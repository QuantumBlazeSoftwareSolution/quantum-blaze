# 🚀 A-Z Guide: Instant Telegram Lead Notifications for Web Apps

This guide explains how to integrate a high-performance notification system that sends real-time alerts from your website's contact form directly to your Telegram mobile app.

---

## 🏗 Why Telegram?
- **Instant**: Faster than email notifications.
- **Free**: No monthly fees like SMS gateways (Twilio/Notify.lk).
- **Secure**: Uses encrypted HTTPS requests.
- **Rich UI**: Supports Markdown for bold text, emojis, and structured data.

---

## 🛠 Step 1: Create Your Telegram Bot
To send messages, you need a "Bot" entity in Telegram.

1.  Search for **@BotFather** on Telegram.
2.  Send `/newbot` command.
3.  Follow instructions to set a **Name** (e.g., `Quantum Blaze Notifier`) and a **Username** (e.g., `QB_leads_bot`).
4.  **Copy the HTTP API Token**: It looks like `8637884406:AAG51F...`. **Keep this secret!**

---

## 🆔 Step 2: Get Your Chat ID
The bot needs to know *who* to send the notification to.

1.  Search for **@userinfobot** on Telegram.
2.  Send any message to it.
3.  It will reply with your **Id** (e.g., `915395810`). This is your personal Chat ID.
4.  **CRITICAL**: Open your new bot (the one you created in Step 1) and click **"START"**. The bot cannot message you unless you start the conversation first.

---

## 🔐 Step 3: Environment Configuration
Never hardcode tokens in your files. Use an `.env` file.

Add these keys to your `.env`:
```env
TELEGRAM_BOT_TOKEN=your_token_here
TELEGRAM_CHAT_ID=your_id_here
```

---

## 💻 Step 4: Implementation (Next.js / Node.js)
We use a standard `POST` request to the Telegram API inside our server-side logic.

### 📜 The Notification Logic
```typescript
const tgToken = process.env.TELEGRAM_BOT_TOKEN;
const tgChatId = process.env.TELEGRAM_CHAT_ID;

if (tgToken && tgChatId) {
  try {
    const messageText = `
🚀 *New Lead: [Company Name]*

👤 *Name:* ${name}
📧 *Email:* ${email}
💼 *Service:* ${projectType}

📝 *Message:*
${message}

📅 _Submitted on: ${new Date().toLocaleString()}_
    `;

    await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: tgChatId,
        text: messageText,
        parse_mode: "Markdown", // Allows bold/italic formatting
      }),
    });
    console.log("✅ Telegram Alert Sent");
  } catch (error) {
    console.error("❌ Telegram API Error:", error);
  }
}
```

---

## ✨ Step 5: Formatting for Premium Look
To make the notification feel high-end:
1.  **Emojis**: Use them sparingly for visual anchors (🚀, 👤, 📧).
2.  **Markdown**:
    - `*Text*` → **Bold**
    - `_Text_` → *Italic*
    - `[Link](URL)` → Clickable Link
3.  **Spacing**: Use new lines (`\n`) to prevent the message from looking like a wall of text.

---

## 🚀 Deployment Checklist
- [ ] Bot created via BotFather.
- [ ] User Chat ID obtained.
- [ ] Bot started by the user.
- [ ] Env variables added to the production server.
- [ ] Test submission performed.

---
**Lead Architect Recommendation:** Always wrap the Telegram logic in a `try...catch` block. Even if the Telegram API fails, you don't want your entire website submission to crash.
