import React, { forwardRef, memo } from "react";

import { ButtonProps } from "./type";
import { ButtonStyled } from "./style";

export const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, ...restProps }, ref) => {
      return (
        <ButtonStyled {...restProps} ref={ref}>
          {children}
        </ButtonStyled>
      );
    },
  ),
);
