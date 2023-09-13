import { useEffect } from "react";

import CommentList from "@/components/organisms/PostComment";

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
  PostType,
} from "./style";
import { useSession } from "next-auth/react";

const PostDetail = () => {
  const { data: session } = useSession();
  const states = useStates();
  const { postData, router, setViewedPosts } = states;
  const { query } = router;

  const admin = session?.user.role === "admin";

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

  console.log(session?.user.role);

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
                <PostType onClick={() => router.push(`/list/${item.type}`)}>
                  <p>[{item.type}]</p>
                </PostType>
                <p>조회수: {item.views}</p>
                <p>
                  작성 일시:&nbsp;
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
                  style={{ width: "100%" }}
                  dangerouslySetInnerHTML={{
                    __html: item.content ? item.content : "",
                  }}
                />
              </PostContent>
            </PostWrapper>
          );
        })}
      </PostContainer>

      {query._id && <CommentList id={query._id.toString()} />}
    </>
  );
};

export default PostDetail;
