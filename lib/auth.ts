import { AuthOptions } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient, ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

import * as bcrypt from "bcrypt";

const uri: string = process.env.MONGODB_URI as string;

const cookiePrefix = "";
const useSecureCookies = false;

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(MongoClient.connect(uri)),

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
      authorize: async credentials => {
        if (!credentials)
          throw new Error("잘못된 입력값으로 인한 오류가 발생했습니다.");

        const client = await MongoClient.connect(uri);
        const user = await client.db().collection("users").findOne({
          email: credentials?.email,
        });

        if (!user) throw new Error("존재하지 않는 아이디입니다.");

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (isValid) {
          // 비밀번호가 일치하는 경우
          console.log("로그인 성공");
          client.close();
        } else {
          // 비밀번호가 일치하지 않는 경우
          console.log("로그인 실패");
          client.close();
          throw new Error("비밀번호가 일치하지 않습니다.");
        }

        if (user) {
          return user as any;
        } else {
          return null;
        }
      },
    }),
  ],

  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },

  jwt: {
    maxAge: 60 * 60,
  },

  events: {
    async linkAccount({ user, profile }) {
      if (!user.image && profile.image) {
        const client = await MongoClient.connect(uri);

        try {
          await client.connect();
          const db = client.db();
          const usersCollection = db.collection("users");

          // MongoDB에서 사용자 정보를 업데이트
          await usersCollection.updateOne(
            { _id: new ObjectId(user.id) },
            { $set: { image: profile.image } },
          );

          console.log("사용자 이미지 정보 업데이트 완료");
        } finally {
          client.close();
        }
      }
    },
    // 다른 이벤트 핸들러 추가 가능
  },

  callbacks: {
    async jwt({ token, user, account }) {
      const client = await MongoClient.connect(uri);
      // const db = client.db();
      // if (account?.provider === "kakao" || account?.provider === "naver") {
      //   const client = await MongoClient.connect(uri);
      //   const user = await client.db().collection("users").findOne({
      //     email: token?.email,
      //   });
      //   if (!user) {
      //     await db.collection("users").insertOne({
      //       email: token.email,
      //       name: token.name,
      //       role: "user",
      //     });
      //   }
      // }
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
    // async linkAccount({ linkToken, account }) {
    //   if (account?.provider === "naver" || account?.provider === "kakao") {
    //     const client = await MongoClient.connect(uri);
    //     const db = client.db();

    //     // 사용자의 소셜 로그인 정보와 연결하고자 하는 로직을 구현
    //     // 예를 들어, 사용자의 이메일과 소셜 로그인 정보를 비교하여 연결

    //     // 예제: 이메일이 일치하는 사용자를 찾아 계정을 연결
    //     const user = await db.collection("users").findOne({
    //       email: account.email,
    //     });

    //     if (user) {
    //       // 사용자를 찾았을 때 연결 처리
    //       console.log("계정 연결 성공");
    //       await client.close();
    //       return user;
    //     } else {
    //       // 사용자를 찾지 못했을 때 연결 실패 처리
    //       console.log("계정 연결 실패");
    //       await client.close();
    //       return null;
    //     }
    //   }
    // },
  },

  pages: {
    signIn: "/login",
    signOut: "/",
  },
};
