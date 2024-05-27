import FilterAlt from "@mui/icons-material/FilterAlt";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import MuiPaper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useMemo, useState } from "react";
import ElevationScroll from "src/components/ElevationScroll";
import Search from "src/components/layout/Search";
import { useFilters, useSearchDispatch } from "src/contexts/WindowsTabContext";
import WindowsActions from "./WindowsActions";
import WindowsFilter from "./WindowsFilter";

const Paper = styled(MuiPaper)(({ theme }) => ({
  borderRadius: 0,
  padding: theme.spacing(1, 2),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
}));

function Tagline({ windowCount, tabCount }: { windowCount: number; tabCount: number }) {
  let title = `${tabCount} Tab${tabCount === 1 ? "" : "s"}`;
  if (windowCount > 1) {
    title += ` across ${windowCount} Windows`;
  }
  const shortTitle = `${tabCount}/${windowCount}`;

  return (
    <>
      <Typography
        variant="subtitle1"
        color="inherit"
        component="div"
        sx={{ display: { xs: "none", sm: "block" } }}
      >
        {title}
      </Typography>
      <Tooltip title={title} sx={{ display: { xs: "block", sm: "none" } }}>
        <Typography
          variant="subtitle1"
          color="inherit"
          component="div"
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          {shortTitle}
        </Typography>
      </Tooltip>
    </>
  );
}

export function Loading() {
  return (
    <Paper elevation={0}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          justifyContent: "space-between",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ flexGrow: 1 }}>
          <Skeleton>
            <Input />
          </Skeleton>
          <Skeleton variant="circular">
            <IconButton size="small">
              <FilterAlt fontSize="small" />
            </IconButton>
          </Skeleton>
        </Stack>
        <Box
          sx={{
            flexShrink: 1,
            display: "flex",
            flexDirection: "row",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Skeleton>
            <Typography
              variant="subtitle1"
              color="inherit"
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Loading
            </Typography>
          </Skeleton>
        </Box>
      </Box>
    </Paper>
  );
}

export default function WindowsHeader({
  windowCount,
  tabCount,
  windows,
}: {
  windowCount: number;
  tabCount: number;
  windows: chrome.windows.Window[];
}) {
  const [search, setSearch] = useState("");
  const filters = useFilters();
  const tabs: chrome.tabs.Tab[] = useMemo(() => windows.flatMap((w) => w.tabs || []), [windows]);

  const dispatchSearch = useSearchDispatch();

  const showActions = search.length > 0 || filters.length > 0;
  const onSearchChange = (value: string) => {
    setSearch(value);
    dispatchSearch({ type: "update", value });
  };

  return (
    <ElevationScroll>
      <Paper
        sx={{
          // bgcolor: "background.default",
          zIndex: "appBar",
          position: "sticky",
          top: 72,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            justifyContent: "space-between",
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center" sx={{ flexGrow: 1 }}>
            <Search value={search} onChange={onSearchChange} />
            <WindowsFilter tabs={tabs} />
          </Stack>

          <Box
            sx={{
              flexShrink: 1,
              display: "flex",
              flexDirection: "row",
              gap: 2,
              alignItems: "center",
            }}
          >
            {showActions ? (
              <WindowsActions windows={windows} />
            ) : (
              <Tagline windowCount={windowCount} tabCount={tabCount} />
            )}
          </Box>
        </Box>
      </Paper>
    </ElevationScroll>
  );
}
