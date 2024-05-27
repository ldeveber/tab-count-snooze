import ThemeWrap from "src/components/ThemeWrap";
import ErrorBoundary from "src/components/layout/ErrorBoundary";
import Options from "./Options";

export default function App() {
  return (
    <ThemeWrap>
      <ErrorBoundary>
        <Options />
      </ErrorBoundary>
    </ThemeWrap>
  );
}
