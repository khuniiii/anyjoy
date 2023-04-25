import { Anime } from "@/lib/model/anime";

export const getAnimeList = async (
  _: unknown,
  { input }: { input: { is_show: boolean } },
): Promise<unknown> => {
  const anime = await Anime.find({
    is_show: input.is_show,
  });

  if (anime.length === 0) {
    throw new Error(`Anime with is_show ${input.is_show} not found`);
  }

  return anime;
};

export const getAnimeByTitle = async (
  _: unknown,
  { input }: { input: { title: string } },
): Promise<unknown> => {
  const anime = await Anime.find({
    title: input.title,
  });

  if (anime.length === 0) {
    throw new Error(`Anime with title ${input.title} not found`);
  }

  return anime;
};
