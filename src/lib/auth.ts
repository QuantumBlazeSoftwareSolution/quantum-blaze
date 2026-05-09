import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

// Use the existing API key as the JWT secret, or fall back to a random string for dev
const secretKey = process.env.ADMIN_API_KEY || "super-secret-development-key-only";
const encodedKey = new TextEncoder().encode(secretKey);

export async function signToken(payload: { id: string; email: string; role: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    // Intentionally omitting .setExpirationTime() to create a Session Cookie
    .sign(encodedKey);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error("JWT Verification failed:", error);
    return null;
  }
}

/**
 * Retrieves the current admin session directly from cookies.
 * This is safe to use within Server Components and Server Actions.
 */
export async function getServerSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-token")?.value;

  if (!token) {
    return null;
  }

  const payload = await verifyToken(token);
  return payload as { id: string; email: string; role: string } | null;
}
