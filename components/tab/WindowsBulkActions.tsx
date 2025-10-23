import { MergeIcon, Trash2Icon } from "lucide-react";
import { type MouseEventHandler, useMemo } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TooltipButton } from "@/components/ui/tooltip-button";
import type { TabIdType } from "@/lib/browser/actions";
import { closeTabsAction, groupTabsAction } from "@/lib/browser/actions";
import { useDisplayedTabs, useFilters, useSelectedTabs } from "@/lib/dataStore";

export default function WindowsBulkActions() {
  const selected = useSelectedTabs();
  const filters = useFilters();
  const visibleTabs = useDisplayedTabs();

  const getSelectedTabIds = (): ReadonlyArray<TabIdType> => {
    if (selected.length > 0) {
      return selected;
    }
    const tabIds: TabIdType[] = [];

    if (selected.length > 0) {
      visibleTabs.forEach(({ id }) => {
        if (!id) {
          return;
        }
        if (selected.includes(id)) {
          tabIds.push(id);
        }
      });
    } else {
      visibleTabs.forEach(({ id }) => {
        if (!id) {
          return;
        }
        tabIds.push(id);
      });
    }
    return tabIds;
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: need to move to data store
  const disabled = useMemo(() => {
    return getSelectedTabIds().length === 0;
  }, []);

  const onGroup: MouseEventHandler<HTMLButtonElement> = () => {
    const tabIds = getSelectedTabIds();
    let name = filters.search;
    if (filters.dupesOnly) {
      name = "dupes";
    } else if (filters.stale) {
      name = "stale";
    }
    void groupTabsAction(tabIds as [number, ...number[]], name);
  };
  const onClose: MouseEventHandler<HTMLButtonElement> = () => {
    const tabIds = getSelectedTabIds();
    void closeTabsAction(tabIds);
  };

  const filtleredCount = visibleTabs.length;
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
