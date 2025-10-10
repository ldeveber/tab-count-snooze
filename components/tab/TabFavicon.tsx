import { FileQuestionMarkIcon, PuzzleIcon } from "lucide-react";
import { useMemo } from "react";
import { type Browser, useAppConfig } from "#imports";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function Loading() {
  return <Skeleton className="size-6 rounded-sm" />;
}

function FallbackIcon({ url }: { url?: Browser.tabs.Tab["url"] }) {
  if (url) {
    if (
      url.startsWith("chrome-extension://") ||
      url.startsWith("chrome://extensions")
    ) {
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
  const { isChrome } = useAppConfig();
  const faded = tab.discarded || tab.status === "unloaded";

  const favicon = useMemo(() => {
    if (isChrome && (tab.url || tab.pendingUrl)) {
      // "/_favicon/" only available in chrome
      // @ts-expect-error https://github.com/wxt-dev/wxt/issues/1559
      const favicon = new URL(browser.runtime.getURL("/_favicon/"));
      favicon.searchParams.set("pageUrl", tab.url ?? tab.pendingUrl ?? "");
      favicon.searchParams.set("size", "32");
      return favicon.toString();
    } else if (tab.favIconUrl && tab.favIconUrl.length > 0) {
      return tab.favIconUrl;
    }
  }, [isChrome, tab.url, tab.favIconUrl, tab.pendingUrl]);

  return (
    <span
      role="none"
      className={cn(
        "flex size-6 items-center justify-center overflow-hidden",
        faded && "opacity-30",
      )}
    >
      {favicon ? (
        <img
          src={favicon}
          alt="Favicon for tab"
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
