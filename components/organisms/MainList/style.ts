import { styled } from "stitches.config";

export const ContentContainer = styled("div", {
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 2fr))",
  gridGap: "10px",

  "@mobile": {
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 2fr))",
  },
});

export const Content = styled("div", {
  display: "grid",
  placeItems: "center",
  marginTop: "30px",
  cursor: "pointer",

  img: {
    width: "100%",
    maxWidth: "280px",
    borderRadius: "15px",

    "@mobile": {
      maxWidth: "140px",
    },
  },
});

export const Title = styled("p", {
  fontWeight: "500",
  fontSize: "20px",
  paddingTop: "10px",

  "@mobile": {
    fontSize: "16px",
  },
});
