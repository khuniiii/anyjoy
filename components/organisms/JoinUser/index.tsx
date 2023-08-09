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
  const {
    setJoinEmail,
    setJoinName,
    setJoinPassword,
    setJoinPhoneNumber,
    setJoinBirth,
  } = states;
  const { register } = useHandlers(states);
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
          <JoinGroup onSubmit={register}>
            <JoinInput
              placeholder="이메일"
              type="email"
              onChange={e => setJoinEmail(e.target.value)}
            />
            <JoinInput
              placeholder="이름"
              type="text"
              onChange={e => setJoinName(e.target.value)}
            />
            <JoinInput
              placeholder="비밀번호"
              type="password"
              onChange={e => setJoinPassword(e.target.value)}
            />
            <JoinInput
              placeholder="전화번호"
              type="number"
              onChange={e => setJoinPhoneNumber(e.target.value)}
            />
            <JoinInput
              placeholder="주민번호앞자리"
              type="number"
              onChange={e => setJoinBirth(e.target.value)}
            />
            <JoinBtn type="submit">회원가입하기</JoinBtn>
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
