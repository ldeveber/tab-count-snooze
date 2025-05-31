import { useAllTabs } from "@/utils/dataStore";
import { BarDatum } from "@nivo/bar";

export type ITabData = Pick<Browser.tabs.Tab, "url">;

export interface ItemData extends BarDatum {
  id: string;
  value: number;
}

export function _getBarData(tabs: Array<ITabData>, depth: number = 2): readonly ItemData[] {
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

export default function useBarData(): readonly ItemData[] {
  const tabs = useAllTabs();
  return _getBarData(tabs);
}
