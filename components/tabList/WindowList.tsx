import WindowView, { Loading as WindowLoading } from "@/components/tabList/WindowView";
import Empty from "@/components/Empty";

export function Loading() {
  return <WindowLoading />;
}

export default function WindowList({
  state,
  windows,
}: {
  readonly state: Browser.windows.windowStateEnum;
  windows: Array<Browser.windows.Window>;
}) {
  return (
    <>
      <div className={`peer @container/windows columns-1 gap-4 space-y-4 lg:columns-2`}>
        {windows.map((w) => (
          <WindowView key={w.id} win={w} id={w.id!} />
        ))}
      </div>
      <div className={`hidden peer-empty:block`}>
        <Empty message={`No ${state} windows match search`} />
      </div>
    </>
  );
}
