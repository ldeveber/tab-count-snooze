import dayjs from "dayjs";
import { useMemo } from "react";
import { useAllTabs } from "@/lib/dataStore";

export type AgeDataItem = {
  id: string;
  label: string;
  fill: string;
  ageThreshold: number;
  ageLabel: string;
  count: number;
};

export function useTabsByStaleness(): [Array<AgeDataItem>, averageAge: string] {
  performance.mark("ext:tab-count-snooze:useTabsByStaleness_start");
  const allTabs = useAllTabs();

  const { averageAge, data } = useMemo(() => {
    const now = dayjs();
    const lastHourAge = now.subtract(1, "hour");
    const lastDayAge = now.subtract(1, "day");
    const lastWeekAge = now.subtract(1, "week");
    const lastMonthAge = now.subtract(1, "month");
    const lastHour: AgeDataItem = {
      id: "lastHour",
      label: "Last Hour",
      fill: "var(--chart-1)",
      ageThreshold: lastHourAge.valueOf(),
      ageLabel: lastHourAge
        .toDate()
        .toLocaleString(undefined, { month: "long", day: "numeric" }),
      count: 0,
    };
    const lastDay: AgeDataItem = {
      id: "lastDay",
      label: "Last Day",
      fill: "var(--chart-2)",
      ageThreshold: lastDayAge.valueOf(),
      ageLabel: lastDayAge
        .toDate()
        .toLocaleString(undefined, { month: "long", day: "numeric" }),
      count: 0,
    };
    const lastWeek: AgeDataItem = {
      id: "lastWeek",
      label: "Last Week",
      fill: "var(--chart-3)",
      ageThreshold: lastWeekAge.valueOf(),
      ageLabel: lastWeekAge
        .toDate()
        .toLocaleString(undefined, { month: "long", day: "numeric" }),
      count: 0,
    };
    const lastMonth: AgeDataItem = {
      id: "lastMonth",
      label: "Last Month",
      fill: "var(--chart-4)",
      ageThreshold: lastMonthAge.valueOf(),
      ageLabel: lastMonthAge
        .toDate()
        .toLocaleString(undefined, { month: "long", day: "numeric" }),
      count: 0,
    };
    const older: AgeDataItem = {
      id: "older",
      label: "Older",
      fill: "var(--chart-5)",
      ageThreshold: now.valueOf(),
      ageLabel: "...the start of time?",
      count: 0,
    };

    let totalAge = 0;
    let tabCount = 0;
    allTabs.forEach((tab) => {
      if (!tab.lastAccessed) {
        return;
      }
      tabCount++;

      const time = tab.lastAccessed;
      if (time > lastHour.ageThreshold) {
        lastHour.count++;
      } else if (time > lastDay.ageThreshold) {
        lastDay.count++;
      } else if (time > lastWeek.ageThreshold) {
        lastWeek.count++;
      } else if (time > lastMonth.ageThreshold) {
        lastMonth.count++;
      } else {
        older.count++;
      }
      totalAge += time;
    });

    const averageAge = dayjs(totalAge / tabCount).fromNow();

    return {
      averageAge,
      data: [lastHour, lastDay, lastWeek, lastMonth, older],
    };
  }, [allTabs]);

  performance.mark("ext:tab-count-snooze:useTabsByStaleness_end");
  return [data, averageAge];
}
