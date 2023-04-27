import { styled } from "stitches.config";

export const Container = styled("div", {
  width: "400px",
  height: "550px",
  backgroundColor: "#FFFFFF",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  position: "relative",
  margin: "auto",
  top: "10%",
  border: "10px solid transparent",
  borderRadius: "10px",
  backgroundImage:
    "linear-gradient(#fff, #fff), radial-gradient(circle at left top, #1a966b, #61c090, #91e4b0)",
  backgroundOrigin: "border-box",
  backgroundClip: "content-box, border-box",
  boxShadow: "6px 6px 32px 3px rgba(0, 0, 0, .2)",
});

export const SocialGroup = styled("div", {
  height: "100px",
  width: "80%",
  margin: "auto",
  marginBottom: "30px",
  display: "flex",
  flexDirection: "column",
});

export const JoinGroup = styled("div", {
  width: "80%",
  display: "flex",
  flexDirection: "column",
  margin: "auto",
});

export const JoinInput = styled("textarea", {
  height: "40px",
  width: "100%",
  borderRadius: "5px",
  resize: "none",
  margin: "auto",
  marginTop: "10px",
  padding: "10px 0 0 5px",
});

export const JoinBtn = styled("button", {
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "14px",
  height: "40px",
  width: "100%",
  borderRadius: "5px",
  marginTop: "10px",
  border: "none",
});

export const SocialBtn = styled("button", {
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "14px",
  height: "40px",
  width: "100%",
  borderRadius: "5px",
  marginTop: "10px",
  border: "none",
  variants: {
    social: {
      naver: {
        backgroundColor: "#04cf5b",
        color: "#FFFFFF",
      },
      kakao: {
        backgroundColor: "#fae100",
        color: "#000000",
      },
    },
  },
});
