import { keyframes, styled } from "stitches.config";

export const HeaderContainer = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  // background: "linear-gradient(to right, #038235, #d8f7e6)",
  backgroundColor: "#FFFFFF",
  padding: "0px 20px",
});

export const HeaderList = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start" /* HeaderList 좌측부터 정렬 */,
});

export const HeaderText = styled("p", {
  maxWidth: "max-content",
  padding: "10px 0px",
  fontSize: "16px !important",
  lineHeight: "30px !important",

  fontWeight: "500",
  color: "#038235 !important",

  cursor: "pointer",
});

export const AccountList = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end" /* AccountList 우측부터 정렬 */,
});

export const AccountText = styled("p", {
  maxWidth: "max-content",
  padding: "10px 18px",
  fontSize: "16px !important",
  lineHeight: "30px !important",
  fontWeight: "500",
  color: "#038235 !important",
  cursor: "pointer",
});

export const MobLogin = styled("div", {
  "@mobile": {
    display: "flex !important",
  },
  display: "none",
});

export const PcLogin = styled("div", {
  "@mobile": {
    display: "none !important",
  },
  display: "flex",
});

export const SideContainer = styled("div", {
  position: "fixed",
  display: "flex",
  width: "100%",

  height: "100vh",
  padding: "10px 20px 30px",
  backgroundColor: "#FFFFFF",
});

export const SideLogin = styled("div", {
  position: "fixed",
  right: "0px",
  bottom: "0px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  width: "100%",
  height: "100px",
  padding: "0px 16px",
  marginBottom: "30px",
});

export const SideLoginBtn = styled("button", {
  display: "flex",
  alignItems: "center", // align-items 값을 문자열로 변경
  justifyContent: "center", // justify-content 값을 문자열로 변경
  width: "100%",
  height: "56px",
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
