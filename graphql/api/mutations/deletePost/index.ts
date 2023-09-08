import { GraphQLError } from "graphql";
import { Post } from "@/lib/model/post";

export const deletePost = async (
  _: unknown,
  {
    input,
  }: {
    input: {
      _id: string;
    };
  },
) => {
  try {
    // 게시물을 데이터베이스에서 찾아옵니다.
    const postToDelete = await Post.findById({
      _id: input._id,
    });

    // 게시물이 없으면 에러를 던집니다.
    if (!postToDelete) {
      throw new GraphQLError("게시물을 찾을 수 없습니다.");
    }

    // 게시물을 삭제합니다.
    await postToDelete.deleteOne();

    return { message: "게시물이 성공적으로 삭제되었습니다." };
  } catch (err) {
    console.error(err);
    throw new GraphQLError("게시물 삭제 중 오류가 발생했습니다.");
  }
};
