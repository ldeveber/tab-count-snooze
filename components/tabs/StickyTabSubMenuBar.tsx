import type { PropsWithChildren } from "react";

export function Loading({ children }: PropsWithChildren) {
  return (
    <div className="sticky top-14 flex h-11 items-center justify-between gap-4 @4xl/main:px-8 @max-lg:px-4">
      {children}
    </div>
  );
}

export default function StickyTabSubMenuBar({ children }: PropsWithChildren) {
  return (
    <div className="sticky top-14 z-1 flex min-h-11 items-center justify-between gap-4 bg-background/50 @4xl/main:px-8 px-4 pb-2 backdrop-blur-xs">
      {children}
    </div>
  );
}
