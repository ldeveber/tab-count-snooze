import Charts from "@/components/tabs/tab/charts/Charts";
import { useState, Suspense } from "react";
import { CircularProgress, Skeleton } from "@mui/material";
import { BarChart as BarChartIcon, PieChart as PieChartIcon } from "@mui/icons-material";
import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { type ChartViewType } from "@/components/tabs/tab/charts/ChartPane";
import StickyTabSubMenuBar, { Loading as StickyTabSubMenuBarLoading } from "./StickyTabSubMenuBar";
import TabCountTagline from "./TabCountTagline";

export function Loading() {
  return (
    <div className="flex flex-col">
      <StickyTabSubMenuBarLoading>
        <div className="flex grow items-center gap-4"></div>
        <div className="flex shrink items-center gap-4">
          <Skeleton sx={{ height: 32, width: { xs: 50, sm: 210 } }} />
        </div>
      </StickyTabSubMenuBarLoading>
      <div className="flex grow items-center justify-center">
        <CircularProgress />
      </div>
    </div>
  );
}

export default function ChartsTab() {
  const [chartType, setChartType] = useState<ChartViewType>("bar");

  const handleChange = (_e: unknown, newChartType: ChartViewType) => {
    setChartType(newChartType);
  };

  return (
    <div className="flex flex-col">
      <StickyTabSubMenuBar>
        <div className="flex grow items-center gap-4">
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
            <Stack direction="row" spacing={2} alignItems="center">
              <ToggleButtonGroup
                value={chartType}
                exclusive
                onChange={handleChange}
                aria-label="chart type"
              >
                <ToggleButton value="bar" aria-label="bar chart">
                  <BarChartIcon />
                </ToggleButton>
                <ToggleButton value="doughnut" aria-label="pie chart">
                  <PieChartIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          </Stack>
        </div>
        <div className="flex shrink items-center gap-4">
          <TabCountTagline />
        </div>
      </StickyTabSubMenuBar>

      <div className="flex grow flex-col gap-4 px-4 py-2">
        <Suspense fallback={<div>Loading chart...</div>}>
          <Charts chartType={chartType} />
        </Suspense>
      </div>
    </div>
  );
}
