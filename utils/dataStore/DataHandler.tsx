import { useEffect } from "react";
import { useDataDispatch } from ".";

function TabHandler() {
  const dispatch = useDataDispatch();

  const onTabAdd = (tab: Browser.tabs.Tab) => {
    dispatch({ type: "addTab", tab });
  };

  useEffect(() => {
    browser.tabs.onCreated.addListener(onTabAdd);
    return () => {
      browser.tabs.onCreated.removeListener(onTabAdd);
    };
  }, []);

  const onTabUpdate = (
    _tabId: number,
    _changeInfo: Browser.tabs.TabChangeInfo,
    tab: Browser.tabs.Tab,
  ) => {
    dispatch({ type: "updateTab", tab });
  };

  useEffect(() => {
    browser.tabs.onUpdated.addListener(onTabUpdate);
    return () => {
      browser.tabs.onUpdated.removeListener(onTabUpdate);
    };
  }, []);

  const onTabRemove = (id: number) => {
    dispatch({ type: "removeTab", id });
  };

  useEffect(() => {
    browser.tabs.onRemoved.addListener(onTabRemove);
    return () => {
      browser.tabs.onRemoved.removeListener(onTabRemove);
    };
  }, []);

  return null;
}

function TabGroupHandler() {
  const dispatch = useDataDispatch();

  const onTabGroupCreate = (group: Browser.tabGroups.TabGroup) => {
    dispatch({ type: "addTabGroup", group });
  };

  useEffect(() => {
    browser.tabGroups.onCreated.addListener(onTabGroupCreate);
    return () => {
      browser.tabGroups.onCreated.removeListener(onTabGroupCreate);
    };
  }, []);

  const onTabGroupUpdate = (group: Browser.tabGroups.TabGroup) => {
    dispatch({ type: "updateTabGroup", group });
  };

  useEffect(() => {
    browser.tabGroups.onUpdated.addListener(onTabGroupUpdate);
    return () => {
      browser.tabGroups.onUpdated.removeListener(onTabGroupUpdate);
    };
  }, []);

  const onTabGroupRemove = (group: Browser.tabGroups.TabGroup) => {
    dispatch({ type: "removeTabGroup", id: group.id });
  };

  useEffect(() => {
    browser.tabGroups.onRemoved.addListener(onTabGroupRemove);
    return () => {
      browser.tabGroups.onRemoved.removeListener(onTabGroupRemove);
    };
  }, []);

  return null;
}

function WindowHandler() {
  const dispatch = useDataDispatch();

  const onWindowAdd = (win: Browser.windows.Window) => {
    dispatch({ type: "addWindow", win });
  };

  useEffect(() => {
    browser.windows.onCreated.addListener(onWindowAdd);
    return () => {
      browser.windows.onCreated.removeListener(onWindowAdd);
    };
  }, []);

  // const onWindowUpdate = (id: number) => {
  //   console.log("onWindowUpdate", id);
  //   dispatch({ type: "updateWindow", win });
  // };

  // useEffect(() => {
  //   browser.windows.onFocusChanged.addListener(onWindowUpdate);
  //   return () => {
  //     browser.windows.onFocusChanged.removeListener(onWindowUpdate);
  //   };
  // }, []);

  const onWindowRemove = (id: number) => {
    dispatch({ type: "removeWindow", id });
  };

  useEffect(() => {
    browser.windows.onRemoved.addListener(onWindowRemove);
    return () => {
      browser.windows.onRemoved.removeListener(onWindowRemove);
    };
  }, []);

  return null;
}

export default function DataHandler() {
  const dispatch = useDataDispatch();

  useEffect(() => {
    void browser.windows.getAll().then((wins) => {
      dispatch({ type: "setWindows", wins });
    });
  }, []);

  useEffect(() => {
    void browser.tabGroups.query({}).then((tabGroups) => {
      dispatch({ type: "setTabGroups", tabGroups });
    });
  }, []);

  useEffect(() => {
    void browser.tabs.query({}).then((tabs) => {
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
