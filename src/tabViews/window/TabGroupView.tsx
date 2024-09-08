import * as colors from "@mui/material/colors";
import ListItemGroup from "src/components/list/ListItemGroup";
import TabView from "./TabView";

export default function TabGroupView({
  group,
  tabs,
}: {
  readonly group: chrome.tabGroups.TabGroup;
  readonly tabs: chrome.tabs.Tab[];
}) {
  if (tabs.length === 0) {
    return null;
  }

  const title = group.title ?? `Tab Group (${tabs.length})`;
  const groupColor = colors[group.color][500];

  return (
    <ListItemGroup
      title={title}
      groupColor={groupColor}
      indented
      initOpen
      aria-label={`Tab group: ${title}`}
      button-aria-label={`Show/hide tabs in group: ${title}`}
    >
      {tabs.map((tab) => (
        <TabView key={tab.id} tab={tab} />
      ))}
    </ListItemGroup>
  );
}
