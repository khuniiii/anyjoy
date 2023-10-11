import { GraphQLError } from "graphql";
import { Comment } from "@/lib/model/comment";

export const deleteComment = async (
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
    const commentToDelete = await Comment.findById({
      _id: input._id,
    });

    // 게시물이 없으면 에러를 던집니다.
    if (!commentToDelete) {
      throw new GraphQLError("댓글을 찾을 수 없습니다.");
    }

    // 게시물을 삭제합니다.
    await commentToDelete.deleteOne();

    return { message: "댓글이 성공적으로 삭제되었습니다." };
  } catch (err) {
    console.error(err);
    throw new GraphQLError("댓글 삭제 중 오류가 발생했습니다.");
  }
};
