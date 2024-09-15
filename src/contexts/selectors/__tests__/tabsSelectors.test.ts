import "@testing-library/jest-dom/vitest";
import { initialState } from "src/contexts/reducers/tabsReducer";
import { mockTab } from "test-utils/mockDataHelper";
import { describe, expect, test } from "vitest";
import { _useAllTabs, _useSelectedTabs, _useTab, _useTabCount, _useTabs } from "../tabsSelectors";

describe("Tabs Selectors", () => {
  test("useAllTabs", () => {
    const tab1 = mockTab();
    const tab2 = mockTab();
    const tab3 = mockTab();
    const map = new Map<number, chrome.tabs.Tab>([
      [tab1.id, tab1],
      [tab2.id, tab2],
      [tab3.id, tab3],
    ]);
    expect(_useAllTabs({ ...initialState, map })).toStrictEqual([tab1, tab2, tab3]);
  });

  test("useTabs", () => {
    const tab1 = mockTab({ windowId: 1 });
    const tab2 = mockTab({ windowId: 1 });
    const tab3 = mockTab({ windowId: 2 });
    const map = new Map<number, chrome.tabs.Tab>([
      [tab1.id, tab1],
      [tab2.id, tab2],
      [tab3.id, tab3],
    ]);
    expect(_useTabs({ ...initialState, map }, 1)).toStrictEqual([tab1, tab2]);
  });

  test("useTabCount", () => {
    const tab1 = mockTab();
    const tab2 = mockTab();
    const tab3 = mockTab();
    const map = new Map<number, chrome.tabs.Tab>([
      [tab1.id, tab1],
      [tab2.id, tab2],
      [tab3.id, tab3],
    ]);
    expect(_useTabCount({ ...initialState, map })).toEqual(3);
  });

  test("useTab", () => {
    const tab1 = mockTab({ id: 1 });
    const tab2 = mockTab({ id: 2 });
    const tab3 = mockTab({ id: 3 });
    const map = new Map<number, chrome.tabs.Tab>([
      [tab1.id, tab1],
      [tab2.id, tab2],
      [tab3.id, tab3],
    ]);
    expect(_useTab({ ...initialState, map }, 1)).toEqual(tab1);
  });

  test("useSelectedTabs", () => {
    expect(_useSelectedTabs({ ...initialState, selectedTabIds: [1, 2, 3] })).toStrictEqual([
      1, 2, 3,
    ]);
  });
});
