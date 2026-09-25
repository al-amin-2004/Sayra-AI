import dbConnect from "@/lib/dbConnect";
import ChatModel from "@/models/Chat";

export async function PATCH(request: Request) {
  try {
    await dbConnect();

    // Besic Validation ==
    const { chatId, isPinned } = await request.json();
    if (!chatId) {
      return Response.json(
        { success: false, message: "Chat ID and pin status are required!" },
        { status: 400 },
      );
    }

    // Find chat belonging to logged-in user ==
    const chat = await ChatModel.findOne({ _id: chatId });
    if (!chat) {
      return Response.json(
        { success: false, message: "Chat not found!" },
        { status: 404 },
      );
    }

    chat.isPinned = isPinned;
    await chat.save();

    return Response.json(
      {
        success: true,
        message: isPinned
          ? "Chat pinned successfully."
          : "Chat unpinned successfully.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Pin chat error:", error);
    return Response.json(
      { success: false, message: "Failed to update pin status!" },
      { status: 500 },
    );
  }
}
