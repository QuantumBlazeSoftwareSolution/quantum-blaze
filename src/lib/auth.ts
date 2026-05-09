import { SignJWT, jwtVerify } from "jose";

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
