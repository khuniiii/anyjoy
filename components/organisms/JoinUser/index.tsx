"use client";

import { signIn, useSession, signOut } from "next-auth/react";
import {
  Container,
  SocialBtn,
  SocialGroup,
  JoinGroup,
  JoinInput,
  JoinBtn,
  ValidText,
} from "./style";

import useStates from "./state";
import useHandlers from "./handler";
import { useEffect } from "react";

const JoinUser = () => {
  const { data: session, status } = useSession();
  const states = useStates();
  const {
    joinEmail,
    joinName,
    joinPassword,
    joinPhoneNumber,
    joinBirth,
    validEmail,
    validName,
    validPassword,
    validPhoneNumber,
    validBirth,
    isValid,
  } = states;
  const {
    register,
    handleEmailChange,
    handleNameChange,
    handlePasswordChange,
    handlePhoneNumberChange,
    handleBirthChange,
    validateCheck,
  } = useHandlers(states);
  console.log(session, status);

  useEffect(() => {
    validateCheck();
  }, []);

  return (
    <>
      {session ? (
        <>
          {session.user?.name}님 반갑습니다
          <button onClick={() => signOut()}>로그아웃</button>
        </>
      ) : (
        <Container>
          <JoinGroup onSubmit={register}>
            <JoinInput
              placeholder="이메일"
              type="email"
              onChange={e => handleEmailChange(e.target.value)}
            />
            {joinEmail.length > 0 && !validEmail && (
              <ValidText>이메일 형식에 맞지 않습니다!</ValidText>
            )}
            <JoinInput
              placeholder="이름"
              type="text"
              onChange={e => handleNameChange(e.target.value)}
            />
            {joinName.length > 0 && !validName && (
              <ValidText>이름 형식에 맞지 않습니다! (최소 2자) </ValidText>
            )}
            <JoinInput
              placeholder="비밀번호"
              type="password"
              onChange={e => handlePasswordChange(e.target.value)}
            />
            {joinPassword.length > 0 && !validPassword && (
              <ValidText>
                비밀번호 형식에 맞지 않습니다!
                <br /> (8~16자, 숫자/대소문자/특수문자 !@#$%^&*-+ 포함)
              </ValidText>
            )}
            <JoinInput
              placeholder="전화번호"
              type="number"
              onChange={e => handlePhoneNumberChange(e.target.value)}
            />
            {joinPhoneNumber.length > 0 && !validPhoneNumber && (
              <ValidText>휴대전화번호 형식에 맞지 않습니다! (11자리)</ValidText>
            )}
            <JoinInput
              placeholder="출생년도 8자리"
              type="number"
              maxLength={8}
              onChange={e => handleBirthChange(Number(e.target.value))}
            />
            {Number(joinBirth) > 0 && !validBirth && (
              <ValidText>
                출생년도 형식에 맞지 않습니다! (연도 포함 8자리)
              </ValidText>
            )}
            <JoinBtn type="submit" disabled={!isValid}>
              회원가입하기
            </JoinBtn>
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
