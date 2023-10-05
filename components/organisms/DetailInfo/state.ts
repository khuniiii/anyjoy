import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  useGetAnimeByIdLazyQuery,
  GetAnimeByIdQuery,
} from "@/graphql/queries/getAnimeById.graphql";

const useStates = () => {
  const [getAnimeById] = useGetAnimeByIdLazyQuery();
  const [aniInfo, setAniInfo] = useState<GetAnimeByIdQuery>();
  const router = useRouter();
  const params = useParams();

  const getter = {
    getAnimeById,
    aniInfo,
    router,
    params,
  };
  const setter = { setAniInfo };

  return { ...getter, ...setter };
};

export default useStates;
