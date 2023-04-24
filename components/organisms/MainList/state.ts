import { useState } from "react";
import {
  useGetAnimeListLazyQuery,
  GetAnimeListQuery,
} from "@/graphql/queries/getAnimeList.graphql";

const useStates = () => {
  const [getAnimeList] = useGetAnimeListLazyQuery();
  const [aniInfo, setAniInfo] = useState<GetAnimeListQuery>();

  const getter = { aniInfo, getAnimeList };
  const setter = { setAniInfo };

  return { ...getter, ...setter };
};

export default useStates;
