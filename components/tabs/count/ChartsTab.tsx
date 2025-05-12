import { useState, MouseEvent } from "react";
import Charts, { ChartViewType } from "../../charts/Charts";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { AccountTree, BarChart, PieChart } from "@mui/icons-material";

export default function ChartsTab() {
  const [chartType, setChartType] = useState<ChartViewType>("bar");

  const handleToggleChartType = (_e: MouseEvent<HTMLElement>, newChartType: ChartViewType) => {
    setChartType(newChartType);
  };

  return (
    <div className="flex flex-col gap-1 px-4 py-2">
      <ToggleButtonGroup
        value={chartType}
        exclusive
        onChange={handleToggleChartType}
        aria-label="chart type"
      >
        <ToggleButton value="bar" aria-label="bar chart">
          <BarChart />
        </ToggleButton>
        <ToggleButton value="pie" aria-label="pie chart">
          <PieChart />
        </ToggleButton>
        <ToggleButton value="sankey" aria-label="sankey chart">
          <AccountTree />
        </ToggleButton>
      </ToggleButtonGroup>

      <Charts chartType={chartType} />
    </div>
  );
}
