import { DefaultSession } from "next-auth";

// user 객체에 id와 acceessToken 프로퍼티 타입을 추가함
declare module "next-auth" {
  interface Session extends DefaultSession {
    session: Session;
    expires: ISODateString;
    user: User;
  }

  interface User {
    email: string;
    id: string;
    role: string;
    token: JWT;
  }
}
