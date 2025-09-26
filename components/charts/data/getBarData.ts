import type { BarDatum } from "@nivo/bar";

export type ITabData = Pick<Browser.tabs.Tab, "url">;

export interface ItemData extends BarDatum {
  id: string;
  value: number;
}

export function _getBarData(
  tabs: Array<ITabData>,
  depth: number = 2,
): readonly ItemData[] {
  const data: Array<ItemData> = [];

  tabs.forEach((tab) => {
    if (!tab.url) {
      return;
    }
    const { origin } = new URL(tab.url);

    let d = data.find((d) => d.id === origin);
    if (!d) {
      d = { id: origin, value: 0 };
      data.push(d);
    }
    d.value++;
  });

  return data.filter((d) => d.value > depth).sort((a, b) => a.value - b.value);
}

export function getBarData(
  tabs: globalThis.Browser.tabs.Tab[],
): readonly ItemData[] {
  performance.mark("ext:tab-count-snooze:getBarData_start");
  const data = _getBarData(tabs);
  performance.mark("ext:tab-count-snooze:getBarData_end");
  return data;
}
