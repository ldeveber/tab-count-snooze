import type { Browser } from "#imports";

export function cloneTab(tab: Browser.tabs.Tab): Browser.tabs.Tab {
  return { ...tab };
}

export function cloneWindow(
  win: Browser.windows.Window,
): Browser.windows.Window {
  return {
    ...win,
    tabs: win.tabs ? win.tabs.map(cloneTab) : undefined,
  };
}

export function cloneTabGroup(
  group: Browser.tabGroups.TabGroup,
): Browser.tabGroups.TabGroup {
  return { ...group };
}
