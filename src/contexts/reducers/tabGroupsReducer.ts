import { FreezedObject, produce } from "structurajs";

type TabGroupId = Required<chrome.tabGroups.TabGroup>["id"];
export type State = FreezedObject<{ map: Map<TabGroupId, chrome.tabGroups.TabGroup> }>;

export const initialState: State = {
  map: new Map<TabGroupId, chrome.tabGroups.TabGroup>(),
};

export type Action =
  | {
      type: "setTabGroups";
      tabGroups: chrome.tabGroups.TabGroup[];
    }
  | {
      type: "addTabGroup";
      group: chrome.tabGroups.TabGroup;
    }
  | {
      type: "updateTabGroup";
      group: chrome.tabGroups.TabGroup;
    }
  | {
      type: "removeTabGroup";
      id: TabGroupId;
    }
  | { type: "clear" };
export default function tabGroupsReducer(state: State, action: Action): State {
  switch (action.type) {
    case "setTabGroups": {
      return produce(state, (draft) => {
        draft.map = new Map<TabGroupId, chrome.tabGroups.TabGroup>(
          action.tabGroups.map((tg) => [tg.id, tg]),
        );
      });
    }
    case "addTabGroup":
    case "updateTabGroup": {
      return produce(state, (draft) => {
        draft.map.set(action.group.id, action.group);
      });
    }
    case "removeTabGroup": {
      return produce(state, (draft) => {
        draft.map.delete(action.id);
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
