import { type Browser, browser } from "#imports";

export type TabIdType = Required<Browser.tabs.Tab>["id"];

export async function closeTabsAction(tabIds: ReadonlyArray<TabIdType>) {
  await browser.tabs.remove(tabIds as number[]).catch((err) => {
    console.error("Error closing tabs", err);
  });
}

export async function groupTabsAction(
  tabIds: number | [number, ...number[]],
  title: string,
) {
  const groupId = await browser.tabs.group({ tabIds }).catch((err) => {
    console.error("Error grouping tabs", err);
  });
  if (typeof groupId === "number") {
    await browser.tabGroups.update(groupId, { title }).catch((err) => {
      console.error("Error renaming tab group", err);
    });
  }
}

export async function goToTabAction(tabId: number, windowId: number) {
  await browser.tabs.update(tabId, { active: true }).catch((err) => {
    console.error("Error updating active tab", err);
  });
  await browser.windows.update(windowId, { focused: true }).catch((err) => {
    console.error("Error updating focused window", err);
  });
}
