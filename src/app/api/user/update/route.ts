import { getAuthUserId } from "@/helpers/getUserId";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

export async function PATCH(request: Request) {
  try {
    await dbConnect();

    const { name, avatar, avatarId } = await request.json();

    const auth = await getAuthUserId();
    if (!auth.success) {
      return Response.json(
        { success: true, message: auth.message },
        { status: auth.status },
      );
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      auth.decode?.userId,
      { $set: { name, avatar, avatarId } },
      { new: true },
    ).select("-password");

    if (!updatedUser) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    return Response.json(
      { success: true, message: "User updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("user/update error:", error);
    return Response.json(
      { ok: false, message: "Server error" },
      { status: 500 },
    );
  }
}
