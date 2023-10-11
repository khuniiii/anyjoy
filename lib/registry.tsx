"use client";

import { useServerInsertedHTML } from "next/navigation";
import { getCssText } from "stitches.config";

export function ServerStylesheet({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  useServerInsertedHTML(() => {
    return (
      <style
        id="stitches"
        dangerouslySetInnerHTML={{ __html: String(getCssText()) }}
      />
    );
  });

  return children;
}
