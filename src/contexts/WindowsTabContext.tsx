import { PropsWithChildren } from "react";
import FiltersProvider, { useFilters, useFiltersDispatch } from "./windows/FiltersContext";
import SearchProvider, { useSearch, useSearchDispatch } from "./windows/SearchContext";
import SelectedTabsProvider, {
  useSelectedTabs,
  useSelectedTabsDispatch,
} from "./windows/SelectedTabsContext";
import SortProvider, { useSort, useSortDispatch } from "./windows/SortContext";

export {
  useFilters,
  useFiltersDispatch,
  useSearch,
  useSearchDispatch,
  useSelectedTabs,
  useSelectedTabsDispatch,
  useSort,
  useSortDispatch,
};

export default function WindowsTabProvider({ children }: PropsWithChildren) {
  return (
    <SortProvider>
      <FiltersProvider>
        <SearchProvider>
          <SelectedTabsProvider>{children}</SelectedTabsProvider>
        </SearchProvider>
      </FiltersProvider>
    </SortProvider>
  );
}
