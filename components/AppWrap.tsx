import { type PropsWithChildren, Suspense } from "react";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import { ThemeProvider } from "@/components/layout/theme/ThemeProvider";
import { Spinner } from "@/components/ui/spinner";

function Loading() {
  return (
    <div className="flex grow items-center justify-center">
      <Spinner />
    </div>
  );
}

export default function AppWrap({ children }: PropsWithChildren) {
  return (
    <div className="text-base">
      <ThemeProvider>
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </ErrorBoundary>
      </ThemeProvider>
    </div>
  );
}
