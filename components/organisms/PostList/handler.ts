import { StatesType } from "./type";

const useHandlers = (states: StatesType) => {
  const { getPostByType, setPostList, router, token } = states;

  const getPostByTypeData = async (type: string) => {
    try {
      const { data } = await getPostByType({
        variables: {
          input: {
            type,
          },
        },
      });
      setPostList(data);
    } catch (error) {
      console.error(error);
    }
  };

  const movePostId = (id: string) => {
    router.push(`/post/${id}`);
  };

  const movePostCreate = (type: string) => {
    token
      ? router.push(`/post/create/${type}`)
      : alert("로그인 후 이용 가능합니다!");
  };

  return { getPostByTypeData, movePostId, movePostCreate };
};

export default useHandlers;
