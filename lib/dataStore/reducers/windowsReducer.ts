import type { Browser } from "#imports";
import { cloneWindow } from "@/lib/clone";

type WindowId = Required<Browser.windows.Window>["id"];

export type State = {
  map: Map<WindowId, Browser.windows.Window>;
};

export const createInitialState = (): State => ({
  map: new Map<WindowId, Browser.windows.Window>(),
});

export const initialState: State = createInitialState();

export const ACTION_TYPES = [
  "setWindows",
  "addWindow",
  "updateWindow",
  "removeWindow",
];

export type Action =
  | {
      type: "setWindows";
      wins: Browser.windows.Window[];
    }
  | {
      type: "addWindow";
      win: Browser.windows.Window;
    }
  | {
      type: "updateWindow";
      win: Browser.windows.Window;
    }
  | {
      type: "removeWindow";
      id: WindowId;
    }
  | { type: "clear" };
export default function windowsReducer(state: State, action: Action): State {
  switch (action.type) {
    case "setWindows": {
      const map = new Map<WindowId, Browser.windows.Window>();
      action.wins.forEach((win) => {
        if (win.id !== undefined) {
          map.set(win.id, cloneWindow(win));
        }
      });
      return { ...state, map };
    }
    case "addWindow": {
      if (action.win.id === undefined) {
        return state;
      }
      const map = new Map(state.map);
      map.set(action.win.id, cloneWindow(action.win));
      return { ...state, map };
    }
    case "updateWindow": {
      if (action.win.id === undefined) {
        return state;
      }
      const map = new Map(state.map);
      const existing = map.get(action.win.id);
      map.set(action.win.id, {
        ...(existing ?? {}),
        ...cloneWindow(action.win),
      });
      return { ...state, map };
    }
    case "removeWindow": {
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
