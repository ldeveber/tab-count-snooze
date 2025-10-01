/** biome-ignore-all lint/correctness/useExhaustiveDependencies: need better way */
import { useEffect } from "react";
import { useDataDispatch } from ".";

function TabHandler() {
  const dispatch = useDataDispatch();

  const onTabAdd = (tab: Browser.tabs.Tab) => {
    try {
      dispatch({ type: "addTab", tab });
    } catch (err) {
      console.error("Error onTabAdd", err);
    }
  };

  const onTabUpdate = (
    _tabId: number,
    _changeInfo: Browser.tabs.OnUpdatedInfo,
    tab: Browser.tabs.Tab,
  ) => {
    try {
      dispatch({ type: "updateTab", tab });
    } catch (err) {
      console.error("Error onTabUpdate", err);
    }
  };

  const onTabRemove = (id: number) => {
    try {
      dispatch({ type: "removeTab", id });
    } catch (err) {
      console.error("Error onTabRemove", err);
    }
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
    try {
      dispatch({ type: "addTabGroup", group });
    } catch (err) {
      console.error("Error onTabGroupCreate", err);
    }
  };

  const onTabGroupUpdate = (group: Browser.tabGroups.TabGroup) => {
    try {
      dispatch({ type: "updateTabGroup", group });
    } catch (err) {
      console.error("Error onTabGroupUpdate", err);
    }
  };

  const onTabGroupRemove = (group: Browser.tabGroups.TabGroup) => {
    try {
      dispatch({ type: "removeTabGroup", id: group.id });
    } catch (err) {
      console.error("Error onTabGroupRemove", err);
    }
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
    try {
      dispatch({ type: "addWindow", win });
    } catch (err) {
      console.error("Error onWindowAdd", err);
    }
  };

  const onWindowFocusChanged = (id: number) => {
    try {
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
    } catch (err) {
      console.error("Error onWindowFocusChanged", err);
    }
  };

  const onWindowRemove = (id: number) => {
    try {
      dispatch({ type: "removeWindow", id });
    } catch (err) {
      console.error("Error onWindowRemove", err);
    }
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
    void browser.windows
      .getAll()
      .then((wins) => {
        dispatch({ type: "setWindows", wins });
      })
      .catch((err) => {
        console.error("Error fetching windows", err);
      });
  }, []);

  useEffect(() => {
    void browser.tabGroups
      .query({})
      .then((tabGroups) => {
        dispatch({ type: "setTabGroups", tabGroups });
      })
      .catch((err) => {
        console.error("Error fetching tab groups", err);
      });
  }, []);

  useEffect(() => {
    void browser.tabs
      .query({})
      .then((tabs) => {
        dispatch({ type: "setTabs", tabs });
      })
      .catch((err) => {
        console.error("Error fetching tabs", err);
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
