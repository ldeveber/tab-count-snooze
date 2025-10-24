import dayjs from "dayjs";
import type { Browser } from "#imports";
import {
  type FilterOptions,
  SORT_BY,
  SORT_OPTION,
  type SortOptions,
} from "./options";

export function _filterTabs(
  tabs: Browser.tabs.Tab[],
  dupes: Record<string, number>,
  filters: FilterOptions,
  windowId?: number,
) {
  if (!tabs.length) {
    return [];
  }

  // TODO: add option for how old is old, for now 30 days
  const staleThreshold = dayjs().subtract(30, "day").valueOf();
  const search = filters.search?.toLocaleLowerCase() ?? "";

  const matchCheck = (tab: Browser.tabs.Tab) => {
    if (!tab.url) {
      return false;
    }
    let match = true;
    if (windowId) {
      match = match && windowId === tab.windowId;
    }
    if (match && filters.dupesOnly) {
      match = match && tab.url ? (dupes[tab.url] ?? 0) > 1 : false;
    }
    if (match && filters.stale) {
      match = match && (tab.lastAccessed ?? 0) < staleThreshold;
    }
    if (match && filters.search.length) {
      match =
        (match && tab.title?.toLocaleLowerCase().includes(search)) ||
        tab.url?.toLocaleLowerCase().includes(search) ||
        false;
    }
    return match;
  };

  return tabs.filter(matchCheck);
}

export function _sortTabs(tabs: Browser.tabs.Tab[], sort: SortOptions) {
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
  dupes: Record<string, number>,
  filters: FilterOptions,
  sort: SortOptions,
  windowId?: number,
) {
  const t = _filterTabs(tabs, dupes, filters, windowId);
  return _sortTabs(t, sort);
}
