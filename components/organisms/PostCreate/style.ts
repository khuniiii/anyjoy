import { styled } from "stitches.config";

export const TitleInput = styled("input", {
  border: "none",
  padding: "12px 15px",
  fontSize: "18px",
  width: "100%",

  "&:focus": {
    outline: "none",
  },
});

export const CreateBtn = styled("button", {
  display: "flex",
  margin: "0 auto",
  alignItems: "center", // align-items 값을 문자열로 변경
  justifyContent: "center", // justify-content 값을 문자열로 변경
  width: "150px",
  height: "40px",
  padding: "0", // padding 값을 '0'으로 설정
  border: "none",
  borderRadius: "15px",
  fontFamily: "SUIT",
  fontWeight: "500",
  fontSize: "16px",
  lineHeight: "24px",
  background: "#d8f7e6",
  cursor: "pointer",
  color: "#038235 !important",
});
