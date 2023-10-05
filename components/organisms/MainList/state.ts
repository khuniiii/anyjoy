import { useState } from "react";
import {
  useGetAnimeListLazyQuery,
  GetAnimeListQuery,
} from "@/graphql/queries/getAnimeList.graphql";

import { useRouter } from "next/navigation";

const useStates = () => {
  const [getAnimeList] = useGetAnimeListLazyQuery();
  const [aniInfo, setAniInfo] = useState<GetAnimeListQuery>();
  const [findAniInfo, setFindAniInfo] = useState<GetAnimeListQuery>();
  const [title, setTitle] = useState("");
  const router = useRouter();

  const getter = {
    aniInfo,
    getAnimeList,

    findAniInfo,
    title,
    router,
  };
  const setter = { setAniInfo, setFindAniInfo, setTitle };

  return { ...getter, ...setter };
};

export default useStates;
