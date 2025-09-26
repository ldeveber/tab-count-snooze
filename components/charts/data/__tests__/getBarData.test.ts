import { faker } from "@faker-js/faker";
import { describe, expect, test } from "vitest";
import { _getBarData, type ITabData } from "../getBarData";

describe("getBarData", () => {
  describe("_addChildren", () => {
    test("should map child data for chart", () => {
      const tabs: Array<ITabData> = [];

      const origin1 = faker.internet.url({ appendSlash: false });
      const origin2 = faker.internet.url({ appendSlash: false });

      const segment1 = faker.internet.domainWord();
      const segment2 = faker.internet.domainWord();
      const segment3 = faker.internet.domainWord();

      tabs.push({ url: `${origin1}/${segment1}` });
      tabs.push({ url: `${origin1}/${segment2}` });
      tabs.push({ url: `${origin2}/${segment3}` });

      const res = _getBarData(tabs, 0);

      expect(res).toContainEqual({ id: origin1, value: 2 });
      expect(res).toContainEqual({ id: origin2, value: 1 });
      expect(res.length).toBe(2);
    });
  });
});
