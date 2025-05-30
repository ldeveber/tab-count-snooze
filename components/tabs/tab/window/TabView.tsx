import { Checkbox, Grid, ListItemText } from "@mui/material";
import { ChangeEvent, useRef } from "react";
import ListItem from "@/components/list/ListItem";
import ListItemFavicon from "@/components/list/ListItemFavicon";
import { useDataDispatch, useIsFiltered, useSelectedTabs } from "@/utils/dataStore";
import { TAB_PROPERTIES } from "@/utils/chrome";
import TabPropertyIcon from "./TabPropertyIcon";

function TabExtra({ tab }: { readonly tab: Browser.tabs.Tab }) {
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
    // if (tab.mutedInfo?.muted) {
    //   arr.push(<TabPropertyIcon key="muted" property={TAB_PROPERTIES.Muted} fontSize="inherit" />);
    // } else {
    arr.push(
      <TabPropertyIcon key="audible" property={TAB_PROPERTIES.Audible} fontSize="inherit" />,
    );
    // }
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

export default function TabView({ tab }: { readonly tab: Browser.tabs.Tab }) {
  const showMultiSelect = useIsFiltered();
  const selected = useSelectedTabs();
  const dispatch = useDataDispatch();
  const ref = useRef<HTMLLIElement>(null);

  const goToTab = async (tab: Browser.tabs.Tab) => {
    if (!tab.id) {
      return;
    }
    // TODO FIXME Uncaught (in promise) Error: No tab with id: 159340502.
    await browser.tabs.update(tab.id, { active: true });
    await browser.windows.update(tab.windowId, { focused: true });
  };

  const onSelection = (_e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (!tab.id) {
      return;
    }
    dispatch({
      id: tab.id,
      type: checked ? "select" : "unselect",
    });
  };

  // useEffect(() => {
  //   // const timer = setTimeout(() => {
  //   //   if (windowFocused && tab.active && ref.current) {
  //   //     ref.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
  //   //   }
  //   // }, 800);
  //   // return () => {
  //   //   clearTimeout(timer);
  //   // };
  // }, []);

  if (!tab.id) {
    return null;
  }

  return (
    <ListItem
      ref={ref}
      selected={tab.active}
      primaryActionTitle="Jump to tab"
      onPrimaryAction={() => void goToTab(tab)}
      secondaryAction={
        showMultiSelect ? (
          <Checkbox
            edge="end"
            onChange={onSelection}
            checked={selected.includes(tab.id)}
            aria-label={`Select tab: ${tab.title}`}
          />
        ) : null
      }
      aria-label={`Tab: ${tab.title}`}
      button-aria-label={`Jump to tab: ${tab.title}`}
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
        sx={{ m: 0 }}
      />
      <TabExtra tab={tab} />
    </ListItem>
  );
}
