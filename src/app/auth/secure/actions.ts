"use server";

import { cookies } from "next/headers";

const SECURE_USERNAME = process.env.SECURE_USERNAME;
const SECURE_PASSWORD = process.env.SECURE_PASSWORD;

export async function loginAction(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (username === SECURE_USERNAME && password === SECURE_PASSWORD) {
    // Set a secure session cookie
    const cookieStore = await cookies();
    cookieStore.set({
      name: "qb_secure_session",
      value: "active",
      httpOnly: false, // Set to false so client-side sessionStorage can sync or check it if required, but server checks cookies
      path: "/",
      maxAge: 60 * 60 * 2, // 2 hours session window
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return { success: true };
  }

  return { success: false, error: "Invalid username or password" };
}
