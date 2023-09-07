import { Document, Schema } from "mongoose";
import { dbConnect } from "@/lib/dbConnect";

const conn = await dbConnect();

export interface PostDocument extends Document {
  title: string;
  content: string;
  views: number;
  createdAt: Date;
  type: string;
}

const PostSchema = new Schema<PostDocument>(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    views: {
      type: Number,
    },
    createdAt: {
      type: Date,
    },
    type: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Post = conn.model<PostDocument>("post", PostSchema);
