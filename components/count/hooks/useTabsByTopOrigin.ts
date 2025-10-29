import { useMemo } from "react";
import { useAllTabs } from "@/lib/dataStore";
import { getTabMatchUrl } from "@/lib/tabMatch";

interface ItemData {
  url: string;
  count: number;
}

export function useTabsByTopOrigin(limit: number): ItemData[] {
  performance.mark("ext:tab-count-snooze:useTabsByTopOrigin_start");
  const tabs = useAllTabs();
  const data = useMemo(() => {
    const data: Array<ItemData> = [];

    tabs.forEach((tab) => {
      try {
        const matchUrl = getTabMatchUrl(tab, 0);
        if (!matchUrl) {
          return;
        }
        let d = data.find((d) => d.url === matchUrl);
        if (!d) {
          d = { url: matchUrl, count: 0 };
          data.push(d);
        }
        d.count++;
      } catch (e) {
        console.error("oops", e);
      }
    });

    return data.sort((a, b) => b.count - a.count).slice(0, limit);
  }, [tabs, limit]);

  const cData = useMemo(
    () =>
      data.map((d, idx) => {
        const num = (idx % 5) + 1;
        return { ...d, fill: `var(--chart-${num})` };
      }),
    [data],
  );

  performance.mark("ext:tab-count-snooze:useTabsByTopOrigin_end");
  return cData;
}
