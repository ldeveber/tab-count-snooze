import { BubbleDataPoint, ChartData, ChartOptions, Point } from "chart.js";
import { MouseEventHandler, useRef } from "react";
import { Chart, getElementAtEvent } from "react-chartjs-2";
import { ChartJSOrUndefined } from "react-chartjs-2/dist/types";

export type ChartViewType = "bar" | "doughnut";

export default function ChartPane({
  chartType,
  data,
  onClick,
}: {
  readonly chartType: ChartViewType;
  readonly data: ChartData;
  readonly onClick: (origin: string) => void;
}) {
  const chartRef =
    useRef<
      ChartJSOrUndefined<
        "bar" | "line" | "scatter" | "bubble" | "pie" | "doughnut" | "polarArea" | "radar",
        (number | Point | [number, number] | BubbleDataPoint | null)[]
      >
    >(null);

  const options: ChartOptions = {
    indexAxis: "y" as const,
    elements: {
      arc: {
        hoverOffset: 100,
      },
      //   bar: {
      //     borderWidth: 2,
      //   },
    },
    layout: {
      padding: 20,
    },
    responsive: true,
    plugins: {
      legend: {
        display: chartType === "doughnut",
        position: "right",
      },
    },
  };

  const onChartClick: MouseEventHandler<HTMLCanvasElement> = (event) => {
    const { current: chart } = chartRef;
    if (!chart) {
      return;
    }
    const element = getElementAtEvent(chart, event);
    if (!element.length || !data.labels) return;

    const { index } = element[0];

    const origin = data.labels[index] as string;
    onClick(origin);
  };

  if (data.datasets[0].data.length === 0) {
    return <>No Data :(</>;
  }

  return (
    <Chart type={chartType} ref={chartRef} options={options} data={data} onClick={onChartClick} />
  );
}
