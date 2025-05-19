import { CircularProgress } from "@mui/material";
import { PropsWithChildren, Suspense } from "react";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import ThemeWrap from "@/components/layout/theme/ThemeWrap";

export default function AppWrap({ children }: PropsWithChildren) {
  return (
    <ThemeWrap>
      <ErrorBoundary>
        <Suspense fallback={<CircularProgress />}>{children}</Suspense>
      </ErrorBoundary>
    </ThemeWrap>
  );
}
