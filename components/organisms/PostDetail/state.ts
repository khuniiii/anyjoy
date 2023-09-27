import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
  const params = useParams();

  const getter = { getOnePostById, router, postData, viewedPosts, params };
  const setter = { incrementView, setPostData, setViewedPosts, deletePostById };

  return { ...getter, ...setter };
};

export default useStates;
