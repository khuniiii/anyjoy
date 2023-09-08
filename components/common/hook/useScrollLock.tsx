import { useEffect } from "react";

export const useScrollLockBody = (isOpen?: boolean) => {
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
};
