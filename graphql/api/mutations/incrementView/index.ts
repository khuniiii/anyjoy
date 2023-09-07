import { GraphQLError } from "graphql";
import { Post } from "@/lib/model/post";

export const incrementView = async (
  _: unknown,
  {
    input,
  }: {
    input: { _id: string };
  },
) => {
  try {
    const post = await Post.findByIdAndUpdate(
      input._id,
      { $inc: { views: 1 } },
      { new: true },
    );

    if (!post) {
      throw new GraphQLError("Post not found");
    }
    return post;
  } catch (err) {
    console.error(err);
  }
};
