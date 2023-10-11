import { Anime } from "@/lib/model/anime";

export const getAnimeByTitle = async (
  _: unknown,
  { input }: { input: { is_show: boolean; title: string } },
): Promise<unknown> => {
  const anime = await Anime.find({
    is_show: input.is_show,
    title: input.title,
  });

  if (anime.length === 0) {
    throw new Error(
      `Anime with is_show ${input.is_show} not found or title ${input.title} not found`,
    );
  }

  return anime;
};
