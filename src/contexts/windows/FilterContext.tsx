import { Dispatch, PropsWithChildren, createContext, useContext, useReducer } from "react";
import { TAB_PROPERTIES } from "src/utils/chrome";

type State = { filters: TAB_PROPERTIES[]; search: string };

const initialFilterState: State = {
  filters: [],
  search: "",
};

const FilterContext = createContext<State>(initialFilterState);
const FilterDispatchContext = createContext<Dispatch<Action>>(() => {});

type Action =
  | {
      type: "clear";
    }
  | {
      search: State["search"];
      type: "search";
    }
  | {
      filters: State["filters"];
      type: "update";
    };
function filtersReducer(state: State, action: Action): State {
  switch (action.type) {
    case "update": {
      return {
        ...state,
        filters: action.filters,
      };
    }
    case "search": {
      return {
        ...state,
        search: action.search,
      };
    }
    case "clear": {
      return {
        filters: [],
        search: "",
      };
    }
    default: {
      return state;
    }
  }
}

export default function FilterProvider({ children }: PropsWithChildren) {
  const [filterState, dispatch] = useReducer(filtersReducer, initialFilterState);

  return (
    <FilterContext.Provider value={filterState}>
      <FilterDispatchContext.Provider value={dispatch}>{children}</FilterDispatchContext.Provider>
    </FilterContext.Provider>
  );
}

export function useIsFiltered() {
  const context = useContext(FilterContext);
  return context.filters.length > 0 || context.search.length > 0;
}

export function useFilters() {
  return useContext(FilterContext).filters;
}

export function useSearch() {
  return useContext(FilterContext).search;
}

export function useFilterDispatch() {
  return useContext(FilterDispatchContext);
}
