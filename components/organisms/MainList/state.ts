import { useState } from "react";
import {
  useGetAnimeListLazyQuery,
  GetAnimeListQuery,
} from "@/graphql/queries/getAnimeList.graphql";

import {
  useGetAnimeByTitleLazyQuery,
  GetAnimeByTitleQuery,
} from "@/graphql/queries/getAnimeByTitle.graphql";

import { useRouter } from "next/navigation";

const useStates = () => {
  const [getAnimeList] = useGetAnimeListLazyQuery();
  const [aniInfo, setAniInfo] = useState<GetAnimeListQuery>();

  const [getAnimeByTitle] = useGetAnimeByTitleLazyQuery();
  const [findAniInfo, setFindAniInfo] = useState<GetAnimeByTitleQuery>();
  const [title, setTitle] = useState("");
  const router = useRouter();

  const getter = {
    aniInfo,
    getAnimeList,
    getAnimeByTitle,
    findAniInfo,
    title,
    router,
  };
  const setter = { setAniInfo, setFindAniInfo, setTitle };

  return { ...getter, ...setter };
};

export default useStates;
