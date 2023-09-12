import { useToast } from "@/components/common/hook/useToast";
import { StatesType } from "./type";
import { GetPostByTypeDocument } from "@/graphql/queries/getPostByType.graphql";

const useHandlers = (states: StatesType) => {
  const { createPost, router, content, title } = states;
  const toast = useToast();

  const createPostByType = async (
    type: string,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const input = {
      title: title || "",
      content: content || "",
      type,
      views: 0,
    };

    if (title?.length === 0 || title === undefined) {
      toast.error({
        title: "작성 실패",
        content: "제목 입력해주세요.",
        duration: 5000,
      });
    } else if (content?.length === 0 || content === undefined) {
      toast.error({
        title: "작성 실패",
        content: "본문 입력해주세요.",
        duration: 5000,
      });
    } else {
      try {
        e.preventDefault();
        const { data } = await createPost({
          variables: {
            input: input,
          },
          refetchQueries: [
            {
              query: GetPostByTypeDocument,
              variables: { input: { type } },
            },
          ],
        });

        toast.success({
          title: "작성 완료",
          content: "글이 등록되었습니다.",
          duration: 5000,
        });

        router.push("/list");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return { createPostByType };
};

export default useHandlers;
