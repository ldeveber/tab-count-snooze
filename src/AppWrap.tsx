import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CircularProgress from "@mui/material/CircularProgress";
import { PropsWithChildren, Suspense } from "react";
import ThemeWrap from "src/components/ThemeWrap";
import ErrorBoundary from "src/components/layout/ErrorBoundary";

export default function AppWrap({ children }: PropsWithChildren) {
  return (
    <ThemeWrap>
      <ErrorBoundary>
        <Suspense fallback={<CircularProgress />}>{children}</Suspense>
      </ErrorBoundary>
    </ThemeWrap>
  );
}
