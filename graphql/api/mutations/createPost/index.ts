import { GraphQLError } from "graphql";
import { Post } from "@/lib/model/post";

export const createPost = async (
  _: unknown,
  {
    input,
  }: {
    input: {
      title: string;
      content: string;
      type: string;
      views: number;
    };
  },
) => {
  try {
    const post = new Post(input);
    const savedPost = await post.save();

    if (false)
      throw new GraphQLError("", {
        extensions: { code: "UNAUTHENTICATED" },
      });

    return savedPost; // 저장된 데이터를 반환
  } catch (err) {
    console.error(err);
  }
};
