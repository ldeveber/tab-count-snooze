import { useMemo } from "react";
import ListGroupCard from "src/components/list/ListGroupCard";
import TabGroupView from "./TabGroupView";
import TabView from "./TabView";

type GroupType = {
  readonly tabGroup: chrome.tabGroups.TabGroup;
  readonly tabs: chrome.tabs.Tab[];
};
type RenderListType = {
  readonly id: number;
  readonly tab?: chrome.tabs.Tab;
  readonly group?: GroupType;
};

export default function WindowView({
  tabGroups,
  window: win,
}: {
  readonly tabGroups: chrome.tabGroups.TabGroup[];
  readonly window: chrome.windows.Window;
}) {
  const tabs = win.tabs || [];

  const groups: chrome.tabGroups.TabGroup[] = useMemo(() => {
    return tabGroups.filter(({ windowId }) => windowId === win.id);
  }, [win.id, tabGroups]);

  const tabList: RenderListType[] = useMemo(() => {
    const list: RenderListType[] = [];

    if (!tabs.length) {
      return list;
    }
    const done: number[] = [];

    tabs.forEach((tab) => {
      if (done.includes(tab.groupId)) {
        return;
      }
      const tabGroup = groups.find(({ id }) => id === tab.groupId);
      if (tabGroup) {
        const arr = tabs.filter((tab) => tab.groupId === tabGroup.id);
        list.push({ group: { tabGroup, tabs: arr }, id: tabGroup.id });
        done.push(tabGroup.id);
        return;
      }
      if (tab.id) {
        list.push({ tab, id: tab.id });
      }
    });

    return list;
  }, [tabs, groups]);

  if (!win.id || tabs.length === 0) {
    return null;
  }
  return (
    <ListGroupCard
      collapsible
      initOpen
      cardTitle={`${tabs.length} Tabs`}
      titleTypographyProps={{ variant: "subtitle1" }}
    >
      {tabList.map(({ id, tab, group }) => {
        if (group) {
          return (
            <TabGroupView
              key={id}
              group={group.tabGroup}
              tabs={group.tabs}
              windowFocused={win.focused}
            />
          );
        }
        if (tab) {
          return <TabView key={id} tab={tab} windowFocused={win.focused} />;
        }
        return null;
      })}
    </ListGroupCard>
  );
}
