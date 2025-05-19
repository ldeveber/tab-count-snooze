import {
  AutoAwesome as AutoAwesomeIcon,
  DeleteOutline as DeleteOutlineIcon,
  DriveFileRenameOutline as DriveFileRenameOutlineIcon,
  PushPin as PushPinIcon,
  // VolumeOff as VolumeOffIcon,
  VolumeUp as VolumeUpIcon,
} from "@mui/icons-material";
import { SvgIconOwnProps } from "@mui/material";
import { TAB_PROPERTIES } from "@/utils/chrome";

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

    // case TAB_PROPERTIES.Muted:
    //   return <VolumeOffIcon {...props} data-testid={`tab-${property}-icon`} />;

    case TAB_PROPERTIES.Audible:
      return <VolumeUpIcon {...props} data-testid={`tab-${property}-icon`} />;

    default:
      return null;
  }
}
