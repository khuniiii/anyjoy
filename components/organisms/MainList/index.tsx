"use client";

import { useEffect } from "react";
import Image from "next/image";

import useStates from "./state";
import useHandlers from "./handler";

import useHeaderStates from "@/components/organisms/Header/state";

import { Chip } from "@/components/atoms/Chip";

import {
  ContentContainer,
  Content,
  Title,
  SearchBar,
  SearchInput,
  SearchBtn,
} from "./style";

import Magnifer from "@/components/common/SVG/Magnifer";
import Refresh from "@/components/common/SVG/Refresh";

const MainList = () => {
  const states = useStates();
  const {
    aniInfo,
    findAniInfo,
    router,
    title,
    genre,
    searchType,
    setTitle,
    setGenre,
  } = states;
  const {
    getAnimeListData,
    getAnimeByTitleData,
    findAni,
    switchToTitleSearch,
    switchToGenreSearch,
    refresh,
  } = useHandlers(states);

  const headerStates = useHeaderStates();
  const { isMobile } = headerStates;

  useEffect(() => {
    getAnimeListData();
  }, []);

  useEffect(() => {
    getAnimeByTitleData();
  }, [title, genre]);

  console.log(searchType);

  return (
    <>
      <div
        style={{
          display: "flex",
          margin: "0 15px",
          fontSize: "12px",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* < color="green" onClick={switchToTitleSearch}>
            제목
          </> */}
          <div>
            <label>
              <input
                type="radio"
                value="title"
                checked={searchType === "title"}
                onChange={switchToTitleSearch}
              />
              제목
            </label>
          </div>

          <div>
            <label>
              <input
                type="radio"
                value="genre"
                checked={searchType === "genre"}
                onChange={switchToGenreSearch}
              />
              장르
            </label>
          </div>
        </div>
        <SearchBtn isRefresh={true} onClick={refresh}>
          <Refresh />
        </SearchBtn>
      </div>

      <div style={{ margin: "10px" }}>
        <SearchBar onSubmit={e => findAni(e)}>
          <SearchInput
            type="text"
            value={searchType === "title" ? title : genre}
            placeholder={
              searchType === "title"
                ? "제목 검색을 해주세요"
                : "장르 검색을 해주세요 ex) 스포츠 or 이세계"
            }
            onChange={e =>
              searchType === "title"
                ? setTitle(e.target.value)
                : setGenre(e.target.value)
            }
          />
          <SearchBtn onClick={() => getAnimeByTitleData()}>
            <Magnifer />
          </SearchBtn>
        </SearchBar>
      </div>

      <ContentContainer>
        {findAniInfo?.getAnimeList.length !== 0 ? (
          <>
            {findAniInfo?.getAnimeList.map((item, index) => {
              //결과 있음
              if (!item.image) return;
              return (
                <>
                  <Content
                    key={`${item._id}-${index}`}
                    onClick={() => {
                      router.push(`/list/${item._id}`);
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
                    key={`${item._id}-${index}`}
                    onClick={() => {
                      router.push(`/list/${item._id}`);
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
