import { Anime } from "@/lib/model/anime";

export const getAnimeList = async (
  _: unknown,
  { input }: { input: { is_show: boolean } },
): Promise<unknown> => {
  const anime = await Anime.find({ is_show: input.is_show });

  if (anime.length === 0) {
    throw new Error(`Anime with is_show ${input.is_show} not found`);
  }

  return anime;
};
