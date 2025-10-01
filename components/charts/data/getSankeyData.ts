import type { DefaultLink, DefaultNode, SankeyDataProps } from "@nivo/sankey";

export interface ItemLink extends DefaultLink {
  source: string;
  target: string;
  value: number;
  startColor?: string;
  endColor?: string;
}

export interface ItemNode extends DefaultNode {
  id: string;
  value: number;
  depth: number;
}

function _updateNode(nodes: Array<ItemNode>, depth: number, source: string) {
  let sourceNode = nodes.find((n) => n.id === source);
  if (!sourceNode) {
    sourceNode = {
      id: source,
      depth,
      value: 0,
    };
    nodes.push(sourceNode);
  }
  sourceNode.value++;
}

function _updateLink(links: Array<ItemLink>, source: string, target: string) {
  let sourceLink = links.find(
    (l) => l.source === source && l.target === target,
  );
  if (!sourceLink) {
    sourceLink = {
      source,
      target,
      value: 0,
    };
    links.push(sourceLink);
  }
  sourceLink.value++;
}

function _addLinkData(
  links: Array<ItemLink>,
  nodes: Array<ItemNode>,
  depth: number,
  maxDepth: number,
  source: string,
  target: string,
  segments: Array<string>,
) {
  if (depth > maxDepth) {
    return;
  }
  _updateNode(nodes, depth, target);
  _updateLink(links, source, target);

  if (segments.length > 0) {
    const segment = segments.shift();
    const newTarget = `${target}/${segment}`;
    _addLinkData(links, nodes, ++depth, maxDepth, target, newTarget, segments);
  }
}

const ALL_TABS_LABEL = "All Tabs";

export function _getSankeyData(
  tabs: globalThis.Browser.tabs.Tab[],
  topOrigins: ReadonlyArray<string>,
  maxDepth: number = 3,
  minValue: number = 2,
): SankeyDataProps<ItemNode, ItemLink>["data"] {
  const allNodes: Array<ItemNode> = [];
  const allLinks: Array<ItemLink> = [];

  allNodes.push({
    id: ALL_TABS_LABEL,
    depth: 0,
    value: tabs.length,
  });

  tabs.forEach((tab) => {
    const { url } = tab;
    if (!url) {
      return;
    }
    const urlObj = new URL(url);
    const { origin, pathname } = urlObj;
    const segments = pathname.split("/").filter((item) => item !== "");
    if (topOrigins.includes(origin)) {
      _addLinkData(
        allLinks,
        allNodes,
        1,
        maxDepth,
        ALL_TABS_LABEL,
        origin,
        segments.slice(0, maxDepth),
      );
    }
  });
  const nodes = allNodes
    .filter((n) => n.value >= minValue)
    .sort((a, b) => b.value - a.value);
  const links = allLinks.filter(
    (l) =>
      nodes.some((n) => n.id === l.source) &&
      nodes.some((n) => n.id === l.target),
  );

  return { nodes, links };
}

function getTopOrigins(
  tabs: globalThis.Browser.tabs.Tab[],
  minValue: number,
  limit: number,
) {
  const counts: Array<{ origin: string; count: number }> = [];
  tabs.forEach((tab) => {
    if (!tab.url) {
      return;
    }
    const url = new URL(tab.url);
    let c = counts.find((d) => d.origin === url.origin);
    if (!c) {
      c = { origin: url.origin, count: 0 };
      counts.push(c);
    }
    c.count++;
  });

  return counts
    .filter((c) => c.count >= minValue)
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
    .map((c) => c.origin);
}

export function getSankeyData(
  tabs: globalThis.Browser.tabs.Tab[],
  maxDepth: number,
  minValue: number,
  limit: number,
): {
  nodes: readonly ItemNode[];
  links: readonly ItemLink[];
} {
  performance.mark("ext:tab-count-snooze:getSankeyData_start");
  const topOrigins = getTopOrigins(tabs, minValue, limit);
  const data = _getSankeyData(tabs, topOrigins, maxDepth, minValue);
  performance.mark("ext:tab-count-snooze:getSankeyData_end");
  return data;
}
