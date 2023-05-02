import { GraphQLError } from "graphql";
import { User } from "@/lib/model/user";

export const createUserInfo = async (
  _: unknown,
  {
    input,
  }: {
    input: {
      email: string;
      name: string;
      password: string;
      phoneNum: string;
      birth: string;
    };
  },
) => {
  try {
    const userInfo = new User(input);
    const savedUserInfo = await userInfo.save();

    if (false)
      throw new GraphQLError("", {
        extensions: { code: "UNAUTHENTICATED" },
      });

    return savedUserInfo; // 저장된 데이터를 반환
  } catch (err) {
    console.error(err);
  }
};
