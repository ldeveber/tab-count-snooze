import "@testing-library/jest-dom/vitest";
import { initialState } from "src/contexts/reducers/displayReducer";
import { SORT_OPTION } from "src/utils/options";
import { describe, expect, test } from "vitest";
import { _useDuplicateFilter, _useIsFiltered, _useSearch, _useSort } from "../displaySelectors";

describe("Display Selectors", () => {
  test.each([
    [false, undefined, undefined],
    [false, false, ""],
    [true, true, undefined],
    [true, true, "meow"],
  ])(
    "useIsFiltered should return %b",
    (
      expected: boolean,
      dupes = initialState.filters.dupes,
      search = initialState.filters.search,
    ) => {
      expect(
        _useIsFiltered({
          ...initialState,
          filters: { dupes, search },
        }),
      ).toEqual(expected);
    },
  );

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
