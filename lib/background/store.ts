import type { Browser } from "#imports";
import { browser, storage } from "#imports";
import { cloneTab, cloneTabGroup, cloneWindow } from "@/lib/clone";
import type {
  DataInboundMessage,
  DataOutboundMessage,
  SerializedState,
} from "@/lib/dataStore/messages";
import { type BackgroundAction, dataReducer } from "@/lib/dataStore/reducer";
import { createInitialState, type State } from "@/lib/dataStore/state";
import {
  getStorageKey,
  MAX_TABS_THRESHOLD,
  MAX_WINS_THRESHOLD,
  POPUP_COUNT,
  POPUP_COUNT_COLOR,
} from "@/lib/storage";

type BrowserPort = ReturnType<typeof browser.runtime.connect>;

const connectedPorts = new Set<BrowserPort>();
let state: State = createInitialState();
let lastFocusedWindowId: number = browser.windows.WINDOW_ID_NONE;

function serializeState(current: State): SerializedState {
  return {
    windows: Array.from(current.windows.map.values(), cloneWindow),
    tabGroups: Array.from(current.tabGroups.map.values(), cloneTabGroup),
    tabs: Array.from(current.tabs.map.values(), cloneTab),
    dupes: { ...current.tabs.dupes },
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

async function hasExceededThreshold(tabCount: number, windowCount: number) {
  const maxTabsThreshold = await storage.getItem(
    getStorageKey(MAX_TABS_THRESHOLD),
    { fallback: 0 },
  );
  const maxWinsThreshold = await storage.getItem(
    getStorageKey(MAX_WINS_THRESHOLD),
    { fallback: 0 },
  );
  return (
    (maxTabsThreshold !== 0 && maxTabsThreshold < tabCount) ||
    (maxWinsThreshold !== 0 && maxWinsThreshold < windowCount)
  );
}

async function updateBadge() {
  const { tabCount, windowCount } = computeCounts(state);
  try {
    const showCount = await storage.getItem(getStorageKey(POPUP_COUNT), {
      fallback: "false",
    });
    const enableCountColor = await storage.getItem(
      getStorageKey(POPUP_COUNT_COLOR),
      {
        fallback: false,
      },
    );
    const isOverThreshold = await hasExceededThreshold(tabCount, windowCount);
    if (
      showCount === "always" ||
      (showCount === "warning" && isOverThreshold)
    ) {
      await browser.action.setBadgeText({ text: `${tabCount}` });
      if (isOverThreshold && enableCountColor) {
        await browser.action.setBadgeBackgroundColor({ color: `orange` });
      }
    }
    await browser.action.setTitle({
      title: `Tab Count Snooze (${tabCount}/${windowCount})`,
    });
  } catch (err) {
    console.error("Error updating badge state", err);
  }
}

async function recalculateDuplicates() {
  if (state.tabs.map.size === 0) {
    return;
  }
  try {
    const dupes: Record<string, number> = {};
    state.tabs.map.forEach((tab) => {
      if (tab.url) {
        const count = (dupes[tab.url] ?? 0) + 1;
        dupes[tab.url] = count;
      }
    });
    sendAction({ type: "setDupeCount", dupes });
  } catch (err) {
    console.error("Error recalculating duplicates", err);
  }
}

/**
 * Update background state and broadcast message.
 */
function sendAction(action: BackgroundAction, { notify = true } = {}) {
  const nextState = dataReducer(state, action);
  if (nextState === state) {
    return;
  }

  state = nextState;
  if (notify) {
    broadcast({ type: "action", action });
  }
}

/**
 * Apply action and re-run related triggers
 * @param action
 * @param options
 */
function applyAction(
  action: BackgroundAction,
  { notify = true, dupes = true } = {},
) {
  sendAction(action, { notify });
  void updateBadge();
  if (dupes) {
    void recalculateDuplicates();
  }
}

async function refreshWindow(windowId: number) {
  try {
    const win = await browser.windows.get(windowId);
    applyAction({ type: "updateWindow", win });
  } catch (err) {
    console.error("Error refreshing window", err);
  }
}

function respondInit(port: BrowserPort) {
  const payload = serializeState(state);
  console.debug("responding to init request", payload);
  port.postMessage({
    type: "init",
    payload,
  } satisfies DataOutboundMessage);
}

export function handleRuntimeConnect(port: BrowserPort) {
  if (port.name !== "data") {
    return;
  }

  connectedPorts.add(port);
  respondInit(port);

  port.onDisconnect.addListener(() => {
    connectedPorts.delete(port);
  });
  port.onMessage.addListener((message: DataInboundMessage) => {
    if (message?.type === "requestInit") {
      respondInit(port);
    }
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

function registerStorageListeners() {
  browser.storage.onChanged.addListener((changes, areaName) => {
    if (
      areaName === "local" &&
      (Object.hasOwn(changes, MAX_TABS_THRESHOLD) ||
        Object.hasOwn(changes, MAX_WINS_THRESHOLD) ||
        Object.hasOwn(changes, POPUP_COUNT) ||
        Object.hasOwn(changes, POPUP_COUNT_COLOR))
    ) {
      updateBadge();
    }
  });
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
  console.debug("initializing store...");
  try {
    const [windows, tabGroups, tabs] = await Promise.all([
      browser.windows.getAll(),
      browser.tabGroups.query({}),
      browser.tabs.query({}),
    ]);

    applyAction({ type: "setWindows", wins: windows }, { dupes: false });
    applyAction({ type: "setTabGroups", tabGroups }, { dupes: false });
    applyAction({ type: "setTabs", tabs });
  } catch (err) {
    console.error("Error initializing background store", err);
  }

  console.debug("initializing listeners...");
  registerStorageListeners();
  registerWindowListeners();
  registerTabGroupListeners();
  registerTabListeners();
}

export function getState() {
  return state;
}
