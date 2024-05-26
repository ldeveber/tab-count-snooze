import "@testing-library/jest-dom/vitest";
import { mockTab, mockTabList, mockWindow } from "test-utils/mockDataHelper";
import { describe, expect, test } from "vitest";
import { TAB_PROPERTIES } from "../chrome";
import { filterSortTabs, filterTabs, sortTabs } from "../filterTabs";
import { SORT_OPTION } from "../options";

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
        tabs.push(mockTab({ index: 0 }));
        tabs.push(mockTab({ index: 1 }));
        tabs.push(mockTab({ index: 2 }));
        tabs.push(mockTab({ title: "meow CAT", index: 3 }));
        tabs.push(mockTab({ index: 4 }));
        tabs.push(mockTab({ title: "category meow", index: 5 }));

        const res = filterTabs(tabs, "cat");
        expect(res).toEqual([tabs[3], tabs[5]]);
      });

      test("should return results that match url", () => {
        const tabs = [];
        tabs.push(mockTab({ url: "http://cats.com", index: 0 }));
        tabs.push(mockTab({ index: 1 }));
        tabs.push(mockTab({ index: 2 }));
        tabs.push(mockTab({ url: "http://meow.cats", index: 3 }));
        tabs.push(mockTab({ index: 4 }));
        tabs.push(mockTab({ url: "http://i-love-CATS.com", index: 5 }));

        const res = filterTabs(tabs, "cats");
        expect(res).toEqual([tabs[0], tabs[3], tabs[5]]);
      });
    });

    describe("filters", () => {
      test("should return tabs with filters", () => {
        const tabs = [];
        tabs.push(mockTab({ pinned: false, index: 0 }));
        tabs.push(mockTab({ pinned: false, index: 1 }));
        tabs.push(mockTab({ pinned: false, index: 2 }));
        tabs.push(mockTab({ pinned: true, index: 3 }));
        tabs.push(mockTab({ pinned: false, index: 4 }));
        tabs.push(mockTab({ pinned: true, index: 5 }));

        const res = filterTabs(tabs, undefined, [TAB_PROPERTIES.Pinned]);

        expect(res).toEqual([tabs[3], tabs[5]]);
      });

      test("should handle discarded/unloaded tabs", () => {
        const tabs = [];
        tabs.push(mockTab({ status: "complete", discarded: false, index: 0 }));
        tabs.push(mockTab({ status: "complete", discarded: false, index: 1 }));
        tabs.push(mockTab({ status: "complete", discarded: false, index: 2 }));
        tabs.push(mockTab({ status: "unloaded", discarded: false, index: 3 }));
        tabs.push(mockTab({ status: "complete", discarded: false, index: 4 }));
        tabs.push(mockTab({ status: "complete", discarded: true, index: 5 }));

        const res = filterTabs(tabs, undefined, [TAB_PROPERTIES.Discarded]);

        expect(res).toEqual([tabs[3], tabs[5]]);
      });
    });
  });

  describe("sortTabs", () => {
    test("should sort by default", () => {
      const win = mockWindow();
      const res = sortTabs(win, SORT_OPTION.Default);
      expect(res).toEqual(win);
    });

    test("should sort by last accessed", () => {
      const win = mockWindow();
      const res = sortTabs(win, SORT_OPTION.LastAccessed);
      expect(res).toEqual(win);
    });
  });

  describe("filterSortTabs", () => {
    test("should return input if no options", () => {
      const win = mockWindow();
      const res = filterSortTabs(win, "", [], SORT_OPTION.Default);
      expect(res).toEqual(win);
    });
  });
});
