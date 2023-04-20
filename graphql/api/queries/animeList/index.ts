import { Anime } from "@/lib/model/anime";

export const getAnimeList = async (
  _: unknown,
  { input }: { input: { id: number } },
): Promise<unknown> => {
  const anime = await Anime.findOne({ id: input.id });

  if (!anime) {
    throw new Error(`Anime with ID ${input.id} not found`);
  }

  return {
    title: anime.title,
    author: anime.author,
    company: anime.company,
    is_adult: anime.is_adult,
    genre: anime.genre,
    year: anime.year,
    branch: anime.branch,
    is_ended: anime.is_ended,
    id: anime.id,
  };
};
