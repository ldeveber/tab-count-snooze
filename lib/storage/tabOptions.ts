import { z } from "zod";
import type { Browser, StorageItemKey } from "#imports";
import { storage } from "#imports";

// fix eval error @see https://github.com/colinhacks/zod/issues/4461
z.config({ jitless: true });

export const tabOptionsConfigSchema = z.object({
  enableThresholdDisplayInTabList: z.boolean(),
  enableThresholdNotification: z.boolean(),
  maxTabsThreshold: z
    .number()
    .int()
    .nonnegative()
    .max(9999, "Will you realistically have this many tabs open?"),
  maxWinsThreshold: z
    .number()
    .int()
    .nonnegative()
    .max(9999, "Will you realistically have this many windows open?"),
  popupCount: z.literal(["never", "warning", "always"]),
  enablePopupCountColor: z.boolean(),
});
export type TabOptionsConfig = z.infer<typeof tabOptionsConfigSchema>;

const defaultValues: TabOptionsConfig = {
  popupCount: "warning",
  enableThresholdDisplayInTabList: false,
  enableThresholdNotification: false,
  maxTabsThreshold: 250,
  maxWinsThreshold: 20,
  enablePopupCountColor: true,
};
export const defaultTabOptionsConfigValues = defaultValues;

export const SK_ENABLE_THRESHOLD_DISPLAY_IN_TAB_LIST: StorageItemKey =
  "local:enableThresholdDisplayInTabList";
export const SK_MAX_TABS_THRESHOLD: StorageItemKey = "local:maxTabsThreshold";
export const SK_MAX_WINS_THRESHOLD: StorageItemKey = "local:maxWinsThreshold";
export const SK_POPUP_COUNT: StorageItemKey = "local:popupCount";
export const SK_POPUP_COUNT_COLOR: StorageItemKey =
  "local:enablePopupCountColor";

export async function getUserTabOptionConfig(): Promise<TabOptionsConfig> {
  const [
    enableThresholdNotification,
    enableThresholdDisplayInTabList,
    maxTabsThreshold,
    maxWinsThreshold,
    popupCount,
    enablePopupCountColor,
  ] = await Promise.all([
    await storage.getItem(SK_ENABLE_THRESHOLD_DISPLAY_IN_TAB_LIST, {
      fallback: defaultValues.enableThresholdNotification,
    }),
    await storage.getItem(SK_ENABLE_THRESHOLD_DISPLAY_IN_TAB_LIST, {
      fallback: defaultValues.enableThresholdDisplayInTabList,
    }),
    await storage.getItem(SK_MAX_TABS_THRESHOLD, {
      fallback: defaultValues.maxTabsThreshold,
    }),
    await storage.getItem(SK_MAX_WINS_THRESHOLD, {
      fallback: defaultValues.maxWinsThreshold,
    }),
    storage.getItem(SK_POPUP_COUNT, { fallback: defaultValues.popupCount }),
    storage.getItem(SK_POPUP_COUNT_COLOR, {
      fallback: defaultValues.enablePopupCountColor,
    }),
  ]);

  return {
    enableThresholdNotification,
    enableThresholdDisplayInTabList,
    maxTabsThreshold,
    maxWinsThreshold,
    popupCount,
    enablePopupCountColor,
  };
}

export function changesHasOwnTabOptions(
  changes: {
    [key: string]: Browser.storage.StorageChange;
  },
  keys: Array<keyof TabOptionsConfig>,
) {
  return keys.some((k) => Object.hasOwn(changes, k));
}
