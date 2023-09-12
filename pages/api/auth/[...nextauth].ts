import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";
// import clientPromise from "@/lib/mongodb";

import * as bcrypt from "bcrypt";

const uri: string = process.env.MONGODB_URI as string;

export default NextAuth({
  adapter: MongoDBAdapter(MongoClient.connect(uri)),

  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },

  jwt: {
    maxAge: 60 * 60,
  },

  callbacks: {
    async jwt({ token, user, account }) {
      const client = await MongoClient.connect(uri);
      const db = client.db();

      if (account?.provider === "kakao" || account?.provider === "naver") {
        const client = await MongoClient.connect(uri);
        const user = await client.db().collection("users").findOne({
          email: token?.email,
        });
        if (!user) {
          await db.collection("users").insertOne({
            email: token.email,
            name: token.name,
            role: "user",
          });
        }
      }

      if (user) {
        token.name = user.name;
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token, user }) {
      session.user.role = token.role as string;

      const testToken = jwt.sign(token, process.env.SECRET as string);
      session.user.token = testToken;

      return session;
    },
  },

  pages: {
    signIn: "/",
    signOut: "/",
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
        if (!credentials)
          throw new Error("잘못된 입력값으로 인한 오류가 발생했습니다.");

        const client = await MongoClient.connect(uri);
        const user = await client.db().collection("users").findOne({
          email: credentials?.email,
        });

        if (!user) throw new Error("존재하지 않는 아이디입니다.");

        // const saltRounds = 12; // 회원가입 시 사용한 솔트 라운드 수
        // const hashedPassword = bcrypt.hashSync(
        //   credentials.password,
        //   saltRounds,
        // );

        // const isValid = bcrypt.compareSync(hashedPassword, user.password);

        // console.log(
        //   isValid,
        //   credentials.password,
        //   hashedPassword,
        //   user.password,
        // );

        // if (isValid) {
        //   // 비밀번호가 일치하는 경우
        //   console.log("로그인 성공");
        //   client.close();
        // } else {
        //   // 비밀번호가 일치하지 않는 경우
        //   console.log("로그인 실패");
        //   client.close();
        //   throw new Error("credentials error");
        // }

        bcrypt.hash(credentials.password, 12, function (err, hash) {
          if (err) {
            throw err;
          } else {
            bcrypt.compare(user.password, hash, function (err, result) {
              if (err) {
                throw err;
              }
              console.log(result, user.password, hash);
              if (!result) {
                throw new Error("credentials error");
              } else {
                client.close();
                return user;
              }
            });
          }
        });

        if (user) {
          return user as any;
        } else {
          return null;
        }
      },
    }),
  ],
});
