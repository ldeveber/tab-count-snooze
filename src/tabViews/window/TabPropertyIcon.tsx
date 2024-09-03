import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import PushPinIcon from "@mui/icons-material/PushPin";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { SvgIconOwnProps } from "@mui/material/SvgIcon";
import { TAB_PROPERTIES } from "src/utils/chrome";
import { FILTER_TAB_PROPERTIES, filterTabs } from "src/utils/filterTabs";

function getCount(property: TAB_PROPERTIES, tabs: chrome.tabs.Tab[] = []) {
  switch (property) {
    case TAB_PROPERTIES.Active:
      return filterTabs(tabs, "", [FILTER_TAB_PROPERTIES.Active]).length;
    case TAB_PROPERTIES.Pinned:
      return filterTabs(tabs, "", [FILTER_TAB_PROPERTIES.Pinned]).length;
    case TAB_PROPERTIES.Highlighted:
      return filterTabs(tabs, "", [FILTER_TAB_PROPERTIES.Highlighted]).length;
    case TAB_PROPERTIES.Discarded:
      return filterTabs(tabs, "", [FILTER_TAB_PROPERTIES.Discarded]).length;
    case TAB_PROPERTIES.Muted:
      return filterTabs(tabs, "", [FILTER_TAB_PROPERTIES.Muted]).length;
    case TAB_PROPERTIES.Audible:
      return filterTabs(tabs, "", [FILTER_TAB_PROPERTIES.Audible]).length;
    default:
      return 0;
  }
}

export function getTabPropertyLabel(property: TAB_PROPERTIES, tabs?: chrome.tabs.Tab[]) {
  let label = "";
  switch (property) {
    case TAB_PROPERTIES.Active:
      label = `Active Tabs (${getCount(TAB_PROPERTIES.Active, tabs)})`;
      break;
    case TAB_PROPERTIES.Pinned:
      label = `Pinned Tabs (${getCount(TAB_PROPERTIES.Pinned, tabs)})`;
      break;
    case TAB_PROPERTIES.Highlighted:
      label = `Highlighted Tabs (${getCount(TAB_PROPERTIES.Highlighted, tabs)})`;
      break;
    case TAB_PROPERTIES.Discarded:
      label = `Discarded Tabs (${getCount(TAB_PROPERTIES.Discarded, tabs)})`;
      break;
    case TAB_PROPERTIES.Muted:
      label = `Muted Tabs (${getCount(TAB_PROPERTIES.Muted, tabs)})`;
      break;
    case TAB_PROPERTIES.Audible:
      label = `Audible Tabs (${getCount(TAB_PROPERTIES.Audible, tabs)})`;
      break;
    default:
      label = "";
  }
  return label.trim();
}

export default function TabPropertyIcon({
  property,
  ...props
}: SvgIconOwnProps & {
  readonly property: TAB_PROPERTIES;
}) {
  switch (property) {
    case TAB_PROPERTIES.Active:
      return <AutoAwesomeIcon {...props} data-testid={`tab-${property}-icon`} />;

    case TAB_PROPERTIES.Pinned:
      return <PushPinIcon {...props} data-testid={`tab-${property}-icon`} />;

    case TAB_PROPERTIES.Highlighted:
      return <DriveFileRenameOutlineIcon {...props} data-testid={`tab-${property}-icon`} />;

    case TAB_PROPERTIES.Discarded:
      return <DeleteOutlineIcon {...props} data-testid={`tab-${property}-icon`} />;

    case TAB_PROPERTIES.Muted:
      return <VolumeOffIcon {...props} data-testid={`tab-${property}-icon`} />;

    case TAB_PROPERTIES.Audible:
      return <VolumeUpIcon {...props} data-testid={`tab-${property}-icon`} />;

    default:
      return null;
  }
}
