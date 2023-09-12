import { StatesType } from "./type";

const useHandlers = (states: StatesType) => {
  const { getAnimeByTitle, setAniInfo } = states;

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
      setAniInfo(data);
    } catch (error) {
      console.error(error);
    }
  };

  return { getAnimeByTitleData };
};

export default useHandlers;
