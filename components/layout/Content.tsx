import { CircularProgress } from "@mui/material";
import { ReactNode, Suspense } from "react";
import ErrorBoundary from "./ErrorBoundary";

export default function Content({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<CircularProgress />}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </Suspense>
  );
}
