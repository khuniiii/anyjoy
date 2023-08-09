import { useEffect } from "react";
import Image from "next/image";

import useStates from "@/components/organisms/DetailInfo/state";
import useHandlers from "@/components/organisms/DetailInfo/handler";
import { Content, ContentContainer, Title } from "./style";

const DetailInfo = () => {
  const states = useStates();
  const { router, aniInfo } = states;
  const { getAnimeByIdData } = useHandlers(states);

  useEffect(() => {
    if (router.query.id !== undefined) {
      getAnimeByIdData(Number(router.query.id));
    }
  }, [router.query.id !== undefined]);

  return (
    <>
      {aniInfo?.getAnimeById.map((item, index) => {
        if (!item.image) return;
        return (
          <>
            <ContentContainer>
              <Image
                src={item.image}
                alt={`listImage_${index}`}
                width={350}
                height={550}
              />
              <Content>
                <Title key={index}>{item.title}</Title>
                <Title key={index}>{item.author}</Title>
                <Title key={index}>{item.genre}</Title>
                <Title key={index}>{item.company}</Title>
                <Title key={index}>{item.year}</Title>
              </Content>
            </ContentContainer>
          </>
        );
      })}
    </>
  );
};

export default DetailInfo;
