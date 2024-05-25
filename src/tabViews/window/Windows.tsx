import MuiBox from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { useMemo } from "react";
import { useFilters, useSearch, useSort } from "src/contexts/WindowsTabContext";
import filterSortTabs from "src/utils/filterTabs";
import { useDebounce } from "use-debounce";
import WindowsSection, { Loading as WindowsLoading } from "./WindowsSection";
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
          <WindowsLoading />
        </Stack>
      </Box>
    </>
  );
}

export default function Windows({
  windows,
  tabGroups,
  tabCount,
}: {
  readonly windows: chrome.windows.Window[];
  readonly tabGroups: chrome.tabGroups.TabGroup[];
  readonly tabCount: number;
}) {
  const filters = useFilters();
  const sort = useSort();
  const search = useSearch();
  const [searchValue] = useDebounce(search, 300);

  const windowCount = windows.length;

  const { minimized, open }: { minimized: chrome.windows.Window[]; open: chrome.windows.Window[] } =
    useMemo(() => {
      return {
        minimized: windows
          .filter(({ state }) => state === "minimized")
          .map((w) => filterSortTabs(w, searchValue, filters, sort)),
        open: windows
          .filter(({ state }) => state === "normal")
          .map((w) => filterSortTabs(w, searchValue, filters, sort)),
      };
    }, [windows, searchValue, filters, sort]);

  if (windows.length === 0 || tabCount === 0) {
    return <Loading />;
  }

  return (
    <>
      <WindowsHeader windows={windows} tabCount={tabCount} windowCount={windowCount} />
      <Box>
        <Stack spacing={2} pt={1}>
          <WindowsSection windows={open} tabGroups={tabGroups} />
          {minimized.length > 0 && (
            <Stack spacing={2}>
              <Divider>Minimized</Divider>
              <WindowsSection windows={minimized} tabGroups={tabGroups} />
            </Stack>
          )}
        </Stack>
      </Box>
    </>
  );
}
