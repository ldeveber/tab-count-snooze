import { TabContext, TabPanel as MuiTabPanel, TabPanelProps } from "@mui/lab";
import { CircularProgress } from "@mui/material";
import { Suspense, SyntheticEvent, useState } from "react";
import DataHandler from "@/utils/dataStore/DataHandler";
import DataProvider from "@/utils/dataStore/DataProvider";
import ChartsTab, { Loading as ChartsTabLoading } from "@/components/tabs/ChartsTab";
import SnoozeTab, { Loading as SnoozeTabLoading } from "@/components/tabs/SnoozeTab";
import WindowsTab, { Loading as WindowsTabLoading } from "@/components/tabs/WindowsTab";
import "@/utils/charts/initializeCharts";
import ErrorDisplay from "./ErrorDisplay";
import { ErrorBoundary } from "react-error-boundary";
import { TabValue } from "./tabs/types";
import TabSubMenuBar, { Loading as TabSubMenuBarLoading } from "./tabs/TabSubMenuBar";
import TabMenuBar, { Loading as TabMenuBarLoading } from "./tabs/TabMenuBar";

function TabPanel({ children, ...props }: TabPanelProps) {
  return (
    <MuiTabPanel {...props} sx={{ p: 0 }} className="flex size-full grow flex-col px-4 py-2">
      <ErrorBoundary FallbackComponent={ErrorDisplay}>{children}</ErrorBoundary>
    </MuiTabPanel>
  );
}

export function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <TabMenuBarLoading />
      <TabSubMenuBarLoading />
      <div className="flex h-full grow flex-col items-center justify-center gap-4 px-4 py-2">
        <CircularProgress />
      </div>
    </div>
  );
}

export default function TabCountSnooze() {
  const [tab, setTab] = useState<TabValue>(TabValue.Tab);
  const handleChange = (_e: SyntheticEvent, newValue: TabValue) => {
    setTab(newValue);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <DataProvider>
        <DataHandler />
        <TabContext value={tab}>
          <TabMenuBar onChange={handleChange} />
          <TabSubMenuBar value={tab} />
          <TabPanel value={TabValue.Tab}>
            <Suspense fallback={<WindowsTabLoading />}>
              <WindowsTab />
            </Suspense>
          </TabPanel>
          <TabPanel value={TabValue.Count}>
            <Suspense fallback={<ChartsTabLoading />}>
              <ChartsTab />
            </Suspense>
          </TabPanel>
          <TabPanel value={TabValue.Snooze}>
            <Suspense fallback={<SnoozeTabLoading />}>
              <SnoozeTab />
            </Suspense>
          </TabPanel>
        </TabContext>
      </DataProvider>
    </div>
  );
}
