import { Post } from "@/lib/model/post";

export const getOnePostById = async (
  _: unknown,
  { input }: { input: { _id: string } },
): Promise<unknown> => {
  const post = await Post.findOne({
    _id: input._id,
  });

  if (!post && post !== null) {
    throw new Error(`Post with type ${input._id} not found`);
  }

  return [post];
};
