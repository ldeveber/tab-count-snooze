import { MergeIcon, Trash2Icon } from "lucide-react";
import { type MouseEventHandler, useMemo } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TooltipButton } from "@/components/ui/tooltip-button";
import type { TabIdType } from "@/lib/browser/actions";
import { closeTabsAction, groupTabsAction } from "@/lib/browser/actions";
import { useAllTabs, useSearch, useSelectedTabs } from "@/lib/dataStore";
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: need to move to data store
  const disabled = useMemo(() => {
    return getSelectedTabIds().length === 0;
  }, []);

  const onGroup: MouseEventHandler<HTMLButtonElement> = () => {
    const tabIds = getSelectedTabIds();
    void groupTabsAction(tabIds as [number, ...number[]], search);
  };
  const onClose: MouseEventHandler<HTMLButtonElement> = () => {
    const tabIds = getSelectedTabIds();
    void closeTabsAction(tabIds);
  };

  return (
    <div className="flex flex-grow flex-row items-center justify-end gap-2">
      <div>
        {filtleredCount} tab {filtleredCount === 1 ? "match" : "matches"}
      </div>
      <TooltipProvider>
        <TooltipButton
          tooltip="Group Tabs"
          variant="ghost"
          size="icon"
          disabled={disabled}
          onClick={onGroup}
          aria-label="Group selected tabs"
        >
          <MergeIcon />
        </TooltipButton>
        <TooltipButton
          tooltip="Close Tabs"
          variant="ghost"
          size="icon"
          disabled={disabled}
          onClick={onClose}
          aria-label="Close selected tabs"
        >
          <Trash2Icon />
        </TooltipButton>
      </TooltipProvider>
    </div>
  );
}
