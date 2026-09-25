import { IMessage } from "@/types";
import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema<IMessage>(
  {
    chatId: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
    role: { type: String, enum: ["user", "assistant"] },
    content: String,
  },
  { timestamps: true },
);

const MessageModel =
  (mongoose.models.Message as mongoose.Model<IMessage>) ||
  mongoose.model<IMessage>("Message", messageSchema);

export default MessageModel;
