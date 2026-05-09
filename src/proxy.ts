import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth";

export async function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host");

  // Extract the hostname for local and production environments
  const currentHost =
    process.env.NODE_ENV === "production"
      ? hostname?.replace(`.quantumblaze.lk`, "")
      : hostname?.replace(`.localhost:3000`, "");

  // 1. Admin Subdomain Routing & Security
  if (currentHost === "admin") {
    const isLoginPage = url.pathname === "/login";
    const token = request.cookies.get("admin-token")?.value;
    
    // Verify the JWT signature at the Edge
    const payload = token ? await verifyToken(token) : null;
    const isAuthenticated = !!payload;

    // Redirect to login if not authenticated and not on login page
    if (!isAuthenticated && !isLoginPage) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Redirect to dashboard if authenticated and trying to access login page
    if (isAuthenticated && isLoginPage) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Rewrite to the internal /admin folder
    return NextResponse.rewrite(new URL(`/admin${url.pathname}${url.search}`, request.url));
  }

  // 2. API Security Block (Global for /api/admin/*)
  if (url.pathname.startsWith("/api/admin")) {
    const apiKey = request.headers.get("x-api-key");
    
    if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid or missing x-api-key" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api/|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/api/admin/:path*", // Explicitly include admin API routes for proxy processing
  ],
};
