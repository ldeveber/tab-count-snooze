import {
  ResponsiveSankey,
  type SankeyLinkDatum,
  type SankeyNodeDatum,
} from "@nivo/sankey";
import { BasicTooltip } from "@nivo/tooltip";
import { Spinner } from "@/components/ui/spinner";
import { useAllTabs } from "@/utils/dataStore";
import {
  getSankeyData,
  type ItemLink,
  type ItemNode,
} from "./data/getSankeyData";

const SankeyLinkTooltip: React.FunctionComponent<{
  link: SankeyLinkDatum<ItemNode, ItemLink>;
}> = ({
  link: {
    color,
    target: { id: targetId },
    value,
  },
}) => {
  return <BasicTooltip id={targetId} value={value} enableChip color={color} />;
};

const SankeyNodeTooltip: React.FunctionComponent<{
  node: SankeyNodeDatum<ItemNode, ItemLink>;
}> = ({ node: { color, label, value } }) => {
  return <BasicTooltip id={label} value={value} enableChip color={color} />;
};

export function Loading() {
  return (
    <div className="flex items-center justify-center">
      <Spinner variant="ellipsis" />
    </div>
  );
}

export function SankeyChart() {
  const tabs = useAllTabs();
  const data = useMemo(() => getSankeyData(tabs), [tabs]);

  return (
    <ResponsiveSankey<ItemNode, ItemLink>
      data={data}
      margin={{ top: 24, right: 256, bottom: 24, left: 48 }}
      align="start"
      sort="descending"
      colors={{ scheme: "dark2" }}
      nodeOpacity={1}
      nodeHoverOthersOpacity={0.35}
      nodeThickness={18}
      nodeSpacing={24}
      nodeBorderWidth={0}
      nodeBorderColor={{ from: "color", modifiers: [["darker", 0.8]] }}
      nodeBorderRadius={3}
      nodeTooltip={SankeyNodeTooltip}
      linkOpacity={0.5}
      linkHoverOthersOpacity={0.1}
      linkContract={3}
      linkBlendMode="hard-light"
      linkTooltip={SankeyLinkTooltip}
      enableLinkGradient
      labelPosition="outside"
      labelPadding={8}
      labelTextColor={{ from: "color", modifiers: [["brighter", 0.8]] }}
    />
  );
}
