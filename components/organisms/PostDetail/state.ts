import { useState } from "react";
import { useRouter } from "next/router";
import {
  useGetOnePostByIdLazyQuery,
  GetOnePostByIdQuery,
} from "@/graphql/queries/getOnePostById.graphql";
import { useIncrementViewMutation } from "@/graphql/mutations/incrementView.graphql";
import { useDeletePostMutation } from "@/graphql/mutations/deletePost.graphql";

const useStates = () => {
  const [getOnePostById] = useGetOnePostByIdLazyQuery();
  const [incrementView] = useIncrementViewMutation();
  const [deletePostById] = useDeletePostMutation();
  const [postData, setPostData] = useState<GetOnePostByIdQuery>();
  const [viewedPosts, setViewedPosts] = useState<string[]>([]);

  const router = useRouter();

  const getter = { getOnePostById, router, postData, viewedPosts };
  const setter = { incrementView, setPostData, setViewedPosts, deletePostById };

  return { ...getter, ...setter };
};

export default useStates;
