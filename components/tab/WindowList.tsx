import type { Browser } from "#imports";
import Empty from "@/components/Empty";
import WindowView, {
  Loading as WindowLoading,
} from "@/components/tab/WindowView";

export function Loading() {
  return <WindowLoading />;
}

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
      <div className={`hidden peer-empty:block`}>
        <Empty
          message={`No ${minimized ? "minimized" : ""} windows match search`}
        />
      </div>
    </>
  );
}
