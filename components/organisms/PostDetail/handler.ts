import { GetPostByTypeDocument } from "@/graphql/queries/getPostByType.graphql";
import { StatesType } from "./type";

const useHandlers = (states: StatesType) => {
  const {
    getOnePostById,
    incrementView,
    deletePostById,
    setPostData,
    viewedPosts,
    setViewedPosts,
    router,
  } = states;

  const getOnePostByIdData = async (_id: string) => {
    try {
      const { data } = await getOnePostById({
        variables: {
          input: {
            _id,
          },
        },
      });
      setPostData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleIncrementViews = async (id: string) => {
    // 중복 조회 방지: 이미 조회한 포스트인지 체크
    if (!viewedPosts.includes(id)) {
      await incrementView({
        variables: {
          input: {
            _id: id,
          },
        },
      });
      setViewedPosts(prevViewedPosts => [...prevViewedPosts, id]);

      // 업데이트된 배열을 localStorage에 저장
      localStorage.setItem("viewedPosts", JSON.stringify([...viewedPosts, id]));
    }
  };

  const deletePost = async (_id: string, type: string) => {
    await deletePostById({
      variables: {
        input: {
          _id,
        },
      },
      refetchQueries: [
        {
          query: GetPostByTypeDocument,
          variables: { input: { type } },
        },
      ],
    });

    router.replace(`/list/${type}`);
  };

  return { getOnePostByIdData, handleIncrementViews, deletePost };
};

export default useHandlers;
