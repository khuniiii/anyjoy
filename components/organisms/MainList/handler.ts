import { StatesType } from "./type";

const useHandlers = (states: StatesType) => {
  const { getAnimeList } = states;

  const getAnimeListData = async () => {
    try {
      const { data } = await getAnimeList({
        variables: {
          input: {
            is_show: true,
          },
        },
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return { getAnimeListData };
};

export default useHandlers;
