// @vitest-environment happy-dom

import { faker } from "@faker-js/faker";
import { describe, expect, test } from "vitest";
import { useTabMap } from "@/components/count/hooks/useTabMap";
import { mockTab } from "@/tests/utils/mockDataHelper";
import { renderHookWithContext } from "../../react-testing-library-utils";

describe("useTabMap", () => {
  test("should map child data for chart", () => {
    const origin1 = faker.internet.url({ appendSlash: false });
    const origin2 = faker.internet.url({ appendSlash: false });

    const segment1 = faker.internet.domainWord();
    const segment2 = faker.internet.domainWord();
    const segment3 = faker.internet.domainWord();

    const tab1 = mockTab({ url: `${origin1}/${segment1}` });
    const tab2 = mockTab({ url: `${origin1}/${segment1}/${segment2}` });
    const tab3 = mockTab({ url: `${origin1}/${segment1}/${segment3}` });
    const tab4 = mockTab({ url: `${origin1}/${segment2}` });
    const tab5 = mockTab({ url: `${origin2}/${segment3}` });

    const tabMap = new Map();
    tabMap.set(tab1.id, tab1);
    tabMap.set(tab2.id, tab2);
    tabMap.set(tab3.id, tab3);
    tabMap.set(tab4.id, tab4);
    tabMap.set(tab5.id, tab5);

    const { result } = renderHookWithContext(() => useTabMap(10, 10), {
      tabs: { map: tabMap },
    });

    const { nodes, links } = result.current;

    expect(nodes.filter((n) => n.depth === 0)).toHaveLength(1);
    expect(nodes.filter((n) => n.depth === 1)).toHaveLength(2);
    expect(nodes.filter((n) => n.depth === 2)).toHaveLength(3);
    expect(nodes.filter((n) => n.depth === 3)).toHaveLength(2);

    expect(nodes).toStrictEqual([
      {
        index: 0,
        name: "All Tabs",
        depth: 0,
        count: tabMap.size,
        fill: "var(--chart-1)",
      },
      {
        index: 1,
        name: origin1,
        depth: 1,
        count: 4,
        fill: "var(--chart-2)",
      },
      {
        index: 2,
        name: `${origin1}/${segment1}`,
        depth: 2,
        count: 3,
        fill: "var(--chart-3)",
      },
      {
        index: 3,
        name: `${origin1}/${segment1}/${segment2}`,
        depth: 3,
        count: 1,
        fill: "var(--chart-4)",
      },
      {
        index: 4,
        name: `${origin1}/${segment1}/${segment3}`,
        depth: 3,
        count: 1,
        fill: "var(--chart-4)",
      },
      {
        index: 5,
        name: `${origin1}/${segment2}`,
        depth: 2,
        count: 1,
        fill: "var(--chart-3)",
      },
      {
        index: 6,
        name: origin2,
        depth: 1,
        count: 1,
        fill: "var(--chart-2)",
      },
      {
        index: 7,
        name: `${origin2}/${segment3}`,
        depth: 2,
        count: 1,
        fill: "var(--chart-3)",
      },
    ]);

    expect(nodes.length).toBe(8);

    expect(links).toStrictEqual([
      { source: 0, target: 1, value: 4 },
      { source: 1, target: 2, value: 3 },
      { source: 2, target: 3, value: 1 },
      { source: 2, target: 4, value: 1 },
      { source: 1, target: 5, value: 1 },
      { source: 0, target: 6, value: 1 },
      { source: 6, target: 7, value: 1 },
    ]);
    expect(links.length).toBe(7);
  });
});
