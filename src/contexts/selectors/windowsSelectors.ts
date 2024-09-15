import { useWindowsContext } from "../DataProvider";
import { State } from "../reducers/windowsReducer";

export function _useWindows(context: State) {
  const arr = [];
  // TODO: default sort by accessed
  context.map.forEach((w) => arr.push(w));
  return arr;
}

export function useWindows() {
  return _useWindows(useWindowsContext());
}

export function _useWindowCount(context: State) {
  return context.map.size;
}

export function useWindowCount() {
  return _useWindowCount(useWindowsContext());
}

export function _useWindow(context: State, windowId: number) {
  return context.map.get(windowId);
}

export function useWindow(windowId: number) {
  return _useWindow(useWindowsContext(), windowId);
}
