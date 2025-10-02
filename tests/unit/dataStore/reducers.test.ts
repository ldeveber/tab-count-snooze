import { describe, expect, it } from "vitest";
import displayReducer, {
  createInitialState as createDisplayState,
} from "@/lib/dataStore/reducers/displayReducer";
import tabGroupsReducer, {
  createInitialState as createTabGroupsState,
} from "@/lib/dataStore/reducers/tabGroupsReducer";
import tabsReducer, {
  createInitialState as createTabsState,
} from "@/lib/dataStore/reducers/tabsReducer";
import windowsReducer, {
  createInitialState as createWindowsState,
} from "@/lib/dataStore/reducers/windowsReducer";
import {
  mockTab,
  mockTabGroup,
  mockWindow,
} from "@/tests/utils/mockDataHelper";
import { SORT_BY, SORT_OPTION } from "@/utils/options";

describe("tabsReducer", () => {
  it("sets tabs and prunes selected ids", () => {
    const initial = createTabsState();
    initial.selectedTabIds = [1, 2];
    initial.map.set(1, mockTab({ id: 1, windowId: 1 }));
    const tabA = mockTab({ id: 1, windowId: 1 });
    const tabB = mockTab({ id: 3, windowId: 1 });

    const next = tabsReducer(initial, { type: "setTabs", tabs: [tabA, tabB] });

    expect(next.map.size).toBe(2);
    expect(next.map.get(1)).toEqual(tabA);
    expect(next.map.get(1)).not.toBe(tabA);
    expect(next.selectedTabIds).toEqual([1]);
  });

  it("selects and unselects tabs", () => {
    const initial = createTabsState();
    const withTabs = tabsReducer(initial, {
      type: "setTabs",
      tabs: [mockTab({ id: 1, windowId: 1 }), mockTab({ id: 2, windowId: 1 })],
    });

    const selected = tabsReducer(withTabs, { type: "select", id: 1 });
    expect(selected.selectedTabIds).toEqual([1]);

    const multi = tabsReducer(selected, {
      type: "selectTabs",
      ids: [1, 2, 2],
    });
    expect(multi.selectedTabIds).toEqual([1, 2]);

    const unselected = tabsReducer(multi, { type: "unselect", id: 1 });
    expect(unselected.selectedTabIds).toEqual([2]);

    const cleared = tabsReducer(unselected, { type: "clearSelection" });
    expect(cleared.selectedTabIds).toEqual([]);
  });

  it("removes tab and drops selection", () => {
    const base = tabsReducer(createTabsState(), {
      type: "setTabs",
      tabs: [mockTab({ id: 5, windowId: 1 }), mockTab({ id: 6, windowId: 1 })],
    });
    const selected = tabsReducer(base, { type: "select", id: 5 });

    const next = tabsReducer(selected, { type: "removeTab", id: 5 });

    expect(next.map.has(5)).toBe(false);
    expect(next.selectedTabIds).toEqual([]);
  });
});

describe("windowsReducer", () => {
  it("clones incoming windows", () => {
    const initial = createWindowsState();
    const sourceWindow = mockWindow({ id: 1 });

    const next = windowsReducer(initial, {
      type: "setWindows",
      wins: [sourceWindow],
    });
    const stored = next.map.get(1);

    expect(stored).toBeDefined();
    expect(stored).not.toBe(sourceWindow);
    expect(stored?.tabs).not.toBe(sourceWindow.tabs);
  });

  it("updates window entries immutably", () => {
    const win = mockWindow({ id: 2 });
    const base = windowsReducer(createWindowsState(), {
      type: "setWindows",
      wins: [win],
    });

    const next = windowsReducer(base, {
      type: "updateWindow",
      win: { ...win, focused: true },
    });

    expect(next.map.get(2)?.focused).toBe(true);
    expect(next.map.get(2)).not.toBe(win);
  });
});

describe("tabGroupsReducer", () => {
  it("tracks tab groups by id", () => {
    const base = tabGroupsReducer(createTabGroupsState(), {
      type: "setTabGroups",
      tabGroups: [mockTabGroup({ id: 1 })],
    });

    const added = tabGroupsReducer(base, {
      type: "addTabGroup",
      group: mockTabGroup({ id: 2 }),
    });
    expect(added.map.size).toBe(2);

    const updated = tabGroupsReducer(added, {
      type: "updateTabGroup",
      group: mockTabGroup({ id: 2, title: "Updated" }),
    });
    expect(updated.map.get(2)?.title).toBe("Updated");

    const removed = tabGroupsReducer(updated, {
      type: "removeTabGroup",
      id: 1,
    });
    expect(removed.map.has(1)).toBe(false);
  });
});

describe("displayReducer", () => {
  it("updates search filter and can reset", () => {
    const base = displayReducer(createDisplayState(), {
      type: "search",
      search: "foo",
    });
    expect(base.filters.search).toBe("foo");

    const reset = displayReducer(base, { type: "resetFilter" });
    expect(reset.filters.search).toBe("");
  });

  it("sorts and clears state", () => {
    const base = displayReducer(createDisplayState(), {
      type: "sort",
      sort: SORT_OPTION.LastAccessed,
      direction: SORT_BY.Descending,
    });
    expect(base.sort).toEqual({
      key: SORT_OPTION.LastAccessed,
      direction: SORT_BY.Descending,
    });

    const cleared = displayReducer(base, { type: "clear" });
    expect(cleared).toEqual(createDisplayState());
  });
});
