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
} from "./style";

const PostDetail = () => {
  const states = useStates();
  const { postData, router, setViewedPosts } = states;
  const { query } = router;

  const { getOnePostByIdData, handleIncrementViews } = useHandlers(states);

  console.log(query);

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
