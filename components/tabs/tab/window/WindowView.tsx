import { useMemo } from "react";
import ListGroupCard from "@/components/list/ListGroupCard";
import {
  useIsFiltered,
  useSearch,
  useSort,
  useTabGroups,
  useTabs,
  useWindow,
} from "@/utils/dataStore";
import { filterSortTabs } from "@/utils/filterTabs";
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

export default function WindowView({
  windowId,
}: {
  readonly windowId: Required<Browser.windows.Window>["id"];
}) {
  const win = useWindow(windowId);
  const groups = useTabGroups(windowId);
  const windowTabs = useTabs(windowId);
  const isFiltered = useIsFiltered();
  const sort = useSort();
  const search = useSearch();

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

  // console.log("WindowView", window); // windowId, window, windowTabs, tabList, visibleTabs);
  if (!win?.id || visibleTabs.length === 0) {
    return null;
  }
  return (
    <ListGroupCard
      collapsible
      initOpen
      selected={win.focused}
      cardTitle={`${visibleTabs.length} Tabs`}
      titleTypographyProps={{ variant: "subtitle1" }}
      list-aria-label={`${win.state} window with ${isFiltered ? `${visibleTabs.length} tabs, filtered` : `${visibleTabs.length} tabs`}`}
    >
      {tabList.map(({ id, tab, group }) => {
        if (group) {
          return <TabGroupView key={id} group={group.tabGroup} tabs={group.tabs} />;
        }
        if (tab) {
          return <TabView key={id} tab={tab} />;
        }
        return null;
      })}
    </ListGroupCard>
  );
}
