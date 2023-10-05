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

  const getAnimeByTitleData = async (title: string) => {
    try {
      const filteredAnimeList = aniInfo?.getAnimeList.filter(item => {
        return item.title?.includes(title);
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

  const searchText = (title: string) => {
    setTitle(title);
    console.log(title);
  };

  return { getAnimeListData, getAnimeByTitleData, findAni, searchText };
};

export default useHandlers;
