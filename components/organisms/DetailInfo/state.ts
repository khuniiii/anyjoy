import { useState } from "react";
import { useRouter } from "next/router";
import {
  useGetAnimeByIdLazyQuery,
  GetAnimeByIdQuery,
} from "@/graphql/queries/getAnimeById.graphql";

const useStates = () => {
  const [getAnimeById] = useGetAnimeByIdLazyQuery();
  const [aniInfo, setAniInfo] = useState<GetAnimeByIdQuery>();
  const router = useRouter();

  const getter = { getAnimeById, aniInfo, router };
  const setter = { setAniInfo };

  return { ...getter, ...setter };
};

export default useStates;
