import NextAuth from "next-auth";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";

import * as bcrypt from "bcrypt";

const uri: string = process.env.MONGODB_URI as string;

export default NextAuth({
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },

  jwt: {
    maxAge: 60 * 60,
  },

  callbacks: {
    async jwt({ token, user, account, profile }) {
      console.log(333, token, user, account, profile);

      const client = await MongoClient.connect(uri);
      const db = client.db();

      if (account?.provider === "kakao") {
        const client = await MongoClient.connect(uri);
        const user = await client.db().collection("users").findOne({
          email: token?.email,
        });
        if (!user) {
          await db.collection("users").insertOne({
            email: token.email,
            name: token.name,
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
      console.log(111111111, session, token, user);
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

        bcrypt.hash(credentials.password, 10, function (err, hash) {
          if (err) {
            throw err;
          } else {
            bcrypt.compare(user?.password, hash, function (err, result) {
              if (err) {
                throw err;
              }
              if (!result) throw new Error("비밀번호가 불일치합니다.");

              console.log("result:", result);
            });
          }
        });

        if (user) {
          client.close();

          return user as any;
        } else {
          return null;
        }
      },
    }),
  ],
});
