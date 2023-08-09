import { useState } from "react";
import { useRouter } from "next/router";

const useStates = () => {
  const router = useRouter();

  const getter = { router };
  const setter = {};

  return { ...getter, ...setter };
};

export default useStates;
