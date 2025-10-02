import type { Browser } from "wxt/browser";
import { browser } from "wxt/browser";
import type {
  DataInboundMessage,
  DataOutboundMessage,
} from "@/lib/dataStore/messages";
import { type BackgroundAction, dataReducer } from "@/lib/dataStore/reducer";
import { createInitialState, type State } from "@/lib/dataStore/state";
import { cloneTab, cloneTabGroup, cloneWindow } from "../clone";

type SerializedState = {
  windows: Browser.windows.Window[];
  tabGroups: Browser.tabGroups.TabGroup[];
  tabs: Browser.tabs.Tab[];
};

type BrowserPort = ReturnType<typeof browser.runtime.connect>;

const connectedPorts = new Set<BrowserPort>();
let state: State = createInitialState();
let lastFocusedWindowId: number = browser.windows.WINDOW_ID_NONE;

function serializeState(current: State): SerializedState {
  return {
    windows: Array.from(current.windows.map.values(), cloneWindow),
    tabGroups: Array.from(current.tabGroups.map.values(), cloneTabGroup),
    tabs: Array.from(current.tabs.map.values(), cloneTab),
  };
}

function broadcast(message: DataOutboundMessage) {
  connectedPorts.forEach((port) => {
    try {
      port.postMessage(message);
    } catch (err) {
      console.error("Error broadcasting store message", err);
    }
  });
}

function computeCounts(current: State) {
  return {
    tabCount: current.tabs.map.size,
    windowCount: current.windows.map.size,
  };
}

async function updateBadge() {
  const { tabCount, windowCount } = computeCounts(state);
  try {
    await browser.action.setBadgeText({ text: `${tabCount}` });
    await browser.action.setTitle({
      title: `Tab Count Snooze (${tabCount}/${windowCount})`,
    });
  } catch (err) {
    console.error("Error updating badge state", err);
  }
}

function applyAction(action: BackgroundAction, { notify = true } = {}) {
  const nextState = dataReducer(state, action);
  if (nextState === state) {
    return;
  }

  state = nextState;
  if (notify) {
    broadcast({ type: "action", action });
  }
  void updateBadge();
}

async function refreshWindow(windowId: number) {
  try {
    const win = await browser.windows.get(windowId);
    applyAction({ type: "updateWindow", win });
  } catch (err) {
    console.error("Error refreshing window", err);
  }
}

function handlePortMessage(port: BrowserPort, message: DataInboundMessage) {
  if (message?.type === "requestInit") {
    port.postMessage({
      type: "init",
      payload: serializeState(state),
    } satisfies DataOutboundMessage);
  }
}

export function handleRuntimeConnect(port: BrowserPort) {
  if (port.name !== "data") {
    return;
  }

  connectedPorts.add(port);
  port.postMessage({
    type: "init",
    payload: serializeState(state),
  } satisfies DataOutboundMessage);

  port.onDisconnect.addListener(() => {
    connectedPorts.delete(port);
  });
  port.onMessage.addListener((message: DataInboundMessage) => {
    handlePortMessage(port, message);
  });
}

function registerTabListeners() {
  browser.tabs.onCreated.addListener((tab: Browser.tabs.Tab) => {
    applyAction({ type: "addTab", tab });
  });

  browser.tabs.onUpdated.addListener(
    (
      _tabId: number,
      _changeInfo: Browser.tabs.OnUpdatedInfo,
      tab: Browser.tabs.Tab,
    ) => {
      applyAction({ type: "updateTab", tab });
    },
  );

  browser.tabs.onRemoved.addListener((id: number) => {
    applyAction({ type: "removeTab", id });
  });
}

function registerTabGroupListeners() {
  browser.tabGroups.onCreated.addListener(
    (group: Browser.tabGroups.TabGroup) => {
      applyAction({ type: "addTabGroup", group });
    },
  );

  browser.tabGroups.onUpdated.addListener(
    (group: Browser.tabGroups.TabGroup) => {
      applyAction({ type: "updateTabGroup", group });
    },
  );

  browser.tabGroups.onRemoved.addListener(
    (group: Browser.tabGroups.TabGroup) => {
      applyAction({ type: "removeTabGroup", id: group.id });
    },
  );
}

function registerWindowListeners() {
  browser.windows.onCreated.addListener((win: Browser.windows.Window) => {
    lastFocusedWindowId = win.id ?? browser.windows.WINDOW_ID_NONE;
    applyAction({ type: "addWindow", win });
  });

  browser.windows.onRemoved.addListener((id: number) => {
    if (lastFocusedWindowId === id) {
      lastFocusedWindowId = browser.windows.WINDOW_ID_NONE;
    }
    applyAction({ type: "removeWindow", id });
  });

  browser.windows.onFocusChanged.addListener((id: number) => {
    const previous = lastFocusedWindowId;
    lastFocusedWindowId = id;

    if (previous !== browser.windows.WINDOW_ID_NONE) {
      void refreshWindow(previous);
    }
    if (id !== browser.windows.WINDOW_ID_NONE) {
      void refreshWindow(id);
    }
  });
}

export async function initializeStore() {
  try {
    const [windows, tabGroups, tabs] = await Promise.all([
      browser.windows.getAll(),
      browser.tabGroups.query({}),
      browser.tabs.query({}),
    ]);

    applyAction({ type: "setWindows", wins: windows });
    applyAction({ type: "setTabGroups", tabGroups });
    applyAction({ type: "setTabs", tabs });
    void updateBadge();
  } catch (err) {
    console.error("Error initializing background store", err);
  }

  registerWindowListeners();
  registerTabGroupListeners();
  registerTabListeners();
}

export function getState() {
  return state;
}
