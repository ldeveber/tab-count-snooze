import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { Suspense } from "react";
import ThemeWrap from "src/components/ThemeWrap";
import Body from "src/components/layout/Body";

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
      <Suspense fallback={<Loading />}>
        {/* The popup cannot be smaller than 25x25 and cannot be larger than 800x600. */}
        <Box>
          <Body />
        </Box>
      </Suspense>
    </ThemeWrap>
  );
};

export default App;
