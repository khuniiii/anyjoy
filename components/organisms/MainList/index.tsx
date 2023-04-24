import { useEffect } from "react";
import Image from "next/image";

import useStates from "./state";
import useHandlers from "./handler";

import { ContentContainer, Content } from "./style";

const MainList = () => {
  const states = useStates();
  const { aniInfo } = states;
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
              <Content key={index}>
                <Image
                  src={item.image}
                  alt={`listImage_${index}`}
                  width={200}
                  height={300}
                />
              </Content>
            </>
          );
        })}
      </ContentContainer>
    </>
  );
};

export default MainList;
