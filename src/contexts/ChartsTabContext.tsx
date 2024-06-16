import { PropsWithChildren } from "react";
import FiltersProvider, { useFilters, useFiltersDispatch } from "./windows/FiltersContext";

export { useFilters, useFiltersDispatch };

export default function ChartsTabProvider({ children }: PropsWithChildren) {
  return <FiltersProvider>{children}</FiltersProvider>;
}
