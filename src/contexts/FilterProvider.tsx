import { PropsWithChildren } from "react";
import FilterProvider, {
  useDuplicateFilter,
  useFilterDispatch,
  useFilters,
  useIsFiltered,
  useSearch,
  type State as FilterState,
} from "./windows/FilterContext";
import SelectedTabsProvider, {
  useSelectedTabs,
  useSelectedTabsDispatch,
  type State as SelectedTabsState,
} from "./windows/SelectedTabsContext";
import SortProvider, {
  useSort,
  useSortDispatch,
  type State as SortState,
} from "./windows/SortContext";

export {
  useDuplicateFilter,
  useFilterDispatch,
  useFilters,
  useIsFiltered,
  useSearch,
  useSelectedTabs,
  useSelectedTabsDispatch,
  useSort,
  useSortDispatch,
};

export type TestState = {
  filterState?: FilterState;
  selectedTabsState?: SelectedTabsState;
  sortState?: SortState;
};

export default function Provider({
  children,
  testState = {},
}: PropsWithChildren<{
  testState?: TestState;
}>) {
  return (
    <SortProvider testState={testState.sortState}>
      <FilterProvider testState={testState.filterState}>
        <SelectedTabsProvider testState={testState.selectedTabsState}>
          {children}
        </SelectedTabsProvider>
      </FilterProvider>
    </SortProvider>
  );
}
