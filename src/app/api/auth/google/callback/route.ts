import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const jwtSecret = process.env.JWT_SECRET;

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;

    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const googleError = searchParams.get("error");

    // Google login cancelled
    if (googleError) {
      return Response.redirect(
        new URL("/login?error=google_cancelled", request.url),
      );
    }

    // Check code
    if (!code || !state) {
      return Response.redirect(
        new URL("/login?error=invalid_google_response", request.url),
      );
    }

    const cookieStore = await cookies();
    const storedState = cookieStore.get("google_auth_state")?.value;
    if (!storedState || storedState !== state) {
      return Response.redirect(
        new URL("/login?error=invalid_google_state", request.url),
      );
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI;
    if (!clientId || !clientSecret || !redirectUri) {
      throw new Error("Google OAuth environment variables are missing.");
    }

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();
    if (!tokenResponse.ok) {
      console.error("Google token error:", tokenData);
      throw new Error("Failed to exchange Google authorization code.");
    }

    const { id_token } = tokenData;

    if (!id_token) {
      throw new Error("Google ID token was not returned.");
    }

    const payloadBase64 = id_token.split(".")[1];
    if (!payloadBase64) {
      throw new Error("Invalid Google ID token.");
    }

    const googleUser = JSON.parse(
      Buffer.from(payloadBase64, "base64url").toString("utf-8"),
    );

    const googleId = googleUser.sub;
    const email = googleUser.email;
    const name = googleUser.name;
    const picture = googleUser.picture;
    const emailVerified = googleUser.email_verified;

    if (!googleId || !email) {
      throw new Error("Google account information is incomplete.");
    }

    if (!emailVerified) {
      return Response.redirect(
        new URL("/login?error=google_email_not_verified", request.url),
      );
    }

    let user = await UserModel.findOne({ email });

    if (!user) {
      user = await UserModel.create({
        name: name || "Google User",
        email,
        googleId,
        isVerifiedEmail: true,
        avatar: picture || "",
      });
    } else {

      // Already linked with another Google account ==
      if (user.googleId && user.googleId !== googleId) {
        return Response.redirect(
          new URL("/login?error=google_account_mismatch", request.url),
        );
      }

      // Link Google account ==
      if (!user.googleId) {
        user.googleId = googleId;
      }

       // Google has verified this email ==
      user.isVerifiedEmail = true;

      // Don't overwrite user's existing profile image ==
      if (picture && !user.avatar) {
        user.avatar = picture;
      }

      await user.save();
    }

    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined!");
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      jwtSecret,
      {
        expiresIn: "15d",
      },
    );

    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 24 * 60 * 60,
      path: "/",
      priority: "high",
    });

    // Remove temporary Google state cookie ==
    cookieStore.delete("google_auth_state");

    return Response.redirect(new URL("/", request.url));
  } catch (error) {
    console.error("Google callback error:", error);

    return Response.redirect(
      new URL("/login?error=google_auth_failed", request.url),
    );
  }
}
