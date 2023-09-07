import { useState } from "react";
import { useRouter } from "next/router";
import { useCreatePostMutation } from "@/graphql/mutations/createPost.graphql";

import Cookies from "js-cookie";

const useStates = () => {
  const [createPost] = useCreatePostMutation();
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();

  const token = Cookies.get("token");

  const router = useRouter();

  const getter = { router, title, content, token };
  const setter = { createPost, setTitle, setContent };

  return { ...getter, ...setter };
};

export default useStates;
