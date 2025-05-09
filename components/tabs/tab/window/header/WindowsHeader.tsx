import FilterAlt from "@mui/icons-material/FilterAlt";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import MuiPaper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import ElevationScroll from "@/components/ElevationScroll";
import Search from "@/components/layout/Search";
import { useDataDispatch, useIsFiltered, useTabCount, useWindowCount } from "@/utils/dataStore";
import WindowsBulkActions from "./actions/WindowsBulkActions";

const Paper = styled(MuiPaper)(({ theme }) => ({
  borderRadius: 0,
  padding: theme.spacing(1, 2),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
}));

function Tagline() {
  const windowCount = useWindowCount();
  const tabCount = useTabCount();

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

export default function WindowsHeader() {
  const [search, setSearch] = useState("");
  const dispatch = useDataDispatch();

  const showActions = useIsFiltered();
  const onSearchChange = (value: string) => {
    setSearch(value);
    dispatch({ type: "search", search: value });
    if (value === "") {
      dispatch({ type: "clearSelection" });
    }
  };

  return (
    <ElevationScroll>
      <Paper sx={{ zIndex: "appBar", position: "sticky", top: 72 }}>
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
            {showActions ? <WindowsBulkActions /> : <Tagline />}
          </Box>
        </Box>
      </Paper>
    </ElevationScroll>
  );
}
