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
      allowDangerousEmailAccountLinking: true,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
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
    // async signIn({ user, account }) {
    //   const client = await MongoClient.connect(uri);
    //   const db = client.db();

    //   const linkedAccount = await db.collection("users").findOne({
    //     email: user.email,
    //   });

    //   console.log(linkedAccount, "linkedAccount");

    //   if (linkedAccount && account) {
    //     // If the OAuth account is already linked, return the corresponding user
    //     const FindAccounts = await db.collection("accounts").find({
    //       provider: account.provider,
    //       providerAccountId: account.providerAccountId,
    //       type: account.type,
    //     });

    //     const Accounts = await FindAccounts.toArray();

    //     if (Accounts.length) return true;
    //     else {
    //       console.log(1);

    //       await db.collection("accounts").insertOne(account);

    //       return true;
    //     }
    //   } else {
    //     // If the OAuth account is not linked, create a new user account and link it to the OAuth account
    //     await db.collection("users").insertOne({
    //       name: user.name,
    //       email: user.email,
    //       image: user.image,
    //     });

    //     // Return the newly created user
    //     return true;
    //   }
    // },
  },

  pages: {
    signIn: "/login",
    signOut: "/",
  },
};
