import { useMemo } from "react";
import { EChart } from "@kbox-labs/react-echarts";
import useDatasets, { ORIGIN_DATASET, TOP_ORIGIN_DATASET } from "./hooks/useDatasets";
import { BarSeriesOption, EChartsOption, PieSeriesOption, SankeySeriesOption } from "echarts";
import useSanKeySeries from "./hooks/useSanKeySeries";

export type ChartViewType = "bar" | "pie" | "sankey";

const baseOptions: EChartsOption = {
  style: {
    height: 512,
    width: "100%",
  },
  xAxis: undefined,
  yAxis: undefined,
  tooltip: {
    trigger: "item",
    triggerOn: "mousemove",
  },
  legend: undefined,
  darkMode: "auto",
  theme: "dark",
};

const barSeries: BarSeriesOption = {
  type: "bar",
  datasetIndex: TOP_ORIGIN_DATASET.index,
  encode: {
    y: TOP_ORIGIN_DATASET.dimensions.origin.name,
    x: TOP_ORIGIN_DATASET.dimensions.originCount.name,
  },
  colorBy: "data",
  barWidth: 24,
  barGap: 4,
  label: {
    show: true,
    position: "insideLeft",
    formatter: "{b}",
    fontSize: 16,
  },
  sampling: "max",
};

const pieSeries: PieSeriesOption = {
  type: "pie",
  encode: {
    itemId: ORIGIN_DATASET.dimensions.origin.name,
    itemName: ORIGIN_DATASET.dimensions.origin.name,
    value: ORIGIN_DATASET.dimensions.originCount.name,
  },
  datasetIndex: ORIGIN_DATASET.index,
  radius: ["40%", "70%"],
  avoidLabelOverlap: false,
  padAngle: 5,
  itemStyle: {
    borderRadius: 10,
  },
  label: {
    show: false,
    position: "center",
  },
  labelLine: {
    show: false,
  },
  emphasis: {
    focus: "self",
    label: {
      show: true,
      fontSize: 40,
      fontWeight: "bold",
    },
  },
};

const baseSankeySeries: SankeySeriesOption = {
  type: "sankey",
  emphasis: {
    focus: "adjacency",
  },
  layoutIterations: 0,
  // tooltip: {
  //   formatter: (parms) => {
  //     console.log("sankey tooltip", parms);
  //     return `${parms.data.target} <br/> {b} <br/> {c0} <br/> {c1} <br/> {c2}"`;
  //   },
  // },
  levels: [
    {
      depth: 0,
      itemStyle: {
        color: "#fbb4ae",
      },
      lineStyle: {
        color: "source",
        opacity: 0.4,
      },
    },
    {
      depth: 1,
      itemStyle: {
        color: "#b3cde3",
      },
      lineStyle: {
        color: "source",
        opacity: 0.4,
      },
    },
    {
      depth: 2,
      itemStyle: {
        color: "#ccebc5",
      },
      lineStyle: {
        color: "source",
        opacity: 0.4,
      },
    },
    {
      depth: 3,
      itemStyle: {
        color: "#decbe4",
      },
      lineStyle: {
        color: "source",
        opacity: 0.4,
      },
    },
  ],
  lineStyle: {
    curveness: 0.5,
  },
  edgeLabel: {
    lineHeight: 42,
  },
};

export default function Charts({ chartType }: { chartType: ChartViewType }) {
  const datasets = useDatasets();
  const sankeySeries = useSanKeySeries();

  const options: EChartsOption = useMemo(() => {
    switch (chartType) {
      case "bar":
        return {
          xAxis: {
            type: "value",
          },
          yAxis: {
            type: "category",
          },
          series: barSeries,
        };
      case "pie":
        return {
          legend: {
            top: "5%",
            left: "center",
            type: "scroll",
            itemGap: 24,
          },
          series: pieSeries,
        };
      case "sankey":
        return {
          style: {
            height: 1024,
          },
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove",
          },
          series: { ...baseSankeySeries, ...sankeySeries },
        };
      default:
        return { series: {} };
    }
  }, [chartType]);

  return <EChart {...baseOptions} {...options} dataset={datasets} />;
}
