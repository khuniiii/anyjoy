import { Document, Schema } from "mongoose";
import { dbConnect } from "@/lib/dbConnect";

const conn = await dbConnect();

export interface CommentDocument extends Document {
  comment: string;
  commentId: string;
}

const CommentSchema = new Schema<CommentDocument>(
  {
    comment: String,
    commentId: String,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Comment = conn.model<CommentDocument>("comment", CommentSchema);
