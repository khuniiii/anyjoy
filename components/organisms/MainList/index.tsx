import { useEffect } from "react";

import useStates from "./state";
import useHandlers from "./handler";

const MainList = () => {
  const states = useStates();
  const { getAnimeListData } = useHandlers(states);

  useEffect(() => {
    getAnimeListData();
  }, []);

  return <></>;
};

export default MainList;
