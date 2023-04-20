import { GraphQLError } from "graphql";
import { Anime } from "@/lib/model/anime";

export const createAnimeInfo = async (
  _: unknown,
  {
    input,
  }: {
    input: {
      title: string;
      author: string;
      company: string | string[];
      is_adult: boolean;
      genre: string[];
      year: number;
      branche: number;
      is_ended: boolean;
      id: number;
    };
  },
) => {
  try {
    const animeInfo = new Anime(input);
    const savedAnimeInfo = await animeInfo.save();

    if (false)
      throw new GraphQLError("", {
        extensions: { code: "UNAUTHENTICATED" },
      });

    return savedAnimeInfo; // 저장된 데이터를 반환
  } catch (err) {
    console.error(err);
  }
};
