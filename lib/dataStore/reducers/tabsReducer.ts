import type { Browser } from "#imports";
import type { TabIdType } from "@/lib/browser/actions";
import { cloneTab } from "@/lib/clone";

export type State = {
  selectedTabIds: TabIdType[];
  map: Map<TabIdType, Browser.tabs.Tab>;
  dupes: Record<string, number>;
};

export const createInitialState = (): State => ({
  selectedTabIds: [],
  map: new Map<TabIdType, Browser.tabs.Tab>(),
  dupes: {},
});

export const initialState: State = createInitialState();

export const ACTION_TYPES = [
  "setTabs",
  "setDupeCount",
  "addTab",
  "updateTab",
  "removeTab",
  "bulkSelect",
  "select",
  "unselect",
  "selectTabs",
  "unselectTabs",
  "clear",
  "clearSelection",
];
export type Action =
  | {
      type: "setTabs";
      tabs: Browser.tabs.Tab[];
    }
  | {
      type: "setDupeCount";
      dupes: State["dupes"];
    }
  | {
      type: "addTab";
      tab: Browser.tabs.Tab;
    }
  | {
      type: "updateTab";
      tab: Browser.tabs.Tab;
    }
  | {
      type: "removeTab";
      id: TabIdType;
    }
  | {
      ids: TabIdType[];
      readonly type: "bulkSelect";
    }
  | {
      id: TabIdType;
      readonly type: "select" | "unselect";
    }
  | {
      ids: TabIdType[];
      readonly type: "selectTabs" | "unselectTabs";
    }
  | { type: "clear" }
  | { type: "clearSelection" };

export default function tabsReducer(state: State, action: Action): State {
  switch (action.type) {
    case "setTabs": {
      const map = new Map<TabIdType, Browser.tabs.Tab>();
      action.tabs.forEach((tab) => {
        if (tab.id !== undefined) {
          map.set(tab.id, cloneTab(tab));
        }
      });
      const selectedTabIds = state.selectedTabIds.filter((id) => map.has(id));
      return { ...state, map, selectedTabIds };
    }
    case "setDupeCount": {
      return { ...state, dupes: action.dupes };
    }
    case "addTab": {
      if (action.tab.id === undefined) {
        return state;
      }
      const map = new Map(state.map);
      map.set(action.tab.id, cloneTab(action.tab));
      return { ...state, map };
    }
    case "updateTab": {
      if (action.tab.id === undefined) {
        return state;
      }
      const map = new Map(state.map);
      const existing = map.get(action.tab.id);
      map.set(action.tab.id, { ...(existing ?? {}), ...cloneTab(action.tab) });
      return { ...state, map };
    }
    case "removeTab": {
      if (!state.map.has(action.id)) {
        return state;
      }
      const map = new Map(state.map);
      map.delete(action.id);
      const selectedTabIds = state.selectedTabIds.filter(
        (id) => id !== action.id,
      );
      return { ...state, map, selectedTabIds };
    }
    case "bulkSelect": {
      const uniqueIds = Array.from(new Set(action.ids));
      return { ...state, selectedTabIds: uniqueIds };
    }
    case "select": {
      if (state.selectedTabIds.includes(action.id)) {
        return state;
      }
      return {
        ...state,
        selectedTabIds: [...state.selectedTabIds, action.id],
      };
    }
    case "selectTabs": {
      const merged = new Set(state.selectedTabIds);
      action.ids.forEach((id) => {
        merged.add(id);
      });
      return { ...state, selectedTabIds: Array.from(merged) };
    }
    case "unselect": {
      if (!state.selectedTabIds.includes(action.id)) {
        return state;
      }
      return {
        ...state,
        selectedTabIds: state.selectedTabIds.filter((id) => id !== action.id),
      };
    }
    case "unselectTabs": {
      const idsToRemove = new Set(action.ids);
      return {
        ...state,
        selectedTabIds: state.selectedTabIds.filter(
          (id) => !idsToRemove.has(id),
        ),
      };
    }
    case "clearSelection": {
      if (state.selectedTabIds.length === 0) {
        return state;
      }
      return { ...state, selectedTabIds: [] };
    }
    case "clear": {
      return createInitialState();
    }
    default: {
      return state;
    }
  }
}
