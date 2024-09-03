import "@testing-library/jest-dom/vitest";
import { mockTab, mockTabList } from "test-utils/mockDataHelper";
import { describe, expect, test } from "vitest";
import { FILTER_TAB_PROPERTIES, filterSortTabs, filterTabs, sortTabs } from "../filterTabs";
import { SORT_OPTION } from "../options";

const tabMock = (props?: Partial<chrome.tabs.Tab>) => {
  const initProps: Partial<chrome.tabs.Tab> = {
    status: "complete",
    title: "Tab Title",
    url: "https://http.dog/status/418",
  };
  const keys = Object.keys(FILTER_TAB_PROPERTIES);
  // ensure we start with a clean slate
  keys.forEach((property) => {
    initProps[property as FILTER_TAB_PROPERTIES] = false;
  });
  return mockTab({ ...initProps, ...props });
};

describe("filterTabs utils", () => {
  describe("filterTabs", () => {
    test("should return same result if no search or filters", () => {
      const tabs = mockTabList();
      const res = filterTabs(tabs);
      expect(res).toEqual(tabs);
    });

    test("should not blow up if tabs is empty", () => {
      const res = filterTabs([]);
      expect(res).toEqual([]);
    });

    describe("search", () => {
      test("should return results that match title", () => {
        const tabs = [];
        tabs.push(tabMock({ index: 0 }));
        tabs.push(tabMock({ index: 1 }));
        tabs.push(tabMock({ index: 2 }));
        tabs.push(tabMock({ title: "meow CAT", index: 3 }));
        tabs.push(tabMock({ index: 4 }));
        tabs.push(tabMock({ title: "category meow", index: 5 }));

        const res = filterTabs(tabs, "cat");
        expect(res).toEqual([tabs[3], tabs[5]]);
      });

      test("should return results that match url", () => {
        const tabs = [];
        tabs.push(tabMock({ url: "http://cats.com", index: 0 }));
        tabs.push(tabMock({ index: 1 }));
        tabs.push(tabMock({ index: 2 }));
        tabs.push(tabMock({ url: "http://meow.cats", index: 3 }));
        tabs.push(tabMock({ index: 4 }));
        tabs.push(tabMock({ url: "http://i-love-CATS.com", index: 5 }));

        const res = filterTabs(tabs, "cats");
        expect(res).toEqual([tabs[0], tabs[3], tabs[5]]);
      });
    });

    describe("filters", () => {
      test("should return tabs with filters", () => {
        const tabs = [];
        tabs.push(tabMock({ pinned: false, index: 0 }));
        tabs.push(tabMock({ pinned: false, index: 1 }));
        tabs.push(tabMock({ pinned: false, index: 2 }));
        tabs.push(tabMock({ pinned: true, index: 3 }));
        tabs.push(tabMock({ pinned: false, index: 4 }));
        tabs.push(tabMock({ pinned: true, index: 5 }));

        const res = filterTabs(tabs, undefined, [FILTER_TAB_PROPERTIES.Pinned]);

        expect(res).toEqual([tabs[3], tabs[5]]);
      });

      test("should handle discarded/unloaded tabs", () => {
        const tabs = [];
        tabs.push(tabMock({ status: "complete", discarded: false, index: 0 }));
        tabs.push(tabMock({ status: "complete", discarded: false, index: 1 }));
        tabs.push(tabMock({ status: "complete", discarded: false, index: 2 }));
        tabs.push(tabMock({ status: "unloaded", discarded: false, index: 3 }));
        tabs.push(tabMock({ status: "complete", discarded: false, index: 4 }));
        tabs.push(tabMock({ status: "complete", discarded: true, index: 5 }));

        const res = filterTabs(tabs, undefined, [FILTER_TAB_PROPERTIES.Discarded]);

        expect(res).toEqual([tabs[3], tabs[5]]);
      });
    });
  });

  describe("sortTabs", () => {
    test("should sort by default", () => {
      const tab1 = mockTab({ index: 1 });
      const tab2 = mockTab({ index: 0 });
      const tab3 = mockTab({ index: 2 });
      const res = sortTabs([tab1, tab2, tab3], SORT_OPTION.Default);
      expect(res).toEqual([tab2, tab1, tab3]);
    });

    test("should sort by last accessed", () => {
      const tab1 = mockTab({ lastAccessed: 2222222222222 });
      const tab2 = mockTab({ lastAccessed: 3333333333333 });
      const tab3 = mockTab({ lastAccessed: 1111111111111 });
      const res = sortTabs([tab1, tab2, tab3], SORT_OPTION.LastAccessed);
      expect(res).toEqual([tab2, tab1, tab3]);
    });
  });

  describe("filterSortTabs", () => {
    test("should return input if no options", () => {
      const tab1 = mockTab({ index: 0 });
      const tab2 = mockTab({ index: 1 });
      const tab3 = mockTab({ index: 2 });
      const res = filterSortTabs([tab1, tab2, tab3], "", [], SORT_OPTION.Default);
      expect(res).toEqual([tab1, tab2, tab3]);
    });
  });
});
