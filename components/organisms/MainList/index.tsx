"use client";

import { useEffect } from "react";
import Image from "next/image";

import useStates from "./state";
import useHandlers from "./handler";

import useHeaderStates from "@/components/organisms/Header/state";

import { ContentContainer, Content, Title } from "./style";
// import { addApolloState, initializeApollo } from "@/graphql/apollo";
// import { GetAnimeListDocument } from "@/graphql/queries/getAnimeList.graphql";

const MainList = () => {
  const states = useStates();
  const { aniInfo, setTitle, findAniInfo, router, title } = states;
  const { getAnimeListData, getAnimeByTitleData, findAni, searchText } =
    useHandlers(states);

  const headerStates = useHeaderStates();
  const { isMobile } = headerStates;

  useEffect(() => {
    getAnimeListData();
  }, []);

  return (
    <>
      <input type="text" onChange={e => searchText(e.target.value)} />
      <button onClick={() => getAnimeByTitleData(title)}>검색</button>

      <ContentContainer>
        {findAniInfo ? (
          <>
            {findAniInfo.getAnimeByTitle?.map((item, index) => {
              //결과 있음
              if (!item.image) return;
              return (
                <>
                  <Content
                    key={`${item.id}-${index}`}
                    onClick={() => {
                      router.push(`/list/${item.title}`);
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={`listImage_${index}`}
                      width={isMobile ? 140 : 280}
                      height={isMobile ? 220 : 440}
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                    />
                    <Title>{item.title}</Title>
                  </Content>
                </>
              );
            })}
          </>
        ) : (
          <>
            {aniInfo?.getAnimeList?.map((item, index) => {
              // 기본 리스트
              if (!item.image) return;
              return (
                <>
                  <Content
                    key={`${item.id}-${index}`}
                    onClick={() => {
                      router.push(`/list/${item.title}`);
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={`listImage_${index}`}
                      width={isMobile ? 140 : 280}
                      height={isMobile ? 220 : 440}
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                    />
                    <Title>{item.title}</Title>
                  </Content>
                </>
              );
            })}
          </>
        )}
      </ContentContainer>
    </>
  );
};

export default MainList;
