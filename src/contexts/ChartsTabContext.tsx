import { PropsWithChildren } from "react";
import FiltersProvider, { useFilterDispatch, useFilters } from "./windows/FilterContext";

export { useFilters, useFilterDispatch as useFiltersDispatch };

export default function ChartsTabProvider({ children }: PropsWithChildren) {
  return <FiltersProvider>{children}</FiltersProvider>;
}
