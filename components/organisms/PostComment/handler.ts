import { useToast } from "@/components/common/hook/useToast";
import { StatesType } from "./type";
import {
  GetCommentListDocument,
  GetCommentListQuery,
} from "@/graphql/queries/getCommentList.graphql";

const useHandlers = (states: StatesType) => {
  const {
    getCommentList,
    createComment,
    router,
    setCommentList,
    setComment,
    setCommentId,
    comment,

    setRecomment,
    setRecommentList,
    recomment,
    recommentList,

    setExpandedComments,
    expandedComments,

    currentPage,
    setCurrentPage,
    totalPages,
  } = states;
  const toast = useToast();

  const getCommentListData = async (commentId: string) => {
    try {
      const { data } = await getCommentList({
        variables: {
          input: {
            commentId,
          },
        },
      });

      setCommentList(prevState => {
        if (data === undefined) {
          return prevState;
        }
        if (!prevState) {
          return data;
        }
        return {
          ...prevState,
          getCommentList: data.getCommentList,
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getRecommentListData = async (commentId: string) => {
    try {
      const { data, error } = await getCommentList({
        variables: {
          input: {
            commentId,
          },
        },
      });

      console.log(data, error, recommentList);

      setRecommentList(data);

      // setRecommentList(prevState => {
      //   if (data === undefined) {
      //     return prevState;
      //   }
      //   if (!prevState) {
      //     return data;
      //   }
      //   return {
      //     ...prevState,
      //     getCommentList: data.getCommentList,
      //   };
      // });
    } catch (error) {
      console.error(error);
    }
  };

  const createCommentData = async (
    commentId: string,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const input = {
      comment: comment || "",
      commentId: router.query._id?.toString() || "",
    };

    if (comment?.length === 0 || comment === undefined) {
      toast.error({
        title: "작성 실패",
        content: "댓글 입력해주세요.",
        duration: 5000,
      });
    } else {
      try {
        e.preventDefault();
        const { data } = await createComment({
          variables: {
            input: input,
          },
          refetchQueries: [
            {
              query: GetCommentListDocument,
              variables: { input: { commentId } },
            },
          ],
        });

        toast.success({
          title: "작성 완료",
          content: "댓글이 등록되었습니다.",
          duration: 5000,
        });
        setComment("");
        router.query._id && getCommentListData(router.query._id?.toString());
      } catch (error) {
        console.error(error);
      }
    }
  };

  const createRecommentData = async (
    commentId: string,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const input = {
      comment: recomment || "",
      commentId,
    };

    if (recomment?.length === 0 || recomment === undefined) {
      toast.error({
        title: "작성 실패",
        content: "댓글 입력해주세요.",
        duration: 5000,
      });
    } else {
      try {
        e.preventDefault();
        const { data } = await createComment({
          variables: {
            input: input,
          },
          refetchQueries: [
            {
              query: GetCommentListDocument,
              variables: { input: { commentId } },
            },
          ],
        });

        toast.success({
          title: "작성 완료",
          content: "댓글이 등록되었습니다.",
          duration: 5000,
        });
        setRecomment("");
        getRecommentListData(commentId);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const toggleComment = async (index: number, commentId: string) => {
    console.log(index, commentId);
    setRecommentList(undefined); // 전에 클릭한 대댓글 리스트를 지우고 새로 불러오도록 init
    const updatedExpandedComments = [...expandedComments];
    updatedExpandedComments[index] = !updatedExpandedComments[index];
    setExpandedComments(updatedExpandedComments);
    console.log(111, recommentList);

    setCommentId(commentId);
    console.log(222, recommentList);
    await getRecommentListData(commentId); // 댓글의 id를 넣어서 대댓글 리스트를 조회
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 다음 페이지로 이동
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return {
    getCommentListData,
    getRecommentListData,
    createCommentData,
    createRecommentData,
    toggleComment,
    goToPreviousPage,
    goToNextPage,
    goToPage,
  };
};

export default useHandlers;
