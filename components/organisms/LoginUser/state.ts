import { useRouter } from "next/router";
import { useState } from "react";

const useStates = () => {
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [loginUserInfo, setLoginUserInfo] = useState();

  const router = useRouter();

  const getter = { loginEmail, loginPassword, loginUserInfo, router };
  const setter = { setLoginEmail, setLoginPassword, setLoginUserInfo };

  return { ...getter, ...setter };
};

export default useStates;
