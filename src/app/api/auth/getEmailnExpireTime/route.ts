import dbConnect from "@/lib/dbConnect";
import VerificationModel from "@/models/OTPVerification";
import UserModel from "@/models/User";

export async function POST(request: Request) {
  try {
    await dbConnect();

    // Besic User Id Validation ==
    const { userId } = await request.json();
    if (!userId) {
      return Response.json(
        { success: false, message: "UserId not found." },
        { status: 404 },
      );
    }

    // Check is User Have in Database ==
    const user = await UserModel.findById(userId);
    if (!user) {
      return Response.json(
        { success: false, message: "User not found in." },
        { status: 404 },
      );
    }

    // Check is Verification Have in Database ==
    const validationInfo = await VerificationModel.findOne({ userId });
    if (!validationInfo) {
      return Response.json(
        { success: false, message: "OTP Data not found." },
        { status: 404 },
      );
    }

    return Response.json(
      {
        success: true,
        email: user.email,
        expiresAt: validationInfo.expiresAt,
        message: "OTP info get successfully.",
      },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      { success: false, message: "Server error.", error },
      { status: 500 },
    );
  }
}
