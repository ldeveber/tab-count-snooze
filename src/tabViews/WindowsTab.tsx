import MuiBox from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { useMemo } from "react";
import { useTabCount, useWindowCount, useWindows } from "src/contexts/DataProvider";
import WindowsProvider from "src/contexts/FilterProvider";
import WindowLoading from "./window/WindowLoading";
import WindowView from "./window/WindowView";
import WindowsHeader, { Loading as HeaderLoading } from "./window/header/WindowsHeader";

const Box = styled(MuiBox)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
}));

export function Loading() {
  return (
    <>
      <HeaderLoading />
      <Box>
        <Stack spacing={2} pt={1}>
          <WindowLoading />
        </Stack>
      </Box>
    </>
  );
}

export default function WindowsTab() {
  const windows = useWindows();
  const windowCount = useWindowCount();
  const tabCount = useTabCount();

  const { minimized, open }: { minimized: chrome.windows.Window[]; open: chrome.windows.Window[] } =
    useMemo(
      () => ({
        minimized: windows.filter(({ state }) => state === "minimized"),
        open: windows.filter(({ state }) => state === "normal"),
      }),
      [windows],
    );

  if (windowCount === 0 || tabCount === 0) {
    return <Loading />;
  }

  return (
    <WindowsProvider>
      <WindowsHeader />
      <Box>
        <Stack spacing={2} pt={1}>
          {open.map((w) => (
            <Grid size={{ xs: 1 }} key={w.id}>
              <WindowView windowId={w.id} />
            </Grid>
          ))}
          {minimized.length > 0 && (
            <Stack spacing={2}>
              <Divider aria-label="Minimized Windows">Minimized</Divider>
              {minimized.map((w) => (
                <Grid size={{ xs: 1 }} key={w.id}>
                  <WindowView windowId={w.id} />
                </Grid>
              ))}
            </Stack>
          )}
        </Stack>
      </Box>
    </WindowsProvider>
  );
}
