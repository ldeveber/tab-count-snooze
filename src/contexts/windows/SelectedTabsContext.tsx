import { Dispatch, PropsWithChildren, createContext, useContext, useReducer } from "react";
import { type TabIdType } from "src/utils/chrome";

export type State = { tabIds: TabIdType[] };

export const initialState: State = {
  tabIds: [],
};

const SelectedTabsContext = createContext<State>(initialState);
const SelectedTabsDispatchContext = createContext<Dispatch<ActionType>>(() => {});

type ActionType =
  | {
      readonly type: "reset";
    }
  | {
      ids: TabIdType[];
      readonly type: "set";
    }
  | {
      id: TabIdType;
      readonly type: "select" | "unselect";
    };
function selectedTabsReducer(state: State, action: ActionType): State {
  switch (action.type) {
    case "select": {
      return {
        ...state,
        tabIds: [...state.tabIds, action.id],
      };
    }
    case "unselect": {
      return {
        ...state,
        tabIds: state.tabIds.filter((t) => t !== action.id),
      };
    }
    case "set": {
      return {
        ...state,
        tabIds: action.ids,
      };
    }
    case "reset": {
      return initialState;
    }
  }
}

export default function SelectedTabsProvider({
  children,
  testState,
}: PropsWithChildren<{
  testState?: State;
}>) {
  const [selectedTabs, dispatch] = useReducer(selectedTabsReducer, testState || initialState);

  return (
    <SelectedTabsContext.Provider value={selectedTabs}>
      <SelectedTabsDispatchContext.Provider value={dispatch}>
        {children}
      </SelectedTabsDispatchContext.Provider>
    </SelectedTabsContext.Provider>
  );
}

export function useSelectedTabs() {
  return useContext(SelectedTabsContext).tabIds;
}

export function useSelectedTabsDispatch() {
  return useContext(SelectedTabsDispatchContext);
}
