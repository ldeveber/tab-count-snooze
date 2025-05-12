import { SankeySeriesOption } from "echarts";
import useParsedTabData from "./hookDataParser";

type SankeyLink = Required<SankeySeriesOption>["links"][number] & {
  value: number;
};

type SankeyNode = Required<SankeySeriesOption>["nodes"][number] & {
  depth: number;
  value: number;
};

function _updateNode(nodes: Array<SankeyNode>, depth: number, source: string) {
  let sourceNode = nodes.find((n) => n.name === source);
  if (!sourceNode) {
    sourceNode = {
      name: source,
      depth,
      value: 0,
      label: {
        lineHeight: 64,
      },
    };
    nodes.push(sourceNode);
  }
  sourceNode.value++;
}

function _updateLink(links: Array<SankeyLink>, source: string, target: string) {
  let sourceLink = links.find((l) => l.source === source && l.target === target);
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
  links: Array<SankeyLink>,
  nodes: Array<SankeyNode>,
  depth: number,
  source: string,
  paths: Array<string>,
) {
  const target = source + "/" + paths[0];

  _updateNode(nodes, depth, source);
  _updateLink(links, source, target);

  if (paths.length > 0) {
    _addLinkData(links, nodes, ++depth, target, paths.slice(1));
  }
}

const ALL_TABS_LABEL = "All Tabs";

export default function useSanKeySeries(): SankeySeriesOption {
  const tabData = useParsedTabData();

  const nodes: Array<SankeyNode> = [];
  const links: Array<SankeyLink> = [];

  nodes.push({
    name: ALL_TABS_LABEL,
    depth: 0,
    value: tabData.length,
    label: { lineHeight: 64, position: "left" },
  });

  tabData.forEach((tab) => {
    const { origin, segments } = tab;
    _updateLink(links, ALL_TABS_LABEL, origin);
    _addLinkData(links, nodes, 1, origin, segments.slice(0, 2));
  });

  return { nodes: nodes.filter((n) => n.value > 1).sort((a, b) => b.value - a.value), links };
}
