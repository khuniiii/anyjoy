// import { Binary, UUID } from "bson";
import { Document, Schema } from "mongoose";

import { dbConnect } from "@/lib/dbConnect";

const conn = await dbConnect();

export interface AnimeDocument extends Document {
  title: string;
  author: string;
  company: string | string[];
  is_adult: boolean;
  genre: string[];
  year: number;
  branch: number;
  is_ended: boolean;
  id: number;
}

const AnimeSchema = new Schema<AnimeDocument>(
  {
    title: {
      type: String,
    },
    author: {
      type: String,
    },
    company: {
      type: [String],
    },
    is_adult: {
      type: Boolean,
    },
    genre: {
      type: [String],
    },
    year: {
      type: Number,
    },
    branch: {
      type: Number,
    },
    is_ended: {
      type: Boolean,
    },
    id: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Anime = conn.model<AnimeDocument>("anime", AnimeSchema);
