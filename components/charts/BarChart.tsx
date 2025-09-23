import { ResponsiveBar, BarTooltipProps } from "@nivo/bar";
import useBarData, { ItemData } from "./hooks/useBarData";
import { BasicTooltip } from "@nivo/tooltip";

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
export default function BarChart() {
  const data = useBarData();

  return (
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
  );
}
