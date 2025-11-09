import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { storage } from "#imports";
import { TabStaleness } from "@/components/count/TabStaleness";
import ErrorDisplay from "@/components/ErrorDisplay";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { useTabCount } from "@/lib/dataStore";
import { SK_DISPLAYED_CHARTS } from "@/lib/storage";
import StickyTabSubMenuBar from "../StickyTabSubMenuBar";
import TabCountTagline from "../TabCountTagline";
import {
  ChartsMenu,
  type DisplayedChartConfig,
  defaultCharts,
} from "./ChartsMenu";
import { TabMapChart } from "./TabMapChart";
import { TopOriginsChart } from "./TopOriginsChart";

export function Loading() {
  return (
    <div className="flex flex-col">
      <StickyTabSubMenuBar>
        <Skeleton className="h-8 w-xs rounded-full" />
        <Skeleton className="h-5 w-32 rounded-full" />
      </StickyTabSubMenuBar>
      <div className="flex grow items-center justify-center">
        <Spinner />
      </div>
    </div>
  );
}

export default function CountTab() {
  const tabCount = useTabCount();
  const [options, setOptions] = useState(defaultCharts);

  useEffect(() => {
    storage.watch<DisplayedChartConfig>(SK_DISPLAYED_CHARTS, (newValue) => {
      setOptions(newValue ?? defaultCharts);
    });
    return () => storage.unwatch();
  }, []);

  if (tabCount === 0) {
    return <Loading />;
  }

  return (
    <div className="flex size-full grow flex-col gap-2">
      <StickyTabSubMenuBar>
        <ChartsMenu />
        <TabCountTagline />
      </StickyTabSubMenuBar>

      <div className="grid w-full grid-cols-2 gap-4 @4xl/main:px-8 px-4 py-2">
        {options.topOpenSites && (
          <ErrorBoundary FallbackComponent={ErrorDisplay}>
            <TopOriginsChart />
          </ErrorBoundary>
        )}
        {options.tabStaleness && (
          <ErrorBoundary FallbackComponent={ErrorDisplay}>
            <TabStaleness />
          </ErrorBoundary>
        )}
        {options.tabMap && (
          <ErrorBoundary FallbackComponent={ErrorDisplay}>
            <TabMapChart className="col-span-2" />
          </ErrorBoundary>
        )}
      </div>
    </div>
  );
}
