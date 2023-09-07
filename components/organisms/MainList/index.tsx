import { useEffect } from "react";
import Image from "next/image";

import useStates from "./state";
import useHandlers from "./handler";

import { ContentContainer, Content, Title } from "./style";

const MainList = () => {
  const states = useStates();
  const { aniInfo, router } = states;
  const { getAnimeListData } = useHandlers(states);

  useEffect(() => {
    getAnimeListData();
  }, []);

  return (
    <>
      <ContentContainer>
        {aniInfo?.getAnimeList?.map((item, index) => {
          if (!item.image) return;
          return (
            <>
              <Content
                key={`${item.title}-${index}`}
                onClick={() => {
                  router.push(`/list/${index + 1}`);
                }}
              >
                <Image
                  src={item.image}
                  alt={`listImage_${index}`}
                  width={350}
                  height={550}
                />
                <Title>{item.title}</Title>
              </Content>
            </>
          );
        })}
      </ContentContainer>
    </>
  );
};

export default MainList;
