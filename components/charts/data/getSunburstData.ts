import { getParsedTabData, type ITabData } from "./getParsedTabData";

export interface ItemData {
  id: string;
  label: string;
  value: number;
  children: Array<ItemData>;
}

export function _addChildren(
  arr: Array<ItemData>,
  id: string,
  segments: ITabData["segments"],
) {
  let item = arr.find((d) => d.id === id);

  if (!item) {
    item = { id, value: 1, label: id, children: [] };
    arr.push(item);
  } else {
    item.value++;
  }

  if (segments.length > 0 && Array.isArray(item.children)) {
    const [segment, ...rest] = segments;
    _addChildren(item.children, `${id}/${segment}`, rest);
  }
}

export function getSunburstData(tabs: globalThis.Browser.tabs.Tab[]): ItemData {
  performance.mark("ext:tab-count-snooze:getSunburstData_start");
  const tabData = getParsedTabData(tabs);
  const children: Array<ItemData> = [];

  tabData.forEach(({ segments, origin }) => {
    _addChildren(children, origin, segments);
  });
  const data = { children, id: "root", value: 0, label: "root" };
  performance.mark("ext:tab-count-snooze:getSunburstData_end");
  return data;
}
