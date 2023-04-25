import { styled } from "stitches.config";

export const ContentContainer = styled("div", {
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
  gridGap: "10px",
});

export const Content = styled("div", {
  display: "grid",
  placeItems: "center",
  marginTop: "30px",
});

export const Title = styled("p", {
  fontWeight: "500",
  fontSize: "20px",
  paddingTop: "10px",
});
