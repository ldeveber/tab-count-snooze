import useParsedTabData, { ITabData } from "./hookDataParser";
import { DefaultLink, DefaultNode, SankeyDataProps } from "@nivo/sankey";

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
  source: string,
  target: string,
  segments: Array<string>,
) {
  _updateNode(nodes, depth, target);
  _updateLink(links, source, target);

  if (segments.length > 0) {
    const segment = segments.shift();
    const newTarget = target + "/" + segment;
    _addLinkData(links, nodes, ++depth, target, newTarget, segments);
  }
}

const ALL_TABS_LABEL = "All Tabs";

export function _getSankeyData(
  tabData: ReadonlyArray<ITabData>,
  minValue: number = 2,
): SankeyDataProps<ItemNode, ItemLink>["data"] {
  const allNodes: Array<ItemNode> = [];
  const allLinks: Array<ItemLink> = [];

  allNodes.push({
    id: ALL_TABS_LABEL,
    depth: 0,
    value: tabData.length,
  });

  tabData.forEach((tab) => {
    const { origin, segments } = tab;
    _addLinkData(
      allLinks,
      allNodes,
      1,
      ALL_TABS_LABEL,
      origin,
      segments.slice(0, 2),
    );
  });
  const nodes = allNodes
    .filter((n) => n.value > minValue)
    .sort((a, b) => b.value - a.value);
  const links = allLinks.filter(
    (l) =>
      nodes.some((n) => n.id === l.source) &&
      nodes.some((n) => n.id === l.target),
  );

  return { nodes, links };
}

export default function useSankeyData(): SankeyDataProps<
  ItemNode,
  ItemLink
>["data"] {
  const tabData = useParsedTabData();
  return _getSankeyData(tabData);
}
