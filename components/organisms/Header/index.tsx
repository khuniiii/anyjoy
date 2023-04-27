import Link from "next/link";
import {
  HeaderContainer,
  HeaderList,
  HeaderText,
  AccountList,
  AccountText,
} from "./style";

const Header = () => {
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
        <Link href="/join" passHref>
          <AccountText>로그인</AccountText>
        </Link>

        <Link href="/join" passHref>
          <AccountText>회원가입</AccountText>
        </Link>
      </AccountList>
    </HeaderContainer>
  );
};

export default Header;
