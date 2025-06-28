import { Suspense } from "react";
import DataHandler from "@/utils/dataStore/DataHandler";
import DataProvider from "@/utils/dataStore/DataProvider";
import TabCountSnooze, { Loading as TabCountSnoozeLoading } from "./TabCountSnooze";

function Loading() {
  return <TabCountSnoozeLoading />;
}

export default function App() {
  return (
    <div className="@container/main flex min-h-screen w-full flex-col">
      <DataProvider>
        <DataHandler />
        <AppWrap>
          <Suspense fallback={<Loading />}>
            <TabCountSnooze />
          </Suspense>
        </AppWrap>
      </DataProvider>
    </div>
  );
}
