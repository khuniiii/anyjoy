import { useRouter } from "next/router";
import { useWindowSize } from "react-use";

const useStates = () => {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const router = useRouter();

  const getter = {
    isMobile,
    router,
  };
  const setter = {};

  return { ...getter, ...setter };
};

export default useStates;
