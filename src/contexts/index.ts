import { useDataContext } from "./DataProvider";

// -- Display -------------------------------------------------------------- //

const useDisplayContext = () => useDataContext().display;

export function useIsFiltered() {
  const context = useDisplayContext();
  return (
    context.filters.dupes ||
    context.filters.properties.length > 0 ||
    context.filters.search.length > 0
  );
}

export function useFilters() {
  return useDisplayContext().filters.properties;
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

const useWindowsContext = () => useDataContext().windows;

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

const useTabGroupsContext = () => useDataContext().tabGroups;

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

const useTabsContext = () => useDataContext().tabs;

export function useAllTabs() {
  const arr = [];
  useTabsContext().map.forEach((t) => arr.push(t));
  return arr;
}
export function useTabs(windowId: number) {
  const arr = [];
  useTabsContext().map.forEach((t) => {
    if (windowId === t.windowId) {
      arr.push(t);
    }
  });
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
