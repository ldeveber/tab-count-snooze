import { AlertCircleIcon } from "lucide-react";
import type { FallbackProps } from "react-error-boundary";
import { Button } from "@/components/ui/button";

interface ErrorDisplayProps extends FallbackProps {
  error: Error;
}

export default function ErrorDisplay({
  error,
  resetErrorBoundary,
}: ErrorDisplayProps) {
  return (
    <div className="flex size-full flex-col gap-4 p-4">
      <div className="flex flex-row gap-4 rounded-2xl bg-destructive px-4 py-2 text-destructive-foreground">
        <AlertCircleIcon />
        <div className="flex grow flex-col gap-2">
          <div className="flex flex-row justify-between">
            <h1 className="font-semibold text-2xl/6">Uh Oh</h1>
            {typeof resetErrorBoundary === "function" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetErrorBoundary}
                className="text-destructive-foreground hover:bg-destructive"
              >
                Try Again?
              </Button>
            )}
          </div>
          {error?.message && <p className="">{error?.message}</p>}
        </div>
      </div>

      {error?.stack && (
        <div className="rounded-2xl border border-border border-dashed px-4 py-2">
          <pre className="line-clamp-5 size-full overflow-scroll">
            <code>{error.stack}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
