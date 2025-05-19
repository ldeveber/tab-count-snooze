import { Alert as MuiAlert, AlertTitle, Container, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Component, ReactNode } from "react";

const Alert = styled(MuiAlert)(() => ({
  ".MuiAlert-message": { width: "100%" },
}));

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: !!error, error };
  }

  public componentDidCatch(error: Error) {
    console.error("Uncaught error:", error);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Container>
          <Alert variant="filled" severity="error">
            <AlertTitle>Uh Oh</AlertTitle>
            {this.state.error?.message}

            {this.state.error?.stack && (
              <Paper
                variant="outlined"
                sx={{
                  px: 2,
                  py: 1,
                  overflowY: "scroll",
                  width: "100%",
                }}
              >
                <pre style={{ margin: 0 }}>
                  <code>{this.state.error.stack}</code>
                </pre>
              </Paper>
            )}
          </Alert>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
