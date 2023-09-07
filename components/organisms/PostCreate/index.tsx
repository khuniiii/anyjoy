import { useEffect } from "react";

import useStates from "@/components/organisms/PostCreate/state";
import useHandlers from "@/components/organisms/PostCreate/handler";

import dynamic from "next/dynamic";
import { TitleInput } from "./style";

const EditorComponent = dynamic(
  () => import("@/components/organisms/PostCreate/QuillEditor"),
  {
    loading: () => <div>...loading</div>,
    ssr: false,
  },
);

const PostCreate = () => {
  const states = useStates();
  const { router, setTitle, setContent, title, content, token } = states;
  const { createPostByType } = useHandlers(states);

  console.log(title?.length, content?.length);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  useEffect(() => {
    if (!token) {
      alert("로그인 후 이용해주세요");
      router.replace("/");
    }
  }, [token]);

  return (
    <>
      <TitleInput
        type="text"
        placeholder="제목"
        onChange={e => setTitle(e.target.value)}
      />

      <EditorComponent
        value={content ? content : ""}
        onChange={handleContentChange}
      />

      <button onClick={e => createPostByType(String(router.query.type), e)}>
        작성하기
      </button>
    </>
  );
};

export default PostCreate;
