import { TriangleAlertIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { storage } from "#imports";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useIsFiltered, useTabCount, useWindowCount } from "@/lib/dataStore";
import {
  getUserTabOptionConfig,
  SK_ENABLE_THRESHOLD_DISPLAY_IN_TAB_LIST,
  SK_MAX_TABS_THRESHOLD,
  SK_MAX_WINS_THRESHOLD,
} from "@/lib/storage";

export function ThresholdWarning() {
  const tabCount = useTabCount();
  const windowCount = useWindowCount();
  const isFiltered = useIsFiltered();
  const [showWarning, setShowWarning] = useState(false);
  const [winCountThreshold, setWinCountThreshold] = useState(0);
  const [tabCountThreshold, setTabCountThreshold] = useState(0);

  const getStorage = useCallback(async () => {
    const {
      enableThresholdDisplayInTabList,
      maxTabsThreshold,
      maxWinsThreshold,
    } = await getUserTabOptionConfig();
    setShowWarning(enableThresholdDisplayInTabList);
    setWinCountThreshold(maxWinsThreshold);
    setTabCountThreshold(maxTabsThreshold);
  }, []);

  useEffect(() => {
    getStorage();
  }, [getStorage]);

  useEffect(() => {
    storage.watch<boolean>(
      SK_ENABLE_THRESHOLD_DISPLAY_IN_TAB_LIST,
      (newValue) => {
        if (typeof newValue === "boolean") {
          setShowWarning(newValue);
        }
      },
    );
    storage.watch<number>(SK_MAX_TABS_THRESHOLD, (newValue) => {
      if (typeof newValue === "number") {
        setTabCountThreshold(newValue);
      }
    });
    storage.watch<number>(SK_MAX_WINS_THRESHOLD, (newValue) => {
      if (typeof newValue === "number") {
        setWinCountThreshold(newValue);
      }
    });
    return () => storage.unwatch();
  }, []);

  const show = showWarning && !isFiltered && tabCount > 0 && windowCount > 0;

  const showTabWarning = useMemo(() => {
    if (show && tabCountThreshold > 0) {
      return tabCount > tabCountThreshold;
    }
    return false;
  }, [show, tabCount, tabCountThreshold]);

  const showWindowWarning = useMemo(() => {
    if (show && winCountThreshold > 0) {
      return windowCount > winCountThreshold;
    }
    return false;
  }, [show, windowCount, winCountThreshold]);

  if (showTabWarning && showWindowWarning) {
    return (
      <Alert variant="warning-bg">
        <TriangleAlertIcon className="text-warning" />
        <AlertTitle>
          There are <strong>{tabCount}</strong> tabs and{" "}
          <strong>{windowCount}</strong> windows currently open! You may want to
          consider closing some.
        </AlertTitle>
      </Alert>
    );
  }
  if (showTabWarning) {
    return (
      <Alert variant="warning-bg">
        <TriangleAlertIcon className="text-warning" />
        <AlertTitle>
          There are <strong>{tabCount}</strong> tabs currently open! You may
          want to consider closing some tabs.
        </AlertTitle>
      </Alert>
    );
  }

  if (showWindowWarning) {
    return (
      <Alert variant="warning-bg">
        <TriangleAlertIcon className="text-warning" />
        <AlertTitle>
          There are <strong>{windowCount}</strong> windows currently open! You
          may want to consider closing some windows.
        </AlertTitle>
      </Alert>
    );
  }

  return null;
}
