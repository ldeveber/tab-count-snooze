import { SORT_OPTION } from "src/utils/options";
import {
  useDisplayContext,
  useTabGroupsContext,
  useTabsContext,
  useWindowsContext,
} from "./DataProvider";

// -- Display -------------------------------------------------------------- //

export function useIsFiltered() {
  const context = useDisplayContext();
  return context.filters.dupes || context.filters.search.length > 0;
}

export function useSearch() {
  return useDisplayContext().filters.search;
}

export function useDuplicateFilter() {
  return useDisplayContext().filters.dupes;
}

export function useSort() {
  return useDisplayContext().sort.key;
}

// -- Windows -------------------------------------------------------------- //

export function useWindows() {
  const arr = [];
  useWindowsContext().map.forEach((w) => arr.push(w));
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
  const arr = [];
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

function sortTabs(tabs: Array<chrome.tabs.Tab>) {
  const sort = useSort();
  if (sort === SORT_OPTION.LastAccessed) {
    tabs.sort((a, b) => b.lastAccessed - a.lastAccessed);
  } else {
    tabs.sort((a, b) => a.index - b.index);
  }
  return tabs;
}

function _useTabs(windowId?: number) {
  const arr = [];
  const search = useSearch();
  useTabsContext().map.forEach((t) => {
    if (typeof windowId === "number" && windowId !== t.windowId) {
      return;
    }
    if (
      t.title?.toLowerCase().includes(search.toLowerCase()) ||
      t.url?.toLowerCase().includes(search.toLowerCase())
    ) {
      arr.push(t);
    }
  });
  return sortTabs(arr);
}

export function useAllTabs() {
  const arr = [];
  useTabsContext().map.forEach((t) => arr.push(t));
  return arr;
}
export function useTabs(windowId: number) {
  return _useTabs(windowId);
}
export function useTabCount() {
  return useTabsContext().map.size;
}
export function useTab(tabId: number) {
  return useTabsContext().map.get(tabId);
}

export function useSelectedTabIds() {
  return _useTabs().map((t) => t.id);
}
