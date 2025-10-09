import type { Browser } from "#imports";

export interface ItemData {
  id: string;
  label: string;
  value: number;
  children: Array<ItemData>;
}

export function _addChildren(
  arr: Array<ItemData>,
  id: string,
  segments: Array<string>,
  depth: number,
  maxDepth?: number,
) {
  if (maxDepth === depth) {
    return;
  }

  let item = arr.find((d) => d.id === id);

  if (!item) {
    item = { id, value: 1, label: id, children: [] };
    arr.push(item);
  } else {
    item.value++;
  }

  if (segments.length > 0 && Array.isArray(item.children)) {
    const [segment, ...rest] = segments;
    _addChildren(item.children, `${id}/${segment}`, rest, depth + 1, maxDepth);
  }
}

export function getSunburstData(
  tabs: Browser.tabs.Tab[],
  maxDepth: number,
  minValue: number,
  limit: number,
): ItemData {
  performance.mark("ext:tab-count-snooze:getSunburstData_start");
  const arr: Array<ItemData> = [];

  tabs.forEach((tab) => {
    const { url } = tab;
    if (!url) {
      return;
    }
    const urlObj = new URL(url);
    const { origin, pathname } = urlObj;
    const segments = pathname.split("/").filter((item) => item !== "");

    _addChildren(arr, origin, segments, 0, maxDepth);
  });

  const children = arr
    .filter((c) => c.value >= minValue)
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
  const data = {
    children,
    id: "root",
    value: 0,
    label: "root",
  };
  performance.mark("ext:tab-count-snooze:getSunburstData_end");
  return data;
}
