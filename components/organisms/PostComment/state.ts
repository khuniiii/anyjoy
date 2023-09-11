import { useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  GetCommentListQuery,
  useGetCommentListLazyQuery,
} from "@/graphql/queries/getCommentList.graphql";
import { useCreateCommentMutation } from "@/graphql/mutations/createComment.graphql";

import Cookies from "js-cookie";

const useStates = () => {
  const [getCommentList] = useGetCommentListLazyQuery();
  const [createComment] = useCreateCommentMutation();
  const [comment, setComment] = useState<string>();
  const [commentList, setCommentList] = useState<GetCommentListQuery>();

  const [expandedComments, setExpandedComments] = useState(
    new Array(commentList?.getCommentList.length).fill(false),
  );

  const [openRecomment, setOpenRecomment] = useState<boolean>();
  const [recomment, setRecomment] = useState<string>();
  const [recommentList, setRecommentList] = useState<GetCommentListQuery>();

  const token = Cookies.get("token");

  const router = useRouter();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const getter = {
    router,
    getCommentList,
    comment,
    commentList,

    expandedComments,

    openRecomment,
    recomment,
    recommentList,

    token,
    textareaRef,
  };
  const setter = {
    createComment,

    setComment,
    setCommentList,

    setExpandedComments,

    setOpenRecomment,
    setRecomment,
    setRecommentList,
  };

  return { ...getter, ...setter };
};

export default useStates;
