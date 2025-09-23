import {
  Checkbox,
  ListItemIcon,
  ListItemText,
  ListItem as MuiListItem,
  ListItemButton as MuiListItemButton,
  type ListItemButtonProps as MuiListItemButtonProps,
  type ListItemProps as MuiListItemProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import type { ChangeEvent } from "react";
import {
  useDataDispatch,
  useIsFiltered,
  useSelectedTabs,
} from "@/utils/dataStore";
import TabFavicon, { FAVICON_SIZE } from "./TabFavicon";
import TabState from "./TabState";

interface ListItemProps extends MuiListItemProps {
  indented: boolean;
}
export const ListItem = styled(MuiListItem, {
  shouldForwardProp: (propName) => propName !== "indented",
})<ListItemProps>(({ indented, theme }) => ({
  "&.MuiListItem-root": {
    borderTop: `1px solid ${theme.palette.divider}`,
    gap: theme.spacing(2),
    padding: theme.spacing(0.5),
    paddingRight: indented ? 0 : theme.spacing(0.5),
  },
}));

interface ListItemButtonProps extends MuiListItemButtonProps {
  indented: boolean;
}
const ListItemButton = styled(MuiListItemButton, {
  shouldForwardProp: (propName) => propName !== "indented",
})<ListItemButtonProps>(({ indented, theme }) => ({
  "&.MuiListItemButton-root": {
    borderRadius: 8,
    gap: theme.spacing(2),
    paddingLeft: indented ? theme.spacing(1.25) : theme.spacing(2),
  },
}));

function TabUrlView({
  lastViewed,
  tab,
}: {
  readonly lastViewed: Date | null;
  readonly tab: Browser.tabs.Tab;
}) {
  return (
    <div className="flex justify-between gap-2">
      <div className="overflow-hidden text-ellipsis">{tab.url}</div>
      <div className="hidden lg:block">
        {lastViewed ? new Date(lastViewed).toLocaleString() : "N/A"}
      </div>
    </div>
  );
}

export default function TabView({
  indented = false,
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

  const goToTab = async () => {
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
    <ListItem
      id={`tab-${tab.id}`}
      indented={indented}
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
      data-tab={tab.id}
    >
      <ListItemButton
        indented={indented}
        selected={active}
        onClick={goToTab}
        aria-label={`Jump to tab: ${tab.title}`}
      >
        <ListItemIcon sx={{ minWidth: FAVICON_SIZE }} role="none">
          <TabFavicon tab={tab} />
        </ListItemIcon>
        <ListItemText
          primary={tab.title}
          secondary={<TabUrlView tab={tab} lastViewed={lastViewed} />}
          slotProps={{
            primary: { noWrap: true },
            secondary: { component: "div", noWrap: true, fontSize: "0.75rem" },
          }}
          sx={{ m: 0 }}
        />
        <TabState tab={tab} />
      </ListItemButton>
    </ListItem>
  );
}
