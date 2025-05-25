import { Paper as MuiPaper, Skeleton, Tooltip, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import ElevationScroll from "@/components/ElevationScroll";
import Search from "@/components/layout/Search";
import { useDataDispatch, useIsFiltered, useTabCount, useWindowCount } from "@/utils/dataStore";
import WindowsBulkActions from "./tab/window/header/actions/WindowsBulkActions";
import { TabValue } from "./types";

const Paper = styled(MuiPaper)(({ theme }) => ({
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
        component="div"
        sx={{ color: "text.secondary", display: { xs: "none", sm: "block" } }}
      >
        {title}
      </Typography>
      <Tooltip title={title} sx={{ color: "text.secondary", display: { xs: "block", sm: "none" } }}>
        <Typography
          variant="subtitle1"
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
    <Paper
      elevation={0}
      className="flex items-center justify-end"
      sx={{ zIndex: "appBar", position: "sticky", top: 72 }}
    >
      <Skeleton sx={{ height: 32, width: { xs: 50, sm: 210 } }} />
    </Paper>
  );
}

export default function TabSubMenuBar({ value }: { value: TabValue }) {
  const [search, setSearch] = useState("");
  const dispatch = useDataDispatch();

  const isFiltered = useIsFiltered();
  const showActions = value === TabValue.Tab && isFiltered;
  const onSearchChange = (value: string) => {
    setSearch(value);
    dispatch({ type: "search", search: value });
    if (value === "") {
      dispatch({ type: "clearSelection" });
    }
  };

  return (
    <ElevationScroll>
      <Paper
        square
        elevation={0}
        className="flex min-h-14 items-center justify-between"
        sx={{ zIndex: "appBar", position: "sticky", top: 72 }}
      >
        <div className="flex grow items-center gap-4">
          {value === TabValue.Tab && <Search value={search} onChange={onSearchChange} />}
        </div>

        <div className="flex shrink items-center gap-4">
          {showActions ? <WindowsBulkActions /> : <Tagline />}
        </div>
      </Paper>
    </ElevationScroll>
  );
}
