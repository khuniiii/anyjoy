import { Document, Schema } from "mongoose";

import { dbConnect } from "@/lib/dbConnect";

const conn = await dbConnect();

export interface UserDocument extends Document {
  email: string;
  name: string;
  password: string;
  phoneNum: string;
  birth: number;
  role: string;
}

const UserSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
    },
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    phoneNum: {
      type: String,
    },
    birth: {
      type: Number,
    },
    role: {
      type: String,
      default: "user",
      enum: {
        values: ["user", "admin"],
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const User = conn.model<UserDocument>("user", UserSchema);
