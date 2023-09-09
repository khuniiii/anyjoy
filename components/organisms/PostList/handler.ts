import { useToast } from "@/components/common/hook/useToast";
import { StatesType } from "./type";

const useHandlers = (states: StatesType) => {
  const { getPostByType, setPostList, router, token } = states;
  const toast = useToast();

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
      : toast.warn({
          title: "로그인",
          content: "로그인 후 이용해주세요!",
          duration: 3000,
        });
  };

  return { getPostByTypeData, movePostId, movePostCreate };
};

export default useHandlers;