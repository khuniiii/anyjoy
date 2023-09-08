import { useEffect } from "react";

import useStates from "@/components/organisms/PostDetail/state";
import useHandlers from "@/components/organisms/PostDetail/handler";
import { formattedDate } from "@/utils/date/format";
import {
  PostContainer,
  PostWrapper,
  PostTitle,
  Divider,
  PostSub,
  PostContent,
  DelBtn,
} from "./style";
import { useSession } from "next-auth/react";

const PostDetail = () => {
  const { data: session } = useSession();
  const states = useStates();
  const { postData, router, setViewedPosts } = states;
  const { query } = router;

  const admin = session?.user.role;

  const { getOnePostByIdData, handleIncrementViews, deletePost } =
    useHandlers(states);

  useEffect(() => {
    if (typeof query._id === "string") {
      getOnePostByIdData(query._id);
    }
  }, [query._id]);

  useEffect(() => {
    const viewed = localStorage.getItem("viewedPosts");
    if (viewed) {
      setViewedPosts(JSON.parse(viewed));
    }
  }, []);

  if (typeof query._id === "string") handleIncrementViews(query._id);

  return (
    <>
      <PostContainer>
        {postData?.getOnePostById.map((item, index) => {
          return (
            <PostWrapper key={`${item._id}-${index}`}>
              <PostTitle>
                <p>{item.title}</p>
              </PostTitle>

              <PostSub>
                <p>[{item.type}]</p>
                <p>조회수: {item.views}</p>
                <p>
                  작성 일시:
                  {item.createdAt ? formattedDate(item.createdAt) : ""}
                </p>
                {admin && (
                  <DelBtn
                    onClick={() => item.type && deletePost(item._id, item.type)}
                  >
                    삭제
                  </DelBtn>
                )}
              </PostSub>

              <Divider />

              <PostContent>
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.content ? item.content : "",
                  }}
                />
              </PostContent>
            </PostWrapper>
          );
        })}
      </PostContainer>
    </>
  );
};

export default PostDetail;
