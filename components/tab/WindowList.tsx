import { WindIcon } from "lucide-react";
import type { Browser } from "#imports";
import WindowView from "@/components/tab/WindowView";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
} from "@/components/ui/empty";

export default function WindowList({
  minimized = false,
  windows,
}: {
  readonly minimized?: boolean;
  windows: Array<Browser.windows.Window>;
}) {
  return (
    <>
      <div
        className={`peer @container/windows columns-1 gap-4 space-y-4 lg:columns-2`}
      >
        {windows.map((w) => (
          // biome-ignore lint/style/noNonNullAssertion: stupid undefined :(
          <WindowView key={w.id} win={w} id={w.id!} />
        ))}
      </div>
      <div className="hidden font-medium peer-empty:block">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <WindIcon />
            </EmptyMedia>
            <EmptyDescription>
              No {minimized ? "minimized" : ""} windows match search
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    </>
  );
}
