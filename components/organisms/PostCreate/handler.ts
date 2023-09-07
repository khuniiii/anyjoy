import { StatesType } from "./type";
import { GetPostByTypeDocument } from "@/graphql/queries/getPostByType.graphql";

const useHandlers = (states: StatesType) => {
  const { createPost, router, content, title } = states;

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
      alert("제목 입력해주세요");
    } else if (content?.length === 0 || content === undefined) {
      alert("본문 입력해주세요");
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

        router.push("/list");
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return { createPostByType };
};

export default useHandlers;
