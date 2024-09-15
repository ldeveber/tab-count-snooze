import MuiBox from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { useMemo } from "react";
import { useWindows } from "src/contexts";
import WindowLoading from "./WindowLoading";
import WindowView from "./WindowView";
import WindowsHeader, { Loading as HeaderLoading } from "./header/WindowsHeader";

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

export default function Windows() {
  const windows = useWindows();

  const { minimized, open }: { minimized: chrome.windows.Window[]; open: chrome.windows.Window[] } =
    useMemo(
      () => ({
        minimized: windows.filter(({ state }) => state === "minimized"),
        open: windows.filter(({ state }) => state === "normal"),
      }),
      [windows],
    );

  return (
    <>
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
              <Divider>Minimized</Divider>
              {minimized.map((w) => (
                <Grid size={{ xs: 1 }} key={w.id}>
                  <WindowView windowId={w.id} />
                </Grid>
              ))}
            </Stack>
          )}
        </Stack>
      </Box>
    </>
  );
}
