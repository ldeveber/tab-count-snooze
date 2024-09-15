import { Dispatch, PropsWithChildren, createContext, useContext, useReducer } from "react";
import displayReducer, {
  Action as DisplayAction,
  initialState as initialDisplayState,
  type State as DisplayState,
} from "./reducers/displayReducer";
import tabGroupsReducer, {
  Action as TabGroupsAction,
  initialState as initialTabGroupsState,
  type State as TabGroupsState,
} from "./reducers/tabGroupsReducer";
import tabsReducer, {
  Action as TabsAction,
  initialState as initialTabsState,
  type State as TabsState,
} from "./reducers/tabsReducer";
import windowsReducer, {
  Action as WindowsAction,
  initialState as initialWindowsState,
  type State as WindowsState,
} from "./reducers/windowsReducer";

type State = {
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

const DataContext = createContext<State>(initialState);
const DataDispatchContext = createContext<Dispatch<Action>>(() => {});

type Action = WindowsAction | TabGroupsAction | TabsAction | DisplayAction | { type: "clear" };
function dataReducer(state: State, action: Action): State {
  switch (action.type) {
    case "setWindows":
    case "addWindow":
    case "updateWindow":
    case "removeWindow": {
      return { ...state, windows: windowsReducer(state.windows, action) };
    }
    case "setTabGroups":
    case "addTabGroup":
    case "updateTabGroup":
    case "removeTabGroup": {
      return { ...state, tabGroups: tabGroupsReducer(state.tabGroups, action) };
    }
    case "setTabs":
    case "addTab":
    case "updateTab":
    case "removeTab":
    case "bulkSelect":
    case "select":
    case "unselect":
    case "selectTabs":
    case "unselectTabs": {
      return { ...state, tabs: tabsReducer(state.tabs, action) };
    }
    case "search":
    case "filter":
    case "resetFilter":
    case "sort":
    case "resetSort": {
      return { ...state, display: displayReducer(state.display, action) };
    }
    case "clear": {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

export default function DataProvider({
  children,
  testState,
}: PropsWithChildren<{
  testState?: State;
}>) {
  const [state, dispatch] = useReducer(dataReducer, testState || initialState);

  return (
    <DataContext.Provider value={state}>
      <DataDispatchContext.Provider value={dispatch}>{children}</DataDispatchContext.Provider>
    </DataContext.Provider>
  );
}

export function useDataDispatch() {
  return useContext(DataDispatchContext);
}
export function useDataContext() {
  return useContext(DataContext);
}

/**
 * @deprecated use `useDataDispatch` instead
 */
export const useFilterDispatch = useDataDispatch;
/**
 * @deprecated use `useDataDispatch` instead
 */
export const useSelectedTabsDispatch = useDataDispatch;
/**
 * @deprecated use `useDataDispatch` instead
 */
export const useSortDispatch = useDataDispatch;
