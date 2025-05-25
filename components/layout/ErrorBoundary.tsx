import { Component, ReactNode } from "react";
import ErrorDisplay from "./ErrorDisplay";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  public componentDidCatch(error: Error) {
    console.error("Uncaught error:", error);
  }

  public render() {
    if (this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorDisplay
          error={this.state.error}
          resetErrorBoundary={() => this.setState({ error: null })}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
