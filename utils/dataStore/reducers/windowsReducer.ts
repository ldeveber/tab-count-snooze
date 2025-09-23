/** biome-ignore-all lint/style/noNonNullAssertion: need to deal with browser types better? */
import { type FreezedObject, produce } from "structurajs";

type WindowId = Required<Browser.windows.Window>["id"];
export type State = FreezedObject<{
  map: Map<WindowId, Browser.windows.Window>;
}>;
export const initialState: State = {
  map: new Map<WindowId, Browser.windows.Window>(),
};

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
      return produce(state, (draft) => {
        draft.map = new Map<WindowId, Browser.windows.Window>(
          action.wins.map((w) => [w.id!, w]),
        );
      });
    }
    case "addWindow": {
      return produce(state, (draft) => {
        draft.map.set(action.win.id!, action.win);
      });
    }
    case "updateWindow": {
      return produce(state, (draft) => {
        draft.map.set(action.win.id!, {
          ...(draft.map.get(action.win.id!) ?? {}),
          ...action.win,
        });
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
