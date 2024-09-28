import MuiBox from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { useMemo } from "react";
import { useTabCount, useWindowCount, useWindows } from "src/contexts";
import WindowsHeader, { Loading as HeaderLoading } from "./window/header/WindowsHeader";
import WindowLoading from "./window/WindowLoading";
import WindowView from "./window/WindowView";

const Box = styled(MuiBox)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
}));

function Loading() {
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
    <>
      <WindowsHeader />
      <Box>
        <Stack spacing={2}>
          {open.map((w) => (
            <WindowView key={w.id} windowId={w.id} />
          ))}
          {minimized.length > 0 && (
            <Stack spacing={2}>
              <Divider aria-label="Minimized Windows">Minimized</Divider>
              {minimized.map((w) => (
                <WindowView key={w.id} windowId={w.id} />
              ))}
            </Stack>
          )}
        </Stack>
      </Box>
    </>
  );
}
