import {
  ResponsiveSankey,
  SankeyLinkDatum,
  SankeyNodeDatum,
} from "@nivo/sankey";
import useSankeyData, { ItemNode, ItemLink } from "./hooks/useSankeyData";
import { BasicTooltip } from "@nivo/tooltip";

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

export default function SankeyChart() {
  const data = useSankeyData();

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
