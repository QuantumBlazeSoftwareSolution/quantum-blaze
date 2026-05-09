"use server";

import { getAdminUserByEmail } from "@/lib/db/crud/admins/read";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { sendMonitorAlert } from "@/lib/monitor";

export async function loginAdmin(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return { error: "Email and password are required." };
    }

    // 1. Fetch user from DB
    const admin = await getAdminUserByEmail(email);
    if (!admin) {
      return { error: "Invalid email or password." };
    }

    if (admin.status !== "active") {
      return { error: "Your account is disabled or suspended." };
    }

    // 2. Verify Password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return { error: "Invalid email or password." };
    }

    // 3. Generate JWT
    const token = await signToken({
      id: admin.id,
      email: admin.email,
      role: admin.role,
    });

    // 4. Set Session Cookie (Highly Secure)
    const cookieStore = await cookies();
    cookieStore.set({
      name: "admin-token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      // NOTE: Intentionally omitting `maxAge` or `expires` makes this a Session Cookie.
      // The browser will delete it when the window is closed.
    });

    // 5. Notify Monitor Bot
    await sendMonitorAlert("ANALYTICS", `🔐 *Admin Login Successful*\n\nUser: ${admin.email}\nRole: ${admin.role}\nStatus: ${admin.status}`);

    return { success: true };
  } catch (error) {
    console.error("Login Server Action Error:", error);
    return { error: "An unexpected error occurred." };
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin-token");
}
