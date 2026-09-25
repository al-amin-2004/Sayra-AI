import { role } from "@/constants/user";
import { IUserWithPassword } from "@/types";
import mongoose, { Schema } from "mongoose";


const userSchema = new Schema<IUserWithPassword>(
  {
    name: {
      type: String,
      default: "",
      maxlength: [25, "Name can't be more than 25 characters."],
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Please use a valid email."],
      sparse: true,
    },
    googleId: { type: String, unique: true, sparse: true },
    isVerifiedEmail: { type: Boolean, default: false },
    password: { type: String, default: null },
    avatar: { type: String, default: "" },
    avatarId: { type: String, default: "" },
    role: { type: String, enum: role, default: "user" },
  },
  { timestamps: true },
);

const UserModel =
  (mongoose.models.User as mongoose.Model<IUserWithPassword>) ||
  mongoose.model<IUserWithPassword>("User", userSchema);

export default UserModel;
