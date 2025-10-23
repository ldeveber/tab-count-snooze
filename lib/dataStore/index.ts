import { useContext, useMemo } from "react";
import type { Browser } from "#imports";
import { DataContext, DataDispatchContext } from "./DataProvider";

export function useDataDispatch() {
  return useContext(DataDispatchContext);
}

function useDataContext() {
  return useContext(DataContext);
}

export function useDisplayContext() {
  return useDataContext().display;
}

export function useTabsContext() {
  return useDataContext().tabs;
}

export function useTabGroupsContext() {
  return useDataContext().tabGroups;
}

export function useWindowsContext() {
  return useDataContext().windows;
}

// -- Display -------------------------------------------------------------- //

export function useIsFiltered() {
  const context = useDisplayContext();
  return context.filters.dupesOnly || context.filters.search.length > 0;
}

export function useFilters() {
  return useDisplayContext().filters;
}

export function useSort() {
  return useDisplayContext().sort;
}

// -- Windows -------------------------------------------------------------- //

export function useWindows() {
  const arr: Array<Browser.windows.Window> = [];
  useWindowsContext().map.forEach((w) => {
    arr.push({ ...w, tabs: w.tabs ? [...w.tabs] : undefined });
  });
  return arr;
}
export function useWindowCount() {
  return useWindowsContext().map.size;
}
export function useWindow(windowId: number) {
  return useWindowsContext().map.get(windowId);
}

// -- Tab Groups ----------------------------------------------------------- //

export function useTabGroups(windowId?: number) {
  const arr: Array<Browser.tabGroups.TabGroup> = [];
  useTabGroupsContext().map.forEach((tg) => {
    if (windowId === undefined) {
      arr.push(tg);
    } else if (tg.windowId === windowId) {
      arr.push(tg);
    }
  });
  return arr;
}
export function useTabGroup(tabGroupId: number) {
  return useTabGroupsContext().map.get(tabGroupId);
}

// -- Tabs ----------------------------------------------------------------- //

export function useAllTabs() {
  const { map } = useTabsContext();
  const arr = useMemo(() => Array.from(map.values()), [map]);
  return arr;
}

export function useTabs(windowId?: number) {
  const { map } = useTabsContext();
  const arr = useMemo(
    () => Array.from(map.values()).filter((t) => t.windowId === windowId),
    [map, windowId],
  );

  return arr;
}
export function useTabCount() {
  return useTabsContext().map.size;
}
export function useTab(tabId: number) {
  return useTabsContext().map.get(tabId);
}

export function useSelectedTabs() {
  return useTabsContext().selectedTabIds;
}

export function useMostRecentTabFromWindow(windowId?: number) {
  const arr = useTabs(windowId);
  const mostRecentTab = useMemo(() => {
    return arr.sort((a, b) => {
      if (a.lastAccessed !== undefined && b.lastAccessed !== undefined) {
        return b.lastAccessed - a.lastAccessed;
      }
      if (a.lastAccessed !== undefined) {
        return 1;
      }
      return -1;
    })[0];
  }, [arr]);
  return mostRecentTab;
}
