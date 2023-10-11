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
  SideContainer,
  SideLoginBtn,
  SideLogin,
} from "./style";
import Hamburger from "@/components/common/SVG/Hamburger";

import Cookies from "js-cookie";

import useStates from "./state";
import useHandlers from "./handler";
import { useEffect } from "react";
import Close from "@/components/common/SVG/Close";
import { useScrollLockBody } from "@/components/common/hook/useScrollLock";

const Header = () => {
  const { data: session, status } = useSession();
  const states = useStates();
  const { token, isMobile, openSide } = states;
  const { logout, goLogin, goJoin, openSideMenu } = useHandlers(states);

  useEffect(() => {
    if (session) Cookies.set("token", session.user.token, { expires: 1 / 24 });
  }, [session]);

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

  useScrollLockBody(openSide);

  return (
    <>
      <HeaderContainer>
        <HeaderList>
          <Link href="/" passHref>
            <HeaderText>Home</HeaderText>
          </Link>

          {getMenuIcon()}
        </HeaderList>

        <AccountList>
          <MobLogin>
            <div onClick={openSideMenu}>
              {openSide ? <Close /> : <Hamburger />}
            </div>
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
      {openSide && (
        <SideContainer>
          <SideLogin>
            {!token && <SideLoginBtn onClick={goJoin}>회원가입</SideLoginBtn>}
            <SideLoginBtn onClick={token ? logout : goLogin}>
              {token ? "로그아웃" : "로그인"}
            </SideLoginBtn>
          </SideLogin>
        </SideContainer>
      )}
    </>
  );
};

export default Header;
