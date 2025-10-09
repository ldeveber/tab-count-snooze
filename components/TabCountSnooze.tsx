import { ChartPieIcon, CloudMoonIcon, PanelTopIcon } from "lucide-react";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useAppConfig } from "#imports";
import ChartsTab, {
  Loading as ChartsTabLoading,
} from "@/components/tabs/ChartsTab";
import SnoozeTab, {
  Loading as SnoozeTabLoading,
} from "@/components/tabs/SnoozeTab";
import WindowsTab, {
  Loading as WindowsTabLoading,
} from "@/components/tabs/WindowsTab";
import { ModeToggle } from "@/components/theme/ThemeToggle";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataHandler from "@/lib/dataStore/DataHandler";
import DataProvider from "@/lib/dataStore/DataProvider";
import ErrorDisplay from "./ErrorDisplay";

export function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex flex-none items-center justify-center">
        <Skeleton className="h-12 w-sm rounded-full" />
      </div>
      <div className="flex size-full grow items-center justify-center">
        <Spinner />
      </div>
    </div>
  );
}

export default function TabCountSnooze() {
  const { isDev } = useAppConfig();
  const [tab, setTab] = useState("tab");
  const handleChange = (value: string) => {
    setTab(value);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <DataProvider>
        <DataHandler />
        <Tabs
          value={tab}
          onValueChange={handleChange}
          className="size-full flex-grow"
        >
          <div className="sticky top-0 z-1 flex h-14 items-center justify-center bg-background/50 px-4 py-2 backdrop-blur-xs">
            <TabsList variant="nav">
              <TabsTrigger value="tab" variant="nav">
                <PanelTopIcon className="size-4" /> Tab
              </TabsTrigger>
              <TabsTrigger value="count" variant="nav">
                <ChartPieIcon className="size-4" /> Count
              </TabsTrigger>
              <TabsTrigger value="snooze" variant="nav">
                <CloudMoonIcon className="size-4" /> Snooze
              </TabsTrigger>
            </TabsList>
            {isDev && <ModeToggle />}
          </div>
          <TabsContent value="tab">
            <ErrorBoundary FallbackComponent={ErrorDisplay}>
              <Suspense fallback={<WindowsTabLoading />}>
                <WindowsTab />
              </Suspense>
            </ErrorBoundary>
          </TabsContent>
          <TabsContent value="count" className="flex size-full">
            <ErrorBoundary FallbackComponent={ErrorDisplay}>
              <Suspense fallback={<ChartsTabLoading />}>
                <ChartsTab />
              </Suspense>
            </ErrorBoundary>
          </TabsContent>
          <TabsContent value="snooze">
            <ErrorBoundary FallbackComponent={ErrorDisplay}>
              <Suspense fallback={<SnoozeTabLoading />}>
                <SnoozeTab />
              </Suspense>
            </ErrorBoundary>
          </TabsContent>
        </Tabs>
      </DataProvider>
    </div>
  );
}
