import { Dispatch, createContext, useContext, useReducer } from "react";
import { SORT_OPTION } from "src/utils/options";

const SortContext = createContext<SORT_OPTION>(null);
const SortDispatchContext = createContext<Dispatch<ActionType>>(null);

type ActionType = {
  sort: SORT_OPTION;
  type: "update" | "reset";
};
function sortReducer(sort: SORT_OPTION, action: ActionType): SORT_OPTION {
  switch (action.type) {
    case "update": {
      return action.sort;
    }
    case "reset": {
      return SORT_OPTION.Default;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export default function SortProvider({ children }) {
  const [sort, dispatch] = useReducer(sortReducer, SORT_OPTION.Default);

  return (
    <SortContext.Provider value={sort}>
      <SortDispatchContext.Provider value={dispatch}>{children}</SortDispatchContext.Provider>
    </SortContext.Provider>
  );
}

export function useSort() {
  return useContext(SortContext);
}

export function useSortDispatch() {
  return useContext(SortDispatchContext);
}
