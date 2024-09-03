import { Dispatch, PropsWithChildren, createContext, useContext, useReducer } from "react";
import { FILTER_TAB_PROPERTIES } from "src/utils/filterTabs";

export type State = { filters: FILTER_TAB_PROPERTIES[]; search: string; dupes: { show: boolean } };

export const initialState: State = {
  filters: [],
  search: "",
  dupes: { show: false },
};

const FilterContext = createContext<State>(initialState);
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
      dupes: State["dupes"];
      type: "dupes";
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
    case "dupes": {
      return {
        ...state,
        dupes: action.dupes,
      };
    }
    case "clear": {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

export default function FilterProvider({
  children,
  testState,
}: PropsWithChildren<{
  testState?: State;
}>) {
  const [filterState, dispatch] = useReducer(filtersReducer, testState || initialState);

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

export function useDuplicateFilter() {
  return useContext(FilterContext).dupes;
}

export function useFilterDispatch() {
  return useContext(FilterDispatchContext);
}
