import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  useGetPostByTypeLazyQuery,
  GetPostByTypeQuery,
} from "@/graphql/queries/getPostByType.graphql";

const useStates = () => {
  const [getPostByType] = useGetPostByTypeLazyQuery();
  const [postList, setPostList] = useState<GetPostByTypeQuery>();

  const [arrayType, setArrayType] = useState<string>();

  const router = useRouter();

  const token = Cookies.get("token");

  const unsortedPostList = postList?.getPostByType;

  const OPTIONS = [
    { value: "view", name: "날짜순" },
    { value: "date", name: "조회순" },
  ];

  const viewOrderPostList =
    unsortedPostList &&
    [...unsortedPostList].sort((item1, item2) => {
      const views1 = item1.views ?? 0;
      const views2 = item2.views ?? 0;
      return views2 - views1;
    });

  const timeOrderPostList =
    unsortedPostList &&
    [...unsortedPostList].sort((item1, item2) => {
      const date1 = item1?.createdAt ? item1.createdAt : "";
      const date2 = item2?.createdAt ? item2.createdAt : "";

      return Number(date2) - Number(date1);
    });

  const getter = {
    getPostByType,
    arrayType,
    router,
    postList,
    token,
    unsortedPostList,
    viewOrderPostList,
    timeOrderPostList,
    OPTIONS,
  };
  const setter = { setPostList, setArrayType };

  return { ...getter, ...setter };
};

export default useStates;
