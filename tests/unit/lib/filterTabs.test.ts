import { describe, expect, test } from "vitest";
import type { Browser } from "#imports";
import { _filterTabs, filterSortTabs, sortTabs } from "@/lib/filterTabs";
import { SORT_BY, SORT_OPTION } from "@/lib/options";
import { mockTab } from "@/tests/utils/mockDataHelper";

const tabMock = (props?: Partial<Browser.tabs.Tab>) => {
  const initProps: Partial<Browser.tabs.Tab> = {
    status: "complete",
    title: "Tab Title",
    url: "https://http.dog/status/418",
    lastAccessed: Date.now().valueOf(),
  };
  return mockTab({ ...initProps, ...props });
};

describe("filterTabs utils", () => {
  describe("filterTabs", () => {
    test("should not blow up if tabs is empty", () => {
      const res = _filterTabs(
        [],
        {},
        {
          search: "",
          stale: false,
          dupesOnly: false,
        },
      );
      expect(res).toEqual([]);
    });

    describe("search", () => {
      test("should return results that match title", () => {
        const tab1 = tabMock({ index: 0 });
        const tab2 = tabMock({ index: 1 });
        const tab3 = tabMock({ index: 2 });
        const tab4 = tabMock({ index: 3, title: "meow CAT" });
        const tab5 = tabMock({ index: 4 });
        const tab6 = tabMock({ index: 5, title: "category meow" });
        const tabs = [tab1, tab2, tab3, tab4, tab5, tab6];

        const res = _filterTabs(
          tabs,
          {},
          {
            search: "cat",
            stale: false,
            dupesOnly: false,
          },
        );
        expect(res).toEqual([tabs[3], tabs[5]]);
      });

      test("should return results that match url", () => {
        const tab1 = tabMock({ index: 0, url: "http://cats.com" });
        const tab2 = tabMock({ index: 1 });
        const tab3 = tabMock({ index: 2 });
        const tab4 = tabMock({ index: 3, url: "http://meow.cats" });
        const tab5 = tabMock({ index: 4 });
        const tab6 = tabMock({ index: 5, url: "http://i-love-CATS.com" });
        const tabs = [tab1, tab2, tab3, tab4, tab5, tab6];

        const res = _filterTabs(
          tabs,
          {},
          {
            search: "cats",
            stale: false,
            dupesOnly: false,
          },
        );
        expect(res).toEqual([tabs[0], tabs[3], tabs[5]]);
      });
    });

    describe("duplicates", () => {
      test("should return duplicates", () => {
        const tab1 = tabMock({ index: 0 });
        const tab2 = tabMock({ index: 1 });
        const tab3 = tabMock({ index: 2 });
        const tab4 = tabMock({ index: 3, url: "https://http.cat/status/418" });
        const tab5 = tabMock({ index: 4 });
        const tab6 = tabMock({ index: 5, url: "https://http.cat/status/418" });
        const tabs = [tab1, tab2, tab3, tab4, tab5, tab6];
        const dupes: Record<string, number> = {};
        dupes[tab1.url ?? ""] = 1;
        dupes[tab1.url ?? ""] = 1;
        dupes[tab1.url ?? ""] = 1;
        dupes[tab1.url ?? ""] = 1;
        dupes["https://http.cat/status/418"] = 2;

        const res = _filterTabs(tabs, dupes, {
          search: "",
          stale: false,
          dupesOnly: true,
        });
        expect(res).toEqual([tabs[3], tabs[5]]);
      });
    });

    describe("stale/stale tabs", () => {
      test("should return results staleer than 30 days", () => {
        const tab1 = tabMock({ index: 0 });
        const tab2 = tabMock({ index: 1 });
        const tab3 = tabMock({ index: 2 });
        const tab4 = tabMock({ index: 3, lastAccessed: 0 });
        const tab5 = tabMock({ index: 4 });
        const tab6 = tabMock({ index: 5, lastAccessed: 0 });
        const tabs = [tab1, tab2, tab3, tab4, tab5, tab6];

        const res = _filterTabs(
          tabs,
          {},
          {
            search: "",
            stale: true,
            dupesOnly: false,
          },
        );
        expect(res).toEqual([tabs[3], tabs[5]]);
      });
    });
  });

  describe("sortTabs", () => {
    test("should sort by default ascending", () => {
      const tab1 = mockTab({ index: 1 });
      const tab2 = mockTab({ index: 0 });
      const tab3 = mockTab({ index: 2 });
      const res = sortTabs([tab1, tab2, tab3], {
        key: SORT_OPTION.Default,
        direction: SORT_BY.Ascending,
      });
      expect(res).toEqual([tab2, tab1, tab3]);
    });

    test("should sort by default descending", () => {
      const tab1 = mockTab({ index: 1 });
      const tab2 = mockTab({ index: 0 });
      const tab3 = mockTab({ index: 2 });
      const res = sortTabs([tab1, tab2, tab3], {
        key: SORT_OPTION.Default,
        direction: SORT_BY.Descending,
      });
      expect(res).toEqual([tab3, tab1, tab2]);
    });

    test("should sort by last accessed ascending", () => {
      const tab1 = mockTab({ index: 0, lastAccessed: 2222222222222 });
      const tab2 = mockTab({ index: 1, lastAccessed: 3333333333333 });
      const tab3 = mockTab({ index: 2, lastAccessed: 1111111111111 });
      const res = sortTabs([tab1, tab2, tab3], {
        key: SORT_OPTION.LastAccessed,
        direction: SORT_BY.Ascending,
      });
      expect(res).toEqual([tab2, tab1, tab3]);
    });

    test("should sort by last accessed descending", () => {
      const tab1 = mockTab({ index: 0, lastAccessed: 2222222222222 });
      const tab2 = mockTab({ index: 1, lastAccessed: 3333333333333 });
      const tab3 = mockTab({ index: 2, lastAccessed: 1111111111111 });
      const res = sortTabs([tab1, tab2, tab3], {
        key: SORT_OPTION.LastAccessed,
        direction: SORT_BY.Descending,
      });
      expect(res).toEqual([tab3, tab1, tab2]);
    });
  });

  describe("filterSortTabs", () => {
    test("should return input if no options", () => {
      const tab1 = mockTab({ index: 0 });
      const tab2 = mockTab({ index: 1 });
      const tab3 = mockTab({ index: 2 });
      const res = filterSortTabs(
        [tab1, tab2, tab3],
        {},
        { search: "", stale: false, dupesOnly: false },
        { key: SORT_OPTION.Default, direction: SORT_BY.Ascending },
      );
      expect(res).toEqual([tab1, tab2, tab3]);
    });
  });
});
