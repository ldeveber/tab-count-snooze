import { type FreezedObject, produce } from "structurajs";

type TabGroupId = Required<Browser.tabGroups.TabGroup>["id"];
export type State = FreezedObject<{
  map: Map<TabGroupId, Browser.tabGroups.TabGroup>;
}>;

export const initialState: State = {
  map: new Map<TabGroupId, Browser.tabGroups.TabGroup>(),
};

export type Action =
  | {
      type: "setTabGroups";
      tabGroups: Browser.tabGroups.TabGroup[];
    }
  | {
      type: "addTabGroup";
      group: Browser.tabGroups.TabGroup;
    }
  | {
      type: "updateTabGroup";
      group: Browser.tabGroups.TabGroup;
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
        draft.map = new Map<TabGroupId, Browser.tabGroups.TabGroup>(
          action.tabGroups.map((tg) => [tg.id, tg]),
        );
      });
    }
    case "addTabGroup":
      return produce(state, (draft) => {
        draft.map.set(action.group.id, action.group);
      });
    case "updateTabGroup": {
      return produce(state, (draft) => {
        draft.map.set(action.group.id, {
          ...(draft.map.get(action.group.id!) ?? {}),
          ...action.group,
        });
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
