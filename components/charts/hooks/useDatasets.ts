import type { DatasetComponentOption } from "echarts";
import type { DataPoint, Dimension } from "./types";
import useParsedTabData from "./hookDataParser";

interface DatasetReference<T> {
  index: number;
  dimensions: Record<keyof T, Dimension>;
}

interface OriginDataPoint extends DataPoint {
  url: string;
  title: string | undefined;
  origin: string;
  originCount: number;
}
export const ORIGIN_DATASET: DatasetReference<OriginDataPoint> = {
  index: 0,
  dimensions: {
    origin: { name: "origin", type: "ordinal" },
    originCount: { name: "originCount", type: "int" },
  },
};

export const TOP_ORIGIN_DATASET: DatasetReference<OriginDataPoint> = {
  index: ORIGIN_DATASET.index + 1,
  dimensions: ORIGIN_DATASET.dimensions,
};

interface Segment1DataPoint extends OriginDataPoint {
  path1: string;
  path1Count: number;
}
export const SEGMENT1_DATASET: DatasetReference<Segment1DataPoint> = {
  index: TOP_ORIGIN_DATASET.index + 1,
  dimensions: {
    ...ORIGIN_DATASET.dimensions,
    path1: { name: "path1", type: "ordinal" },
    path1Count: { name: "path1Count", type: "int" },
  },
};

interface Segment2DataPoint extends Segment1DataPoint {
  path2: string;
  path2Count: number;
}
export const SEGMENT2_DATASET: DatasetReference<Segment2DataPoint> = {
  index: SEGMENT1_DATASET.index + 1,
  dimensions: {
    ...SEGMENT1_DATASET.dimensions,
    path2: { name: "path2", type: "ordinal" },
    path2Count: { name: "path2Count", type: "int" },
  },
};

export default function useDatasets(): Array<DatasetComponentOption> {
  const tabData = useParsedTabData();

  const originSource: Array<OriginDataPoint> = [];
  const segment1Source: Array<Segment1DataPoint> = [];
  const segment2Source: Array<Segment2DataPoint> = [];
  tabData.forEach((tab) => {
    const { origin, url, title, path1, path2 } = tab;

    let origItem = originSource.find((o) => o.origin === origin);
    if (!origItem) {
      origItem = { url, title, origin, originCount: 0 };
      originSource.push(origItem);
    }
    origItem.originCount++;

    if (path1) {
      let s1Item = segment1Source.find((s) => s.origin === origin);
      if (!s1Item) {
        s1Item = { url, title, origin, originCount: 0, path1, path1Count: 0 };
        segment1Source.push(s1Item);
      }
      s1Item.originCount++;
      s1Item.path1Count++;

      if (path2) {
        let s2Item = segment2Source.find((s) => s.origin === origin);
        if (!s2Item) {
          s2Item = {
            url,
            title,
            origin,
            originCount: 0,
            path1,
            path1Count: 0,
            path2,
            path2Count: 0,
          };
          segment2Source.push(s2Item);
        }
        s2Item.originCount++;
        s2Item.path1Count++;
        s2Item.path2Count++;
      }
    }
  });

  const originDataset: DatasetComponentOption = {
    name: "URL counts with matching origin",
    dimensions: [ORIGIN_DATASET.dimensions.origin, ORIGIN_DATASET.dimensions.originCount],
    source: originSource.filter((o) => o.originCount > 1),
  };

  const topOriginDataset: DatasetComponentOption = {
    fromDatasetIndex: ORIGIN_DATASET.index,
    transform: [
      {
        type: "filter",
        config: { dimension: ORIGIN_DATASET.dimensions.originCount.name, gt: 5 },
      },
      {
        type: "sort",
        config: { dimension: ORIGIN_DATASET.dimensions.originCount.name, order: "asc" },
      },
    ],
  };

  const segment1Dataset: DatasetComponentOption = {
    name: "URL counts with matching origin and first segment",
    dimensions: [
      SEGMENT1_DATASET.dimensions.origin,
      SEGMENT1_DATASET.dimensions.originCount,
      SEGMENT1_DATASET.dimensions.path1,
      SEGMENT1_DATASET.dimensions.path1Count,
    ],
    source: segment1Source
      .filter((o) => o.originCount > 1)
      .sort((a, b) => {
        if (a.originCount > b.originCount) {
          return 1;
        }
        if (a.originCount < b.originCount) {
          return -1;
        }
        return 0;
      }),
  };

  const segment2Dataset: DatasetComponentOption = {
    name: "URL counts with matching origin and first and second segment",
    dimensions: [
      SEGMENT2_DATASET.dimensions.origin,
      SEGMENT2_DATASET.dimensions.originCount,
      SEGMENT2_DATASET.dimensions.path1,
      SEGMENT2_DATASET.dimensions.path1Count,
      SEGMENT2_DATASET.dimensions.path2,
      SEGMENT2_DATASET.dimensions.path2Count,
    ],
    source: segment2Source
      .filter((o) => o.originCount > 1)
      .sort((a, b) => {
        if (a.originCount > b.originCount) {
          return 1;
        }
        if (a.originCount < b.originCount) {
          return -1;
        }
        return 0;
      }),
  };

  return [originDataset, topOriginDataset, segment1Dataset, segment2Dataset];
}
