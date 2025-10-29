import { ClockIcon } from "lucide-react";
import { Pie, PieChart, Sector } from "recharts";
import type { PieSectorDataItem } from "recharts/types/polar/Pie";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useTabsByStaleness } from "./hooks/useTabsByStaleness";

const RADIAN = Math.PI / 180;

function renderActiveShape({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  stroke,
  payload,
  // React does not recognize the vvv prop on a DOM element
  percent,
  value,
  label,
  count,
  cornerRadius,
  tooltipPayload,
  middleRadius,
  tooltipPosition,
  ageThreshold,
  ageLabel,
  maxRadius,
  paddingAngle,
  // ^^^ not needed
  // but still pass other props
  ...props
}: PieSectorDataItem) {
  const sin = Math.sin(-RADIAN * (midAngle ?? 1));
  const cos = Math.cos(-RADIAN * (midAngle ?? 1));
  const sx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos;
  const sy = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin;
  const mx = (cx ?? 0) + ((outerRadius ?? 0) + 30) * cos;
  const my = (cy ?? 0) + ((outerRadius ?? 0) + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g {...props}>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={payload.fill}
        className="font-bold text-3xl"
      >
        {payload.count.toLocaleString()}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={(outerRadius ?? 0) + 6}
        outerRadius={(outerRadius ?? 0) + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill={payload.fill}
      >
        {payload.label}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={14}
        textAnchor={textAnchor}
        fill="var(--muted-foreground)"
      >
        Since {payload.ageLabel}
      </text>
    </g>
  );
}

const chartConfig = {
  lastHour: {
    label: "Last Hour",
    color: "var(--chart-1)",
  },
  lastDay: {
    label: "Last Day",
    color: "var(--chart-2)",
  },
  lastWeek: {
    label: "Last Week",
    color: "var(--chart-3)",
  },
  lastMonth: {
    label: "Last Month",
    color: "var(--chart-4)",
  },
  older: {
    label: "Before Last Month",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function TabStaleness() {
  const [data, averageAge] = useTabsByStaleness();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tab Staleness</CardTitle>
        <CardDescription>
          Showing tabs grouped by last accessed time.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <PieChart accessibilityLayer>
            <Pie
              dataKey="count"
              nameKey="label"
              data={data}
              outerRadius={90}
              innerRadius={65}
              activeShape={renderActiveShape}
            ></Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Average age of tab <ClockIcon className="size-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          The average tab was opened {averageAge}
        </div>
      </CardFooter>
    </Card>
  );
}
