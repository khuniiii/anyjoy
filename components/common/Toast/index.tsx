import { forwardRef, memo } from "react";
import * as ToastUI from "@radix-ui/react-toast";
import {
  faCircleCheck,
  faCircleExclamation,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

import {
  StyledToastIcon,
  StyledToastRoot,
  ToastDescription,
  ToastStyled,
  ToastTitle,
  ToastViewport,
} from "./style";
import { ToastProps } from "./type";

export const Toast = memo(
  forwardRef<HTMLDivElement, ToastProps>(
    ({ title, content, duration, onOpenChange, type, ...restProps }, ref) => {
      const handleClickClose = () => {
        onOpenChange && onOpenChange(false);
      };
      return (
        <ToastStyled ref={ref}>
          <ToastUI.Provider
            swipeDirection="right"
            duration={duration}
            {...restProps}
          >
            <StyledToastRoot
              type={type}
              onOpenChange={onOpenChange}
              onClick={handleClickClose}
            >
              <StyledToastIcon
                icon={
                  type === "success"
                    ? faCircleCheck
                    : type === "warn"
                    ? faCircleExclamation
                    : faCircleXmark
                }
              />
              <ToastTitle>{title}</ToastTitle>
              <ToastDescription>{content}</ToastDescription>
            </StyledToastRoot>
            <ToastViewport />
          </ToastUI.Provider>
        </ToastStyled>
      );
    },
  ),
);

Toast.displayName = "Toast";
