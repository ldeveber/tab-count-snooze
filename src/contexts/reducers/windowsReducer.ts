import { FreezedObject, produce } from "structurajs";

type WindowId = Required<chrome.windows.Window>["id"];
export type State = FreezedObject<{
  map: Map<WindowId, chrome.windows.Window>;
}>;
export const initialState: State = { map: new Map<WindowId, chrome.windows.Window>() };

export type Action =
  | {
      type: "setWindows";
      wins: chrome.windows.Window[];
    }
  | {
      type: "addWindow";
      win: chrome.windows.Window;
    }
  | {
      type: "updateWindow";
      win: chrome.windows.Window;
    }
  | {
      type: "removeWindow";
      id: WindowId;
    }
  | { type: "clear" };
export default function windowsReducer(state: State, action: Action): State {
  switch (action.type) {
    case "setWindows": {
      return produce(state, (draft) => {
        draft.map = new Map<WindowId, chrome.windows.Window>(action.wins.map((w) => [w.id, w]));
      });
    }
    case "addWindow":
    case "updateWindow": {
      return produce(state, (draft) => {
        draft.map.set(action.win.id, action.win);
      });
    }
    case "removeWindow": {
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
