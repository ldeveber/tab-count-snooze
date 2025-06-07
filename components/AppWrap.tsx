import { PropsWithChildren, Suspense } from "react";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import ThemeWrap from "@/components/layout/theme/ThemeWrap";
import Loading from "@/components/layout/Loading";

export default function AppWrap({ children }: PropsWithChildren) {
  return (
    <div className="text-base">
      <ThemeWrap>
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </ErrorBoundary>
      </ThemeWrap>
    </div>
  );
}
