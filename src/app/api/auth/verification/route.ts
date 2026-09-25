import dbConnect from "@/lib/dbConnect";
import VerificationModel from "@/models/OTPVerification";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const jwtSecret = process.env.JWT_SECRET;

export async function POST(request: Request) {
  try {
    await dbConnect();

    // Besic Validation ==
    const { userId, otp } = await request.json();
    if (!userId || !otp) {
      return Response.json(
        { success: false, message: "UserId, email and OTP are required." },
        { status: 400 },
      );
    }

    // Check User in Databse ==
    const user = await UserModel.findById(userId);
    if (!user) {
      return Response.json(
        { success: false, message: "User not found." },
        { status: 404 },
      );
    }

    // Check Verification Data in Database with userId ==
    const otpData = await VerificationModel.findOne({ userId });
    if (!otpData) {
      return Response.json(
        { success: false, message: "No verification record found." },
        { status: 404 },
      );
    }

    // Expiry check at Verification Data ==
    if (otpData.expiresAt < new Date()) {
      return Response.json(
        { success: false, message: "OTP expired. Please request again." },
        { status: 400 },
      );
    }

    // Matching OTP for Verify ==
    const isMatch = await bcrypt.compare(otp, otpData.verificationCode);
    if (!isMatch) {
      return Response.json(
        { success: false, message: "Invalid verification OTP." },
        { status: 400 },
      );
    }

    // If OTP is Matched so, Email Verify true ==
    user.isVerifiedEmail = true;
    await user.save();

    // Delete OTP Record ==
    await VerificationModel.deleteOne({ userId });

    // Token set for JWT in Cookie ==
    if (!jwtSecret) throw new Error("JWT_SECRET is not defiend!");
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      jwtSecret,
      { expiresIn: "15d" },
    );

    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 24 * 60 * 60,
      path: "/",
      priority: "high",
    });

    return Response.json(
      { success: true, message: "Email verified successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Verification error:", error);
    return Response.json(
      { success: false, message: "Server error." },
      { status: 500 },
    );
  }
}
