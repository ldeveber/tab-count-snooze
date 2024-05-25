import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { Suspense } from "react";
import ThemeWrap from "src/components/ThemeWrap";
import Body from "src/components/layout/Body";
import ErrorBoundary from "src/components/layout/ErrorBoundary";

const Loading = () => {
  return (
    <>
      <Skeleton variant="rectangular" width="100%" height={200} />
      <Skeleton variant="rectangular" width="100%" height={200} />
      <Skeleton variant="rectangular" width="100%" height={200} />
    </>
  );
};

const App = () => {
  return (
    <ThemeWrap>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Box>
            <Body />
          </Box>
        </Suspense>
      </ErrorBoundary>
    </ThemeWrap>
  );
};

export default App;
