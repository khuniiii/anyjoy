import { useEffect } from "react";

import useStates from "@/components/organisms/PostComment/state";
import useHandlers from "@/components/organisms/PostComment/handler";

import {
  CommentInput,
  CommentBtn,
  CommentBtnWrap,
  NoCommentMsg,
  RecommentListContainer,
  CommentInputWrap,
  CommentTitle,
} from "./style";
import {
  PostInfo,
  PostListContainer,
  PostWrapper,
  Title,
} from "../PostList/style";
import { formattedDate } from "@/utils/date/format";
import { Divider } from "../PostDetail/style";

const CommentList = ({ id }: { id: string }) => {
  const states = useStates();

  const {
    router,
    setComment,
    comment,
    commentList,
    expandedComments,
    recomment,
    recommentList,
    setRecomment,
    token,
    textareaRef,
  } = states;

  const {
    getCommentListData,
    createCommentData,
    createRecommentData,
    toggleComment,
  } = useHandlers(states);

  useEffect(() => {
    getCommentListData(id);
  }, [commentList?.getCommentList.length]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [comment]);

  return (
    <>
      <div style={{ padding: "10px" }}>
        <CommentInputWrap>
          <CommentInput
            ref={textareaRef}
            rows={1}
            placeholder="댓글"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </CommentInputWrap>
        <CommentBtnWrap>
          <CommentBtn
            onClick={e => createCommentData(String(router.query._id), e)}
          >
            작성하기
          </CommentBtn>
        </CommentBtnWrap>
      </div>

      {commentList ? ( // router.query._id로 게시글에 대한 댓글들을 불러옴
        <CommentInputWrap>
          <PostListContainer>
            <CommentTitle>댓글</CommentTitle>
            <Divider post={true} />
            {commentList?.getCommentList.map((item, index) => {
              return (
                <>
                  <PostWrapper
                    key={`${item._id}-${index}`}
                    // onClick={() => movePostId(item._id)}
                    onClick={() => toggleComment(index, item._id)}
                  >
                    <Title size="item">{item.comment}</Title>
                    <PostInfo>
                      <p>
                        작성 일시:{" "}
                        {item.createdAt ? formattedDate(item.createdAt) : ""}
                      </p>
                    </PostInfo>
                  </PostWrapper>

                  {expandedComments[index] && ( // 클릭하여 해당 댓글에 대한 대댓글 영역을 펼침
                    <>
                      <CommentInputWrap recomment={true}>
                        <CommentInput
                          ref={textareaRef}
                          rows={1}
                          placeholder="대댓글"
                          value={recomment}
                          onChange={e => setRecomment(e.target.value)}
                        />
                      </CommentInputWrap>

                      <CommentBtnWrap recomment={true}>
                        <CommentBtn
                          onClick={e =>
                            createRecommentData(String(item._id), e)
                          }
                        >
                          대댓글 작성하기
                        </CommentBtn>
                      </CommentBtnWrap>

                      <>
                        {recommentList ? ( // 댓글의 id를 통해 대댓글 리스트를 조회하고 recommentList에 저장
                          <RecommentListContainer recomment={true}>
                            {recommentList?.getCommentList.map(
                              (item, index) => {
                                return (
                                  <>
                                    <PostWrapper
                                      key={`${item._id}-${index}`}
                                      // onClick={() => movePostId(item._id)}
                                      onClick={() =>
                                        toggleComment(index, item._id)
                                      }
                                    >
                                      <Title size="item">{item.comment}</Title>
                                      <PostInfo>
                                        <p>
                                          작성 일시:{" "}
                                          {item.createdAt
                                            ? formattedDate(item.createdAt)
                                            : ""}
                                        </p>
                                      </PostInfo>
                                    </PostWrapper>
                                  </>
                                );
                              },
                            )}
                          </RecommentListContainer>
                        ) : (
                          <NoCommentMsg>등록된 댓글이 없습니다.</NoCommentMsg>
                        )}
                      </>
                    </>
                  )}
                </>
              );
            })}
          </PostListContainer>
        </CommentInputWrap>
      ) : (
        <NoCommentMsg>등록된 댓글이 없습니다.</NoCommentMsg>
      )}
    </>
  );
};

export default CommentList;
