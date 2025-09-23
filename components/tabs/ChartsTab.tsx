import { useState, Suspense } from "react";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
} from "@mui/material";
import {
  AccountTree,
  BarChart as BarChartIcon,
  Flare,
} from "@mui/icons-material";
import BarChart from "@/components/charts/BarChart";
import SankeyChart from "@/components/charts/SankeyChart";
import SunburstChart from "@/components/charts/SunburstChart";
import ErrorDisplay from "@/components/ErrorDisplay";
import { ErrorBoundary } from "react-error-boundary";
import StickyTabSubMenuBar, {
  Loading as StickyTabSubMenuBarLoading,
} from "./StickyTabSubMenuBar";
import TabCountTagline from "./TabCountTagline";

type ChartViewType = "sunburst" | "bar" | "sankey";

function Chart({ chartType }: { chartType: ChartViewType }) {
  switch (chartType) {
    case "bar":
      return (
        <ErrorBoundary FallbackComponent={ErrorDisplay}>
          <BarChart />
        </ErrorBoundary>
      );
    case "sankey":
      return (
        <ErrorBoundary FallbackComponent={ErrorDisplay}>
          <SankeyChart />
        </ErrorBoundary>
      );
    case "sunburst":
      return (
        <ErrorBoundary FallbackComponent={ErrorDisplay}>
          <SunburstChart />
        </ErrorBoundary>
      );
    default:
      return <div>Unknown Chart Type</div>;
  }
}

export function Loading() {
  return (
    <div className="flex flex-col">
      <StickyTabSubMenuBarLoading>
        <div className="flex grow items-center gap-4">
          <Skeleton sx={{ height: 32, width: { xs: 50, sm: 210 } }} />
        </div>
        <div className="flex shrink items-center gap-4 @4xl/main:px-8">
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

  const onChange = (e: SelectChangeEvent<ChartViewType>) => {
    setChartType(e.target.value as ChartViewType);
  };

  return (
    <div className="flex size-full grow flex-col">
      <StickyTabSubMenuBar>
        <div className="flex grow items-center gap-4">
          <FormControl size="small">
            <InputLabel id="chart-type-label">Chart Data & Display</InputLabel>
            <Select
              labelId="chart-type-label"
              id="chart-type"
              label="Chart Data & Display"
              value={chartType}
              onChange={onChange}
            >
              <MenuItem value="sunburst">
                <div className="flex items-center gap-3">
                  <Flare fontSize="small" /> Sunburst - Top Open Tabs
                </div>
              </MenuItem>
              <MenuItem value="bar">
                <div className="flex items-center gap-3">
                  <BarChartIcon fontSize="small" /> Bar - Open Origin Counts
                </div>
              </MenuItem>
              <MenuItem value="sankey">
                <div className="flex items-center gap-3">
                  <AccountTree fontSize="small" /> Sankey - Top Open Tabs
                </div>
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="flex shrink items-center gap-4">
          <TabCountTagline />
        </div>
      </StickyTabSubMenuBar>

      <div className="flex grow flex-col gap-4 px-4 py-2 @4xl/main:px-8">
        <Suspense fallback={<div>Loading chart...</div>}>
          <Chart chartType={chartType} />
        </Suspense>
      </div>
    </div>
  );
}
