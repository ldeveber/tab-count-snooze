import { SORT_OPTION } from "./options";

export type DedupeConfig = {
  dedupe: boolean;
  ignoreParams: boolean;
};

export function filterTabs(
  tabs: Browser.tabs.Tab[] | undefined,
  search: string = "",
) {
  if (!tabs || !tabs.length) {
    return [];
  }
  return tabs.filter(
    ({ title, url }) =>
      title?.toLowerCase().includes(search.toLowerCase()) ||
      url?.toLowerCase().includes(search.toLowerCase()),
  );
}

export function sortTabs(tabs: Browser.tabs.Tab[], sort: SORT_OPTION) {
  if ((sort as SORT_OPTION) === SORT_OPTION.LastAccessed) {
    tabs.sort((a, b) =>
      a.lastAccessed && b.lastAccessed ? b.lastAccessed - a.lastAccessed : 0,
    );
  } else {
    tabs.sort((a, b) => a.index - b.index);
  }
  return tabs;
}

export function filterSortTabs(
  tabs: Browser.tabs.Tab[],
  search: string,
  sort: SORT_OPTION,
) {
  const t = filterTabs(tabs, search);
  return sortTabs(t, sort);
}
