import { useContext } from "react";
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
  const arr: Array<Browser.windows.Window> = [];
  useWindowsContext().map.forEach((w) => {
    // TODO FIXME - Argument of type 'FreezedObject<Window>' is not assignable to parameter of type 'Window'.
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
  const arr: Array<Browser.tabs.Tab> = [];
  useTabsContext().map.forEach((t) => arr.push(t));
  return arr;
}
export function useTabs(windowId?: number) {
  const arr: Array<Browser.tabs.Tab> = [];
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
