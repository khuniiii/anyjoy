import { signIn, useSession, signOut } from "next-auth/react";

const JoinUser = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <>
      {session ? (
        <>
          {session.user?.name}님 반갑습니다
          <button onClick={() => signOut()}>로그아웃</button>
        </>
      ) : (
        <>
          <button onClick={() => signIn("naver")}>네이버</button>
          <button onClick={() => signIn("kakao")}>카카오</button>
        </>
      )}
    </>
  );
};

export default JoinUser;
