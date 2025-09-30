import { useMemo } from "react";
import SearchTabs from "@/components/SearchTabs";
import WindowList, {
  Loading as WindowListLoading,
} from "@/components/tabList/WindowList";
import { Divider } from "@/components/ui/divider";
import {
  useIsFiltered,
  useTabCount,
  useWindowCount,
  useWindows,
} from "@/utils/dataStore";
import StickyTabSubMenuBar, {
  Loading as StickyTabSubMenuBarLoading,
} from "./StickyTabSubMenuBar";
import TabCountTagline from "./TabCountTagline";
import WindowsBulkActions from "./WindowsBulkActions";

export function Loading() {
  return (
    <div className="flex flex-col">
      <StickyTabSubMenuBarLoading>
        <div className="bg- h-8 w-sm" />
      </StickyTabSubMenuBarLoading>
      <div className="flex grow flex-col gap-4 @4xl/main:px-8 px-4 py-2">
        <WindowListLoading />
      </div>
    </div>
  );
}

export default function WindowsTab() {
  const windows = useWindows();
  const windowCount = useWindowCount();
  const tabCount = useTabCount();
  const isFiltered = useIsFiltered();

  const {
    minimized,
    open,
  }: { minimized: Browser.windows.Window[]; open: Browser.windows.Window[] } =
    useMemo(
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
    <div className="flex size-full grow flex-col gap-2">
      <StickyTabSubMenuBar>
        <div className="flex items-center gap-4">
          <SearchTabs />
        </div>
        {isFiltered ? <WindowsBulkActions /> : <TabCountTagline />}
      </StickyTabSubMenuBar>

      <div className="flex grow flex-col gap-4 @4xl/main:px-8 px-4 py-2">
        <WindowList windows={open} />
        {minimized.length > 0 && (
          <Divider aria-label="Minimized Windows">Minimized</Divider>
        )}
        {minimized.length > 0 && <WindowList windows={minimized} minimized />}
      </div>
    </div>
  );
}
