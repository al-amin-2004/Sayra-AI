import { ObjectId } from "mongoose";

export interface IMessage {
  _id?: string;
  chatId: ObjectId | string;
  role: "user" | "assistant";
  content: string;
}
