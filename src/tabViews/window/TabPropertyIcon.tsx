import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import PushPinIcon from "@mui/icons-material/PushPin";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { SvgIconOwnProps } from "@mui/material/SvgIcon";
import { TAB_PROPERTIES } from "src/utils/chrome";
import { filterTabs } from "src/utils/filterTabs";

function getCount(property: TAB_PROPERTIES, tabs?: chrome.tabs.Tab[]) {
  if (!tabs) {
    return "";
  }
  switch (property) {
    case TAB_PROPERTIES.Active:
      return `(${filterTabs(tabs, "", [TAB_PROPERTIES.Active]).length})`;
    case TAB_PROPERTIES.Pinned:
      return `(${filterTabs(tabs, "", [TAB_PROPERTIES.Pinned]).length})`;
    case TAB_PROPERTIES.Highlighted:
      return `(${filterTabs(tabs, "", [TAB_PROPERTIES.Highlighted]).length})`;
    case TAB_PROPERTIES.Discarded:
      return `(${filterTabs(tabs, "", [TAB_PROPERTIES.Discarded]).length})`;
    case TAB_PROPERTIES.Muted:
      return `(${filterTabs(tabs, "", [TAB_PROPERTIES.Muted]).length})`;
    case TAB_PROPERTIES.Audible:
      return `(${filterTabs(tabs, "", [TAB_PROPERTIES.Audible]).length})`;
    default:
      return "";
  }
}

export function getTabPropertyLabel(property: TAB_PROPERTIES, tabs?: chrome.tabs.Tab[]) {
  let label = "";
  switch (property) {
    case TAB_PROPERTIES.Active:
      label = `Active Tabs ${getCount(TAB_PROPERTIES.Active, tabs)}`;
      break;
    case TAB_PROPERTIES.Pinned:
      label = `Pinned Tabs ${getCount(TAB_PROPERTIES.Pinned, tabs)}`;
      break;
    case TAB_PROPERTIES.Highlighted:
      label = `Highlighted Tabs ${getCount(TAB_PROPERTIES.Highlighted, tabs)}`;
      break;
    case TAB_PROPERTIES.Discarded:
      label = `Discarded Tabs ${getCount(TAB_PROPERTIES.Discarded, tabs)}`;
      break;
    case TAB_PROPERTIES.Muted:
      label = `Muted Tabs ${getCount(TAB_PROPERTIES.Muted, tabs)}`;
      break;
    case TAB_PROPERTIES.Audible:
      label = `Audible Tabs ${getCount(TAB_PROPERTIES.Audible, tabs)}`;
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
      return <AutoAwesomeIcon {...props} />;
    case TAB_PROPERTIES.Pinned:
      return <PushPinIcon {...props} />;
    case TAB_PROPERTIES.Highlighted:
      return <DriveFileRenameOutlineIcon {...props} />;
    case TAB_PROPERTIES.Discarded:
      return <DeleteOutlineIcon {...props} />;
    case TAB_PROPERTIES.Muted:
      return <VolumeOffIcon {...props} />;
    case TAB_PROPERTIES.Audible:
      return <VolumeUpIcon {...props} />;

    default:
      return null;
  }
}
