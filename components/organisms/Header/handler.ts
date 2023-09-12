import { StatesType } from "./type";
import { signOut } from "next-auth/react";

import Cookies from "js-cookie";

const useHandlers = (states: StatesType) => {
  const { router, openSide, setOpenSide } = states;

  const logout = () => {
    Cookies.remove("token");
    signOut();
  };

  const goLogin = () => {
    router.push("/login");
  };

  const goJoin = () => {
    router.push("/join");
  };

  const openSideMenu = () => {
    setOpenSide(!openSide);
  };

  return { logout, goLogin, goJoin, openSideMenu };
};

export default useHandlers;
