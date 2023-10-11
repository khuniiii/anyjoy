import { useState } from "react";
import { useRouter } from "next/router";
import {
  useGetAnimeByTitleLazyQuery,
  GetAnimeByTitleQuery,
} from "@/graphql/queries/getAnimeByTitle.graphql";

const useStates = () => {
  const [getAnimeByTitle] = useGetAnimeByTitleLazyQuery();
  const [aniInfo, setAniInfo] = useState<GetAnimeByTitleQuery>();
  const router = useRouter();

  const getter = { getAnimeByTitle, aniInfo, router };
  const setter = { setAniInfo };

  return { ...getter, ...setter };
};

export default useStates;
