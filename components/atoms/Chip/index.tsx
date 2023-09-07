import React, { forwardRef, memo } from "react";

import { ChipProps } from "./type";
import { ChipStyled } from "./style";

export const Chip = memo(
  forwardRef<HTMLDivElement, ChipProps>(({ children, ...restProps }, ref) => {
    return (
      <ChipStyled {...restProps} ref={ref}>
        {children}
      </ChipStyled>
    );
  }),
);

Chip.displayName = "Chip";
