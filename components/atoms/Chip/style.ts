import { styled } from "stitches.config";

export const ChipStyled = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  fontSize: "12px",
  fontWeight: "600",
  padding: "7px 11px",
  margin: "0 3px",
  borderRadius: "100px",
  width: "max-content",
  variants: {
    color: {
      blue: { backgroundColor: "#6165FF" },
      yellow: { backgroundColor: "#FFC061" },
      lightYellow: { color: "#9C7C08", backgroundColor: "#F9ECBE" },
      gray: { color: "#686A6C", backgroundColor: "#EFF0F1" },
      red: { color: "#FF2326", backgroundColor: "#FFEBEB" },
      green: { color: "#038235", backgroundColor: "#D8F7E6" },

      isNonActive: {
        color: "#038235",
        backgroundColor: "#FFFFFF",
        border: "1px solid #038235",
      },
    },
  },
  defaultVariants: {
    color: "blue",
  },
});
