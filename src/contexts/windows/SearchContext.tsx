import { Dispatch, createContext, useContext, useReducer } from "react";

const SearchContext = createContext<string>(null);
const SearchDispatchContext = createContext<Dispatch<ActionType>>(null);

type ActionType = {
  value: string;
  type: "update" | "reset";
};
function searchReducer(search: string, action: ActionType): string {
  switch (action.type) {
    case "update": {
      return action.value;
    }
    case "reset": {
      return "";
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export default function SearchProvider({ children }) {
  const [search, dispatch] = useReducer(searchReducer, "");

  return (
    <SearchContext.Provider value={search}>
      <SearchDispatchContext.Provider value={dispatch}>{children}</SearchDispatchContext.Provider>
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}

export function useSearchDispatch() {
  return useContext(SearchDispatchContext);
}
