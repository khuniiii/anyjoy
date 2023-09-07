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
  marginLeft: "10px",
});

export const PostContent = styled("div", {
  display: "flex",
  padding: "10px ",

  fontSize: "16px",
  fontWeight: "500",
});
