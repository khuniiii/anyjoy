import { Post } from "@/lib/model/post";

export const getPostByType = async (
  _: unknown,
  { input }: { input: { type: string } },
): Promise<unknown> => {
  const post = await Post.find({
    type: input.type,
  });

  if (post.length === 0) {
    throw new Error(`Post with type ${input.type} not found`);
  }

  return post;
};
