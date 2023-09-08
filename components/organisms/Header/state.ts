import { useRouter } from "next/router";
import { useState } from "react";
import { useWindowSize } from "react-use";

const useStates = () => {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const router = useRouter();

  const [openSide, setOpenSide] = useState(false);

  const getter = {
    isMobile,
    router,
    openSide,
  };
  const setter = { setOpenSide };

  return { ...getter, ...setter };
};

export default useStates;
