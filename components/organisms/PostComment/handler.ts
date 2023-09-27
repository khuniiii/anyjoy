import { useToast } from "@/components/common/hook/useToast";
import { StatesType } from "./type";

const useHandlers = (states: StatesType) => {
  const {
    getCommentList,

    createComment,

    params,

    comment,
    setComment,

    setCommentId,

    setCommentList,

    recomment,
    setRecomment,

    setRecommentList,

    expandedComments,
    setExpandedComments,

    currentPage,
    setCurrentPage,

    totalPages,

    setIsCommentUpdate,

    setIsRecommentUpdate,
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
        fetchPolicy: "no-cache",
      });

      setCommentList(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getRecommentListData = async (commentId: string) => {
    try {
      const { data } = await getCommentList({
        variables: {
          input: {
            commentId,
          },
        },
        fetchPolicy: "no-cache",
      });

      setRecommentList(data);
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
      commentId: params?._id?.toString() || "",
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
        });

        toast.success({
          title: "작성 완료",
          content: "댓글이 등록되었습니다.",
          duration: 5000,
        });

        setComment("");
        if (data !== null) {
          setIsCommentUpdate(data);
        }
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
        });

        toast.success({
          title: "작성 완료",
          content: "댓글이 등록되었습니다.",
          duration: 5000,
        });

        setRecomment("");

        if (data !== null) {
          setIsRecommentUpdate(data);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const toggleComment = async (index: number, commentId: string) => {
    setRecommentList(undefined); // 전에 클릭한 대댓글 리스트를 지우고 새로 불러오도록 init
    const updatedExpandedComments = [...expandedComments];
    updatedExpandedComments[index] = !updatedExpandedComments[index];
    setExpandedComments(updatedExpandedComments);

    setCommentId(commentId);
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
