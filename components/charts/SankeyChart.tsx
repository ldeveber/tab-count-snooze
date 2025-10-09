import {
  ResponsiveSankey,
  type SankeyLinkDatum,
  type SankeyNodeDatum,
} from "@nivo/sankey";
import { BasicTooltip } from "@nivo/tooltip";
import { useMemo, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useAllTabs } from "@/lib/dataStore";
import { ChartSlider } from "./ChartSlider";
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

export const DEFAULT_DEPTH = 2;
export const DEFAULT_MIN_VALUE = 2;
export const DEFAULT_LIMIT = 10;

export function SankeyChart() {
  const [maxDepth, setMaxDepth] = useState<number>(DEFAULT_DEPTH);
  const [minVal, setMinVal] = useState<number>(DEFAULT_MIN_VALUE);
  const [limit, setLimit] = useState<number>(DEFAULT_LIMIT);

  const tabs = useAllTabs();
  const data = useMemo(
    () => getSankeyData(tabs, maxDepth, minVal, limit),
    [tabs, maxDepth, minVal, limit],
  );

  const handleMaxDepthCommit = (value: number) => {
    setMaxDepth(value);
  };
  const handleMinValCommit = (value: number) => {
    setMinVal(value);
  };
  const handleLimitCommit = (value: number) => {
    setLimit(value);
  };

  return (
    <div className="flex flex-grow flex-col gap-2">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
        <ChartSlider
          id="limit"
          label="Limit"
          tooltip="The number of entries to show in the first column of the graph (after All Tabs)."
          defaultValue={DEFAULT_LIMIT}
          min={1}
          max={20}
          step={1}
          onValueCommit={handleLimitCommit}
        />
        <ChartSlider
          id="minVal"
          label="Min Matches"
          tooltip="The minimum value for results to match."
          defaultValue={DEFAULT_MIN_VALUE}
          min={2}
          max={10}
          step={1}
          onValueCommit={handleMinValCommit}
        />
        <ChartSlider
          id="depth"
          label="Max Depth"
          tooltip="The maximum depth of the URL pathname to show in results."
          defaultValue={DEFAULT_DEPTH}
          min={1}
          max={3}
          step={1}
          onValueCommit={handleMaxDepthCommit}
        />
      </div>
      <div className="flex flex-grow">
        <ResponsiveSankey<ItemNode, ItemLink>
          data={data}
          margin={{ top: 24, right: 256, bottom: 24, left: 48 }}
          align="start"
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
      </div>
    </div>
  );
}
