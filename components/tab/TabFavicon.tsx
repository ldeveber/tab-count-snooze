import { FileQuestionMarkIcon, PuzzleIcon } from "lucide-react";
import { Suspense, useEffect, useMemo, useState } from "react";
import { type Browser, useAppConfig } from "#imports";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

function Loading() {
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

function Favicon({ tab }: { readonly tab: Browser.tabs.Tab }) {
  const { isChrome } = useAppConfig();
  const [status, setStatus] = useState<"idle" | "loading" | "loaded" | "error">(
    "idle",
  );
  const [imageSrc, setImageSrc] = useState<string>();

  const faviconUrl = useMemo(() => {
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

  useEffect(() => {
    let cancelled = false;

    if (!faviconUrl) {
      setStatus("idle");
      setImageSrc(undefined);
      return;
    }

    setStatus("loading");
    setImageSrc(undefined);

    const image = new Image();
    image.referrerPolicy = "no-referrer";

    image.onload = () => {
      if (cancelled) {
        return;
      }
      setImageSrc(faviconUrl);
      setStatus("loaded");
    };

    image.onerror = () => {
      if (cancelled) {
        return;
      }
      setStatus("error");
    };

    image.src = faviconUrl;

    return () => {
      cancelled = true;
    };
  }, [faviconUrl]);

  if (status === "loading") {
    return <Loading />;
  }

  if (imageSrc) {
    return (
      <img
        src={imageSrc}
        alt="Favicon for tab"
        className="size-full object-cover"
        referrerPolicy="no-referrer"
        loading="lazy"
      />
    );
  }

  return <FallbackIcon url={tab.url ?? tab.pendingUrl} />;
}

export default function TabFavicon({
  tab,
}: {
  readonly tab: Browser.tabs.Tab;
}) {
  const faded = tab.discarded || tab.status === "unloaded";

  return (
    <span
      role="none"
      className={cn(
        "flex size-6 items-center justify-center overflow-hidden",
        faded && "opacity-30",
      )}
    >
      <Suspense fallback={<Loading />}>
        <Favicon tab={tab} />
      </Suspense>
    </span>
  );
}
