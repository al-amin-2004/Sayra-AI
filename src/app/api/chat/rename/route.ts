import { getAuthUserId } from "@/helpers/getUserId";
import dbConnect from "@/lib/dbConnect";
import ChatModel from "@/models/Chat";

export async function PATCH(request: Request) {
  try {
    await dbConnect();

    // Besic Validation ==
    const { chatId, title } = await request.json();
    if (!chatId || !title) {
      return Response.json(
        { success: false, message: "Chat ID or Title is required!" },
        { status: 400 },
      );
    }

    // Authentication ==
    const auth = await getAuthUserId();
    if (!auth.success) {
      return Response.json(
        { success: false, message: auth.message },
        { status: auth.status },
      );
    }

    // Find chat belonging to logged-in user ==
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

    // Update title ==
    chat.title = title.trim();

    await chat.save();

    return Response.json(
      { success: true, message: "Chat renamed successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Rename chat error:", error);
    return Response.json(
      { success: false, message: "Failed to rename chat!" },
      { status: 500 },
    );
  }
}
