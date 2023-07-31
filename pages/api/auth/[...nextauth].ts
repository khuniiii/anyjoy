import NextAuth from "next-auth";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";

const uri: string = process.env.MONGODB_URI as string;

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session({ session, user }) {
      console.log(222, session, user);
      return { session, user };
    },
  },

  pages: {
    signIn: "/login",
  },
  providers: [
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID as string,
      clientSecret: process.env.NAVER_CLIENT_SECRET as string,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "string",
          placeholder: "이메일을 입력해주세요.",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "비밀번호를 입력해주세요.",
        },
      },

      async authorize(credentials) {
        const client = await MongoClient.connect(uri);
        const user = await client.db().collection("users").findOne({
          email: credentials?.email,
        });

        if (user) {
          console.log(111, user);
          client.close();
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
});
