"use client";

import { useEffect } from "react";

import useStates from "@/components/organisms/PostCreate/state";
import useHandlers from "@/components/organisms/PostCreate/handler";

import dynamic from "next/dynamic";
import { CreateBtn, TitleInput } from "./style";

const EditorComponent = dynamic(
  () => import("@/components/organisms/PostCreate/QuillEditor"),
  {
    loading: () => <div>...loading</div>,
    ssr: false,
  },
);

const PostCreate = () => {
  const states = useStates();
  const { router, setTitle, setContent, content, token, params } = states;
  const { createPostByType } = useHandlers(states);

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

      <div style={{ padding: "10px", display: "flex" }}>
        <CreateBtn
          onClick={e => createPostByType(decodeURI(params!.type.toString()), e)}
        >
          작성하기
        </CreateBtn>
      </div>
    </>
  );
};

export default PostCreate;
