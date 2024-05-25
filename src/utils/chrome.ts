export enum TAB_PROPERTIES {
  Active = "active",
  Pinned = "pinned",
  Highlighted = "highlighted",
  Discarded = "discarded",
  Audible = "audible",
  Muted = "muted",
}

export async function closeTabs(tabIds: number[]) {
  await chrome.tabs.remove(tabIds);
}

export async function groupTabs(tabIds: number | [number, ...number[]], title: string) {
  const groupId = await chrome.tabs.group({ tabIds });
  await chrome.tabGroups.update(groupId, { title });
}

export function filterTabs(
  tabs: chrome.tabs.Tab[] | undefined,
  search: string,
  filters: TAB_PROPERTIES[],
) {
  if (!tabs || !tabs.length) {
    return [];
  }
  const filteredTabs =
    filters.length > 0
      ? tabs.filter((t) => {
          return filters.every((f) => !!t[f]);
        })
      : tabs;
  return filteredTabs.filter(
    ({ title, url }) => (title && title.includes(search)) || (url && url.includes(search)),
  );
}
