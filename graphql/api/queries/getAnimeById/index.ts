import { Anime } from "@/lib/model/anime";

export const getAnimeById = async (
  _: unknown,
  { input }: { input: { is_show: boolean; _id: string } },
): Promise<unknown> => {
  const anime = await Anime.find({
    is_show: input.is_show,
    _id: input._id,
  });

  if (anime.length === 0) {
    throw new Error(
      `Anime with is_show ${input.is_show} not found or title ${input._id} not found`,
    );
  }

  return anime;
};
