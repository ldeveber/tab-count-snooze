import * as colors from "@mui/material/colors";
import ListItemGroup from "src/components/list/ListItemGroup";
import TabView from "./TabView";

export default function TabGroupView({
  group,
  tabs,
  windowFocused = false,
}: {
  readonly group: chrome.tabGroups.TabGroup;
  readonly tabs: chrome.tabs.Tab[];
  readonly windowFocused?: boolean;
}) {
  if (tabs.length === 0) {
    return null;
  }

  const title = group.title ?? "Tab Group";
  const backgroundColor = colors[group.color][500];

  return (
    <ListItemGroup title={title} backgroundColor={backgroundColor} indented initOpen>
      {tabs.map((tab) => (
        <TabView key={tab.id} tab={tab} windowFocused={windowFocused} />
      ))}
    </ListItemGroup>
  );
}
