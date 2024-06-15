import { useEffect, useState } from "react";
import WindowsProvider from "src/contexts/WindowsTabContext";
import Windows, { Loading } from "./window/Windows";

export default function WindowsTab() {
  const [windows, setWindows] = useState<chrome.windows.Window[]>([]);
  const [tabGroups, setTabGroups] = useState<chrome.tabGroups.TabGroup[]>([]);
  const [tabCount, setTabCount] = useState<number>(1);
  const [activeWindowId, setActiveWindowId] = useState<chrome.windows.Window["id"]>(undefined);

  useEffect(() => {
    void chrome.tabGroups.query({}).then((values) => {
      setTabGroups(values);
    });
    void chrome.windows.getAll({ populate: true }).then((values) => {
      const wins = values.filter((w) => w.tabs?.filter(({ title, url }) => !!title && !!url));
      setWindows(wins);
    });
    void chrome.windows.getLastFocused().then((win) => {
      setActiveWindowId(win.id);
    });
  }, []);

  useEffect(() => {
    let tCount = 0;
    windows.forEach(({ tabs }) => {
      tCount += tabs?.length || 0;
    });
    setTabCount(tCount);
  }, [windows]);

  if (windows.length === 0 || tabCount === 0) {
    return <Loading />;
  }

  return (
    <WindowsProvider>
      <Windows
        windows={windows}
        tabGroups={tabGroups}
        tabCount={tabCount}
        activeWindowId={activeWindowId}
      />
    </WindowsProvider>
  );
}
