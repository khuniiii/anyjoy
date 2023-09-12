import { useEffect, useState } from "react";

import useStates from "@/components/organisms/PostList/state";
import useHandlers from "@/components/organisms/PostList/handler";
import {
  PostInfo,
  PostListContainer,
  PostWrapper,
  Title,
  SelectBox,
  CreateBtn,
} from "./style";
import { formattedDate } from "@/utils/date/format";

const PostList = ({ title }: { title: string }): JSX.Element => {
  const states = useStates();
  const { OPTIONS, arrayType } = states;

  const {
    getPostByTypeData,
    movePostId,
    movePostCreate,
    viewOrderByTypeList,
    selectArrType,
  } = useHandlers(states);

  useEffect(() => {
    getPostByTypeData(title);
  }, []);

  return (
    <>
      <div style={{ padding: "10px" }}>
        <PostListContainer>
          <Title size="main">{title} 게시판</Title>
          <div style={{ display: "flex", paddingBottom: "10px" }}>
            <SelectBox onChange={e => selectArrType(e.target.value)}>
              {OPTIONS.map(option => {
                return (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                );
              })}
            </SelectBox>
          </div>

          {viewOrderByTypeList()?.map((item, index) => {
            return (
              <PostWrapper
                key={`${item.type}-${index}`}
                onClick={() => movePostId(item._id)}
              >
                <Title size="item">{item.title}</Title>
                <PostInfo>
                  <p>조회수: {item.views}&nbsp;</p>
                  <p>
                    생성일자:{" "}
                    {item.createdAt ? formattedDate(item.createdAt) : ""}
                  </p>
                </PostInfo>
              </PostWrapper>
            );
          })}

          <CreateBtn onClick={() => movePostCreate(title)}>
            작성하러 가기
          </CreateBtn>
        </PostListContainer>
      </div>
    </>
  );
};

export default PostList;
