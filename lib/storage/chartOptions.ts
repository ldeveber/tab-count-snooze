import { z } from "zod";
import type { Browser, StorageItemKey } from "#imports";
import { storage } from "#imports";

// fix eval error @see https://github.com/colinhacks/zod/issues/4461
z.config({ jitless: true });

export const chartOptionsConfigSchema = z.object({
  displayedCharts: z.object({
    topOpenSites: z.boolean(),
    tabStaleness: z.boolean(),
    tabMap: z.boolean(),
  }),
});
export type ChartOptionsConfig = z.infer<typeof chartOptionsConfigSchema>;

const defaultValues: ChartOptionsConfig = {
  displayedCharts: {
    topOpenSites: true,
    tabStaleness: true,
    tabMap: true,
  },
};
export const defaultChartOptionsConfigValues = defaultValues;

export const SK_DISPLAYED_CHARTS: StorageItemKey = "local:displayedCharts";

export async function getUserChartOptionConfig(): Promise<ChartOptionsConfig> {
  const displayedCharts = await storage.getItem(SK_DISPLAYED_CHARTS, {
    fallback: defaultValues.displayedCharts,
  });

  return {
    displayedCharts,
  };
}

export function changesHasOwnChartOptions(
  changes: {
    [key: string]: Browser.storage.StorageChange;
  },
  keys: Array<keyof ChartOptionsConfig>,
) {
  return keys.some((k) => Object.hasOwn(changes, k));
}
