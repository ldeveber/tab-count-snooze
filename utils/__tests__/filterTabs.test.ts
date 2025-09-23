import { describe, expect, test } from "vitest";
import { mockTab } from "@/test-utils/mockDataHelper";
import { filterSortTabs, filterTabs, sortTabs } from "../filterTabs";
import { SORT_OPTION } from "../options";

const tabMock = (props?: Partial<Browser.tabs.Tab>) => {
  const initProps: Partial<Browser.tabs.Tab> = {
    status: "complete",
    title: "Tab Title",
    url: "https://http.dog/status/418",
  };
  return mockTab({ ...initProps, ...props });
};

describe("filterTabs utils", () => {
  describe("filterTabs", () => {
    test("should return same result if no search or filters", () => {
      const tabs = [mockTab(), mockTab(), mockTab()];
      const res = filterTabs(tabs);
      expect(res).toEqual(tabs);
    });

    test("should not blow up if tabs is empty", () => {
      const res = filterTabs([]);
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

        const res = filterTabs(tabs, "cat");
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

        const res = filterTabs(tabs, "cats");
        expect(res).toEqual([tabs[0], tabs[3], tabs[5]]);
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
      const tab1 = mockTab({ index: 0, lastAccessed: 2222222222222 });
      const tab2 = mockTab({ index: 1, lastAccessed: 3333333333333 });
      const tab3 = mockTab({ index: 2, lastAccessed: 1111111111111 });
      const res = sortTabs([tab1, tab2, tab3], SORT_OPTION.LastAccessed);
      expect(res).toEqual([tab2, tab1, tab3]);
    });
  });

  describe("filterSortTabs", () => {
    test("should return input if no options", () => {
      const tab1 = mockTab({ index: 0 });
      const tab2 = mockTab({ index: 1 });
      const tab3 = mockTab({ index: 2 });
      const res = filterSortTabs([tab1, tab2, tab3], "", SORT_OPTION.Default);
      expect(res).toEqual([tab1, tab2, tab3]);
    });
  });
});
