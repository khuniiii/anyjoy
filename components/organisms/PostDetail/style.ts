import { styled } from "stitches.config";

export const PostContainer = styled("div", {
  width: "100%",
  height: "300px",

  padding: "10px",
});

export const PostWrapper = styled("div", {
  border: "1px solid red",
  borderRadius: "10px",
});

export const PostTitle = styled("div", {
  width: "100%",
  height: "auto",
  margin: "0 auto",
  padding: "10px",
  display: "flex",

  "@mobile": {
    padding: "10px 10px 5px",
  },

  p: {
    fontSize: "18px",
    fontWeight: "700",

    "@mobile": {
      fontSize: "16px",
    },
  },
});

export const PostSub = styled("div", {
  display: "flex",
  padding: "0 10px 5px",
  gap: "10px",

  p: {
    fontSize: "14px",
    fontWeight: "500",

    "@mobile": {
      fontSize: "12px",
    },
  },
});

export const Divider = styled("div", {
  border: "1px solid #000000",
  margin: "0 10px",
});

export const PostContent = styled("div", {
  display: "flex",
  padding: "10px ",

  fontSize: "16px",
  fontWeight: "500",
});

export const DelBtn = styled("button", {
  display: "flex",
  alignItems: "center", // align-items 값을 문자열로 변경
  justifyContent: "center", // justify-content 값을 문자열로 변경
  height: "18px",
  width: "36px",
  padding: "0", // padding 값을 '0'으로 설정
  border: "none",
  borderRadius: "5px",
  fontFamily: "SUIT",
  fontWeight: "500",
  fontSize: "10px",
  lineHeight: "24px",
  background: "#d8f7e6",
  cursor: "pointer",
  color: "#038235 !important",

  "@mobile": {
    width: "26px",
    height: "15px",
  },
});
