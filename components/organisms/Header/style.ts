import { styled } from "stitches.config";

export const HeaderContainer = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  background: "linear-gradient(to right, #1d976c, #91e4b0)",
  padding: "0px 20px",
});

export const HeaderList = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start" /* HeaderList 좌측부터 정렬 */,
});

export const HeaderText = styled("p", {
  maxWidth: "max-content",
  padding: "10px 18px",
  fontSize: "16px !important",
  lineHeight: "30px !important",

  fontWeight: "500",
  color: "#fff !important",

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
  color: "#fff !important",
  cursor: "pointer",
});
