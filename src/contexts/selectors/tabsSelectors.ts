import { useTabsContext } from "../DataProvider";
import { State } from "../reducers/tabsReducer";

export function _useAllTabs(context: State) {
  const arr = [];
  context.map.forEach((t) => arr.push(t));
  return arr;
}

export function useAllTabs() {
  return _useAllTabs(useTabsContext());
}

export function _useTabs(context: State, windowId: number) {
  const arr = [];
  context.map.forEach((t) => {
    if (windowId === t.windowId) {
      arr.push(t);
    }
  });
  return arr;
}

export function useTabs(windowId: number) {
  return _useTabs(useTabsContext(), windowId);
}

export function _useTabCount(context: State) {
  return context.map.size;
}

export function useTabCount() {
  return _useTabCount(useTabsContext());
}

export function _useTab(context: State, tabId: number) {
  return context.map.get(tabId);
}

export function useTab(tabId: number) {
  return _useTab(useTabsContext(), tabId);
}

export function _useSelectedTabs(context: State) {
  return context.selectedTabIds;
}

export function useSelectedTabs() {
  return _useSelectedTabs(useTabsContext());
}
