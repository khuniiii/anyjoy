import { useState } from "react";
import { useLoginLazyQuery, LoginQuery } from "@/graphql/queries/login.graphql";

const useStates = () => {
  const [getLoginInfo] = useLoginLazyQuery();
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [loginUserInfo, setLoginUserInfo] = useState<LoginQuery>();

  const getter = { getLoginInfo, loginEmail, loginPassword, loginUserInfo };
  const setter = { setLoginEmail, setLoginPassword, setLoginUserInfo };

  return { ...getter, ...setter };
};

export default useStates;
