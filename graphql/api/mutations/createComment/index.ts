import { GraphQLError } from "graphql";
import { Comment } from "@/lib/model/comment";

export const createComment = async (
  _: unknown,
  {
    input,
  }: {
    input: {
      commentId: string;
      comment: string;
    };
  },
) => {
  try {
    const comment = new Comment(input);
    const savedComment = await comment.save();

    if (false)
      throw new GraphQLError("", {
        extensions: { code: "UNAUTHENTICATED" },
      });

    return savedComment; // 저장된 데이터를 반환
  } catch (err) {
    console.error(err);
  }
};
