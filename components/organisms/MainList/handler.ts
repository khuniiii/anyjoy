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
    setTitle,
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
    } catch (error) {
      console.error(error);
    }
  };

  const getAnimeByTitleData = async () => {
    try {
      const { data } = await getAnimeList({
        variables: {
          input: {
            is_show: true,
            title: title,
          },
        },
      });

      const filteredAnimeList = data?.getAnimeList.filter(item => {
        const itemTitle = item.title?.toLowerCase();
        const searchTitle = title?.toLowerCase();

        return itemTitle?.includes(searchTitle);
      });

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

  return { getAnimeListData, getAnimeByTitleData, findAni };
};

export default useHandlers;
