import "@testing-library/jest-dom/vitest";
import { initialState } from "src/contexts/reducers/displayReducer";
import { FILTER_TAB_PROPERTIES } from "src/utils/filterTabs";
import { SORT_OPTION } from "src/utils/options";
import { describe, expect, test } from "vitest";
import {
  _useDuplicateFilter,
  _useFilters,
  _useIsFiltered,
  _useSearch,
  _useSort,
} from "../displaySelectors";

describe("Display Selectors", () => {
  test.each([
    [false, undefined, undefined, undefined],
    [false, false, [], ""],
    [true, true, undefined, undefined],
    [true, undefined, [FILTER_TAB_PROPERTIES.Active], undefined],
    [true, true, undefined, "meow"],
  ])(
    "useIsFiltered should return %b",
    (
      expected: boolean,
      dupes = initialState.filters.dupes,
      properties = initialState.filters.properties,
      search = initialState.filters.search,
    ) => {
      expect(
        _useIsFiltered({
          ...initialState,
          filters: { dupes, search, properties },
        }),
      ).toEqual(expected);
    },
  );

  test("useFilters", () => {
    expect(
      _useFilters({
        ...initialState,
        filters: { ...initialState.filters, properties: [FILTER_TAB_PROPERTIES.Active] },
      }),
    ).toStrictEqual([FILTER_TAB_PROPERTIES.Active]);
  });

  test("useSearch", () => {
    expect(
      _useSearch({
        ...initialState,
        filters: { ...initialState.filters, search: "meow" },
      }),
    ).toEqual("meow");
  });

  test("useDuplicateFilter", () => {
    expect(
      _useDuplicateFilter({
        ...initialState,
        filters: { ...initialState.filters, dupes: true },
      }),
    ).toEqual(true);
  });

  test("useSort", () => {
    expect(
      _useSort({
        ...initialState,
        sort: { ...initialState.sort, key: SORT_OPTION.LastAccessed },
      }),
    ).toEqual(SORT_OPTION.LastAccessed);
  });
});
