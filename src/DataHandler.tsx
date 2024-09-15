import { useEffect } from "react";
import { useDataDispatch } from "./contexts/DataProvider";

export default function DataHandler() {
  const dispatch = useDataDispatch();

  useEffect(() => {
    void chrome.windows.getAll().then((wins) => {
      dispatch({ type: "setWindows", wins });
    });
  }, []);

  useEffect(() => {
    void chrome.tabGroups.query({}).then((tabGroups) => {
      dispatch({ type: "setTabGroups", tabGroups });
    });
  }, []);

  useEffect(() => {
    void chrome.tabs.query({}).then((tabs) => {
      dispatch({ type: "setTabs", tabs });
    });
  }, []);

  const onTabUpdate = (_tabId, changeInfo, tab) => {
    // TODO FIXME
    console.log("onUpdated", _tabId, changeInfo, tab);
  };

  useEffect(() => {
    chrome.tabs.onUpdated.addListener(onTabUpdate);
    return () => {
      chrome.tabs.onUpdated.removeListener(onTabUpdate);
    };
  }, []);

  return null;
}
