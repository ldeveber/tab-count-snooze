import { BarChart3Icon, GitBranchIcon, SunIcon } from "lucide-react";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  BarChart,
  Loading as BarChartLoading,
} from "@/components/charts/BarChart";
import {
  SankeyChart,
  Loading as SankeyChartLoading,
} from "@/components/charts/SankeyChart";
import {
  SunburstChart,
  Loading as SunburstChartLoading,
} from "@/components/charts/SunburstChart";
import ErrorDisplay from "@/components/ErrorDisplay";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import {
  TabsContent as BaseTabsContent,
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useAllTabs } from "@/lib/dataStore";
import StickyTabSubMenuBar from "../StickyTabSubMenuBar";
import TabCountTagline from "../TabCountTagline";

export function Loading() {
  return (
    <div className="flex flex-col">
      <StickyTabSubMenuBar>
        <div className="flex grow items-center gap-4">
          <Skeleton className="h-8 w-sm" />
        </div>
        <Skeleton className="h-5 w-32 rounded-full" />
      </StickyTabSubMenuBar>
      <div className="flex grow items-center justify-center">
        <Spinner />
      </div>
    </div>
  );
}

function TabsContent({
  children,
  ...props
}: Omit<React.ComponentProps<typeof BaseTabsContent>, "className">) {
  return (
    <BaseTabsContent
      className="flex grow flex-col gap-4 @4xl/main:px-8 px-4 py-2"
      {...props}
    >
      {children}
    </BaseTabsContent>
  );
}

export default function ChartsTab() {
  const [tab, setTab] = useState("bar");
  const handleChange = (value: string) => {
    setTab(value);
  };
  const tabs = useAllTabs();

  if (tabs.length === 0) {
    return <Loading />;
  }

  return (
    <Tabs value={tab} onValueChange={handleChange} className="flex-grow">
      <StickyTabSubMenuBar>
        <TabsList>
          <TabsTrigger value="bar">
            <BarChart3Icon className="size-4" /> Bar - Top Open Origins
          </TabsTrigger>
          <TabsTrigger value="sunburst">
            <SunIcon className="size-4" /> Sunburst - Top Open Tabs
          </TabsTrigger>
          <TabsTrigger value="sankey">
            <GitBranchIcon className="size-4" />
            Sankey - Top Open Tabs
          </TabsTrigger>
        </TabsList>
        <TabCountTagline />
      </StickyTabSubMenuBar>
      <TabsContent value="bar">
        <ErrorBoundary FallbackComponent={ErrorDisplay}>
          <Suspense fallback={<BarChartLoading />}>
            <BarChart />
          </Suspense>
        </ErrorBoundary>
      </TabsContent>
      <TabsContent value="sunburst">
        <ErrorBoundary FallbackComponent={ErrorDisplay}>
          <Suspense fallback={<SunburstChartLoading />}>
            <SunburstChart />
          </Suspense>
        </ErrorBoundary>
      </TabsContent>
      <TabsContent value="sankey">
        <ErrorBoundary FallbackComponent={ErrorDisplay}>
          <Suspense fallback={<SankeyChartLoading />}>
            <SankeyChart />
          </Suspense>
        </ErrorBoundary>
      </TabsContent>
    </Tabs>
  );
}
