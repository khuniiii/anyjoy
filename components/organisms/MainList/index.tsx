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
                  router.push(`/list/${item.title}`);
                }}
              >
                <Image
                  src={item.image}
                  alt={`listImage_${index}`}
                  width={350}
                  height={550}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
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
