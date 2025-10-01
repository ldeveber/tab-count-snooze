import type { BarDatum } from "@nivo/bar";

export interface ItemData extends BarDatum {
  id: string;
  value: number;
}

export function _getMatchUrl(url: URL, depth: number): string {
  if (depth === 0) {
    return url.origin;
  }
  const paths = url.pathname.split("/");
  // depth + 1 because the first entry is ''
  return `${url.origin}${paths.slice(0, Math.min(paths.length, depth + 1)).join("/")}`;
}

export function _getBarData(
  tabs: globalThis.Browser.tabs.Tab[],
  depth: number,
  limit: number,
  minValue: number = 2,
): readonly ItemData[] {
  const data: Array<ItemData> = [];

  tabs.forEach((tab) => {
    if (!tab.url) {
      return;
    }
    try {
      const url = new URL(tab.url);
      const matchUrl = _getMatchUrl(url, depth);
      let d = data.find((d) => d.id === matchUrl);
      if (!d) {
        d = { id: matchUrl, value: 0 };
        data.push(d);
      }
      d.value++;
    } catch (e) {
      console.error("oops", e);
    }
  });

  const arr = data
    .filter((d) => d.value >= minValue)
    .sort((a, b) => a.value - b.value);
  return arr.slice(Math.max(0, arr.length - limit), arr.length);
}

export function getBarData(
  tabs: globalThis.Browser.tabs.Tab[],
  depth: number,
  limit: number,
): readonly ItemData[] {
  performance.mark("ext:tab-count-snooze:getBarData_start");
  const data = _getBarData(tabs, depth, limit);
  performance.mark("ext:tab-count-snooze:getBarData_end");
  return data;
}
