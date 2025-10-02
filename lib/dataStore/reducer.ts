import displayReducer, {
  ACTION_TYPES as DISPLAY_ACTION_TYPES,
  type Action as DisplayAction,
} from "./reducers/displayReducer";
import tabGroupsReducer, {
  ACTION_TYPES as TAB_GROUPS_ACTION_TYPES,
  type Action as TabGroupsAction,
} from "./reducers/tabGroupsReducer";
import tabsReducer, {
  ACTION_TYPES as TABS_ACTION_TYPES,
  type Action as TabsAction,
} from "./reducers/tabsReducer";
import windowsReducer, {
  ACTION_TYPES as WINDOWS_ACTION_TYPES,
  type Action as WindowsAction,
} from "./reducers/windowsReducer";
import { createInitialState, type State } from "./state";

export type BackgroundAction =
  | WindowsAction
  | TabGroupsAction
  | TabsAction
  | { type: "clear" };
export type Action = BackgroundAction | DisplayAction | { type: "clear" };

type WindowsActionType = (typeof WINDOWS_ACTION_TYPES)[number];
function isWindowsAction(action: Action): action is WindowsAction {
  return WINDOWS_ACTION_TYPES.includes(action.type as WindowsActionType);
}

type TabsActionType = (typeof TABS_ACTION_TYPES)[number];
function isTabsAction(action: Action): action is TabsAction {
  return TABS_ACTION_TYPES.includes(action.type as TabsActionType);
}

type TabGroupsActionType = (typeof TAB_GROUPS_ACTION_TYPES)[number];
function isTabGroupsAction(action: Action): action is TabGroupsAction {
  return TAB_GROUPS_ACTION_TYPES.includes(action.type as TabGroupsActionType);
}

type DisplayActionType = (typeof DISPLAY_ACTION_TYPES)[number];
function isDisplayAction(action: Action): action is DisplayAction {
  return DISPLAY_ACTION_TYPES.includes(action.type as DisplayActionType);
}

export function dataReducer(state: State, action: Action): State {
  if (action.type === "clear") {
    return createInitialState();
  }

  if (isWindowsAction(action)) {
    const windowsState = windowsReducer(state.windows, action);
    if (windowsState === state.windows) {
      return state;
    }
    return { ...state, windows: windowsState };
  }

  if (isTabGroupsAction(action)) {
    const tabGroupsState = tabGroupsReducer(state.tabGroups, action);
    if (tabGroupsState === state.tabGroups) {
      return state;
    }
    return { ...state, tabGroups: tabGroupsState };
  }

  if (isTabsAction(action)) {
    const tabsState = tabsReducer(state.tabs, action);
    if (tabsState === state.tabs) {
      return state;
    }
    return { ...state, tabs: tabsState };
  }

  if (isDisplayAction(action)) {
    const displayState = displayReducer(state.display, action);
    if (displayState === state.display) {
      return state;
    }
    return { ...state, display: displayState };
  }

  console.warn("Unknown action, returning original state.", action);
  return state;
}
