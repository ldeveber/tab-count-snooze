// @vitest-environment happy-dom

import { faker } from "@faker-js/faker";
import { describe, expect, test } from "vitest";
import {
  useAllSortedTabs,
  useAllTabs,
  useIsFiltered,
  useMostRecentTabFromWindow,
  useSelectedTabs,
  useTabOrigins,
  useTabs,
  useWindows,
} from "@/lib/dataStore";
import { SORT_BY, SORT_OPTION } from "@/lib/options";
import { mockTab, mockWindow } from "@/tests/utils/mockDataHelper";
import {
  renderHookWithContext,
  type TestProviderState,
} from "../react-testing-library-utils";

describe("data store selectors", () => {
  describe("useWindows", () => {
    test("should return all windows (copied)", () => {
      const sourceWindow = mockWindow({ id: 1 });
      const sourceTab = mockTab({ id: 10, windowId: 1 });

      const winMap = new Map();
      winMap.set(1, sourceWindow);

      const tabMap = new Map();
      tabMap.set(10, sourceTab);

      const { result } = renderHookWithContext(() => useWindows(), {
        windows: { map: winMap },
        tabs: { map: tabMap },
      });

      expect(result.current).toHaveLength(1);
      expect(result.current[0]).not.toBe(sourceWindow);
      expect(result.current[0].tabs).not.toBe(sourceWindow.tabs);

      expect(result.current[0]).toEqual(sourceWindow);
      expect(result.current[0].tabs).toEqual(sourceWindow.tabs);
    });
  });

  describe("tabs", () => {
    describe("useAllTabs", () => {
      test("should return various tab states", () => {
        const tab1 = mockTab({ id: 1, windowId: 1 });
        const tab2 = mockTab({ id: 2, windowId: 2 });

        const tabMap = new Map();
        tabMap.set(1, tab1);
        tabMap.set(2, tab2);

        const state: TestProviderState = {
          tabs: { map: tabMap, selectedTabIds: [2] },
        };

        const { result: allTabs } = renderHookWithContext(
          () => useAllTabs(),
          state,
        );
        expect(allTabs.current).toHaveLength(2);

        const { result: windowTabs } = renderHookWithContext(
          () => useTabs(1),
          state,
        );
        expect(windowTabs.current).toHaveLength(1);
        expect(windowTabs.current[0].id).toBe(1);

        const { result: selected } = renderHookWithContext(
          () => useSelectedTabs(),
          state,
        );
        expect(selected.current).toEqual([2]);
      });
    });

    describe("useAllSortedTabs", () => {
      test("should return all tabs, sorted", () => {
        const older = mockTab({
          id: 1,
          windowId: 1,
          lastAccessed: Date.now() - 1000,
        });
        const newer = mockTab({ id: 2, windowId: 1, lastAccessed: Date.now() });

        const tabMap = new Map();
        tabMap.set(1, older);
        tabMap.set(2, newer);

        const { result } = renderHookWithContext(() => useAllSortedTabs(), {
          tabs: { map: tabMap },
        });

        expect(result.current).toStrictEqual([older, newer]);
      });
    });

    describe("useMostRecentTabFromWindow", () => {
      test("should return most recent tab from window", () => {
        const older = mockTab({
          id: 1,
          windowId: 1,
          lastAccessed: Date.now() - 1000,
        });
        const newer = mockTab({ id: 2, windowId: 1, lastAccessed: Date.now() });

        const tabMap = new Map();
        tabMap.set(1, older);
        tabMap.set(2, newer);

        const { result } = renderHookWithContext(
          () => useMostRecentTabFromWindow(1),
          {
            tabs: { map: tabMap },
          },
        );

        expect(result.current?.id).toBe(2);
      });
    });

    describe("useTopOrigins", () => {
      test("should return all three origins sorted by count", () => {
        const origin1 = faker.internet.url({ appendSlash: false });
        const origin2 = faker.internet.url({ appendSlash: false });
        const origin3 = faker.internet.url({ appendSlash: false });

        const tab1 = mockTab({ url: `${origin1}/0` });
        const tab2 = mockTab({ url: `${origin1}/0` });
        const tab3 = mockTab({ url: `${origin3}/1` });
        const tab4 = mockTab({ url: `${origin2}/2` });
        const tab5 = mockTab({ url: `${origin1}/2` });
        const tab6 = mockTab({ url: `${origin2}/2` });

        const tabMap = new Map();
        tabMap.set(tab1.id, tab1);
        tabMap.set(tab2.id, tab2);
        tabMap.set(tab3.id, tab3);
        tabMap.set(tab4.id, tab4);
        tabMap.set(tab5.id, tab5);
        tabMap.set(tab6.id, tab6);

        const { result } = renderHookWithContext(() => useTabOrigins(3), {
          tabs: { map: tabMap },
        });

        expect(result.current).toStrictEqual([
          { origin: origin1, count: 3 },
          { origin: origin2, count: 2 },
          { origin: origin3, count: 1 },
        ]);
        expect(result.current.length).toBe(3);
      });

      test("should not blow up if limit is greater than number of origins", () => {
        const origin1 = faker.internet.url({ appendSlash: false });
        const origin2 = faker.internet.url({ appendSlash: false });

        const tab1 = mockTab({ url: `${origin1}/0` });
        const tab2 = mockTab({ url: `${origin1}/0` });
        const tab3 = mockTab({ url: `${origin1}/1` });
        const tab4 = mockTab({ url: `${origin2}/2` });
        const tab5 = mockTab({ url: `${origin2}` });

        const tabMap = new Map();
        tabMap.set(tab1.id, tab1);
        tabMap.set(tab2.id, tab2);
        tabMap.set(tab3.id, tab3);
        tabMap.set(tab4.id, tab4);
        tabMap.set(tab5.id, tab5);

        const { result } = renderHookWithContext(() => useTabOrigins(10), {
          tabs: { map: tabMap },
        });

        expect(result.current).toStrictEqual([
          { origin: origin1, count: 3 },
          { origin: origin2, count: 2 },
        ]);
        expect(result.current.length).toBe(2);
      });
    });
  });

  describe("display", () => {
    test("identifies filtered state", () => {
      const { result: isFiltered } = renderHookWithContext(
        () => useIsFiltered(),
        {
          display: {
            filters: { search: "zz", dupesOnly: false },
            sort: {
              key: SORT_OPTION.LastAccessed,
              direction: SORT_BY.Descending,
            },
          },
        },
      );

      expect(isFiltered.current).toBe(true);
    });
  });
});
