import { Alert as MuiAlert, AlertTitle, Paper, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FallbackProps } from "react-error-boundary";

const Alert = styled(MuiAlert)(() => ({
  ".MuiAlert-message": { width: "100%" },
}));

interface ErrorDisplayProps extends FallbackProps {
  error: Error;
}

export default function ErrorDisplay({ error, resetErrorBoundary }: ErrorDisplayProps) {
  return (
    <div className="flex size-full flex-col gap-4">
      <Alert
        variant="filled"
        severity="error"
        className="flex-0"
        action={
          typeof resetErrorBoundary === "function" ? (
            <Button
              color="inherit"
              size="small"
              className="px-2 whitespace-nowrap"
              onClick={resetErrorBoundary}
            >
              Try Again?
            </Button>
          ) : undefined
        }
      >
        <AlertTitle>Uh Oh</AlertTitle>
        {error?.message}
      </Alert>

      {error?.stack && (
        <Paper variant="outlined" className="w-full grow px-4 py-2" sx={{ overflowY: "scroll" }}>
          <pre style={{ margin: 0 }}>
            <code>{error.stack}</code>
          </pre>
        </Paper>
      )}
    </div>
  );
}
