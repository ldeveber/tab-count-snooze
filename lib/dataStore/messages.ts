import type { Browser } from "#imports";
import type { BackgroundAction } from "./reducer";

export type DataInitMessage = {
  type: "init";
  payload: {
    windows: Browser.windows.Window[];
    tabGroups: Browser.tabGroups.TabGroup[];
    tabs: Browser.tabs.Tab[];
  };
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
