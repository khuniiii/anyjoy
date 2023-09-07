import { createStitches } from "@stitches/react";

export const { globalCss } = createStitches();

export const { styled } = createStitches({
  theme: {
    fonts: {
      suit: "SUIT, sans-serif",
    },
  },
  media: {
    mobile: "(max-width: 550px)",
  },
});

export const { keyframes } = createStitches();
