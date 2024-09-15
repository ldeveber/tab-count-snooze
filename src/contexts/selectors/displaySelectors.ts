import { useDisplayContext } from "../DataProvider";
import { State } from "../reducers/displayReducer";

export function _useIsFiltered(context: State) {
  return (
    context.filters.dupes ||
    context.filters.properties.length > 0 ||
    context.filters.search.length > 0
  );
}

export function useIsFiltered() {
  return _useIsFiltered(useDisplayContext());
}

export function _useFilters(context: State) {
  return context.filters.properties;
}

export function useFilters() {
  return _useFilters(useDisplayContext());
}

export function _useSearch(context: State) {
  return context.filters.search;
}

export function useSearch() {
  return _useSearch(useDisplayContext());
}

export function _useDuplicateFilter(context: State) {
  return context.filters.dupes;
}

export function useDuplicateFilter() {
  return _useDuplicateFilter(useDisplayContext());
}

export function _useSort(context: State) {
  return context.sort.key;
}

export function useSort() {
  return _useSort(useDisplayContext());
}
