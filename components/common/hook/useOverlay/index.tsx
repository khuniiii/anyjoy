import {
  useOverlay as tossUseOverlay,
  OverlayProvider as TossOverlayProvider,
} from "@toss/use-overlay";
import { ReactNode } from "react";

import { OverlayWrapper } from "./style";
import { useOverlayProps } from "./type";

export function useOverlay() {
  const overlay = tossUseOverlay();
  const open = (children: () => ReactNode) => {
    overlay.open(({ isOpen }) => (
      <>{isOpen && <OverlayWrapper>{children()}</OverlayWrapper>}</>
    ));
  };

  const close = () => overlay.close();

  return { open: open, close: close };
}

export function OverlayProvider({ children }: useOverlayProps) {
  return <TossOverlayProvider>{children}</TossOverlayProvider>;
}
