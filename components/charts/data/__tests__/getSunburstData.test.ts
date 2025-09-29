import { faker } from "@faker-js/faker";
import { describe, expect, test } from "vitest";
import { mockTab } from "@/test-utils/mockDataHelper";
import { getSunburstData, type ItemData } from "../getSunburstData";

describe("getSunburstData", () => {
  describe("_addChildren", () => {
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

      const tabs = [tab1, tab2, tab3, tab4, tab5];

      const res = getSunburstData(tabs, 3, 1, 10);

      expect(res).toEqual({
        id: "root",
        value: 0,
        label: "root",
        children: expect.any(Array<ItemData>),
      });

      const { children } = res;
      expect(children).toContainEqual({
        id: origin1,
        label: origin1,
        value: 4,
        children: [
          {
            id: `${origin1}/${segment1}`,
            label: `${origin1}/${segment1}`,
            value: 3,
            children: [
              {
                id: `${origin1}/${segment1}/${segment2}`,
                label: `${origin1}/${segment1}/${segment2}`,
                value: 1,
                children: [],
              },
              {
                id: `${origin1}/${segment1}/${segment3}`,
                label: `${origin1}/${segment1}/${segment3}`,
                value: 1,
                children: [],
              },
            ],
          },
          {
            id: `${origin1}/${segment2}`,
            label: `${origin1}/${segment2}`,
            value: 1,
            children: [],
          },
        ],
      });
      expect(children).toContainEqual({
        id: origin2,
        label: origin2,
        value: 1,
        children: [
          {
            id: `${origin2}/${segment3}`,
            label: `${origin2}/${segment3}`,
            value: 1,
            children: [],
          },
        ],
      });
      expect(children.length).toBe(2);
    });
  });
});
