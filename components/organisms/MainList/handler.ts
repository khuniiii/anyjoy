import { StatesType } from "./type";
import { useToast } from "@/components/common/hook/useToast";

const useHandlers = (states: StatesType) => {
  const {
    getAnimeList,
    getAnimeByTitle,
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
      const { data } = await getAnimeByTitle({
        variables: {
          input: {
            is_show: true,
            title: title,
          },
        },
      });
      setFindAniInfo(data);

      if (data === undefined)
        toast.error({
          title: "검색 실패",
          content: "해당하는 작품이 없습니다.",
          duration: 5000,
        });
    } catch (error) {
      console.error(error);
    }
  };

  const findAni = (title: string) => {
    getAnimeByTitleData(title);
  };

  const searchText = (title: string) => {
    setFindAniInfo(undefined);
    setTitle(title);
  };
  return { getAnimeListData, getAnimeByTitleData, findAni, searchText };
};

export default useHandlers;
