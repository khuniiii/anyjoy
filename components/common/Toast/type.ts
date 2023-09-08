import { ComponentPropsWithoutRef } from "react";

import { ToastStyled } from "./style";

export interface ToastProps
  extends ComponentPropsWithoutRef<typeof ToastStyled> {
  title?: string;
  content?: string;
  duration: number;
  onOpenChange?: (open: boolean) => void;
  type?: "success" | "warn" | "error";
}
