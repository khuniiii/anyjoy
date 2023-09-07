import { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import {
  useGetPostByTypeLazyQuery,
  GetPostByTypeQuery,
} from "@/graphql/queries/getPostByType.graphql";

const useStates = () => {
  const [getPostByType] = useGetPostByTypeLazyQuery();
  const [postList, setPostList] = useState<GetPostByTypeQuery>();

  const router = useRouter();

  const token = Cookies.get("token");

  const getter = { getPostByType, router, postList, token };
  const setter = { setPostList };

  return { ...getter, ...setter };
};

export default useStates;
