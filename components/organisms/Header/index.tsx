import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  HeaderContainer,
  HeaderList,
  HeaderText,
  AccountList,
  AccountText,
} from "./style";

const Header = () => {
  const { data: session, status } = useSession();
  console.log(session, status);
  return (
    <HeaderContainer>
      <HeaderList>
        <Link href="/test1" passHref>
          <HeaderText>test1</HeaderText>
        </Link>

        <Link href="/test1" passHref>
          <HeaderText>test2</HeaderText>
        </Link>

        <Link href="/test1" passHref>
          <HeaderText>test3</HeaderText>
        </Link>
      </HeaderList>

      <AccountList>
        {status === "authenticated" ? (
          <AccountText onClick={() => signOut()}>로그아웃</AccountText>
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
      </AccountList>
    </HeaderContainer>
  );
};

export default Header;
