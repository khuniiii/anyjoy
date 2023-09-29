"use client";

import { getProviders, signIn, useSession } from "next-auth/react";
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
import { useEffect, useState } from "react";

const LoginUser = () => {
  const states = useStates();
  const { setLoginEmail, setLoginPassword, router } = states;
  const { login } = useHandlers(states);
  const { data: session, status } = useSession();
  console.log("data:", session, "status: ", status);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  });

  return (
    <>
      {status === "unauthenticated" && (
        <Container>
          <JoinGroup onSubmit={login}>
            <JoinInput
              placeholder="이메일"
              onChange={e => setLoginEmail(e.target.value)}
            />
            <JoinInput
              type="password"
              placeholder="비밀번호"
              onChange={e => setLoginPassword(e.target.value)}
            />
            <JoinBtn type="submit">로그인하기</JoinBtn>
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
