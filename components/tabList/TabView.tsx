import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { goToTabAction } from "@/utils/browserActionHelper";
import {
  useDataDispatch,
  useIsFiltered,
  useSelectedTabs,
} from "@/utils/dataStore";
import TabFavicon from "./TabFavicon";
import TabState from "./TabState";

export default function TabView({
  tab,
}: {
  readonly indented?: boolean;
  readonly tab: Browser.tabs.Tab;
}) {
  const showMultiSelect = useIsFiltered();
  const selected = useSelectedTabs();
  const dispatch = useDataDispatch();
  const [active, setActive] = useState(tab.active);
  // assume the tab was viewed when it was last accessed?
  const [lastViewed, setLastViewed] = useState(
    tab.lastAccessed ? new Date(tab.lastAccessed) : null,
  );
  const [checked, setChecked] = useState(
    tab.id ? selected.includes(tab.id) : false,
  );

  const goToTab = async () => {
    if (!tab.id) {
      return;
    }
    await goToTabAction(tab.id, tab.windowId);
  };

  const onSelection = (newChecked: boolean) => {
    setChecked(newChecked);
    if (!tab.id) {
      return;
    }
    dispatch({
      id: tab.id,
      type: newChecked ? "select" : "unselect",
    });
  };

  const onActivated = (info: Browser.tabs.OnActivatedInfo) => {
    if (info.windowId === tab.windowId && info.tabId === tab.id) {
      setActive(true);
      setLastViewed(new Date());
    } else {
      setActive(false);
    }
  };

  useEffect(() => {
    browser.tabs.onActivated.addListener(onActivated);
    return () => {
      browser.tabs.onActivated.removeListener(onActivated);
    };
  }, []);

  if (!tab.id) {
    return null;
  }

  return (
    <li
      id={`tab-${tab.id}`}
      data-tab={tab.id}
      className="flex flex-row items-center gap-2 p-1"
      aria-label={`Tab: ${tab.title}`}
    >
      <button
        type="button"
        onClick={goToTab}
        aria-label={`Jump to tab: ${tab.title}`}
        className="flex w-full items-center gap-3 overflow-hidden rounded-sm px-3 py-2 text-left transition-colors hover:bg-primary focus-visible:outline focus-visible:outline-ring focus-visible:outline-offset-2 data-[selected]:bg-primary/10"
        data-active={active ? "true" : undefined}
      >
        <span className="flex w-6 flex-none justify-center" role="none">
          <TabFavicon tab={tab} />
        </span>
        <span className="flex flex-grow flex-col gap-1 overflow-hidden font-medium text-sm">
          <span className="flex flex-row justify-between gap-1">
            <span
              className="overflow-hidden text-ellipsis text-nowrap"
              title={tab.title ?? undefined}
            >
              {tab.title}
            </span>
            <TabState tab={tab} />
          </span>
          <span className="flex flex-col gap-1 text-muted-foreground text-xs lg:flex-row lg:items-center lg:justify-between">
            <span
              className="overflow-hidden text-ellipsis text-nowrap"
              title={tab.url ?? undefined}
            >
              {tab.url}
            </span>
            <span className="hidden whitespace-nowrap lg:inline">
              {lastViewed ? new Date(lastViewed).toLocaleString() : "N/A"}
            </span>
          </span>
        </span>
      </button>
      {showMultiSelect ? (
        <Checkbox
          id={`select-tab-${tab.id}`}
          className="mr-2 flex-none"
          onCheckedChange={onSelection}
          checked={checked}
          aria-label={`Select tab: ${tab.title}`}
        />
      ) : null}
    </li>
  );
}
