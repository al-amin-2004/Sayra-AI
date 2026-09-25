import { IChat } from "@/types";
import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema<IChat>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, trim: true, maxLength: 40 },
    isPinned: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const ChatModel =
  (mongoose.models.Chat as mongoose.Model<IChat>) ||
  mongoose.model<IChat>("Chat", chatSchema);

export default ChatModel;
