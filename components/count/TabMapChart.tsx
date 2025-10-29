import { TrendingUpIcon } from "lucide-react";
import React, { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  Layer,
  Rectangle,
  Sankey,
  type TooltipContentProps,
  useChartWidth,
} from "recharts";
import type { LinkProps, NodeProps } from "recharts/types/chart/Sankey";
import type {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import {
  Card,
  CardAction,
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
} from "@/components/ui/chart";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";
import ErrorDisplay from "../ErrorDisplay";
import { ChartConfigMenu } from "./ChartConfigMenu";
import { ChartSlider } from "./ChartSlider";
import { useTabMap } from "./hooks/useTabMap";

function Link({
  sourceX,
  targetX,
  sourceY,
  targetY,
  sourceControlX,
  targetControlX,
  linkWidth,
  index,
  payload: { source, target },
}: LinkProps) {
  const initialFill = `url(#gradient-${source.depth}-${target.depth})`;
  const hoverFill = `url(#gradient-${source.depth}-${target.depth}-hover)`;
  const [fill, setFill] = useState(initialFill);
  return (
    <Layer key={`CustomLink${index}`}>
      {/** biome-ignore lint/a11y/noStaticElementInteractions: hover state...? */}
      <path
        d={`
            M${sourceX},${sourceY + linkWidth / 2}
            C${sourceControlX},${sourceY + linkWidth / 2}
              ${targetControlX},${targetY + linkWidth / 2}
              ${targetX},${targetY + linkWidth / 2}
            L${targetX},${targetY - linkWidth / 2}
            C${targetControlX},${targetY - linkWidth / 2}
              ${sourceControlX},${sourceY - linkWidth / 2}
              ${sourceX},${sourceY - linkWidth / 2}
            Z
          `}
        fill={fill}
        strokeWidth="0"
        onMouseEnter={() => {
          setFill(hoverFill);
        }}
        onMouseLeave={() => {
          setFill(initialFill);
        }}
      />
    </Layer>
  );
}

function Node({ x, y, width, height, index, payload }: NodeProps) {
  const containerWidth = useChartWidth();
  if (containerWidth == null) {
    return null; // Return null if used outside a chart context
  }
  const isOut = x + width + 6 > containerWidth;
  return (
    <Layer key={`CustomNode${index}`}>
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={`var(--chart-${payload.depth + 1})`}
        fillOpacity="1"
      />
      {payload.depth < 2 && (
        <text
          textAnchor={isOut ? "end" : "start"}
          x={isOut ? x - 6 : x + width + 6}
          y={y + height / 2}
          fontSize="14"
          className="fill-foreground font-medium text-base"
        >
          {payload.name}
        </text>
      )}
      {payload.depth < 2 && (
        <text
          textAnchor={isOut ? "end" : "start"}
          x={isOut ? x - 6 : x + width + 6}
          y={y + height / 2 + 13}
          dy={4}
          fontSize="12"
          className="fill-muted font-medium text-sm"
        >
          {payload.value.toLocaleString()}
        </text>
      )}
    </Layer>
  );
}

function SankeyTooltip({
  active,
  payload,
  label,
  labelClassName,
}: TooltipContentProps<ValueType, NameType>) {
  const [indicator, points] = React.useMemo(() => {
    const indicator: {
      type?: "dot" | "line";
      style?: React.CSSProperties;
    } = {};
    const points: Array<{
      title: NameType | undefined;
      label: string;
      value: ValueType | undefined;
      indicator?: {
        type?: "dot" | "line";
        style?: React.CSSProperties;
      };
    }> = [];
    if (!payload?.length) {
      return [indicator, points];
    }
    const [item] = payload;

    const isLink =
      Object.hasOwn(item.payload?.payload, "source") &&
      Object.hasOwn(item.payload?.payload, "target");

    if (isLink) {
      const { source, target } = item.payload?.payload ?? {};

      const backgroundImage = `linear-gradient(180deg, ${source.fill} 10%, ${target.fill} 90%)`;

      indicator.type = "line";
      indicator.style = {
        "--color-bg": backgroundImage,
        "--color-border": backgroundImage,
        backgroundImage: backgroundImage,
      } as React.CSSProperties;

      if (source) {
        points.push({
          label: "Open Count",
          title: source.name,
          value: source.value,
        });
      }

      if (target) {
        points.push({
          label: "Open Count",
          title: target.name,
          value: target.value,
        });
      }
    } else {
      const indicatorColor =
        item.fill ?? item.payload?.fill ?? item.payload?.payload?.fill;
      indicator.type = "dot";
      indicator.style = {
        "--color-bg": indicatorColor,
        "--color-border": indicatorColor,
      } as React.CSSProperties;

      points.push({
        title: item.name,
        label: "Count",
        value: item.value,
      });
    }

    return [indicator, points];
  }, [payload]);

  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="grid min-w-32 items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
      <div
        className={cn(
          "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
          indicator.type === "dot" && "items-center",
        )}
      >
        <div
          className={cn("shrink-0 border-(--color-border) bg-(--color-bg)", {
            "h-2.5 w-2.5 rounded-full": indicator.type === "dot",
            "w-1 rounded-[2px]": indicator.type === "line",
          })}
          style={indicator.style}
        />
        <div className="grid gap-1.5">
          {label && (
            <div className={cn("font-medium", labelClassName)}>{label}</div>
          )}
          <div className="grid gap-4">
            {points.map(({ title, label, value, indicator }, index) => {
              return (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: ???
                  key={index}
                  className={cn(
                    "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                    indicator?.type === "dot" && "items-center",
                  )}
                >
                  <div
                    className={cn(
                      "shrink-0 border-(--color-border) bg-(--color-bg)",
                      {
                        "h-2.5 w-2.5 rounded-full": indicator?.type === "dot",
                        "w-1 rounded-[2px]": indicator?.type === "line",
                      },
                    )}
                    style={indicator?.style}
                  />
                  <div className="flex flex-1 items-end justify-between leading-none">
                    <div className="grid gap-1.5">
                      <div className={cn("font-medium", labelClassName)}>
                        {title}
                      </div>
                      <span className="text-muted-foreground">{label}</span>
                    </div>
                    {value && (
                      <span className="font-medium font-mono text-foreground tabular-nums">
                        {typeof value === "number"
                          ? value.toLocaleString()
                          : String(value)}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const chartConfig = {
  name: {
    label: "Count",
  },
} satisfies ChartConfig;

export const STOP_OPACITY = 0.5;
export const STOP_OPACITY_HOVER = 0.75;

const DEFAULT_ITERATIONS = 32;
const DEFAULT_MAX_DEPTH = 4;
const DEFAULT_NUM_ORIGINS = 5;

type TabsSankeyChartProps = React.ComponentProps<typeof Card>;
export function TabMapChart(props: TabsSankeyChartProps) {
  const [iterations, setIterations] = useState<number>(DEFAULT_ITERATIONS);
  const [maxDepth, setMaxDepth] = useState<number>(DEFAULT_MAX_DEPTH);
  const [numOrigins, setNumOrigins] = useState<number>(DEFAULT_NUM_ORIGINS);

  const data = useTabMap(maxDepth, numOrigins);

  const handleIterationsCommit = (value: number) => {
    setIterations(value);
  };
  const handleMaxDepthCommit = (value: number) => {
    setMaxDepth(value);
  };
  const handleNumOriginsCommit = (value: number) => {
    setNumOrigins(value);
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Map of Tabs</CardTitle>
        <CardDescription>
          Showing top {numOrigins} open sites in map.
        </CardDescription>
        <CardAction>
          <ChartConfigMenu>
            <FieldGroup>
              <FieldSet>
                <FieldLegend>Tabs by Site Chart Options</FieldLegend>
                <FieldDescription>
                  Configure how the chart is displayed.
                </FieldDescription>
                <FieldGroup>
                  <ChartSlider
                    id="iterations"
                    label="Render Iterations"
                    description="The maximum depth of the URL pathname to show in results."
                    defaultValue={DEFAULT_ITERATIONS}
                    min={8}
                    max={128}
                    step={1}
                    onValueCommit={handleIterationsCommit}
                  />
                  <ChartSlider
                    id="maxDepth"
                    label="Max Depth"
                    description="The maximum depth of the URL pathname to show in results."
                    defaultValue={DEFAULT_MAX_DEPTH}
                    min={1}
                    max={4}
                    step={1}
                    onValueCommit={handleMaxDepthCommit}
                  />
                  <ChartSlider
                    id="numOrigins"
                    label="Number of Origins"
                    description="The number of tab URL origins to compute."
                    defaultValue={DEFAULT_NUM_ORIGINS}
                    min={1}
                    max={10}
                    step={1}
                    onValueCommit={handleNumOriginsCommit}
                  />
                </FieldGroup>
              </FieldSet>
            </FieldGroup>
          </ChartConfigMenu>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ErrorBoundary FallbackComponent={ErrorDisplay}>
          <ChartContainer
            config={chartConfig}
            className="aspect-1/2"
            aspect="custom"
          >
            <Sankey
              accessibilityLayer
              data={data}
              iterations={iterations}
              link={Link}
              // @ts-expect-error Recharts type does not allow null but it should! TODO fix
              node={Node}
            >
              <defs>
                <linearGradient id="gradient-0-1">
                  <stop
                    offset="0%"
                    stopColor="var(--chart-1)"
                    stopOpacity={STOP_OPACITY}
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--chart-2)"
                    stopOpacity={STOP_OPACITY}
                  />
                </linearGradient>
                <linearGradient id="gradient-0-1-hover">
                  <stop
                    offset="0%"
                    stopColor="var(--chart-1)"
                    stopOpacity={STOP_OPACITY_HOVER}
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--chart-2)"
                    stopOpacity={STOP_OPACITY_HOVER}
                  />
                </linearGradient>
                <linearGradient id="gradient-1-2">
                  <stop
                    offset="0%"
                    stopColor="var(--chart-2)"
                    stopOpacity={STOP_OPACITY}
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--chart-3)"
                    stopOpacity={STOP_OPACITY}
                  />
                </linearGradient>
                <linearGradient id="gradient-1-2-hover">
                  <stop
                    offset="0%"
                    stopColor="var(--chart-2)"
                    stopOpacity={STOP_OPACITY_HOVER}
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--chart-3)"
                    stopOpacity={STOP_OPACITY_HOVER}
                  />
                </linearGradient>
                <linearGradient id="gradient-2-3">
                  <stop
                    offset="0%"
                    stopColor="var(--chart-3)"
                    stopOpacity={STOP_OPACITY}
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--chart-4)"
                    stopOpacity={STOP_OPACITY}
                  />
                </linearGradient>
                <linearGradient id="gradient-2-3-hover">
                  <stop
                    offset="0%"
                    stopColor="var(--chart-3)"
                    stopOpacity={STOP_OPACITY_HOVER}
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--chart-4)"
                    stopOpacity={STOP_OPACITY_HOVER}
                  />
                </linearGradient>
                <linearGradient id="gradient-3-4">
                  <stop
                    offset="0%"
                    stopColor="var(--chart-4)"
                    stopOpacity={STOP_OPACITY}
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--chart-5)"
                    stopOpacity={STOP_OPACITY}
                  />
                </linearGradient>
                <linearGradient id="gradient-3-4-hover">
                  <stop
                    offset="0%"
                    stopColor="var(--chart-4)"
                    stopOpacity={STOP_OPACITY_HOVER}
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--chart-5)"
                    stopOpacity={STOP_OPACITY_HOVER}
                  />
                </linearGradient>
              </defs>
              <ChartTooltip content={SankeyTooltip} cursor={false} />
            </Sankey>
          </ChartContainer>
        </ErrorBoundary>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Open Tabs <TrendingUpIcon className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Top sites are selected by default.
        </div>
      </CardFooter>
    </Card>
  );
}
