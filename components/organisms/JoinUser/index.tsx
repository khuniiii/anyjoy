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

const JoinUser = () => {
  const { data, status } = useSession();
  const states = useStates();
  const { joinUser } = useHandlers(states);
  console.log(data, status);
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
            <JoinInput placeholder="이메일"></JoinInput>
            <JoinInput placeholder="이름"></JoinInput>
            <JoinInput placeholder="비밀번호"></JoinInput>
            <JoinInput placeholder="전화번호"></JoinInput>
            <JoinInput placeholder="생년월일"></JoinInput>
            <JoinBtn onClick={joinUser}>회원가입하기</JoinBtn>
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

export default JoinUser;
