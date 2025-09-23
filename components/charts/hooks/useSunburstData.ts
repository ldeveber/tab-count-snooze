import useParsedTabData, { type ITabData } from "./hookDataParser";
import { SunburstCommonProps } from "@nivo/sunburst";

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
    _addChildren(item.children, id + "/" + segment, rest);
  }
}

export default function useSunburstData(): SunburstCommonProps<ItemData>["data"] {
  const tabData = useParsedTabData();
  const children: Array<ItemData> = [];

  tabData.forEach(({ segments, origin }) => {
    _addChildren(children, origin, segments);
  });

  return { children, id: "root", value: 0, label: "root" };
}
