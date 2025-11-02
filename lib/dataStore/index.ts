import { useContext, useMemo } from "react";
import type { Browser } from "#imports";
import { filterSortTabs, sortTabs } from "../filterTabs";
import { SORT_BY, SORT_OPTION, type SortOptions } from "../options";
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
  return (
    context.filters.dupesOnly ||
    context.filters.stale ||
    context.filters.search.length > 0
  );
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

export function useAllSortedTabs(
  sort: SortOptions = {
    key: SORT_OPTION.LastAccessed,
    direction: SORT_BY.Descending,
  },
) {
  const { map } = useTabsContext();
  const arr = useMemo(
    () => sortTabs(Array.from(map.values()), sort),
    [map, sort],
  );
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

export function useDisplayedTabs(windowId?: number) {
  const { map, dupes } = useTabsContext();
  const { filters, sort } = useDisplayContext();
  const arr = useMemo(
    () =>
      filterSortTabs(Array.from(map.values()), dupes, filters, sort, windowId),
    [map, dupes, windowId, filters, sort],
  );

  return arr;
}

/**
 * @param limit The number to limit by. Defaulted to 0 to return all.
 * @returns A list of tab origins with counts, sorted by count.
 */
export function useTabOrigins(
  limit: number = 0,
): Array<{ origin: string; count: number }> {
  const allTabs = useAllTabs();

  const topOrigins = useMemo(() => {
    const counts: Array<{ origin: string; count: number }> = [];
    allTabs.forEach((tab) => {
      if (!tab.url) {
        return;
      }
      const url = new URL(tab.url);
      let c = counts.find((d) => d.origin === url.origin);
      if (!c) {
        c = { origin: url.origin, count: 0 };
        counts.push(c);
      }
      c.count++;
    });

    const sortedCounts = counts.sort((a, b) => b.count - a.count);

    if (limit === 0) {
      return sortedCounts;
    }
    return sortedCounts.slice(0, limit);
  }, [allTabs, limit]);
  return topOrigins;
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

export function useAllOtherTabs(tabId?: number) {
  const tabs = useAllTabs();
  return useMemo(() => tabs.filter((t) => t.id !== tabId), [tabs, tabId]);
}

export function useTabHasDupes(tab: Browser.tabs.Tab) {
  const tabs = useAllOtherTabs(tab.id);
  return useMemo(() => {
    let hasDupe = false;
    for (const t of tabs) {
      if (!hasDupe) {
        hasDupe = t.url === tab.url;
      }
      if (hasDupe) {
        break;
      }
    }
    return { hasDupe };
  }, [tabs, tab.url]);
}
