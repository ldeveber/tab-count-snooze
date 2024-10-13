import {
  initialState as initialDisplayState,
  type State as DisplayState,
} from "./reducers/displayReducer";
import {
  initialState as initialTabGroupsState,
  type State as TabGroupsState,
} from "./reducers/tabGroupsReducer";
import { initialState as initialTabsState, type State as TabsState } from "./reducers/tabsReducer";
import {
  initialState as initialWindowsState,
  type State as WindowsState,
} from "./reducers/windowsReducer";

export type State = {
  windows: WindowsState;
  tabGroups: TabGroupsState;
  tabs: TabsState;
  display: DisplayState;
};

export const initialState: State = {
  windows: initialWindowsState,
  tabGroups: initialTabGroupsState,
  tabs: initialTabsState,
  display: initialDisplayState,
};
