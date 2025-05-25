import { Divider } from "@mui/material";
import { useMemo } from "react";
import { useTabCount, useWindowCount, useWindows } from "@/utils/dataStore";
import WindowLoading from "./tab/window/WindowLoading";
import WindowView from "./tab/window/WindowView";

export function Loading() {
  return (
    <div className="flex flex-col gap-4 px-4 py-2">
      <WindowLoading />
    </div>
  );
}

export default function WindowsTab() {
  const windows = useWindows();
  const windowCount = useWindowCount();
  const tabCount = useTabCount();

  const {
    minimized,
    open,
  }: { minimized: Browser.windows.Window[]; open: Browser.windows.Window[] } = useMemo(
    () => ({
      minimized: windows.filter(({ state }) => state === "minimized"),
      open: windows.filter(({ state }) => state === "normal"),
    }),
    [windows],
  );

  if (windowCount === 0 || tabCount === 0) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4">
      {open.map((w) => (
        <WindowView key={w.id} windowId={w.id!} />
      ))}
      {minimized.length > 0 && <Divider aria-label="Minimized Windows">Minimized</Divider>}
      {minimized.map((w) => (
        <WindowView key={w.id} windowId={w.id!} />
      ))}
    </div>
  );
}
