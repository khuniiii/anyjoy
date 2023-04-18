import { ComponentPropsWithoutRef, ReactNode } from "react";

import { ButtonStyled } from "./style";

export interface ButtonProps
  extends ComponentPropsWithoutRef<typeof ButtonStyled> {
  children: ReactNode;
}
