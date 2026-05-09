"use server";

import { sendMonitorAlert as sendAlert } from "@/lib/monitor";

export async function reportErrorAction(message: string, details?: any) {
  try {
    await sendAlert("ERROR", message, details);
  } catch (error) {
    console.error("Failed to report error via server action:", error);
  }
}

export async function reportAnalyticsAction(message: string, details?: any) {
  try {
    await sendAlert("ANALYTICS", message, details);
  } catch (error) {
    console.error("Failed to report analytics via server action:", error);
  }
}
