import { TAB_PROPERTIES } from "./chrome";
import { SORT_OPTION } from "./options";

export enum FILTER_TAB_PROPERTIES {
  Active = TAB_PROPERTIES.Active,
  Pinned = TAB_PROPERTIES.Pinned,
  Highlighted = TAB_PROPERTIES.Highlighted,
  Discarded = TAB_PROPERTIES.Discarded,
  Audible = TAB_PROPERTIES.Audible,
  Muted = TAB_PROPERTIES.Muted,
}

export type DedupeConfig = {
  dedupe: boolean;
  ignoreParams: boolean;
};

function handleFilters(tabs: chrome.tabs.Tab[], filters: FILTER_TAB_PROPERTIES[] = []) {
  if (filters.length === 0) {
    return tabs;
  }
  return tabs.filter((t) => {
    return filters.every((f) => {
      if (f === FILTER_TAB_PROPERTIES.Discarded) {
        return t.discarded || t.status === "unloaded";
      }
      return !!t[f];
    });
  });
}
export function filterTabs(
  tabs: chrome.tabs.Tab[] | undefined,
  search: string = "",
  filters: FILTER_TAB_PROPERTIES[] = [],
) {
  if (!tabs || !tabs.length) {
    return [];
  }
  const filteredTabs = handleFilters(tabs, filters);
  return filteredTabs.filter(
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

export function filterSortTabs(
  tabs: chrome.tabs.Tab[],
  search: string,
  filters: FILTER_TAB_PROPERTIES[],
  sort: SORT_OPTION,
) {
  const t = filterTabs(tabs, search, filters);
  return sortTabs(t, sort);
}
