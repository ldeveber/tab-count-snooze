import type { Browser } from "#imports";
import type { BackgroundAction } from "./reducer";

export type SerializedState = {
  windows: Browser.windows.Window[];
  tabGroups: Browser.tabGroups.TabGroup[];
  tabs: Browser.tabs.Tab[];
  dupes: Record<string, number>;
};

export type DataInitMessage = {
  type: "init";
  payload: SerializedState;
};

export type DataActionMessage = {
  type: "action";
  action: BackgroundAction;
};

export type DataOutboundMessage = DataInitMessage | DataActionMessage;

export type DataInboundMessage = {
  type: "requestInit";
};

export type DataMessage = DataOutboundMessage | DataInboundMessage;
