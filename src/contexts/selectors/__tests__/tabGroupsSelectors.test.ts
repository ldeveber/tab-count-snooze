import "@testing-library/jest-dom/vitest";
import { initialState } from "src/contexts/reducers/tabGroupsReducer";
import { mockTabGroup } from "test-utils/mockDataHelper";
import { describe, expect, test } from "vitest";
import { _useTabGroup, _useTabGroups } from "../tabGroupsSelectors";

describe("Tab Groups Selectors", () => {
  test("useTabGroups - all", () => {
    const group1 = mockTabGroup();
    const group2 = mockTabGroup();
    const map = new Map<number, chrome.tabGroups.TabGroup>([
      [group1.id, group1],
      [group2.id, group2],
    ]);
    expect(_useTabGroups({ ...initialState, map })).toStrictEqual([group1, group2]);
  });

  test("useTabGroups - by window", () => {
    const group1 = mockTabGroup({ windowId: 1 });
    const group2 = mockTabGroup({ windowId: 1 });
    const group3 = mockTabGroup({ windowId: 2 });
    const map = new Map<number, chrome.tabGroups.TabGroup>([
      [group1.id, group1],
      [group2.id, group2],
      [group3.id, group3],
    ]);
    expect(_useTabGroups({ ...initialState, map }, 1)).toStrictEqual([group1, group2]);
  });

  test("useTabGroup", () => {
    const group1 = mockTabGroup({ id: 1 });
    const group2 = mockTabGroup({ id: 2 });
    const group3 = mockTabGroup({ id: 3 });
    const map = new Map<number, chrome.tabGroups.TabGroup>([
      [group1.id, group1],
      [group2.id, group2],
      [group3.id, group3],
    ]);
    expect(_useTabGroup({ ...initialState, map }, 1)).toStrictEqual(group1);
  });
});
