import {
  type ComputedDatum,
  type MouseHandler,
  ResponsiveSunburst,
} from "@nivo/sunburst";
import { BasicTooltip } from "@nivo/tooltip";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useAllTabs } from "@/lib/dataStore";
import { ChartSlider } from "./ChartSlider";
import { getSunburstData, type ItemData } from "./data/getSunburstData";

function findNode(
  children: ItemData[],
  clickedData: ComputedDatum<ItemData>,
): ItemData | undefined {
  for (const c of children) {
    if (c.id === clickedData.id) {
      return c;
    } else if (
      typeof clickedData.id === "string" &&
      clickedData.id.startsWith(c.id)
    ) {
      return findNode(c.children, clickedData);
    } else if (c.children) {
      const found = findNode(c.children, clickedData);
      if (found) {
        return found;
      }
    }
  }
  return undefined;
}

const SunburstTooltip = ({
  id,
  color,
  data,
  formattedValue,
  ...props
}: ComputedDatum<ItemData>) => {
  return (
    <BasicTooltip
      {...props}
      id={`${id} (${data.value})`}
      value={formattedValue}
      enableChip
      color={color}
    />
  );
};

const margin = { top: 12, right: 2, bottom: 2, left: 2 };

export function Loading() {
  return (
    <div className="flex items-center justify-center">
      <Spinner variant="circle-loader" />
    </div>
  );
}

const DEFAULT_DEPTH = 3;
const DEFAULT_MIN_VALUE = 2;
export const DEFAULT_LIMIT = 10;

export function SunburstChart() {
  const [depth, setDepth] = useState<number>(DEFAULT_DEPTH);
  const [minValue, setMinValue] = useState<number>(DEFAULT_MIN_VALUE);
  const [limit, setLimit] = useState<number>(DEFAULT_LIMIT);

  const tabs = useAllTabs();
  const initialData = useMemo(
    () => getSunburstData(tabs, depth, minValue, limit),
    [tabs, depth, minValue, limit],
  );
  const [data, setData] = useState<ItemData>(initialData);
  const [isAtRoot, setIsAtRoot] = useState(true);

  useEffect(() => {
    if (isAtRoot) {
      const newData = getSunburstData(tabs, depth, minValue, limit);
      setData(newData);
    }
  }, [tabs, depth, minValue, limit, isAtRoot]);

  const resetChart = () => {
    setIsAtRoot(true);
    setData(initialData);
  };
  const onClick: MouseHandler<ItemData> = (clickedData) => {
    const foundObject = findNode(initialData.children, clickedData);
    if (foundObject?.children) {
      setIsAtRoot(false);
      setData(foundObject);
    }
  };

  const handleMaxDepthCommit = (value: number) => {
    setDepth(value);
  };
  const handleMinValueCommit = (value: number) => {
    setMinValue(value);
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
          tooltip="The number of arcs to show in the initial data of the graph."
          defaultValue={DEFAULT_LIMIT}
          disabled={!isAtRoot}
          min={2}
          max={20}
          step={1}
          onValueCommit={handleLimitCommit}
        />
        <ChartSlider
          id="minValue"
          label="Min Value"
          tooltip="The minimum number of matches to show in the graph."
          defaultValue={DEFAULT_MIN_VALUE}
          disabled={!isAtRoot}
          min={2}
          max={10}
          step={1}
          onValueCommit={handleMinValueCommit}
        />
        <ChartSlider
          id="depth"
          label="Visible Layers"
          tooltip="The maximum number of layers to show."
          defaultValue={DEFAULT_DEPTH}
          disabled={!isAtRoot}
          min={2}
          max={10}
          step={1}
          onValueCommit={handleMaxDepthCommit}
        />
        <div>
          <Button
            size="sm"
            className="px-4"
            onClick={resetChart}
            disabled={isAtRoot}
          >
            Reset Chart Root
          </Button>
        </div>
      </div>
      <div className="flex flex-grow">
        <ResponsiveSunburst<ItemData>
          margin={margin}
          data={data}
          cornerRadius={6}
          borderWidth={2}
          borderColor={{ theme: "background" }}
          colors={{ scheme: "dark2" }}
          tooltip={SunburstTooltip}
          onClick={onClick}
        />
      </div>
    </div>
  );
}
