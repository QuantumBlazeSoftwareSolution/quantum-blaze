export const sendMonitorAlert = async (type: "ERROR" | "ANALYTICS", message: string, details?: any) => {
  const tgToken = process.env.MONITOR_BOT_TOKEN;
  const tgChatId = process.env.MONITOR_CHAT_ID;

  if (!tgToken || !tgChatId) {
    console.warn("Monitor Bot credentials not configured in .env");
    return;
  }

  const icon = type === "ERROR" ? "🚨" : "📊";
  const title = type === "ERROR" ? "SYSTEM ERROR DETECTED" : "SYSTEM ANALYTICS";
  const color = type === "ERROR" ? "🔴" : "🔵";

  let formattedDetails = "";
  if (details) {
    try {
      formattedDetails = `\n\n*Details:*\n\`\`\`json\n${JSON.stringify(details, null, 2)}\n\`\`\``;
    } catch (e) {
      formattedDetails = `\n\n*Details:*\n${String(details)}`;
    }
  }

  const messageText = `
${icon} *${title}* ${color}
*Project:* Quantum Blaze

*Message:*
${message}${formattedDetails}

📅 _Time: ${new Date().toLocaleString()}_
  `;

  try {
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
  } catch (error) {
    console.error("Failed to send monitor alert:", error);
  }
};
