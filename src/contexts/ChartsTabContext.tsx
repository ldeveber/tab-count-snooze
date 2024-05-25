import FiltersProvider, { useFilters, useFiltersDispatch } from "./windows/FiltersContext";

export { useFilters, useFiltersDispatch };

export default function ChartsTabProvider({ children }) {
  return <FiltersProvider>{children}</FiltersProvider>;
}
