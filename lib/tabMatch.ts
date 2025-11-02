import type { Browser } from "#imports";

function getMatchUrl(
  tabUrl: Browser.tabs.Tab["url"],
  matchDepth: number,
): string | undefined {
  if (!tabUrl) {
    return;
  }
  const url = new URL(tabUrl);
  if (matchDepth === 0) {
    return url.origin;
  }
  const paths = url.pathname.split("/");
  // depth + 1 because the first entry is ''
  return `${url.origin}${paths.slice(0, Math.min(paths.length, matchDepth + 1)).join("/")}`;
}

export function getTabMatchUrl(
  tab: Browser.tabs.Tab,
  matchDepth: number,
): string | undefined {
  return getMatchUrl(tab.url, matchDepth);
}

export function matchUrl(
  urlA: Browser.tabs.Tab["url"],
  urlB: Browser.tabs.Tab["url"],
  matchDepth: number,
): boolean {
  return getMatchUrl(urlA, matchDepth) === getMatchUrl(urlB, matchDepth);
}
