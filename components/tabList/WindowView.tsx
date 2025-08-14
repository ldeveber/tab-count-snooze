import { useMemo } from "react";
import {
  Card,
  CardActionArea as MuiCardActionArea,
  CardContent as MuiCardContent,
  CardHeader as MuiCardHeader,
  Collapse,
  List,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useIsFiltered, useSearch, useSort, useTabGroups, useTabs } from "@/utils/dataStore";
import { filterSortTabs } from "@/utils/filterTabs";
import TabGroupView from "./TabGroupView";
import TabView from "./TabView";
import ExpandMoreIcon from "@/components/ExpandMoreIcon";

const CardActionArea = styled(MuiCardActionArea)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  paddingLeft: theme.spacing(2.5),
  paddingRight: theme.spacing(2.5),
  ".MuiCardHeader-action": {
    alignSelf: "auto",
    margin: 0,
  },
}));

const CardHeader = styled(MuiCardHeader)(({ theme }) => ({
  paddingLeft: "0 !important",
  paddingRight: "0 !important",
  ".MuiCardHeader-content": {
    padding: 0,
    display: "flex",
    alignItems: "baseline",
    gap: theme.spacing(2),
  },
}));

const CardContent = styled(MuiCardContent)(() => ({
  padding: 0,
  "&:last-child": {
    padding: 0,
  },
}));

type GroupType = {
  readonly tabGroup: Browser.tabGroups.TabGroup;
  readonly tabs: Browser.tabs.Tab[];
};
type RenderListType = {
  readonly id: number;
  readonly tab?: Browser.tabs.Tab;
  readonly group?: GroupType;
};

export function Loading() {
  return null;
}

export default function WindowView({
  id,
  win,
}: {
  readonly id: number;
  readonly win: Browser.windows.Window;
}) {
  const groups = useTabGroups(win.id);
  const windowTabs = useTabs(win.id);
  const isFiltered = useIsFiltered();
  const sort = useSort();
  const search = useSearch();
  const [focused, setFocused] = useState(win.focused);
  const [lastViewed, setLastViewed] = useState<Date | null>(focused ? new Date() : null);
  const [expanded, setExpanded] = useState(true);

  const onFocusChanged = (id: number) => {
    setFocused(id === win.id);
    if (id === win.id) {
      setLastViewed(new Date());
    }
  };

  useEffect(() => {
    browser.windows.onFocusChanged.addListener(onFocusChanged);
    return () => {
      browser.windows.onFocusChanged.removeListener(onFocusChanged);
    };
  }, []);

  const visibleTabs = useMemo(
    () => filterSortTabs(windowTabs, search, sort),
    [windowTabs, search, sort],
  );

  const tabList: RenderListType[] = useMemo(() => {
    const list: RenderListType[] = [];

    if (!visibleTabs.length) {
      return list;
    }
    const done: number[] = [];

    visibleTabs.forEach((tab) => {
      if (done.includes(tab.groupId)) {
        return;
      }
      const tabGroup = groups.find(({ id }) => id === tab.groupId);
      if (tabGroup) {
        const arr = visibleTabs.filter((tab) => tab.groupId === tabGroup.id);
        list.push({ group: { tabGroup, tabs: arr }, id: tabGroup.id });
        done.push(tabGroup.id);
        return;
      }
      if (tab.id) {
        list.push({ tab, id: tab.id });
      }
    });

    return list;
  }, [visibleTabs, groups]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (!win?.id || visibleTabs.length === 0) {
    return null;
  }
  return (
    <Card id={`window-${id}`} raised={focused} className="h-auto w-full" data-win={id}>
      <CardActionArea onClick={handleExpandClick} aria-expanded={expanded}>
        <CardHeader
          title={`${visibleTabs.length} Tabs`}
          subheader={lastViewed ? new Date(lastViewed).toLocaleString() : "N/A"}
          sx={{ py: 0, px: 1.5 }}
          action={<ExpandMoreIcon expanded={expanded} />}
          slotProps={{
            content: { sx: { py: 1, px: 1 } },
            title: { variant: "subtitle1" },
            subheader: { variant: "caption" },
          }}
        />
      </CardActionArea>
      <CardContent sx={{ p: 0 }}>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <List
            dense
            sx={{ pt: 0 }}
            aria-label={`${win.state} window with ${isFiltered ? `${visibleTabs.length} tabs, filtered` : `${visibleTabs.length} tabs`}`}
          >
            {tabList.map(({ id, tab, group }) => {
              if (group) {
                return <TabGroupView key={id} group={group.tabGroup} tabs={group.tabs} />;
              }
              if (tab) {
                return <TabView key={id} tab={tab} />;
              }
              return null;
            })}
          </List>
        </Collapse>
      </CardContent>
    </Card>
  );
}
