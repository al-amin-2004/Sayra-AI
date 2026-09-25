import crypto from "crypto";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI;

    // Client ID and Redirect URI Validation ==
    if (!clientId || !redirectUri) {
      return Response.json(
        { success: false, message: "Google-OAuth configuration is missing." },
        { status: 500 },
      );
    }

    // Generate CSRF protection state
    const state = crypto.randomBytes(32).toString("hex");

    const googleUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");

    googleUrl.searchParams.set("client_id", clientId);
    googleUrl.searchParams.set("redirect_uri", redirectUri);
    googleUrl.searchParams.set("response_type", "code");
    googleUrl.searchParams.set("scope", "openid email profile");
    googleUrl.searchParams.set("state", state);

    const cookieStore = await cookies();
    cookieStore.set("google_auth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 10 * 60,
      path: "/",
      priority: "high",
    });

    return Response.redirect(googleUrl);
  } catch (error) {
    console.error("Google OAuth error:", error);
    return Response.json(
      { success: false, message: "Failed to start Google authentication." },
      { status: 500 },
    );
  }
}
