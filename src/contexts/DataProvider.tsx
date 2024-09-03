import { Dispatch, PropsWithChildren, createContext, useContext, useReducer } from "react";
import { FreezedObject, produce } from "structurajs";

type CollectionStore<T> = {
  map: Map<number, T>;
  count: number;
};

export type State = FreezedObject<{
  windows: CollectionStore<chrome.windows.Window>;
  tabGroups: CollectionStore<chrome.tabGroups.TabGroup>;
  tabs: CollectionStore<chrome.tabs.Tab>;
}>;

export const initialState: State = {
  windows: { map: new Map<number, chrome.windows.Window>(), count: 0 },
  tabGroups: { map: new Map<number, chrome.tabGroups.TabGroup>(), count: 0 },
  tabs: { map: new Map<number, chrome.tabs.Tab>(), count: 0 },
};

const DataContext = createContext<State>(initialState);
const DataDispatchContext = createContext<Dispatch<Action>>(() => {});

type Action =
  | {
      type: "setWindows";
      windows: chrome.windows.Window[];
    }
  | {
      type: "setTabGroups";
      tabGroups: chrome.tabGroups.TabGroup[];
    }
  | {
      type: "setTabs";
      tabs: chrome.tabs.Tab[];
    }
  | {
      type: "updateWindow";
      window: chrome.windows.Window;
    }
  | {
      type: "updateTabGroup";
      tabGroup: chrome.tabGroups.TabGroup;
    }
  | {
      type: "updateTab";
      tab: chrome.tabs.Tab;
    }
  | {
      type: "removeWindow";
      windowId: chrome.windows.Window["id"];
    }
  | {
      type: "removeTabGroup";
      tabGroupId: chrome.tabGroups.TabGroup["id"];
    }
  | {
      type: "removeTab";
      tabId: chrome.tabs.Tab["id"];
    }
  | { type: "clear" };
function dataReducer(state: State, action: Action): State {
  // console.log("dataReducer", action.type, action);
  switch (action.type) {
    case "setWindows": {
      return produce(state, (draft) => {
        draft.windows.map = new Map<number, chrome.windows.Window>(
          action.windows.map((w) => [w.id, w]),
        );
      });
    }
    case "setTabs": {
      return produce(state, (draft) => {
        draft.tabs.map = new Map<number, chrome.tabs.Tab>(action.tabs.map((t) => [t.id, t]));
      });
    }
    case "setTabGroups": {
      return produce(state, (draft) => {
        draft.tabGroups.map = new Map<number, chrome.tabGroups.TabGroup>(
          action.tabGroups.map((tg) => [tg.id, tg]),
        );
      });
    }
    case "updateWindow": {
      return produce(state, (draft) => {
        draft.windows.map.set(action.window.id, action.window);
      });
    }
    case "updateTabGroup": {
      return produce(state, (draft) => {
        draft.tabGroups.map.set(action.tabGroup.id, action.tabGroup);
      });
    }
    case "updateTab": {
      return produce(state, (draft) => {
        draft.tabs.map.set(action.tab.id, action.tab);
      });
    }
    case "removeWindow": {
      return produce(state, (draft) => {
        draft.windows.map.delete(action.windowId);
      });
    }
    case "removeTabGroup": {
      return produce(state, (draft) => {
        draft.tabGroups.map.delete(action.tabGroupId);
      });
    }
    case "removeTab": {
      return produce(state, (draft) => {
        draft.tabs.map.delete(action.tabId);
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

export default function DataProvider({
  children,
  testState,
}: PropsWithChildren<{
  testState?: State;
}>) {
  const [state, dispatch] = useReducer(dataReducer, testState || initialState);

  return (
    <DataContext.Provider value={state}>
      <DataDispatchContext.Provider value={dispatch}>{children}</DataDispatchContext.Provider>
    </DataContext.Provider>
  );
}

export function useDataDispatch() {
  return useContext(DataDispatchContext);
}

export function useWindows() {
  const context = useContext(DataContext);
  const arr = [];
  context.windows.map.forEach((w) => arr.push(w));
  return arr;
}
export function useWindowCount() {
  const context = useContext(DataContext);
  return context.windows.map.size;
}
export function useWindow(windowId: number) {
  const context = useContext(DataContext);
  return context.windows.map.get(windowId);
}

export function useTabGroups(windowId?: number) {
  const context = useContext(DataContext);
  const arr = [];
  context.tabGroups.map.forEach((tg) => {
    if (windowId === undefined) {
      arr.push(tg);
    } else if (tg.windowId === windowId) {
      arr.push(tg);
    }
  });
  return arr;
}
export function useTabGroup(tabGroupId: number) {
  const context = useContext(DataContext);
  return context.tabGroups.map.get(tabGroupId);
}

export function useAllTabs() {
  const context = useContext(DataContext);
  const arr = [];
  context.tabs.map.forEach((t) => arr.push(t));
  return arr;
}
export function useTabs(windowId: number) {
  const context = useContext(DataContext);
  const arr = [];
  context.tabs.map.forEach((t) => {
    if (windowId === t.windowId) {
      arr.push(t);
    }
  });
  return arr;
}
export function useTabCount() {
  const context = useContext(DataContext);
  return context.tabs.map.size;
}
export function useTab(tabId: number) {
  const context = useContext(DataContext);
  return context.tabs.map.get(tabId);
}
