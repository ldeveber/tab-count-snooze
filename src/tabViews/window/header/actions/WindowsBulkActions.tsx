import DeleteIcon from "@mui/icons-material/Delete";
import MergeTypeIcon from "@mui/icons-material/MergeType";
import Stack from "@mui/material/Stack";
import { MouseEventHandler, useMemo } from "react";
import { useAllTabs, useFilters, useSearch, useSelectedTabs } from "src/contexts/selectors";
import { closeTabs, groupTabs, type TabIdType } from "src/utils/chrome";
import { filterTabs } from "src/utils/filterTabs";
import TooltipButton from "./TooltipButton";

export default function WindowsBulkActions() {
  const selected = useSelectedTabs();
  const search = useSearch();
  const filters = useFilters();
  const allTabs = useAllTabs();

  const getSelectedTabIds = (): ReadonlyArray<TabIdType> => {
    if (selected.length > 0) {
      return selected;
    }
    const tabs = filterTabs(allTabs, search, filters);
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
      <TooltipButton tooltip="Group Tabs" disabled={disabled} onClick={onGroup}>
        <MergeTypeIcon titleAccess={disabled ? "Group Tabs" : undefined} />
      </TooltipButton>
      <TooltipButton tooltip="Close Tabs" disabled={disabled} onClick={onClose}>
        <DeleteIcon titleAccess={disabled ? "Close Tabs" : undefined} />
      </TooltipButton>
    </Stack>
  );
}
