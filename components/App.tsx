import { type PropsWithChildren, Suspense } from "react";
import DataHandler from "@/lib/dataStore/DataHandler";
import DataProvider from "@/lib/dataStore/DataProvider";
import ErrorBoundary from "./ErrorBoundary";
import TabCountSnooze, {
  Loading as TabCountSnoozeLoading,
} from "./TabCountSnooze";
import { ThemeProvider } from "./theme/ThemeProvider";

function Loading() {
  return <TabCountSnoozeLoading />;
}

function AppWrap({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <div className="@container/main flex min-h-screen w-full flex-col text-base">
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
