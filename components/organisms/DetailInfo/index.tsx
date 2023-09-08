import { useEffect } from "react";
import Image from "next/image";

import useStates from "@/components/organisms/DetailInfo/state";
import useHandlers from "@/components/organisms/DetailInfo/handler";
import { ChipWrapper, Content, ContentContainer, Title } from "./style";
import { Chip } from "@/components/atoms/Chip";
import PostList from "@/components/organisms/PostList/index";

const DetailInfo = () => {
  const states = useStates();
  const { router, aniInfo } = states;
  const { getAnimeByTitleData } = useHandlers(states);

  useEffect(() => {
    if (router.query.title !== undefined) {
      getAnimeByTitleData(router.query.title.toString());
    }
  }, [router.query.title !== undefined]);

  console.log(router, aniInfo);

  return (
    <>
      {aniInfo?.getAnimeByTitle.map((item, index) => {
        if (!item.image || !item.genre) return;
        return (
          <>
            <ContentContainer>
              <div
                style={{
                  width: "100%",
                  maxWidth: "350px",
                  minHeight: "400px",
                  height: "500px",
                  position: "relative",
                  margin: "0 auto",
                }}
              >
                {/* <Image
                  src={item.image}
                  alt={`listImage_${index}`}
                  layout="fill"
                /> */}
              </div>

              <Content>
                <Title key={index}>&lt;{item.title}&gt;</Title>
                <Title key={index}>{item.author} 作</Title>
                <Title key={index}>{item.company} 연재</Title>
                <Title key={index}>{item.year}년 발매</Title>
                <ChipWrapper>
                  {item.genre.map((genre, genreIndex) => (
                    <Chip color="green" key={genreIndex}>
                      {genre}
                    </Chip>
                  ))}
                </ChipWrapper>
              </Content>
            </ContentContainer>

            <div style={{ paddingBottom: "40px" }}>
              <PostList title={aniInfo.getAnimeByTitle[0].title as string} />
            </div>
          </>
        );
      })}
    </>
  );
};

export default DetailInfo;
