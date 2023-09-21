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
  const [commentId, setCommentId] = useState<string>();

  const [expandedComments, setExpandedComments] = useState(
    new Array(commentList?.getCommentList.length).fill(false),
  );

  const [openRecomment, setOpenRecomment] = useState<boolean>();
  const [recomment, setRecomment] = useState<string>();
  const [recommentList, setRecommentList] = useState<GetCommentListQuery>();

  const [currentPage, setCurrentPage] = useState(1);

  const token = Cookies.get("token");

  const router = useRouter();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const PAGE_LIMIT = 10; // 페이지당 최대 개수

  const startIndex = (currentPage - 1) * PAGE_LIMIT;
  const endIndex = startIndex + PAGE_LIMIT;
  const currentCommentList = commentList?.getCommentList.slice(
    startIndex,
    endIndex,
  );

  const totalPages = Math.ceil(
    (commentList?.getCommentList.length || 0) / PAGE_LIMIT,
  );

  const getter = {
    router,
    getCommentList,
    comment,
    commentList,
    commentId,

    expandedComments,

    openRecomment,
    recomment,
    recommentList,

    currentPage,

    token,
    textareaRef,

    totalPages,
    currentCommentList,
  };
  const setter = {
    createComment,

    setComment,
    setCommentList,
    setCommentId,

    setExpandedComments,

    setOpenRecomment,
    setRecomment,
    setRecommentList,

    setCurrentPage,
  };

  return { ...getter, ...setter };
};

export default useStates;
