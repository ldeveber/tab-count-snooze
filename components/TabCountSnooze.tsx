import { ChartPieIcon, CloudMoonIcon, PanelTopIcon } from "lucide-react";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import CountTab, {
  Loading as CountTabLoading,
} from "@/components/count/CountTab";
import SnoozeTab, {
  Loading as SnoozeTabLoading,
} from "@/components/snooze/SnoozeTab";
import WindowsTab, {
  Loading as WindowsTabLoading,
} from "@/components/tab/WindowsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ErrorDisplay from "./ErrorDisplay";
import { SettingsSheet } from "./options/SettingsSheet";

export default function TabCountSnooze() {
  const [tab, setTab] = useState("tab");
  const handleChange = (value: string) => {
    setTab(value);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Tabs value={tab} onValueChange={handleChange} className="size-full grow">
        <div className="sticky top-0 z-1 flex h-14 items-center justify-center bg-card/50 px-4 py-2 backdrop-blur-xs">
          <TabsList variant="nav">
            <TabsTrigger value="tab" variant="nav">
              <PanelTopIcon className="size-4" strokeWidth={3} /> Tab
            </TabsTrigger>
            <TabsTrigger value="count" variant="nav" className="hidden md:flex">
              <ChartPieIcon className="size-4" strokeWidth={3} /> Count
            </TabsTrigger>
            <TabsTrigger value="snooze" variant="nav">
              <CloudMoonIcon className="size-4" strokeWidth={3} /> Snooze
            </TabsTrigger>
          </TabsList>
          <SettingsSheet />
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
            <Suspense fallback={<CountTabLoading />}>
              <CountTab />
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
    </div>
  );
}
