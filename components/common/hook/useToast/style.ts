import { styled } from "stitches.config";

export const ToastWrapper = styled("div", {
  variants: {
    type: {
      success: { color: "green" },
      warn: { color: "orange" },
      error: { color: "red" },
    },
  },
});
