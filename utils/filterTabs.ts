import type { Browser } from "#imports";
import {
  type FilterOptions,
  SORT_BY,
  SORT_OPTION,
  type SortOptions,
} from "./options";

export type DedupeConfig = {
  dedupe: boolean;
  ignoreParams: boolean;
};

export function filterTabs(
  tabs: Browser.tabs.Tab[] | undefined,
  filters: FilterOptions,
) {
  if (!tabs || !tabs.length) {
    return [];
  }
  const { search } = filters;
  return tabs.filter(
    ({ title, url }) =>
      title?.toLowerCase().includes(search.toLowerCase()) ||
      url?.toLowerCase().includes(search.toLowerCase()),
  );
}

export function sortTabs(tabs: Browser.tabs.Tab[], sort: SortOptions) {
  if (sort.key === SORT_OPTION.LastAccessed) {
    if (sort.direction === SORT_BY.Ascending) {
      tabs.sort((a, b) =>
        a.lastAccessed && b.lastAccessed ? b.lastAccessed - a.lastAccessed : 0,
      );
    } else {
      tabs.sort((b, a) =>
        a.lastAccessed && b.lastAccessed ? b.lastAccessed - a.lastAccessed : 0,
      );
    }
  } else {
    if (sort.direction === SORT_BY.Ascending) {
      tabs.sort((a, b) => a.index - b.index);
    } else {
      tabs.sort((b, a) => a.index - b.index);
    }
  }
  return tabs;
}

export function filterSortTabs(
  tabs: Browser.tabs.Tab[],
  filters: FilterOptions,
  sort: SortOptions,
) {
  const t = filterTabs(tabs, filters);
  return sortTabs(t, sort);
}
