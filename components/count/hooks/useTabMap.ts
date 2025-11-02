import { useMemo } from "react";
import type { SankeyData } from "recharts/types/chart/Sankey";
import { useAllTabs, useTabOrigins } from "@/lib/dataStore";

interface NodeDataItem {
  index: number;
  name: string;
  depth?: number;
  count: number;
  fill: string;
}
type LinkDataItem = SankeyData["links"][number];

function _updateNode(nodes: Array<NodeDataItem>, name: string, depth: number) {
  let sourceNode: NodeDataItem | undefined = nodes.find((n) => n.name === name);
  if (!sourceNode) {
    sourceNode = {
      index: nodes.length,
      name,
      depth,
      count: 0,
      fill: `var(--chart-${depth + 1})`,
    };
    nodes.push(sourceNode);
  }
  sourceNode.count++;
}

function _updateLink(
  links: Array<LinkDataItem>,
  nodes: Array<NodeDataItem>,
  sourceName: string,
  targetName: string,
) {
  const source = nodes.findIndex((n) => n.name === sourceName);
  const target = nodes.findIndex((n) => n.name === targetName);
  let link: LinkDataItem | undefined = links.find(
    (l) => l.source === source && l.target === target,
  );
  if (!link) {
    link = {
      source,
      target,
      value: 0,
    };
    links.push(link);
  }
  link.value++;
}

function _addLinkData(
  links: Array<LinkDataItem>,
  nodes: Array<NodeDataItem>,
  sourceName: string,
  targetName: string,
  depth: number,
  maxDepth: number,
  segments: Array<string>,
) {
  if (depth > maxDepth) {
    return;
  }
  _updateNode(nodes, targetName, depth);
  _updateLink(links, nodes, sourceName, targetName);

  if (segments.length > 0) {
    const segment = segments.shift();
    const newName = `${targetName}/${segment}`;
    _addLinkData(
      links,
      nodes,
      targetName,
      newName,
      ++depth,
      maxDepth,
      segments,
    );
  }
}

const ALL_TABS_LABEL = "All Tabs";

export function useTabMap(
  maxDepth: number,
  numOrigins: number,
): {
  nodes: NodeDataItem[];
  links: LinkDataItem[];
} {
  performance.mark("ext:tab-count-snooze:useTabMap_start");
  const allTabs = useAllTabs();
  const topOrigins = useTabOrigins(numOrigins);
  const allTabsCount = allTabs.length;

  const topTabs = useMemo(
    () =>
      allTabs.filter((t) =>
        topOrigins.some((to) => t.url?.startsWith(to.origin) ?? false),
      ),
    [allTabs, topOrigins],
  );

  const data = useMemo(() => {
    const nodes: Array<NodeDataItem> = [];
    const links: Array<LinkDataItem> = [];

    nodes.push({
      index: 0,
      name: ALL_TABS_LABEL,
      depth: 0,
      count: allTabsCount,
      fill: "var(--chart-1)",
    });

    topTabs.forEach((tab) => {
      const { url } = tab;
      if (!url) {
        return;
      }
      const urlObj = new URL(url);
      const { origin, pathname } = urlObj;
      const segments = pathname.split("/").filter((item) => item !== "");

      _addLinkData(
        links,
        nodes,
        ALL_TABS_LABEL,
        origin,
        1,
        maxDepth,
        segments.slice(0, maxDepth),
      );
    });
    return { nodes, links };
  }, [allTabsCount, topTabs, maxDepth]);

  performance.mark("ext:tab-count-snooze:useTabMap_end");
  return data;
}
