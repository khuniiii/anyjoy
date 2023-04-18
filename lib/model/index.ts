import { Binary, UUID } from "bson";
import { Document, Schema } from "mongoose";

import { dbConnect } from "@/lib/dbConnect";

const conn = await dbConnect();

export interface ChannelDocument extends Document {
  desc?: string;
  id: Binary;
  name: string;
  suffix: string;
}

const ChannelSchema = new Schema<ChannelDocument>(
  {
    desc: {
      type: String,
    },
    id: {
      default: () => new UUID(),
      required: true,
      type: Object,
      unique: true,
    },
    name: {
      required: true,
      type: String,
    },
    suffix: {
      lowercase: true,
      required: true,
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Channel = conn.model<ChannelDocument>("channel", ChannelSchema);
