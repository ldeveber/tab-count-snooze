// @vitest-environment happy-dom

import dayjs from "dayjs";
import { describe, expect, test } from "vitest";
import { useTabsByStaleness } from "@/components/count/hooks/useTabsByStaleness";
import { mockTab } from "@/tests/utils/mockDataHelper";
import { renderHookWithContext } from "../../react-testing-library-utils";

describe("useTabsByStaleness", () => {
  test("should return pie chart data grouped by last accessed", () => {
    const now = dayjs();

    const tab1 = mockTab({ lastAccessed: now.subtract(1, "hour").valueOf() });
    const tab2 = mockTab({ lastAccessed: now.subtract(1, "day").valueOf() });
    const tab3 = mockTab({ lastAccessed: now.subtract(1, "week").valueOf() });

    const tabMap = new Map();
    tabMap.set(tab1.id, tab1);
    tabMap.set(tab2.id, tab2);
    tabMap.set(tab3.id, tab3);

    const { result } = renderHookWithContext(() => useTabsByStaleness(), {
      tabs: { map: tabMap },
    });

    const [data, averageAge] = result.current;

    expect(averageAge).toEqual("3 days ago");
    expect(data).toStrictEqual([
      {
        ageLabel: expect.any(String),
        ageThreshold: expect.any(Number),
        count: 0,
        fill: "var(--chart-1)",
        id: "lastHour",
        label: "Last Hour",
      },
      {
        ageLabel: expect.any(String),
        ageThreshold: expect.any(Number),
        count: 1,
        fill: "var(--chart-2)",
        id: "lastDay",
        label: "Last Day",
      },
      {
        ageLabel: expect.any(String),
        ageThreshold: expect.any(Number),
        count: 1,
        fill: "var(--chart-3)",
        id: "lastWeek",
        label: "Last Week",
      },
      {
        ageLabel: expect.any(String),
        ageThreshold: expect.any(Number),
        count: 1,
        fill: "var(--chart-4)",
        id: "lastMonth",
        label: "Last Month",
      },
      {
        ageLabel: "...the start of time?",
        ageThreshold: expect.any(Number),
        count: 0,
        fill: "var(--chart-5)",
        id: "older",
        label: "Older",
      },
    ]);
    expect(data.length).toBe(5);
  });
});
