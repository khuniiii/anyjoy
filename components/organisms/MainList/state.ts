import { useState } from "react";
import {
  useGetAnimeListLazyQuery,
  GetAnimeListQuery,
} from "@/graphql/queries/getAnimeList.graphql";

import { useRouter } from "next/navigation";

const useStates = () => {
  const [getAnimeList] = useGetAnimeListLazyQuery();
  const [aniInfo, setAniInfo] = useState<GetAnimeListQuery>();
  const router = useRouter();

  const getter = { aniInfo, getAnimeList, router };
  const setter = { setAniInfo };

  return { ...getter, ...setter };
};

export default useStates;
