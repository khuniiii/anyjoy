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
  is_ended: boolean;
  id: number;
  is_show: boolean;
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
    is_ended: {
      type: Boolean,
    },
    id: {
      type: Number,
    },
    is_show: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Anime = conn.model<AnimeDocument>("anime", AnimeSchema);
