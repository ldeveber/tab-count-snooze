export enum TAB_PROPERTIES {
  Active = "active",
  Pinned = "pinned",
  Highlighted = "highlighted",
  Discarded = "discarded",
  Audible = "audible",
  Muted = "muted",
}
export type TabIdType = Required<chrome.tabs.Tab>["id"];

export async function closeTabs(tabIds: ReadonlyArray<TabIdType>) {
  await chrome.tabs.remove(tabIds as number[]);
}

export async function groupTabs(tabIds: number | [number, ...number[]], title: string) {
  const groupId = await chrome.tabs.group({ tabIds });
  await chrome.tabGroups.update(groupId, { title });
}
