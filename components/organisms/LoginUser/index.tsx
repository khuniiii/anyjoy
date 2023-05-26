import { signIn, useSession, signOut } from "next-auth/react";
import {
  Container,
  SocialBtn,
  SocialGroup,
  JoinGroup,
  JoinInput,
  JoinBtn,
} from "./style";

import useStates from "./state";
import useHandlers from "./handler";

const LoginUser = () => {
  const states = useStates();
  const {
    loginUserInfo,
    loginEmail,
    loginPassword,
    setLoginEmail,
    setLoginPassword,
  } = states;
  // const { getLoginInfoData } = useHandlers(states);
  const { data, status } = useSession();
  console.log(data, status);
  console.log(loginUserInfo);
  console.log(loginEmail, loginPassword);
  return (
    <>
      {data ? (
        <>
          {data.user?.name}님 반갑습니다
          <button onClick={() => signOut()}>로그아웃</button>
        </>
      ) : (
        <Container>
          <JoinGroup>
            <JoinInput
              placeholder="이메일"
              onChange={e => setLoginEmail(e.target.value)}
            />
            <JoinInput
              placeholder="비밀번호"
              onChange={e => setLoginPassword(e.target.value)}
            />
            <JoinBtn>로그인하기</JoinBtn>
          </JoinGroup>
          <SocialGroup>
            <SocialBtn social="naver" onClick={() => signIn("naver")}>
              네이버로 로그인
            </SocialBtn>
            <SocialBtn social="kakao" onClick={() => signIn("kakao")}>
              카카오로 로그인
            </SocialBtn>
          </SocialGroup>
        </Container>
      )}
    </>
  );
};

export default LoginUser;
