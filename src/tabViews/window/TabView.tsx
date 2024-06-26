import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Unstable_Grid2";
import { ChangeEvent, useEffect, useRef } from "react";
import ListItem from "src/components/list/ListItem";
import ListItemFavicon from "src/components/list/ListItemFavicon";
import {
  useFilters,
  useSearch,
  useSelectedTabs,
  useSelectedTabsDispatch,
} from "src/contexts/WindowsTabContext";
import { TAB_PROPERTIES } from "src/utils/chrome";
import TabPropertyIcon from "./TabPropertyIcon";

function TabExtra({ tab }: { readonly tab: chrome.tabs.Tab }) {
  const arr = [];
  if (tab.active) {
    arr.push(<TabPropertyIcon key="active" property={TAB_PROPERTIES.Active} fontSize="inherit" />);
  }
  if (tab.pinned) {
    arr.push(<TabPropertyIcon key="pinned" property={TAB_PROPERTIES.Pinned} fontSize="inherit" />);
  }
  if (tab.highlighted) {
    // aka `tab.selected`
    arr.push(
      <TabPropertyIcon
        key="hightlighted"
        property={TAB_PROPERTIES.Highlighted}
        fontSize="inherit"
      />,
    );
  }
  if (tab.discarded || tab.status === "unloaded") {
    arr.push(
      <TabPropertyIcon key="discarded" property={TAB_PROPERTIES.Discarded} fontSize="inherit" />,
    );
  }
  if (tab.audible) {
    if (tab.mutedInfo?.muted) {
      arr.push(<TabPropertyIcon key="muted" property={TAB_PROPERTIES.Muted} fontSize="inherit" />);
    } else {
      arr.push(
        <TabPropertyIcon key="audible" property={TAB_PROPERTIES.Audible} fontSize="inherit" />,
      );
    }
  }

  if (arr.length === 0) {
    return null;
  }

  return (
    <Grid container columns={2} spacing={1} sx={{ justifyContent: "flex-end", opacity: 0.8 }}>
      {arr.map((icon) => icon)}
    </Grid>
  );
}

export default function TabView({
  tab,
  windowFocused = false,
}: {
  readonly tab: chrome.tabs.Tab;
  readonly windowFocused?: boolean;
}) {
  const search = useSearch();
  const filters = useFilters();
  const selected = useSelectedTabs();
  const dispatchSelectState = useSelectedTabsDispatch();
  const ref = useRef<HTMLLIElement>(null);

  const goToTab = async (tab: chrome.tabs.Tab) => {
    if (!tab.id) {
      return;
    }
    // TODO FIXME Uncaught (in promise) Error: No tab with id: 159340502.
    await chrome.tabs.update(tab.id, { active: true });
    await chrome.windows.update(tab.windowId, { focused: true });
  };

  const onSelection = (_e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (!tab.id) {
      return;
    }
    dispatchSelectState({
      id: tab.id,
      type: checked ? "selected" : "unselected",
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (windowFocused && tab.active && ref.current) {
        ref.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      }
    }, 800);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!tab.id) {
    return null;
  }

  const showMultiSelect = search.length > 0 || filters.length > 0;

  return (
    <ListItem
      ref={ref}
      selected={tab.active}
      primaryActionTitle="Jump to tab"
      onPrimaryAction={() => void goToTab(tab)}
      secondaryAction={
        showMultiSelect ? (
          <Checkbox edge="end" onChange={onSelection} checked={selected.includes(tab.id)} />
        ) : null
      }
    >
      <ListItemFavicon url={tab.url} faded={tab.discarded || tab.status === "unloaded"} />
      <ListItemText
        primary={tab.title}
        primaryTypographyProps={{ noWrap: true }}
        secondary={tab.url}
        secondaryTypographyProps={{
          noWrap: true,
          fontSize: "0.75rem",
        }}
      />
      <TabExtra tab={tab} />
    </ListItem>
  );
}
