import {
  createInitialState as createDisplayState,
  type State as DisplayState,
} from "./reducers/displayReducer";
import {
  createInitialState as createTabGroupsState,
  type State as TabGroupsState,
} from "./reducers/tabGroupsReducer";
import {
  createInitialState as createTabsState,
  type State as TabsState,
} from "./reducers/tabsReducer";
import {
  createInitialState as createWindowsState,
  type State as WindowsState,
} from "./reducers/windowsReducer";

export type State = {
  windows: WindowsState;
  tabGroups: TabGroupsState;
  tabs: TabsState;
  display: DisplayState;
};

export const createInitialState = (): State => ({
  windows: createWindowsState(),
  tabGroups: createTabGroupsState(),
  tabs: createTabsState(),
  display: createDisplayState(),
});
