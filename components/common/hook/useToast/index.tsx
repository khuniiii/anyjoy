"use client";

import { useOverlay as tossUseToast } from "@toss/use-overlay";
import { useMemo } from "react";

import { Toast } from "@/components/common/Toast";

import { ToastWrapper } from "./style";
import { useToastProps } from "./type";

export function useToast() {
  const toast = tossUseToast();

  const ToastUI = ({
    title,
    content,
    duration = 5000,
    type,
  }: useToastProps) => {
    const onOpenChange = (isOpen: boolean) => !isOpen && toast.close();
    return useMemo(
      () => (
        <ToastWrapper type={type}>
          <Toast
            type={type}
            title={title}
            content={content}
            duration={duration}
            onOpenChange={onOpenChange}
          />
        </ToastWrapper>
      ),
      [type, title, content, duration],
    );
  };

  const open = ({ ...props }) => {
    const { title, content, duration, type } = props;
    toast.open(({ isOpen }) => {
      return (
        <>
          {isOpen && (
            <ToastUI
              title={title}
              content={content}
              duration={duration}
              type={type}
            />
          )}
        </>
      );
    });
  };

  const close = () => {
    toast.close();
  };

  return {
    success: ({ ...props }) => open({ ...props, type: "success" }),
    warn: ({ ...props }) => open({ ...props, type: "warn" }),
    error: ({ ...props }) => open({ ...props, type: "error" }),
    close: close,
  };
}
