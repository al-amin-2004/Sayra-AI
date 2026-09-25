import { role } from "@/constants/user";

type Role = (typeof role)[number];

export interface IUser {
  _id?: string;
  name: string;
  googleId?: string;
  email: string;
  isVerifiedEmail: boolean;

  avatar?: string;
  avatarId?: string;

  role: Role;
}

export interface IUserWithPassword extends IUser {
  password: string;
}
