import { useEffect } from "react";
import { useDataDispatch } from "./contexts";

function TabHandler() {
  const dispatch = useDataDispatch();

  const onTabAdd = (tab: chrome.tabs.Tab) => {
    dispatch({ type: "addTab", tab });
  };

  useEffect(() => {
    chrome.tabs.onCreated.addListener(onTabAdd);
    return () => {
      chrome.tabs.onCreated.removeListener(onTabAdd);
    };
  }, []);

  const onTabUpdate = (
    _tabId: number,
    _changeInfo: chrome.tabs.TabChangeInfo,
    tab: chrome.tabs.Tab,
  ) => {
    dispatch({ type: "updateTab", tab });
  };

  useEffect(() => {
    chrome.tabs.onUpdated.addListener(onTabUpdate);
    return () => {
      chrome.tabs.onUpdated.removeListener(onTabUpdate);
    };
  }, []);

  const onTabRemove = (id: number) => {
    dispatch({ type: "removeTab", id });
  };

  useEffect(() => {
    chrome.tabs.onRemoved.addListener(onTabRemove);
    return () => {
      chrome.tabs.onRemoved.removeListener(onTabRemove);
    };
  }, []);

  return null;
}

function TabGroupHandler() {
  const dispatch = useDataDispatch();

  const onTabGroupCreate = (group: chrome.tabGroups.TabGroup) => {
    dispatch({ type: "addTabGroup", group });
  };

  useEffect(() => {
    chrome.tabGroups.onCreated.addListener(onTabGroupCreate);
    return () => {
      chrome.tabGroups.onCreated.removeListener(onTabGroupCreate);
    };
  }, []);

  const onTabGroupUpdate = (group: chrome.tabGroups.TabGroup) => {
    dispatch({ type: "updateTabGroup", group });
  };

  useEffect(() => {
    chrome.tabGroups.onUpdated.addListener(onTabGroupUpdate);
    return () => {
      chrome.tabGroups.onUpdated.removeListener(onTabGroupUpdate);
    };
  }, []);

  const onTabGroupRemove = (group: chrome.tabGroups.TabGroup) => {
    dispatch({ type: "removeTabGroup", id: group.id });
  };

  useEffect(() => {
    chrome.tabGroups.onRemoved.addListener(onTabGroupRemove);
    return () => {
      chrome.tabGroups.onRemoved.removeListener(onTabGroupRemove);
    };
  }, []);

  return null;
}

function WindowHandler() {
  const dispatch = useDataDispatch();

  const onWindowAdd = (win: chrome.windows.Window) => {
    dispatch({ type: "addWindow", win });
  };

  useEffect(() => {
    chrome.windows.onCreated.addListener(onWindowAdd);
    return () => {
      chrome.windows.onCreated.removeListener(onWindowAdd);
    };
  }, []);

  // const onWindowUpdate = (id: number) => {
  //   console.log("onWindowUpdate", id);
  //   dispatch({ type: "updateWindow", win });
  // };

  // useEffect(() => {
  //   chrome.windows.onFocusChanged.addListener(onWindowUpdate);
  //   return () => {
  //     chrome.windows.onFocusChanged.removeListener(onWindowUpdate);
  //   };
  // }, []);

  const onWindowRemove = (id: number) => {
    dispatch({ type: "removeWindow", id });
  };

  useEffect(() => {
    chrome.windows.onRemoved.addListener(onWindowRemove);
    return () => {
      chrome.windows.onRemoved.removeListener(onWindowRemove);
    };
  }, []);

  return null;
}

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

  return (
    <>
      <TabHandler />
      <TabGroupHandler />
      <WindowHandler />
    </>
  );
}
