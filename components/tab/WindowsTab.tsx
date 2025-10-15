import { useMemo } from "react";
import type { Browser } from "#imports";
import SearchTabs from "@/components/SearchTabs";
import StickyTabSubMenuBar from "@/components/StickyTabSubMenuBar";
import TabCountTagline from "@/components/TabCountTagline";
import WindowList from "@/components/tab/WindowList";
import { Divider } from "@/components/ui/divider";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import {
  useIsFiltered,
  useTabCount,
  useWindowCount,
  useWindows,
} from "@/lib/dataStore";
import { ThresholdWarning } from "./ThresholdWarning";
import WindowsBulkActions from "./WindowsBulkActions";

export function Loading() {
  return (
    <div className="flex size-full grow flex-col gap-2">
      <StickyTabSubMenuBar>
        <Skeleton className="h-8 w-xs rounded-full" />
        <Skeleton className="h-5 w-32 rounded-full" />
      </StickyTabSubMenuBar>
      <div className="flex grow flex-col gap-4 @4xl/main:px-8 px-4 py-2">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Spinner />
            </EmptyMedia>
            <EmptyDescription>Loading...</EmptyDescription>
          </EmptyHeader>
        </Empty>
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
        <ThresholdWarning />

        <WindowList windows={open} />
        {minimized.length > 0 && (
          <Divider aria-label="Minimized Windows">Minimized</Divider>
        )}
        {minimized.length > 0 && <WindowList windows={minimized} minimized />}
      </div>
    </div>
  );
}
