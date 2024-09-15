import { useTabGroupsContext } from "../DataProvider";
import { State } from "../reducers/tabGroupsReducer";

export function _useTabGroups(context: State, windowId?: number) {
  const arr = [];
  context.map.forEach((tg) => {
    if (windowId === undefined) {
      arr.push(tg);
    } else if (tg.windowId === windowId) {
      arr.push(tg);
    }
  });
  return arr;
}

export function useTabGroups(windowId?: number) {
  return _useTabGroup(useTabGroupsContext(), windowId);
}

export function _useTabGroup(context: State, tabGroupId: number) {
  return context.map.get(tabGroupId);
}

export function useTabGroup(tabGroupId: number) {
  return _useTabGroup(useTabGroupsContext(), tabGroupId);
}
