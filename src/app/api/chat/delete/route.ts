import { getAuthUserId } from "@/helpers/getUserId";
import dbConnect from "@/lib/dbConnect";
import ChatModel from "@/models/Chat";
import MessageModel from "@/models/Message";

export async function POST(request: Request) {
  try {
    await dbConnect();

    // Besic Validation ==
    const { chatId } = await request.json();
    if (!chatId) {
      return Response.json(
        { success: false, message: "Chat Id is Required!" },
        { status: 400 },
      );
    }

    // Check authentication ==
    const auth = await getAuthUserId();
    if (!auth.success) {
      return Response.json(
        { success: false, message: auth.message },
        { status: auth.status },
      );
    }

    // Find chat and make sure it belongs to current user ==
    const chat = await ChatModel.findOne({
      _id: chatId,
      userId: auth.decode?.userId,
    });
    if (!chat) {
      return Response.json(
        { success: false, message: "Chat not found!" },
        { status: 404 },
      );
    }

    // Delete all mrssages belonging to this chat ==
    await MessageModel.deleteMany({ chatId });

    // Delete the Chat ==
    await ChatModel.deleteOne({ _id: chatId });

    return Response.json(
      { success: true, message: "Chat deleted successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Delete chat error:", error);
    return Response.json(
      { success: false, message: "Failed to delete chat!" },
      { status: 500 },
    );
  }
}
