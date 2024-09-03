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

  const title = group.title ?? "Tab Group";
  const groupColor = colors[group.color][500];

  return (
    <ListItemGroup title={title} groupColor={groupColor} indented initOpen>
      {tabs.map((tab) => (
        <TabView key={tab.id} tab={tab} />
      ))}
    </ListItemGroup>
  );
}
