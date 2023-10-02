import { styled } from "stitches.config";

export const PostListContainer = styled("div", {
  width: "100%",
  margin: "0 auto",

  borderRadius: "10px",

  padding: "10px",

  gap: "10px" /* 아이템 간격 조절 */,
});

export const PostWrapper = styled("li", {
  display: "flex",
  flexDirection: "column" /* 세로로 아이템 정보 배치 */,
  alignItems: "flex-start" /* 왼쪽 정렬 (수평) */,
  marginBottom: "10px",
  cursor: "pointer",

  padding: "10px",
  backgroundColor: "#E5E5E5",
  border: "1px solid transparent",
  borderRadius: "5px",

  "&:last-child": {
    marginBottom: "0",
  },

  variants: {
    isRecomment: {
      true: {
        backgroundColor: "#BEBEBE",
      },
    },
  },
});

export const Title = styled("p", {
  variants: {
    size: {
      main: {
        fontSize: "18px",
        fontWeight: "700",
        marginBottom: "20px",
      },

      item: {
        fontSize: "16px",
        fontWeight: "500",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        maxWidth: "100%",
      },
    },
  },
});

export const PostInfo = styled("div", {
  p: {
    marginRight: "5px" /* 아이템 정보 사이의 간격 조절 */,
    fontSize: "14px" /* 글자 크기 조정 */,
  },

  display: "flex",
  alignItems: "center",
});

export const CreateBtn = styled("button", {
  border: "1px solid transparent",
  backgroundColor: "#d8f7e6",
  color: "#038235",
  display: "flex",
  width: "100px",
  height: "30px",
  borderRadius: "5px",
  textAlign: "center",
  fontSize: "14px",
  fontWeight: "500",
  margin: "0 auto",
  alignItems: "center",
  justifyContent: "center ",
});

export const SelectBox = styled("select", {
  outline: "none",
  border: "none",
  backgroundColor: "#d8f7e6",
  color: "#038235",
  padding: "5px",

  marginLeft: "auto",
});
