import { useAllTabs } from "@/utils/dataStore";

export interface ITabData {
  readonly origin: string;
  segments: ReadonlyArray<string>;
}

/**
 * Raw data mappings of tabs for chart data conversion
 * @borrows Browser.tabs.Tab["title"] as title
 */
export interface TabData extends ITabData {
  readonly title: Browser.tabs.Tab["title"];
  readonly url: string;
  readonly pathname: string;
  readonly path1: string | undefined;
  readonly segment1: string | undefined;
  readonly path2: string | undefined;
  readonly segment2: string | undefined;
  readonly path3: string | undefined;
  readonly segment3: string | undefined;
}

export default function useParsedTabData(): ReadonlyArray<TabData> {
  const tabs = useAllTabs();

  const tData: Array<TabData> = [];
  tabs.forEach((tab) => {
    const { url, title } = tab;
    if (!url) {
      return;
    }
    const urlObj = new URL(url);
    const { origin, pathname } = urlObj;
    const segments = pathname.split("/").filter((item) => item !== "");

    let path1, path2, path3, segment1, segment2, segment3;
    if (segments.length > 0) {
      segment1 = segments[0];
      path1 = urlObj.origin + "/" + segment1;
      if (segments.length > 1) {
        segment2 = segments[1];
        path2 = path1 + "/" + segment2;
        if (segments.length > 2) {
          segment3 = segments[2];
          path3 = path2 + "/" + segment3;
        }
      }
    }

    tData.push({
      title,
      url,
      origin,
      pathname,
      segments,
      path1,
      segment1,
      path2,
      segment2,
      path3,
      segment3,
    });
  });

  return tData;
}
