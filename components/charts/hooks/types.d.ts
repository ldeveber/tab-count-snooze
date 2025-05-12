import type { DatasetComponentOption } from "echarts";

/**
 * @todo find better type from echarts
 */
type DataPoint = {
  [name: string]: string | number | Date | null | undefined;
};

/**
 * @todo find better type from echarts
 */
type Dimension = Required<DatasetComponentOption>["dimensions"][number] & {
  displayName?: string;
  name: string;
  type: "number" | "time" | "ordinal" | "int" | "float" | undefined;
};
