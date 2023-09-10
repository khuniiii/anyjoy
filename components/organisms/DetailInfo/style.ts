import { styled } from "stitches.config";

export const ContentContainer = styled("div", {
  width: "100%",
  display: "flex", // 가로 정렬을 위한 설정
  flexDirection: "row", // 가로로 정렬
  alignItems: "center", // 세로 중앙 정렬

  padding: "10px 10px",

  img: {
    borderRadius: "15px",
  },

  "@mobile": {
    display: "block",
    image: {
      alignItems: "center",
    },
  },

  // image: {
  //   width: "100%",
  //   height: "auto",
  // },
});

export const Content = styled("div", {
  width: "50%",

  hegiht: "100%",

  p: {
    textAlign: "center",
  },

  div: {
    justifyContent: "center",
  },

  "@mobile": {
    width: "100%",
  },
});

export const Title = styled("p", {
  fontWeight: "500",
  fontSize: "20px",
  paddingTop: "10px",
});

export const ChipWrapper = styled("div", {
  alignItems: "center",
  paddingTop: "10px",
  display: "flex",
  // justifyContent: "center", // 중앙 정렬

  div: {
    alignItems: "center",
    display: "flex",
  },
});
