import { TAB_PROPERTIES } from "./chrome";
import { SORT_OPTION } from "./options";

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
          return filters.every((f) => {
            if (f === TAB_PROPERTIES.Discarded) {
              return t.discarded || t.status === "unloaded";
            }
            return !!t[f];
          });
        })
      : tabs;
  return filteredTabs.filter(
    ({ title, url }) => (title && title.includes(search)) || (url && url.includes(search)),
  );
}

export function sortTabs(win: chrome.windows.Window, sort: SORT_OPTION) {
  if ((sort as SORT_OPTION) === SORT_OPTION.LastAccessed) {
    win.tabs?.sort((a, b) => b.lastAccessed - a.lastAccessed);
  } else {
    win.tabs?.sort((a, b) => a.index - b.index);
  }
  return win;
}

export default function filterSortTabs(
  win: chrome.windows.Window,
  search: string,
  filters: TAB_PROPERTIES[],
  sort: SORT_OPTION,
) {
  const w = { ...win, tabs: filterTabs(win.tabs, search, filters) };
  return sortTabs(w, sort);
}
