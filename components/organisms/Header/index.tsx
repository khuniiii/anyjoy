import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  HeaderContainer,
  HeaderList,
  HeaderText,
  AccountList,
  AccountText,
  MobLogin,
  PcLogin,
} from "./style";
import Hamburger from "@/components/common/SVG/Hamburger";

import Cookies from "js-cookie";

import useStates from "./state";
import { useEffect } from "react";

const Header = () => {
  const { data: session, status } = useSession();
  const states = useStates();
  const { isMobile, router } = states;
  console.log(session);

  useEffect(() => {
    if (session) Cookies.set("token", session.user.token, { expires: 1 / 24 });
  }, [session]);

  const logout = () => {
    Cookies.remove("token");
    signOut();
  };

  const getMenuIcon = () => {
    if (!isMobile) {
      return (
        <>
          {status === "authenticated" && (
            <Link href="/mypage" passHref>
              <HeaderText>mypage</HeaderText>
            </Link>
          )}
        </>
      );
    }
  };

  const getLoginText = () => {
    if (isMobile) {
      return (
        <>
          <Hamburger />
        </>
      );
    } else {
      return (
        <>
          <Link href="/login" passHref>
            <AccountText>로그인</AccountText>
          </Link>
          <Link href="/join" passHref>
            <AccountText>회원가입</AccountText>
          </Link>
        </>
      );
    }
  };
  return (
    <HeaderContainer>
      <HeaderList>
        <Link href="/" passHref>
          <HeaderText>Home</HeaderText>
        </Link>

        {getMenuIcon()}
      </HeaderList>

      <AccountList>
        <MobLogin>
          <Hamburger />
        </MobLogin>

        <PcLogin>
          {status === "authenticated" ? (
            <>
              <AccountText onClick={logout}>로그아웃</AccountText>
            </>
          ) : (
            <>
              <Link href="/login" passHref>
                <AccountText>로그인</AccountText>
              </Link>
              <Link href="/join" passHref>
                <AccountText>회원가입</AccountText>
              </Link>
            </>
          )}
        </PcLogin>
      </AccountList>
    </HeaderContainer>
  );
};

export default Header;
