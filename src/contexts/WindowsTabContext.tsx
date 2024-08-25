import { PropsWithChildren } from "react";
import FilterProvider, {
  useFilterDispatch,
  useFilters,
  useIsFiltered,
  useSearch,
} from "./windows/FilterContext";
import SelectedTabsProvider, {
  useSelectedTabs,
  useSelectedTabsDispatch,
} from "./windows/SelectedTabsContext";
import SortProvider, { useSort, useSortDispatch } from "./windows/SortContext";

export {
  useFilterDispatch,
  useFilters,
  useIsFiltered,
  useSearch,
  useSelectedTabs,
  useSelectedTabsDispatch,
  useSort,
  useSortDispatch,
};

export default function WindowsTabProvider({ children }: PropsWithChildren) {
  return (
    <SortProvider>
      <FilterProvider>
        <SelectedTabsProvider>{children}</SelectedTabsProvider>
      </FilterProvider>
    </SortProvider>
  );
}
