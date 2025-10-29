import { TrendingUpIcon } from "lucide-react";
import type React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTabsByTopOrigin } from "./hooks/useTabsByTopOrigin";

const chartConfig = {
  count: {
    label: "Count",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig;

const DEFAULT_LIMIT = 5;

type TopOriginsChartProps = React.ComponentProps<typeof Card>;
export function TopOriginsChart(props: TopOriginsChartProps) {
  const data = useTabsByTopOrigin(DEFAULT_LIMIT);

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Top Open Sites</CardTitle>
        <CardDescription>The places frequented most.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            title="Top Open Sites"
            data-testid="chart"
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="url"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="count" fill="var(--color-count)" radius={4}>
              <LabelList
                dataKey="url"
                position="insideLeft"
                offset={8}
                className="fill-(--color-label)"
                fontSize={12}
              />
              <LabelList
                dataKey="count"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          <TrendingUpIcon className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing top {DEFAULT_LIMIT} sites in open tabs.
        </div>
      </CardFooter>
    </Card>
  );
}
