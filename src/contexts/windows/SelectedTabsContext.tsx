import { Dispatch, PropsWithChildren, createContext, useContext, useReducer } from "react";
import { type TabIdType } from "src/utils/chrome";

const SelectedTabsContext = createContext<TabIdType[]>([]);
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
      readonly type: "selected" | "unselected";
    };
function selectedTabsReducer(selectedTabs: TabIdType[], action: ActionType): TabIdType[] {
  switch (action.type) {
    case "selected": {
      return [...selectedTabs, action.id];
    }
    case "unselected": {
      return selectedTabs.filter((t) => t !== action.id);
    }
    case "set": {
      return action.ids;
    }
    case "reset": {
      return [];
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
