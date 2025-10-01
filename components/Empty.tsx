import { WindIcon } from "lucide-react";
import type { PropsWithChildren } from "react";

export default function Empty({
  children,
  message,
}: PropsWithChildren<{ message?: string }>) {
  return (
    <div className="flex size-full grow items-center justify-center gap-4 p-4">
      <div className="flex flex-row items-center gap-2 p-4">
        <WindIcon className="size-6 text-muted-foreground" />
        {message ? (
          <p className="text-muted-foreground text-sm">{message}</p>
        ) : null}
      </div>
      {children}
    </div>
  );
}
