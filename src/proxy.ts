import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes
  const publicRoutes = [
    "/signin",
    "/signup",
    "/verification",
    "/privacy-policy",
    "/terms-service",
  ];

  const isPublicRoute = publicRoutes.some(
    (route) =>
      pathname === route || pathname.startsWith(`${route}/`),
  );

  // Allow public routes
  if (isPublicRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get("auth_token")?.value;

  // Not logged in → redirect to signin
  if (!token) {
    const signinUrl = new URL("/signin", request.url);

    // Optional: remember where the user wanted to go
    signinUrl.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(signinUrl);
  }

  try {
    jwt.verify(token, JWT_SECRET);

    return NextResponse.next();
  } catch {
    // Invalid / expired token
    const signinUrl = new URL("/signin", request.url);

    signinUrl.searchParams.set("callbackUrl", pathname);

    const response = NextResponse.redirect(signinUrl);

    // Remove invalid token
    response.cookies.delete("auth_token");

    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Protect application routes.
     * Exclude Next.js internals and static files.
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};