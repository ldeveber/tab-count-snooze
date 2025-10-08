import { type BarTooltipProps, ResponsiveBar } from "@nivo/bar";
import { BasicTooltip } from "@nivo/tooltip";
import { useMemo } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useAllTabs } from "@/lib/dataStore";
import { ChartSlider } from "./ChartSlider";
import { getBarData, type ItemData } from "./data/getBarData";

const axisBottom = { legend: "Open Tabs", legendOffset: 32 };
const axisLeft = { legend: "Origin", legendOffset: -16 };
const margin = { top: 32, right: 32, bottom: 64, left: 32 };

const BarTooltip = ({
  color,
  indexValue,
  formattedValue,
}: BarTooltipProps<ItemData>) => {
  return (
    <BasicTooltip
      id={indexValue}
      value={formattedValue}
      enableChip
      color={color}
    />
  );
};

export function Loading() {
  return (
    <div className="flex items-center justify-center">
      <Spinner variant="bars" />
    </div>
  );
}

const DEFAULT_DEPTH = 1;
const DEFAULT_LIMIT = 10;

export function BarChart() {
  const [depth, setDepth] = useState<number>(DEFAULT_DEPTH);
  const [limit, setLimit] = useState<number>(DEFAULT_LIMIT);

  const tabs = useAllTabs();
  const data = useMemo(
    () => getBarData(tabs, depth, limit),
    [tabs, depth, limit],
  );

  const handleDepthCommit = (value: number) => {
    setDepth(value);
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
          tooltip="The number of bars to show in the graph."
          defaultValue={DEFAULT_LIMIT}
          min={2}
          max={100}
          step={1}
          onValueCommit={handleLimitCommit}
        />
        <ChartSlider
          id="depth"
          label="Match Depth"
          tooltip="The depth of the URL pathname to match in results."
          defaultValue={DEFAULT_DEPTH}
          max={10}
          step={1}
          onValueCommit={handleDepthCommit}
        />
      </div>
      <div className="flex flex-grow">
        <ResponsiveBar<ItemData>
          colors={{ scheme: "dark2" }}
          data={data}
          layout="horizontal"
          colorBy="indexValue"
          label={(d) => `${d.indexValue}`}
          labelPosition="start"
          labelOffset={8}
          labelTextColor={{ theme: "labels.text.fill" }}
          tooltip={BarTooltip}
          borderRadius={4}
          enableGridY={false}
          enableGridX
          axisBottom={axisBottom}
          axisLeft={axisLeft}
          margin={margin}
        />
      </div>
    </div>
  );
}
