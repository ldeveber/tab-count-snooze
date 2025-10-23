// @vitest-environment happy-dom

import { renderHook } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import {
  useAllTabs,
  useIsFiltered,
  useMostRecentTabFromWindow,
  useSelectedTabs,
  useTabs,
  useWindows,
} from "@/lib/dataStore";
import DataProvider from "@/lib/dataStore/DataProvider";
import { createInitialState, type State } from "@/lib/dataStore/state";
import { mockTab, mockWindow } from "@/tests/utils/mockDataHelper";
import { SORT_BY, SORT_OPTION } from "@/utils/options";

function withProvider(state: State) {
  return ({ children }: PropsWithChildren) => (
    <DataProvider testState={state}>{children}</DataProvider>
  );
}

describe("data store selectors", () => {
  it("returns cloned windows", () => {
    const state = createInitialState();
    const sourceWindow = mockWindow({ id: 1 });
    const sourceTab = mockTab({ id: 10, windowId: 1 });
    state.windows.map.set(1, sourceWindow);
    state.tabs.map.set(10, sourceTab);

    const { result } = renderHook(() => useWindows(), {
      wrapper: withProvider(state),
    });

    expect(result.current).toHaveLength(1);
    expect(result.current[0]).not.toBe(sourceWindow);
    expect(result.current[0].tabs).not.toBe(sourceWindow.tabs);
  });

  it("filters tabs by window and exposes selections", () => {
    const state = createInitialState();
    const tab1 = mockTab({ id: 1, windowId: 1 });
    const tab2 = mockTab({ id: 2, windowId: 2 });
    state.tabs.map.set(1, tab1);
    state.tabs.map.set(2, tab2);
    state.tabs.selectedTabIds = [2];

    const { result: allTabs } = renderHook(() => useAllTabs(), {
      wrapper: withProvider(state),
    });
    expect(allTabs.current).toHaveLength(2);

    const { result: windowTabs } = renderHook(() => useTabs(1), {
      wrapper: withProvider(state),
    });
    expect(windowTabs.current).toHaveLength(1);
    expect(windowTabs.current[0].id).toBe(1);

    const { result: selected } = renderHook(() => useSelectedTabs(), {
      wrapper: withProvider(state),
    });
    expect(selected.current).toEqual([2]);
  });

  it("derives most recent tab from window", () => {
    const state = createInitialState();
    const older = mockTab({
      id: 1,
      windowId: 1,
      lastAccessed: Date.now() - 1000,
    });
    const newer = mockTab({ id: 2, windowId: 1, lastAccessed: Date.now() });
    state.tabs.map.set(1, older);
    state.tabs.map.set(2, newer);

    const { result } = renderHook(() => useMostRecentTabFromWindow(1), {
      wrapper: withProvider(state),
    });

    expect(result.current?.id).toBe(2);
  });

  it("identifies filtered state", () => {
    const state = createInitialState();
    state.display.filters.search = "zz";
    state.display.filters.dupesOnly = false;
    state.display.sort = {
      key: SORT_OPTION.LastAccessed,
      direction: SORT_BY.Descending,
    };

    const { result: isFiltered } = renderHook(() => useIsFiltered(), {
      wrapper: withProvider(state),
    });

    expect(isFiltered.current).toBe(true);
  });
});
