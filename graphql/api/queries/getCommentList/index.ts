import { Comment } from "@/lib/model/comment";

export const getCommentList = async (
  _: unknown,
  { input }: { input: { commentId: string } },
): Promise<unknown> => {
  const comment = await Comment.find({
    commentId: input.commentId,
  });

  if (comment.length === 0) {
    throw new Error(`Comment with commentId ${input.commentId} not found`);
  }

  return comment;
};
