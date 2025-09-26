import { faker } from "@faker-js/faker";
import { describe, expect, test } from "vitest";
import type { ITabData } from "../getParsedTabData";
import { _addChildren, type ItemData } from "../getSunburstData";

describe("getSunburstData", () => {
  describe("_addChildren", () => {
    test("should map child data for chart", () => {
      const tabs: Array<ITabData> = [];

      const origin1 = faker.internet.url({ appendSlash: false });
      const origin2 = faker.internet.url({ appendSlash: false });

      const segment1 = faker.internet.domainWord();
      const segment2 = faker.internet.domainWord();
      const segment3 = faker.internet.domainWord();

      tabs.push({ origin: origin1, segments: [segment1] });
      tabs.push({ origin: origin1, segments: [segment1, segment2] });
      tabs.push({ origin: origin1, segments: [segment1, segment3] });
      tabs.push({ origin: origin1, segments: [segment2] });
      tabs.push({ origin: origin2, segments: [segment3] });

      const res: Array<ItemData> = [];
      tabs.forEach(({ segments, origin }) => {
        _addChildren(res, origin, segments);
      });

      expect(res).toContainEqual({
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
      expect(res).toContainEqual({
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
      expect(res.length).toBe(2);
    });
  });
});
