type TabGroupId = Required<Browser.tabGroups.TabGroup>["id"];

export type State = {
  map: Map<TabGroupId, Browser.tabGroups.TabGroup>;
};

export const createInitialState = (): State => ({
  map: new Map<TabGroupId, Browser.tabGroups.TabGroup>(),
});

export const initialState: State = createInitialState();

export const ACTION_TYPES = [
  "setTabGroups",
  "addTabGroup",
  "updateTabGroup",
  "removeTabGroup",
  "clear",
];
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
      return {
        ...state,
        map: new Map<TabGroupId, Browser.tabGroups.TabGroup>(
          action.tabGroups.map((tabGroup) => [tabGroup.id, { ...tabGroup }]),
        ),
      };
    }
    case "addTabGroup": {
      const map = new Map(state.map);
      map.set(action.group.id, { ...action.group });
      return { ...state, map };
    }
    case "updateTabGroup": {
      const map = new Map(state.map);
      const existing = map.get(action.group.id);
      map.set(action.group.id, { ...(existing ?? {}), ...action.group });
      return { ...state, map };
    }
    case "removeTabGroup": {
      if (!state.map.has(action.id)) {
        return state;
      }
      const map = new Map(state.map);
      map.delete(action.id);
      return { ...state, map };
    }
    case "clear": {
      return createInitialState();
    }
    default: {
      return state;
    }
  }
}
