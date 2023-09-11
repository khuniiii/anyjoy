import { useEffect, useState } from "react";

import useStates from "@/components/organisms/PostList/state";
import useHandlers from "@/components/organisms/PostList/handler";
import {
  PostInfo,
  PostListContainer,
  PostWrapper,
  Title,
  CreateBtn,
} from "./style";
import { formattedDate } from "@/utils/date/format";

const PostList = ({ title }: { title: string }) => {
  const states = useStates();
  const { postList } = states;

  const { getPostByTypeData, movePostId, movePostCreate } = useHandlers(states);

  console.log(postList);

  useEffect(() => {
    getPostByTypeData(title);
  }, []);

  const tempArr = postList?.getPostByType;

  const viewOrderArray =
    tempArr &&
    [...tempArr].sort((item1, item2) => {
      const views1 = item1.views;
      const views2 = item2.views;
      return views2 - views1;
    });

  const timeOrderArray =
    tempArr &&
    [...tempArr].sort((item1, item2) => {
      const date1 = item1.createdAt;
      const date2 = item2.createdAt;
      return date2 - date1;
    });

  const [arrayType, setArrayType] = useState(true);
  const [arr, setArr] = useState<Array>(timeOrderArray);

  useEffect(() => {
    setArr(timeOrderArray);
    if (arrayType) {
      setArr(viewOrderArray);
    } else {
      setArr(timeOrderArray);
    }
  }, [arrayType]);

  return (
    <>
      <div style={{ padding: "10px" }}>
        <PostListContainer>
          <Title size="main">{title} 게시판</Title>
          <button onClick={() => setArrayType(false)}>날짜순</button>
          <button onClick={() => setArrayType(true)}>조회순</button>
          {arr &&
            arr.map((item, index) => {
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
