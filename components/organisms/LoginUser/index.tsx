"use client";

import { signIn, useSession } from "next-auth/react";
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
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const LoginUser = () => {
  const states = useStates();
  const { setLoginEmail, setLoginPassword, router } = states;
  const { login } = useHandlers(states);
  const { data: session, status } = useSession();
  console.log("data:", session, "status: ", status);
  const searchParams = useSearchParams();
  const error = searchParams?.get("error");

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  });

  const signin = async (type: "naver" | "kakao") => {
    if (!searchParams) return;

    // if (error === "OAuthAccountNotLinked")
    //   await signIn(type, { callbackUrl: "/linkAccount" });

    await signIn(type);
  };

  return (
    <>
      {status === "unauthenticated" && (
        <Container>
          {error === "OAuthAccountNotLinked" && (
            <p>
              동일한 이메일의 계정이 존재합니다. 기존 계정으로 로그인해주세요.
            </p>
          )}
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
            <SocialBtn social="naver" onClick={() => signin("naver")}>
              네이버로 로그인
            </SocialBtn>
            <SocialBtn social="kakao" onClick={() => signin("kakao")}>
              카카오로 로그인
            </SocialBtn>
          </SocialGroup>
        </Container>
      )}
    </>
  );
};

export default LoginUser;
