import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import VerificationModel from "@/models/OTPVerification";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const { email, password } = await request.json();

    //Besic Validation ==
    if (!email || !password) {
      return Response.json(
        { success: false, message: "Email and Password are required." },
        { status: 400 },
      );
    }

    // Password and Verifycation code Hashing ==
    const hashedPassword = await bcrypt.hash(password, 10);
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedVerifyCode = await bcrypt.hash(verifyCode, 10);
    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + 2);

    // Existing Email Validation ==
    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      return Response.json(
        { success: false, message: "User already exist with this email." },
        { status: 400 },
      );
    }

    // Create User in Database ==
    const createNewUser = await UserModel.create({
      email,
      password: hashedPassword,
    });

    //Get user id from Database ==
    const userId = createNewUser._id;

    // Save Verification code in Database ==
    await VerificationModel.create({
      userId,
      verificationCode: hashedVerifyCode,
      expiresAt: expiryDate,
    });

    // Send Verification Code at User Email ==
    const emailRespons = await sendVerificationEmail(email, verifyCode);

    // Check Send Mail Verification ==
    if (!emailRespons.success) {
      return Response.json(
        { success: false, message: "Failed to send verification email." },
        { status: 500 },
      );
    }

    return Response.json(
      {
        success: true,
        userId,
        email,
        message: "Sending an OTP. Please verify your email.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error registering user!", error);
    return Response.json(
      { success: false, message: "Error Registering user!" },
      { status: 500 },
    );
  }
}
