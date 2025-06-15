import {
  AcUnit,
  DeleteOutline,
  DriveFileRenameOutline,
  PushPin,
  VolumeOff,
  VolumeUp,
} from "@mui/icons-material";

export default function TabState({ tab }: { readonly tab: Browser.tabs.Tab }) {
  const arr = [];
  if (tab.pinned) {
    arr.push(<PushPin key="pinned" fontSize="inherit" />);
  }

  if (tab.mutedInfo?.muted) {
    arr.push(<VolumeOff key="muted" fontSize="inherit" />);
  } else if (tab.audible) {
    arr.push(<VolumeUp key="audible" fontSize="inherit" />);
  }

  if (tab.discarded || tab.status === "unloaded") {
    arr.push(<DeleteOutline key="discarded" fontSize="inherit" />);
  }

  if (tab.frozen) {
    arr.push(<AcUnit key="frozen" fontSize="inherit" />);
  }

  if (!tab.active && tab.highlighted) {
    arr.push(<DriveFileRenameOutline key="hightlighted" fontSize="inherit" />);
  }

  return (
    <div className="flex w-4 flex-col items-end gap-1 self-stretch">{arr.map((icon) => icon)}</div>
  );
}
