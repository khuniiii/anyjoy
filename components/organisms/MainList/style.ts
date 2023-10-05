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

export const SearchBar = styled("form", {
  display: "flex",
  alignItems: "center",
  justifyContent: "right",
  padding: "0 20px",
});

export const SearchInput = styled("input", {
  display: "flex",
  alignItems: "center",

  width: "100%",
  height: "25px",
  borderRadius: "5px",
  padding: "10px",
  fontSize: "14px",
  fontWeight: "500",
  margin: "0px auto",
  gap: "5px",
});

export const SearchBtn = styled("button", {
  display: "flex",
  alignItems: "center",

  border: "1px solid transparent",
  backgroundColor: "#d8f7e6",
  color: "#038235",

  width: "80px",
  height: "25px",
  borderRadius: "5px",
  textAlign: "center",
  fontSize: "14px",
  fontWeight: "500",
  margin: "0px auto",

  justifyContent: "center",
});
