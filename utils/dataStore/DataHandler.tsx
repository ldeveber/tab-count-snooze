import { useEffect } from "react";
import { useDataDispatch } from ".";

function TabHandler() {
  const dispatch = useDataDispatch();

  const onTabAdd = (tab: Browser.tabs.Tab) => {
    dispatch({ type: "addTab", tab });
  };

  const onTabUpdate = (
    _tabId: number,
    _changeInfo: Browser.tabs.OnUpdatedInfo,
    tab: Browser.tabs.Tab,
  ) => {
    dispatch({ type: "updateTab", tab });
  };

  const onTabRemove = (id: number) => {
    dispatch({ type: "removeTab", id });
  };

  useEffect(() => {
    browser.tabs.onCreated.addListener(onTabAdd);
    browser.tabs.onUpdated.addListener(onTabUpdate);
    browser.tabs.onRemoved.addListener(onTabRemove);
    return () => {
      browser.tabs.onCreated.removeListener(onTabAdd);
      browser.tabs.onUpdated.removeListener(onTabUpdate);
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

  const onTabGroupUpdate = (group: Browser.tabGroups.TabGroup) => {
    dispatch({ type: "updateTabGroup", group });
  };

  const onTabGroupRemove = (group: Browser.tabGroups.TabGroup) => {
    dispatch({ type: "removeTabGroup", id: group.id });
  };

  useEffect(() => {
    browser.tabGroups.onCreated.addListener(onTabGroupCreate);
    browser.tabGroups.onUpdated.addListener(onTabGroupUpdate);
    browser.tabGroups.onRemoved.addListener(onTabGroupRemove);
    return () => {
      browser.tabGroups.onCreated.removeListener(onTabGroupCreate);
      browser.tabGroups.onUpdated.removeListener(onTabGroupUpdate);
      browser.tabGroups.onRemoved.removeListener(onTabGroupRemove);
    };
  }, []);

  return null;
}

function WindowHandler() {
  const dispatch = useDataDispatch();
  const [lastFocus, setLastFocus] = useState<
    NonNullable<Browser.windows.Window["id"]>
  >(browser.windows.WINDOW_ID_NONE);

  const onWindowAdd = (win: Browser.windows.Window) => {
    dispatch({ type: "addWindow", win });
  };

  const onWindowFocusChanged = (id: number) => {
    if (lastFocus !== browser.windows.WINDOW_ID_NONE) {
      browser.windows.get(lastFocus).then((w) => {
        dispatch({ type: "updateWindow", win: w });
      });
    }
    if (id !== browser.windows.WINDOW_ID_NONE) {
      browser.windows.get(id).then((w) => {
        dispatch({ type: "updateWindow", win: w });
      });
    }
    setLastFocus(id);
  };

  const onWindowRemove = (id: number) => {
    dispatch({ type: "removeWindow", id });
  };

  useEffect(() => {
    browser.windows.onFocusChanged.addListener(onWindowFocusChanged);
    return () => {
      browser.windows.onFocusChanged.removeListener(onWindowFocusChanged);
    };
  }, [lastFocus]);

  useEffect(() => {
    browser.windows.onCreated.addListener(onWindowAdd);
    browser.windows.onRemoved.addListener(onWindowRemove);
    return () => {
      browser.windows.onCreated.removeListener(onWindowAdd);
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
