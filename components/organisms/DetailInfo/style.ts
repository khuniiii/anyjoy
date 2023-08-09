import { styled } from "stitches.config";

export const ContentContainer = styled("div", {
  width: "100%",

  display: "grid",
  gridTemplateColumns: "350px 1fr",

  alignItems: "center", // 세로 중앙 정렬
  padding: "10px 0",

  image: {
    width: "100%",
    height: "auto",
  },
});

export const Content = styled("div", {
  width: "100%",
  display: "grid",
  gridTemplateRows: "auto auto auto auto auto",
  alignContent: "start", // 상단 정렬로 변경

  hegiht: "100%",
  textAlign: "center",
});

export const Title = styled("p", {
  fontWeight: "500",
  fontSize: "20px",
  paddingTop: "10px",
});
