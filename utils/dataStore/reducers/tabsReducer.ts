import { TabIdType } from "@/utils/chrome";
import { FreezedObject, produce } from "structurajs";

export type State = FreezedObject<{
  selectedTabIds: TabIdType[];
  map: Map<TabIdType, Browser.tabs.Tab>;
}>;

export const initialState: State = {
  selectedTabIds: [],
  map: new Map<TabIdType, Browser.tabs.Tab>(),
};

export type Action =
  | {
      type: "setTabs";
      tabs: Browser.tabs.Tab[];
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
      return produce(state, (draft) => {
        draft.map = new Map<TabIdType, Browser.tabs.Tab>(
          action.tabs.map((t) => [t.id!, t]),
        );
      });
    }
    case "addTab": {
      return produce(state, (draft) => {
        draft.map.set(action.tab.id!, action.tab);
      });
    }
    case "updateTab": {
      return produce(state, (draft) => {
        draft.map.set(action.tab.id!, {
          ...(draft.map.get(action.tab.id!) ?? {}),
          ...action.tab,
        });
      });
    }
    case "removeTab": {
      return produce(state, (draft) => {
        draft.map.delete(action.id);
        draft.selectedTabIds.filter((id) => id !== action.id);
      });
    }
    case "bulkSelect": {
      return produce(state, (draft) => {
        draft.selectedTabIds = action.ids;
      });
    }
    case "select": {
      return produce(state, (draft) => {
        draft.selectedTabIds.push(action.id);
      });
    }
    case "selectTabs": {
      return produce(state, (draft) => {
        draft.selectedTabIds.concat(action.ids);
      });
    }
    case "unselect": {
      return produce(state, (draft) => {
        draft.selectedTabIds.filter((id) => id !== action.id);
      });
    }
    case "unselectTabs": {
      return produce(state, (draft) => {
        draft.selectedTabIds.filter((id) => action.ids.includes(id));
      });
    }
    case "clearSelection": {
      return produce(state, (draft) => {
        draft.selectedTabIds = [];
      });
    }
    case "clear": {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
