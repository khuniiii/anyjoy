import NextAuth from "next-auth";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { dbConnect } from "@/lib/dbConnect";

const uri: string = process.env.MONGODB_URI;

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "naver") {
        const client = await MongoClient.connect(uri);
        const user = await client.db().collection("users").findOne({
          email: token.email,
        });

        if (!user) {
          client.close();
          throw new Error("함께하고 있는 계정이 아니에요:(");
        }
      }
      return token;
    },
    session({ session }) {
      return session;
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
          type: "text",
          placeholder: "이메일을 입력해주세요.",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "비밀번호를 입력해주세요.",
        },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error("login error");
        const client = await MongoClient.connect(uri);
        const user = await client.db().collection("users").findOne({
          email: credentials.email,
        });

        // ......
        client.close();
        return { id: user!.id };
      },
    }),
  ],
});
