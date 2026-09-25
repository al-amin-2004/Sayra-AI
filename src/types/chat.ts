import { ObjectId } from "mongoose";

export interface IChat {
  _id?: string;
  userId: ObjectId | string;
  title: string;
  isPinned: boolean;
}
