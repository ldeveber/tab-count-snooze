import { FileQuestionMarkIcon, PuzzleIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const FAVICON_SIZE = 24;

export function Loading() {
  return <Skeleton className="size-6 rounded-sm" />;
}

function FallbackIcon({ url }: { url: Browser.tabs.Tab["url"] }) {
  if (url) {
    if (url.startsWith("chrome-extension://")) {
      return <PuzzleIcon className="size-6" />;
    }
    if (url.startsWith("chrome://extensions")) {
      return <PuzzleIcon className="size-6" />;
    }
  }
  return <FileQuestionMarkIcon className="size-6" />;
}

export default function TabFavicon({
  tab,
}: {
  readonly tab: Browser.tabs.Tab;
}) {
  const faded = tab.discarded || tab.status === "unloaded";
  const favIconUrl =
    tab.favIconUrl && tab.favIconUrl.length > 0 ? tab.favIconUrl : undefined;
  return (
    <span
      role="none"
      className={cn(
        "flex size-6 items-center justify-center overflow-hidden bg-muted/60",
        faded && "opacity-30",
      )}
    >
      {favIconUrl ? (
        <img
          src={favIconUrl}
          alt=""
          className="size-full object-cover"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      ) : (
        <FallbackIcon url={tab.url ?? tab.pendingUrl} />
      )}
    </span>
  );
}
