// @vitest-environment happy-dom

import { faker } from "@faker-js/faker";
import { describe, expect, test } from "vitest";
import { useTabsByTopOrigin } from "@/components/count/hooks/useTabsByTopOrigin";
import { mockTab } from "@/tests/utils/mockDataHelper";
import { renderHookWithContext } from "../../react-testing-library-utils";

describe("useTabsByTopOrigin", () => {
  test("should return bar data", () => {
    const origin1 = faker.internet.url({ appendSlash: false });
    const origin2 = faker.internet.url({ appendSlash: false });

    const segment1 = faker.internet.domainWord();
    const segment2 = faker.internet.domainWord();
    const segment3 = faker.internet.domainWord();

    const tab1 = mockTab({ url: `${origin1}/${segment1}` });
    const tab2 = mockTab({ url: `${origin1}/${segment2}` });
    const tab3 = mockTab({ url: `${origin2}/${segment3}` });

    const tabMap = new Map();
    tabMap.set(tab1.id, tab1);
    tabMap.set(tab2.id, tab2);
    tabMap.set(tab3.id, tab3);

    const { result } = renderHookWithContext(() => useTabsByTopOrigin(10), {
      tabs: { map: tabMap },
    });

    expect(result.current).toStrictEqual([
      {
        url: origin1,
        count: 2,
        fill: "var(--chart-1)",
      },
      {
        url: origin2,
        count: 1,
        fill: "var(--chart-2)",
      },
    ]);
    expect(result.current.length).toBe(2);
  });
});
