import { generateText, streamText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import dbConnect from "@/lib/dbConnect";
import { getAuthUserId } from "@/helpers/getUserId";
import ChatModel from "@/models/Chat";
import MessageModel from "@/models/Message";
import { systemMessage, titleRoles } from "@/lib/systemMessage";

export const maxDuration = 60;

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(request: Request) {
  try {
    await dbConnect();

    // Besic Validation ==
    const { chatId, input } = await request.json();
    if (!input?.trim()) {
      return Response.json(
        { success: false, message: "Input is required!" },
        { status: 400 },
      );
    }

    const auth = await getAuthUserId();
    if (!auth.success) {
      return Response.json(
        { success: false, message: auth.message },
        { status: auth.status },
      );
    }

    let currentChatId = chatId;
    let isNewChat = false;

    if (!currentChatId) {
      const newChat = await ChatModel.create({
        userId: auth.decode?.userId,
        title: "",
      });

      currentChatId = newChat._id.toString();
      isNewChat = true;
    } else {
      const existingChat = await ChatModel.findOne({
        _id: currentChatId,
        userId: auth.decode?.userId,
      });

      if (!existingChat) {
        return Response.json(
          { success: false, message: "Chat not found!" },
          { status: 404 },
        );
      }
    }

    await MessageModel.create({
      chatId: currentChatId,
      role: "user",
      content: input,
    });

    // Generate Chat Title
    if (isNewChat) {
      try {
        const titleResult = await generateText({
          // model: openrouter("openrouter/free"),
          // model: openrouter("inclusionai/ling-3.0-flash-vl:free"),
          model: openrouter("inclusionai/ling-3.0-flash-sante:free"),
          prompt: titleRoles(input),
        });

        const title = titleResult.text
          .trim()
          .replace(/^["']|["']$/g, "")
          .slice(0, 30);

        if (title) {
          await ChatModel.findByIdAndUpdate(currentChatId, {
            title,
          });
        }
      } catch (error) {
        console.error("Failed to generate chat title:", error);
      }
    }

    const previouseMessage = await MessageModel.find({ chatId: currentChatId })
      .sort({ createdAt: 1 })
      .select("role content")
      .lean();

    // Start AI Stream ==
    const result = streamText({
      // model: openrouter("openrouter/free"),
      model: openrouter("inclusionai/ling-3.0-flash-sante:free"),
      system: systemMessage,

      messages: previouseMessage.map((message) => ({
        role: message.role,
        content: message.content,
      })),

      // prompt: input,

      // Execute when AI Stream End ==
      onFinish: async ({ text }) => {
        try {
          await MessageModel.create({
            chatId: currentChatId,
            role: "assistant",
            content: text,
          });

          await ChatModel.findByIdAndUpdate(currentChatId, {
            updatedAt: new Date(),
          });
        } catch (error) {
          console.error("Failed to save assistant message:", error);
        }
      },
    });

    return result.toTextStreamResponse({
      headers: { "X-Chat-Id": currentChatId },
    });
  } catch (error) {
    console.error("AI ERROR:", error);

    return Response.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    await dbConnect();

    const auth = await getAuthUserId();
    if (!auth.success) {
      return Response.json(
        { success: false, message: auth.message },
        { status: auth.status },
      );
    }

    const userId = auth.decode?.userId;

    const { searchParams } = new URL(request.url);
    const chatId = searchParams.get("chatId");

    // ==========================================
    // 1. Specific chat messages
    // GET /api/chat?chatId=xxxx
    // ==========================================
    if (chatId) {
      const chat = await ChatModel.findOne({ _id: chatId, userId });
      if (!chat) {
        return Response.json(
          { success: false, message: "Chat not found!" },
          { status: 404 },
        );
      }

      const messages = await MessageModel.find({ chatId })
        .sort({ createdAt: 1 })
        .lean();

      return Response.json({ success: true, messages }, { status: 200 });
    }

    // ==========================================
    // 2. All chats for Sidebar
    // GET /api/chat
    // ==========================================
    const chats = await ChatModel.find({ userId })
      .sort({ updatedAt: -1 })
      .select("_id title isPinned createdAt updatedAt")
      .lean();

    return Response.json({ success: true, chats }, { status: 200 });
  } catch (error) {
    console.error("GET CHAT ERROR:", error);
    return Response.json(
      { success: false, message: "Failed to load chat" },
      { status: 500 },
    );
  }
}
