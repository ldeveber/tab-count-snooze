export type TabIdType = Required<Browser.tabs.Tab>["id"];

export async function closeTabs(tabIds: ReadonlyArray<TabIdType>) {
  await browser.tabs.remove(tabIds as number[]).catch((err) => {
    console.error("Error closing tabs", err);
  });
}

export async function groupTabs(
  tabIds: number | [number, ...number[]],
  title: string,
) {
  const groupId = await browser.tabs.group({ tabIds });
  await browser.tabGroups.update(groupId, { title }).catch((err) => {
    console.error("Error grouping tabs", err);
  });
}
