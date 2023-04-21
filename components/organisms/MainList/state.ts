import { useGetAnimeListLazyQuery } from "@/graphql/queries/getAnimeList.graphql";

const useStates = () => {
  const [getAnimeList] = useGetAnimeListLazyQuery();

  const getter = { getAnimeList };
  const setter = {};

  return { ...getter, ...setter };
};

export default useStates;
