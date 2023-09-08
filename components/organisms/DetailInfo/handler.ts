import { StatesType } from "./type";

const useHandlers = (states: StatesType) => {
  const { getAnimeById, setAniInfo } = states;

  const getAnimeByIdData = async (title: string) => {
    console.log("id:", title);
    try {
      const { data } = await getAnimeById({
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

  return { getAnimeByIdData };
};

export default useHandlers;
