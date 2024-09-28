import { SORT_OPTION } from "./options";

export type DedupeConfig = {
  dedupe: boolean;
  ignoreParams: boolean;
};

export function filterTabs(tabs: chrome.tabs.Tab[] | undefined, search: string = "") {
  if (!tabs || !tabs.length) {
    return [];
  }
  return tabs.filter(
    ({ title, url }) =>
      (title && title.toLowerCase().includes(search.toLowerCase())) ||
      (url && url.toLowerCase().includes(search.toLowerCase())),
  );
}

export function sortTabs(tabs: chrome.tabs.Tab[], sort: SORT_OPTION) {
  if ((sort as SORT_OPTION) === SORT_OPTION.LastAccessed) {
    tabs.sort((a, b) => b.lastAccessed - a.lastAccessed);
  } else {
    tabs.sort((a, b) => a.index - b.index);
  }
  return tabs;
}

export function filterSortTabs(tabs: chrome.tabs.Tab[], search: string, sort: SORT_OPTION) {
  const t = filterTabs(tabs, search);
  return sortTabs(t, sort);
}
