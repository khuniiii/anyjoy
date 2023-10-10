import { GetAnimeListQuery } from "@/graphql/queries/getAnimeList.graphql";
import { StatesType } from "./type";
import { useToast } from "@/components/common/hook/useToast";

const useHandlers = (states: StatesType) => {
  const {
    getAnimeList,
    findAniInfo,
    aniInfo,
    setAniInfo,
    setFindAniInfo,
    title,
    genre,
    setTitle,
    setGenre,
    setSearchType,
    searchType,
  } = states;

  const toast = useToast();

  const getAnimeListData = async () => {
    try {
      const { data } = await getAnimeList({
        variables: {
          input: {
            is_show: true,
          },
        },
      });

      setAniInfo(data);

      console.log("end", aniInfo);
    } catch (error) {
      console.error(error);
    }
  };

  const getAnimeByTitleData = async () => {
    try {
      let filteredAnimeList;

      if (searchType === "title") {
        // 제목별 검색
        const { data } = await getAnimeList({
          variables: {
            input: {
              is_show: true,
              title: title.length > 0 ? title : undefined,
            },
          },
        });

        filteredAnimeList = data?.getAnimeList.filter(item => {
          const itemTitle = item.title?.toLowerCase();
          const searchTitle = title?.toLowerCase();

          return itemTitle?.includes(searchTitle);
        });
      } else if (searchType === "genre") {
        // 장르별 검색
        const { data } = await getAnimeList({
          variables: {
            input: {
              is_show: true,
            },
          },
        });

        filteredAnimeList = data?.getAnimeList.filter(item => {
          const itemGenre = item.genre;
          const searchGenre = genre;

          return itemGenre?.includes(searchGenre);
        });
      }

      if (filteredAnimeList) {
        const convertedList: GetAnimeListQuery = {
          getAnimeList: filteredAnimeList,
        };

        setFindAniInfo(convertedList);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const findAni = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (findAniInfo?.getAnimeList.length === 0) {
      toast.error({
        title: "검색 실패",
        content: "해당하는 작품이 없습니다.",
        duration: 5000,
      });
      return;
    }
    return false;
  };

  const switchToTitleSearch = () => {
    setSearchType("title");
  };
  const switchToGenreSearch = () => {
    setSearchType("genre");
  };

  const refresh = async () => {
    setTitle("");
    setGenre("");
    setAniInfo(undefined);

    await getAnimeListData();

    console.log("title:", title, "genre:", genre, aniInfo, findAniInfo);
  };

  return {
    getAnimeListData,
    getAnimeByTitleData,
    findAni,
    switchToTitleSearch,
    switchToGenreSearch,
    refresh,
  };
};

export default useHandlers;
