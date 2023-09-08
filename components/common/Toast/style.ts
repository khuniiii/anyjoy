import * as Toast from "@radix-ui/react-toast";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { keyframes, styled } from "stitches.config";

const VIEWPORT_PADDING = 25;

const hide = keyframes({
  "0%": { opacity: 1 },
  "100%": { opacity: 0 },
});

const slideIn = keyframes({
  from: { transform: `translateX(calc(100% + ${VIEWPORT_PADDING}px))` },
  to: { transform: "translateX(0)" },
});

const swipeOut = keyframes({
  from: { transform: "translateX(var(--radix-toast-swipe-end-x))" },
  to: { transform: `translateX(calc(100% + ${VIEWPORT_PADDING}px))` },
});

export const ToastStyled = styled("div", {
  width: "100%",
});

export const ToastViewport = styled(Toast.Viewport, {
  position: "fixed",
  top: 0,
  right: 0,
  display: "flex",
  flexDirection: "column",
  padding: VIEWPORT_PADDING,
  gap: 10,
  width: 390,
  maxWidth: "100vw",
  margin: 0,
  listStyle: "none",
  zIndex: 2147483647,
  outline: "none",
  "@mobile": {
    top: "70vh",
    padding: "35px",
    width: "100%",
  },
});

export const StyledToastRoot = styled(Toast.Root, {
  backgroundColor: "white",
  borderRadius: 6,
  boxShadow: "hsl(206 22% 7% / 35%) 0px 1px 9px -1px",
  padding: 20,
  display: "grid",
  gridTemplateAreas: '"title action" "description action"',
  gridTemplateColumns: "auto max-content",
  columnGap: 15,
  alignItems: "center",

  '&[data-state="open"]': {
    animation: `${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${hide} 100ms ease-in`,
  },
  '&[data-swipe="move"]': {
    transform: "translateX(var(--radix-toast-swipe-move-x))",
  },
  '&[data-swipe="cancel"]': {
    transform: "translateX(0)",
    transition: "transform 200ms ease-out",
  },
  '&[data-swipe="end"]': {
    animation: `${swipeOut} 100ms ease-out`,
  },

  variants: {
    type: {
      success: {
        "@mobile": {
          background: "#2CC06D",
          div: { color: "#FFF" },
        },
      },
      warn: {
        "@mobile": {
          background: "orange",
          div: { color: "#FFF" },
        },
      },
      error: {
        "@mobile": {
          background: "red",
          div: { color: "#FFF" },
        },
      },
    },
  },

  "@mobile": {
    padding: "10px",
    textAlign: "center",
    br: "50px",
  },
});

export const StyledToastIcon = styled(FontAwesomeIcon, {
  fontSize: "20px",
  "@mobile": { display: "none" },
});

export const ToastTitle = styled(Toast.Title, {
  gridArea: "title",
  marginBottom: 5,
  fontWeight: 500,
  color: "#000000",
  fontSize: 15,
  "@mobile": { display: "none" },
});

export const ToastDescription = styled(Toast.Description, {
  gridArea: "description",
  margin: 0,
  color: "#000000",
  fontSize: 13,
  lineHeight: 1.3,
});

export const ToastAction = styled(Toast.Action, {
  gridArea: "action",
});
