import { useEffect } from "react";
import Image from "next/image";

import useStates from "./state";
import useHandlers from "./handler";

import useHeaderStates from "@/components/organisms/Header/state";

import { ContentContainer, Content, Title } from "./style";
import { addApolloState, initializeApollo } from "@/graphql/apollo";
import { GetAnimeListDocument } from "@/graphql/queries/getAnimeList.graphql";

const MainList = () => {
  const states = useStates();
  const { aniInfo, router } = states;
  const { getAnimeListData } = useHandlers(states);

  const headerStates = useHeaderStates();
  const { isMobile } = headerStates;

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
      </ContentContainer>
    </>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GetAnimeListDocument,
    variables: {
      is_show: true,
    },
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}

export default MainList;
