import { Dispatch, PropsWithChildren, createContext, useReducer } from "react";
import displayReducer, {
  Action as DisplayAction,
} from "./reducers/displayReducer";
import tabGroupsReducer, {
  Action as TabGroupsAction,
} from "./reducers/tabGroupsReducer";
import tabsReducer, { Action as TabsAction } from "./reducers/tabsReducer";
import windowsReducer, {
  Action as WindowsAction,
} from "./reducers/windowsReducer";
import { initialState, type State } from "./state";

export const DataContext = createContext<State>(initialState);
export const DataDispatchContext = createContext<Dispatch<Action>>(() => {});

type Action =
  | WindowsAction
  | TabGroupsAction
  | TabsAction
  | DisplayAction
  | { type: "clear" };
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
    case "clearSelection":
    case "select":
    case "unselect":
    case "selectTabs":
    case "unselectTabs": {
      return { ...state, tabs: tabsReducer(state.tabs, action) };
    }
    case "search":
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
      <DataDispatchContext.Provider value={dispatch}>
        {children}
      </DataDispatchContext.Provider>
    </DataContext.Provider>
  );
}
