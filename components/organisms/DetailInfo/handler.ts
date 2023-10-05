import { StatesType } from "./type";

const useHandlers = (states: StatesType) => {
  const { getAnimeById, setAniInfo } = states;

  const getAnimeByIdData = async (id: string) => {
    try {
      const { data } = await getAnimeById({
        variables: {
          input: {
            is_show: true,
            _id: id,
          },
        },
      });
      setAniInfo(data);
    } catch (error) {
      console.error(error);
    }
  };

  return { getAnimeByIdData };
};

export default useHandlers;
