import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  useGetAnimeByTitleLazyQuery,
  GetAnimeByTitleQuery,
} from "@/graphql/queries/getAnimeByTitle.graphql";

const useStates = () => {
  const [getAnimeByTitle] = useGetAnimeByTitleLazyQuery();
  const [aniInfo, setAniInfo] = useState<GetAnimeByTitleQuery>();
  const router = useRouter();
  const params = useParams();

  const getter = {
    getAnimeByTitle,
    aniInfo,
    router,
    params,
  };
  const setter = { setAniInfo };

  return { ...getter, ...setter };
};

export default useStates;
