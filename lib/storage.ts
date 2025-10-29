import type { StorageItemKey } from "#imports";

enum OptionKeys {
  SHOW_TAB_WARNING = "enableThresholdWarning",
  SHOW_TAB_NOTIFICATION = "enableThresholdNotification",
  MAX_TABS_THRESHOLD = "maxTabsThreshold",
  MAX_WINS_THRESHOLD = "maxWinsThreshold",
  POPUP_COUNT = "popupCount",
  POPUP_COUNT_COLOR = "enablePopupCountColor",
}

export const SHOW_THRESHOLD_WARNING = OptionKeys.SHOW_TAB_WARNING.toString();
export const SHOW_TAB_NOTIFICATION =
  OptionKeys.SHOW_TAB_NOTIFICATION.toString();
export const MAX_TABS_THRESHOLD = OptionKeys.MAX_TABS_THRESHOLD.toString();
export const MAX_WINS_THRESHOLD = OptionKeys.MAX_WINS_THRESHOLD.toString();
export const POPUP_COUNT = OptionKeys.POPUP_COUNT.toString();
export const POPUP_COUNT_COLOR = OptionKeys.POPUP_COUNT_COLOR.toString();

export function getStorageKey(key: string): StorageItemKey {
  switch (key) {
    case SHOW_THRESHOLD_WARNING:
    case SHOW_TAB_NOTIFICATION:
    case MAX_TABS_THRESHOLD:
    case MAX_WINS_THRESHOLD:
    case POPUP_COUNT:
    case POPUP_COUNT_COLOR:
    case "displayedCharts":
      return `local:${key}`;
    default:
      throw new Error(`Unknown key "${key}"`);
  }
}
