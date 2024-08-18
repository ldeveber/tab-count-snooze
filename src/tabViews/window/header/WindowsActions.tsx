import DeleteIcon from "@mui/icons-material/Delete";
import MergeTypeIcon from "@mui/icons-material/MergeType";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip, { TooltipProps } from "@mui/material/Tooltip";
import React, { useMemo } from "react";
import { useFilters, useSearch, useSelectedTabs } from "src/contexts/WindowsTabContext";
import { closeTabs, groupTabs } from "src/utils/chrome";
import { filterTabs } from "src/utils/filterTabs";

interface TooltipButtonProps extends IconButtonProps {
  tooltip: TooltipProps["title"];
}
function TooltipButton({ tooltip, ...props }: TooltipButtonProps) {
  if (props.disabled) {
    return <IconButton color="inherit" size="small" {...props} />;
  }
  return (
    <Tooltip title={tooltip}>
      <IconButton color="inherit" size="small" {...props} />
    </Tooltip>
  );
}

export default function WindowsActions({ windows }: { windows: chrome.windows.Window[] }) {
  const selected = useSelectedTabs();
  const search = useSearch();
  const filters = useFilters();

  const getSelectedTabIds = (): Exclude<chrome.tabs.Tab["id"], undefined>[] => {
    if (selected.length > 0) {
      return selected;
    }
    const allTabs = windows.flatMap((w) => w.tabs || []);
    const tabs = filterTabs(allTabs, search, filters);
    const tabIds: Exclude<chrome.tabs.Tab["id"], undefined>[] = [];
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
      <TooltipButton tooltip="Group Tabs" disabled={disabled} onClick={onGroup}>
        <MergeTypeIcon titleAccess={disabled ? "Group Tabs" : undefined} />
      </TooltipButton>
      <TooltipButton tooltip="Close Tabs" disabled={disabled} onClick={onClose}>
        <DeleteIcon titleAccess={disabled ? "Close Tabs" : undefined} />
      </TooltipButton>
    </Stack>
  );
}
