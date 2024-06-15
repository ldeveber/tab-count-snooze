import { blue, green, orange, purple, red, yellow } from "@mui/material/colors";
import type { Color } from "chart.js";
import { DEFAULT_SHADE } from "src/themes";
import { TAB_PROPERTIES } from "./chrome";

export function getChartColors(): Color[] {
  return [
    red[DEFAULT_SHADE],
    orange[DEFAULT_SHADE],
    yellow[DEFAULT_SHADE],
    green[DEFAULT_SHADE],
    blue[DEFAULT_SHADE],
    purple[DEFAULT_SHADE],
  ];
}

export function getChartData(
  tabs: chrome.tabs.Tab[],
  {
    minDupes = 2,
    urlDepth = 0,
    filters = [],
  }: {
    minDupes?: number;
    urlDepth?: number;
    filters?: TAB_PROPERTIES[];
  } = {},
) {
  const map: Record<string, number> = {};

  tabs.forEach((tab) => {
    if (tab.url) {
      const url = new URL(tab.url);
      const { origin } = url;

      let path = origin;
      if (urlDepth > 0) {
        path =
          origin +
          url.pathname
            .split("/")
            .slice(0, urlDepth + 1)
            .join("/");
      }
      if (filters.length) {
        const applies = filters.filter((f) => !!tab[f]);
        path += applies.length > 0 ? ` (${applies.join(", ")})` : "";
      }
      if (map[path]) {
        map[path]++;
      } else {
        map[path] = 1;
      }
    }
  });

  const rawData: { label: string; value: number }[] = Object.entries(map)
    .filter(([, value]) => value >= minDupes)
    .map(([label, value]) => ({ label, value }));
  rawData.sort((a, b) => b.value - a.value);

  const chartData = {
    labels: rawData.map((r) => r.label),
    datasets: [
      {
        data: rawData.map((r) => r.value),
        backgroundColor: getChartColors(),
        borderWidth: 0,
      },
    ],
  };

  return chartData;
}
