import { type PropsWithChildren, Suspense } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Spinner } from "@/components/ui/spinner";
import DataHandler from "@/lib/dataStore/DataHandler";
import DataProvider from "@/lib/dataStore/DataProvider";

function Loading() {
  return (
    <div className="flex size-full grow items-center justify-center">
      <Spinner />
    </div>
  );
}

export default function AppWrap({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <DataProvider>
            <DataHandler />
            {children}
          </DataProvider>
        </Suspense>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
