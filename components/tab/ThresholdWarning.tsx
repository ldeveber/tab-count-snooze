import { TriangleAlertIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { storage } from "#imports";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useIsFiltered, useTabCount, useWindowCount } from "@/lib/dataStore";
import { getStorageKey } from "@/lib/storage";

const SHOW_WARNING_KEY = getStorageKey("enableThresholdWarning");
const TABS_THRESHOLD_KEY = getStorageKey("maxTabsThreshold");
const WIN_THRESHOLD_KEY = getStorageKey("maxWinsThreshold");

export function ThresholdWarning() {
  const tabCount = useTabCount();
  const windowCount = useWindowCount();
  const isFiltered = useIsFiltered();
  const [showWarning, setShowWarning] = useState(false);
  const [winCountThreshold, setWinCountThreshold] = useState(0);
  const [tabCountThreshold, setTabCountThreshold] = useState(0);

  const getStorage = useCallback(async () => {
    const enable = await storage.getItem(SHOW_WARNING_KEY, {
      fallback: false,
    });
    setShowWarning(enable);
    if (enable) {
      const [winThreshold, tabThreshold] = await Promise.all([
        await storage.getItem(WIN_THRESHOLD_KEY, {
          fallback: 0,
        }),
        await storage.getItem(TABS_THRESHOLD_KEY, {
          fallback: 0,
        }),
      ]);
      setWinCountThreshold(winThreshold);
      setTabCountThreshold(tabThreshold);
    }
  }, []);

  useEffect(() => {
    getStorage();
  }, [getStorage]);

  useEffect(() => {
    storage.watch<boolean>(SHOW_WARNING_KEY, (newValue) => {
      if (typeof newValue === "boolean") {
        setShowWarning(newValue);
      }
    });
    storage.watch<number>(TABS_THRESHOLD_KEY, (newValue) => {
      if (typeof newValue === "number") {
        setTabCountThreshold(newValue);
      }
    });
    storage.watch<number>(WIN_THRESHOLD_KEY, (newValue) => {
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
