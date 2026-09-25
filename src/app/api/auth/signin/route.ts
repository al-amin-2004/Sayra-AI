import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const jwtSecret = process.env.JWT_SECRET;

export async function POST(request: Request) {
  try {
    await dbConnect();

    // Besic Validation ==
    const { email, password } = await request.json();
    if (!email || !password) {
      return Response.json(
        { success: false, message: "Email and password are required" },
        { status: 400 },
      );
    }

    // Check User From Database ==
    const user = await UserModel.findOne({ email }).lean();
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Invalid user or password, Please try again",
        },
        { status: 401 },
      );
    }

    // Check if email is verified
    if (!user.isVerifiedEmail) {
      return Response.json(
        { message: "Email is not verified, Please signup again" },
        { status: 403 },
      );
    }

    // Compare Password ==
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return Response.json(
        {
          success: false,
          message: "Invalid email or password, Please try again",
        },
        { status: 401 },
      );
    }

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
      { success: true, message: "Signin Successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
