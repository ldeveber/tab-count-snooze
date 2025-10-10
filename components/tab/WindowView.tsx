import { ChevronUpIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { type Browser, browser } from "#imports";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  useIsFiltered,
  useMostRecentTabFromWindow,
  useSearch,
  useSort,
  useTabGroups,
  useTabs,
} from "@/lib/dataStore";
import { filterSortTabs } from "@/utils/filterTabs";
import { Card } from "../ui/card";
import TabGroupView from "./TabGroupView";
import TabView from "./TabView";

type GroupType = {
  readonly tabGroup: Browser.tabGroups.TabGroup;
  readonly tabs: Browser.tabs.Tab[];
};
type RenderListType = {
  readonly id: number;
  readonly tab?: Browser.tabs.Tab;
  readonly group?: GroupType;
};

export function Loading() {
  return null;
}

export default function WindowView({
  id,
  win,
}: {
  readonly id: number;
  readonly win: Browser.windows.Window;
}) {
  const groups = useTabGroups(win.id);
  const windowTabs = useTabs(win.id);
  const isFiltered = useIsFiltered();
  const sort = useSort();
  const search = useSearch();
  const mostRecentTab = useMostRecentTabFromWindow(win.id);
  const [lastViewed, setLastViewed] = useState<Date | null>(
    mostRecentTab?.lastAccessed ? new Date(mostRecentTab.lastAccessed) : null,
  );
  const [expanded, setExpanded] = useState(true);

  const onActivated = useCallback(
    (info: Browser.tabs.OnActivatedInfo) => {
      if (info.windowId === win.id) {
        setLastViewed(new Date());
      }
    },
    [win.id],
  );

  useEffect(() => {
    browser.tabs.onActivated.addListener(onActivated);
    return () => {
      browser.tabs.onActivated.removeListener(onActivated);
    };
  }, [onActivated]);

  const visibleTabs = useMemo(
    () => filterSortTabs(windowTabs, search, sort),
    [windowTabs, search, sort],
  );

  const tabList: RenderListType[] = useMemo(() => {
    const list: RenderListType[] = [];

    if (!visibleTabs.length) {
      return list;
    }
    const done: number[] = [];

    visibleTabs.forEach((tab) => {
      if (done.includes(tab.groupId)) {
        return;
      }
      const tabGroup = groups.find(({ id }) => id === tab.groupId);
      if (tabGroup) {
        const arr = visibleTabs.filter((tab) => tab.groupId === tabGroup.id);
        list.push({ group: { tabGroup, tabs: arr }, id: tabGroup.id });
        done.push(tabGroup.id);
        return;
      }
      if (tab.id) {
        list.push({ tab, id: tab.id });
      }
    });

    return list;
  }, [visibleTabs, groups]);

  const handleExpandClick = (open: boolean) => {
    setExpanded(open);
  };

  if (!win?.id || visibleTabs.length === 0) {
    return null;
  }
  return (
    <Card className="overflow-hidden rounded-3xl">
      <Collapsible
        id={`window-${id}`}
        open={expanded}
        onOpenChange={handleExpandClick}
        className="overflow-hidden"
      >
        <CollapsibleTrigger
          className="group/trigger flex w-full items-center justify-between gap-2 rounded-full px-4 py-2 font-medium text-sm hover:bg-primary/10 focus-visible:outline focus-visible:outline-primary/80 active:bg-primary/20"
          aria-label={`Show or hide ${visibleTabs.length} tabs in ${win.state} window`}
        >
          <span className="flex flex-row items-baseline gap-2">
            <span className="text-lg">{visibleTabs.length} Tabs</span>
            <span className="text-muted-foreground">
              {lastViewed ? new Date(lastViewed).toLocaleString() : "N/A"}
            </span>
          </span>
          <ChevronUpIcon className="size-3 stroke-3 transition-all duration-450 ease-in-out group-aria-[expanded=false]/trigger:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ul
            className="flex flex-col divide-y divide-border/60"
            aria-label={`${win.state} window with ${
              isFiltered
                ? `${visibleTabs.length} tabs, filtered`
                : `${visibleTabs.length} tabs`
            }`}
          >
            {tabList.map(({ id: key, tab, group }) => {
              if (group) {
                return (
                  <TabGroupView
                    key={key}
                    group={group.tabGroup}
                    tabs={group.tabs}
                  />
                );
              }
              if (tab) {
                return <TabView key={key} tab={tab} />;
              }
              return null;
            })}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
