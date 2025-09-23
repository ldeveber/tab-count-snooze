import { ErrorOutline } from "@mui/icons-material";
import { FallbackProps } from "react-error-boundary";

interface ErrorDisplayProps extends FallbackProps {
  error: Error;
}

export default function ErrorDisplay({
  error,
  resetErrorBoundary,
}: ErrorDisplayProps) {
  return (
    <div className="flex size-full flex-col gap-4">
      <div className="flex flex-row gap-4 rounded-2xl bg-red-700 px-4 py-2">
        <ErrorOutline />
        <div className="flex grow flex-col gap-2">
          <div className="flex flex-row justify-between">
            <h1 className="text-2xl/6 font-semibold">Uh Oh</h1>
            {typeof resetErrorBoundary === "function" && (
              <button className="rounded-sm px-2 py-1 text-sm whitespace-nowrap text-neutral-400 hover:bg-red-800">
                Try Again?
              </button>
            )}
          </div>
          <p className="">{error?.message}</p>
        </div>
      </div>

      {error?.stack && (
        <div className="rounded-2xl border border-dashed border-neutral-500 px-4 py-2">
          <pre className="line-clamp-5 size-full overflow-scroll">
            <code>{error.stack}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
