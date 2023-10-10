import { useState } from "react";
import {
  useGetAnimeListLazyQuery,
  GetAnimeListQuery,
} from "@/graphql/queries/getAnimeList.graphql";
import { SearchType } from "@/components/organisms/MainList/type";

import { useRouter } from "next/navigation";

const useStates = () => {
  const [getAnimeList] = useGetAnimeListLazyQuery();
  const [aniInfo, setAniInfo] = useState<GetAnimeListQuery>();
  const [findAniInfo, setFindAniInfo] = useState<GetAnimeListQuery>();
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [searchType, setSearchType] = useState<SearchType>("title");
  const router = useRouter();

  const getter = {
    aniInfo,
    getAnimeList,

    findAniInfo,
    title,
    genre,
    searchType,

    router,
  };
  const setter = {
    setAniInfo,
    setFindAniInfo,
    setTitle,
    setGenre,
    setSearchType,
  };

  return { ...getter, ...setter };
};

export default useStates;
