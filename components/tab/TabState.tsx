import {
  HighlighterIcon,
  PinIcon,
  SnowflakeIcon,
  TrashIcon,
  Volume2Icon,
  VolumeOffIcon,
} from "lucide-react";
import type { Browser } from "#imports";

export default function TabState({ tab }: { readonly tab: Browser.tabs.Tab }) {
  const arr = [];
  if (tab.pinned) {
    arr.push(<PinIcon key="pinned" className="size-3" />);
  }

  if (tab.mutedInfo?.muted) {
    arr.push(<VolumeOffIcon key="muted" className="size-3" />);
  } else if (tab.audible) {
    arr.push(<Volume2Icon key="audible" className="size-3" />);
  }

  if (tab.discarded || tab.status === "unloaded") {
    arr.push(<TrashIcon key="discarded" className="size-3" />);
  }

  if (tab.frozen) {
    arr.push(<SnowflakeIcon key="frozen" className="size-3" />);
  }

  if (!tab.active && tab.highlighted) {
    arr.push(<HighlighterIcon key="hightlighted" className="size-3" />);
  }

  return <span className="flex flex-row gap-1">{arr.map((icon) => icon)}</span>;
}
