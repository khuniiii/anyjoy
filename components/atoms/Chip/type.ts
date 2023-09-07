import { ComponentPropsWithoutRef, ReactNode } from "react";

import { ChipStyled } from "./style";

export interface ChipProps extends ComponentPropsWithoutRef<typeof ChipStyled> {
  children: ReactNode;
  color?: ChipColorType;
}
export type ChipColorType =
  | "blue"
  | "yellow"
  | "lightYellow"
  | "gray"
  | "red"
  | "green";
