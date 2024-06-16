import { Dispatch, PropsWithChildren, createContext, useContext, useReducer } from "react";

type TabIdType = Exclude<chrome.tabs.Tab["id"], undefined>;

const SelectedTabsContext = createContext<TabIdType[]>([]);
const SelectedTabsDispatchContext = createContext<Dispatch<ActionType>>(() => {});

type ActionType = {
  id: TabIdType;
  type: "selected" | "unselected" | "reset";
};
function selectedTabsReducer(selectedTabs: TabIdType[], action: ActionType): TabIdType[] {
  switch (action.type) {
    case "selected": {
      return [...selectedTabs, action.id];
    }
    case "unselected": {
      return selectedTabs.filter((t) => t !== action.id);
    }
    case "reset": {
      return [];
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export default function SelectedTabsProvider({ children }: PropsWithChildren) {
  const [selectedTabs, dispatch] = useReducer(selectedTabsReducer, []);

  return (
    <SelectedTabsContext.Provider value={selectedTabs}>
      <SelectedTabsDispatchContext.Provider value={dispatch}>
        {children}
      </SelectedTabsDispatchContext.Provider>
    </SelectedTabsContext.Provider>
  );
}

export function useSelectedTabs() {
  return useContext(SelectedTabsContext);
}

export function useSelectedTabsDispatch() {
  return useContext(SelectedTabsDispatchContext);
}
