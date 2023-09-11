import { styled } from "stitches.config";

export const CommentInput = styled("textarea", {
  border: "none",

  fontSize: "18px",
  width: "100%",
  backgroundColor: "#e5e5e5",
  padding: "10px",
  borderRadius: "10px",
  resize: "none",
  height: "auto",
  overflow: "hidden",
  fontFamily: "Noto Sans KR",

  "@mobile": {
    fontSize: "14px",
  },

  "&:focus": {
    outline: "none",
  },
});

export const CommentBtn = styled("button", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  padding: "5px",

  border: "none",
  borderRadius: "5px",

  fontSize: "14px",
  fontWeight: "500",

  background: "#d8f7e6",
  cursor: "pointer",
  color: "#038235",
});

export const CommentBtnWrap = styled("div", {
  padding: "0 10px 10px",
  display: "flex",
  justifyContent: "flex-end",

  variants: {
    recomment: {
      true: {
        padding: "0px 0px 10px 10px",
      },
    },
  },
});

export const NoCommentMsg = styled("p", {
  padding: "10px",
  textAlign: "center",
});

export const RecommentListContainer = styled("div", {
  width: "100%",
  margin: "0 auto",

  padding: "10px",

  gap: "10px" /* 아이템 간격 조절 */,

  variants: {
    recomment: {
      true: {
        padding: "10px 0px 15px 10px",
      },
    },
  },
});

export const CommentInputWrap = styled("div", {
  padding: "10px",

  variants: {
    recomment: {
      true: {
        padding: "10px 0px 10px 10px",
      },
    },
  },
});

export const CommentTitle = styled("p", {
  fontSize: "18px",
  fontWeight: "700",

  marginBottom: "10px",
});

export const MoveBtn = styled("button", {
  background: "#d8f7e6",
  color: "#038235",

  border: "1px solid transparent",
});
