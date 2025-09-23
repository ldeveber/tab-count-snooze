import {
  Delete as DeleteIcon,
  MergeType as MergeTypeIcon,
} from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { type MouseEventHandler, useMemo } from "react";
import TooltipButton from "@/components/TooltipButton";
import { closeTabs, groupTabs, type TabIdType } from "@/utils/chrome";
import { useAllTabs, useSearch, useSelectedTabs } from "@/utils/dataStore";
import { filterTabs } from "@/utils/filterTabs";

export default function WindowsBulkActions() {
  const selected = useSelectedTabs();
  const search = useSearch();
  const allTabs = useAllTabs();

  const getSelectedTabIds = (): ReadonlyArray<TabIdType> => {
    if (selected.length > 0) {
      return selected;
    }
    const tabs = filterTabs(allTabs, search);
    const tabIds: TabIdType[] = [];

    if (selected.length > 0) {
      tabs.forEach(({ id }) => {
        if (!id) {
          return;
        }
        if (selected.includes(id)) {
          tabIds.push(id);
        }
      });
    } else {
      tabs.forEach(({ id }) => {
        if (!id) {
          return;
        }
        tabIds.push(id);
      });
    }
    return tabIds;
  };

  const filtleredCount = useMemo(() => {
    return filterTabs(allTabs, search).length;
  }, [allTabs, search]);

  const disabled = useMemo(() => {
    return getSelectedTabIds().length === 0;
  }, []);

  const onGroup: MouseEventHandler<HTMLButtonElement> = () => {
    const tabIds = getSelectedTabIds();
    void groupTabs(tabIds as [number, ...number[]], search);
  };
  const onClose: MouseEventHandler<HTMLButtonElement> = () => {
    const tabIds = getSelectedTabIds();
    void closeTabs(tabIds);
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ flexGrow: 1 }}>
      <Typography>
        {filtleredCount} tab {filtleredCount === 1 ? "match" : "matches"}
      </Typography>
      <TooltipButton tooltip="Group Tabs" disabled={disabled} onClick={onGroup}>
        <MergeTypeIcon titleAccess={disabled ? "Group Tabs" : undefined} />
      </TooltipButton>
      <TooltipButton tooltip="Close Tabs" disabled={disabled} onClick={onClose}>
        <DeleteIcon titleAccess={disabled ? "Close Tabs" : undefined} />
      </TooltipButton>
    </Stack>
  );
}
