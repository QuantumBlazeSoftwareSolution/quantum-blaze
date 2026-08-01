import { sendMonitorAlert } from "../lib/monitor";

async function sendMainBotTest() {
  const tgToken = process.env.TELEGRAM_BOT_TOKEN;
  const tgChatId = process.env.TELEGRAM_CHAT_ID;

  if (!tgToken || !tgChatId) {
    console.error("Main Bot credentials missing");
    return;
  }

  const messageText = `🚀 *Main Bot Test*\n\nThis is a test message from the Quantum Blaze system. Everything seems to be working correctly!`;

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${tgToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: tgChatId,
          text: messageText,
          parse_mode: "Markdown",
        }),
      }
    );
    const data = await res.json();
    console.log(
      "Main Bot Response:",
      data.ok ? "SUCCESS ✅" : "FAILED ❌",
      data.description || ""
    );
  } catch (error) {
    console.error("Main Bot Error:", error);
  }
}

async function runTest() {
  console.log("Starting Bot Connectivity Test...");

  console.log("\n--- Testing Monitor Bot ---");
  await sendMonitorAlert(
    "ANALYTICS",
    "Monitor Bot Connectivity Test Successful! 📊✨"
  );
  console.log(
    "Monitor Bot test triggered (check console for logs if any issues)."
  );

  console.log("\n--- Testing Main Bot ---");
  await sendMainBotTest();

  console.log("\nTest Completed.");
}

runTest();
