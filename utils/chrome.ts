export enum TAB_PROPERTIES {
  Active = "active",
  Pinned = "pinned",
  Highlighted = "highlighted",
  Discarded = "discarded",
  Audible = "audible",
  // Muted = "mutedInfo",
}
export type TabIdType = Required<Browser.tabs.Tab>["id"];

export async function closeTabs(tabIds: ReadonlyArray<TabIdType>) {
  await browser.tabs.remove(tabIds as number[]);
}

export async function groupTabs(
  tabIds: number | [number, ...number[]],
  title: string,
) {
  const groupId = await browser.tabs.group({ tabIds });
  await browser.tabGroups.update(groupId, { title });
}
