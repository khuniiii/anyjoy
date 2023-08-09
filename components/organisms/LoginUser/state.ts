import { useState } from "react";

const useStates = () => {
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [loginUserInfo, setLoginUserInfo] = useState();

  const getter = { loginEmail, loginPassword, loginUserInfo };
  const setter = { setLoginEmail, setLoginPassword, setLoginUserInfo };

  return { ...getter, ...setter };
};

export default useStates;
