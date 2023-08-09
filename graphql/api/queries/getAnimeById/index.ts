import { Anime } from "@/lib/model/anime";

export const getAnimeById = async (
  _: unknown,
  { input }: { input: { is_show: boolean; id: number } },
): Promise<unknown> => {
  const anime = await Anime.find({
    is_show: input.is_show,
    id: input.id,
  });

  if (anime.length === 0) {
    throw new Error(
      `Anime with is_show ${input.is_show} not found or title ${input.id} not found`,
    );
  }

  return anime;
};
