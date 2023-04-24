import { useEffect } from "react";

import useStates from "./state";
import useHandlers from "./handler";

const MainList = () => {
  const states = useStates();
  const { aniInfo } = states;
  const { getAnimeListData } = useHandlers(states);

  useEffect(() => {
    getAnimeListData();
  }, []);

  console.log(aniInfo);

  return <></>;
};

export default MainList;
