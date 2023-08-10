import { StatesType } from "./type";

const useHandlers = (states: StatesType) => {
  const { getAnimeById, setAniInfo } = states;

  const getAnimeByIdData = async (id: number) => {
    console.log("id:", id);
    try {
      const { data } = await getAnimeById({
        variables: {
          input: {
            is_show: true,
            id: id,
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
