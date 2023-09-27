import { useRouter } from "next/navigation";
import { useState } from "react";
import { useWindowSize } from "react-use";
import Cookies from "js-cookie";

const useStates = () => {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const router = useRouter();

  const [openSide, setOpenSide] = useState(false);

  const token = Cookies.get("token");

  const getter = {
    isMobile,
    router,
    openSide,
    token,
  };
  const setter = { setOpenSide };

  return { ...getter, ...setter };
};

export default useStates;
