import { createStitches } from "@stitches/react";

export const { globalCss } = createStitches();

export const { styled } = createStitches({
  theme: {
    fonts: {
      suit: "SUIT, sans-serif",
    },
  },
});

export const { keyframes } = createStitches();
