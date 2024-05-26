import DeleteIcon from "@mui/icons-material/Delete";
import MergeTypeIcon from "@mui/icons-material/MergeType";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import React, { useMemo } from "react";
import { useFilters, useSearch, useSelectedTabs } from "src/contexts/WindowsTabContext";
import { closeTabs, groupTabs } from "src/utils/chrome";
import { filterTabs } from "src/utils/filterTabs";

export default function WindowsActions({ windows }: { windows: chrome.windows.Window[] }) {
  const selected = useSelectedTabs();
  const search = useSearch();
  const filters = useFilters();

  const getSelectedTabIds = (): Required<chrome.tabs.Tab["id"]>[] => {
    if (selected.length > 0) {
      return selected;
    }
    const allTabs = windows.flatMap((w) => w.tabs || []);
    const tabs = filterTabs(allTabs, search, filters);
    const tabIds: Required<chrome.tabs.Tab["id"]>[] = [];
    tabs.forEach(({ id }) => {
      if (!id) {
        return;
      }
      if (selected.length > 0) {
        if (selected.includes(id)) {
          tabIds.push(id);
        }
      } else {
        tabIds.push(id);
      }
    });
    return tabIds;
  };

  const disabled = useMemo(() => {
    return getSelectedTabIds().length === 0;
  }, []);

  const onGroup: React.MouseEventHandler<HTMLButtonElement> = () => {
    const tabIds = getSelectedTabIds();
    void groupTabs(tabIds as [number, ...number[]], search);
  };
  const onClose: React.MouseEventHandler<HTMLButtonElement> = () => {
    const tabIds = getSelectedTabIds();
    void closeTabs(tabIds);
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ flexGrow: 1 }}>
      <Tooltip title="Group Tabs">
        <IconButton disabled={disabled} color="inherit" size="small" onClick={onGroup}>
          <MergeTypeIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Close Tabs">
        <IconButton disabled={disabled} color="inherit" size="small" onClick={onClose}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
