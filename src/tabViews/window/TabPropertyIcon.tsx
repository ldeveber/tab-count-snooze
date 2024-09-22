import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import PushPinIcon from "@mui/icons-material/PushPin";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { SvgIconOwnProps } from "@mui/material/SvgIcon";
import { TAB_PROPERTIES } from "src/utils/chrome";

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
